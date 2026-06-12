'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { ShieldCheck, Zap, Scale, BarChart2 } from 'lucide-react';
import { translations } from '@/utils/translations';

export const DecisionProfile: React.FC = () => {
  const { decisions, language } = useGame();
  const t = translations[language];

  // Calculate profile metrics
  const totalDecisions = decisions.length;

  const getMetrics = () => {
    if (totalDecisions === 0) {
      return { cooperation: 50, risk: 50, fairness: 50, strategic: 50 };
    }

    let coopCount = 0;
    let totalRisk = 0;
    let totalFairness = 0;
    let strategicCount = 0;

    decisions.forEach((d) => {
      if (d.cooperative) coopCount++;
      totalRisk += d.riskLevel;
      totalFairness += d.fairness;

      // Rational choice check:
      // - PD: Betray
      // - Chicken: Swerve (if risk-averse) or Continue (if strategic binding)
      if (
        (d.gameId === 'prisoners_dilemma' && d.choice === 'Betray') ||
        (d.gameId === 'chicken' && d.choice === 'Swerve') ||
        (d.gameId === 'ultimatum' && parseInt(d.choice.replace('Offer $', ''), 10) >= 30)
      ) {
        strategicCount++;
      }
    });

    return {
      cooperation: Math.round((coopCount / totalDecisions) * 100),
      risk: Math.round((totalRisk / (totalDecisions * 10)) * 100),
      fairness: Math.round((totalFairness / (totalDecisions * 10)) * 100),
      strategic: Math.round((strategicCount / totalDecisions) * 100),
    };
  };

  const metrics = getMetrics();

  // Profile Archetype description
  const getArchetype = () => {
    if (totalDecisions === 0) {
      return {
        title: t.profile.archetypes.undecided_t,
        desc: t.profile.archetypes.undecided_d,
      };
    }

    const { cooperation, risk, fairness, strategic } = metrics;

    if (cooperation > 70 && fairness > 70) {
      return {
        title: t.profile.archetypes.altruist_t,
        desc: t.profile.archetypes.altruist_d,
      };
    }
    if (risk > 75 && cooperation < 40) {
      return {
        title: t.profile.archetypes.opportunist_t,
        desc: t.profile.archetypes.opportunist_d,
      };
    }
    if (strategic > 70 && fairness < 50) {
      return {
        title: t.profile.archetypes.tactician_t,
        desc: t.profile.archetypes.tactician_d,
      };
    }
    if (fairness > 60 && risk < 40) {
      return {
        title: t.profile.archetypes.guardian_t,
        desc: t.profile.archetypes.guardian_d,
      };
    }

    return {
      title: t.profile.archetypes.balanced_t,
      desc: t.profile.archetypes.balanced_d,
    };
  };

  const archetype = getArchetype();

  // SVG Radar Chart Coordinates (Center is 100, 100; max radius is 70)
  const center = 100;
  const maxRadius = 70;

  const rCoop = (metrics.cooperation / 100) * maxRadius;
  const rRisk = (metrics.risk / 100) * maxRadius;
  const rFair = (metrics.fairness / 100) * maxRadius;
  const rStrat = (metrics.strategic / 100) * maxRadius;

  const points = [
    `${center},${center - rCoop}`, // Top
    `${center + rRisk},${center}`, // Right
    `${center},${center + rFair}`, // Bottom
    `${center - rStrat},${center}`, // Left
  ].join(' ');

  // Background grids
  const gridRadii = [0.25, 0.5, 0.75, 1];

  return (
    <div className="bg-bg-card border border-border-main rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-border-main/50">
        <BarChart2 className="w-5 h-5 text-primary-main" />
        <h3 className="text-lg font-bold font-outfit text-text-main">{t.profile.title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Radar Chart */}
        <div className="flex justify-center items-center">
          <div className="relative w-48 h-48 bg-slate-900/20 light:bg-slate-100/50 rounded-full border border-border-main/50 p-2">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {/* Radar Grid Concentric Diamonds */}
              {gridRadii.map((r, i) => {
                const size = maxRadius * r;
                const d = [
                  `M ${center} ${center - size}`,
                  `L ${center + size} ${center}`,
                  `L ${center} ${center + size}`,
                  `L ${center - size} ${center}`,
                  'Z',
                ].join(' ');
                return (
                  <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="var(--border-main)"
                    strokeWidth="0.75"
                    strokeDasharray={i === 3 ? 'none' : '2 2'}
                  />
                );
              })}

              {/* Axis lines */}
              <line x1={center} y1={center - maxRadius} x2={center} y2={center + maxRadius} stroke="var(--border-main)" strokeWidth="0.5" />
              <line x1={center - maxRadius} y1={center} x2={center + maxRadius} y2={center} stroke="var(--border-main)" strokeWidth="0.5" />

              {/* Text Labels */}
              <text x={center} y={center - maxRadius - 4} fontSize="9" fontWeight="bold" fill="var(--text-muted)" textAnchor="middle">{t.profile.coop_rate.toUpperCase()}</text>
              <text x={center + maxRadius + 4} y={center + 3} fontSize="9" fontWeight="bold" fill="var(--text-muted)" textAnchor="start">{t.profile.risk_index.toUpperCase()}</text>
              <text x={center} y={center + maxRadius + 10} fontSize="9" fontWeight="bold" fill="var(--text-muted)" textAnchor="middle">{t.profile.fair_index.toUpperCase()}</text>
              <text x={center - maxRadius - 4} y={center + 3} fontSize="9" fontWeight="bold" fill="var(--text-muted)" textAnchor="end">{t.profile.strategy.toUpperCase()}</text>

              {/* The Data Polygon */}
              {totalDecisions > 0 && (
                <polygon
                  points={points}
                  fill="rgba(37, 99, 235, 0.25)"
                  stroke="var(--color-primary-main)"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
              )}
            </svg>
          </div>
        </div>

        {/* Personality Evaluation & Archetype */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/40 rounded-xl border border-border-main/50 space-y-1">
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">{t.profile.archetype}</p>
            <p className="text-lg font-bold text-white dark:text-white light:text-slate-900">{archetype.title}</p>
            <p className="text-xs text-text-muted leading-relaxed mt-1">{archetype.desc}</p>
          </div>

          {/* Quick Metrics Bars */}
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-[11px] mb-0.5">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" /> {t.profile.coop_rate}</span>
                <span className="font-bold">{metrics.cooperation}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${metrics.cooperation}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-0.5">
                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-400" /> {t.profile.risk_index}</span>
                <span className="font-bold">{metrics.risk}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${metrics.risk}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-0.5">
                <span className="flex items-center gap-1"><Scale className="w-3 h-3 text-primary-main" /> {t.profile.fair_index}</span>
                <span className="font-bold">{metrics.fairness}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-primary-main rounded-full" style={{ width: `${metrics.fairness}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DecisionProfile;
