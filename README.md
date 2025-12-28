# RecallDev - Senior JavaScript Interview Practice

A mobile-first active recall tool for Senior JavaScript Developers to practice and refresh interview knowledge.

## Features

- **Practice Mode**: Quick 5-10 minute sessions by category (Core JS, Async, Performance, etc.).
- **Active Recall Flow**: Question -> Reveal Answer -> Self-Evaluation (Strong/Kind of/Weak).
- **Progress Tracking**: Tracks questions seen, confidence score, and weak categories.
- **Mobile-First UX**: Designed for one-handed use on mobile devices.
- **Offline Capable**: Uses LocalStorage for progress tracking (no backend required for MVP).

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide React (Icons)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

- `src/app`: Next.js pages and layout.
- `src/data`: Question dataset.
- `src/context`: State management (InterviewContext).
- `src/types`: TypeScript interfaces.

## Customization

Add more questions in `src/data/questions.ts`.
