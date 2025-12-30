import { IDataRepository, Question } from "@/types";

export type SessionBuildInput = {
  repository: IDataRepository;
  languages?: string[];
  difficulties?: string[];
  tags?: string[];
  sessionSize: number;
  /**
   * If true, include unseen/new questions after due ones.
   * If false, the session will contain due questions only (unless allowExtraPractice is enabled).
   */
  includeNew?: boolean;
  /**
   * If true, allow adding not-due questions after due+new are exhausted.
   * This is meant to be explicit opt-in when the user is "all caught up".
   */
  allowExtraPractice?: boolean;
  /**
   * Stable shuffle seed. If omitted, the session will still be stable across a single page load
   * but may vary across refreshes depending on the caller.
   */
  seed?: number;
};

export type SessionBuildResult = {
  questions: Question[];
  makeup: {
    due: number;
    new: number;
    extra: number;
  };
};

function clampInt(n: number, min: number, max: number): number {
  const nn = Number.isFinite(n) ? Math.trunc(n) : min;
  return Math.max(min, Math.min(max, nn));
}

function hashStringToU32(s: string): number {
  // FNV-1a (32-bit)
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function stableShuffle<T>(items: T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sessionSeedForToday(input: {
  languages?: string[];
  difficulties?: string[];
  tags?: string[];
}): number {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const key = JSON.stringify({
    day: `${y}-${m}-${day}`,
    languages: input.languages || [],
    difficulties: input.difficulties || [],
    tags: input.tags || [],
  });
  return hashStringToU32(key);
}

export async function buildPracticeSession(
  input: SessionBuildInput
): Promise<SessionBuildResult> {
  const sessionSize = clampInt(input.sessionSize, 1, 50);
  const includeNew = input.includeNew ?? true;
  const seed =
    input.seed ??
    sessionSeedForToday({
      languages: input.languages,
      difficulties: input.difficulties,
      tags: input.tags,
    });

  const dueAll = await input.repository.getDueQuestions({
    languages: input.languages as any,
    difficulties: input.difficulties as any,
    tags: input.tags,
  });

  // If due exceeds session size, pick the most overdue subset first (repository orders by priority),
  // then shuffle within that subset for variety.
  const duePicked = dueAll.length > sessionSize ? dueAll.slice(0, sessionSize) : dueAll;

  const remainingAfterDue = Math.max(0, sessionSize - duePicked.length);
  const unseen =
    includeNew && remainingAfterDue > 0
      ? await input.repository.getNewQuestions({
          languages: input.languages as any,
          difficulties: input.difficulties as any,
          tags: input.tags,
          limit: remainingAfterDue,
        })
      : [];

  let extra: Question[] = [];
  const remainingAfterNew = Math.max(
    0,
    sessionSize - duePicked.length - unseen.length
  );
  if (remainingAfterNew > 0 && input.allowExtraPractice) {
    const all = await input.repository.getQuestions({
      languages: input.languages as any,
      difficulties: input.difficulties as any,
      tags: input.tags,
    });
    const picked = new Set([...duePicked, ...unseen].map((q) => q.id));
    extra = all.filter((q) => !picked.has(q.id)).slice(0, remainingAfterNew);
  }

  // Stable shuffle WITHIN buckets so we preserve due-first ordering.
  const dueShuffled = stableShuffle(duePicked, seed ^ 0xa1b2c3d4);
  const newShuffled = stableShuffle(unseen, seed ^ 0x1b2c3d4e);
  const extraShuffled = stableShuffle(extra, seed ^ 0xdeadbeef);

  const questions = [...dueShuffled, ...newShuffled, ...extraShuffled].slice(
    0,
    sessionSize
  );

  return {
    questions,
    makeup: {
      due: dueShuffled.length,
      new: newShuffled.length,
      extra: extraShuffled.length,
    },
  };
}


