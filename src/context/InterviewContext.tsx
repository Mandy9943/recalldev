'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { 
  IDataRepository, 
  Question, 
  Evaluation, 
  UserStats, 
  ProgrammingLanguage, 
  Difficulty 
} from '@/types';
import { LocalRepository } from '@/lib/repository/LocalRepository';
import { INITIAL_QUESTIONS } from '@/data/seed';

interface InterviewContextType {
  repository: IDataRepository;
  stats: UserStats | null;
  refreshStats: () => Promise<void>;
  isReady: boolean;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export function InterviewProvider({ children }: { children: React.ReactNode }) {
  // We use useMemo to ensure the repository instance is stable
  const repository = useMemo(() => new LocalRepository(), []);
  const [isReady, setIsReady] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    const init = async () => {
      // Load or sync initial questions
      await repository.syncQuestions(INITIAL_QUESTIONS);
      
      const currentStats = await repository.getStats();
      setStats(currentStats);
      setIsReady(true);
    };
    init();
  }, [repository]);

  const refreshStats = async () => {
    const currentStats = await repository.getStats();
    setStats(currentStats);
  };

  return (
    <InterviewContext.Provider value={{ repository, stats, refreshStats, isReady }}>
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
}
