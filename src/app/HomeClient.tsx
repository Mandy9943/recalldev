"use client";

import { useInterview } from "@/context/InterviewContext";
import { Difficulty, ProgrammingLanguage } from "@/types";
import { readPrefs, writePrefs } from "@/lib/prefs";
import {
  BarChart3,
  BrainCircuit,
  ChevronRight,
  Code2,
  Layers,
  Play,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function HomeClient() {
  const { repository, stats, isReady } = useInterview();

  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(
    () => {
      if (typeof window === "undefined") return "JavaScript";
      return readPrefs()?.lang ?? "JavaScript";
    }
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    () => {
      if (typeof window === "undefined") return "Senior";
      return readPrefs()?.diff ?? "Senior";
    }
  );
  const [sessionLength, setSessionLength] = useState<number>(() => {
    if (typeof window === "undefined") return 10;
    const n = readPrefs()?.len ?? 10;
    return Number.isFinite(n) ? Math.max(1, Math.min(50, Math.trunc(n))) : 10;
  });
  const [sessionMode, setSessionMode] = useState<"mix" | "due">(() => {
    if (typeof window === "undefined") return "mix";
    return readPrefs()?.mode ?? "mix";
  });

  const [availableLanguages, setAvailableLanguages] = useState<
    ProgrammingLanguage[]
  >([]);
  const [availableDifficulties, setAvailableDifficulties] = useState<
    Difficulty[]
  >([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return readPrefs()?.tags ?? [];
  });
  const [tagQuery, setTagQuery] = useState("");
  const [isTopicPickerOpen, setIsTopicPickerOpen] = useState(false);
  const [dueCount, setDueCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  // Persist preferences for use across pages (dashboard/progress/practice).
  useEffect(() => {
    if (!isReady) return;
    writePrefs({
      lang: selectedLanguage,
      diff: selectedDifficulty,
      tags: selectedTags,
      len: sessionLength,
      mode: sessionMode,
    });
  }, [isReady, selectedLanguage, selectedDifficulty, selectedTags, sessionLength, sessionMode]);

  // Load available metadata (Languages & Difficulties) from ALL questions on mount
  useEffect(() => {
    if (!isReady) return;

    const loadGlobalMetadata = async () => {
      const allQuestions = await repository.getQuestions({});

      const languages = Array.from(
        new Set(allQuestions.map((q) => q.language))
      ) as ProgrammingLanguage[];
      const difficulties = Array.from(
        new Set(allQuestions.map((q) => q.difficulty))
      ) as Difficulty[];

      setAvailableLanguages(languages.sort());
      // Custom sort order for difficulties
      const difficultyOrder = { Junior: 1, Mid: 2, Senior: 3, Staff: 4 };
      setAvailableDifficulties(
        difficulties.sort(
          (a, b) => (difficultyOrder[a] || 0) - (difficultyOrder[b] || 0)
        )
      );

      // Default selection safety check
      if (languages.length > 0 && !languages.includes(selectedLanguage)) {
        setSelectedLanguage(languages[0]);
      }
      if (difficulties.length > 0 && !difficulties.includes(selectedDifficulty)) {
        setSelectedDifficulty(difficulties[0]);
      }
    };

    loadGlobalMetadata();
  }, [isReady, repository, selectedLanguage, selectedDifficulty]); // Run only when repo is ready

  // Load tags and due count when selection changes
  useEffect(() => {
    if (!isReady) return;

    const loadSessionMetadata = async () => {
      // Get questions that match current Language & Difficulty selection
      const filtered = await repository.getQuestions({
        languages: [selectedLanguage],
        difficulties: [selectedDifficulty],
      });

      const tags = Array.from(new Set(filtered.flatMap((q) => q.tags)));
      setAvailableTags(tags.sort());
      // If previously selected tags are no longer available for this selection, drop them.
      // IMPORTANT: avoid returning a new array when nothing changes, otherwise this effect
      // will loop forever (since it depends on `selectedTags`).
      setSelectedTags((prev) => {
        const next = prev.filter((t) => tags.includes(t));
        if (next.length === prev.length && next.every((t, i) => t === prev[i])) {
          return prev;
        }
        return next;
      });

      const effectiveSelectedTags = selectedTags.length
        ? selectedTags.filter((t) => tags.includes(t))
        : [];

      const due = await repository.getDueQuestions({
        languages: [selectedLanguage],
        difficulties: [selectedDifficulty],
        tags: effectiveSelectedTags.length ? effectiveSelectedTags : undefined,
      });
      setDueCount(due.length);

      const unseen = await repository.getNewQuestions({
        languages: [selectedLanguage],
        difficulties: [selectedDifficulty],
        tags: effectiveSelectedTags.length ? effectiveSelectedTags : undefined,
      });
      setNewCount(unseen.length);
    };

    loadSessionMetadata();
  }, [isReady, selectedLanguage, selectedDifficulty, selectedTags, repository]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredTags = useMemo(() => {
    const q = tagQuery.trim().toLowerCase();
    if (!q) return availableTags;
    return availableTags.filter((t) => t.toLowerCase().includes(q));
  }, [availableTags, tagQuery]);

  // Close topic picker on Esc.
  useEffect(() => {
    if (!isTopicPickerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsTopicPickerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isTopicPickerOpen]);

  const startSessionUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("lang", selectedLanguage);
    params.set("diff", selectedDifficulty);
    if (selectedTags.length) params.set("tags", selectedTags.join(","));
    params.set("len", String(sessionLength));
    if (sessionMode === "due") params.set("mode", "due");
    return `/practice?${params.toString()}`;
  }, [selectedLanguage, selectedDifficulty, selectedTags, sessionLength, sessionMode]);

  // Important for SEO: `/` is now server-rendered. This is only the interactive dashboard.
  if (!isReady) {
    return (
      <section
        className="p-6 md:p-8 border-t border-gray-100 dark:border-gray-800"
        aria-label="RecallDev dashboard"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-40 bg-gray-100 dark:bg-gray-800 rounded" />
          <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
          <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
        </div>
        <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
          Loading your library…
        </p>
      </section>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 transition-colors duration-300">
      <header className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-4">
          <BrainCircuit size={32} />
          <span className="text-xl font-black tracking-tighter">
            RecallDev v2
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Your dashboard
        </h2>
      </header>

      <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800/50">
            <span className="block text-2xl font-black text-blue-600 dark:text-blue-400">
              {stats?.totalQuestionsSeen || 0}
            </span>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Seen
            </span>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-100 dark:border-green-800/50">
            <span className="block text-2xl font-black text-green-600 dark:text-green-400">
              {stats?.masteryPercentage || 0}%
            </span>
            <span className="text-xs font-bold text-green-400 uppercase tracking-widest">
              Mastery
            </span>
          </div>
        </div>

        {/* Configuration Section */}
        <section className="space-y-6">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <Code2 size={16} /> Language
            </label>
            <div className="flex flex-wrap gap-2">
              {availableLanguages.length > 0 ? (
                availableLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-2 rounded-xl font-bold transition-all ${
                      selectedLanguage === lang
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {lang}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-400">Loading languages...</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <Settings2 size={16} /> Seniority
            </label>
            <div className="flex flex-wrap gap-2">
              {availableDifficulties.length > 0 ? (
                availableDifficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-4 py-2 rounded-xl font-bold transition-all ${
                      selectedDifficulty === diff
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {diff}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-400">Loading levels...</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <Layers size={16} /> Topics (Optional)
            </label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {selectedTags.length ? `${selectedTags.length} selected` : "All topics"}
                  </span>
                  {selectedTags.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedTags.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700"
                        >
                          {t}
                        </span>
                      ))}
                      {selectedTags.length > 5 ? (
                        <span className="px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700">
                          +{selectedTags.length - 5} more
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setIsTopicPickerOpen(true)}
                  className="shrink-0 px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-black hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Choose topics
                </button>
              </div>
              {selectedTags.length ? (
                <button
                  type="button"
                  onClick={() => setSelectedTags([])}
                  className="self-start px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Clear topics
                </button>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <Play size={16} /> Session Length
            </label>
            <div className="flex flex-wrap gap-2">
              {[5, 10, 15].map((n) => (
                <button
                  key={n}
                  onClick={() => setSessionLength(n)}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${
                    sessionLength === n
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {n}Q
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <Play size={16} /> Session Mode
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSessionMode("mix")}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  sessionMode === "mix"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Due + New
              </button>
              <button
                type="button"
                onClick={() => setSessionMode("due")}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  sessionMode === "due"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Due-only
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Due-only sessions contain only questions scheduled for review. You can opt into extra practice when you’re caught up.
            </p>
          </div>
        </section>
      </main>

      <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
        <Link
          href={startSessionUrl}
          className={`group relative flex items-center justify-between w-full p-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98] ${
            availableLanguages.length === 0
              ? "opacity-50 pointer-events-none"
              : ""
          }`}
        >
          <div className="flex flex-col items-start">
            <span className="flex items-center gap-2 text-lg">
              Start Practice <Play size={20} fill="currentColor" />
            </span>
            <span className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-1">
              {dueCount > 0
                ? `${dueCount} Questions Due Now`
                : newCount > 0
                  ? `${newCount} New Questions Available`
                  : "All Caught Up"}
            </span>
          </div>
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/progress"
          className="flex items-center justify-center gap-2 w-full mt-4 p-4 text-gray-500 dark:text-gray-400 font-bold hover:text-blue-600 transition-colors"
        >
          <BarChart3 size={18} /> Detailed Analytics
        </Link>
      </div>

      {isTopicPickerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Choose topics"
          onMouseDown={() => setIsTopicPickerOpen(false)}
        >
          <div
            className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 rounded-t-3xl shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Topics
                  </p>
                  <h3 className="mt-1 text-lg font-black text-gray-900 dark:text-white">
                    Choose topics
                  </h3>
                  <p className="mt-1 text-xs font-bold text-gray-500 dark:text-gray-400">
                    {selectedTags.length ? `${selectedTags.length} selected` : "No topic filter"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTopicPickerOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Done
                </button>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <div className="flex-1">
                  <input
                    value={tagQuery}
                    onChange={(e) => setTagQuery(e.currentTarget.value)}
                    placeholder="Search topics…"
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    aria-label="Search topics"
                  />
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedTags([])}
                    disabled={selectedTags.length === 0}
                    className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
                      selectedTags.length === 0
                        ? "opacity-50 pointer-events-none bg-transparent border-gray-200 dark:border-gray-700 text-gray-400"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    Clear
                  </button>
                  {availableTags.length > 0 && availableTags.length <= 60 ? (
                    <button
                      type="button"
                      onClick={() => setSelectedTags(availableTags)}
                      disabled={selectedTags.length === availableTags.length}
                      className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
                        selectedTags.length === availableTags.length
                          ? "opacity-50 pointer-events-none bg-transparent border-gray-200 dark:border-gray-700 text-gray-400"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      All
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="p-5 overflow-y-auto max-h-[calc(85vh-180px)]">
              {availableTags.length > 0 ? (
                filteredTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {filteredTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedTags.includes(tag)
                            ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                            : "bg-transparent border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                        aria-pressed={selectedTags.includes(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    No topics match “{tagQuery.trim()}”.
                  </span>
                )
              ) : (
                <span className="text-xs text-gray-400 italic">
                  No topics found for this selection.
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



