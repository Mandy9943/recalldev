import { Question } from "@/types";

export const JS_QUESTIONS_STAFF: Question[] = [
  {
    id: "js-v8-hidden-classes-1",
    language: "JavaScript",
    difficulty: "Staff",
    tags: ["v8", "performance", "hidden-classes", "engines"],
    question:
      "What are V8 'Hidden Classes' (or Shapes), and how does property initialization order affect object performance?",
    shortAnswer:
      "V8 creates hidden classes to optimize property access; changing the order of property assignments creates different hidden classes, leading to 'megamorphic' call sites and slower access.",
    keyPoints: [
      "Objects with the same properties in the same order share the same hidden class",
      "Hidden classes allow V8 to use inline caching for property lookups",
      "Initializing properties in a different order forces V8 to create new transition paths",
      "Always initialize all properties in the constructor in a consistent order",
    ],
    redFlags: [
      "Thinking property access is always a slow hash-map lookup",
      "Ignoring the impact of adding properties dynamically after instantiation",
      "Not understanding why 'monomorphic' code is faster than 'polymorphic' code",
    ],
  },
  {
    id: "js-sharedarraybuffer-atomics-1",
    language: "JavaScript",
    difficulty: "Staff",
    tags: ["concurrency", "memory", "workers", "atomics"],
    question:
      "What is the purpose of `SharedArrayBuffer` and `Atomics` in multi-threaded JavaScript (Web Workers)?",
    shortAnswer:
      "`SharedArrayBuffer` allows multiple workers to share the same memory space directly; `Atomics` provides thread-safe operations to prevent race conditions during concurrent access.",
    keyPoints: [
      "Normal Worker communication uses structured cloning (copying data)",
      "SharedArrayBuffer avoids copying, enabling high-performance parallel processing",
      "Atomics (load, store, wait, notify) ensure operations are finished before others start",
      "Crucial for building complex data structures (like locks or queues) shared between threads",
    ],
    redFlags: [
      "Assuming Web Workers share memory by default",
      "Ignoring the security implications (Spectre/Meltdown) that led to its temporary removal",
      "Thinking `Atomics` is just for performance and not for memory safety",
    ],
  },
  {
    id: "js-tail-call-optimization-1",
    language: "JavaScript",
    difficulty: "Staff",
    tags: ["recursion", "performance", "optimization", "tco"],
    question:
      "What is Proper Tail Call (PTC) optimization, and why is it only supported in specific environments like Safari/JavaScriptCore?",
    shortAnswer:
      "PTC allows calling a function at the end of another without adding a new frame to the call stack; it requires strict mode and a specific syntactic position to prevent stack overflows.",
    keyPoints: [
      "Optimizes recursive functions into loops internally",
      "Requires the call to be in 'tail position' (last action in the function)",
      "Controversial because it makes stack traces harder to debug for developers",
      "Most engines (V8, SpiderMonkey) chose not to implement it due to complexity and debugging trade-offs",
    ],
    redFlags: [
      "Confusing PTC with general recursion optimization",
      "Thinking all recursive calls are automatically optimized in JS",
      "Not knowing that it's part of the ES6 spec but poorly implemented",
    ],
  },
  {
    id: "js-core-weakref-finalizationregistry-1",
    language: "JavaScript",
    difficulty: "Staff",
    tags: ["memory", "gc", "weakref"],
    question:
      "What are `WeakRef` and `FinalizationRegistry`, and why are they considered advanced/foot-gunny APIs?",
    shortAnswer:
      "They let you reference objects without preventing GC and run cleanup callbacks after collection, but GC timing is non-deterministic, making logic brittle if used for correctness.",
    keyPoints: [
      "GC timing is unpredictable; callbacks may be delayed or never run",
      "Use for caches/metadata, not for core correctness",
      "Avoid resurrecting objects or relying on finalizers for resource management",
      "Environment differences can change behavior significantly",
    ],
    redFlags: [
      "Using finalizers to close critical resources deterministically",
      "Assuming GC happens immediately after objects become unreachable",
      "Building business logic on top of non-deterministic collection",
    ],
  },
  {
    id: "js-react-server-components-1",
    language: "JavaScript",
    difficulty: "Staff",
    tags: ["react", "server-components", "architecture"],
    question:
      "Conceptually, what are React Server Components and what constraints do they impose?",
    shortAnswer:
      "Server Components render on the server and stream serialized output; they can't use client-only hooks or browser APIs, and they change data-fetching and bundling boundaries.",
    keyPoints: [
      "Split between server-only and client components",
      "Server components can access server resources directly",
      "Client components handle interactivity and hooks like `useState`",
      "Affects bundle size by keeping server-only code out of client bundles",
    ],
    redFlags: [
      "Assuming server components can use `useEffect`",
      "Treating them like classic SSR only",
      "Not understanding the server/client boundary implications",
    ],
  },
];
