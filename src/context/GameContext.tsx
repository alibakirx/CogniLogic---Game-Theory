'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  unlockedAt: string;
  icon: string;
}

export interface Decision {
  gameId: string;
  choice: string;
  outcome: string;
  cooperative: boolean; // did the user try to cooperate?
  riskLevel: number; // 0 to 10
  fairness: number; // 0 to 10 (relevant to Ultimatum, or standardizing cooperation)
  timestamp: string;
}

interface GameContextType {
  xp: number;
  completedGames: string[];
  achievements: Achievement[];
  decisions: Decision[];
  theme: 'dark' | 'light';
  language: 'en' | 'tr';
  lastGameId: string | null;
  lastChoice: string | null;
  lastOutcome: string | null;
  addXP: (amount: number) => void;
  completeGame: (gameId: string) => void;
  unlockAchievement: (id: string) => void;
  recordDecision: (decision: Omit<Decision, 'timestamp'>) => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  resetProgress: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const ALL_ACHIEVEMENTS = [
  { id: 'first_decision', title: 'First Decision', desc: 'Made your first choice in any scenario.', icon: '🎯' },
  { id: 'rational_thinker', title: 'Rational Thinker', desc: 'Explored the Nash Equilibrium in Prisoner\'s Dilemma.', icon: '🧠' },
  { id: 'risk_taker', title: 'Risk Taker', desc: 'Dared to face danger in the Chicken Game.', icon: '⚡' },
  { id: 'cooperation_master', title: 'Cooperation Master', desc: 'Prioritized mutual benefit in scenarios.', icon: '🤝' },
  { id: 'fair_dealer', title: 'Fair Dealer', desc: 'Offered an even split in the Ultimatum Game.', icon: '⚖️' },
];

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState<number>(0);
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'en' | 'tr'>('en');
  const [lastGameId, setLastGameId] = useState<string | null>(null);
  const [lastChoice, setLastChoice] = useState<string | null>(null);
  const [lastOutcome, setLastOutcome] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const storedXp = localStorage.getItem('gt_xp');
    const storedGames = localStorage.getItem('gt_completed_games');
    const storedAchievements = localStorage.getItem('gt_achievements');
    const storedDecisions = localStorage.getItem('gt_decisions');
    const storedTheme = localStorage.getItem('gt_theme') as 'dark' | 'light';
    const storedLanguage = localStorage.getItem('gt_lang') as 'en' | 'tr';

    if (storedXp) setXp(parseInt(storedXp, 10));
    if (storedGames) setCompletedGames(JSON.parse(storedGames));
    if (storedAchievements) setAchievements(JSON.parse(storedAchievements));
    if (storedDecisions) setDecisions(JSON.parse(storedDecisions));
    if (storedLanguage) setLanguage(storedLanguage);
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.className = storedTheme;
    } else {
      document.documentElement.className = 'dark';
    }
  }, []);

  // Update theme on html tag
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.className = theme;
    localStorage.setItem('gt_theme', theme);
  }, [theme, mounted]);

  const addXP = (amount: number) => {
    setXp((prev) => {
      const newXp = prev + amount;
      localStorage.setItem('gt_xp', newXp.toString());
      return newXp;
    });
  };

  const completeGame = (gameId: string) => {
    setCompletedGames((prev) => {
      if (prev.includes(gameId)) return prev;
      const next = [...prev, gameId];
      localStorage.setItem('gt_completed_games', JSON.stringify(next));
      addXP(50); // +50 XP on completion

      // If all scenarios complete, unlock Cooperation Master or other achievements
      if (next.length === 3) {
        // Unlock something for doing all scenarios
        unlockAchievement('rational_thinker'); // Auto give rational thinker or another if done
      }
      return next;
    });
  };

  const unlockAchievement = (id: string) => {
    setAchievements((prev) => {
      if (prev.some((a) => a.id === id)) return prev;
      const details = ALL_ACHIEVEMENTS.find((a) => a.id === id);
      if (!details) return prev;

      const newAchievement: Achievement = {
        ...details,
        unlockedAt: new Date().toLocaleDateString(),
      };
      const next = [...prev, newAchievement];
      localStorage.setItem('gt_achievements', JSON.stringify(next));
      addXP(20); // +20 XP for achievement unlock
      return next;
    });
  };

  const recordDecision = (dec: Omit<Decision, 'timestamp'>) => {
    const newDecision: Decision = {
      ...dec,
      timestamp: new Date().toISOString(),
    };

    setDecisions((prev) => {
      const next = [...prev, newDecision];
      localStorage.setItem('gt_decisions', JSON.stringify(next));
      return next;
    });

    setLastGameId(dec.gameId);
    setLastChoice(dec.choice);
    setLastOutcome(dec.outcome);

    // Trigger basic achievements based on choices
    unlockAchievement('first_decision');

    if (dec.gameId === 'chicken' && dec.choice === 'Continue') {
      unlockAchievement('risk_taker');
    }
    if (dec.gameId === 'ultimatum' && dec.choice === 'Offer $50') {
      unlockAchievement('fair_dealer');
    }
    
    // Check if cooperation master is earned (cooperated in PD and swerved in Chicken)
    setTimeout(() => {
      setDecisions((latestDecisions) => {
        const pdCoop = latestDecisions.some((d) => d.gameId === 'prisoners_dilemma' && d.cooperative);
        const chCoop = latestDecisions.some((d) => d.gameId === 'chicken' && d.cooperative);
        if (pdCoop && chCoop) {
          unlockAchievement('cooperation_master');
        }
        return latestDecisions;
      });
    }, 100);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'tr' : 'en';
      localStorage.setItem('gt_lang', next);
      return next;
    });
  };

  const resetProgress = () => {
    setXp(0);
    setCompletedGames([]);
    setAchievements([]);
    setDecisions([]);
    setLastGameId(null);
    setLastChoice(null);
    setLastOutcome(null);
    localStorage.removeItem('gt_xp');
    localStorage.removeItem('gt_completed_games');
    localStorage.removeItem('gt_achievements');
    localStorage.removeItem('gt_decisions');
  };

  return (
    <GameContext.Provider
      value={{
        xp,
        completedGames,
        achievements,
        decisions,
        theme,
        language,
        lastGameId,
        lastChoice,
        lastOutcome,
        addXP,
        completeGame,
        unlockAchievement,
        recordDecision,
        toggleTheme,
        toggleLanguage,
        resetProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
