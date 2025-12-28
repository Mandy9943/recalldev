import { Question } from "@/types";

import { PY_QUESTIONS_JUNIOR } from "./python/junior";
import { PY_QUESTIONS_MID } from "./python/mid";
import { PY_QUESTIONS_SENIOR } from "./python/senior";
import { PY_QUESTIONS_STAFF } from "./python/staff";

export const PY_QUESTIONS: Question[] = [
  ...PY_QUESTIONS_JUNIOR,
  ...PY_QUESTIONS_MID,
  ...PY_QUESTIONS_SENIOR,
  ...PY_QUESTIONS_STAFF,
];

export const PY_QUESTIONS_BY_LEVEL = {
  Junior: PY_QUESTIONS_JUNIOR,
  Mid: PY_QUESTIONS_MID,
  Senior: PY_QUESTIONS_SENIOR,
  Staff: PY_QUESTIONS_STAFF,
} as const;



