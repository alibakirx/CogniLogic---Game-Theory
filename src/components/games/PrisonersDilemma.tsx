'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Shield, AlertTriangle, HelpCircle, ChevronDown, Award, Users, RefreshCw } from 'lucide-react';
import { translations } from '@/utils/translations';

interface PrisonersDilemmaProps {
  onBack: () => void;
}

type Choice = 'Silent' | 'Betray';
type BotStrategy = 'tft' | 'grudger' | 'always_defect' | 'always_coop' | 'detective' | 'random';

interface MatchRound {
  userMove: Choice;
  botMove: Choice;
  userPts: number;
  botPts: number;
}

export const PrisonersDilemma: React.FC<PrisonersDilemmaProps> = ({ onBack }) => {
  const { recordDecision, completeGame, addXP, language } = useGame();
  const t = translations[language];

  // Game states
  const [opponent, setOpponent] = useState<BotStrategy | null>(null);
  const [round, setRound] = useState<number>(1);
  const [userHistory, setUserHistory] = useState<Choice[]>([]);
  const [botHistory, setBotHistory] = useState<Choice[]>([]);
  const [userScore, setUserScore] = useState<number>(0);
  const [botScore, setBotScore] = useState<number>(0);
  const [roundsLog, setRoundsLog] = useState<MatchRound[]>([]);

  const [isPlaying, setIsPlaying] = useState<boolean>(true); // true = match in progress
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] = useState<{ name: string; score: number; isUser: boolean; color: string }[]>([]);

  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [theoryRead, setTheoryRead] = useState<string[]>([]);
  const [lastRoundResult, setLastRoundResult] = useState<{ title: string; desc: string; userPts: number; botPts: number } | null>(null);

  // Bot opponent definitions
  const botStrategiesList = [
    { id: 'tft' as BotStrategy, name: t.pd.bots.tft_name, desc: t.pd.bots.tft_desc, icon: '🤝' },
    { id: 'grudger' as BotStrategy, name: t.pd.bots.grudger_name, desc: t.pd.bots.grudger_desc, icon: '😠' },
    { id: 'always_defect' as BotStrategy, name: t.pd.bots.always_defect_name, desc: t.pd.bots.always_defect_desc, icon: '😈' },
    { id: 'always_coop' as BotStrategy, name: t.pd.bots.always_coop_name, desc: t.pd.bots.always_coop_desc, icon: '😇' },
    { id: 'detective' as BotStrategy, name: t.pd.bots.detective_name, desc: t.pd.bots.detective_desc, icon: '🕵️' },
    { id: 'random' as BotStrategy, name: t.pd.bots.random_name, desc: t.pd.bots.random_desc, icon: '🎲' },
  ];

  // Bot logic
  const getBotChoice = (strategy: BotStrategy, opponentHistory: Choice[], selfHistory: Choice[], currentRound: number): Choice => {
    if (strategy === 'always_defect') return 'Betray';
    if (strategy === 'always_coop') return 'Silent';
    
    if (strategy === 'random') {
      return Math.random() < 0.5 ? 'Silent' : 'Betray';
    }

    if (strategy === 'tft') {
      if (currentRound === 1) return 'Silent';
      return opponentHistory[opponentHistory.length - 1]; // Copy opponent's last move
    }

    if (strategy === 'grudger') {
      // Cooperates until opponent betrays once; then always betrays
      const hasOpponentBetrayed = opponentHistory.includes('Betray');
      return hasOpponentBetrayed ? 'Betray' : 'Silent';
    }

    if (strategy === 'detective') {
      // Plays: Cooperate, Defect, Cooperate, Cooperate
      // If opponent betrays in these 4 rounds, acts like Tit-for-Tat
      // Else, acts like Always Defect to exploit
      if (currentRound === 1) return 'Silent';
      if (currentRound === 2) return 'Betray';
      if (currentRound === 3) return 'Silent';
      if (currentRound === 4) return 'Silent';

      const betrayedInFirstFour = opponentHistory.slice(0, 4).includes('Betray');
      if (betrayedInFirstFour) {
        return opponentHistory[opponentHistory.length - 1]; // Tit-for-Tat
      } else {
        return 'Betray'; // Always Defect
      }
    }

    return 'Silent';
  };

  const handlePlayRound = (userMove: Choice) => {
    if (!opponent) return;

    const botMove = getBotChoice(opponent, userHistory, botHistory, round);

    // Calculate payoffs
    let uPts = 0;
    let bPts = 0;
    let outcomeTitle = '';
    let outcomeDesc = '';

    if (userMove === 'Silent' && botMove === 'Silent') {
      uPts = 3;
      bPts = 3;
      outcomeTitle = t.pd.outcomes.solidarity_t;
      outcomeDesc = t.pd.outcomes.solidarity_d;
    } else if (userMove === 'Betray' && botMove === 'Silent') {
      uPts = 5;
      bPts = 0;
      outcomeTitle = t.pd.outcomes.temptation_t;
      outcomeDesc = t.pd.outcomes.temptation_d;
    } else if (userMove === 'Silent' && botMove === 'Betray') {
      uPts = 0;
      bPts = 5;
      outcomeTitle = t.pd.outcomes.betrayed_t;
      outcomeDesc = t.pd.outcomes.betrayed_d;
    } else {
      uPts = 1;
      bPts = 1;
      outcomeTitle = t.pd.outcomes.tragedy_t;
      outcomeDesc = t.pd.outcomes.tragedy_d;
    }

    // Update state
    setUserScore((prev) => prev + uPts);
    setBotScore((prev) => prev + bPts);
    setUserHistory((prev) => [...prev, userMove]);
    setBotHistory((prev) => [...prev, botMove]);
    
    const newRoundLog: MatchRound = { userMove, botMove, userPts: uPts, botPts: bPts };
    setRoundsLog((prev) => [...prev, newRoundLog]);
    setLastRoundResult({ title: outcomeTitle, desc: outcomeDesc, userPts: uPts, botPts: bPts });

    if (round === 10) {
      setIsPlaying(false);
      // Compile final decision details
      const isCoopMatch = userHistory.filter((h) => h === 'Silent').length >= 5;
      recordDecision({
        gameId: 'prisoners_dilemma',
        choice: language === 'en' ? `Finished match vs ${opponent}` : `${opponent} botuna karşı maç tamamlandı`,
        outcome: language === 'en' ? `Score: ${userScore + uPts} - ${botScore + bPts}` : `Skor: ${userScore + uPts} - ${botScore + bPts}`,
        cooperative: isCoopMatch,
        riskLevel: userHistory.filter((h) => h === 'Betray').length * 1,
        fairness: userHistory.filter((h) => h === 'Silent').length * 1,
      });
      completeGame('prisoners_dilemma');
    } else {
      setRound((prev) => prev + 1);
    }
  };

  // Axelrod Round-Robin Tournament simulation
  const runAxelrodTournament = () => {
    // Strategies list
    const strategies = ['tft', 'grudger', 'always_defect', 'always_coop', 'detective', 'random', 'user'];
    
    // User cooperation probability based on user's actual choices in the 10 rounds
    const userCoopCount = userHistory.filter(h => h === 'Silent').length;
    const userCoopProb = userCoopCount / 10;

    const scores: Record<string, number> = {
      tft: 0,
      grudger: 0,
      always_defect: 0,
      always_coop: 0,
      detective: 0,
      random: 0,
      user: 0,
    };

    // Play 10 rounds between each pair (including self)
    strategies.forEach((p1) => {
      strategies.forEach((p2) => {
        let p1History: Choice[] = [];
        let p2History: Choice[] = [];
        let p1Score = 0;
        let p2Score = 0;

        for (let r = 1; r <= 10; r++) {
          // Resolve player 1 move
          let p1Move: Choice = 'Silent';
          if (p1 === 'user') {
            p1Move = Math.random() < userCoopProb ? 'Silent' : 'Betray';
          } else {
            p1Move = getBotChoice(p1 as BotStrategy, p2History, p1History, r);
          }

          // Resolve player 2 move
          let p2Move: Choice = 'Silent';
          if (p2 === 'user') {
            p2Move = Math.random() < userCoopProb ? 'Silent' : 'Betray';
          } else {
            p2Move = getBotChoice(p2 as BotStrategy, p1History, p2History, r);
          }

          // Payoffs
          if (p1Move === 'Silent' && p2Move === 'Silent') {
            p1Score += 3; p2Score += 3;
          } else if (p1Move === 'Betray' && p2Move === 'Silent') {
            p1Score += 5; p2Score += 0;
          } else if (p1Move === 'Silent' && p2Move === 'Betray') {
            p1Score += 0; p2Score += 5;
          } else {
            p1Score += 1; p2Score += 1;
          }

          p1History.push(p1Move);
          p2History.push(p2Move);
        }

        scores[p1] += p1Score;
      });
    });

    // Axelrod average score scaling (average points per round * 165 to get scores in range of ~100 to 500)
    // There are 7 players in total, so each player plays 7 matches.
    // Average points per round = total_points / (7 matches * 10 rounds) = total_points / 70.
    // Let's multiply average points per round by 160 to scale up to 500.
    const getScaled = (key: string) => {
      const avgPointsPerRound = scores[key] / 70;
      return Math.round(avgPointsPerRound * 160);
    };

    // Construct leaderboard objects matching names and colors of screenshot
    const leaderboard = [
      { name: t.pd.bots.tft_name, score: getScaled('tft'), isUser: false, color: 'bg-[#984576] light:bg-[#C26B9C]' }, // Purple
      { name: t.pd.bots.grudger_name, score: getScaled('grudger'), isUser: false, color: 'bg-[#438B83] light:bg-[#5EA49C]' }, // Teal
      { name: t.pd.bots.always_defect_name, score: getScaled('always_defect'), isUser: false, color: 'bg-[#8F3E3D] light:bg-[#A95A59]' }, // Crimson
      { name: t.pd.bots.always_coop_name, score: getScaled('always_coop'), isUser: false, color: 'bg-[#A86438] light:bg-[#C37E52]' }, // Brown
      { name: t.pd.bots.detective_name, score: getScaled('detective'), isUser: false, color: 'bg-[#555E8D] light:bg-[#6F77A7]' }, // Slate Blue
      { name: t.pd.bots.random_name, score: getScaled('random'), isUser: false, color: 'bg-[#58784F] light:bg-[#729269]' }, // Green
      { name: t.pd.user_label, score: getScaled('user'), isUser: true, color: 'bg-primary-main' }, // Brand Blue
    ];

    // Sort descending by score
    leaderboard.sort((a, b) => b.score - a.score);
    setLeaderboardData(leaderboard);
    setShowLeaderboard(true);
  };

  const resetAll = () => {
    setOpponent(null);
    setRound(1);
    setUserHistory([]);
    setBotHistory([]);
    setUserScore(0);
    setBotScore(0);
    setRoundsLog([]);
    setIsPlaying(true);
    setShowLeaderboard(false);
    setLastRoundResult(null);
  };

  const handleReadTheory = (topic: string) => {
    if (!theoryRead.includes(topic)) {
      setTheoryRead((prev) => [...prev, topic]);
      addXP(20);
    }
    setActiveAccordion(activeAccordion === topic ? null : topic);
  };

  const currentBotDetails = botStrategiesList.find((b) => b.id === opponent);

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
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-text-muted hover:text-text-main mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.pd.back}
      </button>

      {/* 1. Opponent Select Screen */}
      {!opponent && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold font-outfit text-text-main flex items-center justify-center gap-2">
              <Users className="w-8 h-8 text-primary-main" /> {t.pd.select_opponent}
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              {t.pd.select_opponent_sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {botStrategiesList.map((bot, index) => (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-bg-card border border-border-main hover:border-primary-main/40 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl border border-border-main">
                    {bot.icon}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold font-outfit text-text-main">{bot.name}</h3>
                    <p className="text-xs text-text-muted leading-relaxed">{bot.desc}</p>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setOpponent(bot.id)}
                    className="w-full py-2.5 px-4 bg-primary-main hover:bg-primary-main/90 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-primary-main/15 cursor-pointer"
                  >
                    {language === 'en' ? 'Select Strategy' : 'Stratejiyi Seç'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 2. Match Play Screen */}
      {opponent && !showLeaderboard && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Playboard */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-bg-card border border-border-main rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-main/5 rounded-full filter blur-3xl pointer-events-none" />

              <div className="flex justify-between items-start mb-6 pb-4 border-b border-border-main/50">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-main/10 text-primary-main border border-primary-main/20">
                    {t.dashboard.games.pd_title}
                  </span>
                  <span className="text-xs text-text-muted ml-3">{t.pd.diff}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold bg-slate-800 px-3 py-1 rounded-full border border-slate-700/60">
                  <span>{t.pd.round} {isPlaying ? round : 10} / 10</span>
                </div>
              </div>

              {/* Story/Play Board */}
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="active-round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 bg-slate-900/40 p-4 rounded-xl border border-border-main/50">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-xl">
                        {currentBotDetails?.icon}
                      </div>
                      <div>
                        <h4 className="text-xs text-text-muted">{language === 'en' ? 'Playing against' : 'Oynanan rakip'}:</h4>
                        <p className="text-sm font-bold text-text-main">{currentBotDetails?.name}</p>
                      </div>
                    </div>

                    {/* Last Round Log Bubble */}
                    {lastRoundResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-slate-800/40 light:bg-slate-100/50 rounded-xl border border-border-main/80 space-y-1.5"
                      >
                        <h4 className="text-xs font-bold text-accent-main">{lastRoundResult.title}</h4>
                        <p className="text-xs text-text-muted leading-relaxed">{lastRoundResult.desc}</p>
                        <div className="flex gap-4 pt-1.5 text-[10px] font-bold text-text-main border-t border-border-main/30">
                          <span>{language === 'en' ? 'You earned' : 'Kazandığınız'}: <strong className="text-emerald-400">+{lastRoundResult.userPts} {t.pd.score}</strong></span>
                          <span>{language === 'en' ? 'Bot earned' : 'Botun kazandığı'}: <strong className="text-emerald-400">+{lastRoundResult.botPts} {t.pd.score}</strong></span>
                        </div>
                      </motion.div>
                    )}

                    <div className="pt-4 border-t border-border-main/50 space-y-3">
                      <p className="text-sm font-semibold text-text-main">{t.pd.choice_prompt}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                          onClick={() => handlePlayRound('Silent')}
                          className="flex flex-col items-center justify-center p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-emerald-400 font-semibold transition-all group cursor-pointer"
                        >
                          <Shield className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                          <span>{t.pd.silent_btn}</span>
                          <span className="text-[10px] text-emerald-500/70 font-normal mt-1">{t.pd.silent_sub}</span>
                        </button>

                        <button
                          onClick={() => handlePlayRound('Betray')}
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
                    key="match-over"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent-main/10 flex items-center justify-center text-4xl text-accent-main mx-auto border border-accent-main/20 animate-bounce">
                      🏁
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-extrabold font-outfit text-text-main">{t.pd.game_over}</h3>
                      <p className="text-xs text-text-muted max-w-md mx-auto">
                        {language === 'en'
                          ? `You completed the 10-round match against ${currentBotDetails?.name}. Let's see the final scores:`
                          : `${currentBotDetails?.name} botuna karşı 10 rauntluk maç bitti. Sonuçlar:`}
                      </p>
                    </div>

                    {/* Final Receipts Card */}
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      <div className="p-4 bg-slate-800/40 light:bg-slate-100 rounded-xl border border-border-main text-center">
                        <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">{language === 'en' ? 'Your Score' : 'Sizin Skorunuz'}</p>
                        <p className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900 mt-1">
                          {userScore} <span className="text-xs text-text-muted">{t.pd.score}</span>
                        </p>
                      </div>
                      <div className="p-4 bg-slate-800/40 light:bg-slate-100 rounded-xl border border-border-main text-center">
                        <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                          {language === 'en' ? "Rival's Score" : 'Rakibin Skoru'}
                        </p>
                        <p className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900 mt-1">
                          {botScore} <span className="text-xs text-text-muted">{t.pd.score}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 max-w-md mx-auto">
                      <button
                        onClick={resetAll}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-border-main text-sm font-semibold transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" /> {language === 'en' ? 'Replay Bot' : 'Yeniden Oyna'}
                      </button>
                      <button
                        onClick={runAxelrodTournament}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-primary-main hover:bg-primary-main/90 text-white text-sm font-semibold shadow-lg shadow-primary-main/20 transition-all cursor-pointer"
                      >
                        🚀 {t.pd.run_tournament}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Scoreboard Tracker & History */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Scores Panel */}
            <div className="bg-bg-card border border-border-main rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold font-outfit text-text-main">{language === 'en' ? 'Live Match Standings' : 'Anlık Maç Durumu'}</h3>
              
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>{language === 'en' ? 'You' : 'Siz'} (🤝/😈)</span>
                    <span className="text-primary-main">{userScore} {t.pd.score}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-primary-main rounded-full transition-all duration-300" style={{ width: `${Math.min((userScore / 50) * 100, 100)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>{currentBotDetails?.name}</span>
                    <span className="text-accent-main">{botScore} {t.pd.score}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-accent-main rounded-full transition-all duration-300" style={{ width: `${Math.min((botScore / 50) * 100, 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Timelines History Tracker */}
            <div className="bg-bg-card border border-border-main rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold font-outfit text-text-main uppercase tracking-wider text-text-muted">{t.pd.history}</h3>

              <div className="space-y-4 max-h-[180px] overflow-y-auto pr-1">
                {roundsLog.length === 0 ? (
                  <p className="text-xs text-text-muted italic">{language === 'en' ? 'Make a move to start log.' : 'Kayıt başlatmak için hamle yapın.'}</p>
                ) : (
                  roundsLog.map((log, index) => (
                    <div key={index} className="flex justify-between items-center text-xs p-2.5 bg-slate-900/30 rounded-lg border border-border-main/50">
                      <span className="font-semibold text-text-muted">{t.pd.round} {index + 1}</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <span className="text-[10px] text-text-muted">You:</span>
                          <strong>{log.userMove === 'Silent' ? '🤝' : '😈'}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-[10px] text-text-muted">Bot:</span>
                          <strong>{log.botMove === 'Silent' ? '🤝' : '😈'}</strong>
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Tournament Leaderboard Screen (Axelrod chart replica) */}
      {showLeaderboard && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="bg-bg-card border border-border-main rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-8">
            <div className="space-y-2 pb-4 border-b border-border-main/50 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-text-main">{t.pd.leaderboard_title}</h2>
                <p className="text-xs text-text-muted leading-relaxed mt-1 max-w-xl">
                  {t.pd.leaderboard_sub}
                </p>
              </div>
              <button
                onClick={resetAll}
                className="flex items-center gap-2 py-2 px-4 bg-slate-800 hover:bg-slate-700 border border-border-main text-xs font-semibold rounded-xl cursor-pointer"
              >
                <RefreshCw className="w-4.5 h-4.5" /> {language === 'en' ? 'New Match' : 'Yeni Maç'}
              </button>
            </div>

            {/* Colored horizontal bar chart (matching uploaded screenshot) */}
            <div className="space-y-4 max-w-4xl mx-auto select-none">
              {/* Header Titles */}
              <div className="grid grid-cols-12 text-xs font-bold text-text-muted uppercase tracking-wider pb-2 border-b border-border-main/30">
                <span className="col-span-1 text-center">{t.pd.rank}</span>
                <span className="col-span-3 text-left">{t.pd.player}</span>
                <span className="col-span-2 text-center">{t.pd.avg_score}</span>
                <span className="col-span-6 text-left pl-4">Relative Score (0 - 500)</span>
              </div>

              {/* Iterated Scores Bars */}
              {leaderboardData.map((player, idx) => {
                const rankNum = String(idx + 1).padStart(2, '0');
                
                // Percent width of chart bar (scaled to 500 max score)
                const percentWidth = Math.min((player.score / 500) * 100, 100);

                return (
                  <motion.div
                    key={idx}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="grid grid-cols-12 items-center text-xs py-1 transition-all"
                  >
                    {/* Rank */}
                    <span className="col-span-1 text-center font-bold text-text-muted">{rankNum}</span>

                    {/* Bot/User Name */}
                    <span className={`col-span-3 text-left font-bold truncate pr-2 ${player.isUser ? 'text-primary-main' : 'text-text-main'}`}>
                      {player.name}
                    </span>

                    {/* Average Score */}
                    <span className="col-span-2 text-center font-bold text-text-main bg-slate-900/60 light:bg-slate-200/50 py-1.5 rounded-lg border border-border-main/40">
                      {player.score}
                    </span>

                    {/* Score Bar Chart representation */}
                    <div className="col-span-6 pl-4 flex items-center h-full">
                      <div className="w-full h-7 bg-slate-800/40 rounded-md border border-slate-700/30 overflow-hidden relative flex items-center">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentWidth}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-full ${player.color} rounded-r shadow-md`}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* 4. Learning Accordion Section (Theory blocks remain below play space) */}
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
