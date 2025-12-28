export type ProgrammingLanguage = 'JavaScript' | 'TypeScript' | 'Python' | 'Go' | 'General';

export type Difficulty = 'Junior' | 'Mid' | 'Senior' | 'Staff';

export type Evaluation = 'good' | 'kind_of' | 'bad';

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
}

export interface UserStats {
  totalQuestionsSeen: number;
  masteryPercentage: number;
  daysStreak: number;
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

  // Progress
  getRecord(questionId: string): Promise<UserQuestionRecord | null>;
  saveEvaluation(questionId: string, evaluation: Evaluation): Promise<void>;
  
  // Stats
  getStats(): Promise<UserStats>;
  
  // Setup
  syncQuestions(questions: Question[]): Promise<void>;
}
