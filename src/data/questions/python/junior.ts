import { Question } from "@/types";

export const PY_QUESTIONS_JUNIOR: Question[] = [
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
      id: "py-junior-mutable-default-args-1",
      language: "Python",
      difficulty: "Junior",
      tags: ["python", "functions", "gotchas"],
      question: "Why are mutable default arguments in Python a common pitfall?",
      shortAnswer: "Because default arguments are evaluated once at function definition time, so a mutable default (like a list) is shared across calls.",
      keyPoints: [
        "Defaults are created when the function is defined, not when called",
        "Mutating the default mutates the shared object",
        "Typical fix: use `None` and initialize inside",
        "Often shows up with `[]`, `{}`, or set defaults"
      ],
      redFlags: [
        "Thinking defaults are re-created on each call",
        "Not knowing the `None` pattern",
        "Blaming it on 'Python memory leaks' instead of evaluation timing"
      ]
    },
  {
      id: "py-junior-dict-get-vs-index-1",
      language: "Python",
      difficulty: "Junior",
      tags: ["python", "dict"],
      question: "What is the difference between `d[key]` and `d.get(key)`?",
      shortAnswer: "`d[key]` raises `KeyError` if missing; `d.get(key)` returns `None` (or a provided default) when the key is missing.",
      keyPoints: [
        "`get` supports a fallback: `d.get('k', default)`",
        "Use `[]` when absence is a bug and should fail fast",
        "Use `get` when missing is expected",
        "Also consider `in` for existence checks"
      ],
      redFlags: [
        "Saying they behave the same",
        "Catching `Exception` broadly instead of handling `KeyError`",
        "Not knowing `get` can take a default"
      ]
    },
  {
      id: "py-junior-venv-why-1",
      language: "Python",
      difficulty: "Junior",
      tags: ["python", "tooling", "packaging"],
      question: "What is a virtual environment (`venv`) and why do we use it?",
      shortAnswer: "It isolates project dependencies so different projects can use different package versions without conflicts.",
      keyPoints: [
        "Keeps dependencies out of the global Python install",
        "Improves reproducibility across machines",
        "Works with `pip` and `requirements.txt`/lockfiles",
        "Common commands: `python -m venv .venv`, activate, `pip install ...`"
      ],
      redFlags: [
        "Installing everything globally with `sudo pip`",
        "Not understanding dependency conflicts",
        "Assuming venv is only for deployment"
      ]
    },
  {
      id: "py-junior-exceptions-try-except-else-finally-1",
      language: "Python",
      difficulty: "Junior",
      tags: ["python", "errors"],
      question: "How do `try/except/else/finally` blocks work in Python?",
      shortAnswer: "`except` runs on errors, `else` runs only if no exception happened, and `finally` runs no matter what (for cleanup).",
      keyPoints: [
        "Catch specific exceptions (avoid bare `except`)",
        "`else` is for the success path after a try",
        "`finally` is for cleanup (closing files, releasing locks)",
        "Exceptions can be re-raised after logging"
      ],
      redFlags: [
        "Using `except:` for everything",
        "Putting success logic inside `try` unnecessarily",
        "Not using `finally` or context managers for cleanup"
      ]
    },
  {
      id: "py-junior-context-manager-with-1",
      language: "Python",
      difficulty: "Junior",
      tags: ["python", "files", "resource-management"],
      question: "Why is `with open(...) as f:` preferred over manually opening/closing a file?",
      shortAnswer: "Because the context manager guarantees the file is closed even if an exception occurs, making code safer and cleaner.",
      keyPoints: [
        "`with` uses the context manager protocol",
        "Ensures cleanup on success or failure",
        "Reduces boilerplate (`try/finally`)",
        "Context managers apply beyond files (locks, DB connections)"
      ],
      redFlags: [
        "Forgetting to close files",
        "Thinking `with` is only syntactic sugar without benefits",
        "Not understanding cleanup on exceptions"
      ]
    },
];
