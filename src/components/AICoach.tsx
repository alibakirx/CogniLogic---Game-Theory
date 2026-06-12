'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Send, Bot, Sparkles, User } from 'lucide-react';
import { translations } from '@/utils/translations';

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AICoach: React.FC = () => {
  const { lastGameId, lastChoice, lastOutcome, language } = useGame();
  const t = translations[language];
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: '', // resolved dynamically to support language switching
    },
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const getMockCoachResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Check if player has played any games
    if (!lastGameId) {
      return t.coach.no_games;
    }

    const isSuboptimalQuestion = q.includes('suboptimal') || q.includes('why') || q.includes('bad') || q.includes('wrong') || q.includes('improve') || q.includes('neden') || q.includes('hata');

    if (lastGameId === 'prisoners_dilemma') {
      if (lastChoice === 'Silent') {
        return isSuboptimalQuestion ? t.coach.pd_silent_suboptimal : t.coach.pd_silent_general;
      } else {
        return isSuboptimalQuestion ? t.coach.pd_betray_suboptimal : t.coach.pd_betray_general;
      }
    }

    if (lastGameId === 'chicken') {
      if (lastChoice === 'Swerve') {
        return isSuboptimalQuestion ? t.coach.ch_swerve_suboptimal : t.coach.ch_swerve_general;
      } else {
        return isSuboptimalQuestion ? t.coach.ch_continue_suboptimal : t.coach.ch_continue_general;
      }
    }

    if (lastGameId === 'ultimatum') {
      // Parse offer from choice string e.g. "Offer $40" or "Teklif $40"
      const match = lastChoice?.match(/\d+/);
      const offer = match ? parseInt(match[0], 10) : 0;
      if (isSuboptimalQuestion) {
        if (offer < 30) {
          return t.coach.ul_suboptimal_low.replace(/\$offer/g, `$${offer}`).replace(/Teklif/g, `Teklifiniz $${offer}`);
        } else if (offer >= 50) {
          return t.coach.ul_suboptimal_high.replace(/\$offer/g, `$${offer}`).replace(/Teklif/g, `Teklifiniz $${offer}`);
        } else {
          return t.coach.ul_suboptimal_optimal.replace(/\$offer/g, `$${offer}`).replace(/Teklif/g, `Teklifiniz $${offer}`);
        }
      }
      return t.coach.ul_general.replace(/\$offer/g, `$${offer}`).replace(/Teklif/g, `Teklifiniz $${offer}`);
    }

    return t.coach.default_reply;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getMockCoachResponse(userMsg);
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickQuestion = (q: string) => {
    setInput(q);
  };

  // Resolve initial greeting dynamically to support language changing on-the-fly
  const renderedMessages = messages.map((m, idx) => {
    if (idx === 0 && m.sender === 'ai') {
      return { ...m, text: t.coach.welcome_msg };
    }
    return m;
  });

  return (
    <div className="bg-bg-card border border-border-main rounded-2xl shadow-xl flex flex-col h-[400px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border-main/50 bg-slate-900/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-main/15 text-primary-main flex items-center justify-center border border-primary-main/20">
            <Bot className="w-4.5 h-4.5 text-primary-main" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-outfit text-text-main flex items-center gap-1.5">
              {t.coach.title} <Sparkles className="w-3.5 h-3.5 text-accent-main animate-pulse" />
            </h3>
            <p className="text-[10px] text-text-muted">{t.coach.sub}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {renderedMessages.map((m, i) => (
          <div key={i} className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs border ${
                m.sender === 'ai'
                  ? 'bg-slate-900 border-border-main text-primary-main'
                  : 'bg-primary-main border-primary-main/30 text-white'
              }`}
            >
              {m.sender === 'ai' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-xs leading-relaxed ${
                m.sender === 'ai'
                  ? 'bg-slate-800/40 border border-border-main text-text-main rounded-tl-none'
                  : 'bg-primary-main text-white rounded-tr-none shadow-md shadow-primary-main/15'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-900 border border-border-main text-primary-main flex items-center justify-center text-xs">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-slate-800/40 border border-border-main rounded-2xl px-4 py-3 rounded-tl-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Quick suggestions */}
      {lastGameId && (
        <div className="px-4 py-2 bg-slate-900/20 border-t border-border-main/30 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            onClick={() => handleQuickQuestion(t.coach.suggest_suboptimal)}
            className="text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 border border-border-main text-text-main px-2.5 py-1 rounded-full cursor-pointer transition-colors"
          >
            {t.coach.suggest_suboptimal}
          </button>
          <button
            onClick={() => handleQuickQuestion(t.coach.suggest_rational)}
            className="text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 border border-border-main text-text-main px-2.5 py-1 rounded-full cursor-pointer transition-colors"
          >
            {t.coach.suggest_rational}
          </button>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border-main/50 bg-slate-900/30 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.coach.input_placeholder}
          className="flex-1 bg-slate-800 border border-border-main text-xs px-3.5 py-2 rounded-xl focus:outline-none focus:border-primary-main text-text-main placeholder-text-muted"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-primary-main hover:bg-primary-main/90 text-white rounded-xl shadow-md shadow-primary-main/15 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
export default AICoach;

