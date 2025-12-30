"use client";

import { useInterview } from "@/context/InterviewContext";
import { readPrefs } from "@/lib/prefs";
import { Question, UserAnalytics } from "@/types";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  History,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function buildPracticeHref(input: {
  tags?: string[];
}): string {
  const params = new URLSearchParams();
  const prefs = readPrefs();
  const lang = prefs?.lang;
  const diff = prefs?.diff;
  const len = prefs?.len;
  const mode = prefs?.mode;

  if (lang) params.set("lang", lang);
  if (diff) params.set("diff", diff);
  if (input.tags?.length) params.set("tags", input.tags.join(","));
  if (len) params.set("len", String(len));
  if (mode === "due") params.set("mode", "due");

  const qs = params.toString();
  return qs ? `/practice?${qs}` : "/practice";
}

export default function ProgressPage() {
  const { repository, refreshStats, isReady } = useInterview();
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataMessage, setDataMessage] = useState<string | null>(null);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isReady) return;
    let cancelled = false;
    const run = async () => {
      try {
        setIsLoading(true);
        const a = await repository.getAnalytics({ days: 14, topN: 10 });
        if (!cancelled) setAnalytics(a);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [isReady, repository]);

  const handleReset = async () => {
    if (
      confirm(
        "Are you sure you want to reset all progress? This cannot be undone."
      )
    ) {
      await repository.resetProgress();
      await refreshStats();
      const a = await repository.getAnalytics({ days: 14, topN: 10 });
      setAnalytics(a);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      await repository.refreshFromStorage();
      await refreshStats();
      const a = await repository.getAnalytics({ days: 14, topN: 10 });
      setAnalytics(a);
    } finally {
      setIsLoading(false);
    }
  };

  const looksLikeQuestions = (value: unknown): value is Question[] => {
    if (!Array.isArray(value)) return false;
    // Minimal validation
    return value.every(
      (q) =>
        q &&
        typeof q === "object" &&
        typeof (q as Question).id === "string" &&
        typeof (q as Question).question === "string" &&
        Array.isArray((q as Question).tags)
    );
  };

  const handleExportData = async () => {
    try {
      setDataMessage(null);
      // Ensure we export the freshest state.
      await repository.refreshFromStorage();

      const rawProgress = localStorage.getItem("recall_dev_v2_progress");
      const rawQuestions = localStorage.getItem("recall_dev_v2_questions");
      const rawPrefs = localStorage.getItem("recall_dev_v2_prefs");

      const backup = {
        app: "RecallDev",
        version: 2,
        exportedAt: Date.now(),
        data: {
          progress: rawProgress ? (JSON.parse(rawProgress) as unknown) : null,
          questions: rawQuestions ? (JSON.parse(rawQuestions) as unknown) : null,
          prefs: rawPrefs ? (JSON.parse(rawPrefs) as unknown) : null,
        },
      };

      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const filename = `recalldev-backup-${yyyy}-${mm}-${dd}.json`;

      const blob = new Blob([JSON.stringify(backup, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setDataMessage("Exported a backup JSON file.");
    } catch {
      setDataMessage("Export failed. Please try again.");
    }
  };

  const handleImportClick = () => {
    setDataMessage(null);
    importInputRef.current?.click();
  };

  const handleImportFile: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const file = e.currentTarget.files?.[0];
    // Allow importing the same file again.
    e.currentTarget.value = "";
    if (!file) return;

    try {
      setDataMessage(null);
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;

      if (!parsed || typeof parsed !== "object") {
        setDataMessage("Import failed: invalid JSON format.");
        return;
      }

      const p = parsed as any;
      const data = p?.data;
      const nextProgress = data?.progress;
      const nextQuestions = data?.questions;
      const nextPrefs = data?.prefs;

      const hasProgress = nextProgress && typeof nextProgress === "object";
      const hasQuestions = looksLikeQuestions(nextQuestions);
      const hasPrefs = nextPrefs && typeof nextPrefs === "object";

      if (!hasProgress && !hasQuestions && !hasPrefs) {
        setDataMessage("Import failed: no recognizable RecallDev data found.");
        return;
      }

      if (
        !confirm(
          "Import will replace your local RecallDev data (progress, and possibly questions/settings). Continue?"
        )
      ) {
        return;
      }

      if (hasProgress) {
        localStorage.setItem(
          "recall_dev_v2_progress",
          JSON.stringify(nextProgress)
        );
      }
      if (hasQuestions) {
        localStorage.setItem(
          "recall_dev_v2_questions",
          JSON.stringify(nextQuestions)
        );
      }
      if (hasPrefs) {
        localStorage.setItem("recall_dev_v2_prefs", JSON.stringify(nextPrefs));
      }

      await repository.refreshFromStorage();
      await refreshStats();
      const a = await repository.getAnalytics({ days: 14, topN: 10 });
      setAnalytics(a);

      setDataMessage("Import successful.");
    } catch {
      setDataMessage("Import failed. Make sure you selected a valid backup JSON.");
    }
  };

  if (!isReady) return null;
  if (isLoading || !analytics) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <header className="bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4 sticky top-0 z-10 transition-colors duration-300">
          <Link
            href="/"
            className="p-2 -ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
            Your Mastery
          </h1>
        </header>
        <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full">
          <div className="animate-pulse space-y-6">
            <div className="h-28 rounded-3xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800" />
            <div className="h-28 rounded-3xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800" />
            <div className="h-28 rounded-3xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800" />
          </div>
        </main>
      </div>
    );
  }

  const localStats = analytics.stats;
  const accuracyPct = Math.round((analytics.overall.goodRate || 0) * 100);
  const maxAttemptsInChart = Math.max(
    1,
    ...analytics.activityByDay.map((d) => d.attempts)
  );
  const topWeakTags = analytics.topWeakTags.slice(0, 3).map((t) => t.tag);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4 sticky top-0 z-10 transition-colors duration-300">
        <Link
          href="/"
          className="p-2 -ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter flex-1">
          Your Mastery
        </h1>
        <button
          onClick={handleRefresh}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Refresh analytics"
        >
          <RefreshCw size={18} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl border border-blue-100 dark:border-blue-800/50 flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-800/50 rounded-2xl text-blue-600 dark:text-blue-400 mb-4">
              <BookOpen size={24} />
            </div>
            <span className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-1">
              {localStats.totalQuestionsSeen}
            </span>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
              Total Seen
            </span>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-3xl border border-green-100 dark:border-green-800/50 flex flex-col items-center text-center">
            <div className="p-3 bg-green-100 dark:bg-green-800/50 rounded-2xl text-green-600 dark:text-green-400 mb-4">
              <TrendingUp size={24} />
            </div>
            <span className="text-4xl font-black text-green-600 dark:text-green-400 mb-1">
              {localStats.masteryPercentage}%
            </span>
            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">
              Mastery Level
            </span>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-3xl border border-purple-100 dark:border-purple-800/50 flex flex-col items-center text-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-800/50 rounded-2xl text-purple-600 dark:text-purple-400 mb-4">
              <Calendar size={24} />
            </div>
            <span className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-1">
              {localStats.daysStreak}
            </span>
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">
              Day Streak
            </span>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-3xl border border-orange-100 dark:border-orange-900/30 flex flex-col items-center text-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-2xl text-orange-600 dark:text-orange-400 mb-4">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-4xl font-black text-orange-600 dark:text-orange-400 mb-1">
              {accuracyPct}%
            </span>
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">
              Accuracy
            </span>
          </div>
        </div>

        {/* Practice CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={buildPracticeHref({ tags: topWeakTags.length ? topWeakTags : undefined })}
            className="p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Recommended
                </p>
                <p className="mt-2 text-lg font-black text-gray-900 dark:text-white">
                  Practice weakest topics
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Jump straight into a session biased toward your highest fail-rate tags.
                </p>
              </div>
              <div className="shrink-0 p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Brain size={22} />
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Continue
                </p>
                <p className="mt-2 text-lg font-black text-gray-900 dark:text-white">
                  Back to dashboard
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Change filters and start another session.
                </p>
              </div>
              <div className="shrink-0 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                <ArrowLeft className="rotate-180" size={22} />
              </div>
            </div>
          </Link>
        </div>

        {/* Info Card */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Brain className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                How Mastery works
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                RecallDev uses a Spaced Repetition Algorithm. When you mark a
                question as &quot;Mastered&quot;, the interval for the next
                review increases exponentially. A question is considered part of
                your &quot;Mastery Level&quot; once its review interval exceeds
                7 days.
              </p>
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">
              Last 14 days
            </h2>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {localStats.totalAttempts} total attempts
            </span>
          </div>
          <div className="space-y-2">
            {analytics.activityByDay.map((d) => {
              const w = Math.round((d.attempts / maxAttemptsInChart) * 100);
              return (
                <div key={d.day} className="flex items-center gap-3">
                  <span className="w-24 text-[10px] font-mono font-bold text-gray-400">
                    {d.day}
                  </span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${w}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[10px] font-black text-gray-400">
                    {d.attempts}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weak topics */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">
              Weakest Topics
            </h2>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              by failure rate
            </span>
          </div>

          {analytics.topWeakTags.length === 0 ? (
            <div className="flex items-start gap-3 text-gray-500 dark:text-gray-400">
              <AlertTriangle className="mt-0.5" size={16} />
              <p className="text-sm">
                No topic analytics yet. Do a few practice sessions so we can
                learn your patterns.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {analytics.topWeakTags.map((t) => {
                const badPct = Math.round(t.badRate * 100);
                return (
                  <Link
                    key={t.tag}
                    href={buildPracticeHref({ tags: [t.tag] })}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex flex-col">
                      <span className="font-black text-gray-900 dark:text-white">
                        #{t.tag}
                      </span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {t.attempts} attempts
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-red-500">
                        {badPct}%
                      </span>
                      <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        fail rate
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Most missed questions */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">
              Most Missed Questions
            </h2>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              top {analytics.topMissedQuestions.length}
            </span>
          </div>

          {analytics.topMissedQuestions.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No data yet.
            </p>
          ) : (
            <div className="space-y-3">
              {analytics.topMissedQuestions.map((q) => {
                const badPct = Math.round(q.badRate * 100);
                const title = (q.prompt || "")
                  .replace(/\s+/g, " ")
                  .slice(0, 90);
                const tagLink = (q.tags || []).slice(0, 3);
                return (
                  <Link
                    key={q.questionId}
                    href={buildPracticeHref({ tags: tagLink.length ? tagLink : undefined })}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {q.language && (
                            <span className="text-[10px] font-black bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded uppercase">
                              {q.language}
                            </span>
                          )}
                          {q.difficulty && (
                            <span className="text-[10px] font-black bg-gray-100 dark:bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded uppercase">
                              {q.difficulty}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                          {title || q.questionId}
                        </p>
                        {q.tags?.length ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {q.tags.slice(0, 6).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/70 dark:bg-gray-900/40 px-2 py-1 rounded-md"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-black text-red-500">
                          {badPct}%
                        </span>
                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          fail rate
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">
            Next Steps
          </h3>
          <Link
            href="/"
            className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-sm group"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600">
                <CheckCircle2 size={20} />
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">
                Keep Practicing
              </span>
            </div>
            <ArrowLeft className="rotate-180 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        {/* Reset Section */}
        <div className="pt-12 flex flex-col items-center">
          <div className="w-full max-w-xl bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Backup & Restore
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              RecallDev stores everything on this device. Export a backup to move your progress to another browser/device.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleExportData}
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-2xl font-black transition-all active:scale-[0.98]"
              >
                Export data
              </button>
              <button
                onClick={handleImportClick}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-2xl font-black transition-all active:scale-[0.98]"
              >
                Import data
              </button>
              <input
                ref={importInputRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={handleImportFile}
              />
            </div>

            {dataMessage ? (
              <p className="mt-3 text-xs font-bold text-gray-500 dark:text-gray-400">
                {dataMessage}
              </p>
            ) : null}
          </div>

          <button
            onClick={handleReset}
            className="mt-8 flex items-center gap-2 text-red-500 dark:text-red-400 text-xs font-black uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-900/10 px-6 py-3 rounded-xl transition-colors"
          >
            <History size={16} /> Reset All Data
          </button>
          <p className="text-[10px] text-gray-400 mt-2">
            Only RecallDev progress will be cleared.
          </p>
        </div>
      </main>
    </div>
  );
}
