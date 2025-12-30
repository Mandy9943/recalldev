"use client";

import { useInterview } from "@/context/InterviewContext";
import { Difficulty, ProgrammingLanguage } from "@/types";
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

  const [selectedLanguage, setSelectedLanguage] =
    useState<ProgrammingLanguage>("JavaScript");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("Senior");

  const [availableLanguages, setAvailableLanguages] = useState<
    ProgrammingLanguage[]
  >([]);
  const [availableDifficulties, setAvailableDifficulties] = useState<
    Difficulty[]
  >([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dueCount, setDueCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

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
    };

    loadGlobalMetadata();
  }, [isReady, repository, selectedLanguage]); // Run only when repo is ready

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

      const due = await repository.getDueQuestions({
        languages: [selectedLanguage],
        difficulties: [selectedDifficulty],
        tags: selectedTags.length ? selectedTags : undefined,
      });
      setDueCount(due.length);

      const unseen = await repository.getNewQuestions({
        languages: [selectedLanguage],
        difficulties: [selectedDifficulty],
        tags: selectedTags.length ? selectedTags : undefined,
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

  const startSessionUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("lang", selectedLanguage);
    params.set("diff", selectedDifficulty);
    if (selectedTags.length) params.set("tags", selectedTags.join(","));
    return `/practice?${params.toString()}`;
  }, [selectedLanguage, selectedDifficulty, selectedTags]);

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
            <div className="flex flex-wrap gap-2">
              {availableTags.length > 0 ? (
                availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                        : "bg-transparent border-gray-200 dark:border-gray-700 text-gray-400"
                    }`}
                  >
                    {tag}
                  </button>
                ))
              ) : (
                <span className="text-xs text-gray-400 italic">
                  No topics found for this selection.
                </span>
              )}
            </div>
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
    </div>
  );
}



