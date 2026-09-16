"use client";

import React from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Code2,
  Globe,
  Palette,
  TrendingUp,
  Zap,
} from "lucide-react";

/**
 * HeroDashboardMockup — lebegő Bento dashboard előnézet
 *
 * Soft Premium 2026 szabályok:
 * - Felület: bg-surface (#0f172a) + glassmorphism (backdrop-blur-md)
 * - Amber (#00B5F1) kizárólag fémjelzés: hover szegély + micro badge
 * - Nincs WebGL: tiszta CSS mesh grid, fénygömbök, glass kártyák
 */

interface KpiCard {
  id: string;
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
}

const dashboardCards: KpiCard[] = [
  {
    id: "traffic",
    icon: TrendingUp,
    label: "Organikus forgalom",
    value: "+184%",
    sub: "6 hónap alatt",
  },
  {
    id: "conversion",
    icon: BarChart3,
    label: "Konverzió növekedés",
    value: "+40%",
    sub: "A/B tesztelés után",
  },
  {
    id: "lighthouse",
    icon: Zap,
    label: "Lighthouse Score",
    value: "97 / 100",
    sub: "Core Web Vitals",
  },
];

const techBadges = [
  { label: "Next.js 16", icon: Globe },
  { label: "React 19", icon: Code2 },
  { label: "AI Automation", icon: Bot },
  { label: "Grafika", icon: Palette },
];

export default function HeroDashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.3 }}
      className="relative flex flex-col items-center justify-center lg:items-end"
    >
      {/* Főpanel — glassmorphism bg-surface */}
      <div className="relative w-full max-w-sm lg:max-w-md rounded-3xl overflow-hidden border border-white/10 bg-[#0f172a]/90 backdrop-blur-md hero-float-main transition-colors duration-300 hover:border-sky-500/50 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full bg-red-500/80"
              aria-hidden="true"
            />
            <span
              className="w-3 h-3 rounded-full bg-sky-500/80"
              aria-hidden="true"
            />
            <span
              className="w-3 h-3 rounded-full bg-emerald-500/80"
              aria-hidden="true"
            />
          </div>
          <span className="text-xs text-slate-400 font-mono">
            webdude.hu — live
          </span>
          <div
            className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-wider"
            aria-label="Élő rendszer"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 hero-pulse-dot"
              aria-hidden="true"
            />
            Live
          </div>
        </div>

        {/* KPI kártyák — bg-surface alapon, arany akcentussal */}
        <div className="p-6 grid grid-cols-1 gap-4">
          {dashboardCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.5 + idx * 0.12,
                }}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#0f172a] border border-white/8 hover:border-sky-500/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#00B5F1]/12 border border-[#00B5F1]/20">
                    <Icon
                      className="w-5 h-5 text-[#00B5F1]"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-[#e2e8f0] font-medium leading-tight">
                      {card.label}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {card.sub}
                    </p>
                  </div>
                </div>
                <div className="text-xl font-extrabold tabular-nums text-[#00B5F1]">
                  {card.value}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech badges */}
        <div className="px-6 pb-6 flex flex-wrap gap-2">
          {techBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium"
              >
                <Icon className="w-3 h-3" aria-hidden="true" />
                {badge.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fémjelzés — arany hallmark, jobb fent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="absolute -top-6 -right-4 lg:-right-8 z-10 hero-float-delayed"
        aria-hidden="true"
      >
        <div className="px-4 py-3 rounded-2xl border border-sky-500/40 bg-[#0f172a]/90 backdrop-blur-md text-sky-400 text-xs font-bold flex items-center gap-2 shadow-[0_8px_32px_rgba(0, 181, 241,0.15)]">
          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          Lighthouse 97/100
        </div>
      </motion.div>

      {/* Fémjelzés — arany, bal lent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 1.0,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="absolute -bottom-6 -left-4 lg:-left-8 z-10 hero-float-sub"
        aria-hidden="true"
      >
        <div className="px-4 py-3 rounded-2xl border border-[#00B5F1]/25 bg-[#0f172a]/90 backdrop-blur-md text-[#00B5F1] text-xs font-bold flex items-center gap-2 shadow-[0_8px_32px_rgba(0, 181, 241,0.15)]">
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          Új lead érkezett
        </div>
      </motion.div>
    </motion.div>
  );
}