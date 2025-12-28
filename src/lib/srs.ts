import { Evaluation, UserQuestionRecord } from '@/types';

/**
 * Basic SRS Algorithm (SM-2 simplified)
 * Logic to calculate the next review date based on user evaluation.
 */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

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
      record.interval = Math.round(record.interval * record.easeFactor);
    }
    
    record.streak += 1;
    record.nextReviewDate = now + record.interval * MS_PER_DAY;
  }

  return record;
}


