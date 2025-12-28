import { Question } from "@/types";

export const TS_QUESTIONS_SENIOR: Question[] = [
  {
      id: "ts-mapped-types-1",
      language: "TypeScript",
      difficulty: "Senior",
      tags: ["typescript", "mapped-types", "generics"],
      question: "What are Mapped Types and how do they work?",
      shortAnswer: "Mapped types allow you to create new types based on an existing type by iterating over its keys.",
      keyPoints: [
        "Syntax: `{ [P in K]: T }`",
        "Used for utility types like `Partial`, `Readonly`, `Record`",
        "Can use mapping modifiers like `+` or `-` to add/remove `readonly` or `?`",
        "Works with key remapping using `as` (TS 4.1+)"
      ],
      redFlags: [
        "Confusing mapped types with interfaces",
        "Not knowing how to remove modifiers (e.g., `-readonly`)",
        "Assuming they work at runtime"
      ]
    },
  {
      id: "ts-template-literal-types-1",
      language: "TypeScript",
      difficulty: "Senior",
      tags: ["typescript", "types", "metaprogramming"],
      question: "What are Template Literal Types and provide a use case.",
      shortAnswer: "They allow you to build new string literal types by combining existing ones using backtick syntax.",
      keyPoints: [
        "Syntax: `` `${Type1}_${Type2}` ``",
        "Useful for creating event names, CSS properties, or typed paths",
        "Can be used with `intrinsic` string manipulation types like `Uppercase` or `Capitalize`",
        "Enables high-level type safety for string-based patterns"
      ],
      redFlags: [
        "Thinking it's just runtime string interpolation",
        "Not understanding how it can explode type complexity if used with large unions",
        "Ignoring the utility of `Uppercase/Lowercase` helper types"
      ]
    },
  {
      id: "ts-decorators-1",
      language: "TypeScript",
      difficulty: "Senior",
      tags: ["typescript", "metadata", "oop"],
      question: "Explain the difference between experimental decorators and the new ECMAScript decorators in TypeScript.",
      shortAnswer: "Experimental decorators (legacy) use different metadata and syntax than the standardized ECMAScript decorators supported in TS 5.0+.",
      keyPoints: [
        "Experimental decorators require `experimentalDecorators: true`",
        "Standard decorators don't require specific flags and follow a different API",
        "Standard decorators are more integrated with the language spec",
        "Metadata handling (reflect-metadata) is primary to experimental decorators"
      ],
      redFlags: [
        "Assuming decorators are a stable TS-only feature",
        "Not knowing about the shift to the standard TC39 proposal",
        "Confusing property decorators with method decorators"
      ]
    },
];
