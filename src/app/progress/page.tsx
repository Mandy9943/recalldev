'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useInterview } from '@/context/InterviewContext';
import { UserStats } from '@/types';
import { 
  ArrowLeft, 
  TrendingUp, 
  Brain, 
  History,
  CheckCircle2,
  BookOpen,
  Calendar
} from 'lucide-react';

export default function ProgressPage() {
  const { repository, stats, refreshStats, isReady } = useInterview();
  const [localStats, setLocalStats] = useState<UserStats | null>(null);

  useEffect(() => {
    if (isReady) {
      repository.getStats().then(setLocalStats);
    }
  }, [isReady, repository]);

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  if (!isReady || !localStats) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4 sticky top-0 z-10 transition-colors duration-300">
        <Link href="/" className="p-2 -ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Your Mastery</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
        
        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl border border-blue-100 dark:border-blue-800/50 flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-800/50 rounded-2xl text-blue-600 dark:text-blue-400 mb-4">
              <BookOpen size={24} />
            </div>
            <span className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-1">{localStats.totalQuestionsSeen}</span>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Total Seen</span>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-3xl border border-green-100 dark:border-green-800/50 flex flex-col items-center text-center">
            <div className="p-3 bg-green-100 dark:bg-green-800/50 rounded-2xl text-green-600 dark:text-green-400 mb-4">
              <TrendingUp size={24} />
            </div>
            <span className="text-4xl font-black text-green-600 dark:text-green-400 mb-1">{localStats.masteryPercentage}%</span>
            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Mastery Level</span>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-3xl border border-purple-100 dark:border-purple-800/50 flex flex-col items-center text-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-800/50 rounded-2xl text-purple-600 dark:text-purple-400 mb-4">
              <Calendar size={24} />
            </div>
            <span className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-1">{localStats.daysStreak}</span>
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Day Streak</span>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Brain className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How Mastery works</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                RecallDev uses a Spaced Repetition Algorithm. When you mark a question as "Mastered", the interval for the next review increases exponentially. 
                A question is considered part of your "Mastery Level" once its review interval exceeds 7 days.
              </p>
            </div>
          </div>
        </div>

        {/* Categories / Tags Section would go here if we had more stats */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Next Steps</h3>
          <Link 
            href="/"
            className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-sm group"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600">
                <CheckCircle2 size={20} />
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">Keep Practicing</span>
            </div>
            <ArrowLeft className="rotate-180 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        {/* Reset Section */}
        <div className="pt-12 flex flex-col items-center">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-red-500 dark:text-red-400 text-xs font-black uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-900/10 px-6 py-3 rounded-xl transition-colors"
          >
            <History size={16} /> Reset All Data
          </button>
          <p className="text-[10px] text-gray-400 mt-2">Local storage will be cleared immediately.</p>
        </div>
      </main>
    </div>
  );
}
