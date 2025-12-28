import { Question } from "@/types";

export const PY_QUESTIONS: Question[] = [
  {
    id: "py-context-managers-1",
    language: "Python",
    difficulty: "Mid",
    tags: ["python", "context-managers", "with-statement"],
    question: "How do context managers work and how do you implement one?",
    shortAnswer: "They manage resources via `__enter__` and `__exit__` methods, ensuring cleanup even if errors occur.",
    keyPoints: [
      "Used with the `with` statement",
      "`__enter__` sets up the resource and optionally returns it",
      "`__exit__` handles cleanup and exception suppression",
      "Can also be implemented using the `@contextlib.contextmanager` decorator"
    ],
    redFlags: [
      "Not understanding that `__exit__` is called even during exceptions",
      "Thinking context managers are only for file handling",
      "Inability to explain the arguments of `__exit__` (type, value, traceback)"
    ]
  },
  {
    id: "py-list-comprehension-vs-gen-1",
    language: "Python",
    difficulty: "Junior",
    tags: ["python", "performance", "memory"],
    question: "What is the difference between a list comprehension and a generator expression?",
    shortAnswer: "List comprehensions create the entire list in memory; generators yield items one by one (lazy evaluation).",
    keyPoints: [
      "List comprehension: `[x for x in data]` (brackets)",
      "Generator expression: `(x for x in data)` (parentheses)",
      "Generators are more memory-efficient for large datasets",
      "Lists allow indexing and multiple iterations; generators are exhausted after one use"
    ],
    redFlags: [
      "Choosing list comprehensions for massive datasets without considering memory",
      "Not knowing that generators are 'one-time use'",
      "Confusing the syntax (brackets vs parentheses)"
    ]
  },
  {
    id: "py-args-kwargs-1",
    language: "Python",
    difficulty: "Junior",
    tags: ["python", "syntax", "functions"],
    question: "Explain the use of `*args` and `**kwargs` in function definitions.",
    shortAnswer: "`*args` collects extra positional arguments into a tuple; `**kwargs` collects extra keyword arguments into a dictionary.",
    keyPoints: [
      "Allows functions to accept a variable number of arguments",
      "`*args` must come before `**kwargs`",
      "The names `args` and `kwargs` are conventions, the symbols `*` and `**` are the actual logic",
      "Useful for decorators and wrapper functions"
    ],
    redFlags: [
      "Not knowing the resulting data types (tuple and dict)",
      "Incorrect ordering in function signatures",
      "Misunderstanding how to unpack them when calling another function"
    ]
  },
  {
    id: "py-metaclasses-1",
    language: "Python",
    difficulty: "Staff",
    tags: ["python", "metaprogramming", "internals"],
    question: "What is a metaclass and when would you use one?",
    shortAnswer: "A metaclass is a class of a class; it defines how a class behaves and is constructed.",
    keyPoints: [
      "In Python, everything is an object, including classes",
      "Classes are instances of `type` by default",
      "Metaclasses allow for class validation, automatic property addition, or registration at definition time",
      "Commonly used in frameworks like Django (Models) or SQLAlchemy"
    ],
    redFlags: [
      "Confusing metaclasses with class decorators",
      "Using a metaclass when simpler inheritance or decorators would suffice",
      "Not understanding `__new__` vs `__init__` in a metaclass"
    ]
  },
  {
    id: "py-asyncio-event-loop-1",
    language: "Python",
    difficulty: "Senior",
    tags: ["python", "asyncio", "concurrency"],
    question: "How does `asyncio` differ from multithreading in Python?",
    shortAnswer: "`asyncio` uses cooperative multitasking on a single thread; multithreading uses preemptive multitasking (limited by the GIL).",
    keyPoints: [
      "Asyncio is ideal for I/O-bound tasks with many concurrent connections",
      "Relies on `await` to yield control back to the event loop",
      "Single-threaded execution avoids race conditions related to shared memory (mostly)",
      "Blocking code in an `async` function stops the entire event loop"
    ],
    redFlags: [
      "Thinking `asyncio` runs tasks in parallel on multiple CPU cores",
      "Running a CPU-intensive task inside an `async def` without `run_in_executor`",
      "Not understanding that the event loop is single-threaded"
    ]
  }
];

