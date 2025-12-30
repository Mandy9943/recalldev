"use client";

import { useInterview } from "@/context/InterviewContext";
import { buildPracticeSession, sessionSeedForToday } from "@/lib/session";
import { Difficulty, Evaluation, ProgrammingLanguage, Question } from "@/types";
import {
  AlertCircle,
  ArrowLeft,
  Brain,
  CheckCircle2,
  History,
  Home,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function PracticeContent() {
  const searchParams = useSearchParams();
  const { repository, refreshStats, isReady } = useInterview();

  const tagsStr = searchParams.get("tags");
  const tags = useMemo(
    () => (tagsStr ? tagsStr.split(",") : undefined),
    [tagsStr]
  );

  const lang =
    (searchParams.get("lang") as ProgrammingLanguage | null) ?? undefined;
  const diff = (searchParams.get("diff") as Difficulty | null) ?? undefined;
  const lenParam = searchParams.get("len");
  const sessionSize = useMemo(() => {
    const parsed = lenParam ? Number(lenParam) : 10;
    if (!Number.isFinite(parsed)) return 10;
    // Allow common sizes; clamp to a safe range.
    const n = Math.max(1, Math.min(50, Math.trunc(parsed)));
    return n;
  }, [lenParam]);
  const allowExtraPractice = searchParams.get("extra") === "1";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [makeup, setMakeup] = useState<{ due: number; new: number; extra: number } | null>(null);
  const [allCaughtUp, setAllCaughtUp] = useState(false);

  // Load smart questions for the session
  useEffect(() => {
    if (!isReady) return;

    const loadSession = async () => {
      setIsLoading(true);
      setSessionComplete(false);
      setCurrentIndex(0);
      setIsRevealed(false);

      const seed = sessionSeedForToday({
        languages: lang ? [lang] : undefined,
        difficulties: diff ? [diff] : undefined,
        tags,
      });

      // Phase 1: always build WITHOUT extra practice to detect "caught up" state.
      const base = await buildPracticeSession({
        repository,
        languages: lang ? [lang] : undefined,
        difficulties: diff ? [diff] : undefined,
        tags,
        sessionSize,
        allowExtraPractice: false,
        seed,
      });

      const isCaughtUp = base.makeup.due + base.makeup.new === 0;
      setAllCaughtUp(isCaughtUp);

      if (isCaughtUp && !allowExtraPractice) {
        setQuestions([]);
        setMakeup(base.makeup);
        setIsLoading(false);
        return;
      }

      // If the user has *some* due/new, we can safely backfill with extras to keep the session usable.
      // But if they're fully caught up (no due/new), we require explicit opt-in via `extra=1`.
      const shouldBackfillExtras =
        allowExtraPractice || (!isCaughtUp && base.questions.length < sessionSize);

      const session = shouldBackfillExtras
        ? await buildPracticeSession({
            repository,
            languages: lang ? [lang] : undefined,
            difficulties: diff ? [diff] : undefined,
            tags,
            sessionSize,
            allowExtraPractice: true,
            seed,
          })
        : base;

      setQuestions(session.questions);
      setMakeup(session.makeup);
      setIsLoading(false);
    };

    loadSession();
  }, [isReady, repository, lang, diff, tags, sessionSize, allowExtraPractice]);

  const currentQuestion = questions[currentIndex];

  const handleEvaluation = async (evalType: Evaluation) => {
    if (!currentQuestion) return;

    await repository.saveEvaluation(currentQuestion.id, evalType);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsRevealed(false);
      window.scrollTo(0, 0);
    } else {
      await refreshStats();
      setSessionComplete(true);
    }
  };

  if (isLoading || !isReady) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <Brain size={48} className="text-blue-500 mb-4 animate-bounce" />
          <p className="text-gray-400 font-bold uppercase tracking-widest">
            Loading Session...
          </p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6 text-center bg-white dark:bg-gray-900">
        <History size={48} className="text-gray-200 mb-6" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {allCaughtUp ? "All caught up!" : "Nothing to review!"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {allCaughtUp
            ? "You have no due reviews and no new questions for this selection."
            : "Try changing the filters or language."}
        </p>
        {allCaughtUp && (
          <Link
            href={`/practice?${(() => {
              const params = new URLSearchParams();
              if (lang) params.set("lang", lang);
              if (diff) params.set("diff", diff);
              if (tags?.length) params.set("tags", tags.join(","));
              params.set("len", String(sessionSize));
              params.set("extra", "1");
              return params.toString();
            })()}`}
            className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 mb-4"
          >
            Practice anyway (extra)
          </Link>
        )}
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="flex flex-col h-full p-6 items-center justify-center text-center animate-in fade-in duration-300 bg-white dark:bg-gray-900">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2
            size={40}
            className="text-green-600 dark:text-green-400"
          />
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
          Session Mastered
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
          Your progress has been recorded. The intelligent algorithm will remind
          you of these topics when they are about to fade from your memory.
        </p>

        <Link
          href="/"
          className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
        >
          <Home size={20} />
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-900 px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 -ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded uppercase">
                {currentQuestion.language}
              </span>
              <span className="text-[10px] font-black bg-gray-100 dark:bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded uppercase">
                {currentQuestion.difficulty}
              </span>
              {makeup ? (
                <span className="text-[10px] font-black bg-gray-50 dark:bg-gray-800/70 text-gray-500 px-1.5 py-0.5 rounded uppercase">
                  {makeup.due} due / {makeup.new} new{makeup.extra ? ` / ${makeup.extra} extra` : ""}
                </span>
              ) : null}
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <Timer size={14} />
          <span className="text-xs font-mono font-bold">{questions.length}Q</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-12 pb-48 md:pb-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="">
            <div className="bg-white dark:bg-gray-800 p-5 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8 md:mb-0 transition-all min-h-[200px] md:min-h-0 flex flex-col justify-center md:justify-start">
              <div className="max-w-none">
                <ReactMarkdown
                  components={{
                    h3: ({ ...props }) => (
                      <h3
                        className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-tight mb-4"
                        {...props}
                      />
                    ),
                    p: ({ ...props }) => (
                      <p
                        className="text-gray-800 dark:text-gray-100 leading-relaxed mb-4 font-medium text-base md:text-lg"
                        {...props}
                      />
                    ),
                    code: ({
                      inline,
                      className,
                      children,
                      ...props
                    }: React.ComponentPropsWithoutRef<"code"> & {
                      inline?: boolean;
                      node?: unknown;
                    }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          // @ts-expect-error - library type mismatch
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-xl my-4 text-xs md:text-sm"
                          customStyle={{
                            padding: "1.25rem",
                            margin: "0.5rem 0",
                            fontSize: "0.85rem",
                            lineHeight: "1.6",
                            borderRadius: "1rem",
                            overflowX: "auto",
                            maxWidth: "100%",
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded font-mono text-xs md:text-sm"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {currentQuestion.question}
                </ReactMarkdown>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {currentQuestion.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="">
            {isRevealed && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div>
                  <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                    Short Answer
                  </h4>
                  <div className="max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ ...props }) => (
                          <p
                            className="text-gray-800 dark:text-gray-200 text-lg md:text-xl font-bold leading-relaxed mb-4"
                            {...props}
                          />
                        ),
                        code: ({
                          inline,
                          className,
                          children,
                          ...props
                        }: React.ComponentPropsWithoutRef<"code"> & {
                          inline?: boolean;
                          node?: unknown;
                        }) => {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              // @ts-expect-error - library type mismatch
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              className="rounded-xl my-4 text-xs md:text-sm"
                              customStyle={{
                                padding: "1rem",
                                margin: "0.5rem 0",
                                fontSize: "0.8rem",
                                lineHeight: "1.4",
                                overflowX: "auto",
                                maxWidth: "100%",
                              }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code
                              className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded font-mono text-xs md:text-sm"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {currentQuestion.shortAnswer}
                    </ReactMarkdown>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-blue-500 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={16} /> Key Points
                  </h4>
                  <ul className="space-y-3">
                    {currentQuestion.keyPoints.map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-4 text-gray-700 dark:text-gray-300"
                      >
                        <span className="shrink-0 w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="font-medium leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/20">
                  <h4 className="text-xs font-black text-red-500 dark:text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertCircle size={16} /> Red Flags
                  </h4>
                  <ul className="space-y-3">
                    {currentQuestion.redFlags.map((flag, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-red-800 dark:text-red-200 text-sm font-medium"
                      >
                        <span className="block w-1.5 h-1.5 mt-2 rounded-full bg-red-400 shrink-0" />
                        <span className="leading-relaxed">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-20 shadow-lg">
        <div className="max-w-3xl mx-auto">
          {!isRevealed ? (
            <button
              onClick={() => setIsRevealed(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98] text-xl flex items-center justify-center gap-3"
              aria-label="Show the answer"
            >
              <Brain size={24} /> Show Answer
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Evaluate your Recall
              </p>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => handleEvaluation("bad")}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  aria-label="Mark as fail"
                >
                  <span className="text-3xl mb-1">👎</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Fail
                  </span>
                </button>

                <button
                  onClick={() => handleEvaluation("kind_of")}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-yellow-100 dark:border-yellow-900/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all"
                  aria-label="Mark as kind of"
                >
                  <span className="text-3xl mb-1">🤔</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Kind of
                  </span>
                </button>

                <button
                  onClick={() => handleEvaluation("good")}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-green-100 dark:border-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
                  aria-label="Mark as mastered"
                >
                  <span className="text-3xl mb-1">👍</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Mastered
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
          <div className="animate-pulse flex flex-col items-center">
            <Brain size={48} className="text-blue-500 mb-4 animate-bounce" />
            <p className="text-gray-400 font-bold uppercase tracking-widest">
              Loading Session...
            </p>
          </div>
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
