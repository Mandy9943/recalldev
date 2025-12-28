import { Question } from "@/types";

export const ARCH_QUESTIONS_JUNIOR: Question[] = [
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
    },
  {
      id: "arch-junior-load-balancer-1",
      language: "General",
      difficulty: "Junior",
      tags: ["architecture", "scalability", "networking"],
      question: "What is a load balancer and why do we use one?",
      shortAnswer: "It distributes traffic across multiple servers to improve availability, performance, and resilience.",
      keyPoints: [
        "Spreads requests across healthy instances",
        "Can perform health checks and remove unhealthy nodes",
        "Enables horizontal scaling",
        "Often terminates TLS and can do routing rules"
      ],
      redFlags: [
        "Thinking it’s only for performance (availability matters too)",
        "Not knowing what health checks do",
        "Assuming it prevents all outages automatically"
      ]
    },
  {
      id: "arch-junior-http-vs-https-1",
      language: "General",
      difficulty: "Junior",
      tags: ["architecture", "security", "http"],
      question: "What’s the difference between HTTP and HTTPS?",
      shortAnswer: "HTTPS is HTTP over TLS: it encrypts traffic and provides integrity and server authentication.",
      keyPoints: [
        "Encryption prevents eavesdropping on the network",
        "Integrity prevents tampering in transit",
        "Certificates verify the server identity",
        "HTTPS is essential for logins, payments, and APIs"
      ],
      redFlags: [
        "Saying HTTPS only hides the URL/route",
        "Not knowing TLS/certificates are involved",
        "Thinking HTTPS guarantees the server is “safe” in all ways"
      ]
    },
  {
      id: "arch-junior-latency-vs-throughput-1",
      language: "General",
      difficulty: "Junior",
      tags: ["architecture", "performance"],
      question: "What’s the difference between latency and throughput?",
      shortAnswer: "Latency is how long a single request takes; throughput is how many requests a system can handle per unit of time.",
      keyPoints: [
        "Low latency improves user-perceived speed",
        "High throughput improves capacity",
        "Optimizing one can hurt the other",
        "Measure with percentiles (p50/p95/p99) for latency"
      ],
      redFlags: [
        "Using the terms interchangeably",
        "Only looking at average latency",
        "Assuming more throughput always means faster responses"
      ]
    },
  {
      id: "arch-junior-db-index-1",
      language: "General",
      difficulty: "Junior",
      tags: ["architecture", "databases", "performance"],
      question: "What is a database index and what trade-offs does it introduce?",
      shortAnswer: "An index is a data structure that speeds up reads (lookups/sorts) at the cost of extra storage and slower writes.",
      keyPoints: [
        "Indexes speed up WHERE/JOIN/ORDER BY patterns",
        "They require additional disk/memory",
        "Writes become slower because indexes must be updated",
        "Bad/unused indexes can hurt performance"
      ],
      redFlags: [
        "Thinking indexes always improve everything",
        "Not mentioning write overhead",
        "Not realizing indexes consume storage"
      ]
    },
  {
      id: "arch-junior-cache-why-1",
      language: "General",
      difficulty: "Junior",
      tags: ["architecture", "caching", "performance"],
      question: "Why do we add caches in systems and what are common risks?",
      shortAnswer: "Caches reduce latency and load by reusing computed/fetched data, but introduce staleness and invalidation complexity.",
      keyPoints: [
        "Improves response time and reduces backend load",
        "Common places: CDN, browser cache, Redis, in-memory",
        "Main risk: serving stale data",
        "Invalidation and consistency are the hard parts"
      ],
      redFlags: [
        "Ignoring cache invalidation/staleness",
        "Caching everything without strategy",
        "Assuming caches remove the need for scaling backends"
      ]
    },
];
