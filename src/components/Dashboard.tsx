'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { DecisionProfile } from './DecisionProfile';
import { AICoach } from './AICoach';
import { BookOpen, Sparkles, CheckCircle, ShieldAlert, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { translations } from '@/utils/translations';

interface DashboardProps {
  onSelectGame: (gameId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectGame }) => {
  const { xp, completedGames, achievements, language } = useGame();
  const t = translations[language];

  // Simple level system: level starts at 1, increases every 100 XP
  const level = Math.floor(xp / 100) + 1;
  const xpInCurrentLevel = xp % 100;
  const levelName = t.dashboard.levels[Math.min(level - 1, t.dashboard.levels.length - 1)];

  // Dynamic games array using active translations
  const gamesList = [
    {
      id: 'prisoners_dilemma',
      title: t.dashboard.games.pd_title,
      difficulty: t.dashboard.easy,
      duration: t.dashboard.min_3,
      desc: t.dashboard.games.pd_desc,
      concepts: t.dashboard.games.pd_c,
      color: 'from-blue-600 to-indigo-700',
      icon: '🤝',
    },
    {
      id: 'chicken',
      title: t.dashboard.games.ch_title,
      difficulty: t.dashboard.medium,
      duration: t.dashboard.min_5,
      desc: t.dashboard.games.ch_desc,
      concepts: t.dashboard.games.ch_c,
      color: 'from-teal-500 to-emerald-600',
      icon: '🏎️',
    },
    {
      id: 'ultimatum',
      title: t.dashboard.games.ul_title,
      difficulty: t.dashboard.easy,
      duration: t.dashboard.min_4,
      desc: t.dashboard.games.ul_desc,
      concepts: t.dashboard.games.ul_c,
      color: 'from-amber-500 to-orange-600',
      icon: '⚖️',
    },
  ];

  // Dynamic achievements array using active translations
  const achievementsList = [
    { id: 'first_decision', title: t.dashboard.badges.first_decision_t, desc: t.dashboard.badges.first_decision_d, icon: '🎯' },
    { id: 'rational_thinker', title: t.dashboard.badges.rational_thinker_t, desc: t.dashboard.badges.rational_thinker_d, icon: '🧠' },
    { id: 'risk_taker', title: t.dashboard.badges.risk_taker_t, desc: t.dashboard.badges.risk_taker_d, icon: '⚡' },
    { id: 'cooperation_master', title: t.dashboard.badges.cooperation_master_t, desc: t.dashboard.badges.cooperation_master_d, icon: '🤝' },
    { id: 'fair_dealer', title: t.dashboard.badges.fair_dealer_t, desc: t.dashboard.badges.fair_dealer_d, icon: '⚖️' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Welcome Banner */}
      <div className="bg-bg-card border border-border-main rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-main/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-text-main flex items-center gap-2">
            {t.dashboard.welcome} <Sparkles className="w-6 h-6 text-accent-main animate-pulse" />
          </h1>
          <p className="text-sm text-text-muted">
            {t.dashboard.level} {level}: <strong className="text-primary-main">{levelName}</strong>
          </p>
        </div>

        {/* Level Progress */}
        <div className="w-full md:w-80 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-text-muted">{t.dashboard.progress}</span>
            <span className="text-text-main">{xpInCurrentLevel}/100 XP</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-800 border border-slate-700/50 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-main to-secondary-main rounded-full transition-all duration-300"
              style={{ width: `${xpInCurrentLevel}%` }}
            />
          </div>
          <p className="text-[10px] text-text-muted text-right">
            {t.dashboard.progress_sub}
          </p>
        </div>
      </div>

      {/* Game Decks Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-border-main/50">
          <BookOpen className="w-5 h-5 text-secondary-main" />
          <h2 className="text-xl font-bold font-outfit text-text-main">{t.dashboard.scenarios_section}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gamesList.map((game, index) => {
            const isCompleted = completedGames.includes(game.id);

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => onSelectGame(game.id)}
                className="group bg-bg-card hover:bg-bg-card-hover border border-border-main hover:border-primary-main/40 rounded-2xl p-6 shadow-md hover:shadow-xl hover:shadow-primary-main/5 transition-all flex flex-col justify-between h-full relative overflow-hidden cursor-pointer"
              >
                {/* Visual completion ribbon */}
                {isCompleted && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" /> {t.dashboard.completed}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Game Icon / Header */}
                  <div className="w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-primary-main/10 flex items-center justify-center text-2xl transition-colors border border-border-main">
                    {game.icon}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold font-outfit text-text-main group-hover:text-primary-main transition-colors">
                      {game.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] text-text-muted font-semibold">
                      <span className="flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-accent-main" /> {game.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {game.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed">
                    {game.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border-main/50 space-y-2">
                  <p className="text-[10px] uppercase font-bold text-text-muted tracking-wider">{t.dashboard.concepts_learned}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {game.concepts.map((concept, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[9px] font-semibold bg-slate-800 text-text-muted px-2 py-0.5 rounded-md border border-slate-700/60"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Decision Profile and AI Coach Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DecisionProfile />
        <AICoach />
      </div>

      {/* Progress System - Achievements & Badges */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-border-main/50">
          <Award className="w-5 h-5 text-accent-main" />
          <h2 className="text-xl font-bold font-outfit text-text-main">{t.dashboard.achievements_section}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {achievementsList.map((badge) => {
            const unlocked = achievements.find((a) => a.id === badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  unlocked
                    ? 'bg-bg-card border-accent-main/30 text-text-main shadow-lg shadow-accent-main/5 scale-[1.02]'
                    : 'bg-bg-card/40 border-border-main/40 text-text-muted opacity-50 grayscale'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2.5 ${
                    unlocked ? 'bg-accent-main/10 border border-accent-main/30' : 'bg-slate-800 border border-slate-700/50'
                  }`}
                >
                  {badge.icon}
                </div>
                <h4 className="text-xs font-bold font-outfit text-text-main">
                  {badge.title}
                </h4>
                <p className="text-[10px] text-text-muted mt-1 leading-tight">
                  {badge.desc}
                </p>
                {unlocked && (
                  <span className="text-[8px] font-bold text-accent-main mt-2 uppercase">
                    {t.dashboard.unlocked}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

