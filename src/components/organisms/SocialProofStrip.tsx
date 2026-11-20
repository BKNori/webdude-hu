"use client";

import React from "react";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import { Award, Clock, Palette, CheckCircle2 } from "lucide-react";
import { ProofContent } from "@/types/dictionary";
import Surface from "@/components/atoms/Surface";

interface SocialProofStripProps {
  /** Nyelvi tartalom a szótárból (HU/EN). */
  content: ProofContent;
}

/**
 * SocialProofStrip — E-E-A-T autoritás sáv
 *
 * - Végtelenített CSS marquee (marquee-left / marquee-right) a globals.css-ből
 * - Minden szöveg világos (WCAG AA): text-slate-400 a #020617 alapon
 */

const STAT_DEFAULTS = [
  { icon: Palette, value: "26+", label: "Év grafikai tervezés" },
  { icon: Award, value: "16+", label: "Év webfejlesztés" },
  { icon: CheckCircle2, value: "47+", label: "Lezárt sikeres projekt" },
  { icon: Clock, value: "24h", label: "Átlagos válaszidő" },
];

const CLIENT_DEFAULTS = [
  "btshop.hu",
  "Rimai Kft.",
  "B2B Logisztika",
  "AI-Prompt.hu",
  "Next.js Projektek",
  "Firebase Appok",
  "WooCommerce",
  "Figma Design",
];

export default function SocialProofStrip({ content }: SocialProofStripProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  // Nyelvi szövegek a szótárból; a HU alapértékek a fallback.
  const stats = STAT_DEFAULTS.map((stat, index) => ({
    ...stat,
    ...(content.stats[index] ?? {}),
  }));
  const clients =
    content.clients.length > 0 ? content.clients : CLIENT_DEFAULTS;

  return (
    <Surface
      tone="night-lift"
      aurora
      id="proof"
      ariaLabel={content.ariaLabel}
      className="py-20 md:py-28"
    >
      <div className="relative max-w-360 mx-auto px-6 lg:px-12 xl:px-16">
        {/* KPI statisztikák — E-E-A-T (Luminous Slate kártyák) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: idx * 0.08,
                      }
                }
                className="luminous-card p-6 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-600/25 dark:bg-[#00B5F1]/12 dark:border-[#00B5F1]/25 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-slate-600 dark:text-slate-300 font-semibold uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fémjelzés sor */}
        <div
          className="flex items-center justify-center gap-3 mb-8"
          aria-hidden="true"
        >
          <span className="h-px w-12 bg-slate-300 dark:bg-white/15" />
          <span className="eyebrow-badge inline-flex items-center gap-2 text-[#0369A1] dark:text-[#00B5F1]">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#0369A1] dark:bg-[#00B5F1]" />
            {content.badge}
          </span>
          <span className="h-px w-12 bg-slate-300 dark:bg-white/15" />
        </div>

        <p className="text-center font-mono text-xs text-slate-600 dark:text-slate-300 uppercase tracking-widest font-semibold mb-6">
          {content.clientsLabel}
        </p>

        {/* Marquee 1 — balra (végtelenített) */}
        <div className="relative overflow-hidden mb-4" aria-hidden="true">
          <div className="marquee-track marquee-left flex w-max gap-6">
            {[...clients, ...clients].map((client, i) => (
              <span
                key={`mq-a-${client}-${i}`}
                className="text-slate-800 dark:text-slate-100 text-sm font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full border border-slate-200/90 bg-white/90 shadow-2xs dark:shadow-none dark:border-white/12 dark:border-t-white/20 dark:bg-[#16223B]/80 backdrop-blur-md"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* Marquee 2 — jobbra (ellentétes irány) */}
        <div className="relative overflow-hidden" aria-hidden="true">
          <div className="marquee-track marquee-right flex w-max gap-6">
            {[...clients, ...clients].reverse().map((client, i) => (
              <span
                key={`mq-b-${client}-${i}`}
                className="text-slate-600 dark:text-slate-300 text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full border border-slate-200/80 bg-[#F8FAFC]/90 dark:border-white/10 dark:bg-[#0B1120]/75"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Surface>
  );
}
