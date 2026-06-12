'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Shield, AlertTriangle, HelpCircle, ChevronDown, Award } from 'lucide-react';
import { translations } from '@/utils/translations';

interface PrisonersDilemmaProps {
  onBack: () => void;
}

type Choice = 'Silent' | 'Betray';
type Outcome = 'both_silent' | 'you_betray' | 'partner_betrays' | 'both_betray';

export const PrisonersDilemma: React.FC<PrisonersDilemmaProps> = ({ onBack }) => {
  const { recordDecision, completeGame, addXP, language } = useGame();
  const t = translations[language];
  const [choice, setChoice] = useState<Choice | null>(null);
  const [partnerChoice, setPartnerChoice] = useState<Choice | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hoveredCell, setHoveredCell] = useState<{ row: Choice; col: Choice } | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [theoryRead, setTheoryRead] = useState<string[]>([]);

  // Interrogation outcome details
  const getOutcomeDetails = (user: Choice, partner: Choice) => {
    if (user === 'Silent' && partner === 'Silent') {
      return {
        id: 'both_silent' as Outcome,
        title: t.pd.outcomes.solidarity_t,
        desc: t.pd.outcomes.solidarity_d,
        userSentence: `1 ${t.pd.sentences.year}`,
        partnerSentence: `1 ${t.pd.sentences.year}`,
        verdict: t.pd.outcomes.solidarity_v,
        cooperative: true,
      };
    } else if (user === 'Betray' && partner === 'Silent') {
      return {
        id: 'you_betray' as Outcome,
        title: t.pd.outcomes.temptation_t,
        desc: t.pd.outcomes.temptation_d,
        userSentence: t.pd.sentences.free,
        partnerSentence: `10 ${t.pd.sentences.years}`,
        verdict: t.pd.outcomes.temptation_v,
        cooperative: false,
      };
    } else if (user === 'Silent' && partner === 'Betray') {
      return {
        id: 'partner_betrays' as Outcome,
        title: t.pd.outcomes.betrayed_t,
        desc: t.pd.outcomes.betrayed_d,
        userSentence: `10 ${t.pd.sentences.years}`,
        partnerSentence: t.pd.sentences.free,
        verdict: t.pd.outcomes.betrayed_v,
        cooperative: true,
      };
    } else {
      return {
        id: 'both_betray' as Outcome,
        title: t.pd.outcomes.tragedy_t,
        desc: t.pd.outcomes.tragedy_d,
        userSentence: `5 ${t.pd.sentences.years}`,
        partnerSentence: `5 ${t.pd.sentences.years}`,
        verdict: t.pd.outcomes.tragedy_v,
        cooperative: false,
      };
    }
  };

  const handleChoice = (selectedChoice: Choice) => {
    setChoice(selectedChoice);
    // Random partner decision with bias to make it interesting
    const partner = Math.random() < 0.6 ? 'Betray' : 'Silent';
    setPartnerChoice(partner);
    setIsPlaying(false);

    const details = getOutcomeDetails(selectedChoice, partner);
    recordDecision({
      gameId: 'prisoners_dilemma',
      choice: selectedChoice,
      outcome: details.title,
      cooperative: details.cooperative,
      riskLevel: selectedChoice === 'Betray' ? 8 : 3,
      fairness: selectedChoice === 'Silent' ? 9 : 1,
    });
    completeGame('prisoners_dilemma');
  };

  const resetGame = () => {
    setChoice(null);
    setPartnerChoice(null);
    setIsPlaying(true);
  };

  const handleReadTheory = (topic: string) => {
    if (!theoryRead.includes(topic)) {
      setTheoryRead((prev) => [...prev, topic]);
      addXP(20); // +20 XP for reading theory
    }
    setActiveAccordion(activeAccordion === topic ? null : topic);
  };

  const currentOutcome = choice && partnerChoice ? getOutcomeDetails(choice, partnerChoice) : null;

  const accordionData = [
    {
      id: 'rational',
      title: t.pd.theory.rational_t,
      definition: t.pd.theory.rational_def,
      example: t.pd.theory.rational_ex,
      application: t.pd.theory.rational_app,
    },
    {
      id: 'dominant',
      title: t.pd.theory.dominant_t,
      definition: t.pd.theory.dominant_def,
      example: t.pd.theory.dominant_ex,
      application: t.pd.theory.dominant_app,
    },
    {
      id: 'nash',
      title: t.pd.theory.nash_t,
      definition: t.pd.theory.nash_def,
      example: t.pd.theory.nash_ex,
      application: t.pd.theory.nash_app,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-text-muted hover:text-text-main mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.pd.back}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Play Space */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-bg-card border border-border-main rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-main/5 rounded-full filter blur-3xl pointer-events-none" />

            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-main/10 text-primary-main border border-primary-main/20">
                {t.dashboard.games.pd_title}
              </span>
              <span className="text-xs text-text-muted">{t.pd.diff}</span>
            </div>

            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold font-outfit">{t.pd.story_title}</h2>
                  <p className="text-text-muted leading-relaxed">
                    {t.pd.story_1}
                  </p>
                  <p className="text-text-muted leading-relaxed">
                    {t.pd.story_2}
                  </p>

                  <div className="pt-4 border-t border-border-main/50 space-y-3">
                    <p className="text-sm font-semibold text-text-main">{t.pd.choice_prompt}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleChoice('Silent')}
                        onMouseEnter={() => setHoveredCell({ row: 'Silent', col: 'Silent' })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className="flex flex-col items-center justify-center p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-emerald-400 font-semibold transition-all group cursor-pointer"
                      >
                        <Shield className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                        <span>{t.pd.silent_btn}</span>
                        <span className="text-[10px] text-emerald-500/70 font-normal mt-1">{t.pd.silent_sub}</span>
                      </button>

                      <button
                        onClick={() => handleChoice('Betray')}
                        onMouseEnter={() => setHoveredCell({ row: 'Betray', col: 'Betray' })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className="flex flex-col items-center justify-center p-5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 text-red-400 font-semibold transition-all group cursor-pointer"
                      >
                        <AlertTriangle className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                        <span>{t.pd.betray_btn}</span>
                        <span className="text-[10px] text-red-500/70 font-normal mt-1">{t.pd.betray_sub}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="outcome"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-border-main/50">
                    <h3 className="text-xl font-bold font-outfit text-accent-main">
                      {currentOutcome?.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <span className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                        {language === 'en' ? 'You chose' : 'Seçiminiz'}: <strong>{choice === 'Silent' ? t.pd.silent_btn : t.pd.betray_btn}</strong>
                      </span>
                      <span className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                        {language === 'en' ? 'Partner chose' : 'Ortak'}: <strong>{partnerChoice === 'Silent' ? t.pd.silent_btn : t.pd.betray_btn}</strong>
                      </span>
                    </div>
                  </div>

                  <p className="text-text-muted leading-relaxed">{currentOutcome?.desc}</p>

                  {/* Results cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-800/40 light:bg-slate-100 rounded-xl border border-border-main text-center">
                      <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                        {language === 'en' ? 'Your Sentence' : 'Cezanız'}
                      </p>
                      <p className="text-lg font-extrabold text-white dark:text-white light:text-slate-900 mt-1">
                        {currentOutcome?.userSentence}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-800/40 light:bg-slate-100 rounded-xl border border-border-main text-center">
                      <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                        {language === 'en' ? "Partner's Sentence" : 'Ortağın Cezası'}
                      </p>
                      <p className="text-lg font-extrabold text-white dark:text-white light:text-slate-900 mt-1">
                        {currentOutcome?.partnerSentence}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-primary-main/10 border border-primary-main/20 rounded-xl">
                    <p className="text-xs font-bold text-primary-main flex items-center gap-1.5 uppercase">
                      <Award className="w-3.5 h-3.5" /> {t.pd.verdict}
                    </p>
                    <p className="text-sm font-medium mt-1">{currentOutcome?.verdict}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={resetGame}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-border-main text-sm font-semibold transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4 rotate-180" /> {t.pd.play_again}
                    </button>
                    <a
                      href="#theory-section"
                      className="flex-1 flex items-center justify-center py-3 px-6 rounded-xl bg-primary-main hover:bg-primary-main/90 text-white text-sm font-semibold shadow-lg shadow-primary-main/20 transition-all cursor-pointer"
                    >
                      {t.pd.explore_theory}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Matrix Visualization */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-bg-card border border-border-main rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-4 font-outfit text-text-main flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-secondary-main" /> {t.pd.matrix_title}
            </h3>
            <p className="text-xs text-text-muted mb-4">
              {t.pd.matrix_desc}
            </p>

            {/* Matrix table structure */}
            <div className="relative overflow-x-auto select-none mt-4">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 w-1/4"></th>
                    <th className="p-2 w-3/8 text-xs font-bold text-text-muted uppercase bg-slate-800/20 light:bg-slate-100/50 rounded-t-xl" colSpan={2}>
                      {t.pd.partner_side}
                    </th>
                  </tr>
                  <tr className="border-b border-border-main/30">
                    <th className="p-2 w-1/4 text-[10px] text-text-muted uppercase">{t.pd.your_strategy}</th>
                    <th className="p-3 w-3/8 text-xs font-semibold text-emerald-400">{t.pd.silent_btn}</th>
                    <th className="p-3 w-3/8 text-xs font-semibold text-red-400">{t.pd.betray_btn}</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1: Silent */}
                  <tr>
                    <td className="p-3 text-xs font-semibold text-emerald-400 border-r border-border-main/30 text-left">
                      {t.pd.silent_btn}
                    </td>
                    {/* Silent-Silent Cell */}
                    <td
                      className={`p-4 border border-border-main/30 transition-all rounded-lg ${
                        (choice === 'Silent' && partnerChoice === 'Silent') ||
                        (hoveredCell?.row === 'Silent' && hoveredCell?.col === 'Silent')
                          ? 'bg-emerald-500/20 scale-[1.02] shadow-md border-emerald-500/60'
                          : 'bg-slate-800/10 hover:bg-slate-800/30'
                      }`}
                    >
                      <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">1 {t.pd.sentences.year}</div>
                      <div className="text-[10px] text-text-muted">1 {t.pd.sentences.year}</div>
                    </td>
                    {/* Silent-Betray Cell */}
                    <td
                      className={`p-4 border border-border-main/30 transition-all rounded-lg ${
                        (choice === 'Silent' && partnerChoice === 'Betray') ||
                        (hoveredCell?.row === 'Silent' && hoveredCell?.col === 'Betray')
                          ? 'bg-red-500/20 scale-[1.02] shadow-md border-red-500/60'
                          : 'bg-slate-800/10 hover:bg-slate-800/30'
                      }`}
                    >
                      <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">10 {t.pd.sentences.years}</div>
                      <div className="text-[10px] text-text-muted">0 {t.pd.sentences.years}</div>
                    </td>
                  </tr>

                  {/* Row 2: Betray */}
                  <tr>
                    <td className="p-3 text-xs font-semibold text-red-400 border-r border-border-main/30 text-left">
                      {t.pd.betray_btn}
                    </td>
                    {/* Betray-Silent Cell */}
                    <td
                      className={`p-4 border border-border-main/30 transition-all rounded-lg ${
                        (choice === 'Betray' && partnerChoice === 'Silent') ||
                        (hoveredCell?.row === 'Betray' && hoveredCell?.col === 'Silent')
                          ? 'bg-emerald-500/20 scale-[1.02] shadow-md border-emerald-500/60'
                          : 'bg-slate-800/10 hover:bg-slate-800/30'
                      }`}
                    >
                      <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">0 {t.pd.sentences.years}</div>
                      <div className="text-[10px] text-text-muted">10 {t.pd.sentences.years}</div>
                    </td>
                    {/* Betray-Betray Cell */}
                    <td
                      className={`p-4 border border-border-main/30 transition-all rounded-lg ${
                        (choice === 'Betray' && partnerChoice === 'Betray') ||
                        (hoveredCell?.row === 'Betray' && hoveredCell?.col === 'Betray')
                          ? 'bg-red-500/20 scale-[1.02] shadow-md border-red-500/60'
                          : 'bg-slate-800/10 hover:bg-slate-800/30'
                      }`}
                    >
                      <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">5 {t.pd.sentences.years}</div>
                      <div className="text-[10px] text-text-muted">5 {t.pd.sentences.years}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-slate-800/40 light:bg-slate-100 rounded-lg text-[10px] text-text-muted flex justify-between">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 bg-emerald-500/20 border border-emerald-500/50 rounded-sm" />
                {t.pd.coop_zone}
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 bg-red-500/20 border border-red-500/50 rounded-sm" />
                {t.pd.nash_zone}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Accordion Section */}
      <div id="theory-section" className="mt-12 space-y-6 scroll-mt-24">
        <div className="border-b border-border-main/50 pb-3 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold font-outfit text-text-main">{t.pd.what_happened}</h2>
          <span className="text-xs text-secondary-main font-semibold bg-secondary-main/10 px-2 py-0.5 rounded border border-secondary-main/20">
            {t.pd.theory_xp}
          </span>
        </div>

        <div className="space-y-4">
          {accordionData.map((item) => {
            const isOpened = activeAccordion === item.id;
            const hasRead = theoryRead.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-bg-card border border-border-main rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => handleReadTheory(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-text-main hover:bg-bg-card-hover/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        hasRead ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-text-muted'
                      }`}
                    >
                      {hasRead ? '✓' : '?'}
                    </span>
                    <span className="font-outfit text-lg">{item.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-text-muted transition-transform duration-300 ${
                      isOpened ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpened && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-border-main/50 bg-slate-900/40"
                    >
                      <div className="p-6 space-y-4 text-sm leading-relaxed">
                        <div>
                          <p className="text-xs font-semibold text-secondary-main uppercase tracking-wider">
                            {language === 'en' ? 'Definition' : 'Tanım'}
                          </p>
                          <p className="text-text-main mt-1 font-medium">{item.definition}</p>
                        </div>
                        <div className="p-4 bg-slate-800/30 rounded-lg border border-border-main/50">
                          <p className="text-xs font-semibold text-accent-main uppercase tracking-wider">
                            {language === 'en' ? 'Applying to This Game' : 'Bu Oyuna Uygulanışı'}
                          </p>
                          <p className="text-text-muted mt-1">{item.example}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-primary-main uppercase tracking-wider">
                            {language === 'en' ? 'Real-World Application' : 'Gerçek Hayattaki Karşılığı'}
                          </p>
                          <p className="text-text-muted mt-1">{item.application}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default PrisonersDilemma;
