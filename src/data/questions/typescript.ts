import { Question } from "@/types";

import { TS_QUESTIONS_JUNIOR } from "./typescript/junior";
import { TS_QUESTIONS_MID } from "./typescript/mid";
import { TS_QUESTIONS_SENIOR } from "./typescript/senior";
import { TS_QUESTIONS_STAFF } from "./typescript/staff";

export const TS_QUESTIONS: Question[] = [
  ...TS_QUESTIONS_JUNIOR,
  ...TS_QUESTIONS_MID,
  ...TS_QUESTIONS_SENIOR,
  ...TS_QUESTIONS_STAFF,
];

export const TS_QUESTIONS_BY_LEVEL = {
  Junior: TS_QUESTIONS_JUNIOR,
  Mid: TS_QUESTIONS_MID,
  Senior: TS_QUESTIONS_SENIOR,
  Staff: TS_QUESTIONS_STAFF,
} as const;





