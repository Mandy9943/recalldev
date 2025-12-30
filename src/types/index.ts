export type ProgrammingLanguage = 'JavaScript' | 'TypeScript' | 'Python' | 'Go' | 'General';

export type Difficulty = 'Junior' | 'Mid' | 'Senior' | 'Staff';

export type Evaluation = 'good' | 'kind_of' | 'bad';

export interface EvaluationEvent {
  ts: number; // timestamp (ms)
  evaluation: Evaluation;
}

export interface QuestionReport {
  questionId: string;
  ts: number; // timestamp (ms)
  reason?: string;
  note?: string;
}

export interface UserMeta {
  version: 1;
  myAnswerById: Record<string, string>;
  notesById: Record<string, string>;
  bookmarksById: Record<string, boolean>;
  reports: QuestionReport[];
}

export interface Question {
  id: string;
  language: ProgrammingLanguage;
  difficulty: Difficulty;
  tags: string[]; // e.g., ['async', 'performance', 'react']
  question: string;
  shortAnswer: string;
  keyPoints: string[];
  redFlags: string[];
}

export interface UserQuestionRecord {
  questionId: string;
  nextReviewDate: number; // timestamp
  interval: number; // days
  streak: number;
  easeFactor: number;
  lastEvaluation?: Evaluation;
  timesSeen: number;
  firstSeenAt?: number; // timestamp (ms)
  lastSeenAt?: number; // timestamp (ms)
  evaluations?: EvaluationEvent[]; // optional for backwards compatibility
  goodCount?: number;
  kindOfCount?: number;
  badCount?: number;
}

export interface UserStats {
  totalQuestionsSeen: number;
  masteryPercentage: number;
  daysStreak: number;
  totalAttempts: number;
  lastActivityAt?: number;
  /**
   * Optional helper counts (safe to ignore in UI; present when repository can compute them).
   */
  totalQuestions?: number;
  unseenCount?: number;
  dueNowCount?: number;
}

export interface RateStat {
  attempts: number;
  good: number;
  kind_of: number;
  bad: number;
  goodRate: number; // 0..1
  badRate: number; // 0..1
}

export interface TagStat extends RateStat {
  tag: string;
}

export interface QuestionMissStat extends RateStat {
  questionId: string;
  language?: ProgrammingLanguage;
  difficulty?: Difficulty;
  tags?: string[];
  prompt?: string;
}

export interface DailyActivityStat {
  day: string; // YYYY-MM-DD in local time
  attempts: number;
  good: number;
  kind_of: number;
  bad: number;
}

export interface UserAnalytics {
  stats: UserStats;
  overall: RateStat;
  byLanguage: Partial<Record<ProgrammingLanguage, RateStat>>;
  byDifficulty: Partial<Record<Difficulty, RateStat>>;
  topWeakTags: TagStat[];
  topMissedQuestions: QuestionMissStat[];
  activityByDay: DailyActivityStat[]; // last N days
}

// Data Abstraction Layer Interface
export interface IDataRepository {
  // Questions
  getQuestions(filters: {
    languages?: ProgrammingLanguage[];
    difficulties?: Difficulty[];
    tags?: string[];
    limit?: number;
  }): Promise<Question[]>;
  
  // SRS Logic
  getDueQuestions(filters: {
    languages?: ProgrammingLanguage[];
    difficulties?: Difficulty[];
    tags?: string[];
  }): Promise<Question[]>;

  getNewQuestions(filters: {
    languages?: ProgrammingLanguage[];
    difficulties?: Difficulty[];
    tags?: string[];
    limit?: number;
  }): Promise<Question[]>;

  // Progress
  getRecord(questionId: string): Promise<UserQuestionRecord | null>;
  saveEvaluation(questionId: string, evaluation: Evaluation): Promise<void>;
  /**
   * Directly set (overwrite) or remove a question record.
   * Used for safe undo/re-grade flows where the latest session grade should not double-count.
   */
  setRecord(questionId: string, record: UserQuestionRecord | null): Promise<void>;
  
  // Stats
  getStats(): Promise<UserStats>;
  getAnalytics(options?: { days?: number; topN?: number }): Promise<UserAnalytics>;
  
  // Setup
  syncQuestions(questions: Question[]): Promise<void>;
  /**
   * Reload any persisted state (e.g. localStorage) into the in-memory cache.
   * Useful for multi-tab usage and "refresh analytics" actions.
   */
  refreshFromStorage(): Promise<void>;

  // Maintenance
  resetProgress(): Promise<void>;
}
