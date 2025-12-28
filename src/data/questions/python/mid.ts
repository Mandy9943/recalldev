import { Question } from "@/types";

export const PY_QUESTIONS_MID: Question[] = [
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
];
