import { Question, Category } from '@/types';

export const CATEGORIES: Category[] = [
  'Core JavaScript',
  'Async & Event Loop',
  'Closures & Scope',
  'Performance',
  'Architecture',
  'Edge Cases',
  'Technical Behavioral'
];

export const questions: Question[] = [
  // --- Core JavaScript ---
  {
    id: '1',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Core JavaScript',
    question: 'Explain the difference between "prototypal inheritance" and "classical inheritance".',
    shortAnswer: 'Classical inheritance uses classes as blueprints to create objects. Prototypal inheritance uses objects as prototypes to create other objects. In JS, objects delegate lookup to their prototype chain.',
    keyPoints: [
      'JS classes are syntactic sugar over prototypal inheritance.',
      'Prototypal inheritance is dynamic; you can modify prototypes at runtime.',
      'Memory efficiency: methods are shared via the prototype, not copied.',
      'The "delegate" nature of the prototype chain.'
    ],
    redFlags: [
      'Thinking JS classes work exactly like Java/C++ classes.',
      'Confusing "prototype" property with "__proto__".',
      'Not mentioning the prototype chain lookup mechanism.'
    ]
  },
  {
    id: 'core-2',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Core JavaScript',
    question: 'How does Event Delegation work and why is it useful?',
    shortAnswer: 'Event Delegation involves attaching a single event listener to a parent element to manage events for its descendants, leveraging the "bubbling" phase of event propagation.',
    keyPoints: [
      'Reduces memory usage (fewer event listeners).',
      'Handles dynamic content (elements added later automatically have the behavior).',
      'Uses `event.target` to identify the actual clicked element.',
      'Events like `focus` and `blur` do not bubble (but `focusin`/`focusout` do).'
    ],
    redFlags: [
      'Confusing Capturing vs Bubbling phases.',
      'Thinking you must attach listeners to every child element.',
      'Not knowing how to identify the source element (`target` vs `currentTarget`).'
    ]
  },
  {
    id: 'core-3',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Core JavaScript',
    question: 'What are the use cases for `WeakMap` and `WeakSet`?',
    shortAnswer: 'They hold "weak" references to objects, meaning if the object is not referenced elsewhere, it can be garbage collected. Keys in WeakMap must be objects.',
    keyPoints: [
      'Prevents memory leaks when associating data with DOM nodes or other objects.',
      'Good for caching/memoization where cache entries should die with the object.',
      'Not iterable (keys cannot be enumerated).',
      'Example: Storing private data for a class instance externally.'
    ],
    redFlags: [
      'Thinking they are just "weaker" versions of Map without GC benefits.',
      'Trying to use primitive values as keys in WeakMap.',
      'Expecting to iterate over them.'
    ]
  },

  // --- Async & Event Loop ---
  {
    id: '2',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Async & Event Loop',
    question: 'What is the difference between Microtasks and Macrotasks in the Event Loop?',
    shortAnswer: 'Microtasks (Promises, queueMicrotask) have higher priority and run immediately after the current stack empties, before rendering. Macrotasks (setTimeout, I/O) run in the next loop iteration.',
    keyPoints: [
      'Microtask queue must drain completely before the next Macrotask runs.',
      'Microtasks can block rendering (starve the event loop) if infinite.',
      'Common Microtasks: Promise.then, MutationObserver.',
      'Common Macrotasks: setTimeout, setInterval, setImmediate, I/O.'
    ],
    redFlags: [
      'Thinking setTimeout(..., 0) runs immediately.',
      'Not knowing that Promises go to the Microtask queue.',
      'Believing they run in parallel (JS is single-threaded).'
    ]
  },
  {
    id: 'async-2',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Async & Event Loop',
    question: 'Explain the output order: console.log, setTimeout, Promise.resolve().then, process.nextTick (Node) / queueMicrotask.',
    shortAnswer: 'Synchronous code runs first. Then process.nextTick (Node). Then Microtasks (Promises). Then Macrotasks (setTimeout).',
    keyPoints: [
      'Sync stack always clears first.',
      'Microtasks drain before rendering/IO.',
      'Timer delays are minimum times, not exact.',
      'Starvation risk with excessive microtasks.'
    ],
    redFlags: [
      'Random guessing.',
      'Thinking setTimeout runs before Promises.',
      'Not distinguishing between queueMicrotask/Promises and setTimeout.'
    ]
  },

  // --- Closures & Scope ---
  {
    id: '3',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Closures & Scope',
    question: 'How does a closure actually work in memory? What happens to the scope chain?',
    shortAnswer: 'A closure is a function bundled with its lexical environment. When a function returns, if a closure exists, the outer function\'s variable object is preserved in the heap and linked to the inner function\'s [[Environment]].',
    keyPoints: [
      'Scopes are not garbage collected if a closure refers to them.',
      'Can lead to memory leaks if not managed (e.g., event listeners).',
      'Enables data privacy (module pattern) and currying.'
    ],
    redFlags: [
      'Just saying "function inside a function" without explaining memory/scope retention.',
      'Thinking variables are copied (they are referenced).',
      'Confusing closure with `this` binding.'
    ]
  },
  {
    id: 'scope-2',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Closures & Scope',
    question: 'What is the "Temporal Dead Zone" (TDZ) and why does it exist?',
    shortAnswer: 'TDZ is the period between the start of a block scope and the actual declaration of a `let` or `const` variable. Accessing the variable in TDZ throws a ReferenceError.',
    keyPoints: [
      '`var` is hoisted and initialized to undefined; `let`/`const` are hoisted but uninitialized.',
      'Helps catch bugs by preventing use before declaration.',
      'Exists strictly within the block scope.',
      'Even `typeof` is not safe in TDZ.'
    ],
    redFlags: [
      'Saying let/const are not hoisted (they are, just not initialized).',
      'Thinking it applies to `var`.'
    ]
  },

  // --- Performance ---
  {
    id: '4',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Performance',
    question: 'How would you optimize a long list of 10,000 items rendering in React?',
    shortAnswer: 'Use "Virtualization" (Windowing) to only render items currently in the viewport. Also ensure proper key usage and memoization of list items.',
    keyPoints: [
      'Virtual DOM overhead is high for large node counts.',
      'Libraries like react-window or react-virtualized.',
      'DOM recycling/pooling concepts.',
      'Pagination/Infinite scroll as alternative UX patterns.'
    ],
    redFlags: [
      'Suggesting just "pagination" without understanding the rendering bottleneck.',
      'Suggesting `React.memo` as the primary solution (it helps updates, not initial mount of 10k nodes).',
      'Not considering the memory footprint of DOM nodes.'
    ]
  },
  {
    id: 'perf-2',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Performance',
    question: 'Explain the "Critical Rendering Path" and how to optimize it.',
    shortAnswer: 'The sequence of steps the browser takes to render a page: DOM -> CSSOM -> Render Tree -> Layout -> Paint. Optimization involves minimizing blocking resources (CSS/JS).',
    keyPoints: [
      'Defer non-critical JS (`defer`/`async`).',
      'Inline critical CSS or use HTTP/2 Server Push.',
      'Reduce Layout Thrashing (reading/writing DOM properties in loops).',
      'Use `requestAnimationFrame` for visual updates.'
    ],
    redFlags: [
      'Not knowing the difference between Layout (Reflow) and Paint.',
      'Ignoring the cost of parsing huge JS bundles.',
      'Focusing only on network speed, ignoring parse/render time.'
    ]
  },

  // --- Architecture ---
  {
    id: 'arch-1',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Architecture',
    question: 'Compare "Composition" vs "Inheritance". Why is Composition favored in React/modern JS?',
    shortAnswer: 'Inheritance creates a rigid taxonomy ("is-a" relationship) which is brittle to change. Composition ("has-a" or "uses-a") builds complex behavior by combining simple, independent parts.',
    keyPoints: [
      'Inheritance issues: Fragile Base Class problem, deep hierarchies.',
      'Composition flexibility: mixins, HOCs, Hooks, Props.',
      'React explicitly discourages inheritance for components.',
      'Easier testing of isolated components.'
    ],
    redFlags: [
      'Thinking inheritance is "bad" universally (it has uses, just often overused).',
      'Unable to give an example of composition (e.g., passing children, hooks).'
    ]
  },
  {
    id: 'arch-2',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Architecture',
    question: 'What are the pros and cons of Micro-frontends?',
    shortAnswer: 'Pros: Independent deployment, team autonomy, technology agnostic. Cons: Complexity in orchestration, shared dependencies issues, performance overhead, inconsistent UI/UX.',
    keyPoints: [
      'Good for scaling large organizations, not necessarily codebases.',
      'Integration methods: iFrames, Web Components, Module Federation.',
      'CSS scoping challenges.',
      'Duplication of common libraries (React, Lodash) affecting load time.'
    ],
    redFlags: [
      'Suggesting it for a small team or startup (over-engineering).',
      'Ignoring the performance cost of multiple frameworks loaded.'
    ]
  },

  // --- Edge Cases ---
  {
    id: '5',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Edge Cases',
    question: 'What happens if you try to JSON.stringify a structure with circular references?',
    shortAnswer: 'It throws a TypeError: Converting circular structure to JSON.',
    keyPoints: [
      'JSON.stringify cannot handle cyclic graphs.',
      'Solution: Use a custom replacer function or libraries like flatted.',
      'WeakMap is often used in custom serializers to track visited objects.'
    ],
    redFlags: [
      'Thinking it just omits the circular part.',
      'Thinking it returns null or undefined.',
      'Not knowing how to fix it (replacer function).'
    ]
  },
  {
    id: 'edge-2',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Edge Cases',
    question: 'Why does `0.1 + 0.2 === 0.3` return false?',
    shortAnswer: 'Because JS uses IEEE 754 double-precision floating point numbers. 0.1 and 0.2 cannot be represented exactly in binary, leading to a small rounding error.',
    keyPoints: [
      'Result is 0.30000000000000004.',
      'Solution: `Number.EPSILON` for comparison or library like `decimal.js`.',
      'Common issue in financial calculations (use integers/cents instead).'
    ],
    redFlags: [
      'Thinking it is a JS-specific bug (it\'s a standard floating point issue).',
      'Suggesting `toFixed(1)` without understanding it returns a string.'
    ]
  },

  // --- Technical Behavioral ---
  {
    id: 'beh-1',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Technical Behavioral',
    question: 'Describe a time you had to make a significant technical tradeoff. How did you decide?',
    shortAnswer: 'Look for a structured answer: Situation, Options considered, Decision Criteria (Time vs Quality vs Cost), The Choice, and The Outcome/Retrospective.',
    keyPoints: [
      'Acknowledging that there is rarely a "perfect" solution.',
      'Considering business impact, not just code purity.',
      'Communication with stakeholders about the debt/risk.',
      'Did they plan for mitigation later?'
    ],
    redFlags: [
      'Claiming they never make tradeoffs (unrealistic).',
      'Blaming others for the constraints.',
      'Focusing only on the tech, ignoring the business context.'
    ]
  },
  {
    id: 'beh-2',
    role: 'JavaScript Developer',
    seniority: 'Senior',
    category: 'Technical Behavioral',
    question: 'How do you approach a Code Review where you strongly disagree with the approach?',
    shortAnswer: 'Focus on the code, not the person. Ask questions rather than making demands. Propose alternatives with reasoning (perf, maintainability).',
    keyPoints: [
      'Empathy and constructive tone.',
      'Distinguishing between "style/preference" and "objective flaw".',
      'Willingness to hop on a call if text debate gets long.',
      'Accepting the team consensus even if you disagree (Disagree and Commit).'
    ],
    redFlags: [
      'Being aggressive or gatekeeping.',
      'Nitpicking without value.',
      ' refusing to approve until it\'s done "my way" without valid reason.'
    ]
  }
];
