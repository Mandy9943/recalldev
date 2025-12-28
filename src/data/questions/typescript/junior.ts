import { Question } from "@/types";

export const TS_QUESTIONS_JUNIOR: Question[] = [
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
      id: "ts-junior-interface-vs-type-1",
      language: "TypeScript",
      difficulty: "Junior",
      tags: ["typescript", "types"],
      question: "What is the difference between `interface` and `type` in TypeScript?",
      shortAnswer: "Both can describe object shapes; `interface` is extendable/mergeable, while `type` is more general (unions/intersections) and cannot be reopened for declaration merging.",
      keyPoints: [
        "`interface` supports declaration merging; `type` does not",
        "`type` can express unions and intersections easily",
        "`interface` is often preferred for public object shapes",
        "Both can extend/compose, but with different ergonomics"
      ],
      redFlags: [
        "Saying one is always better in all cases",
        "Not knowing about declaration merging",
        "Not knowing `type` can model unions"
      ]
    },
  {
      id: "ts-junior-union-narrowing-1",
      language: "TypeScript",
      difficulty: "Junior",
      tags: ["typescript", "types", "narrowing"],
      question: "What is a union type and how do you narrow it safely?",
      shortAnswer: "A union type allows multiple possible types; you narrow using checks like `typeof`, `in`, equality checks, or custom type guards before accessing members.",
      keyPoints: [
        "Example union: `string | number`",
        "Use `typeof x === 'string'` to narrow primitives",
        "Use `in` to check object properties (`'prop' in obj`)",
        "Discriminated unions use a shared literal field (e.g. `kind`)"
      ],
      redFlags: [
        "Using type assertions instead of narrowing",
        "Accessing members without narrowing first",
        "Not knowing what a discriminated union is"
      ]
    },
  {
      id: "ts-junior-type-inference-1",
      language: "TypeScript",
      difficulty: "Junior",
      tags: ["typescript", "types"],
      question: "What is type inference in TypeScript and why is it useful?",
      shortAnswer: "Type inference means TypeScript can deduce types from values/usage, reducing annotations while still keeping safety and IDE help.",
      keyPoints: [
        "Inferred types from literals and return values",
        "Helps catch errors without writing many types",
        "You can still annotate when inference is too broad",
        "Use `as const` to keep literal types when needed"
      ],
      redFlags: [
        "Thinking inference makes types 'dynamic' at runtime",
        "Over-annotating everything without reason",
        "Not knowing about `as const`"
      ]
    },
  {
      id: "ts-junior-optional-vs-undefined-1",
      language: "TypeScript",
      difficulty: "Junior",
      tags: ["typescript", "types", "null-safety"],
      question: "What does an optional property (`prop?: T`) mean? Is it the same as `prop: T | undefined`?",
      shortAnswer: "Optional means the property may be missing; `T | undefined` means it exists but can be `undefined`. They’re similar but not identical in assignability and `in` checks.",
      keyPoints: [
        "Optional property can be absent entirely",
        "A property of type `T | undefined` is present but can hold `undefined`",
        "Both often require checks before use",
        "Use `strictNullChecks` for safer null/undefined handling"
      ],
      redFlags: [
        "Saying they're always identical",
        "Not knowing that 'missing' vs 'undefined value' differ",
        "Ignoring strict null checking"
      ]
    },
  {
      id: "ts-junior-non-null-assertion-1",
      language: "TypeScript",
      difficulty: "Junior",
      tags: ["typescript", "null-safety"],
      question: "What does the non-null assertion operator (`!`) do in TypeScript? When is it risky?",
      shortAnswer: "It tells TypeScript “this value isn’t null/undefined here” and bypasses checks; it’s risky because it can cause runtime crashes if you’re wrong.",
      keyPoints: [
        "It only affects compile-time checking",
        "Common with refs/DOM lookups when you *know* it exists",
        "Prefer real checks or better types when possible",
        "Can hide real bugs if overused"
      ],
      redFlags: [
        "Thinking it changes runtime behavior",
        "Using `!` everywhere instead of fixing types",
        "Not understanding it can still throw at runtime"
      ]
    },
  {
      id: "ts-junior-enum-vs-union-1",
      language: "TypeScript",
      difficulty: "Junior",
      tags: ["typescript", "types"],
      question: "When would you use a string union type instead of an `enum`?",
      shortAnswer: "String unions are simpler and tree-shake well with no runtime output; `enum`s emit runtime code (unless `const enum`) and can be useful for interop or reverse mapping.",
      keyPoints: [
        "Unions like `'a' | 'b'` are compile-time only",
        "`enum` usually generates JS at runtime",
        "String unions work great with discriminated unions",
        "`const enum` has trade-offs (build/tooling constraints)"
      ],
      redFlags: [
        "Thinking enums are purely type-level with zero runtime",
        "Not knowing unions can replace many enum use cases",
        "Using enums just because they exist"
      ]
    },
  {
      id: "ts-junior-satisfies-1",
      language: "TypeScript",
      difficulty: "Junior",
      tags: ["typescript", "types"],
      question: "What does the `satisfies` operator do and how is it different from a type assertion?",
      shortAnswer: "`satisfies` checks that a value matches a type while preserving the value’s inferred type; a type assertion (`as T`) can lie and forces the type.",
      keyPoints: [
        "`satisfies` validates without widening as much",
        "Helps keep literal types while still enforcing a shape",
        "Type assertions can hide errors",
        "Useful for config objects"
      ],
      redFlags: [
        "Saying `satisfies` changes runtime behavior",
        "Using `as any` instead of fixing types",
        "Not understanding the difference between checking vs forcing a type"
      ]
    },
  {
      id: "ts-junior-readonly-1",
      language: "TypeScript",
      difficulty: "Junior",
      tags: ["typescript", "types", "immutability"],
      question: "What does `readonly` do in TypeScript? Does it guarantee immutability at runtime?",
      shortAnswer: "`readonly` prevents assignment at compile time; it does not make runtime values immutable.",
      keyPoints: [
        "Works for properties and arrays (`ReadonlyArray<T>`)",
        "It’s enforced by TypeScript only",
        "Runtime immutability requires patterns or `Object.freeze`",
        "Useful for safer APIs and preventing accidental mutation"
      ],
      redFlags: [
        "Thinking `readonly` freezes objects at runtime",
        "Not knowing about `ReadonlyArray<T>`",
        "Overusing readonly where mutation is required"
      ]
    },
];
