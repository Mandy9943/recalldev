import { Question } from "@/types";

export const JS_QUESTIONS: Question[] = [
  {
    id: "js-prototype-inheritance-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["prototypes", "inheritance", "oop"],
    question:
      "Explain the difference between `__proto__` and `prototype` in JavaScript.",
    shortAnswer:
      "`prototype` is a property of constructor functions used to build `__proto__` on new instances; `__proto__` is the actual link to the prototype chain on an object.",
    keyPoints: [
      "Only functions have a `prototype` property (except arrow functions)",
      "All objects have a `__proto__` property (the internal [[Prototype]])",
      "Instances inherit from their constructor's `prototype`",
      "The prototype chain ends at `Object.prototype` (usually null)",
    ],
    redFlags: [
      "Thinking `__proto__` and `prototype` are the same thing",
      "Believing all objects have a `prototype` property",
      "Not understanding how the prototype chain is traversed",
    ],
  },
  {
    id: "js-this-context-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["this", "context", "functions"],
    question: "How is the value of `this` determined in JavaScript?",
    shortAnswer:
      "It is determined by how a function is called: implicitly by the object, explicitly via call/apply/bind, or lexically in arrow functions.",
    keyPoints: [
      "Global context: `this` refers to global object (window/global) or undefined in strict mode",
      "Method call: `this` refers to the object before the dot",
      "Arrow functions: `this` is inherited from the enclosing lexical scope",
      "Explicit binding: `call`, `apply`, and `bind` override context",
    ],
    redFlags: [
      "Thinking `this` refers to the function itself",
      "Not knowing that arrow functions don't have their own `this`",
      "Confusing `call` and `apply` arguments",
    ],
  },
  {
    id: "js-strict-mode-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["strict-mode", "syntax"],
    question: "What are some key changes when using `'use strict';`?",
    shortAnswer:
      "It prevents accidental globals, eliminates `this` coercion to the global object, and makes silent errors throw exceptions.",
    keyPoints: [
      "Variables must be declared (prevents global pollution)",
      "Functions in strict mode have `this` as `undefined` if not called as methods",
      "Prevents deleting non-configurable properties",
      "Disallows duplicate parameter names",
    ],
    redFlags: [
      "Saying it's just for 'cleaner code' without specific examples",
      "Not knowing it affects the value of `this` in functions",
      "Thinking it's the default in all environments (though common in ESM)",
    ],
  },
  {
    id: "js-event-delegation-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["dom", "events", "performance"],
    question: "What is event delegation and why is it useful?",
    shortAnswer:
      "Attaching a single event listener to a parent element to handle events for multiple children using event bubbling.",
    keyPoints: [
      "Uses the principle of event propagation (bubbling phase)",
      "Reduces memory consumption by using fewer event listeners",
      "Handles dynamically added child elements automatically",
      "The `event.target` identifies which child triggered the event",
    ],
    redFlags: [
      "Thinking event delegation uses capturing by default",
      "Not understanding that some events (like focus/blur) don't bubble",
      "Suggesting it's always better to attach listeners to every child",
    ],
  },
  {
    id: "js-currying-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["functional-programming", "currying", "closures"],
    question:
      "What is currying and how would you implement a generic `curry` function?",
    shortAnswer:
      "Currying is transforming a function that takes multiple arguments into a sequence of functions that each take a single argument.",
    keyPoints: [
      "Enables partial application of functions",
      "Uses closures to remember previous arguments",
      "Useful for configuration and reusability",
      "Implementation usually checks `func.length` against collected arguments",
    ],
    redFlags: [
      "Confusing currying with partial application",
      "Inability to explain how closures enable currying",
      "Not understanding the recursive nature of a generic curry implementation",
    ],
  },
  {
    id: "js-weakmap-usecase-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["memory", "data-structures", "weakmap"],
    question: "When should you use `WeakMap` instead of `Map`?",
    shortAnswer:
      "Use `WeakMap` when you want to associate data with an object without preventing that object from being garbage collected.",
    keyPoints: [
      "Keys must be objects (not primitives)",
      "References to keys are 'weak' and don't count towards GC",
      "Not iterable, which prevents leaks from enumeration",
      "Commonly used for private data or metadata for DOM nodes",
    ],
    redFlags: [
      "Saying `WeakMap` is 'just a faster Map'",
      "Trying to use primitives as keys in a `WeakMap`",
      "Not understanding that `WeakMap` keys are not enumerable",
    ],
  },
  {
    id: "js-module-systems-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["modules", "esm", "commonjs"],
    question: "Compare ESM (ECMAScript Modules) and CommonJS.",
    shortAnswer:
      "ESM is static, asynchronous, and standard; CommonJS is dynamic, synchronous, and used primarily in Node.js.",
    keyPoints: [
      "ESM uses `import/export`, CJS uses `require/module.exports`",
      "ESM imports are live bindings; CJS are snapshots",
      "ESM is analyzed at compile-time (allowing tree-shaking)",
      "CJS imports are loaded synchronously at runtime",
    ],
    redFlags: [
      "Claiming CJS and ESM are interchangeable without issues",
      "Not knowing ESM is the official standard",
      "Assuming `require` works inside ESM files without configuration",
    ],
  },
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
    id: "js-proxy-reactivity-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["proxy", "reactivity", "metaprogramming"],
    question:
      "How does the `Proxy` object enable modern reactivity systems (like Vue 3), and what are its advantages over `Object.defineProperty`?",
    shortAnswer:
      "Proxies intercept operations (get, set, delete) on the whole object, including newly added properties, whereas `defineProperty` requires pre-existing keys and cannot detect additions/deletions.",
    keyPoints: [
      "Proxies use 'traps' to hook into fundamental language operations",
      "Enables deep reactivity without needing to recursively define properties upfront",
      "Can intercept 13 different types of operations (has, deleteProperty, ownKeys, etc.)",
      "Avoids the performance overhead of 'getter/setter' mass-definition for large objects",
    ],
    redFlags: [
      "Confusing Proxies with simple object wrappers",
      "Not knowing that Proxies cannot be polyfilled for IE11",
      "Thinking Proxies are only for logging or validation",
    ],
  },
  {
    id: "js-generators-async-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["generators", "async", "iterators"],
    question:
      "Explain how Generators can be used to manage asynchronous flows. How does this relate to the implementation of `async/await`?",
    shortAnswer:
      "Generators allow pausing and resuming execution; `async/await` is essentially syntactic sugar over generators combined with promises (yield + promise runner).",
    keyPoints: [
      "Generators yield control back to the caller while maintaining state",
      "A 'runner' function can resume a generator when a yielded promise resolves",
      "Enables writing asynchronous code that looks synchronous without blocking",
      "The `Symbol.iterator` and `Symbol.asyncIterator` protocols are the foundation",
    ],
    redFlags: [
      "Thinking generators are only for creating infinite sequences",
      "Not understanding the bidirectional communication (passing values back into `.next()`)",
      "Thinking `async/await` is a completely new engine feature unrelated to generators",
    ],
  },
  {
    id: "js-temporal-dead-zone-internals-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["hoisting", "tdz", "execution-context"],
    question:
      "Explain the Temporal Dead Zone (TDZ) in the context of execution contexts and hoisting.",
    shortAnswer:
      "TDZ is the period between entering a scope and the variable's actual declaration; unlike `var`, `let` and `const` are hoisted but remain uninitialized, making any access throw a ReferenceError.",
    keyPoints: [
      "Variables are 'created' when the scope is entered but not 'initialized'",
      "Accessing a variable in the TDZ throws a `ReferenceError`, not `undefined`",
      "Ensures variables are never used before their logical definition point",
      "Helps catch bugs related to hoisting that were common with `var`",
    ],
    redFlags: [
      "Claiming `let` and `const` are not hoisted at all",
      "Thinking TDZ is just a syntax error",
      "Not knowing the difference between 'declaration' and 'initialization' in the engine",
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
    id: "js-well-known-symbols-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["symbols", "internals", "protocols"],
    question:
      "What are 'Well-Known Symbols' (e.g., `Symbol.iterator`, `Symbol.toPrimitive`) and how do they allow developers to customize language behavior?",
    shortAnswer:
      "They are built-in symbols used by the JS engine to expose 'hooks' into internal behaviors like iteration, type conversion, and property searching.",
    keyPoints: [
      "`Symbol.iterator` defines how an object is used in `for...of` loops",
      "`Symbol.toPrimitive` controls how an object is converted to a string or number",
      "`Symbol.species` allows controlling the constructor used in methods like `map()`",
      "They prevent name collisions because symbols are unique, unlike string keys",
    ],
    redFlags: [
      "Thinking symbols are just 'hidden strings'",
      "Not knowing how to make a custom object iterable",
      "Confusing `Symbol()` with `Symbol.for()`",
    ],
  },
  {
    id: "js-private-fields-hash-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["oop", "classes", "privacy"],
    question:
      "How do native private class fields (`#field`) differ from the convention of using an underscore (`_field`) or using Closures for privacy?",
    shortAnswer:
      "Native private fields have hard runtime privacy enforced by the engine; they are not accessible from outside the class, even via reflection, unlike underscore conventions.",
    keyPoints: [
      "Privacy is enforced by the syntax (`#`) and the engine",
      "Does not rely on closures, which can be more memory-efficient for many instances",
      "Cannot be accessed or modified using `Object.keys()` or `getOwnPropertySymbols()`",
      "Requires the field to be declared in the class body upfront",
    ],
    redFlags: [
      "Thinking `#` is just syntactic sugar for `_` (underscore)",
      "Trying to access `#field` using `this['#field']`",
      "Not understanding that private fields are not inherited in the same way as public ones",
    ],
  },
  // --- React (Junior/Mid) ---
  {
    id: "js-react-jsx-transform-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["react", "jsx", "build-tools"],
    question:
      "What does JSX compile to, and what changed with the new JSX transform (React 17+)?",
    shortAnswer:
      "JSX compiles to function calls that create elements; with the new transform you often don't need to import React just to use JSX.",
    keyPoints: [
      "Classic transform compiles JSX to `React.createElement(...)`",
      "New transform uses `jsx/jsxs` helpers from `react/jsx-runtime`",
      "Bundlers configure this via Babel/TS settings",
      "JSX is syntax, not a runtime feature",
    ],
    redFlags: [
      "Thinking JSX is valid JavaScript at runtime without compilation",
      "Believing React must always be in scope for JSX",
      "Not understanding that JSX becomes plain JS calls",
    ],
  },
  {
    id: "js-react-keys-reconciliation-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["react", "reconciliation", "performance"],
    question:
      "Why are `key`s important when rendering lists in React, and why is using array index often problematic?",
    shortAnswer:
      "Keys help React match elements across renders; using indices breaks identity when items reorder/insert/delete, causing wrong state reuse and DOM updates.",
    keyPoints: [
      "Keys must be stable and unique among siblings",
      "Index keys are risky when list order can change",
      "Wrong keys lead to subtle UI/state bugs",
      "Keys are hints to the reconciler, not passed as props",
    ],
    redFlags: [
      "Saying keys are only for avoiding console warnings",
      "Using random values as keys (changes every render)",
      "Not connecting keys to preserving component state",
    ],
  },
  {
    id: "js-react-controlled-uncontrolled-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["react", "forms", "state"],
    question:
      "What's the difference between controlled and uncontrolled components in React forms?",
    shortAnswer:
      "Controlled inputs store the source of truth in React state; uncontrolled inputs keep their own DOM state and are read via refs.",
    keyPoints: [
      "Controlled: value + onChange driven by state",
      "Uncontrolled: defaultValue + ref access",
      "Controlled enables validation and conditional UI easily",
      "Uncontrolled can be simpler for large forms/perf",
    ],
    redFlags: [
      "Mixing controlled and uncontrolled for the same input",
      "Not knowing why an input becomes read-only without onChange",
      "Assuming uncontrolled means 'not in React'",
    ],
  },
  {
    id: "js-react-useeffect-deps-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "hooks", "effects"],
    question:
      "Explain the `useEffect` dependency array. What problems happen if it's wrong?",
    shortAnswer:
      "Dependencies tell React when to re-run the effect; missing deps can cause stale closures/bugs, extra deps can cause unnecessary reruns or loops.",
    keyPoints: [
      "Effects capture values from the render they were created in",
      "Missing deps often cause stale data and inconsistent behavior",
      "Adding unstable deps (inline objects/functions) causes frequent reruns",
      "Use memoization or move logic into the effect to stabilize deps",
    ],
    redFlags: [
      "Treating deps as an optimization toggle rather than correctness",
      "Disabling ESLint hook rules without understanding",
      "Not understanding closures per-render",
    ],
  },
  {
    id: "js-react-uselayouteffect-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "hooks", "rendering"],
    question: "When would you use `useLayoutEffect` instead of `useEffect`?",
    shortAnswer:
      "`useLayoutEffect` runs synchronously after DOM mutations but before paint, useful for measuring layout to avoid flicker; it can block painting.",
    keyPoints: [
      "Runs before browser paint; `useEffect` runs after paint",
      "Used for reading layout and synchronously re-rendering",
      "Can hurt performance if heavy",
      "Avoid on the server (warnings) unless handled properly",
    ],
    redFlags: [
      "Using `useLayoutEffect` everywhere by default",
      "Not understanding render/commit phases",
      "Ignoring that it can block the UI thread",
    ],
  },
  {
    id: "js-react-memo-usememo-usecallback-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "performance", "memoization"],
    question:
      "Compare `React.memo`, `useMemo`, and `useCallback`. What do they memoize?",
    shortAnswer:
      "`React.memo` memoizes a component render, `useMemo` memoizes a computed value, and `useCallback` memoizes a function reference.",
    keyPoints: [
      "`React.memo` uses shallow prop comparison by default",
      "`useCallback(fn, deps)` is basically `useMemo(() => fn, deps)`",
      "Memoization helps only when re-renders are expensive or props are stable",
      "Overuse can add complexity and sometimes regress performance",
    ],
    redFlags: [
      "Thinking memoization always improves performance",
      "Using `useMemo` to 'prevent re-render' (it doesn't)",
      "Not understanding referential equality",
    ],
  },
  {
    id: "js-react-context-performance-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "context", "performance"],
    question:
      "Why can React Context cause performance issues and how do you mitigate it?",
    shortAnswer:
      "Context updates re-render all consumers; mitigate by splitting contexts, memoizing values, using selectors, or moving state closer to where it's used.",
    keyPoints: [
      "Provider `value` identity changes trigger updates",
      "Split into multiple providers by concern",
      "Memoize provider value with `useMemo` when appropriate",
      "Consider state libraries with selector-based subscriptions",
    ],
    redFlags: [
      "Putting the entire app state into one context",
      "Passing new object literals every render as provider value",
      "Confusing context with a global store with selectors",
    ],
  },
  {
    id: "js-react-strictmode-double-invoke-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "strict-mode", "effects"],
    question:
      "In React 18 dev mode, why do some effects run twice under `StrictMode`?",
    shortAnswer:
      "React intentionally double-invokes certain lifecycles/effects in development to surface unsafe side effects and ensure code is resilient to re-mounting.",
    keyPoints: [
      "Only in development; production behavior differs",
      "Helps detect non-idempotent effects",
      "Forces cleanup logic to be correct",
      "Related to concurrent rendering expectations",
    ],
    redFlags: [
      "Assuming it's a production bug",
      "Fixing by removing StrictMode instead of making effects idempotent",
      "Not understanding effect cleanup semantics",
    ],
  },
  // --- React (Senior/Staff) ---
  {
    id: "js-react-reconciliation-heuristics-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "reconciliation", "internals"],
    question:
      "At a high level, how does React reconciliation work, and what heuristics does it use to diff trees efficiently?",
    shortAnswer:
      "React uses a heuristic diff: it assumes elements of different types produce different trees and uses keys to match children, avoiding an O(n^3) tree diff.",
    keyPoints: [
      "Element type changes cause subtree replacement",
      "Keys provide stable identity for list children",
      "Reconciliation is separate from rendering to the host (DOM/native)",
      "Heuristics trade optimal diffs for speed and predictability",
    ],
    redFlags: [
      "Claiming React performs an optimal tree diff algorithm",
      "Ignoring the role of keys in child matching",
      "Confusing virtual DOM diff with actual DOM mutation timing",
    ],
  },
  {
    id: "js-react-concurrent-rendering-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "concurrency", "rendering"],
    question:
      "What does 'Concurrent Rendering' mean in React 18, and what kinds of bugs can it surface?",
    shortAnswer:
      "React can interrupt and restart rendering work; code that assumes renders are committed immediately or has side effects during render can break.",
    keyPoints: [
      "Rendering can be paused, resumed, or restarted",
      "Side effects must live in effects/handlers, not render",
      "Idempotency becomes critical",
      "Some libraries need concurrent-safe subscriptions",
    ],
    redFlags: [
      "Doing mutations during render",
      "Assuming state updates are always synchronous",
      "Not understanding tearing in external stores",
    ],
  },
  {
    id: "js-react-suspense-data-fetching-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "suspense", "async"],
    question:
      "What is React Suspense conceptually, and why is data fetching with Suspense different from 'loading state' patterns?",
    shortAnswer:
      "Suspense lets components 'throw' a promise to pause rendering and show a fallback; it centralizes async coordination in the renderer instead of manual loading flags.",
    keyPoints: [
      "Fallback UI is part of the tree, not scattered booleans",
      "Works best with libraries that integrate with Suspense",
      "Enables streaming/partial hydration in SSR scenarios",
      "Avoids race conditions from manual loading state handling",
    ],
    redFlags: [
      "Thinking Suspense is just a spinner component",
      "Using Suspense for arbitrary promises without integration",
      "Not understanding boundary placement effects UX",
    ],
  },
  {
    id: "js-react-hydration-mismatch-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "ssr", "hydration"],
    question:
      "What causes hydration mismatches in React SSR, and how do you prevent them?",
    shortAnswer:
      "Mismatches happen when server-rendered markup differs from client render (randomness, time, locale, env differences); prevent by making renders deterministic and deferring client-only logic.",
    keyPoints: [
      "Avoid `Math.random()`/`Date.now()` in render for SSR",
      "Ensure locale/timezone formatting is consistent",
      "Use client-only effects for browser APIs",
      "Stabilize IDs (e.g., React `useId`) where appropriate",
    ],
    redFlags: [
      "Fixing by disabling SSR rather than making output deterministic",
      "Using client-only values directly during render",
      "Not understanding that hydration expects identical markup",
    ],
  },
  {
    id: "js-react-error-boundaries-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "errors", "resilience"],
    question:
      "What do Error Boundaries catch in React, and what do they NOT catch?",
    shortAnswer:
      "They catch errors during rendering, lifecycle methods, and constructors of child components; they don't catch async errors, event handler errors, or errors thrown outside React.",
    keyPoints: [
      "Implemented via class components (`componentDidCatch`)",
      "Scope is below the boundary in the tree",
      "Event handler errors must be handled manually",
      "Async errors require promise error handling",
    ],
    redFlags: [
      "Assuming an error boundary catches promise rejections automatically",
      "Putting a single global boundary for everything without UX consideration",
      "Not knowing boundaries can't be hooks-only (yet)",
    ],
  },
  // --- Express / Node (Junior/Mid) ---
  {
    id: "js-express-middleware-order-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["node", "express", "middleware"],
    question: "In Express, why does middleware order matter?",
    shortAnswer:
      "Express runs middleware in the order it's registered; earlier middleware can modify the request/response or terminate the chain.",
    keyPoints: [
      "`app.use` order controls execution order",
      "A response can end the request early (`res.send`, `res.end`)",
      "Errors propagate to error-handling middleware",
      "Route-specific middleware runs before the handler",
    ],
    redFlags: [
      "Assuming middleware execution order is automatic or parallel",
      "Not calling `next()` when needed",
      "Registering error middleware before normal middleware",
    ],
  },
  {
    id: "js-express-error-middleware-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["node", "express", "errors"],
    question:
      "How does Express decide whether a middleware is an error handler, and how should you structure error handling?",
    shortAnswer:
      "Error handlers have the signature `(err, req, res, next)`; you centralize error formatting there and `next(err)` from handlers/middleware.",
    keyPoints: [
      "Four-arg middleware is treated as error middleware",
      "Keep error responses consistent (status, message, code)",
      "Don't leak stack traces in production",
      "Be careful with async errors (wrap/forward rejections)",
    ],
    redFlags: [
      "Throwing inside async handlers expecting Express to catch it (without wrappers)",
      "Sending multiple responses (double-send)",
      "Returning raw errors to clients in production",
    ],
  },
  {
    id: "js-node-event-loop-blocking-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["node", "event-loop", "performance"],
    question:
      "What does it mean to 'block the event loop' in Node.js, and how do you avoid it?",
    shortAnswer:
      "CPU-heavy synchronous work prevents the loop from processing I/O; avoid by offloading to worker threads, using streaming, or moving heavy work to other services.",
    keyPoints: [
      "Single-threaded JS execution drives I/O callbacks",
      "Long sync loops delay timers and requests",
      "Use `worker_threads` for CPU-bound work",
      "Use streaming APIs for large data processing",
    ],
    redFlags: [
      "Assuming Node is multi-threaded for JS by default",
      "Doing crypto/compression synchronously in request handlers",
      "Ignoring backpressure when streaming",
    ],
  },
  {
    id: "js-node-streams-backpressure-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["node", "streams", "performance"],
    question:
      "Explain backpressure in Node.js streams and how `pipe()` helps handle it.",
    shortAnswer:
      "Backpressure is when a destination can't consume data as fast as the source produces it; `pipe()` coordinates flow control and buffering automatically.",
    keyPoints: [
      "Writable streams signal pressure via `write()` return value",
      "`drain` event indicates it can accept more",
      "`pipe()` manages pause/resume between streams",
      "Avoid loading entire payloads into memory",
    ],
    redFlags: [
      "Reading entire files into memory for large downloads",
      "Ignoring `write()` return value in custom stream logic",
      "Assuming streams always increase speed without considering I/O patterns",
    ],
  },
  {
    id: "js-express-cors-preflight-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["express", "http", "cors", "security"],
    question:
      "What is a CORS preflight request, and when does the browser send it?",
    shortAnswer:
      "It's an `OPTIONS` request the browser sends before a cross-origin request that is not 'simple' (custom headers, certain methods, etc.) to check server permissions.",
    keyPoints: [
      "Triggered by methods like PUT/DELETE or custom headers",
      "Server responds with `Access-Control-Allow-*` headers",
      "Preflight is a browser security feature, not an Express feature",
      "Caching preflight responses via `Access-Control-Max-Age` can help",
    ],
    redFlags: [
      "Thinking CORS is enforced by the server rather than the browser",
      "Allowing `*` with credentials (invalid)",
      "Not handling `OPTIONS` routes leading to failures",
    ],
  },
  // --- Bun (Junior/Mid/Senior) ---
  {
    id: "js-bun-runtime-vs-node-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["bun", "runtime", "node"],
    question:
      "What is Bun and how is it different from Node.js at a high level?",
    shortAnswer:
      "Bun is a JavaScript runtime built on JavaScriptCore with a bundler, test runner, and package manager included; Node.js is a runtime built on V8 with separate tooling.",
    keyPoints: [
      "Different engine: JSC (Bun) vs V8 (Node)",
      "Bun includes `bun install`, `bun test`, bundling utilities",
      "API compatibility with Node is high but not perfect",
      "Performance characteristics differ by workload",
    ],
    redFlags: [
      "Assuming 100% Node compatibility in all edge cases",
      "Thinking Bun replaces the need for bundlers/tests always",
      "Not understanding runtime vs package manager responsibilities",
    ],
  },
  {
    id: "js-bun-lockfile-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["bun", "package-management", "lockfile"],
    question:
      "Why are lockfiles important, and how should you treat `bun.lock` in CI/CD?",
    shortAnswer:
      "Lockfiles pin exact dependency versions for reproducible installs; commit them and ensure CI uses them to avoid drift.",
    keyPoints: [
      "Prevents dependency resolution changes between machines",
      "Improves build reproducibility and debugging",
      "CI should fail if lockfile changes unexpectedly",
      "Keep one package manager per project to avoid lockfile conflicts",
    ],
    redFlags: [
      "Not committing lockfiles for apps",
      "Mixing npm/yarn/pnpm/bun installs interchangeably",
      "Assuming semver ranges always resolve identically",
    ],
  },
  {
    id: "js-bun-test-runner-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["bun", "testing"],
    question:
      "What are the trade-offs of using Bun's test runner compared to Jest/Vitest?",
    shortAnswer:
      "Bun's runner can be fast and integrated, but ecosystem/mocking features and compatibility may differ; Jest/Vitest have mature tooling and plugins.",
    keyPoints: [
      "Speed and integration vs ecosystem maturity",
      "Check mocking APIs, timers, and environment support",
      "Consider compatibility with existing test utilities",
      "CI stability and debugging tools matter",
    ],
    redFlags: [
      "Choosing solely on benchmark speed",
      "Ignoring missing features needed by the codebase",
      "Not validating coverage/reporting requirements",
    ],
  },
  // --- Core JS (Junior/Mid) ---
  {
    id: "js-promises-all-vs-allsettled-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["promises", "async"],
    question:
      "Compare `Promise.all` and `Promise.allSettled`. When would you use each?",
    shortAnswer:
      "`Promise.all` fails fast on the first rejection; `allSettled` waits for all to finish and returns status objects for each promise.",
    keyPoints: [
      "`Promise.all` is good when any failure should abort the operation",
      "`Promise.allSettled` is good when you want partial results",
      "Both run promises concurrently (not sequentially)",
      "Order of results matches input order",
    ],
    redFlags: [
      "Thinking `Promise.all` runs sequentially",
      "Assuming `allSettled` rejects on failures",
      "Not handling error aggregation thoughtfully",
    ],
  },
  {
    id: "js-abortcontroller-fetch-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["fetch", "abortcontroller", "web-apis"],
    question:
      "How do you cancel a `fetch` request and why is it important in UIs?",
    shortAnswer:
      "Use `AbortController` and pass `signal` to `fetch`; canceling prevents wasted work and avoids race conditions when components unmount or queries change.",
    keyPoints: [
      "`const c = new AbortController(); fetch(url, { signal: c.signal })`",
      "Call `c.abort()` to reject with an AbortError",
      "Prevents updating state from stale requests",
      "Useful for typeahead/search and route transitions",
    ],
    redFlags: [
      "Ignoring cancellation and then fighting race conditions manually",
      "Assuming canceling always stops network I/O at the TCP level",
      "Not handling abort errors separately from real failures",
    ],
  },
  {
    id: "js-structuredclone-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["web-apis", "workers", "data-transfer"],
    question:
      "What is `structuredClone`, and how is it different from `JSON.parse(JSON.stringify(x))`?",
    shortAnswer:
      "`structuredClone` performs a deep clone supporting many built-in types (Map, Set, Date, etc.) and preserves more information; JSON cloning loses types and fails on circular references.",
    keyPoints: [
      "Handles circular references (JSON cannot)",
      "Supports Map/Set/ArrayBuffer and more",
      "Does not clone functions or DOM nodes",
      "Used by postMessage/worker structured cloning algorithm",
    ],
    redFlags: [
      "Using JSON cloning for complex objects with dates/maps",
      "Assuming cloning preserves prototypes/custom classes",
      "Thinking it clones functions",
    ],
  },
  // --- React + Express + Bun + Core (fill to 100+) ---
  {
    id: "js-react-useid-ssr-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "ssr", "accessibility"],
    question:
      "What problem does React `useId` solve in SSR, and why not generate IDs with `Math.random()`?",
    shortAnswer:
      "`useId` generates stable IDs that match between server and client; random IDs differ across environments and cause hydration mismatches.",
    keyPoints: [
      "Designed for consistent IDs across server/client",
      "Helps link labels/inputs and aria attributes",
      "Avoids hydration mismatch warnings",
      "Not a global unique ID for databases",
    ],
    redFlags: [
      "Using random IDs in render for SSR",
      "Assuming `useId` is a secure unique identifier",
      "Not understanding the hydration determinism requirement",
    ],
  },
  {
    id: "js-react-portals-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["react", "portals", "dom"],
    question:
      "What are React Portals and why are they useful for modals and tooltips?",
    shortAnswer:
      "Portals render children into a different DOM subtree while keeping React parent/child relationships, avoiding z-index/overflow issues.",
    keyPoints: [
      "Useful for modals, dialogs, tooltips, dropdowns",
      "Event bubbling still follows React tree semantics",
      "Helps avoid CSS stacking/overflow clipping",
      "Doesn't change component ownership in React",
    ],
    redFlags: [
      "Thinking events stop working across portals",
      "Using portals as a replacement for routing/layout",
      "Ignoring focus management/accessibility for modals",
    ],
  },
  {
    id: "js-react-synthetic-events-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["react", "events"],
    question: "What are React Synthetic Events and why did React create them?",
    shortAnswer:
      "Synthetic events wrap native browser events to provide a consistent API across browsers and integrate with React's event system.",
    keyPoints: [
      "Normalizes event properties across browsers",
      "Delegated event handling for performance",
      "Integrates with React rendering lifecycle",
      "Modern React removed event pooling; older versions pooled events",
    ],
    redFlags: [
      "Assuming `event` is always a native browser event",
      "Remembering event pooling incorrectly for modern React",
      "Mutating events and expecting them to persist across async boundaries",
    ],
  },
  {
    id: "js-react-stale-closures-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "hooks", "closures"],
    question:
      "What is a 'stale closure' in React hooks, and how do you fix it?",
    shortAnswer:
      "A closure captures values from an older render; fix by adding correct deps, using functional state updates, or storing mutable values in refs.",
    keyPoints: [
      "Each render creates a new scope with new values",
      "Effects/handlers capture values from their render",
      "Functional updates avoid depending on stale state",
      "Refs can hold mutable, non-render-triggering values",
    ],
    redFlags: [
      "Using empty deps to 'freeze' behavior without correctness",
      "Not understanding that handlers are recreated each render unless memoized",
      "Using refs as a replacement for state everywhere",
    ],
  },
  {
    id: "js-react-batching-automatic-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "state", "rendering"],
    question:
      "What is automatic batching in React 18 and what changes compared to React 17?",
    shortAnswer:
      "React 18 batches more state updates (including in timeouts/promises) to reduce renders; React 17 primarily batched within React event handlers.",
    keyPoints: [
      "Fewer re-renders for multiple updates",
      "Can change timing of intermediate renders",
      "Use `flushSync` for rare cases needing immediate commit",
      "Impacts performance and sometimes tests assumptions",
    ],
    redFlags: [
      "Relying on intermediate renders as a side effect",
      "Using `flushSync` everywhere",
      "Assuming batching is always identical across versions",
    ],
  },
  {
    id: "js-express-trust-proxy-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["express", "security", "deployment"],
    question:
      "What does Express `trust proxy` do and why can misconfiguring it be a security issue?",
    shortAnswer:
      "It tells Express to respect `X-Forwarded-*` headers from a proxy; misconfiguring can let clients spoof IP/HTTPS status and bypass security logic.",
    keyPoints: [
      "Affects `req.ip`, `req.protocol`, and secure cookies behavior",
      "Set it only when actually behind a trusted reverse proxy",
      "Important for rate limiting and audit logs",
      "Impacts redirect-to-https logic and secure session cookies",
    ],
    redFlags: [
      "Enabling trust proxy blindly in all environments",
      "Using `req.ip` for security without understanding proxy headers",
      "Not validating infrastructure topology",
    ],
  },
  {
    id: "js-express-async-error-handling-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["express", "async", "errors"],
    question:
      "Why don't thrown errors in async Express handlers always reach error middleware, and how do you handle this robustly?",
    shortAnswer:
      "Express 4 doesn't automatically catch async rejections; you must `next(err)` or wrap handlers in a promise-aware helper (or use Express 5+ behavior).",
    keyPoints: [
      "Async functions return promises; unhandled rejections bypass sync try/catch",
      "Use a wrapper: `(fn) => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next)`",
      "Centralize error mapping to HTTP codes",
      "Test error paths explicitly",
    ],
    redFlags: [
      "Assuming `throw` in async always works in Express 4",
      "Catching errors and then forgetting to respond or call next",
      "Leaking internal errors to clients",
    ],
  },
  {
    id: "js-node-http-keepalive-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["node", "http", "performance"],
    question:
      "What is HTTP keep-alive and how does it affect performance in Node servers and clients?",
    shortAnswer:
      "Keep-alive reuses TCP connections for multiple requests, reducing handshake overhead and improving latency; in Node clients you often enable it via an Agent.",
    keyPoints: [
      "Connection reuse reduces latency and CPU",
      "Default behaviors differ between client libraries",
      "Tune max sockets and timeouts carefully",
      "Improper tuning can cause socket exhaustion",
    ],
    redFlags: [
      "Disabling keep-alive without understanding latency impact",
      "Not knowing about Node `http.Agent` configuration",
      "Ignoring timeouts leading to stuck sockets",
    ],
  },
  {
    id: "js-bun-bundler-tree-shaking-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["bun", "bundling", "esm", "performance"],
    question:
      "What enables tree-shaking in bundlers (including Bun bundling) and why does ESM help?",
    shortAnswer:
      "Tree-shaking relies on static analysis of imports/exports; ESM is statically analyzable, while CommonJS is dynamic and harder to analyze safely.",
    keyPoints: [
      "Static `import/export` enables dead-code elimination",
      "Side-effectful modules reduce tree-shaking effectiveness",
      "Mark side effects in package metadata when appropriate",
      "Prefer named exports and avoid dynamic requires in libraries",
    ],
    redFlags: [
      "Assuming bundlers can perfectly tree-shake CommonJS",
      "Ignoring side effects when exporting modules",
      "Thinking minification equals tree-shaking",
    ],
  },
  // --- Many more (to reach 100+) ---
  {
    id: "js-react-refs-forwardref-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "refs", "components"],
    question:
      "When should you use `forwardRef`, and what problems does it solve in component libraries?",
    shortAnswer:
      "`forwardRef` lets a parent pass a ref through a component to an inner DOM node, enabling focus/measurement APIs for reusable components.",
    keyPoints: [
      "Refs are used for imperative access (focus, measure, scroll)",
      "Libraries often forward refs for inputs/buttons",
      "Avoid exposing too much imperative API",
      "Combine with `useImperativeHandle` for controlled imperative surface",
    ],
    redFlags: [
      "Using refs instead of state for normal data flow",
      "Not forwarding refs in reusable input components",
      "Exposing unstable DOM structure via refs",
    ],
  },
  {
    id: "js-react-useimperativehandle-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "refs", "api-design"],
    question:
      "What is `useImperativeHandle` and why might you use it in a component library?",
    shortAnswer:
      "It customizes the instance value exposed by a forwarded ref, allowing a stable, limited imperative API instead of exposing raw DOM details.",
    keyPoints: [
      "Used with `forwardRef`",
      "Encapsulates internal DOM structure changes",
      "Expose methods like `focus()` or `reset()`",
      "Keep API minimal to avoid hard-to-test imperative coupling",
    ],
    redFlags: [
      "Exposing the full DOM node by default unnecessarily",
      "Adding imperative APIs for things that should be props/state",
      "Returning unstable objects causing ref identity changes",
    ],
  },
  {
    id: "js-react-render-props-vs-hooks-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "patterns"],
    question:
      "Compare Render Props, HOCs, and Hooks. What trade-offs do they have?",
    shortAnswer:
      "Render props and HOCs compose behavior but can hurt readability and create wrapper layers; hooks allow direct reuse in function components with simpler composition.",
    keyPoints: [
      "HOCs can cause wrapper hell and prop collisions",
      "Render props increase indirection and can affect perf",
      "Hooks require React function components and obey hook rules",
      "All can be valid depending on use case and constraints",
    ],
    redFlags: [
      "Claiming hooks fully replace every HOC/render-prop scenario",
      "Ignoring composition/readability trade-offs",
      "Not understanding hook rules (call order) implications",
    ],
  },
  {
    id: "js-react-state-derivation-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "state", "design"],
    question:
      "When is 'derived state' an anti-pattern in React, and what alternatives exist?",
    shortAnswer:
      "Duplicating derived values in state risks inconsistencies; prefer deriving during render, using memoization, or lifting source-of-truth state.",
    keyPoints: [
      "Single source of truth reduces bugs",
      "Compute derived values from props/state in render",
      "Use `useMemo` when computation is expensive",
      "Use controlled components patterns when syncing external values",
    ],
    redFlags: [
      "Copying props into state without a clear reason",
      "Trying to 'keep in sync' manually with effects",
      "Using `useEffect` to update state that can be derived",
    ],
  },
  {
    id: "js-express-security-helmet-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["express", "security", "http"],
    question:
      "What is `helmet` in Express apps and what problem does it solve?",
    shortAnswer:
      "Helmet sets various HTTP headers to reduce common web vulnerabilities (XSS, clickjacking, sniffing, etc.).",
    keyPoints: [
      "Adds headers like CSP, X-Frame-Options, X-Content-Type-Options",
      "CSP needs tuning to avoid breaking the app",
      "Security headers complement but don't replace input sanitization",
      "Use HTTPS in production",
    ],
    redFlags: [
      "Assuming security headers alone prevent XSS",
      "Using an overly permissive CSP without understanding",
      "Not knowing what headers Helmet configures",
    ],
  },
  {
    id: "js-express-rate-limiting-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["express", "security", "scalability"],
    question:
      "How would you implement rate limiting in an Express API in a distributed environment?",
    shortAnswer:
      "Use middleware backed by a shared store (Redis) keyed by user/IP, with correct proxy configuration and meaningful limits per endpoint.",
    keyPoints: [
      "In-memory counters break with multiple instances",
      "Redis or similar provides shared state across nodes",
      "Different endpoints need different limits (login vs reads)",
      "Consider token bucket/leaky bucket algorithms",
    ],
    redFlags: [
      "Using per-instance memory rate limiting behind a load balancer",
      "Ignoring `trust proxy` and misreading client IPs",
      "Rate limiting everything uniformly without endpoint semantics",
    ],
  },
  {
    id: "js-node-worker-threads-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["node", "concurrency", "performance"],
    question:
      "When would you choose Node `worker_threads` over clustering, and what are the trade-offs?",
    shortAnswer:
      "Use worker threads for CPU-bound tasks sharing memory; clustering scales I/O by running multiple processes. Workers share a process but require careful concurrency design.",
    keyPoints: [
      "Workers share memory (with SharedArrayBuffer) and avoid IPC overhead for some cases",
      "Cluster uses separate processes (isolation, separate heaps)",
      "Workers can still block their own thread if poorly designed",
      "Need message passing or shared memory synchronization",
    ],
    redFlags: [
      "Using workers for I/O-bound scaling only",
      "Assuming shared memory is always simpler than message passing",
      "Ignoring crash isolation differences between process vs thread",
    ],
  },
  {
    id: "js-core-prototype-pollution-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["security", "prototypes", "node"],
    question:
      "What is prototype pollution, how does it happen, and how do you prevent it in Node/Express apps?",
    shortAnswer:
      "It occurs when attacker-controlled keys like `__proto__`/`constructor.prototype` get merged into objects, mutating the prototype chain; prevent by sanitizing keys and using safe merge utilities.",
    keyPoints: [
      "Often triggered via deep merge of untrusted JSON",
      "Can lead to privilege bypass or DoS via polluted properties",
      "Use allowlists, safe object creation (`Object.create(null)`), and safe merge libs",
      "Validate and sanitize request bodies/params",
    ],
    redFlags: [
      "Blindly deep-merging request bodies into config objects",
      "Not understanding that `__proto__` can be a real key in JSON",
      "Assuming JSON parsing alone is safe",
    ],
  },
  {
    id: "js-core-property-descriptors-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["objects", "descriptors", "internals"],
    question:
      "Explain property descriptors (`writable`, `enumerable`, `configurable`) and how they affect objects.",
    shortAnswer:
      "Descriptors define whether a property can be changed, enumerated, or reconfigured; they enable fine-grained control and encapsulation via getters/setters.",
    keyPoints: [
      "Data descriptor vs accessor descriptor",
      "`Object.defineProperty` sets descriptor flags",
      "Non-configurable properties can't be deleted or redefined",
      "Enumerable controls appearance in `for...in`/`Object.keys`",
    ],
    redFlags: [
      "Thinking `const` makes object properties immutable",
      "Confusing enumerability with writability",
      "Not knowing getters/setters are accessor descriptors",
    ],
  },
  {
    id: "js-core-freeze-seal-preventextensions-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["objects", "immutability"],
    question:
      "Compare `Object.preventExtensions`, `Object.seal`, and `Object.freeze`.",
    shortAnswer:
      "`preventExtensions` stops adding new props; `seal` also makes existing props non-configurable; `freeze` also makes data props non-writable.",
    keyPoints: [
      "All are shallow (nested objects remain mutable)",
      "Freeze is strongest but doesn't deep-freeze automatically",
      "Useful for defensive programming and invariants",
      "In strict mode, invalid writes throw errors",
    ],
    redFlags: [
      "Assuming freeze is deep by default",
      "Believing it provides security boundaries against attackers",
      "Not understanding configurable vs writable flags",
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
    id: "js-core-top-level-await-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["esm", "async", "modules"],
    question:
      "What is top-level `await` in ESM, and what are the implications for module loading?",
    shortAnswer:
      "Top-level await allows awaiting promises at module scope; it makes the module asynchronous and can delay dependent modules until it resolves.",
    keyPoints: [
      "Only in ES modules, not classic scripts",
      "Creates async module evaluation",
      "Can introduce load waterfalls if overused",
      "May affect bundling and SSR startup times",
    ],
    redFlags: [
      "Using top-level await widely without considering startup latency",
      "Assuming it works in CommonJS unchanged",
      "Not understanding dependency graph blocking",
    ],
  },
  {
    id: "js-core-async-iterator-protocol-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["async", "iterators", "protocols"],
    question:
      "What is the async iterator protocol (`Symbol.asyncIterator`) and where is it used in real code?",
    shortAnswer:
      "It defines how `for await...of` consumes asynchronous streams of values; it's used for reading streams, paginated APIs, and event sources.",
    keyPoints: [
      "`[Symbol.asyncIterator]()` returns an object with `next()` returning a promise",
      "`for await...of` awaits each `next()` result",
      "Works well for streaming and incremental processing",
      "Often integrates with Node streams and web streams via adapters",
    ],
    redFlags: [
      "Confusing async iterators with promises of arrays",
      "Not understanding that iteration itself is asynchronous",
      "Ignoring cancellation/cleanup (`return()`)",
    ],
  },
  {
    id: "js-core-eventloop-node-phases-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["node", "event-loop", "microtasks"],
    question:
      "Explain the Node.js event loop phases and where microtasks (Promises) run relative to them.",
    shortAnswer:
      "Node processes timers, I/O callbacks, idle/prepare, poll, check, and close callbacks; microtasks run after each phase and after each callback, before returning to the loop.",
    keyPoints: [
      "Timers: `setTimeout/setInterval`",
      "Check: `setImmediate`",
      "Microtasks (`process.nextTick`, promise jobs) run with high priority",
      "Misuse can starve the loop (nextTick in tight loops)",
    ],
    redFlags: [
      "Claiming `setImmediate` always runs before timers",
      "Not knowing `process.nextTick` priority can starve I/O",
      "Ignoring differences between browsers and Node scheduling",
    ],
  },
  {
    id: "js-express-etag-caching-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["express", "http", "caching"],
    question:
      "What is an ETag, and how does it enable efficient HTTP caching for APIs?",
    shortAnswer:
      "ETag is a version identifier for a resource; clients send `If-None-Match` and servers can reply `304 Not Modified` to avoid re-sending the body.",
    keyPoints: [
      "Saves bandwidth and improves latency",
      "Must change when representation changes",
      "Strong vs weak ETags have different semantics",
      "Works with caches and CDNs",
    ],
    redFlags: [
      "Using ETags but not updating them on changes",
      "Confusing ETag with cache-control headers",
      "Always disabling caching without reasoning",
    ],
  },
  {
    id: "js-react-xss-dangerouslysetinnerhtml-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "security", "xss"],
    question:
      "Why is `dangerouslySetInnerHTML` dangerous, and how do you make it safer when you must use it?",
    shortAnswer:
      "It injects raw HTML into the DOM and can enable XSS; sanitize/escape untrusted content and prefer safe renderers/allowlists.",
    keyPoints: [
      "Never render untrusted HTML without sanitization",
      "Use a sanitizer with an allowlist approach",
      "Consider rendering markdown with a safe pipeline",
      "CSP can reduce impact but doesn't replace sanitization",
    ],
    redFlags: [
      "Assuming React escapes HTML even with dangerouslySetInnerHTML",
      "Sanitizing with regex",
      "Believing CSP alone makes unsafe HTML safe",
    ],
  },
  {
    id: "js-bun-fetch-apis-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["bun", "fetch", "web-apis"],
    question:
      "Why is the `fetch` API important in modern runtimes like Bun, and how does it differ from older Node patterns?",
    shortAnswer:
      "Fetch provides a standard web API for HTTP requests across environments; older Node code often used `http`/`https` or third-party libraries with different ergonomics.",
    keyPoints: [
      "Standardized request/response objects",
      "Works with streams and AbortController",
      "Consistent across browser-like runtimes",
      "Encourages portable code between server and client",
    ],
    redFlags: [
      "Assuming fetch is identical across all runtimes with zero differences",
      "Ignoring abort/cancellation and streaming",
      "Treating response bodies as already buffered always",
    ],
  },
  {
    id: "js-core-webstreams-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["streams", "web-apis", "performance"],
    question:
      "What are Web Streams (`ReadableStream`, `WritableStream`) and why do they matter for `fetch` and modern runtimes?",
    shortAnswer:
      "Web Streams provide a standard streaming abstraction for incremental I/O; they enable efficient processing of large payloads without buffering everything in memory.",
    keyPoints: [
      "Backpressure is part of the model",
      "Used by `fetch` response/request bodies",
      "Allows transform pipelines",
      "Different from Node classic streams but can be adapted",
    ],
    redFlags: [
      "Buffering entire responses by default for large downloads",
      "Confusing Web Streams with Node streams without adapters",
      "Ignoring backpressure semantics",
    ],
  },
  // To ensure >= 100 questions, add a broad bank across topics:
  {
    id: "js-react-render-phase-side-effects-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "internals", "concurrency"],
    question:
      "Why are side effects during render unsafe in React (especially with concurrent rendering)?",
    shortAnswer:
      "Render can be interrupted/restarted; side effects during render may run multiple times or without commit, causing inconsistent external state.",
    keyPoints: [
      "Render must be pure and idempotent",
      "Effects belong in `useEffect/useLayoutEffect` or event handlers",
      "Concurrent rendering can discard work",
      "Purity enables React scheduling optimizations",
    ],
    redFlags: [
      "Mutating global state during render",
      "Doing network requests in render",
      "Assuming render always commits",
    ],
  },
  {
    id: "js-express-body-parsing-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["express", "http"],
    question:
      "Why does Express need body parsing middleware (like `express.json()`), and what happens without it?",
    shortAnswer:
      "Without body parsing, `req.body` is undefined because the raw request stream isn't read/decoded into an object automatically.",
    keyPoints: [
      "HTTP request body is a stream of bytes",
      "`express.json()` reads and parses JSON payloads",
      "Set size limits to mitigate DoS",
      "Handle invalid JSON errors properly",
    ],
    redFlags: [
      "Parsing huge bodies without limits",
      "Assuming `req.body` is always available by default",
      "Not handling malformed JSON",
    ],
  },
  {
    id: "js-core-json-bigint-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["json", "bigint", "data"],
    question:
      "Why does `JSON.stringify` fail on `BigInt` and what are typical solutions?",
    shortAnswer:
      "JSON doesn't support BigInt; you must convert to string/number (carefully) or use a custom replacer/serialization format.",
    keyPoints: [
      "BigInt may exceed safe integer range for numbers",
      "Use a replacer to encode as string",
      "Decode on the other side deliberately",
      "Consider alternative formats for large integers",
    ],
    redFlags: [
      "Casting BigInt to Number silently losing precision",
      "Assuming JSON spec supports BigInt",
      "Serializing BigInt without defining a decode strategy",
    ],
  },
  {
    id: "js-core-intl-performance-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["intl", "performance", "i18n"],
    question:
      "Why should you often reuse `Intl.DateTimeFormat` / `Intl.NumberFormat` instances instead of creating them repeatedly?",
    shortAnswer:
      "Creating Intl formatters can be expensive; reusing cached instances avoids repeated locale data initialization and improves performance in hot paths.",
    keyPoints: [
      "Intl constructors can allocate and load locale data",
      "Cache by locale/options key",
      "Important in list rendering and server-side formatting",
      "Measure before optimizing, but it's a common hotspot",
    ],
    redFlags: [
      "Creating new Intl formatters per item in a large list",
      "Ignoring locale/options differences when caching",
      "Over-optimizing without measuring",
    ],
  },
  {
    id: "js-express-csrf-basics-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["express", "security", "csrf"],
    question: "What is CSRF and how do you mitigate it in an Express app?",
    shortAnswer:
      "CSRF tricks a browser into sending authenticated requests; mitigate with SameSite cookies, CSRF tokens for state-changing requests, and origin checks.",
    keyPoints: [
      "Affects cookie-based auth more than token-in-header APIs",
      "SameSite=Lax/Strict reduces risk",
      "Use CSRF tokens for forms/state changes",
      "Validate Origin/Referer for sensitive actions",
    ],
    redFlags: [
      "Thinking CORS prevents CSRF by itself",
      "Using cookie auth without SameSite/CSRF protections",
      "Only protecting GET requests (CSRF targets state-changing actions)",
    ],
  },
  {
    id: "js-react-testing-act-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "testing"],
    question:
      "Why does React Testing Library use `act()` semantics and what does it guarantee?",
    shortAnswer:
      "`act()` ensures React flushes updates and effects before assertions, avoiding flaky tests that assert during intermediate states.",
    keyPoints: [
      "Flushes state updates and effects",
      "Prevents timing-related flakiness",
      "Async helpers await updates in a stable way",
      "Reflects how React batches updates",
    ],
    redFlags: [
      "Ignoring async updates and asserting too early",
      "Relying on arbitrary timeouts in tests",
      "Confusing `act()` with mocking timers",
    ],
  },
  {
    id: "js-bun-node-compat-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["bun", "node", "compatibility"],
    question:
      "What are common compatibility pitfalls when moving a Node/Express project to Bun?",
    shortAnswer:
      "Edge-case Node APIs, native addons, module resolution differences, and tooling assumptions can break; validate runtime APIs and dependencies carefully.",
    keyPoints: [
      "Native addons may not work the same way",
      "Some Node internals or undocumented behaviors differ",
      "Test suite and CI parity is essential",
      "Pay attention to ESM/CJS interop assumptions",
    ],
    redFlags: [
      "Assuming production readiness without running full integration tests",
      "Ignoring native dependency compatibility",
      "Not validating observability/ops tooling support",
    ],
  },
  // --- React (more) ---
  {
    id: "js-react-usereducer-vs-usestate-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "hooks", "state"],
    question: "When would you choose `useReducer` over `useState` in React?",
    shortAnswer:
      "Use `useReducer` when state transitions are complex, depend on previous state, or you want a centralized transition model that's easier to test and reason about.",
    keyPoints: [
      "Better for complex state machines and multiple related fields",
      "Explicit actions make transitions auditable",
      "Reduces bugs from scattered `setState` calls",
      "Can improve testability by testing the reducer in isolation",
    ],
    redFlags: [
      "Using reducers for trivial single-value state",
      "Mutating state inside the reducer",
      "Not understanding that reducers must be pure",
    ],
  },
  {
    id: "js-react-usememo-stale-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "performance", "memoization"],
    question:
      "Why can `useMemo` still return stale values if you get dependencies wrong, and how do you reason about it?",
    shortAnswer:
      "`useMemo` caches per render based on deps; missing deps means the memoized value won't update when inputs change, producing stale derived values.",
    keyPoints: [
      "Memoization is about correctness + performance, not only performance",
      "Deps must include every value used by the memo factory",
      "Prefer deriving directly in render if cheap",
      "Measure and memoize only real hotspots",
    ],
    redFlags: [
      "Treating `useMemo` as a guarantee against re-renders",
      "Leaving deps empty to 'optimize' without understanding",
      "Memoizing everything blindly",
    ],
  },
  {
    id: "js-react-usetransition-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "concurrency", "ux"],
    question: "What does `useTransition` do in React 18 and when is it useful?",
    shortAnswer:
      "It marks updates as non-urgent so React can keep the UI responsive, showing pending states while deferring expensive re-renders.",
    keyPoints: [
      "Urgent updates (typing/clicks) stay responsive",
      "Transitions are interruptible",
      "Useful for filtering, search, and large list updates",
      "Works best when combined with good loading UI",
    ],
    redFlags: [
      "Using transitions to 'fix' slow code without profiling",
      "Assuming transitions make computation faster",
      "Not handling pending state UX",
    ],
  },
  {
    id: "js-react-usedeferredvalue-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "concurrency", "ux"],
    question:
      "What problem does `useDeferredValue` solve and how is it different from debouncing input?",
    shortAnswer:
      "It lets React defer rendering of derived UI from a rapidly changing value while keeping input responsive; debouncing delays the value itself via timers.",
    keyPoints: [
      "Keeps the source value (e.g., input) up to date",
      "Defers the expensive derived rendering",
      "Works with React scheduling instead of timers",
      "Good for search results and expensive computations",
    ],
    redFlags: [
      "Thinking it's the same as debounce/throttle",
      "Deferring the wrong part of the UI",
      "Ignoring that real performance work may still be needed",
    ],
  },
  {
    id: "js-react-suspense-boundary-placement-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "suspense", "ux"],
    question: "How does Suspense boundary placement affect UX and performance?",
    shortAnswer:
      "Boundaries define what can show while waiting; placing them too high causes big UI fallbacks, too low can cause many small spinners and jank—balance based on user perception.",
    keyPoints: [
      "Higher boundaries swap larger UI regions to fallback",
      "Lower boundaries allow progressive rendering",
      "Streaming SSR benefits from well-placed boundaries",
      "Consider skeletons and preserving layout stability",
    ],
    redFlags: [
      "Wrapping the entire app in one Suspense boundary",
      "Using many tiny spinners that degrade UX",
      "Not understanding that fallback is part of the render tree",
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
  {
    id: "js-react-virtualization-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "performance", "lists"],
    question:
      "What is list virtualization in React and when should you use it?",
    shortAnswer:
      "Virtualization renders only visible rows/items and reuses DOM nodes, reducing render cost and memory usage for large lists.",
    keyPoints: [
      "Only render what's in the viewport (+ buffer)",
      "Dramatically reduces DOM nodes and diff work",
      "Requires stable item sizing or measurement strategy",
      "Works well with infinite scrolling",
    ],
    redFlags: [
      "Rendering thousands of DOM nodes without considering performance",
      "Virtualizing small lists (unnecessary complexity)",
      "Not handling dynamic row heights properly",
    ],
  },
  {
    id: "js-react-unstable-keys-remount-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "reconciliation", "bugs"],
    question:
      "How can changing a component's `key` force a remount, and when is that useful?",
    shortAnswer:
      "React treats a changed key as a new component identity, discarding previous state; useful for resetting internal state but can also hide design issues.",
    keyPoints: [
      "Key change triggers unmount + mount",
      "Useful for resetting forms/wizards",
      "Can be a code smell if used to 'fix' state bugs",
      "Remounting re-runs effects and resets refs",
    ],
    redFlags: [
      "Using random keys that remount every render",
      "Using key-remount to avoid proper state design",
      "Not anticipating effect re-runs and cleanup",
    ],
  },
  {
    id: "js-react-profiler-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["react", "performance", "profiling"],
    question: "How do you identify unnecessary re-renders in a React app?",
    shortAnswer:
      "Use React DevTools Profiler to find expensive renders, then stabilize props, memoize where needed, and reduce context/global updates.",
    keyPoints: [
      "Profiler shows commit times and rendered components",
      "Look for frequently re-rendering components with unchanged output",
      "Stabilize referential props (callbacks/objects)",
      "Reduce broad state updates and context churn",
    ],
    redFlags: [
      "Optimizing blindly without profiling",
      "Assuming `memo` fixes everything",
      "Not considering data fetching/state design as root cause",
    ],
  },
  // --- Express / Node (more) ---
  {
    id: "js-express-graceful-shutdown-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["node", "express", "deployment"],
    question:
      "How do you implement graceful shutdown for an Express server in production?",
    shortAnswer:
      "Stop accepting new connections, wait for in-flight requests to complete, close keep-alive sockets, and release resources (DB/queues) on SIGTERM/SIGINT.",
    keyPoints: [
      "Handle SIGTERM (common in containers/k8s)",
      "Call `server.close()` to stop new connections",
      "Track and drain in-flight requests with timeouts",
      "Close DB pools and background workers",
    ],
    redFlags: [
      "Calling `process.exit()` immediately",
      "Ignoring keep-alive sockets that keep the process alive",
      "Not setting shutdown timeouts leading to stuck deploys",
    ],
  },
  {
    id: "js-express-validation-zod-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["express", "validation", "api-design"],
    question:
      "Why should you validate request input in Express and what are good patterns to do it?",
    shortAnswer:
      "Validation prevents bad data and security issues; validate body/query/params with schemas (e.g., Zod/Joi) and centralize error responses.",
    keyPoints: [
      "Validate at boundaries (HTTP layer)",
      "Return consistent 400 errors with details",
      "Avoid trusting types inferred from JSON",
      "Sanitize/normalize inputs where needed",
    ],
    redFlags: [
      "Relying only on TypeScript types for runtime validation",
      "Validating only some endpoints",
      "Passing unvalidated data into DB queries",
    ],
  },
  {
    id: "js-express-jwt-pitfalls-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["express", "security", "jwt"],
    question: "What are common JWT security pitfalls in Express APIs?",
    shortAnswer:
      "Pitfalls include accepting `alg=none`, not validating issuer/audience, long-lived tokens without rotation, storing tokens insecurely, and missing revocation strategies.",
    keyPoints: [
      "Validate signature and algorithm",
      "Validate `iss`, `aud`, `exp`, and clock skew",
      "Short TTL + refresh tokens/rotation",
      "Plan revocation (jti blacklist) when needed",
    ],
    redFlags: [
      "Storing JWT in localStorage without considering XSS risk",
      "Not validating `aud/iss`",
      "Using extremely long-lived access tokens",
    ],
  },
  {
    id: "js-node-unhandled-rejection-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["node", "promises", "errors"],
    question:
      "What is an 'unhandled promise rejection' in Node.js and why is it dangerous in servers?",
    shortAnswer:
      "It's a rejected promise with no catch handler; it can crash the process (depending on config/version) or leave the app in an inconsistent state.",
    keyPoints: [
      "Always `await` or `.catch()` promises",
      "Centralize async error handling in request handlers",
      "Monitor `unhandledRejection` events but don't rely on them as control flow",
      "Fail fast vs degrade: choose intentionally",
    ],
    redFlags: [
      "Ignoring promise rejections in background tasks",
      "Using `unhandledRejection` to swallow errors silently",
      "Assuming Node will always keep running safely",
    ],
  },
  {
    id: "js-node-request-timeouts-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["node", "http", "reliability"],
    question:
      "Which timeouts matter in Node HTTP servers/clients and why do missing timeouts cause incidents?",
    shortAnswer:
      "Missing timeouts can lead to resource exhaustion (hung sockets, stuck upstream calls); configure server request/headers timeouts and client connect/read timeouts.",
    keyPoints: [
      "Server: headers timeout, request timeout, keep-alive timeout",
      "Client: connect timeout, response timeout, idle timeout",
      "Avoid infinite waits on downstream services",
      "Use AbortController for request cancellation",
    ],
    redFlags: [
      "Relying on defaults without understanding",
      "No client timeouts for HTTP calls",
      "Not canceling upstream calls when request is aborted",
    ],
  },
  {
    id: "js-node-logging-correlation-id-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["node", "observability", "express"],
    question:
      "What is a correlation ID and how do you propagate it through an Express app?",
    shortAnswer:
      "A correlation ID is a request identifier added at the edge and propagated through logs/headers to trace a request across services.",
    keyPoints: [
      "Generate at edge or accept `X-Request-Id` from gateway",
      "Store per-request context (AsyncLocalStorage) in Node",
      "Include it in every log line and downstream request",
      "Return it to clients for support/debugging",
    ],
    redFlags: [
      "Using a global variable for per-request IDs",
      "Not propagating the ID to downstream calls",
      "Logging without any request-level context",
    ],
  },
  {
    id: "js-express-file-upload-streaming-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["express", "streams", "performance"],
    question:
      "What's the danger of handling file uploads by buffering them fully in memory, and what's a better approach?",
    shortAnswer:
      "Buffering large uploads can OOM the process; stream uploads to storage with backpressure and size limits, validating content type safely.",
    keyPoints: [
      "Use streaming multipart parsers (and set limits)",
      "Enforce max file size and timeouts",
      "Validate file type by content/sniffing where needed",
      "Avoid trusting user-provided filenames/paths",
    ],
    redFlags: [
      "Reading entire upload into memory",
      "No limits on upload size",
      "Trusting user filenames (path traversal)",
    ],
  },
  {
    id: "js-core-redos-regex-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["security", "regex", "performance"],
    question:
      "What is ReDoS (Regular Expression Denial of Service) and how can it affect Node/Express endpoints?",
    shortAnswer:
      "Certain regex patterns cause catastrophic backtracking on crafted inputs, spiking CPU and blocking the event loop, effectively DoSing the server.",
    keyPoints: [
      "Avoid nested quantifiers and ambiguous alternations",
      "Use timeouts/limits or safer regex engines when possible",
      "Validate and cap input sizes",
      "Prefer parsing strategies over complex regex in hot paths",
    ],
    redFlags: [
      "Using complex user-input-driven regex without limits",
      "Assuming regex is always O(n)",
      "Ignoring CPU spikes as 'random slowness'",
    ],
  },
  // --- Bun (more) ---
  {
    id: "js-bun-typescript-runtime-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["bun", "typescript", "tooling"],
    question:
      "Why can Bun feel 'TypeScript-first' and what should you still be careful about when running TS directly?",
    shortAnswer:
      "Bun can run/transpile TS conveniently, but types are still erased at runtime; you still need runtime validation and to understand build output for production.",
    keyPoints: [
      "TS types don't enforce runtime constraints",
      "Different transpilation settings can change semantics",
      "Be mindful of source maps and stack traces",
      "Production builds should be reproducible and tested",
    ],
    redFlags: [
      "Assuming TS prevents runtime input bugs",
      "Shipping dev-mode transpilation without a build strategy",
      "Ignoring sourcemap support in production debugging",
    ],
  },
  {
    id: "js-bun-env-loading-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["bun", "env", "deployment"],
    question:
      "What are common pitfalls around environment variables in JS runtimes (Node/Bun) and deployments?",
    shortAnswer:
      "Pitfalls include missing env validation, relying on implicit `.env` loading, leaking secrets to the client, and differing env names across environments.",
    keyPoints: [
      "Validate env at startup (presence + format)",
      "Never expose server secrets to client bundles",
      "Use consistent naming and documented defaults",
      "Keep secrets in secret managers in production",
    ],
    redFlags: [
      "Reading env everywhere without validation",
      "Committing secrets into `.env` files",
      "Assuming `.env` loading always happens automatically",
    ],
  },
  {
    id: "js-bun-http-server-1",
    language: "JavaScript",
    difficulty: "Mid",
    tags: ["bun", "http", "performance"],
    question:
      "What are the trade-offs of using runtime-native HTTP servers (like Bun's) vs Express in Node?",
    shortAnswer:
      "Native servers can be faster and simpler, but Express has a huge ecosystem/middleware model; choice depends on needs: routing, middleware, compatibility, and ops maturity.",
    keyPoints: [
      "Express ecosystem is very mature",
      "Native servers may offer better baseline throughput",
      "Middleware compatibility may differ",
      "Observability and deployment patterns matter",
    ],
    redFlags: [
      "Choosing solely on hello-world benchmarks",
      "Ignoring middleware and ecosystem requirements",
      "Not validating production operational needs",
    ],
  },
  // --- Core JS (deep) ---
  {
    id: "js-core-async-stack-traces-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["debugging", "async", "engines"],
    question:
      "Why are async stack traces harder than sync stack traces, and how do runtimes improve them?",
    shortAnswer:
      "Async boundaries break the synchronous call stack; runtimes can stitch stacks (async stack traces) and source maps help map compiled code to source.",
    keyPoints: [
      "Promises schedule work later, losing direct call frames",
      "Async stack traces are best-effort and can add overhead",
      "Source maps are critical in transpiled/bundled apps",
      "Structured logging often complements stack traces in prod",
    ],
    redFlags: [
      "Assuming async stack traces are always complete",
      "Not shipping source maps securely for server apps",
      "Relying only on stack traces without request context",
    ],
  },
  {
    id: "js-core-typedarrays-dataview-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["performance", "binary", "typed-arrays"],
    question:
      "When would you use `TypedArray`/`DataView` instead of normal arrays in JavaScript?",
    shortAnswer:
      "Use them for binary data, interop with network/files/crypto, and performance-sensitive numeric processing with explicit byte layouts.",
    keyPoints: [
      "Typed arrays are views over an `ArrayBuffer`",
      "DataView allows endianness and mixed-type reads/writes",
      "Useful for protocols, image/audio processing, crypto",
      "Avoids per-element boxed number overhead in some cases",
    ],
    redFlags: [
      "Using TypedArrays without understanding byte length/offsets",
      "Assuming they behave exactly like normal arrays",
      "Ignoring endianness when parsing binary formats",
    ],
  },
  {
    id: "js-core-webcrypto-subtle-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["security", "crypto", "web-apis"],
    question:
      "Why is using high-level APIs like WebCrypto (`crypto.subtle`) preferable to implementing crypto manually?",
    shortAnswer:
      "Crypto is easy to get wrong; WebCrypto provides vetted primitives and safe implementations, reducing risks like insecure randomness, bad padding, and timing attacks.",
    keyPoints: [
      "Use strong RNG and standardized algorithms",
      "Avoid rolling your own AES/RSASSA logic",
      "Understand key management and algorithm parameters",
      "Be careful about encoding and constant-time operations",
    ],
    redFlags: [
      "Implementing encryption with custom algorithms",
      "Using weak hashes for passwords (use bcrypt/argon2/scrypt)",
      "Misunderstanding IV/nonce requirements",
    ],
  },
  {
    id: "js-react-state-library-selectors-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "state-management", "performance"],
    question:
      "Why do selector-based subscriptions (Redux selectors, Zustand selectors, etc.) often outperform Context for global state?",
    shortAnswer:
      "Selectors let components subscribe to slices and skip re-renders when unrelated state changes; Context updates fan-out to all consumers unless carefully split.",
    keyPoints: [
      "Fine-grained subscriptions reduce render churn",
      "Memoized selectors can avoid recomputation",
      "External store APIs must be concurrent-safe",
      "State shape and update patterns matter",
    ],
    redFlags: [
      "Using one giant context for everything",
      "Selectors that allocate new objects each call",
      "Ignoring concurrent-safe subscription patterns",
    ],
  },
  {
    id: "js-node-async-local-storage-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["node", "observability", "async"],
    question:
      "What is `AsyncLocalStorage` in Node.js and what are practical use cases in Express apps?",
    shortAnswer:
      "It provides per-async-execution context storage, enabling request-scoped data like correlation IDs, user identity, and tracing spans across awaits.",
    keyPoints: [
      "Avoids passing context through every function parameter",
      "Useful for logging/tracing correlation",
      "Must be used carefully to avoid leaks",
      "Has performance considerations in high throughput services",
    ],
    redFlags: [
      "Using global variables for request-scoped state",
      "Storing large objects and leaking memory",
      "Assuming it's free performance-wise",
    ],
  },
  // --- Senior bank (React / Express / Bun / Deep JS) ---
  {
    id: "js-react-use-sync-external-store-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "concurrency", "state-management"],
    question:
      "What problem does `useSyncExternalStore` solve in React 18, and why does it matter for external state libraries?",
    shortAnswer:
      "It provides a concurrent-safe way to subscribe to external stores, preventing tearing and ensuring consistent snapshots during concurrent rendering.",
    keyPoints: [
      "Designed for concurrent rendering correctness",
      "Ensures render sees a consistent store snapshot",
      "Avoids tearing when renders are interrupted",
      "External libs integrate via subscribe/getSnapshot",
    ],
    redFlags: [
      "Using ad-hoc subscriptions that break under concurrency",
      "Not understanding tearing/snapshot consistency",
      "Assuming `useEffect` subscriptions are always sufficient",
    ],
  },
  {
    id: "js-react-useevent-stability-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "hooks", "performance"],
    question:
      "Why do stable event callbacks matter in React, and what problems happen when handler identity changes frequently?",
    shortAnswer:
      "Changing handler identities can defeat memoization and cause unnecessary re-renders or re-subscriptions; stable callbacks help performance and correctness in subscriptions.",
    keyPoints: [
      "Referential identity affects memoized children",
      "Subscriptions/effects may re-run due to function deps",
      "Stability prevents unnecessary setup/teardown",
      "Balance against stale closure risks",
    ],
    redFlags: [
      "Blindly memoizing handlers without correct deps",
      "Ignoring subscription churn from changing callbacks",
      "Assuming handler identity never matters",
    ],
  },
  {
    id: "js-react-rendering-tearing-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "concurrency", "internals"],
    question: "What is 'tearing' in concurrent UI rendering and how do you prevent it?",
    shortAnswer:
      "Tearing is when different parts of the UI read inconsistent versions of external state; prevent with concurrent-safe subscriptions and snapshot APIs.",
    keyPoints: [
      "Occurs with external mutable sources",
      "Concurrent rendering can interleave reads",
      "Use snapshot-based subscription primitives",
      "Avoid reading mutable globals during render",
    ],
    redFlags: [
      "Reading mutable global state directly in render",
      "Using non-atomic store reads across components",
      "Assuming concurrency is only about performance",
    ],
  },
  {
    id: "js-react-css-in-js-runtime-cost-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "performance", "css"],
    question:
      "What are the runtime performance costs of CSS-in-JS approaches and what mitigations are common?",
    shortAnswer:
      "Runtime style generation/injection can add CPU and block render; mitigations include build-time extraction, caching, and limiting dynamic styles.",
    keyPoints: [
      "Style generation per render can be expensive",
      "Injection affects style recalculation",
      "Build-time extraction reduces runtime work",
      "Prefer class toggles over highly dynamic inline styles",
    ],
    redFlags: [
      "Generating new style objects/strings per render unnecessarily",
      "Ignoring hydration/SSR style ordering issues",
      "Assuming all CSS-in-JS is equally fast",
    ],
  },
  {
    id: "js-react-portal-event-bubbling-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "portals", "events"],
    question:
      "How does event bubbling work across React Portals and why can that surprise developers?",
    shortAnswer:
      "Even though portals render in a different DOM subtree, React events bubble through the React tree, so parent handlers can still fire.",
    keyPoints: [
      "React event system is based on React tree, not DOM tree",
      "Helps keep composition semantics intact",
      "Can surprise when DOM ancestors differ",
      "Be deliberate with stopPropagation and event boundaries",
    ],
    redFlags: [
      "Assuming portal events won't reach React parents",
      "Overusing stopPropagation to patch architecture issues",
      "Ignoring focus management in modal portals",
    ],
  },
  {
    id: "js-react-hydration-streaming-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "ssr", "streaming"],
    question:
      "What is streaming SSR/hydration and how does it improve time-to-interactive compared to traditional SSR?",
    shortAnswer:
      "Streaming lets the server send HTML incrementally and hydrate progressively, showing meaningful UI sooner and reducing long blank waits.",
    keyPoints: [
      "Incremental HTML delivery reduces initial latency perception",
      "Progressive hydration prioritizes visible/interactive parts",
      "Works well with Suspense boundaries",
      "Requires careful error/loading boundary design",
    ],
    redFlags: [
      "Treating streaming as a free performance win without measurement",
      "Missing boundaries leading to large blocking chunks",
      "Ignoring caching/CDN interaction with streamed responses",
    ],
  },
  {
    id: "js-react-bundle-splitting-boundaries-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "performance", "bundling"],
    question:
      "How do code-splitting boundaries (dynamic imports) affect React UX and caching in large apps?",
    shortAnswer:
      "They reduce initial bundle size but can introduce waterfalls; good boundaries maximize cache reuse and avoid splitting tiny components.",
    keyPoints: [
      "Avoid loading spinners that block navigation",
      "Preload likely routes/components",
      "Split by routes/features, not by small leaf components",
      "Measure waterfalls and TTI impact",
    ],
    redFlags: [
      "Over-splitting leading to many small requests",
      "Creating dependency waterfalls",
      "Ignoring cache invalidation and shared chunks",
    ],
  },
  {
    id: "js-react-useeffect-cleanup-order-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "effects", "internals"],
    question:
      "When React re-runs an effect due to dependency changes, what is the cleanup ordering and why does it matter?",
    shortAnswer:
      "React runs the previous cleanup before running the next effect, which prevents duplicate subscriptions and ensures resources are released before re-acquiring.",
    keyPoints: [
      "Cleanup runs on deps change and on unmount",
      "Prevents duplicate event listeners/subscriptions",
      "Critical for correctness with sockets/intervals",
      "Avoids leaking resources across renders",
    ],
    redFlags: [
      "Creating subscriptions without cleanup",
      "Assuming cleanup runs after the new effect",
      "Relying on cleanup timing for business logic",
    ],
  },
  {
    id: "js-react-usecallback-vs-closure-cost-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "performance", "hooks"],
    question:
      "How do you decide whether `useCallback` is worth it versus just recreating a closure each render?",
    shortAnswer:
      "Only memoize when handler identity stability prevents expensive renders/subscriptions; otherwise the overhead and complexity can outweigh benefits.",
    keyPoints: [
      "Measure re-render cost and prop churn",
      "Stability matters most for memoized children and deps",
      "Avoid micro-optimizing cheap components",
      "Correct deps are essential to avoid stale state",
    ],
    redFlags: [
      "Memoizing everything as a default",
      "Incorrect deps causing stale behavior",
      "Not profiling before optimizing",
    ],
  },
  {
    id: "js-node-cluster-vs-loadbalancer-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["node", "scalability", "deployment"],
    question:
      "When scaling Node HTTP servers, what are the trade-offs between using `cluster`, multiple replicas behind a load balancer, and worker threads?",
    shortAnswer:
      "Multiple replicas give isolation and simpler ops; cluster shares a host but less isolation; worker threads help CPU tasks but require careful concurrency.",
    keyPoints: [
      "Replicas isolate crashes and memory leaks",
      "Cluster shares one machine; can improve CPU utilization",
      "Worker threads help CPU-bound tasks without IPC",
      "Choose based on failure isolation and workload profile",
    ],
    redFlags: [
      "Assuming cluster solves CPU-bound bottlenecks automatically",
      "Ignoring crash isolation and memory leak containment",
      "Mixing models without understanding operational impacts",
    ],
  },
  {
    id: "js-node-libuv-threadpool-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["node", "libuv", "performance"],
    question:
      "What is Node's libuv thread pool used for, and what issues appear when it is saturated?",
    shortAnswer:
      "It runs certain async operations (fs, DNS, crypto in some cases); saturation increases latency for unrelated requests and can cause queueing cascades.",
    keyPoints: [
      "Not all operations use the threadpool (networking is mostly OS async)",
      "FS operations and some crypto can queue",
      "Threadpool size is configurable (with trade-offs)",
      "Saturation looks like mysterious latency spikes",
    ],
    redFlags: [
      "Assuming Node is always single-threaded for all work",
      "Running heavy fs/crypto workloads without understanding threadpool",
      "Increasing threadpool size blindly without measuring",
    ],
  },
  {
    id: "js-express-request-idempotency-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["express", "api-design", "reliability"],
    question:
      "How would you add idempotency to an Express payment endpoint, and what must be stored to make it correct?",
    shortAnswer:
      "Use an idempotency key persisted server-side mapping to a single logical operation result; store request hash/result and enforce uniqueness with proper TTL/locking.",
    keyPoints: [
      "Persist idempotency key with operation state",
      "Prevent double-charge on retries/timeouts",
      "Return same result for repeated keys",
      "Handle concurrency with unique constraints/locks",
    ],
    redFlags: [
      "Keeping idempotency state only in memory",
      "Not handling concurrent requests with the same key",
      "Using idempotency keys without storing results",
    ],
  },
  {
    id: "js-express-openapi-contract-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["express", "api", "contracts"],
    question:
      "Why is an OpenAPI contract valuable for Express APIs and how can it prevent production regressions?",
    shortAnswer:
      "It defines request/response schemas and behaviors; it enables validation, client generation, and contract testing to catch breaking changes early.",
    keyPoints: [
      "Prevents accidental breaking changes",
      "Enables generated clients and docs",
      "Can validate responses, not just inputs",
      "Supports consumer-driven testing patterns",
    ],
    redFlags: [
      "Treating docs as optional and letting behavior drift",
      "Only validating requests but never validating responses",
      "Not versioning APIs when breaking changes happen",
    ],
  },
  {
    id: "js-express-sql-injection-orm-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["express", "security", "databases"],
    question:
      "Why can SQL injection still happen even when using an ORM, and what patterns prevent it reliably?",
    shortAnswer:
      "ORMs are safe when using parameterization; injection appears when concatenating raw SQL/identifiers from untrusted input—use parameterized queries and allowlists for identifiers.",
    keyPoints: [
      "Parameterize values; never interpolate user input into SQL",
      "Use ORM query builders instead of raw strings",
      "Allowlist sortable fields/columns",
      "Validate and normalize inputs at the boundary",
    ],
    redFlags: [
      "Building SQL strings with user input",
      "Allowing arbitrary column names from query params",
      "Assuming ORM = always safe",
    ],
  },
  {
    id: "js-bun-package-resolution-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["bun", "modules", "resolution"],
    question:
      "What module resolution pitfalls can appear in mixed ESM/CJS packages when using modern runtimes and bundlers (including Bun)?",
    shortAnswer:
      "Conditional exports, dual packages, and differing `main/module/exports` fields can lead to wrong entrypoints, runtime errors, or duplicated dependencies.",
    keyPoints: [
      "Understand `exports` conditions (import/require/browser)",
      "Dual ESM/CJS packages can cause duplication",
      "Bundlers may prefer ESM entrypoints for tree-shaking",
      "Test runtime + bundler combinations in CI",
    ],
    redFlags: [
      "Ignoring package `exports` and relying on deep imports",
      "Assuming resolution is identical across runtimes",
      "Debugging by random config changes without understanding conditions",
    ],
  },
  {
    id: "js-bun-node-polyfills-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["bun", "node", "compatibility"],
    question:
      "Why do some Node-focused libraries break in other runtimes despite API compatibility claims?",
    shortAnswer:
      "They may rely on undocumented Node behaviors, native addons, exact stream semantics, or environment-specific globals; compatibility layers can't cover everything.",
    keyPoints: [
      "Native addons are a common incompatibility source",
      "Undocumented behavior is fragile",
      "Streams and Buffer semantics differ subtly",
      "Test real production flows, not only unit tests",
    ],
    redFlags: [
      "Assuming 'compatible' means 'identical'",
      "Not auditing native dependencies",
      "Migrating runtime without observability and canaries",
    ],
  },
  {
    id: "js-core-realm-cross-frame-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["internals", "web-apis", "types"],
    question:
      "What are JavaScript 'realms' (e.g., different iframes) and how can they break checks like `instanceof Array`?",
    shortAnswer:
      "Each realm has its own global objects and prototypes; an array from another realm has a different `Array` constructor, so `instanceof` can fail—use robust checks like `Array.isArray`.",
    keyPoints: [
      "Realms have separate intrinsics (Array, Object, Error)",
      "`instanceof` checks prototype chain against a specific constructor",
      "Use `Array.isArray` and duck-typing where appropriate",
      "Common in browser iframes and VM contexts",
    ],
    redFlags: [
      "Relying on `instanceof` across boundaries",
      "Assuming all globals are shared across iframes",
      "Not knowing about Node `vm` contexts / browser realms",
    ],
  },
  {
    id: "js-core-prototype-chain-performance-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["performance", "prototypes", "engines"],
    question:
      "How does deep prototype chains impact performance and why do engines optimize common cases?",
    shortAnswer:
      "Property lookup walks the prototype chain; deep/unstable chains increase misses and can deoptimize inline caches, while engines optimize monomorphic access patterns.",
    keyPoints: [
      "Lookups traverse prototypes until found or null",
      "Inline caches assume stable shapes/chains",
      "Megamorphic sites degrade performance",
      "Prefer shallow, stable object shapes in hot paths",
    ],
    redFlags: [
      "Creating dynamic prototype mutations at runtime",
      "Assuming prototype lookups are always constant-time",
      "Ignoring shape stability in performance-critical code",
    ],
  },
  {
    id: "js-core-gc-generations-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["gc", "memory", "engines"],
    question:
      "Explain generational garbage collection and why short-lived allocations are typically cheaper than long-lived ones.",
    shortAnswer:
      "Generational GC assumes most objects die young; young-gen collections are frequent and fast, while promoting objects to old gen increases collection cost later.",
    keyPoints: [
      "Young generation: quick scavenges",
      "Old generation: slower mark/sweep/compact cycles",
      "Long-lived objects increase old-gen pressure",
      "Avoid unnecessary retention via caches/listeners",
    ],
    redFlags: [
      "Assuming GC cost is uniform for all allocations",
      "Leaking references via event listeners/caches",
      "Not understanding object promotion effects",
    ],
  },
  {
    id: "js-core-deopt-triggers-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["v8", "jit", "performance"],
    question:
      "What is JIT deoptimization in JavaScript engines and what kinds of code patterns commonly trigger it?",
    shortAnswer:
      "Engines optimize based on observed types/shapes; when assumptions break (type changes, shape changes, megamorphic calls), optimized code deopts back to slower paths.",
    keyPoints: [
      "Type instability is a major trigger",
      "Megamorphic property access/calls degrade inline caches",
      "Hidden class transitions can break optimized code",
      "Profiling helps confirm real hotspots",
    ],
    redFlags: [
      "Believing engines never deopt",
      "Writing highly polymorphic hot code without awareness",
      "Optimizing without measuring and understanding assumptions",
    ],
  },
  {
    id: "js-core-async-cancellation-patterns-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["async", "architecture", "web-apis"],
    question:
      "What are robust cancellation patterns in JS async code beyond AbortController, and why do they matter in servers?",
    shortAnswer:
      "Use structured concurrency patterns: propagate cancellation tokens, enforce timeouts, and ensure cleanup; in servers, cancellations prevent wasted work and resource leaks.",
    keyPoints: [
      "Timeouts are a form of cancellation",
      "Propagate cancellation to downstream calls",
      "Ensure cleanup runs on cancellation",
      "Avoid orphaned background tasks per request",
    ],
    redFlags: [
      "Ignoring cancellation and leaking work after client disconnect",
      "Using global flags for cancellation",
      "Not cleaning up resources on aborts/timeouts",
    ],
  },
  {
    id: "js-core-microtask-queue-starvation-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["event-loop", "microtasks", "performance"],
    question:
      "How can heavy microtask usage (Promise chains) starve the event loop and what are mitigation strategies?",
    shortAnswer:
      "Microtasks run before macrotasks; long microtask chains can delay I/O and timers—mitigate by yielding with macrotasks, chunking work, or using schedulers.",
    keyPoints: [
      "Microtasks are drained to completion",
      "Can delay rendering, timers, and I/O callbacks",
      "Chunk CPU-heavy tasks and yield periodically",
      "Use workers for CPU-bound work",
    ],
    redFlags: [
      "Infinite Promise recursion",
      "Assuming microtasks are always 'free'",
      "Not understanding scheduling priority",
    ],
  },
  {
    id: "js-core-node-fetch-undici-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["node", "http", "performance"],
    question:
      "What performance/reliability considerations matter when using `fetch` on the server (connection pooling, keep-alive, timeouts)?",
    shortAnswer:
      "Server fetch must manage pooling and timeouts; without them you risk socket exhaustion and hung calls—configure agents/dispatchers and enforce AbortController timeouts.",
    keyPoints: [
      "Reuse connections (keep-alive) to reduce latency",
      "Set connect/response timeouts",
      "Bound concurrency to protect downstreams",
      "Cancel downstream calls on request abort",
    ],
    redFlags: [
      "No timeouts on outbound requests",
      "Creating a new agent/connection per request",
      "Ignoring backpressure and retry semantics",
    ],
  },
  {
    id: "js-express-retries-timeouts-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["express", "reliability", "architecture"],
    question:
      "Why can naive retries in an Express API make outages worse, and what is a safer strategy?",
    shortAnswer:
      "Retries can amplify load (retry storms) and overload dependencies; safer strategies include bounded retries with jitter, circuit breakers, and idempotency.",
    keyPoints: [
      "Retry storms happen under partial failures",
      "Use exponential backoff + jitter",
      "Add circuit breakers and bulkheads",
      "Ensure idempotency for retried operations",
    ],
    redFlags: [
      "Retrying immediately in tight loops",
      "No caps on retries or concurrency",
      "Retrying non-idempotent operations without safeguards",
    ],
  },
  {
    id: "js-react-scheduler-priorities-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "internals", "performance"],
    question:
      "Conceptually, how does React's scheduler prioritize work and why does that improve UX for large updates?",
    shortAnswer:
      "It prioritizes urgent input/visual updates over low-priority renders, allowing the UI to remain responsive while deferring non-urgent work.",
    keyPoints: [
      "Different priority lanes for updates",
      "Interruptible rendering for low-priority work",
      "Avoids long main-thread blocks",
      "Works with transitions and deferred values",
    ],
    redFlags: [
      "Assuming React always renders everything immediately",
      "Doing heavy work on the main thread without yielding",
      "Not understanding that scheduling is about responsiveness, not raw speed",
    ],
  },
  {
    id: "js-react-swr-cache-invalidation-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "data-fetching", "caching"],
    question:
      "In React apps, what are the hard parts of cache invalidation for server state and how do libraries like React Query/SWR help?",
    shortAnswer:
      "Server state changes outside the UI; libraries provide normalized cache, invalidation, background refetching, deduping, and race handling.",
    keyPoints: [
      "Stale-while-revalidate reduces perceived latency",
      "Invalidation must be scoped by keys and mutations",
      "Deduping prevents duplicate requests",
      "Handles cancellation and out-of-order responses",
    ],
    redFlags: [
      "Manually managing cache in component state at scale",
      "Ignoring race conditions and stale updates",
      "Refetching everything on every change",
    ],
  },
  {
    id: "js-express-content-negotiation-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["express", "http", "api-design"],
    question:
      "What is HTTP content negotiation and how would you implement versioning/content types safely in an Express API?",
    shortAnswer:
      "Content negotiation uses `Accept`/`Content-Type`; implement explicit media types or versioned routes and validate headers to avoid ambiguous behavior.",
    keyPoints: [
      "Validate `Content-Type` for request bodies",
      "Use explicit `Accept` handling for response formats",
      "Prefer clear API versioning strategies",
      "Avoid implicit behavior that breaks clients silently",
    ],
    redFlags: [
      "Ignoring Accept/Content-Type mismatches",
      "Breaking clients with silent format changes",
      "Accepting any content type without validation",
    ],
  },
  {
    id: "js-core-structured-logging-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["observability", "node", "production"],
    question:
      "Why is structured logging (JSON logs) preferable to string logs in Node/Express production systems?",
    shortAnswer:
      "Structured logs are machine-parsable, searchable, and enable reliable aggregation by fields (requestId, userId, latency), improving debugging and analytics.",
    keyPoints: [
      "Better indexing and filtering in log systems",
      "Enables consistent schema across services",
      "Avoids brittle regex parsing",
      "Supports correlation IDs and tracing integration",
    ],
    redFlags: [
      "Logging unstructured strings with inconsistent formats",
      "Logging sensitive data (tokens, passwords)",
      "No request context in logs",
    ],
  },
  {
    id: "js-core-http-compression-tradeoffs-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["http", "performance", "node"],
    question:
      "What are the trade-offs of enabling gzip/brotli compression in an Express server?",
    shortAnswer:
      "Compression reduces bandwidth but costs CPU and can add latency; tune thresholds, avoid compressing already-compressed content, and consider CDN/offload.",
    keyPoints: [
      "CPU cost can hurt p99 latency under load",
      "Prefer brotli for static assets where possible",
      "Avoid compressing images/video",
      "Offload to reverse proxies/CDNs when available",
    ],
    redFlags: [
      "Compressing everything blindly",
      "Ignoring CPU saturation and event loop blocking",
      "Not setting appropriate caching headers for compressed variants",
    ],
  },
  {
    id: "js-express-ddos-bodylimit-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["express", "security", "dos"],
    question:
      "Why are body size limits and header limits critical in Express servers, and what attacks do they mitigate?",
    shortAnswer:
      "They reduce DoS risk by preventing huge payloads/headers from consuming memory/CPU, mitigating oversized JSON bodies, slowloris-like behaviors, and parser abuse.",
    keyPoints: [
      "Set `express.json` size limits",
      "Set server header/request timeouts",
      "Reject overly large headers early",
      "Monitor and rate limit abusive clients",
    ],
    redFlags: [
      "No body limits on JSON endpoints",
      "Assuming upstream proxies always protect you",
      "Ignoring request/headers timeout configuration",
    ],
  },
  {
    id: "js-bun-perf-benchmarks-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["bun", "performance", "benchmarking"],
    question:
      "Why are runtime benchmarks (Node vs Bun) often misleading, and how do you benchmark responsibly for a real app?",
    shortAnswer:
      "Microbenchmarks ignore real-world bottlenecks (I/O, DB, GC, cold starts); benchmark end-to-end with representative traffic and measure p50/p95/p99 under load.",
    keyPoints: [
      "Use production-like workloads and data sizes",
      "Measure tail latency, not just throughput",
      "Include warmup and caching effects",
      "Validate observability and memory profiles",
    ],
    redFlags: [
      "Choosing a runtime based on hello-world throughput",
      "Ignoring tail latency and memory usage",
      "Not controlling variables (hardware, load, warmup)",
    ],
  },
  {
    id: "js-react-synthetic-vs-native-event-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["react", "events", "internals"],
    question:
      "What subtle bugs can happen when mixing native DOM event listeners with React event handlers in the same UI?",
    shortAnswer:
      "Different ordering/propagation semantics can cause double-handling or missed events; React uses delegated events and batching, which may not align with native listeners.",
    keyPoints: [
      "React may batch updates from its events",
      "Native listeners may fire outside React batching",
      "Capture/bubble ordering can differ from expectations",
      "Be deliberate with where listeners are attached",
    ],
    redFlags: [
      "Adding global document listeners without cleanup",
      "Assuming native listeners behave identically to React handlers",
      "Debugging by adding stopPropagation everywhere",
    ],
  },
  {
    id: "js-core-module-caching-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["modules", "node", "esm"],
    question:
      "How does module caching differ between CommonJS and ESM in Node-like environments, and why can it matter for testing?",
    shortAnswer:
      "Both cache modules, but interop and evaluation timing differ; caching can cause shared singletons across tests unless you isolate/reset modules correctly.",
    keyPoints: [
      "CJS caches `require` results by resolved filename",
      "ESM has its own module graph and evaluation rules",
      "Singleton state can leak between tests",
      "Test runners provide isolation/reset mechanisms",
    ],
    redFlags: [
      "Assuming each import creates a new instance",
      "Relying on module singletons unintentionally",
      "Not understanding ESM/CJS interop caching surprises",
    ],
  },
  {
    id: "js-core-serialization-performance-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["performance", "serialization", "node"],
    question:
      "In high-throughput Node/Express APIs, what are common JSON serialization bottlenecks and mitigations?",
    shortAnswer:
      "Large object graphs and repeated stringification cost CPU/GC; mitigate by reducing payload size, precomputing stable fragments, streaming, and caching where safe.",
    keyPoints: [
      "Reduce response payloads (select fields, pagination)",
      "Avoid building huge intermediate objects",
      "Use compression judiciously",
      "Cache stable responses with correct invalidation",
    ],
    redFlags: [
      "Returning massive payloads without pagination",
      "Stringifying the same object repeatedly per request",
      "Ignoring CPU profiling for serialization hot paths",
    ],
  },
  {
    id: "js-core-async-resource-cleanup-1",
    language: "JavaScript",
    difficulty: "Senior",
    tags: ["async", "node", "reliability"],
    question:
      "Why is cleanup on request abort important in server handlers, and how can you detect aborts?",
    shortAnswer:
      "If the client disconnects, continuing expensive work wastes resources; detect abort via request/response events or AbortSignals and cancel downstream work.",
    keyPoints: [
      "Cancel DB/HTTP calls when possible",
      "Avoid leaking timers and listeners",
      "Handle timeouts as aborts too",
      "Improves p99 and reduces waste under load",
    ],
    redFlags: [
      "Ignoring disconnects and continuing heavy work",
      "No cancellation strategy for downstream requests",
      "Leaking listeners per request",
    ],
  },
];
