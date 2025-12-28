import { Question } from "@/types";

export const PY_QUESTIONS_SENIOR: Question[] = [
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
    },
];
