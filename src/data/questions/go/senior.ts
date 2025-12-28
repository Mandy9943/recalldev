import { Question } from "@/types";

export const GO_QUESTIONS_SENIOR: Question[] = [
  {
      id: "go-goroutines-vs-threads-1",
      language: "Go",
      difficulty: "Senior",
      tags: ["go", "concurrency", "runtime"],
      question: "How are Goroutines different from OS threads?",
      shortAnswer: "Goroutines are managed by the Go runtime (M:N scheduler), have small initial stacks (2KB), and are extremely lightweight.",
      keyPoints: [
        "OS threads have fixed, large stacks (often 1-2MB)",
        "Context switching between goroutines is much faster than OS thread switching",
        "The Go scheduler multiplexes goroutines onto a smaller number of OS threads",
        "Stacks can grow and shrink dynamically"
      ],
      redFlags: [
        "Thinking goroutines ARE OS threads",
        "Not understanding the role of the Go scheduler (P, M, G model)",
        "Assuming parallelism is always better than concurrency"
      ]
    },
];
