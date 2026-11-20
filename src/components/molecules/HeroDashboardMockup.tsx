"use client";

import React from "react";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import type { HeroDashboardContent } from "@/types/dictionary";
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

interface HeroDashboardMockupProps {
  content?: HeroDashboardContent;
}

const CARD_ICONS: Record<string, React.ElementType> = {
  traffic: TrendingUp,
  conversion: BarChart3,
  lighthouse: Zap,
};

const DEFAULT_DASHBOARD_CARDS: KpiCard[] = [
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

const BADGE_ICONS = [Globe, Code2, Bot, Palette];
const DEFAULT_BADGE_LABELS = ["Next.js 16", "React 19", "AI Automation", "Grafika"];

export default function HeroDashboardMockup({ content }: HeroDashboardMockupProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  const dashboardCards: KpiCard[] = content?.cards?.length
    ? content.cards.map((c) => ({
        ...c,
        icon: CARD_ICONS[c.id] ?? TrendingUp,
      }))
    : DEFAULT_DASHBOARD_CARDS;

  const badgeLabels = content?.techBadges?.length
    ? content.techBadges
    : DEFAULT_BADGE_LABELS;
  const techBadges = badgeLabels.map((label, idx) => ({
    label,
    icon: BADGE_ICONS[idx % BADGE_ICONS.length],
  }));

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 100, damping: 20, delay: 0.25 }
      }
      className="relative flex flex-col items-center justify-center lg:items-end"
    >
      {/* Főpanel — Dual Theme glassmorphism (Crisp Daylight + Luminous Slate) */}
      <div className="relative w-full max-w-sm lg:max-w-md rounded-3xl overflow-hidden border border-slate-200/90 border-t-white bg-white/92 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:border-white/12 dark:border-t-white/25 dark:bg-[#0F172A]/85 backdrop-blur-xl hero-float-main transition-colors duration-300 hover:border-[#0369A1]/45 dark:hover:border-sky-500/50 dark:shadow-[0_24px_70px_rgba(2,6,23,0.55)]">
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full bg-slate-300 dark:bg-white/25"
              aria-hidden="true"
            />
            <span
              className="w-3 h-3 rounded-full bg-[#0369A1]/70 dark:bg-[#00B5F1]/60"
              aria-hidden="true"
            />
            <span
              className="w-3 h-3 rounded-full bg-[#7C3AED]/70"
              aria-hidden="true"
            />
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-300 font-mono">
            webdude.hu — live
          </span>
          <div
            className="flex items-center gap-1.5 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider"
            aria-label={content?.liveAriaLabel ?? "Élő rendszer"}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 hero-pulse-dot"
              aria-hidden="true"
            />
            {content?.liveText ?? "Live"}
          </div>
        </div>

        {/* KPI kártyák */}
        <div className="p-4 sm:p-6 grid grid-cols-1 gap-2.5 sm:gap-4">
          {dashboardCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: 0.4 + idx * 0.1,
                      }
                }
                className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-[#0369A1]/40 dark:bg-[#0B1120]/80 dark:border-white/10 dark:border-t-white/15 dark:hover:border-brand-primary/40 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-500/10 border border-sky-600/25 dark:bg-[#00B5F1]/12 dark:border-[#00B5F1]/25">
                    <Icon
                      className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-[#0F172A] dark:text-text-primary font-semibold leading-tight">
                      {card.label}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      {card.sub}
                    </p>
                  </div>
                </div>
                <div className="text-xl font-extrabold tabular-nums text-[#0369A1] dark:text-[#00B5F1]">
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-slate-700 dark:bg-white/6 dark:border-white/12 dark:text-slate-300 text-xs font-medium"
              >
                <Icon className="w-3 h-3 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
                {badge.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fémjelzés — jobb fent */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                delay: 0.65,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }
        }
        className="hidden sm:block absolute -top-6 -right-4 lg:-right-8 z-10 hero-float-delayed"
        aria-hidden="true"
      >
        <div className="px-4 py-3 rounded-2xl border border-sky-300 bg-white/95 text-[#0369A1] shadow-[0_8px_28px_rgba(3,105,161,0.14)] dark:border-sky-500/40 dark:border-t-white/25 dark:bg-[#0F172A]/90 backdrop-blur-md dark:text-sky-300 text-xs font-bold flex items-center gap-2 dark:shadow-[0_8px_32px_rgba(0,181,241,0.18)]">
          <CheckCircle2 className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
          {content?.floatingTopText ?? "Lighthouse 97/100"}
        </div>
      </motion.div>

      {/* Fémjelzés — bal lent */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                delay: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }
        }
        className="hidden sm:block absolute -bottom-6 -left-4 lg:-left-8 z-10 hero-float-sub"
        aria-hidden="true"
      >
        <div className="px-4 py-3 rounded-2xl border border-sky-300 bg-white/95 text-[#0369A1] shadow-[0_8px_28px_rgba(3,105,161,0.14)] dark:border-[#00B5F1]/30 dark:border-t-white/25 dark:bg-[#0F172A]/90 backdrop-blur-md dark:text-[#00B5F1] text-xs font-bold flex items-center gap-2 dark:shadow-[0_8px_32px_rgba(0,181,241,0.18)]">
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          {content?.floatingBottomText ?? "Új lead érkezett"}
        </div>
      </motion.div>
    </motion.div>
  );
}