import { Question } from "@/types";

export const GO_QUESTIONS: Question[] = [
  {
    id: "go-channels-unbuffered-1",
    language: "Go",
    difficulty: "Mid",
    tags: ["go", "concurrency", "channels"],
    question: "What is the difference between buffered and unbuffered channels in Go?",
    shortAnswer: "Unbuffered channels block until both sender and receiver are ready; buffered channels only block when the buffer is full (send) or empty (receive).",
    keyPoints: [
      "Unbuffered channels ensure synchronization (handshake)",
      "Buffered channels allow for some decoupling of execution",
      "Deadlocks are common if unbuffered channels are used incorrectly",
      "Capacity of a buffered channel is defined at creation: `make(chan int, 10)`"
    ],
    redFlags: [
      "Assuming buffered channels are always faster",
      "Not knowing that sending to a full buffered channel blocks",
      "Misunderstanding the synchronization guarantees of unbuffered channels"
    ]
  },
  {
    id: "go-interfaces-implicit-1",
    language: "Go",
    difficulty: "Junior",
    tags: ["go", "interfaces", "oop"],
    question: "What does it mean that Go interfaces are implemented implicitly?",
    shortAnswer: "A type satisfies an interface by implementing its methods; there is no `implements` keyword.",
    keyPoints: [
      "Encourages decoupling between packages",
      "Allows satisfying interfaces from 3rd party libraries",
      "Structural typing approach",
      "The empty interface `interface{}` (or `any`) is satisfied by all types"
    ],
    redFlags: [
      "Looking for an `implements` keyword",
      "Thinking you must import the interface definition to satisfy it",
      "Not understanding how implicit implementation helps with testing/mocking"
    ]
  },
  {
    id: "go-defer-1",
    language: "Go",
    difficulty: "Junior",
    tags: ["go", "control-flow"],
    question: "How does the `defer` keyword work and when is it executed?",
    shortAnswer: "`defer` schedules a function call to run immediately before the surrounding function returns.",
    keyPoints: [
      "Deferred calls are pushed onto a stack (LIFO order)",
      "Arguments are evaluated immediately when `defer` is called",
      "Commonly used for closing files or unlocking mutexes",
      "Runs even if the function panics"
    ],
    redFlags: [
      "Thinking `defer` runs at the end of the current block (like an if statement) instead of the function",
      "Not knowing the LIFO execution order",
      "Assuming arguments are evaluated at the time of execution rather than when deferred"
    ]
  },
  {
    id: "go-slices-vs-arrays-1",
    language: "Go",
    difficulty: "Mid",
    tags: ["go", "data-structures", "slices"],
    question: "Compare Go arrays and slices.",
    shortAnswer: "Arrays have a fixed size; slices are dynamic 'views' into an underlying array.",
    keyPoints: [
      "Arrays are value types (copying an array copies all elements)",
      "Slices are reference-like types containing a pointer, length, and capacity",
      "Slices are created using `make` or by slicing an array/slice",
      "`append` on a slice may trigger an allocation of a new underlying array"
    ],
    redFlags: [
      "Thinking slices and arrays are the same thing",
      "Not understanding that passing a slice to a function can modify the underlying data",
      "Ignoring the cost of `append` when capacity is reached"
    ]
  },
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
  }
];

