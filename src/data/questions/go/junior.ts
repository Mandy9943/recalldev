import { Question } from "@/types";

export const GO_QUESTIONS_JUNIOR: Question[] = [
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
      id: "go-junior-slices-vs-arrays-1",
      language: "Go",
      difficulty: "Junior",
      tags: ["go", "slices", "arrays"],
      question: "What is the difference between arrays and slices in Go?",
      shortAnswer: "Arrays have a fixed length and are values; slices are dynamic views over an underlying array and are the idiomatic choice for collections.",
      keyPoints: [
        "Array length is part of its type: `[3]int` vs `[4]int`",
        "Slices are descriptors: pointer + length + capacity",
        "Appending can reallocate and move to a new backing array",
        "Slices are typically passed around instead of arrays"
      ],
      redFlags: [
        "Thinking slices are linked lists",
        "Not knowing about length vs capacity",
        "Assuming append always mutates the same backing array"
      ]
    },
  {
      id: "go-junior-maps-zero-value-1",
      language: "Go",
      difficulty: "Junior",
      tags: ["go", "maps"],
      question: "What happens when you read a missing key from a Go map? How do you check if it exists?",
      shortAnswer: "Reading a missing key returns the zero value for the map’s value type; use the “comma ok” idiom to check existence.",
      keyPoints: [
        "Example: `v, ok := m[key]`",
        "Zero value can be ambiguous (e.g. `0`, `''`, `false`)",
        "Use `delete(m, key)` to remove keys",
        "A nil map can be read from but not written to"
      ],
      redFlags: [
        "Assuming it panics on missing keys",
        "Not knowing the comma-ok idiom",
        "Trying to write to a nil map"
      ]
    },
  {
      id: "go-junior-pointer-basics-1",
      language: "Go",
      difficulty: "Junior",
      tags: ["go", "pointers"],
      question: "What is a pointer in Go and when would you use one?",
      shortAnswer: "A pointer holds the address of a value; you use pointers to share/mutate data, avoid copying large structs, or represent optional values (`nil`).",
      keyPoints: [
        "Use `&x` to get an address and `*p` to dereference",
        "Methods can have pointer receivers to mutate a struct",
        "`nil` is the zero value for pointers",
        "Go is pass-by-value; pointers let you share underlying data"
      ],
      redFlags: [
        "Thinking pointers are required for performance everywhere",
        "Confusing pointer vs reference semantics",
        "Not understanding `nil` checks"
      ]
    },
  {
      id: "go-junior-goroutine-basics-1",
      language: "Go",
      difficulty: "Junior",
      tags: ["go", "concurrency", "goroutines"],
      question: "What is a goroutine and how is it different from an OS thread?",
      shortAnswer: "A goroutine is a lightweight, managed concurrency unit scheduled by the Go runtime; it’s cheaper than an OS thread and multiplexed onto a thread pool.",
      keyPoints: [
        "Started with `go f()`",
        "Scheduled by the Go runtime (M:N scheduling)",
        "Need synchronization/communication (channels, mutexes)",
        "Too many goroutines can still cause memory/CPU pressure"
      ],
      redFlags: [
        "Assuming goroutines run in parallel in all cases",
        "Ignoring data races",
        "Thinking goroutines are 'free' with no cost"
      ]
    },
  {
      id: "go-junior-channels-why-1",
      language: "Go",
      difficulty: "Junior",
      tags: ["go", "concurrency", "channels"],
      question: "What problem do channels solve in Go? What’s the difference between buffered and unbuffered channels?",
      shortAnswer: "Channels coordinate goroutines and pass data safely; unbuffered channels synchronize handoff, buffered channels allow sends up to a capacity without an immediate receiver.",
      keyPoints: [
        "Unbuffered: send blocks until a receiver is ready",
        "Buffered: send blocks only when the buffer is full",
        "Closing a channel signals completion to receivers",
        "Prefer clear ownership: usually only the sender closes"
      ],
      redFlags: [
        "Closing a channel from the receiver side in shared scenarios",
        "Assuming buffered channels eliminate the need for synchronization",
        "Not knowing sends can block"
      ]
    },
];
