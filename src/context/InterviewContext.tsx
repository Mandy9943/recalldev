"use client";

import { INITIAL_QUESTIONS } from "@/data/seed";
import { LocalRepository } from "@/lib/repository/LocalRepository";
import { IDataRepository, UserStats } from "@/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface InterviewContextType {
  repository: IDataRepository;
  stats: UserStats | null;
  refreshStats: () => Promise<void>;
  isReady: boolean;
}

const InterviewContext = createContext<InterviewContextType | undefined>(
  undefined
);

export function InterviewProvider({ children }: { children: React.ReactNode }) {
  // We use useMemo to ensure the repository instance is stable
  const repository = useMemo(() => new LocalRepository(), []);
  const [isReady, setIsReady] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    const init = async () => {
      // Load any persisted state first (multi-tab friendly)
      await repository.refreshFromStorage();

      // Seed initial questions only if none are present (avoid overwriting user data)
      const existing = await repository.getQuestions({ limit: 1 });
      if (existing.length === 0) {
        await repository.syncQuestions(INITIAL_QUESTIONS);
      }

      const currentStats = await repository.getStats();
      setStats(currentStats);
      setIsReady(true);
    };
    init();
  }, [repository]);

  const refreshStats = useCallback(async () => {
    await repository.refreshFromStorage();
    const currentStats = await repository.getStats();
    setStats(currentStats);
  }, [repository]);

  // Multi-tab: if progress/questions change in another tab, refresh our stats.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (!e.key) return;
      if (
        e.key === "recall_dev_v2_progress" ||
        e.key === "recall_dev_v2_questions"
      ) {
        // Fire and forget; state update will re-render consumers.
        refreshStats();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refreshStats]);

  return (
    <InterviewContext.Provider
      value={{ repository, stats, refreshStats, isReady }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
}
