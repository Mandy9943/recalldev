import { Question } from "@/types";
import { ARCH_QUESTIONS as NEW_ARCH } from "./questions/architecture";
import { GO_QUESTIONS as NEW_GO } from "./questions/go";
import { JS_QUESTIONS as NEW_JS } from "./questions/javascript";
import { PY_QUESTIONS as NEW_PY } from "./questions/python";
import { TS_QUESTIONS as NEW_TS } from "./questions/typescript";

// --- Original JavaScript Questions ---
const JS_QUESTIONS: Question[] = [
  {
    id: "js-closure-memory-retention-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["closures", "memory", "gc", "v8"],
    question:
      "Consider the following code:\n```js\nfunction createHandler() {\n  const largeArray = new Array(1e6).fill('data');\n  return function handler(event) {\n    console.log(event.type);\n  };\n}\n\nlet handler = createHandler();\ndocument.body.addEventListener('click', handler);\nhandler = null;\n```\nWhy might `largeArray` remain in memory after `handler = null`, and how would you fix this?",
    shortAnswer:
      "Because the closure is still strongly referenced by the event listener, preventing garbage collection of `largeArray`.",
    keyPoints: [
      "Closures retain references to their lexical environment as long as they are reachable",
      "DOM event listeners create external strong references to functions",
      "V8 cannot collect captured variables if any reference path exists",
      "Explicitly removing the event listener or avoiding capturing large objects fixes the leak",
    ],
    redFlags: [
      "Saying garbage collection happens immediately when variables are set to null",
      "Blaming memory leaks solely on JavaScript without considering DOM references",
      "Not understanding closure reachability",
    ],
  },
  {
    id: "js-microtask-macrotask-order-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["event-loop", "async", "microtasks", "macrotasks"],
    question:
      "What is the output of the following code and why?\n```js\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve()\n  .then(() => {\n    console.log('C');\n    return Promise.resolve();\n  })\n  .then(() => console.log('D'));\nconsole.log('E');\n```",
    shortAnswer:
      "The output is A, E, C, D, B due to microtasks running before macrotasks after the current call stack.",
    keyPoints: [
      "Synchronous code executes first on the call stack",
      "Promise callbacks are scheduled as microtasks",
      "All microtasks are drained before the event loop processes macrotasks",
      "setTimeout callbacks are macrotasks",
    ],
    redFlags: [
      "Incorrect ordering of microtasks and macrotasks",
      "Believing setTimeout with 0 runs immediately",
      "Lack of understanding of event loop phases",
    ],
  },
  {
    id: "js-v8-optimization-bailout-1",
    language: "JavaScript",
    difficulty: "Staff",
    tags: ["v8", "jit", "performance", "optimization"],
    question:
      "Analyze the performance characteristics of this function:\n```js\nfunction sum(arr) {\n  let total = 0;\n  for (let i = 0; i < arr.length; i++) {\n    total += arr[i];\n  }\n  return total;\n}\n\nsum([1, 2, 3]);\nsum([1, 2, '3']);\n```\nWhy can the second call cause a V8 optimization bailout?",
    shortAnswer:
      "Because mixing numeric and string types changes the element kind, invalidating optimized machine code assumptions.",
    keyPoints: [
      "V8 optimizes based on observed types (hidden classes and element kinds)",
      "The first call uses packed SMI elements",
      "Introducing a string forces a transition to a generic elements kind",
      "Optimized code is deoptimized when assumptions are violated",
    ],
    redFlags: [
      "Claiming JavaScript engines do not optimize loops",
      "Ignoring the impact of type instability",
      "Assuming JIT recompilation is free",
    ],
  },
];

// --- Original TypeScript Questions ---
const TS_QUESTIONS: Question[] = [
  {
    id: "ts-variance-contravariance-1",
    language: "TypeScript",
    difficulty: "Senior",
    tags: ["typescript", "variance", "type-system"],
    question:
      "Explain why the following assignment is unsafe and how TypeScript handles it:\n```ts\ntype Animal = { name: string };\ntype Dog = { name: string; breed: string };\n\nlet dogHandler: (d: Dog) => void;\nlet animalHandler: (a: Animal) => void;\n\nanimalHandler = dogHandler;\n```",
    shortAnswer:
      "Function parameter types are contravariant, so assigning a narrower parameter type is unsafe; TypeScript allows it only under bivariance in specific cases.",
    keyPoints: [
      "Contravariance means accepting broader input types",
      "A function expecting Dog cannot safely handle any Animal",
      "TypeScript is unsound by design for usability",
      "StrictFunctionTypes changes this behavior for function types",
    ],
    redFlags: [
      "Confusing covariance and contravariance",
      "Believing TypeScript is fully sound",
      "Not understanding function type assignability",
    ],
  },
  {
    id: "ts-branded-types-1",
    language: "TypeScript",
    difficulty: "Senior",
    tags: ["typescript", "type-safety", "patterns"],
    question:
      "How do branded types improve type safety in TypeScript? Provide an example use case.",
    shortAnswer:
      "They create nominal-like distinctions between structurally identical types, preventing accidental misuse.",
    keyPoints: [
      "TypeScript is structurally typed by default",
      "Branding uses intersection types with unique symbols or tags",
      "Common use cases include IDs, tokens, and domain primitives",
      "Brands exist only at compile time",
    ],
    redFlags: [
      "Saying branded types affect runtime behavior",
      "Not understanding structural typing",
      "Using type aliases without branding for critical domains",
    ],
  },
];

// --- Original Architecture Questions ---
const ARCH_QUESTIONS: Question[] = [
  {
    id: "arch-cap-theorem-tradeoffs-1",
    language: "General",
    difficulty: "Senior",
    tags: ["architecture", "distributed-systems", "cap"],
    question:
      "In a globally distributed system, why is CA effectively unattainable during a network partition, and how do real systems handle this trade-off?",
    shortAnswer:
      "Because partitions force a choice between consistency and availability; real systems degrade one to preserve the other.",
    keyPoints: [
      "Network partitions are inevitable in distributed systems",
      "Consistency requires coordination across nodes",
      "Availability requires responding without coordination",
      "Systems choose CP or AP depending on business requirements",
    ],
    redFlags: [
      "Claiming CAP is outdated or irrelevant",
      "Saying CA systems exist under partition",
      "Not tying trade-offs to real-world failure modes",
    ],
  },
  {
    id: "arch-idempotency-distributed-1",
    language: "General",
    difficulty: "Senior",
    tags: ["architecture", "distributed-systems", "idempotency"],
    question:
      "Why is idempotency critical in distributed APIs, and how would you implement it for a payment service?",
    shortAnswer:
      "Because retries are unavoidable; idempotency ensures repeated requests do not cause duplicated side effects.",
    keyPoints: [
      "Network timeouts cause clients to retry requests",
      "Idempotency keys uniquely identify logical operations",
      "The server must persist and deduplicate requests",
      "Especially critical for financial transactions",
    ],
    redFlags: [
      "Relying on client-side retries only",
      "Assuming at-most-once delivery",
      "Not persisting idempotency state",
    ],
  },
  {
    id: "arch-cache-invalidation-1",
    language: "General",
    difficulty: "Staff",
    tags: ["architecture", "caching", "scalability"],
    question:
      "Compare write-through, write-back, and cache-aside strategies. When would you choose each?",
    shortAnswer:
      "Each strategy trades off consistency, latency, and operational complexity depending on access patterns.",
    keyPoints: [
      "Write-through ensures strong consistency but higher write latency",
      "Write-back improves performance but risks data loss",
      "Cache-aside gives application-level control and simplicity",
      "Choice depends on read/write ratio and failure tolerance",
    ],
    redFlags: [
      "Claiming one strategy is always superior",
      "Ignoring failure scenarios",
      "Not understanding consistency implications",
    ],
  },
];

// --- Original Python Questions ---
const PY_QUESTIONS: Question[] = [
  {
    id: "py-gil-multithreading-1",
    language: "Python",
    difficulty: "Senior",
    tags: ["python", "concurrency", "gil"],
    question:
      "Why does Python's GIL limit CPU-bound multithreading, and why does multiprocessing avoid this issue?",
    shortAnswer:
      "The GIL enforces single-threaded bytecode execution per process, while multiprocessing uses separate memory spaces and GILs.",
    keyPoints: [
      "The GIL simplifies memory management in CPython",
      "Only one thread executes Python bytecode at a time",
      "CPU-bound threads contend on the GIL",
      "Multiprocessing spawns separate processes with independent GILs",
    ],
    redFlags: [
      "Saying Python cannot do concurrency",
      "Confusing I/O-bound and CPU-bound workloads",
      "Not understanding CPython internals",
    ],
  },
  {
    id: "py-descriptor-dunder-1",
    language: "Python",
    difficulty: "Staff",
    tags: ["python", "internals", "descriptors"],
    question:
      "Explain how Python's descriptor protocol works and how `@property` is implemented under the hood.",
    shortAnswer:
      "Descriptors define custom attribute access via `__get__`, `__set__`, and `__delete__`; `property` is a built-in descriptor.",
    keyPoints: [
      "Attribute lookup checks for data descriptors first",
      "Descriptors enable computed and managed attributes",
      "The property type wraps getter, setter, and deleter functions",
      "Used extensively in frameworks and ORMs",
    ],
    redFlags: [
      "Thinking properties are syntactic sugar only",
      "Not understanding attribute resolution order",
      "Inability to explain `__get__` semantics",
    ],
  },
];

// --- Merged Export ---
export const INITIAL_QUESTIONS: Question[] = [
  ...JS_QUESTIONS,
  ...NEW_JS,
  ...TS_QUESTIONS,
  ...NEW_TS,
  ...ARCH_QUESTIONS,
  ...NEW_ARCH,
  ...PY_QUESTIONS,
  ...NEW_PY,
  ...NEW_GO,
];
