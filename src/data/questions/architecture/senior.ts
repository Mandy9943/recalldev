import { Question } from "@/types";

export const ARCH_QUESTIONS_SENIOR: Question[] = [
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
];
