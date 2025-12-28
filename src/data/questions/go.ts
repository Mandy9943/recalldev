import { Question } from "@/types";

import { GO_QUESTIONS_JUNIOR } from "./go/junior";
import { GO_QUESTIONS_MID } from "./go/mid";
import { GO_QUESTIONS_SENIOR } from "./go/senior";
import { GO_QUESTIONS_STAFF } from "./go/staff";

export const GO_QUESTIONS: Question[] = [
  ...GO_QUESTIONS_JUNIOR,
  ...GO_QUESTIONS_MID,
  ...GO_QUESTIONS_SENIOR,
  ...GO_QUESTIONS_STAFF,
];

export const GO_QUESTIONS_BY_LEVEL = {
  Junior: GO_QUESTIONS_JUNIOR,
  Mid: GO_QUESTIONS_MID,
  Senior: GO_QUESTIONS_SENIOR,
  Staff: GO_QUESTIONS_STAFF,
} as const;



