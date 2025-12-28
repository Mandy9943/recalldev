import { Question } from "@/types";

import { JS_QUESTIONS_JUNIOR } from "./javascript/junior";
import { JS_QUESTIONS_MID } from "./javascript/mid";
import { JS_QUESTIONS_SENIOR } from "./javascript/senior";
import { JS_QUESTIONS_STAFF } from "./javascript/staff";

// Keep the same export name used by `src/data/seed.ts`
export const JS_QUESTIONS: Question[] = [
  ...JS_QUESTIONS_JUNIOR,
  ...JS_QUESTIONS_MID,
  ...JS_QUESTIONS_SENIOR,
  ...JS_QUESTIONS_STAFF,
];

// Optional: per-level exports for filtering/UI
export const JS_QUESTIONS_BY_LEVEL = {
  Junior: JS_QUESTIONS_JUNIOR,
  Mid: JS_QUESTIONS_MID,
  Senior: JS_QUESTIONS_SENIOR,
  Staff: JS_QUESTIONS_STAFF,
} as const;



