import { Question } from "@/types";

import { ARCH_QUESTIONS_JUNIOR } from "./architecture/junior";
import { ARCH_QUESTIONS_MID } from "./architecture/mid";
import { ARCH_QUESTIONS_SENIOR } from "./architecture/senior";
import { ARCH_QUESTIONS_STAFF } from "./architecture/staff";

export const ARCH_QUESTIONS: Question[] = [
  ...ARCH_QUESTIONS_JUNIOR,
  ...ARCH_QUESTIONS_MID,
  ...ARCH_QUESTIONS_SENIOR,
  ...ARCH_QUESTIONS_STAFF,
];

export const ARCH_QUESTIONS_BY_LEVEL = {
  Junior: ARCH_QUESTIONS_JUNIOR,
  Mid: ARCH_QUESTIONS_MID,
  Senior: ARCH_QUESTIONS_SENIOR,
  Staff: ARCH_QUESTIONS_STAFF,
} as const;




