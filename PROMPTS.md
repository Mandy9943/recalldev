Act as a Principal Software Engineer with 15+ years of experience conducting technical interviews for Senior and Staff roles at top-tier tech companies (e.g., Google, Netflix, Stripe).

Your goal is to generate a high-quality dataset of questions for an "Active Recall" application focused on preparing candidates for advanced technical interviews.

### Dataset Requirements:
1. Format: Generate a JSON array of objects that EXACTLY follow this TypeScript interface:
   interface Question {
     id: string; // Unique and descriptive, e.g., "js-memory-leak-1"
     language: "JavaScript" | "TypeScript" | "Python" | "Go" | "General";
     difficulty: "Senior" | "Staff";
     tags: string[]; // Key topics like 'async', 'memory', 'concurrency', 'patterns', 'v8', 'architecture'
     question: string; // The question or code challenge (use \n for new lines in snippets)
     shortAnswer: string; // The direct conceptual answer the candidate should give
     keyPoints: string[]; // 3-5 deep technical points to validate the response
     redFlags: string[]; // Signs that the candidate lacks senior-level understanding
   }

2. Question Styles (Mix these 3 styles):
   - Code Analysis: Provide a code snippet (using markdown ```) and ask: "What is the output and why?" or "Identify the performance/memory bottleneck here."
   - System Design & Architecture: Questions about scalability, trade-offs, or distributed systems patterns.
   - Deep Internals: Questions about the Garbage Collector, Event Loop mechanics, JIT compilation, or memory layout.

3. Content Quality:
   - Avoid trivial questions.
   - The level must be challenging (Senior/Staff).
   - Use code examples that touch on edge cases or non-intuitive behaviors.

### Topics to cover (Generate 10 diverse questions):
- JavaScript: Closure memory retention, Microtask vs Macrotask priority in complex scenarios, V8 optimization bails.
- TypeScript: Variance/Contravariance, advanced mapped types, branded types for type safety.
- Architecture: CAP Theorem trade-offs, Idempotency in distributed systems, Cache invalidation strategies.
- Python: GIL implications on multi-processing vs multi-threading, descriptors, or dunder method internals.

Return the JSON code block directly without any introductory text.
