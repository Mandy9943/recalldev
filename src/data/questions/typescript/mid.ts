import { Question } from "@/types";

export const TS_QUESTIONS_MID: Question[] = [
  {
      id: "ts-never-type-1",
      language: "TypeScript",
      difficulty: "Mid",
      tags: ["typescript", "types", "exhaustive-checks"],
      question: "What is the `never` type and when should it be used?",
      shortAnswer: "The `never` type represents values that will never occur, used for functions that throw errors or for exhaustive switch checks.",
      keyPoints: [
        "Is a bottom type (subtype of every type, but no type is a subtype of never)",
        "Used for exhaustive checking in switch statements",
        "Returned by functions that always throw or have infinite loops",
        "Useful in conditional types to filter out properties"
      ],
      redFlags: [
        "Confusing `never` with `void` or `any`/`unknown`",
        "Not understanding its role in exhaustiveness checking",
        "Thinking you can assign any value to a variable of type `never`"
      ]
    },
  {
      id: "ts-generic-constraints-1",
      language: "TypeScript",
      difficulty: "Mid",
      tags: ["typescript", "generics"],
      question: "How do you apply constraints to generics in TypeScript?",
      shortAnswer: "Using the `extends` keyword to limit the types that can be passed to a generic parameter.",
      keyPoints: [
        "Example: `<T extends { id: string }>`",
        "Allows access to properties defined in the constraint",
        "Can combine multiple constraints using intersections",
        "Helpful for ensuring a type has specific methods or properties"
      ],
      redFlags: [
        "Thinking `extends` in generics works like class inheritance",
        "Not understanding that a generic without constraints is treated like `any` inside the function",
        "Confusing type parameter constraints with default type parameters"
      ]
    },
];
