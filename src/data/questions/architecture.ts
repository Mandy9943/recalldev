import { Question } from "@/types";

export const ARCH_QUESTIONS: Question[] = [
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
    id: "arch-event-sourcing-1",
    language: "General",
    difficulty: "Senior",
    tags: ["architecture", "event-sourcing", "ddd"],
    question: "What is Event Sourcing and what problem does it solve?",
    shortAnswer: "Instead of storing current state, you store a sequence of immutable events; state is reconstructed by replaying events.",
    keyPoints: [
      "Provides a perfect audit log and history",
      "Allows 'time travel' (reconstructing state at any point in time)",
      "Excellent for complex domains with many state transitions",
      "Usually paired with CQRS (Command Query Responsibility Segregation)"
    ],
    redFlags: [
      "Confusing event sourcing with just 'logging' or 'pub/sub'",
      "Not understanding the difficulty of event schema evolution (versioning)",
      "Ignoring the performance impact of replaying thousands of events without snapshots"
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
  {
    id: "arch-sharding-vs-partitioning-1",
    language: "General",
    difficulty: "Senior",
    tags: ["architecture", "databases", "scalability"],
    question: "What is the difference between database sharding and horizontal partitioning?",
    shortAnswer: "Horizontal partitioning splits data into multiple tables within one database; sharding distributes data across multiple independent database instances.",
    keyPoints: [
      "Sharding is a type of horizontal partitioning, but at the infrastructure level",
      "Partitioning helps with query performance on a single node",
      "Sharding helps with scaling beyond the capacity of a single machine",
      "Sharding introduces complexity in cross-shard joins and transactions"
    ],
    redFlags: [
      "Using the terms interchangeably without nuance",
      "Not mentioning the 'shard key' selection importance",
      "Ignoring how sharding affects high availability"
    ]
  },
  {
    id: "arch-cdn-benefits-1",
    language: "General",
    difficulty: "Junior",
    tags: ["architecture", "performance", "networking"],
    question: "How does a CDN (Content Delivery Network) improve website performance?",
    shortAnswer: "By caching content at edge locations closer to the user, reducing latency and offloading traffic from the origin server.",
    keyPoints: [
      "Reduces round-trip time (RTT)",
      "Caches static assets (images, JS, CSS) and sometimes dynamic content",
      "Provides protection against DDoS attacks",
      "Saves bandwidth costs for the origin server"
    ],
    redFlags: [
      "Thinking CDNs are only for video streaming",
      "Not understanding the 'cache invalidation' problem",
      "Ignoring that the first request might still be slow (cache miss)"
    ]
  }
];

