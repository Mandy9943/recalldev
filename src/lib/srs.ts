import { Evaluation, EvaluationEvent, UserQuestionRecord } from "@/types";

/**
 * Basic SRS Algorithm (SM-2 simplified)
 * Logic to calculate the next review date based on user evaluation.
 */

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MAX_EVALUATION_EVENTS = 100;
const MIN_EASE = 1.3;
const MAX_EASE = 3.0;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function formatDurationShort(ms: number): string {
  const m = Number.isFinite(ms) ? Math.max(0, ms) : 0;
  if (m < 60_000) {
    const s = Math.max(1, Math.round(m / 1000));
    return `${s}s`;
  }
  if (m < 60 * 60_000) {
    const minutes = Math.max(1, Math.round(m / 60_000));
    return `${minutes}m`;
  }
  if (m < 36 * 60 * 60_000) {
    const hours = Math.max(1, Math.round(m / (60 * 60_000)));
    return `${hours}h`;
  }
  const days = Math.max(1, Math.round(m / MS_PER_DAY));
  return `${days}d`;
}

export function formatIntervalDaysShort(days: number): string {
  const d = Number.isFinite(days) ? Math.max(0, days) : 0;
  return formatDurationShort(d * MS_PER_DAY);
}

export function formatNextReviewIn(
  nextReviewDate: number,
  now = Date.now()
): string {
  const ts = Number.isFinite(nextReviewDate) ? nextReviewDate : now;
  return formatDurationShort(Math.max(0, ts - now));
}

export function calculateNextReview(
  evaluation: Evaluation,
  currentRecord: UserQuestionRecord | null,
  questionId: string
): UserQuestionRecord {
  const now = Date.now();

  // Default values for a new record
  const record: UserQuestionRecord = currentRecord || {
    questionId,
    nextReviewDate: now,
    interval: 0,
    streak: 0,
    easeFactor: 2.5,
    timesSeen: 0,
  };

  // Defensive normalization (handles older / corrupted storage data)
  record.interval = Number.isFinite(record.interval)
    ? Math.max(0, record.interval)
    : 0;
  record.streak = Number.isFinite(record.streak)
    ? Math.max(0, Math.trunc(record.streak))
    : 0;

  record.timesSeen += 1;
  record.lastEvaluation = evaluation;
  record.firstSeenAt = record.firstSeenAt ?? now;
  record.lastSeenAt = now;
  record.easeFactor = clamp(record.easeFactor ?? 2.5, MIN_EASE, MAX_EASE);

  // Attempt history (backwards compatible)
  const event: EvaluationEvent = { ts: now, evaluation };
  record.evaluations = Array.isArray(record.evaluations)
    ? record.evaluations
    : [];
  record.evaluations.push(event);
  if (record.evaluations.length > MAX_EVALUATION_EVENTS) {
    record.evaluations = record.evaluations.slice(-MAX_EVALUATION_EVENTS);
  }

  // Fast counters (backwards compatible)
  record.goodCount = record.goodCount ?? 0;
  record.kindOfCount = record.kindOfCount ?? 0;
  record.badCount = record.badCount ?? 0;
  if (evaluation === "good") record.goodCount += 1;
  else if (evaluation === "kind_of") record.kindOfCount += 1;
  else record.badCount += 1;

  // Ease factor tuning (SM-2-ish, simplified)
  if (evaluation === "good")
    record.easeFactor = clamp(record.easeFactor + 0.05, MIN_EASE, MAX_EASE);
  else if (evaluation === "kind_of")
    record.easeFactor = clamp(record.easeFactor - 0.2, MIN_EASE, MAX_EASE);
  else record.easeFactor = clamp(record.easeFactor - 0.3, MIN_EASE, MAX_EASE);

  if (evaluation === "bad") {
    // Reset or very short interval
    record.streak = 0;
    record.interval = 0; // Show again today/soon
    record.nextReviewDate = now + 10 * 60 * 1000; // 10 minutes later
  } else if (evaluation === "kind_of") {
    // Partial recall: schedule sooner than "good", without a full reset.
    // - decrement streak (don't wipe it)
    // - shorten interval (often same-day), and cap so it doesn't stay "mastered" after a weak recall
    record.streak = Math.max(0, record.streak - 1);
    const shortened = record.interval > 0 ? record.interval * 0.4 : 0;
    record.interval = clamp(shortened, 0.5, 6); // 12h .. 6d
    record.nextReviewDate = now + record.interval * MS_PER_DAY;
  } else {
    // 'good' - increase interval exponentially
    if (record.streak === 0) record.interval = 1;
    else if (record.streak === 1) record.interval = 6;
    else
      record.interval = Math.max(
        1,
        Math.round(Math.max(1, record.interval) * record.easeFactor)
      );

    record.streak += 1;
    record.nextReviewDate = now + record.interval * MS_PER_DAY;
  }

  return record;
}
