import { Question } from "@/types";

export const TS_QUESTIONS: Question[] = [
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
    id: "ts-unknown-vs-any-1",
    language: "TypeScript",
    difficulty: "Junior",
    tags: ["typescript", "types", "safety"],
    question: "What is the difference between `any` and `unknown`?",
    shortAnswer: "`any` opts out of type checking; `unknown` is type-safe because it requires narrowing before use.",
    keyPoints: [
      "Everything is assignable to `any` AND `any` is assignable to anything",
      "Everything is assignable to `unknown` BUT `unknown` is not assignable to anything (except any/unknown)",
      "`unknown` forces developers to perform type checks or assertions",
      "Prefer `unknown` for API responses or dynamic data"
    ],
    redFlags: [
      "Saying they are exactly the same",
      "Using `any` when `unknown` would be more appropriate",
      "Not knowing how to narrow an `unknown` type"
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
  }
];

