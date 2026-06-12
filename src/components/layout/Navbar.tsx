'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { Trophy, Sun, Moon, RotateCcw, Award, Globe } from 'lucide-react';
import { translations } from '@/utils/translations';

export const Navbar: React.FC = () => {
  const { xp, achievements, theme, language, toggleTheme, toggleLanguage, resetProgress } = useGame();
  const t = translations[language];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-main glassmorphism px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-main to-secondary-main flex items-center justify-center shadow-lg shadow-primary-main/20">
          <span className="text-xl font-bold text-white">G</span>
        </div>
        <div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent dark:from-white dark:to-slate-400 light:from-slate-900 light:to-slate-600 font-outfit">
            Game Theory
          </span>
          <span className="ml-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary-main/20 text-secondary-main border border-secondary-main/30">
            {t.navbar.playground}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* XP Status */}
        <div className="flex items-center gap-2 bg-slate-800/40 border border-slate-700/50 light:bg-slate-200/50 light:border-slate-300 px-3.5 py-1.5 rounded-full">
          <Award className="w-4 h-4 text-accent-main animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            {xp} <span className="text-[10px] text-text-muted">XP</span>
          </span>
        </div>

        {/* Achievements Status */}
        <div className="flex items-center gap-2 bg-slate-800/40 border border-slate-700/50 light:bg-slate-200/50 light:border-slate-300 px-3.5 py-1.5 rounded-full">
          <Trophy className="w-4 h-4 text-accent-main" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            {achievements.length}{' '}
            <span className="text-[10px] text-text-muted uppercase">{t.navbar.badges}</span>
          </span>
        </div>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-xl hover:bg-slate-800/80 light:hover:bg-slate-200/80 border border-transparent hover:border-border-main transition-all flex items-center gap-1.5 text-xs font-bold text-text-muted hover:text-text-main cursor-pointer"
          title="Switch Language / Dili Değiştir"
        >
          <Globe className="w-4.5 h-4.5" />
          <span className="uppercase">{language}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-slate-800/80 light:hover:bg-slate-200/80 border border-transparent hover:border-border-main transition-all cursor-pointer"
          title="Toggle Light/Dark Mode"
        >
          {theme === 'dark' ? (
            <Sun className="w-4.5 h-4.5 text-accent-main" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-primary-main" />
          )}
        </button>

        {/* Reset Progress */}
        <button
          onClick={() => {
            if (confirm(t.navbar.reset_confirm)) {
              resetProgress();
            }
          }}
          className="p-2 rounded-xl hover:bg-red-500/10 text-text-muted hover:text-red-500 border border-transparent transition-all cursor-pointer"
          title="Reset Progress"
        >
          <RotateCcw className="w-4.5 h-4.5" />
        </button>
      </div>
    </nav>
  );
};
export default Navbar;

