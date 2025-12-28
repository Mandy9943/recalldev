import Link from "next/link";
import Script from "next/script";
import { HomeClient } from "./HomeClient";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "RecallDev",
        url: "https://recalldev.mandy9943.dev/",
      },
      {
        "@type": "Person",
        name: "Mandy9943",
        url: "https://mandy9943.dev",
        sameAs: ["https://github.com/Mandy9943", "https://mandy9943.dev"],
      },
      {
        "@type": "SoftwareApplication",
        name: "RecallDev",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        url: "https://recalldev.mandy9943.dev/",
        description:
          "Master technical interviews with active recall and spaced repetition across JavaScript, TypeScript, Go, Python, and System Architecture.",
        author: {
          "@type": "Person",
          name: "Mandy9943",
          url: "https://mandy9943.dev",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="p-6 md:p-10 border-b border-gray-100 dark:border-gray-800">
        <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.25em]">
          RecallDev
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Intelligent Interview Mastery
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Practice technical interview questions using{" "}
          <strong>active recall</strong> and a{" "}
          <strong>spaced repetition</strong> review loop. Track mastery over
          time and focus on what’s due next.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/practice"
            className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98]"
          >
            Start practicing
          </Link>
          <Link
            href="/progress"
            className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-black transition-all active:scale-[0.98]"
          >
            View progress
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Built for recall
            </p>
            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Reveal answers only after thinking, then evaluate your recall to
              set the next review interval.
            </p>
          </div>
          <div className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Focus on what’s due
            </p>
            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Sessions prioritize questions that are due, then backfill with new
              ones to keep progress moving.
            </p>
          </div>
          <div className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Multi-skill library
            </p>
            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              JavaScript, TypeScript, Go, Python, and System Architecture — from
              Junior to Staff.
            </p>
          </div>
        </div>

        <noscript>
          <p className="mt-6 text-sm text-gray-500">
            You can browse this landing page without JavaScript, but the
            interactive practice experience requires JavaScript enabled.
          </p>
        </noscript>
      </header>

      <HomeClient />
    </>
  );
}
