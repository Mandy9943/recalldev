import { describe, it, expect } from "vitest";
import { buildPracticeSession } from "./session";
import type { IDataRepository, Question, UserAnalytics, UserStats } from "@/types";

function q(id: string): Question {
  return {
    id,
    language: "JavaScript",
    difficulty: "Senior",
    tags: [],
    question: `Question ${id}`,
    shortAnswer: "A",
    keyPoints: ["k1"],
    redFlags: ["r1"],
  };
}

function emptyStats(): UserStats {
  return {
    totalQuestionsSeen: 0,
    masteryPercentage: 0,
    daysStreak: 0,
    totalAttempts: 0,
  };
}

function emptyAnalytics(): UserAnalytics {
  return {
    stats: emptyStats(),
    overall: { attempts: 0, good: 0, kind_of: 0, bad: 0, goodRate: 0, badRate: 0 },
    byLanguage: {},
    byDifficulty: {},
    topWeakTags: [],
    topMissedQuestions: [],
    activityByDay: [],
  };
}

describe("buildPracticeSession", () => {
  it("when due > sessionSize, picks the most overdue subset (first N due) and shuffles within it", async () => {
    const due = Array.from({ length: 100 }, (_, i) => q(`q${i}`));
    let newCalls = 0;

    const repo: IDataRepository = {
      getQuestions: async () => due,
      getDueQuestions: async () => due,
      getNewQuestions: async () => {
        newCalls += 1;
        return [];
      },
      getRecord: async () => null,
      saveEvaluation: async () => {},
      getStats: async () => emptyStats(),
      getAnalytics: async () => emptyAnalytics(),
      syncQuestions: async () => {},
      refreshFromStorage: async () => {},
      resetProgress: async () => {},
    };

    const result = await buildPracticeSession({
      repository: repo,
      sessionSize: 10,
      allowExtraPractice: false,
      seed: 123,
    });

    expect(newCalls).toBe(0);
    expect(result.questions).toHaveLength(10);
    expect(result.makeup).toEqual({ due: 10, new: 0, extra: 0 });

    const got = new Set(result.questions.map((qq) => qq.id));
    const expected = new Set(due.slice(0, 10).map((qq) => qq.id));
    expect(got).toEqual(expected);
  });
});



