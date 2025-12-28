import { Question } from "@/types";

export const GO_QUESTIONS_MID: Question[] = [
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
];
