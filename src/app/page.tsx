'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Dashboard } from '@/components/Dashboard';
import { PrisonersDilemma } from '@/components/games/PrisonersDilemma';
import { ChickenGame } from '@/components/games/ChickenGame';
import { UltimatumGame } from '@/components/games/UltimatumGame';
import { useGame } from '@/context/GameContext';
import { translations } from '@/utils/translations';
import { Gamepad2, TrendingUp, Compass, UserCheck, Sparkles, ArrowRight, Globe, Sun, Moon } from 'lucide-react';

type AppView = 'landing' | 'dashboard' | 'game';

export default function Home() {
  const [view, setView] = useState<AppView>('landing');
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const { language, toggleLanguage, theme, toggleTheme } = useGame();
  const t = translations[language];

  const handleSelectGame = (gameId: string) => {
    setActiveGameId(gameId);
    setView('game');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
    setActiveGameId(null);
  };

  // Features list below Hero
  const features = [
    {
      title: t.landing.scenarios_title,
      desc: t.landing.scenarios_desc,
      icon: <Gamepad2 className="w-6 h-6 text-primary-main" />,
    },
    {
      title: t.landing.sims_title,
      desc: t.landing.sims_desc,
      icon: <TrendingUp className="w-6 h-6 text-secondary-main" />,
    },
    {
      title: t.landing.concepts_title,
      desc: t.landing.concepts_desc,
      icon: <Compass className="w-6 h-6 text-accent-main" />,
    },
    {
      title: t.landing.decisions_title,
      desc: t.landing.decisions_desc,
      icon: <UserCheck className="w-6 h-6 text-primary-main" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Show Navbar on Dashboard and Games */}
      {view !== 'landing' && <Navbar />}

      {/* Landing Settings Header */}
      {view === 'landing' && (
        <header className="absolute top-0 right-0 p-6 z-20 flex gap-3 items-center">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-xl hover:bg-slate-800/80 light:hover:bg-slate-200/80 border border-transparent hover:border-border-main transition-all flex items-center gap-1.5 text-xs font-bold text-text-muted hover:text-text-main cursor-pointer"
            title="Switch Language / Dili Değiştir"
          >
            <Globe className="w-4.5 h-4.5" />
            <span className="uppercase">{language}</span>
          </button>

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
        </header>
      )}

      <main className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative py-20 px-6 sm:px-12 flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] overflow-hidden"
            >
              {/* Background abstract decorations */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-main/10 rounded-full filter blur-3xl pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-main/10 rounded-full filter blur-3xl pointer-events-none" />

              <div className="max-w-4xl text-center space-y-8 relative z-10">
                {/* Micro-badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700/60 text-xs text-text-muted"
                >
                  <Sparkles className="w-3.5 h-3.5 text-accent-main animate-pulse" />
                  <span>{t.landing.badge}</span>
                </motion.div>

                {/* Hero Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl sm:text-6xl font-extrabold tracking-tight font-outfit text-white light:text-slate-900 leading-tight"
                >
                  {t.landing.title_main} <br />
                  <span className="bg-gradient-to-r from-primary-main via-secondary-main to-accent-main bg-clip-text text-transparent">
                    {t.landing.title_gradient}
                  </span>
                </motion.h1>

                {/* Hero Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-2xl mx-auto text-base sm:text-lg text-text-muted leading-relaxed"
                >
                  {t.landing.subtitle}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center"
                >
                  <button
                    onClick={() => setView('dashboard')}
                    className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-primary-main to-secondary-main text-white font-bold text-base py-4 px-8 rounded-2xl shadow-xl shadow-primary-main/20 hover:shadow-primary-main/40 transition-all scale-100 hover:scale-[1.03] active:scale-95 cursor-pointer"
                  >
                    {t.landing.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                {/* Feature cards grid */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-border-main/20 mt-16 text-left"
                >
                  {features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="bg-bg-card/60 border border-border-main/50 rounded-2xl p-5 space-y-3 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center border border-border-main/40">
                        {feat.icon}
                      </div>
                      <h3 className="text-sm font-bold font-outfit text-text-main">{feat.title}</h3>
                      <p className="text-xs text-text-muted leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard onSelectGame={handleSelectGame} />
            </motion.div>
          )}

          {view === 'game' && activeGameId === 'prisoners_dilemma' && (
            <motion.div
              key="prisoners_dilemma"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PrisonersDilemma onBack={handleBackToDashboard} />
            </motion.div>
          )}

          {view === 'game' && activeGameId === 'chicken' && (
            <motion.div
              key="chicken"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ChickenGame onBack={handleBackToDashboard} />
            </motion.div>
          )}

          {view === 'game' && activeGameId === 'ultimatum' && (
            <motion.div
              key="ultimatum"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <UltimatumGame onBack={handleBackToDashboard} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
