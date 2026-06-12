'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Flame, ShieldAlert, Award, ChevronDown } from 'lucide-react';
import { translations } from '@/utils/translations';

interface ChickenGameProps {
  onBack: () => void;
}

type Choice = 'Swerve' | 'Continue';
type GameOutcome = 'both_swerve' | 'you_continue' | 'partner_continues' | 'both_continue';

export const ChickenGame: React.FC<ChickenGameProps> = ({ onBack }) => {
  const { recordDecision, completeGame, addXP, language } = useGame();
  const t = translations[language];
  const [choice, setChoice] = useState<Choice | null>(null);
  const [partnerChoice, setPartnerChoice] = useState<Choice | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [theoryRead, setTheoryRead] = useState<string[]>([]);

  const handleChoice = (selectedChoice: Choice) => {
    setIsPlaying(false);
    setIsAnimating(true);
    setChoice(selectedChoice);

    // AI strategy
    const partner = Math.random() < 0.5 ? 'Continue' : 'Swerve';
    setPartnerChoice(partner);

    // Animation timer
    setTimeout(() => {
      setIsAnimating(false);
      const outcome = getOutcome(selectedChoice, partner);
      recordDecision({
        gameId: 'chicken',
        choice: selectedChoice,
        outcome: outcome.title,
        cooperative: selectedChoice === 'Swerve',
        riskLevel: selectedChoice === 'Continue' ? 10 : 2,
        fairness: selectedChoice === 'Swerve' ? 6 : 2,
      });
      completeGame('chicken');
    }, 2500);
  };

  const getOutcome = (user: Choice, partner: Choice) => {
    if (user === 'Swerve' && partner === 'Swerve') {
      return {
        id: 'both_swerve' as GameOutcome,
        title: t.chicken.outcomes.swerve_t,
        desc: t.chicken.outcomes.swerve_d,
        userPayoff: t.chicken.outcomes.swerve_pay_user,
        partnerPayoff: t.chicken.outcomes.swerve_pay_partner,
        verdict: t.chicken.outcomes.swerve_v,
        cooperative: true,
      };
    } else if (user === 'Continue' && partner === 'Swerve') {
      return {
        id: 'you_continue' as GameOutcome,
        title: t.chicken.outcomes.win_t,
        desc: t.chicken.outcomes.win_d,
        userPayoff: t.chicken.outcomes.win_pay_user,
        partnerPayoff: t.chicken.outcomes.win_pay_partner,
        verdict: t.chicken.outcomes.win_v,
        cooperative: false,
      };
    } else if (user === 'Swerve' && partner === 'Continue') {
      return {
        id: 'partner_continues' as GameOutcome,
        title: t.chicken.outcomes.lose_t,
        desc: t.chicken.outcomes.lose_d,
        userPayoff: t.chicken.outcomes.lose_pay_user,
        partnerPayoff: t.chicken.outcomes.lose_pay_partner,
        verdict: t.chicken.outcomes.lose_v,
        cooperative: true,
      };
    } else {
      return {
        id: 'both_continue' as GameOutcome,
        title: t.chicken.outcomes.crash_t,
        desc: t.chicken.outcomes.crash_d,
        userPayoff: t.chicken.outcomes.crash_pay_user,
        partnerPayoff: t.chicken.outcomes.crash_pay_partner,
        verdict: t.chicken.outcomes.crash_v,
        cooperative: false,
      };
    }
  };

  const handleReadTheory = (topic: string) => {
    if (!theoryRead.includes(topic)) {
      setTheoryRead((prev) => [...prev, topic]);
      addXP(20);
    }
    setActiveAccordion(activeAccordion === topic ? null : topic);
  };

  const currentOutcome = choice && partnerChoice && !isAnimating ? getOutcome(choice, partnerChoice) : null;

  const resetGame = () => {
    setChoice(null);
    setPartnerChoice(null);
    setIsPlaying(true);
    setIsAnimating(false);
  };

  const accordionData = [
    {
      id: 'risk',
      title: t.chicken.theory.risk_t,
      definition: t.chicken.theory.risk_def,
      example: t.chicken.theory.risk_ex,
      application: t.chicken.theory.risk_app,
    },
    {
      id: 'credibility',
      title: t.chicken.theory.credibility_t,
      definition: t.chicken.theory.credibility_def,
      example: t.chicken.theory.credibility_ex,
      application: t.chicken.theory.credibility_app,
    },
    {
      id: 'threats',
      title: t.chicken.theory.threats_t,
      definition: t.chicken.theory.threats_def,
      example: t.chicken.theory.threats_ex,
      application: t.chicken.theory.threats_app,
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-main/5 rounded-full filter blur-3xl pointer-events-none" />

            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary-main/10 text-secondary-main border border-secondary-main/20">
                {t.dashboard.games.ch_title}
              </span>
              <span className="text-xs text-text-muted">{t.dashboard.medium}</span>
            </div>

            {isPlaying && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-outfit">{t.chicken.story_title}</h2>
                <p className="text-text-muted leading-relaxed">
                  {t.chicken.story_1}
                </p>
                <p className="text-text-muted leading-relaxed">
                  {t.chicken.story_2}
                </p>

                <div className="pt-4 border-t border-border-main/50 space-y-3">
                  <p className="text-sm font-semibold text-text-main">{t.pd.choice_prompt}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleChoice('Swerve')}
                      className="flex flex-col items-center justify-center p-5 rounded-xl border border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 hover:border-teal-500/40 text-teal-400 font-semibold transition-all group cursor-pointer"
                    >
                      <Play className="w-8 h-8 mb-2 rotate-90 text-teal-400 group-hover:translate-x-[-4px] transition-transform" />
                      <span>{t.chicken.swerve_btn}</span>
                      <span className="text-[10px] text-teal-500/70 font-normal mt-1">{t.chicken.swerve_sub}</span>
                    </button>

                    <button
                      onClick={() => handleChoice('Continue')}
                      className="flex flex-col items-center justify-center p-5 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/40 text-amber-400 font-semibold transition-all group cursor-pointer"
                    >
                      <Flame className="w-8 h-8 mb-2 text-amber-400 group-hover:scale-110 transition-transform animate-pulse" />
                      <span>{t.chicken.continue_btn}</span>
                      <span className="text-[10px] text-amber-500/70 font-normal mt-1">{t.chicken.continue_sub}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Animation state */}
            {isAnimating && (
              <div className="h-64 flex flex-col justify-between items-center bg-slate-950 rounded-xl p-4 border border-border-main relative overflow-hidden">
                <div className="text-xs text-text-muted animate-pulse">{t.chicken.driving}</div>

                {/* Driving Tracks */}
                <div className="w-full h-24 relative bg-slate-900 border-y border-dashed border-slate-700 flex items-center overflow-hidden">
                  <div className="w-full absolute border-t border-dashed border-slate-800" />
                  
                  {/* User Car (left to right) */}
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{
                      x: choice === 'Swerve' ? 140 : 180,
                      y: choice === 'Swerve' ? -25 : 0
                    }}
                    transition={{ duration: 2.2, ease: 'easeIn' }}
                    className="absolute left-4 w-12 h-6 rounded bg-primary-main flex items-center justify-center text-white font-bold text-[10px]"
                  >
                    🚗 {language === 'en' ? 'YOU' : 'SİZ'}
                  </motion.div>

                  {/* Opponent Car (right to left) */}
                  <motion.div
                    initial={{ x: 'calc(100% - 4rem)' }}
                    animate={{
                      x: partnerChoice === 'Swerve' ? 'calc(100% - 14rem)' : 'calc(100% - 18rem)',
                      y: partnerChoice === 'Swerve' ? 25 : 0
                    }}
                    transition={{ duration: 2.2, ease: 'easeIn' }}
                    className="absolute w-12 h-6 rounded bg-red-500 flex items-center justify-center text-white font-bold text-[10px]"
                  >
                    AI 🏎️
                  </motion.div>
                </div>

                <div className="text-xs text-secondary-main tracking-wider animate-bounce">{t.chicken.hold_breath}</div>
              </div>
            )}

            {/* Results Screen */}
            {currentOutcome && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-border-main/50">
                  <h3 className="text-xl font-bold font-outfit text-amber-500">
                    {currentOutcome.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                    <span className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                      {language === 'en' ? 'You' : 'Seçiminiz'}: <strong>{choice === 'Swerve' ? t.chicken.swerve_btn : t.chicken.continue_btn}</strong>
                    </span>
                    <span className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                      {language === 'en' ? 'Rival' : 'Rakip'}: <strong>{partnerChoice === 'Swerve' ? t.chicken.swerve_btn : t.chicken.continue_btn}</strong>
                    </span>
                  </div>
                </div>

                <p className="text-text-muted leading-relaxed">{currentOutcome.desc}</p>

                {/* Score values */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/40 light:bg-slate-100 rounded-xl border border-border-main text-center">
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">{t.chicken.payoff}</p>
                    <p className="text-sm font-extrabold text-white dark:text-white light:text-slate-900 mt-1">
                      {currentOutcome.userPayoff}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-800/40 light:bg-slate-100 rounded-xl border border-border-main text-center">
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                      {language === 'en' ? "Rival's Payoff" : 'Rakibin Kazancı'}
                    </p>
                    <p className="text-sm font-extrabold text-white dark:text-white light:text-slate-900 mt-1">
                      {currentOutcome.partnerPayoff}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-secondary-main/10 border border-secondary-main/20 rounded-xl">
                  <p className="text-xs font-bold text-secondary-main flex items-center gap-1.5 uppercase">
                    <Award className="w-3.5 h-3.5" /> {t.chicken.strategy_analysis}
                  </p>
                  <p className="text-sm font-medium mt-1">{currentOutcome.verdict}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={resetGame}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-border-main text-sm font-semibold transition-all cursor-pointer"
                  >
                    {t.chicken.outcomes.swerve_t === currentOutcome.title ? t.pd.play_again : t.chicken.outcomes.win_t === currentOutcome.title ? t.pd.play_again : t.pd.play_again}
                  </button>
                  <a
                    href="#chicken-theory-section"
                    className="flex-1 flex items-center justify-center py-3 px-6 rounded-xl bg-secondary-main hover:bg-secondary-main/90 text-white text-sm font-semibold shadow-lg shadow-secondary-main/20 transition-all cursor-pointer"
                  >
                    {t.pd.explore_theory}
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Matrix Visualization */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-bg-card border border-border-main rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-4 font-outfit text-text-main flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" /> {t.chicken.grid_title}
            </h3>
            <p className="text-xs text-text-muted mb-4">
              {t.chicken.grid_desc}
            </p>

            <div className="relative overflow-x-auto select-none mt-4">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 w-1/4"></th>
                    <th className="p-2 w-3/8 text-xs font-bold text-text-muted uppercase bg-slate-800/20 light:bg-slate-100/50 rounded-t-xl" colSpan={2}>
                      {t.chicken.grid_side}
                    </th>
                  </tr>
                  <tr className="border-b border-border-main/30">
                    <th className="p-2 w-1/4 text-[10px] text-text-muted uppercase">{t.pd.your_strategy}</th>
                    <th className="p-3 w-3/8 text-xs font-semibold text-teal-400">{t.chicken.swerve_btn}</th>
                    <th className="p-3 w-3/8 text-xs font-semibold text-amber-400">{t.chicken.continue_btn}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 text-xs font-semibold text-teal-400 border-r border-border-main/30 text-left">
                      {t.chicken.swerve_btn}
                    </td>
                    <td
                      className={`p-4 border border-border-main/30 transition-all rounded-lg ${
                        choice === 'Swerve' && partnerChoice === 'Swerve' ? 'bg-teal-500/20 scale-[1.02] border-teal-500/50' : 'bg-slate-800/10'
                      }`}
                    >
                      <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">-1 ({t.chicken.tie})</div>
                      <div className="text-[10px] text-text-muted">-1 ({t.chicken.tie})</div>
                    </td>
                    <td
                      className={`p-4 border border-border-main/30 transition-all rounded-lg ${
                        choice === 'Swerve' && partnerChoice === 'Continue' ? 'bg-red-500/20 scale-[1.02] border-red-500/50' : 'bg-slate-800/10'
                      }`}
                    >
                      <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">-10 ({t.chicken.lose})</div>
                      <div className="text-[10px] text-text-muted">+10 ({t.chicken.win})</div>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 text-xs font-semibold text-amber-400 border-r border-border-main/30 text-left">
                      {t.chicken.continue_btn}
                    </td>
                    <td
                      className={`p-4 border border-border-main/30 transition-all rounded-lg ${
                        choice === 'Continue' && partnerChoice === 'Swerve' ? 'bg-teal-500/20 scale-[1.02] border-teal-500/50' : 'bg-slate-800/10'
                      }`}
                    >
                      <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">+10 ({t.chicken.win})</div>
                      <div className="text-[10px] text-text-muted">-10 ({t.chicken.lose})</div>
                    </td>
                    <td
                      className={`p-4 border border-border-main/30 transition-all rounded-lg ${
                        choice === 'Continue' && partnerChoice === 'Continue' ? 'bg-red-500/30 scale-[1.02] border-red-500/80 animate-pulse' : 'bg-slate-800/10'
                      }`}
                    >
                      <div className="text-xs font-extrabold text-red-500">-100 ({t.chicken.crash})</div>
                      <div className="text-[10px] text-red-500/80">-100 ({t.chicken.crash})</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div id="chicken-theory-section" className="mt-12 space-y-6 scroll-mt-24">
        <div className="border-b border-border-main/50 pb-3 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold font-outfit text-text-main">{t.chicken.understand_risk}</h2>
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
export default ChickenGame;
