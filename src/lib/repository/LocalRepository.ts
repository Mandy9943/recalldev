import { 
  IDataRepository, 
  Question, 
  UserQuestionRecord, 
  Evaluation, 
  UserStats,
  ProgrammingLanguage,
  Difficulty,
  UserAnalytics,
  RateStat,
  TagStat,
  QuestionMissStat,
  DailyActivityStat
} from '@/types';
import { calculateNextReview } from '@/lib/srs';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function formatLocalDay(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function startOfLocalDay(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function addLocalDays(ts: number, days: number): number {
  const d = new Date(ts);
  d.setDate(d.getDate() + days);
  return d.getTime();
}

function emptyRateStat(): RateStat {
  return {
    attempts: 0,
    good: 0,
    kind_of: 0,
    bad: 0,
    goodRate: 0,
    badRate: 0,
  };
}

function finalizeRateStat<T extends RateStat>(stat: T): T {
  if (stat.attempts <= 0) return { ...stat, goodRate: 0, badRate: 0 };
  return {
    ...stat,
    goodRate: stat.good / stat.attempts,
    badRate: stat.bad / stat.attempts,
  };
}

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
    if (!savedProgress) {
      // If the key is missing (e.g. user cleared storage or another tab reset),
      // ensure our in-memory cache reflects that.
      this.progress = {};
    } else {
      try {
        const parsed = JSON.parse(savedProgress);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          this.progress = parsed as Record<string, UserQuestionRecord>;
        } else {
          this.progress = {};
        }
      } catch (e) {
        console.error('Failed to load progress', e);
        this.progress = {};
      }
    }

    const savedQuestions = localStorage.getItem(this.STORAGE_KEY_QUESTIONS);
    if (!savedQuestions) {
      this.questions = [];
    } else {
      try {
        const parsed = JSON.parse(savedQuestions);
        if (Array.isArray(parsed)) {
          // Minimal validation: keep only items that look like Questions.
          this.questions = parsed.filter(
            (q): q is Question =>
              q &&
              typeof q === 'object' &&
              typeof (q as Question).id === 'string' &&
              typeof (q as Question).question === 'string' &&
              Array.isArray((q as Question).tags)
          );
        } else {
          this.questions = [];
        }
      } catch (e) {
        console.error('Failed to load questions', e);
        this.questions = [];
      }
    }
  }

  async refreshFromStorage(): Promise<void> {
    this.loadFromStorage();
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
      if (!record) return false; // Never seen is NOT "due"
      return record.nextReviewDate <= now;
    });
  }

  async getNewQuestions(filters: {
    languages?: ProgrammingLanguage[];
    difficulties?: Difficulty[];
    tags?: string[];
    limit?: number;
  }): Promise<Question[]> {
    // Important: don't apply `limit` before filtering unseen, otherwise we may return fewer unseen than requested.
    const all = await this.getQuestions({
      languages: filters.languages,
      difficulties: filters.difficulties,
      tags: filters.tags,
    });
    const unseen = all.filter(q => !this.progress[q.id]);
    return unseen.slice(0, filters.limit);
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
    const now = Date.now();
    const totalQuestions = this.questions.length;
    const unseenCount = Math.max(0, totalQuestions - seenCount);
    const dueNowCount = records.reduce((acc, r) => acc + (r.nextReviewDate <= now ? 1 : 0), 0);
    
    // Mastery: Interval > 7 days is considered "mastered" for MVP
    const masteredCount = records.filter(r => r.interval > 7).length;
    const masteryPercentage = seenCount > 0 ? Math.round((masteredCount / seenCount) * 100) : 0;

    const totalAttempts = records.reduce((sum, r) => sum + (r.timesSeen || 0), 0);

    let lastActivityAt = 0;
    const activeDays = new Set<string>();
    for (const r of records) {
      const tsCandidates: number[] = [];
      if (typeof r.lastSeenAt === 'number') tsCandidates.push(r.lastSeenAt);
      if (Array.isArray(r.evaluations)) {
        for (const e of r.evaluations) {
          if (typeof e?.ts === 'number') tsCandidates.push(e.ts);
        }
      }
      const localMax = tsCandidates.length ? Math.max(...tsCandidates) : 0;
      if (localMax > 0) {
        lastActivityAt = Math.max(lastActivityAt, localMax);
      }
      for (const ts of tsCandidates) {
        if (ts > 0) activeDays.add(formatLocalDay(ts));
      }
    }

    // Streak is consecutive active days ending at the last active day
    let daysStreak = 0;
    if (lastActivityAt > 0 && activeDays.size > 0) {
      let cursor = startOfLocalDay(lastActivityAt);
      while (activeDays.has(formatLocalDay(cursor))) {
        daysStreak += 1;
        cursor = addLocalDays(cursor, -1);
      }
    }

    return {
      totalQuestionsSeen: seenCount,
      masteryPercentage,
      daysStreak,
      totalAttempts,
      lastActivityAt: lastActivityAt > 0 ? lastActivityAt : undefined,
      totalQuestions,
      unseenCount,
      dueNowCount,
    };
  }

  async getAnalytics(options?: { days?: number; topN?: number }): Promise<UserAnalytics> {
    const days = Math.max(1, options?.days ?? 14);
    const topN = Math.max(1, options?.topN ?? 10);

    const stats = await this.getStats();
    const questionById = new Map(this.questions.map(q => [q.id, q] as const));

    const overall: RateStat = emptyRateStat();
    const byLanguage: UserAnalytics['byLanguage'] = {};
    const byDifficulty: UserAnalytics['byDifficulty'] = {};
    const tagMap = new Map<string, RateStat>();
    const questionMap = new Map<string, QuestionMissStat>();

    const rangeStart = startOfLocalDay(addLocalDays(Date.now(), -(days - 1)));
    const activityMap = new Map<string, DailyActivityStat>();

    const bumpActivity = (ts: number, evaluation: Evaluation) => {
      if (ts < rangeStart) return;
      const day = formatLocalDay(ts);
      const current = activityMap.get(day) || { day, attempts: 0, good: 0, kind_of: 0, bad: 0 };
      current.attempts += 1;
      current[evaluation] += 1;
      activityMap.set(day, current);
    };

    for (const record of Object.values(this.progress)) {
      const q = questionById.get(record.questionId);

      // Prefer explicit counters (fast), fallback to evaluation events, finally lastEvaluation
      const good = record.goodCount ?? 0;
      const kind_of = record.kindOfCount ?? 0;
      const bad = record.badCount ?? 0;
      const hasCounters = (record.goodCount ?? record.kindOfCount ?? record.badCount) !== undefined;

      let effGood = good;
      let effKindOf = kind_of;
      let effBad = bad;

      if (!hasCounters) {
        if (Array.isArray(record.evaluations) && record.evaluations.length > 0) {
          effGood = 0; effKindOf = 0; effBad = 0;
          for (const e of record.evaluations) {
            if (e.evaluation === 'good') effGood += 1;
            else if (e.evaluation === 'kind_of') effKindOf += 1;
            else effBad += 1;
          }
        } else if (record.lastEvaluation) {
          effGood = record.lastEvaluation === 'good' ? 1 : 0;
          effKindOf = record.lastEvaluation === 'kind_of' ? 1 : 0;
          effBad = record.lastEvaluation === 'bad' ? 1 : 0;
        }
      }

      const attempts = effGood + effKindOf + effBad;
      if (attempts <= 0) continue;

      overall.attempts += attempts;
      overall.good += effGood;
      overall.kind_of += effKindOf;
      overall.bad += effBad;

      // Activity trend
      if (Array.isArray(record.evaluations) && record.evaluations.length > 0) {
        for (const e of record.evaluations) bumpActivity(e.ts, e.evaluation);
      } else if (typeof record.lastSeenAt === 'number' && record.lastEvaluation) {
        bumpActivity(record.lastSeenAt, record.lastEvaluation);
      }

      // By language / difficulty
      if (q?.language) {
        const s = byLanguage[q.language] || emptyRateStat();
        s.attempts += attempts;
        s.good += effGood;
        s.kind_of += effKindOf;
        s.bad += effBad;
        byLanguage[q.language] = s;
      }
      if (q?.difficulty) {
        const s = byDifficulty[q.difficulty] || emptyRateStat();
        s.attempts += attempts;
        s.good += effGood;
        s.kind_of += effKindOf;
        s.bad += effBad;
        byDifficulty[q.difficulty] = s;
      }

      // Weak tags
      const tags = q?.tags || [];
      for (const tag of tags) {
        const s = tagMap.get(tag) || emptyRateStat();
        s.attempts += attempts;
        s.good += effGood;
        s.kind_of += effKindOf;
        s.bad += effBad;
        tagMap.set(tag, s);
      }

      // Most missed questions
      const existing = questionMap.get(record.questionId) || {
        questionId: record.questionId,
        attempts: 0,
        good: 0,
        kind_of: 0,
        bad: 0,
        goodRate: 0,
        badRate: 0,
        language: q?.language,
        difficulty: q?.difficulty,
        tags: q?.tags,
        prompt: q?.question,
      };
      existing.attempts += attempts;
      existing.good += effGood;
      existing.kind_of += effKindOf;
      existing.bad += effBad;
      questionMap.set(record.questionId, existing);
    }

    // Finalize rates
    for (const [k, v] of Object.entries(byLanguage)) byLanguage[k as ProgrammingLanguage] = finalizeRateStat(v);
    for (const [k, v] of Object.entries(byDifficulty)) byDifficulty[k as Difficulty] = finalizeRateStat(v);

    const topWeakTags: TagStat[] = Array.from(tagMap.entries())
      .map(([tag, s]) => ({ tag, ...finalizeRateStat(s) }))
      .sort((a, b) => (b.badRate - a.badRate) || (b.attempts - a.attempts))
      .slice(0, topN);

    const topMissedQuestions: QuestionMissStat[] = Array.from(questionMap.values())
      .map(finalizeRateStat)
      .sort((a, b) => (b.badRate - a.badRate) || (b.attempts - a.attempts))
      .slice(0, topN);

    // Build contiguous day list for last N days
    const activityByDay: DailyActivityStat[] = [];
    for (let i = 0; i < days; i++) {
      const ts = addLocalDays(rangeStart, i);
      const day = formatLocalDay(ts);
      activityByDay.push(activityMap.get(day) || { day, attempts: 0, good: 0, kind_of: 0, bad: 0 });
    }

    return {
      stats,
      overall: finalizeRateStat(overall),
      byLanguage,
      byDifficulty,
      topWeakTags,
      topMissedQuestions,
      activityByDay,
    };
  }

  async syncQuestions(questions: Question[]): Promise<void> {
    this.questions = questions;
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
    }
  }

  async resetProgress(): Promise<void> {
    this.progress = {};
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY_PROGRESS);
    }
  }
}


