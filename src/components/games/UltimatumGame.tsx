'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Coins, Scale, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import { translations } from '@/utils/translations';

interface UltimatumGameProps {
  onBack: () => void;
}

export const UltimatumGame: React.FC<UltimatumGameProps> = ({ onBack }) => {
  const { recordDecision, completeGame, addXP, language } = useGame();
  const t = translations[language];
  const [offer, setOffer] = useState<number>(40);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [aiDecision, setAiDecision] = useState<'Accept' | 'Reject' | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [theoryRead, setTheoryRead] = useState<string[]>([]);

  const handleOfferSubmit = () => {
    setIsPlaying(false);
    setIsEvaluating(true);

    // AI acceptance logic based on human behavioral thresholds
    let decision: 'Accept' | 'Reject' = 'Accept';
    const rand = Math.random() * 100;

    if (offer < 20) {
      decision = rand < 95 ? 'Reject' : 'Accept';
    } else if (offer >= 20 && offer < 30) {
      decision = rand < 60 ? 'Reject' : 'Accept';
    } else if (offer >= 30 && offer < 40) {
      decision = rand < 25 ? 'Reject' : 'Accept';
    } else if (offer >= 40 && offer < 50) {
      decision = rand < 5 ? 'Reject' : 'Accept';
    } else {
      decision = 'Accept';
    }

    setTimeout(() => {
      setIsEvaluating(false);
      setAiDecision(decision);

      recordDecision({
        gameId: 'ultimatum',
        choice: language === 'en' ? `Offer $${offer}` : `Teklif $${offer}`,
        outcome: decision === 'Accept' ? (language === 'en' ? 'Offer Accepted' : 'Teklif Kabul Edildi') : (language === 'en' ? 'Offer Rejected' : 'Teklif Reddedildi'),
        cooperative: offer >= 40,
        riskLevel: Math.round((100 - offer) / 10),
        fairness: Math.round(offer / 10),
      });
      completeGame('ultimatum');
    }, 2000);
  };

  const resetGame = () => {
    setOffer(40);
    setAiDecision(null);
    setIsPlaying(true);
    setIsEvaluating(false);
  };

  const handleReadTheory = (topic: string) => {
    if (!theoryRead.includes(topic)) {
      setTheoryRead((prev) => [...prev, topic]);
      addXP(20);
    }
    setActiveAccordion(activeAccordion === topic ? null : topic);
  };

  const accordionData = [
    {
      id: 'fairness',
      title: t.ultimatum.theory.fairness_t,
      definition: t.ultimatum.theory.fairness_def,
      example: t.ultimatum.theory.fairness_ex,
      application: t.ultimatum.theory.fairness_app,
    },
    {
      id: 'irrationality',
      title: t.ultimatum.theory.irrationality_t,
      definition: t.ultimatum.theory.irrationality_def,
      example: t.ultimatum.theory.irrationality_ex,
      application: t.ultimatum.theory.irrationality_app,
    },
    {
      id: 'behavioral',
      title: t.ultimatum.theory.behavioral_t,
      definition: t.ultimatum.theory.behavioral_def,
      example: t.ultimatum.theory.behavioral_ex,
      application: t.ultimatum.theory.behavioral_app,
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-main/5 rounded-full filter blur-3xl pointer-events-none" />

            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-main/10 text-accent-main border border-accent-main/20">
                {t.dashboard.games.ul_title}
              </span>
              <span className="text-xs text-text-muted">{t.pd.diff}</span>
            </div>

            {isPlaying && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-outfit">{t.ultimatum.story_title}</h2>
                <p className="text-text-muted leading-relaxed">
                  {t.ultimatum.story_1}
                </p>
                <p className="text-text-muted leading-relaxed">
                  {t.ultimatum.story_2}
                </p>

                {/* Division Slider */}
                <div className="space-y-6 py-6 border-t border-b border-border-main/50">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-primary-main">{t.ultimatum.keep}: ${100 - offer}</span>
                    <span className="text-accent-main">{t.ultimatum.gets}: ${offer}</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={offer}
                    onChange={(e) => setOffer(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent-main"
                  />

                  {/* Visual allocation indicators */}
                  <div className="flex h-6 w-full rounded-full overflow-hidden border border-border-main bg-slate-800">
                    <div
                      className="bg-primary-main h-full transition-all duration-150 flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ width: `${100 - offer}%` }}
                    >
                      {100 - offer > 15 && `${language === 'en' ? 'You' : 'Siz'}: $${100 - offer}`}
                    </div>
                    <div
                      className="bg-accent-main h-full transition-all duration-150 flex items-center justify-center text-[10px] font-bold text-slate-900"
                      style={{ width: `${offer}%` }}
                    >
                      {offer > 15 && `AI: $${offer}`}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleOfferSubmit}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-accent-main hover:bg-accent-main/90 text-slate-900 font-bold shadow-lg shadow-accent-main/20 transition-all cursor-pointer"
                  >
                    <Coins className="w-5 h-5" /> {t.ultimatum.submit}
                  </button>
                </div>
              </div>
            )}

            {/* Evaluation Spinner */}
            {isEvaluating && (
              <div className="h-64 flex flex-col justify-center items-center text-center space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-800 rounded-full" />
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-t-accent-main border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t.ultimatum.evaluating}</h3>
                  <p className="text-xs text-text-muted mt-1">{t.ultimatum.evaluating_sub}</p>
                </div>
              </div>
            )}

            {/* Results Screen */}
            {aiDecision && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-border-main/50">
                  {aiDecision === 'Accept' ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                      <div>
                        <h3 className="text-xl font-bold text-emerald-400">{t.ultimatum.accepted_t}</h3>
                        <p className="text-xs text-text-muted">{t.ultimatum.accepted_sub}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-8 h-8 text-red-500" />
                      <div>
                        <h3 className="text-xl font-bold text-red-400">{t.ultimatum.rejected_t}</h3>
                        <p className="text-xs text-text-muted">{t.ultimatum.rejected_sub}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Final payout cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/40 light:bg-slate-100 rounded-xl border border-border-main text-center">
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">{t.ultimatum.earnings_user}</p>
                    <p className="text-2xl font-extrabold text-white dark:text-white light:text-slate-900 mt-1">
                      ${aiDecision === 'Accept' ? 100 - offer : 0}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-800/40 light:bg-slate-100 rounded-xl border border-border-main text-center">
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">{t.ultimatum.earnings_partner}</p>
                    <p className="text-2xl font-extrabold text-white dark:text-white light:text-slate-900 mt-1">
                      ${aiDecision === 'Accept' ? offer : 0}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/30 rounded-xl border border-border-main/50 text-sm">
                  <p className="font-semibold text-text-main">{t.ultimatum.why_title}</p>
                  <p className="text-text-muted mt-1 text-xs leading-relaxed">
                    {aiDecision === 'Accept'
                      ? t.ultimatum.why_accept
                      : t.ultimatum.why_reject}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={resetGame}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-border-main text-sm font-semibold transition-all cursor-pointer"
                  >
                    {t.ultimatum.propose_again}
                  </button>
                  <a
                    href="#ultimatum-theory"
                    className="flex-1 flex items-center justify-center py-3 px-6 rounded-xl bg-accent-main hover:bg-accent-main/90 text-slate-900 font-bold shadow-lg shadow-accent-main/20 transition-all cursor-pointer"
                  >
                    {t.pd.explore_theory}
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Dynamic visual matrix/details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-bg-card border border-border-main rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-3 font-outfit text-text-main flex items-center gap-2">
              <Scale className="w-5 h-5 text-accent-main" /> {t.ultimatum.graph_title}
            </h3>
            <p className="text-xs text-text-muted mb-4">
              {t.ultimatum.graph_desc}
            </p>

            {/* Simple CSS bar chart representing acceptance likelihoods */}
            <div className="space-y-3.5 mt-2">
              <div>
                <div className="flex justify-between text-[10px] mb-1 font-semibold">
                  <span>{t.ultimatum.offer_under_20}</span>
                  <span className="text-red-400">~5% {t.ultimatum.acceptance}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '5%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] mb-1 font-semibold">
                  <span>{t.ultimatum.offer_20_29}</span>
                  <span className="text-red-400/90">~40% {t.ultimatum.acceptance}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] mb-1 font-semibold">
                  <span>{t.ultimatum.offer_30_39}</span>
                  <span className="text-emerald-400/90">~75% {t.ultimatum.acceptance}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-400/80 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] mb-1 font-semibold">
                  <span>{t.ultimatum.offer_40_49}</span>
                  <span className="text-emerald-400">~95% {t.ultimatum.acceptance}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] mb-1 font-semibold">
                  <span>{t.ultimatum.offer_50}</span>
                  <span className="text-emerald-400">100% {t.ultimatum.acceptance}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div id="ultimatum-theory" className="mt-12 space-y-6 scroll-mt-24">
        <div className="border-b border-border-main/50 pb-3 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold font-outfit text-text-main">{t.ultimatum.math_vs_mind}</h2>
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
export default UltimatumGame;
