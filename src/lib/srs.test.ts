import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { calculateNextReview } from "./srs";
import type { UserQuestionRecord } from "@/types";

const BASE = new Date("2025-01-01T00:00:00.000Z");

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(BASE);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("calculateNextReview", () => {
  it("schedules bad ~10 minutes later and resets streak/interval", () => {
    const r = calculateNextReview("bad", null, "q1");
    const diff = r.nextReviewDate - Date.now();
    expect(diff).toBeGreaterThanOrEqual(9 * 60 * 1000);
    expect(diff).toBeLessThanOrEqual(11 * 60 * 1000);
    expect(r.interval).toBe(0);
    expect(r.streak).toBe(0);
  });

  it("schedules good as 1 day then 6 days on consecutive goods", () => {
    const r1 = calculateNextReview("good", null, "q1");
    expect(r1.interval).toBe(1);
    expect(r1.streak).toBe(1);
    expect(r1.nextReviewDate - Date.now()).toBe(24 * 60 * 60 * 1000);

    const r2 = calculateNextReview("good", r1, "q1");
    expect(r2.interval).toBe(6);
    expect(r2.streak).toBe(2);
    expect(r2.nextReviewDate - Date.now()).toBe(6 * 24 * 60 * 60 * 1000);
  });

  it("kind_of schedules sooner than good, without a full reset (decrements streak)", () => {
    const current: UserQuestionRecord = {
      questionId: "q1",
      nextReviewDate: Date.now() - 1000,
      interval: 20,
      streak: 3,
      easeFactor: 2.5,
      timesSeen: 10,
    };

    const r = calculateNextReview("kind_of", current, "q1");
    expect(r.streak).toBe(2);
    // interval should drop and be capped at <= 6 days by design
    expect(r.interval).toBe(6);
    expect(r.nextReviewDate - Date.now()).toBe(6 * 24 * 60 * 60 * 1000);
  });

  it("kind_of on a new record schedules ~12 hours later", () => {
    const r = calculateNextReview("kind_of", null, "q1");
    const diff = r.nextReviewDate - Date.now();
    expect(diff).toBe(12 * 60 * 60 * 1000);
    expect(r.interval).toBe(0.5);
  });
});


