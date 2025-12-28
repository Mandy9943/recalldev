import { 
  IDataRepository, 
  Question, 
  UserQuestionRecord, 
  Evaluation, 
  UserStats,
  ProgrammingLanguage,
  Difficulty
} from '@/types';
import { calculateNextReview } from '@/lib/srs';

export class LocalRepository implements IDataRepository {
  private STORAGE_KEY_PROGRESS = 'recall_dev_v2_progress';
  private STORAGE_KEY_QUESTIONS = 'recall_dev_v2_questions';

  // In-memory cache for faster access during a session
  private questions: Question[] = [];
  private progress: Record<string, UserQuestionRecord> = {};

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;

    const savedProgress = localStorage.getItem(this.STORAGE_KEY_PROGRESS);
    if (savedProgress) {
      try {
        this.progress = JSON.parse(savedProgress);
      } catch (e) {
        console.error('Failed to load progress', e);
      }
    }

    const savedQuestions = localStorage.getItem(this.STORAGE_KEY_QUESTIONS);
    if (savedQuestions) {
      try {
        this.questions = JSON.parse(savedQuestions);
      } catch (e) {
        console.error('Failed to load questions', e);
      }
    }
  }

  private saveProgress() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY_PROGRESS, JSON.stringify(this.progress));
  }

  async getQuestions(filters: {
    languages?: ProgrammingLanguage[];
    difficulties?: Difficulty[];
    tags?: string[];
    limit?: number;
  }): Promise<Question[]> {
    let result = [...this.questions];

    if (filters.languages?.length) {
      result = result.filter(q => filters.languages!.includes(q.language));
    }
    if (filters.difficulties?.length) {
      result = result.filter(q => filters.difficulties!.includes(q.difficulty));
    }
    if (filters.tags?.length) {
      result = result.filter(q => q.tags.some(t => filters.tags!.includes(t)));
    }

    return result.slice(0, filters.limit);
  }

  async getDueQuestions(filters: {
    languages?: ProgrammingLanguage[];
    difficulties?: Difficulty[];
    tags?: string[];
  }): Promise<Question[]> {
    const all = await this.getQuestions(filters);
    const now = Date.now();

    return all.filter(q => {
      const record = this.progress[q.id];
      if (!record) return true; // Never seen
      return record.nextReviewDate <= now;
    });
  }

  async getRecord(questionId: string): Promise<UserQuestionRecord | null> {
    return this.progress[questionId] || null;
  }

  async saveEvaluation(questionId: string, evaluation: Evaluation): Promise<void> {
    const current = this.progress[questionId] || null;
    const nextRecord = calculateNextReview(evaluation, current, questionId);
    
    this.progress[questionId] = nextRecord;
    this.saveProgress();
  }

  async getStats(): Promise<UserStats> {
    const records = Object.values(this.progress);
    const seenCount = records.length;
    
    // Mastery: Interval > 7 days is considered "mastered" for MVP
    const masteredCount = records.filter(r => r.interval > 7).length;
    const masteryPercentage = seenCount > 0 ? Math.round((masteredCount / seenCount) * 100) : 0;

    return {
      totalQuestionsSeen: seenCount,
      masteryPercentage,
      daysStreak: 0, // Placeholder
    };
  }

  async syncQuestions(questions: Question[]): Promise<void> {
    this.questions = questions;
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
    }
  }
}

