import { Evaluation, EvaluationEvent, UserQuestionRecord } from '@/types';

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

  record.timesSeen += 1;
  record.lastEvaluation = evaluation;
  record.firstSeenAt = record.firstSeenAt ?? now;
  record.lastSeenAt = now;
  record.easeFactor = clamp(record.easeFactor ?? 2.5, MIN_EASE, MAX_EASE);

  // Attempt history (backwards compatible)
  const event: EvaluationEvent = { ts: now, evaluation };
  record.evaluations = Array.isArray(record.evaluations) ? record.evaluations : [];
  record.evaluations.push(event);
  if (record.evaluations.length > MAX_EVALUATION_EVENTS) {
    record.evaluations = record.evaluations.slice(-MAX_EVALUATION_EVENTS);
  }

  // Fast counters (backwards compatible)
  record.goodCount = record.goodCount ?? 0;
  record.kindOfCount = record.kindOfCount ?? 0;
  record.badCount = record.badCount ?? 0;
  if (evaluation === 'good') record.goodCount += 1;
  else if (evaluation === 'kind_of') record.kindOfCount += 1;
  else record.badCount += 1;

  // Ease factor tuning (SM-2-ish, simplified)
  if (evaluation === 'good') record.easeFactor = clamp(record.easeFactor + 0.05, MIN_EASE, MAX_EASE);
  else if (evaluation === 'kind_of') record.easeFactor = clamp(record.easeFactor - 0.15, MIN_EASE, MAX_EASE);
  else record.easeFactor = clamp(record.easeFactor - 0.2, MIN_EASE, MAX_EASE);

  if (evaluation === 'bad') {
    // Reset or very short interval
    record.streak = 0;
    record.interval = 0; // Show again today/soon
    record.nextReviewDate = now + (10 * 60 * 1000); // 10 minutes later
  } else if (evaluation === 'kind_of') {
    // Small progress
    record.streak = 0;
    record.interval = 1; // 1 day
    record.nextReviewDate = now + MS_PER_DAY;
  } else {
    // 'good' - increase interval exponentially
    if (record.streak === 0) {
      record.interval = 1;
    } else if (record.streak === 1) {
      record.interval = 3;
    } else {
      record.interval = Math.max(1, Math.round(record.interval * record.easeFactor));
    }
    
    record.streak += 1;
    record.nextReviewDate = now + record.interval * MS_PER_DAY;
  }

  return record;
}


