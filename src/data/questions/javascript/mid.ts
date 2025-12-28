import { Question } from "@/types";

export const JS_QUESTIONS_MID: Question[] = [
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
];
