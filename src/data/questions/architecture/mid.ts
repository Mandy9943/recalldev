import { Question } from "@/types";

export const ARCH_QUESTIONS_MID: Question[] = [
  {
      id: "arch-solid-principles-1",
      language: "General",
      difficulty: "Mid",
      tags: ["architecture", "solid", "oop"],
      question: "What does the 'L' in SOLID stand for, and what is its main idea?",
      shortAnswer: "Liskov Substitution Principle: Subtypes must be substitutable for their base types without altering correctness.",
      keyPoints: [
        "Derived classes should not change the expected behavior of parent methods",
        "Avoids 'unexpected' side effects when using polymorphism",
        "Classic violation: The Square-Rectangle problem",
        "Focuses on behavioral subtyping rather than just signature matching"
      ],
      redFlags: [
        "Only knowing the name but not the meaning",
        "Thinking it's just about inheritance",
        "Not being able to provide an example of a violation"
      ]
    },
  {
      id: "arch-microservices-vs-monolith-1",
      language: "General",
      difficulty: "Mid",
      tags: ["architecture", "microservices", "patterns"],
      question: "What are the primary trade-offs when moving from a monolith to microservices?",
      shortAnswer: "You gain independent scalability and deployment but increase operational complexity, network latency, and data consistency challenges.",
      keyPoints: [
        "Monoliths: Simpler deployment, atomic transactions, lower latency",
        "Microservices: Tech stack flexibility, fault isolation, team autonomy",
        "Distributed systems introduce the 'partial failure' mode",
        "Requires robust observability and CI/CD"
      ],
      redFlags: [
        "Saying microservices are 'always better'",
        "Ignoring the overhead of distributed transactions (Sagas)",
        "Not mentioning the importance of service discovery or load balancing"
      ]
    },
  {
      id: "arch-rest-vs-grpc-1",
      language: "General",
      difficulty: "Mid",
      tags: ["architecture", "api", "grpc", "rest"],
      question: "Compare REST and gRPC for service-to-service communication.",
      shortAnswer: "REST is text-based (JSON/HTTP1.1), ubiquitous and easy to debug; gRPC is binary (Protobuf/HTTP2), faster and strongly typed.",
      keyPoints: [
        "gRPC uses Protobuf for smaller payloads and automatic code generation",
        "HTTP/2 allows for multiplexing and streaming in gRPC",
        "REST is more compatible with browser-based clients directly",
        "gRPC is ideal for internal microservices with high performance needs"
      ],
      redFlags: [
        "Thinking gRPC is always better because it's newer",
        "Ignoring the browser compatibility issues of gRPC (requires gRPC-web)",
        "Not understanding the benefits of Protobuf over JSON"
      ]
    },
];
