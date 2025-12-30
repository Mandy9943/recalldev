"use client";

import { useInterview } from "@/context/InterviewContext";
import { buildPracticeSession, sessionSeedForToday } from "@/lib/session";
import {
  calculateNextReview,
  formatIntervalDaysShort,
  formatNextReviewIn,
} from "@/lib/srs";
import {
  Difficulty,
  Evaluation,
  ProgrammingLanguage,
  Question,
  UserQuestionRecord,
} from "@/types";
import {
  AlertCircle,
  ArrowLeft,
  Brain,
  CheckCircle2,
  History,
  Home,
  Info,
  Keyboard,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const mode = searchParams.get("mode") === "due" ? "due" : "mix";
  const allowExtraPractice = searchParams.get("extra") === "1";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedById, setRevealedById] = useState<Record<string, boolean>>({});
  const [evaluationById, setEvaluationById] = useState<
    Record<string, Evaluation>
  >({});
  const [sessionComplete, setSessionComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingEvaluation, setIsSavingEvaluation] = useState(false);
  const [makeup, setMakeup] = useState<{
    due: number;
    new: number;
    extra: number;
  } | null>(null);
  const [allCaughtUp, setAllCaughtUp] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSessionInfo, setShowSessionInfo] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const baselineRecordByIdRef = useRef<
    Record<string, UserQuestionRecord | null | undefined>
  >({});
  const [lastUndo, setLastUndo] = useState<{
    questionId: string;
    prevRecord: UserQuestionRecord | null;
    prevEvaluation?: Evaluation;
  } | null>(null);
  const [reviewToast, setReviewToast] = useState<{
    title: string;
    detail?: string;
  } | null>(null);

  // Auto-hide toast after grading.
  useEffect(() => {
    if (!reviewToast) return;
    const t = window.setTimeout(() => setReviewToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [reviewToast]);

  // Load smart questions for the session
  useEffect(() => {
    if (!isReady) return;

    const loadSession = async () => {
      setIsLoading(true);
      setSessionComplete(false);
      setCurrentIndex(0);
      setRevealedById({});
      setEvaluationById({});
      baselineRecordByIdRef.current = {};
      setLastUndo(null);

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
        includeNew: mode !== "due",
        allowExtraPractice: false,
        seed,
      });

      const isCaughtUp =
        mode === "due"
          ? base.makeup.due === 0
          : base.makeup.due + base.makeup.new === 0;
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
        allowExtraPractice ||
        (!isCaughtUp && base.questions.length < sessionSize);

      const session = shouldBackfillExtras
        ? await buildPracticeSession({
            repository,
            languages: lang ? [lang] : undefined,
            difficulties: diff ? [diff] : undefined,
            tags,
            sessionSize,
            includeNew: mode !== "due",
            allowExtraPractice: true,
            seed,
          })
        : base;

      setQuestions(session.questions);
      setMakeup(session.makeup);
      setIsLoading(false);
    };

    loadSession();
  }, [
    isReady,
    repository,
    lang,
    diff,
    tags,
    sessionSize,
    allowExtraPractice,
    mode,
  ]);

  const currentQuestion = questions[currentIndex];
  const isRevealed = currentQuestion
    ? Boolean(revealedById[currentQuestion.id])
    : false;
  const currentEvaluation = currentQuestion
    ? evaluationById[currentQuestion.id]
    : undefined;

  // Reset small UI toggles per question to reduce visual noise.
  useEffect(() => {
    setShowAllTags(false);
  }, [currentQuestion?.id]);

  const handleSkip = useCallback(() => {
    if (!currentQuestion) return;
    if (questions.length <= 1) return;
    setRevealedById((prev) => ({ ...prev, [currentQuestion.id]: false }));
    setQuestions((prev) => {
      const q = prev[currentIndex];
      if (!q) return prev;
      const next = [...prev];
      next.splice(currentIndex, 1);
      next.push(q);
      return next;
    });
    // Keep index stable; next question becomes whatever shifted into this slot.
    window.scrollTo(0, 0);
    setReviewToast({ title: "Skipped (moved to end)" });
  }, [currentQuestion, currentIndex, questions.length]);

  const goPrev = () => {
    if (currentIndex <= 0) return;
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    window.scrollTo(0, 0);
  };

  const goNext = () => {
    if (currentIndex >= questions.length - 1) return;
    setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
    window.scrollTo(0, 0);
  };

  const handleUndoLastGrade = useCallback(async () => {
    if (!lastUndo) return;
    if (isSavingEvaluation) return;

    setIsSavingEvaluation(true);
    try {
      await repository.setRecord(lastUndo.questionId, lastUndo.prevRecord);
      setEvaluationById((prev) => {
        const next = { ...prev };
        if (lastUndo.prevEvaluation)
          next[lastUndo.questionId] = lastUndo.prevEvaluation;
        else delete next[lastUndo.questionId];
        return next;
      });
      setLastUndo(null);
      setReviewToast({ title: "Undid last grade" });
    } finally {
      setIsSavingEvaluation(false);
    }
  }, [isSavingEvaluation, lastUndo, repository]);

  const handleEvaluation = useCallback(
    async (evalType: Evaluation) => {
      if (!currentQuestion) return;
      if (isSavingEvaluation) return;

      setIsSavingEvaluation(true);
      try {
        const questionId = currentQuestion.id;

        // Capture baseline record once per question per session so re-grading doesn't double-count.
        if (!(questionId in baselineRecordByIdRef.current)) {
          baselineRecordByIdRef.current[questionId] =
            await repository.getRecord(questionId);
        }

        const baseline = baselineRecordByIdRef.current[questionId] ?? null;
        const baselineCopy: UserQuestionRecord | null = baseline
          ? JSON.parse(JSON.stringify(baseline))
          : null;

        // Save undo snapshot (persisted record + previous session evaluation).
        const prevPersisted = await repository.getRecord(questionId);
        const prevEvaluation = evaluationById[questionId];
        setLastUndo({
          questionId,
          prevRecord: prevPersisted,
          prevEvaluation,
        });

        const nextRecord = calculateNextReview(
          evalType,
          baselineCopy,
          questionId
        );
        await repository.setRecord(questionId, nextRecord);

        const inText = formatNextReviewIn(nextRecord.nextReviewDate);
        const atText = new Date(nextRecord.nextReviewDate).toLocaleString(
          undefined,
          {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          }
        );
        setReviewToast({
          title: `Next review in ${inText}`,
          detail: `Interval ${formatIntervalDaysShort(
            nextRecord.interval
          )} • Streak ${nextRecord.streak} • ${atText}`,
        });

        const alreadyGraded = Boolean(evaluationById[currentQuestion.id]);
        const nextGradedCount =
          Object.keys(evaluationById).length + (alreadyGraded ? 0 : 1);
        setEvaluationById((prev) => ({
          ...prev,
          [currentQuestion.id]: evalType,
        }));

        // Complete once all questions have been graded at least once.
        if (nextGradedCount >= questions.length) {
          await refreshStats();
          setSessionComplete(true);
          return;
        }

        if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          window.scrollTo(0, 0);
        }
      } finally {
        setIsSavingEvaluation(false);
      }
    },
    [
      currentQuestion,
      currentIndex,
      evaluationById,
      isSavingEvaluation,
      questions.length,
      refreshStats,
      repository,
    ]
  );

  // Keyboard shortcuts (desktop): Space/Enter reveal, 1/2/3 grade, ? opens help, Esc closes help.
  useEffect(() => {
    if (!isReady) return;
    if (isLoading) return;
    if (sessionComplete) return;
    if (!currentQuestion) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || target?.isContentEditable) {
        return;
      }

      if (showShortcuts) {
        if (e.key === "Escape") {
          e.preventDefault();
          setShowShortcuts(false);
        }
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setShowShortcuts(true);
        return;
      }

      if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        handleSkip();
        return;
      }

      if (e.key === "u" || e.key === "U") {
        e.preventDefault();
        handleUndoLastGrade();
        return;
      }

      if (!isRevealed) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setRevealedById((prev) =>
            currentQuestion ? { ...prev, [currentQuestion.id]: true } : prev
          );
        }
        return;
      }

      if (isSavingEvaluation) return;

      if (e.key === "1") {
        e.preventDefault();
        handleEvaluation("bad");
      } else if (e.key === "2") {
        e.preventDefault();
        handleEvaluation("kind_of");
      } else if (e.key === "3") {
        e.preventDefault();
        handleEvaluation("good");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    isReady,
    isLoading,
    sessionComplete,
    currentQuestion,
    isRevealed,
    isSavingEvaluation,
    showShortcuts,
    handleSkip,
    handleUndoLastGrade,
    handleEvaluation,
  ]);

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
            ? mode === "due"
              ? "You have no due reviews for this selection."
              : "You have no due reviews and no new questions for this selection."
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
              if (mode === "due") params.set("mode", "due");
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
      {reviewToast && (
        <div className="fixed top-16 md:top-20 left-0 right-0 z-30 px-4 pointer-events-none">
          <div className="max-w-xl mx-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-xl px-4 py-3">
            <p className="text-sm font-black text-gray-900 dark:text-white">
              {reviewToast.title}
            </p>
            {reviewToast.detail ? (
              <p className="mt-0.5 text-[11px] font-bold text-gray-500 dark:text-gray-400">
                {reviewToast.detail}
              </p>
            ) : null}
          </div>
        </div>
      )}
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
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <button
            type="button"
            onClick={() => setShowSessionInfo(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Session info"
          >
            <Info size={16} />
          </button>
          <button
            type="button"
            onClick={() => setShowShortcuts(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Keyboard shortcuts"
          >
            <Keyboard size={16} />
          </button>
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
              {(showAllTags
                ? currentQuestion.tags
                : currentQuestion.tags.slice(0, 3)
              ).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md"
                >
                  #{tag}
                </span>
              ))}
              {currentQuestion.tags.length > 3 ? (
                <button
                  type="button"
                  onClick={() => setShowAllTags((v) => !v)}
                  className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  aria-label={
                    showAllTags
                      ? "Collapse tags"
                      : `Show ${currentQuestion.tags.length - 3} more tags`
                  }
                >
                  {showAllTags
                    ? "Less"
                    : `+${currentQuestion.tags.length - 3} more`}
                </button>
              ) : null}
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

      {showSessionInfo && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm p-4 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Session info"
          onMouseDown={() => setShowSessionInfo(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl p-6"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Practice
                </p>
                <h2 className="mt-1 text-lg font-black text-gray-900 dark:text-white">
                  Session info
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowSessionInfo(false)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Close session info"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-3 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500 dark:text-gray-400 font-bold">
                  Mode
                </span>
                <span className="font-black">
                  {mode === "due" ? "Due only" : "Due + new"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500 dark:text-gray-400 font-bold">
                  Length
                </span>
                <span className="font-black">{sessionSize} questions</span>
              </div>
              {makeup ? (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-500 dark:text-gray-400 font-bold">
                    Pool
                  </span>
                  <span className="font-black">
                    {makeup.due} due • {makeup.new} new
                    {makeup.extra ? ` • ${makeup.extra} extra` : ""}
                  </span>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500 dark:text-gray-400 font-bold">
                  Extra practice
                </span>
                <span className="font-black">
                  {allowExtraPractice ? "On" : "Off"}
                </span>
              </div>

              {lang || diff || (tags?.length ?? 0) > 0 ? (
                <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Filters
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {lang ? (
                      <span className="text-[10px] font-black bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded uppercase">
                        {lang}
                      </span>
                    ) : null}
                    {diff ? (
                      <span className="text-[10px] font-black bg-gray-100 dark:bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded uppercase">
                        {diff}
                      </span>
                    ) : null}
                    {(tags ?? []).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-black bg-gray-50 dark:bg-gray-800/70 text-gray-500 px-1.5 py-0.5 rounded uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {showShortcuts && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm p-4 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
          onMouseDown={() => setShowShortcuts(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl p-6"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Practice
                </p>
                <h2 className="mt-1 text-lg font-black text-gray-900 dark:text-white">
                  Keyboard shortcuts
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowShortcuts(false)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Close shortcuts"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-3 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center justify-between gap-4">
                <span>Show answer</span>
                <span className="flex items-center gap-2">
                  <kbd className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono text-xs">
                    Space
                  </kbd>
                  <kbd className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono text-xs">
                    Enter
                  </kbd>
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span>Skip (move to end)</span>
                <kbd className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono text-xs">
                  S
                </kbd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span>Undo last grade</span>
                <kbd className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono text-xs">
                  U
                </kbd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span>Grade: Fail</span>
                <kbd className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono text-xs">
                  1
                </kbd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Grade: Kind of</span>
                <kbd className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono text-xs">
                  2
                </kbd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Grade: Mastered</span>
                <kbd className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono text-xs">
                  3
                </kbd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span>Open/close this help</span>
                <span className="flex items-center gap-2">
                  <kbd className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono text-xs">
                    ?
                  </kbd>
                  <kbd className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono text-xs">
                    Esc
                  </kbd>
                </span>
              </div>
            </div>

            <p className="mt-5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Tip: shortcuts work best on desktop. On mobile, the buttons are
              the fastest path.
            </p>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-20 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <div className="mb-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentIndex <= 0}
              className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
                currentIndex <= 0
                  ? "opacity-50 pointer-events-none bg-transparent border-gray-200 dark:border-gray-800 text-gray-400"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              aria-label="Previous question"
            >
              Prev
            </button>
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                {currentEvaluation
                  ? `Graded: ${currentEvaluation.replace("_", " ")}`
                  : "Not graded yet"}
              </p>
              <button
                type="button"
                onClick={handleUndoLastGrade}
                disabled={!lastUndo || isSavingEvaluation}
                className={`mt-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                  !lastUndo || isSavingEvaluation
                    ? "opacity-50 pointer-events-none bg-transparent border-gray-200 dark:border-gray-800 text-gray-400"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                aria-label="Undo last grade"
              >
                Undo last grade
              </button>
            </div>
            <button
              type="button"
              onClick={goNext}
              disabled={currentIndex >= questions.length - 1}
              className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
                currentIndex >= questions.length - 1
                  ? "opacity-50 pointer-events-none bg-transparent border-gray-200 dark:border-gray-800 text-gray-400"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              aria-label="Next question"
            >
              Next
            </button>
          </div>
          {!isRevealed ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() =>
                  setRevealedById((prev) =>
                    currentQuestion
                      ? { ...prev, [currentQuestion.id]: true }
                      : prev
                  )
                }
                className="sm:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98] text-xl flex items-center justify-center gap-3"
                aria-label="Show the answer"
              >
                <Brain size={24} /> Show Answer
              </button>
              <button
                type="button"
                onClick={handleSkip}
                disabled={questions.length <= 1}
                className={`w-full py-5 rounded-2xl font-black transition-all active:scale-[0.98] border ${
                  questions.length <= 1
                    ? "opacity-50 pointer-events-none bg-transparent border-gray-200 dark:border-gray-800 text-gray-400"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                aria-label="Skip this question"
              >
                Skip
                <span className="ml-2 text-[10px] font-mono font-black text-gray-400">
                  S
                </span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Evaluate your Recall
              </p>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => handleEvaluation("bad")}
                  disabled={isSavingEvaluation}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all ${
                    isSavingEvaluation ? "opacity-60 pointer-events-none" : ""
                  }`}
                  aria-label="Mark as fail"
                >
                  <span className="text-3xl mb-1">👎</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Fail
                  </span>
                  <span className="mt-1 text-[10px] font-mono font-black text-red-400/80">
                    1
                  </span>
                </button>

                <button
                  onClick={() => handleEvaluation("kind_of")}
                  disabled={isSavingEvaluation}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-yellow-100 dark:border-yellow-900/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all ${
                    isSavingEvaluation ? "opacity-60 pointer-events-none" : ""
                  }`}
                  aria-label="Mark as kind of"
                >
                  <span className="text-3xl mb-1">🤔</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Kind of
                  </span>
                  <span className="mt-1 text-[10px] font-mono font-black text-yellow-400/80">
                    2
                  </span>
                </button>

                <button
                  onClick={() => handleEvaluation("good")}
                  disabled={isSavingEvaluation}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-green-100 dark:border-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all ${
                    isSavingEvaluation ? "opacity-60 pointer-events-none" : ""
                  }`}
                  aria-label="Mark as mastered"
                >
                  <span className="text-3xl mb-1">👍</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Mastered
                  </span>
                  <span className="mt-1 text-[10px] font-mono font-black text-green-400/80">
                    3
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
