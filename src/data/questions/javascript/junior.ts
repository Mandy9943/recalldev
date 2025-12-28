import { Question } from "@/types";

export const JS_QUESTIONS_JUNIOR: Question[] = [
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
    id: "js-junior-var-let-const-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["variables", "scope", "hoisting"],
    question: "What are the differences between `var`, `let`, and `const`?",
    shortAnswer:
      "`var` is function-scoped and can be redeclared; `let`/`const` are block-scoped and cannot be redeclared, and `const` prevents reassignment.",
    keyPoints: [
      "`var` is function-scoped; `let`/`const` are block-scoped",
      "`var` declarations are hoisted and initialized to `undefined`",
      "`let`/`const` are hoisted but in the temporal dead zone until initialized",
      "`const` prevents reassignment (but objects can still be mutated)",
    ],
    redFlags: [
      "Saying `const` makes objects immutable",
      "Not knowing about block scope vs function scope",
      "Missing the temporal dead zone concept",
    ],
  },
  {
    id: "js-junior-equality-operators-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["operators", "coercion"],
    question: "What is the difference between `==` and `===` in JavaScript?",
    shortAnswer:
      "`==` allows type coercion before comparison; `===` compares both type and value (no coercion).",
    keyPoints: [
      "`===` is strict equality (recommended most of the time)",
      "`==` performs coercion rules (can be surprising)",
      "Examples: `0 == '0'` is true, but `0 === '0'` is false",
      "`null == undefined` is true, but `null === undefined` is false",
    ],
    redFlags: [
      "Saying `==` compares references while `===` compares values",
      "Not being able to provide any coercion example",
      "Claiming `==` is always wrong without nuance",
    ],
  },
  {
    id: "js-junior-truthy-falsy-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["booleans", "coercion"],
    question: "What does “truthy” and “falsy” mean? Name common falsy values.",
    shortAnswer:
      "Truthy/falsy describes how values coerce to boolean in conditionals; falsy values include `false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, and `NaN`.",
    keyPoints: [
      "JavaScript coerces values to boolean in `if`, `&&`, `||`, `!`",
      "Falsy values are a small, specific set",
      "Everything else is truthy (including `[]` and `{}`)",
      "Use explicit checks when ambiguity matters",
    ],
    redFlags: [
      "Claiming empty arrays/objects are falsy",
      "Forgetting `NaN` or `0n`",
      "Confusing truthiness with equality comparisons",
    ],
  },
  {
    id: "js-junior-null-vs-undefined-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["types", "null", "undefined"],
    question: "What’s the difference between `null` and `undefined`?",
    shortAnswer:
      "`undefined` usually means “not set / missing”; `null` is an explicit “no value” assigned by the developer.",
    keyPoints: [
      "Uninitialized variables evaluate to `undefined`",
      "Missing object properties return `undefined`",
      "`null` is intentionally assigned to represent “empty”",
      "Nullish coalescing (`??`) treats both as “nullish”",
    ],
    redFlags: [
      "Saying they’re identical",
      "Not knowing where `undefined` typically comes from",
      "Confusing nullish coalescing (`??`) with `||`",
    ],
  },
  {
    id: "js-junior-array-map-filter-reduce-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["arrays", "functional"],
    question:
      "When would you use `map`, `filter`, and `reduce` on an array? Give a quick example for each.",
    shortAnswer:
      "`map` transforms items, `filter` selects items, and `reduce` aggregates items into a single value (like a sum or object).",
    keyPoints: [
      "`map`: same length output, transformed elements",
      "`filter`: subset output based on predicate",
      "`reduce`: fold into a single value (number, object, map, etc.)",
      "Prefer readability; sometimes a loop is clearer",
    ],
    redFlags: [
      "Using `map` for side effects (should use `forEach`)",
      "Not knowing what `reduce` returns",
      "Assuming these mutate the original array (they don’t, by default)",
    ],
  },
  {
    id: "js-junior-json-parse-stringify-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["json", "web-apis"],
    question:
      "What do `JSON.stringify` and `JSON.parse` do? What can go wrong?",
    shortAnswer:
      "`stringify` converts JS values to a JSON string; `parse` turns a JSON string into JS values. They can fail on invalid JSON, circular references, or type loss (like Dates).",
    keyPoints: [
      "`JSON.parse` throws on invalid JSON",
      "`JSON.stringify` throws on circular references",
      "JSON has no Date type; Dates become strings",
      "Functions and `undefined` are not represented in JSON",
    ],
    redFlags: [
      "Thinking JSON supports functions or comments",
      "Not handling parse errors",
      "Assuming stringify/parse is a deep clone for all values",
    ],
  },
  {
    id: "js-junior-try-catch-async-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["async", "errors", "promises"],
    question:
      "How do you handle errors with `async/await`? When does `try/catch` work?",
    shortAnswer:
      "Use `try/catch` around awaited promises; it catches synchronous errors and awaited rejections, but not errors in detached async work you don’t await.",
    keyPoints: [
      "`await` unwraps a promise; rejections throw",
      "`try/catch` must wrap the `await` to catch rejections",
      "If you don’t await a promise, its rejection won’t be caught there",
      "In Node, unhandled rejections should be avoided/handled",
    ],
    redFlags: [
      "Wrapping only the promise creation but not the `await`",
      "Assuming `try/catch` catches all async errors globally",
      "Ignoring unhandled promise rejections",
    ],
  },
  {
    id: "js-junior-destructuring-basics-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["syntax", "objects", "arrays"],
    question: "What is destructuring in JavaScript, and why is it useful?",
    shortAnswer:
      "Destructuring lets you unpack values from arrays/objects into variables, with defaults and renaming, which improves readability and reduces boilerplate.",
    keyPoints: [
      "Object destructuring by property name: `const { a } = obj`",
      "Array destructuring by position: `const [x, y] = arr`",
      "Supports renaming and default values",
      "Common in function parameters",
    ],
    redFlags: [
      "Confusing array vs object destructuring rules",
      "Not knowing about renaming (`{ a: alias }`)",
      "Overusing destructuring to the point of unreadability",
    ],
  },
  {
    id: "js-junior-spread-rest-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["syntax", "functions", "objects", "arrays"],
    question:
      "What are the spread (`...`) and rest (`...`) operators used for in JS?",
    shortAnswer:
      "Spread expands an iterable/object into elements/properties; rest collects remaining elements/properties into an array/object (often in function params).",
    keyPoints: [
      "Spread: `[...arr]`, `{ ...obj }`, `fn(...args)`",
      "Rest: `function f(...args) {}` and `const { a, ...rest } = obj`",
      "Common for shallow copies and merges",
      "Be mindful: copies are shallow",
    ],
    redFlags: [
      "Thinking spread makes deep copies",
      "Mixing up rest vs spread usage",
      "Not knowing rest can be used in object destructuring",
    ],
  },
  {
    id: "js-junior-event-loop-basic-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["event-loop", "async"],
    question:
      "At a high level, what is the JavaScript event loop and why does it matter?",
    shortAnswer:
      "It’s how JS schedules work: the call stack runs synchronous code, and queued async callbacks run later, enabling non-blocking I/O and responsive UIs.",
    keyPoints: [
      "Single-threaded execution for JS code (in typical environments)",
      "Async work is queued (timers, I/O callbacks, promise microtasks)",
      "Explains why `setTimeout(..., 0)` isn’t immediate",
      "Helps reason about race conditions and UI freezes",
    ],
    redFlags: [
      "Saying JS runs everything in parallel by default",
      "Believing `setTimeout(0)` runs immediately",
      "Not distinguishing sync stack vs queued callbacks",
    ],
  },
  {
    id: "js-junior-immutability-primitive-vs-object-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["types", "objects", "immutability"],
    question:
      "What’s the difference between passing primitives vs objects to a function in JS?",
    shortAnswer:
      "Primitives are passed by value; objects are passed by sharing a reference value, so mutations inside the function can affect the original object.",
    keyPoints: [
      "Primitives: number/string/boolean/bigint/symbol/null/undefined",
      "Objects/arrays/functions are reference values",
      "Reassigning a parameter never changes the caller’s binding",
      "Mutating an object’s properties does affect the shared object",
    ],
    redFlags: [
      "Saying JS is strictly pass-by-reference",
      "Confusing reassignment with mutation",
      "Not being able to explain why arrays can be mutated inside functions",
    ],
  },
  {
    id: "js-junior-module-cjs-esm-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["modules", "node", "esm", "commonjs"],
    question: "What’s the difference between CommonJS and ES Modules?",
    shortAnswer:
      "CommonJS uses `require/module.exports` (historically Node); ESM uses `import/export` and supports static analysis and top-level `await` in some contexts.",
    keyPoints: [
      "CJS loads modules dynamically with `require`",
      "ESM uses `import/export` (static structure enables tree-shaking)",
      "Interop rules can be tricky (`default` vs named exports)",
      "In browsers, ESM is the standard module format",
    ],
    redFlags: [
      "Assuming CJS and ESM interop is always seamless",
      "Thinking ESM is 'just syntax' with no tooling/runtime implications",
      "Not knowing what `module.exports` is",
    ],
  },
  {
    id: "js-junior-callbacks-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["functions", "async", "callbacks"],
    question: "What is a callback function and why is it used?",
    shortAnswer:
      "A callback is a function passed as an argument to another function, to be executed after some operation is completed.",
    keyPoints: [
      "Used for asynchronous operations (timers, events, requests)",
      "Allows code to be executed after a task finishes",
      "Can lead to 'callback hell' if nested deeply",
      "Found in many built-in methods like `setTimeout` and `array.map`",
    ],
    redFlags: [
      "Thinking callbacks are only for sync code",
      "Not knowing how to pass arguments to a callback",
      "Confusing callbacks with promises",
    ],
  },
  {
    id: "js-junior-arrow-vs-regular-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["functions", "this", "syntax"],
    question:
      "What are the main differences between arrow functions and regular functions?",
    shortAnswer:
      "Arrow functions have a shorter syntax and don't have their own `this`, `arguments`, or `super` (they inherit them from the parent scope).",
    keyPoints: [
      "Arrow functions use `=>` syntax",
      "Regular functions have their own `this` context (binding depends on how they're called)",
      "Arrow functions cannot be used as constructors (no `new`)",
      "Arrow functions have implicit return for one-liners",
    ],
    redFlags: [
      "Using arrow functions as object methods when `this` is needed",
      "Thinking arrow functions are just 'shorter regular functions'",
      "Not knowing about the implicit return",
    ],
  },
  {
    id: "js-junior-closures-basic-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["functions", "scope", "closures"],
    question: "What is a closure in JavaScript?",
    shortAnswer:
      "A closure is the combination of a function and the lexical environment within which that function was declared, allowing it to 'remember' variables from its outer scope.",
    keyPoints: [
      "Created every time a function is created at function creation time",
      "Enables private variables (encapsulation)",
      "Inner functions have access to outer function's variables even after outer returns",
      "Commonly used in event handlers and functional programming",
    ],
    redFlags: [
      "Thinking closures only happen with `return` statements",
      "Confusing closures with scope",
      "Not knowing why closures might lead to memory leaks if not handled carefully",
    ],
  },
  {
    id: "js-junior-this-keyword-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["this", "objects", "functions"],
    question: "What does the `this` keyword refer to in JavaScript?",
    shortAnswer:
      "The value of `this` is determined by how a function is called (the call site); usually, it refers to the object that 'owns' the current execution context.",
    keyPoints: [
      "In a method, `this` refers to the owner object",
      "Alone or in a function (non-strict), `this` refers to the global object (window)",
      "In an event, `this` refers to the element that received the event",
      "Methods like `call()`, `apply()`, and `bind()` can explicitly set `this`",
    ],
    redFlags: [
      "Thinking `this` always refers to the function itself",
      "Thinking `this` refers to the scope where it was defined",
      "Not knowing about the impact of 'use strict' on global `this`",
    ],
  },
  {
    id: "js-junior-template-literals-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["syntax", "strings"],
    question: "What are template literals and what features do they provide?",
    shortAnswer:
      "Template literals use backticks (`` ` ``) and allow for embedded expressions (`${expression}`), multi-line strings, and tagged templates.",
    keyPoints: [
      "Easy string interpolation without concatenation",
      "Preserves newlines for multi-line strings",
      "Can execute any JS expression inside `${}`",
      "Cleaner than using `+` for complex strings",
    ],
    redFlags: [
      "Using regular quotes and expecting interpolation to work",
      "Not knowing they support multi-line text",
      "Over-nesting expressions inside templates",
    ],
  },
  {
    id: "js-junior-timeout-interval-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["async", "timers"],
    question: "What is the difference between `setTimeout` and `setInterval`?",
    shortAnswer:
      "`setTimeout` executes a function once after a delay; `setInterval` executes it repeatedly at fixed intervals.",
    keyPoints: [
      "Both return a timer ID that can be used to cancel them (`clearTimeout`/`clearInterval`)",
      "Delay is in milliseconds",
      "`setInterval` doesn't wait for the previous execution to finish",
      "Neither guarantees exact timing (subject to the event loop)",
    ],
    redFlags: [
      "Forgetting to clear intervals (leading to memory leaks/bugs)",
      "Thinking the delay is 100% accurate",
      "Confusing which one runs once vs repeatedly",
    ],
  },
  {
    id: "js-junior-storage-comparison-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["web-apis", "storage"],
    question: "Compare `localStorage`, `sessionStorage`, and `cookies`.",
    shortAnswer:
      "`localStorage` persists until cleared; `sessionStorage` lasts for the tab session; `cookies` are sent with HTTP requests and have small size limits.",
    keyPoints: [
      "Storage size: ~5-10MB for Web Storage vs 4KB for cookies",
      "Cookies are accessible by both server and client (usually)",
      "Web Storage is client-side only",
      "Data in Web Storage is stored as strings",
    ],
    redFlags: [
      "Storing sensitive data in `localStorage` without encryption",
      "Thinking `sessionStorage` persists across different tabs",
      "Not knowing cookies have size limitations",
    ],
  },
  {
    id: "js-junior-foreach-map-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["arrays", "functional"],
    question: "What is the difference between `forEach` and `map`?",
    shortAnswer:
      "`forEach` executes a function for each element (used for side effects); `map` creates and returns a new array with the transformed elements.",
    keyPoints: [
      "`map` returns a new array of the same length",
      "`forEach` returns `undefined`",
      "Don't use `map` if you don't need the returned array",
      "Neither modifies the original array (though the callback might)",
    ],
    redFlags: [
      "Using `map` and not using the return value",
      "Expecting `forEach` to return a value",
      "Thinking they mutate the original array",
    ],
  },
  {
    id: "js-junior-dom-selection-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["dom", "web-apis"],
    question: "Difference between `getElementById` and `querySelector`?",
    shortAnswer:
      "`getElementById` only finds an element by ID; `querySelector` is more flexible, accepting any CSS selector.",
    keyPoints: [
      "`getElementById` is generally slightly faster",
      "`querySelector` returns the first match only",
      "`querySelectorAll` returns all matches as a static NodeList",
      "`querySelector` is more modern and versatile",
    ],
    redFlags: [
      "Forgetting the `#` for IDs in `querySelector`",
      "Thinking `querySelector` returns a live collection (like `getElementsByClassName`)",
      "Using `querySelectorAll` when only one element is needed",
    ],
  },
  {
    id: "js-junior-event-delegation-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["dom", "events"],
    question: "What is event delegation and why is it useful?",
    shortAnswer:
      "Event delegation is a pattern where you attach a single listener to a parent element to handle events on its current or future children, using event bubbling.",
    keyPoints: [
      "Reduces number of event listeners (saves memory)",
      "Handles dynamically added children automatically",
      "Uses `event.target` to identify which child was clicked",
      "Improves performance in large lists/grids",
    ],
    redFlags: [
      "Attaching listeners to every single item in a huge list",
      "Not checking the target correctly inside the parent listener",
      "Not understanding how bubbling works",
    ],
  },
  {
    id: "js-junior-typeof-quirks-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["types", "operators"],
    question: "What does `typeof` return for `null`, arrays, and functions?",
    shortAnswer:
      "`typeof null` is `'object'` (a legacy bug); arrays are `'object'`; functions are `'function'`.",
    keyPoints: [
      "To check for an array, use `Array.isArray(arr)`",
      "`typeof undefined` is `'undefined'`",
      "`typeof NaN` is `'number'`",
      "Know the primitives: string, number, boolean, object, function, symbol, bigint, undefined",
    ],
    redFlags: [
      "Thinking `typeof null === 'null'`",
      "Thinking `typeof [] === 'array'`",
      "Using `typeof` to distinguish between object types (except functions)",
    ],
  },
  {
    id: "js-junior-promises-basics-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["async", "promises"],
    question: "What are the three states of a Promise?",
    shortAnswer:
      "Pending (initial state), Fulfilled (operation completed successfully), and Rejected (operation failed).",
    keyPoints: [
      "A promise starts as Pending",
      "Once Fulfilled or Rejected, it is 'settled' and cannot change state",
      "`.then()` handles fulfillment; `.catch()` handles rejection",
      "`.finally()` runs regardless of the outcome",
    ],
    redFlags: [
      "Thinking a promise can go back to pending after settling",
      "Not handling rejections (unhandled promise rejections)",
      "Forgetting that `.then` returns a new promise",
    ],
  },
  {
    id: "js-junior-object-methods-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["objects"],
    question:
      "What do `Object.keys()`, `Object.values()`, and `Object.entries()` do?",
    shortAnswer:
      "They return arrays containing an object's keys, values, or key-value pairs (as `[key, value]` arrays), respectively.",
    keyPoints: [
      "Only includes the object's own enumerable properties",
      "Useful for iterating over objects with array methods (`map`, `forEach`)",
      "Commonly used to transform objects or extract data",
      "Order matches the order of a `for...in` loop",
    ],
    redFlags: [
      "Thinking they include inherited properties (from prototype)",
      "Not knowing the format of `Object.entries` (array of arrays)",
      "Trying to use them on non-objects",
    ],
  },
  {
    id: "js-junior-short-circuit-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["operators", "logic"],
    question: "How does short-circuit evaluation work with `&&` and `||`?",
    shortAnswer:
      "`&&` returns the first falsy value or the last value; `||` returns the first truthy value or the last value.",
    keyPoints: [
      "`||` is often used for default values: `const x = val || 'default'`",
      "`&&` is often used for conditional execution: `isLoggedIn && showDashboard()`",
      "Execution stops as soon as the result is determined",
      "Be careful with `||` and falsy values like `0` or `''` (consider `??` instead)",
    ],
    redFlags: [
      "Using `||` when `0` is a valid input (should use `??`)",
      "Not understanding that the right side might not execute",
      "Over-complicating simple if-statements with operators",
    ],
  },
  {
    id: "js-junior-class-basics-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["oop", "classes", "syntax"],
    question: "What is the basic syntax of a Class in JavaScript?",
    shortAnswer:
      "Classes use the `class` keyword with a `constructor` method and can have instance methods, static methods, and inheritance via `extends` and `super()`.",
    keyPoints: [
      "Classes are 'special functions' and syntactic sugar over prototypes",
      "The `constructor` runs when `new ClassName()` is called",
      "Methods are defined without the `function` keyword",
      "Static methods are called on the class itself, not instances",
    ],
    redFlags: [
      "Forgetting the `new` keyword when instantiating",
      "Forgetting `super()` in a child class constructor",
      "Thinking classes are hoisted (they are not, unlike regular functions)",
    ],
  },
  {
    id: "js-junior-assign-vs-spread-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["objects", "syntax"],
    question:
      "What is the difference between `Object.assign()` and the object spread operator (`{...obj}`)?",
    shortAnswer:
      "Both perform shallow copies; `Object.assign` triggers setters on the target object and mutates it, while spread is a syntax that creates a new object and doesn't trigger setters in the same way.",
    keyPoints: [
      "`Object.assign(target, ...sources)` mutates the target",
      "`{...sources}` always creates a new object",
      "Spread is generally more concise and preferred in modern JS",
      "Both only copy enumerable own properties",
    ],
    redFlags: [
      "Thinking either one performs a deep copy",
      "Not knowing that `Object.assign` mutates the first argument",
      "Confusing them with `JSON.parse(JSON.stringify())`",
    ],
  },
  {
    id: "js-junior-includes-indexof-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["arrays", "strings"],
    question: "When should you use `includes()` vs `indexOf()`?",
    shortAnswer:
      "`includes()` returns a boolean (true/false); `indexOf()` returns the position (index) or -1 if not found. Use `includes()` for simple existence checks.",
    keyPoints: [
      "`includes()` is more readable for boolean logic",
      "`indexOf()` is necessary if you need the actual position",
      "`includes()` handles `NaN` correctly, while `indexOf()` does not",
      "Both work on both arrays and strings",
    ],
    redFlags: [
      "Using `indexOf() !== -1` when a simple `includes()` would suffice",
      "Thinking `indexOf` returns true/false",
      "Not knowing about the `NaN` behavior difference",
    ],
  },
  {
    id: "js-junior-random-int-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["math"],
    question:
      "How do you generate a random integer between two values, min and max?",
    shortAnswer: "Use `Math.floor(Math.random() * (max - min + 1)) + min`.",
    keyPoints: [
      "`Math.random()` returns a float between 0 (inclusive) and 1 (exclusive)",
      "`Math.floor()` rounds down to the nearest integer",
      "Adding `+ 1` to the range makes it inclusive of the `max` value",
      "Adding `min` at the end shifts the range to start at the desired minimum",
    ],
    redFlags: [
      "Forgetting to use `Math.floor()` (returning a float)",
      "Not accounting for the inclusive/exclusive nature of `Math.random()`",
      "Using `Math.round()` which can lead to uneven distribution at the edges",
    ],
  },
  {
    id: "js-junior-rest-vs-arguments-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["functions", "syntax"],
    question:
      "What is the difference between the `arguments` object and rest parameters (`...args`)?",
    shortAnswer:
      "`arguments` is an array-like object available in all non-arrow functions; rest parameters are real arrays and are the modern way to handle variable arguments.",
    keyPoints: [
      "`arguments` doesn't have array methods like `map` or `forEach` (unless converted)",
      "Rest parameters work in arrow functions; `arguments` does not",
      "Rest parameters only include the 'rest' of the arguments, not all of them",
      "Rest parameters are more explicit and readable",
    ],
    redFlags: [
      "Trying to use `arguments` in an arrow function",
      "Calling array methods directly on `arguments` without converting it",
      "Not knowing that rest parameters are actual Arrays",
    ],
  },
  {
    id: "js-junior-string-search-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["strings"],
    question:
      "What do `startsWith()`, `endsWith()`, and `includes()` do for strings?",
    shortAnswer:
      "They are modern methods to check if a string begins with, ends with, or contains another string, returning a boolean.",
    keyPoints: [
      "Case-sensitive checks",
      "More readable than `regex` or `indexOf` for simple checks",
      "Can take an optional second argument for the start/end position",
      "Part of ES6+",
    ],
    redFlags: [
      "Thinking they are case-insensitive by default",
      "Using `regex` for a simple 'starts with' check",
      "Not knowing about the second parameter for index offsets",
    ],
  },
  {
    id: "js-junior-some-every-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["arrays"],
    question:
      "What is the difference between `Array.some()` and `Array.every()`?",
    shortAnswer:
      "`some()` returns true if at least one element passes the test; `every()` returns true only if all elements pass the test.",
    keyPoints: [
      "Both return a boolean",
      "Both 'short-circuit': `some()` stops at the first true, `every()` stops at the first false",
      "Empty arrays: `every()` returns true, `some()` returns false",
      "Clean way to perform validations on collections",
    ],
    redFlags: [
      "Confusing which one requires all vs at least one",
      "Using a loop when these methods are more expressive",
      "Not knowing about the behavior with empty arrays",
    ],
  },
  {
    id: "js-junior-date-basics-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["date"],
    question: "How do you get the current timestamp in milliseconds?",
    shortAnswer: "Use `Date.now()` or `new Date().getTime()`.",
    keyPoints: [
      "`Date.now()` is the modern, static way",
      "The value represents milliseconds since Jan 1, 1970 (Unix Epoch)",
      "`new Date()` creates a date object for the current moment",
      "Month indices are 0-based in JS (January is 0)",
    ],
    redFlags: [
      "Forgetting that months start at 0 (can cause off-by-one errors)",
      "Confusing milliseconds with seconds",
      "Thinking `new Date()` returns a string by default",
    ],
  },
  {
    id: "js-junior-freeze-seal-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["objects"],
    question:
      "What is the difference between `Object.freeze()` and `Object.seal()`?",
    shortAnswer:
      "`Object.freeze()` makes an object immutable (no changes at all); `Object.seal()` prevents adding/removing properties but allows changing existing ones.",
    keyPoints: [
      "`freeze()` is the most restrictive",
      "`seal()` allows updating values of existing properties",
      "Both are shallow (nested objects can still be changed)",
      "Use `'use strict'` to throw errors when trying to mutate",
    ],
    redFlags: [
      "Thinking they are deep (they are shallow)",
      "Thinking `const` is the same as `freeze()`",
      "Not knowing that `seal()` still allows property updates",
    ],
  },
  {
    id: "js-junior-iife-basic-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["functions", "scope"],
    question:
      "What is an IIFE (Immediately Invoked Function Expression) and why was it common?",
    shortAnswer:
      "An IIFE is a function that runs as soon as it's defined. It was primarily used to create private scopes and avoid polluting the global namespace before ES modules existed.",
    keyPoints: [
      "Syntax: `(function() { ... })();`",
      "Creates a temporary closure",
      "Less common now due to ES Modules and block scoping (`let`/`const`)",
      "Still useful for top-level await in some environments or quick isolation",
    ],
    redFlags: [
      "Not understanding the syntax (the extra parentheses)",
      "Thinking it's the only way to get private variables today",
      "Confusing it with a regular function declaration",
    ],
  },
  {
    id: "js-junior-nullish-coalescing-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["operators", "logic"],
    question:
      "What is the nullish coalescing operator (`??`) and how is it different from `||`?",
    shortAnswer:
      "`??` only returns the right-hand side if the left-hand side is `null` or `undefined`; `||` returns it for any falsy value (like `0`, `''`, or `false`).",
    keyPoints: [
      "`??` is safer for default values when `0` or `false` are valid",
      "Helps avoid bugs where `0` is accidentally replaced by a default",
      "Part of ES2020",
      "Often used with optional chaining (`?.`)",
    ],
    redFlags: [
      "Using `||` and accidentally overriding `0` or `false` values",
      "Thinking `??` and `||` are always interchangeable",
      "Not knowing which 'nullish' values it checks for",
    ],
  },
  {
    id: "js-junior-optional-chaining-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["syntax", "objects"],
    question: "What is optional chaining (`?.`) and why is it useful?",
    shortAnswer:
      "Optional chaining allows you to read the value of a property located deep within a chain of connected objects without having to check if each reference in the chain is valid.",
    keyPoints: [
      "Stops evaluation and returns `undefined` if a reference is nullish",
      "Cleaner than nested `if (obj && obj.prop)` checks",
      "Works with function calls: `obj.method?.()`",
      "Avoids 'Cannot read property of undefined' errors",
    ],
    redFlags: [
      "Using it everywhere instead of fixing underlying data issues",
      "Thinking it's the same as a deep clone",
      "Not knowing it was introduced in ES2020",
    ],
  },
  {
    id: "js-junior-array-flat-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["arrays"],
    question: "What does `Array.flat()` do?",
    shortAnswer:
      "It creates a new array with all sub-array elements concatenated into it recursively up to a specified depth.",
    keyPoints: [
      "Default depth is 1",
      "Use `Infinity` to flatten all levels",
      "Removes empty slots in arrays",
      "Handy for simplifying nested data structures",
    ],
    redFlags: [
      "Thinking it mutates the original array",
      "Not knowing about the depth parameter",
      "Using complex loops to flatten simple structures",
    ],
  },
  {
    id: "js-junior-is-nan-1",
    language: "JavaScript",
    difficulty: "Junior",
    tags: ["math", "types"],
    question: "What is the difference between `isNaN()` and `Number.isNaN()`?",
    shortAnswer:
      "`isNaN()` coerces its argument to a number before checking; `Number.isNaN()` only returns true if the argument is actually `NaN` and of type number.",
    keyPoints: [
      "`isNaN('hello')` is true (coerces to `NaN`)",
      "`Number.isNaN('hello')` is false (it's a string, not `NaN`)",
      "`Number.isNaN()` is more reliable for checking for the actual `NaN` value",
      "`NaN` is the only value in JS that is not equal to itself (`NaN === NaN` is false)",
    ],
    redFlags: [
      "Using global `isNaN()` for strict type checking",
      "Not knowing about the coercion behavior of global `isNaN()`",
      "Thinking `NaN` is a string",
    ],
  },
];
