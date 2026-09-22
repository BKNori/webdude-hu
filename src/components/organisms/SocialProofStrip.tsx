"use client";

import React from "react";
import { motion } from "motion/react";
import { Award, Clock, Palette, Star } from "lucide-react";

/**
 * SocialProofStrip — E-E-A-T autoritás sáv
 *
 * - Végtelenített CSS marquee (marquee-left / marquee-right) a globals.css-ből
 * - Minden szöveg világos (WCAG AA): text-slate-400 a #020617 alapon
 * - Amber kizárólag fémjelzésként (micro badge)
 */

const stats = [
  { icon: Palette, value: "26+", label: "Év grafikai tervezés" },
  { icon: Award, value: "16+", label: "Év webfejlesztés" },
  { icon: Star, value: "4.9/5", label: "Átlagos értékelés" },
  { icon: Clock, value: "24h", label: "Átlagos válaszidő" },
];

const clients = [
  "btshop.hu",
  "Rimai Kft.",
  "B2B Logisztika",
  "AI-Prompt.hu",
  "Next.js Projektek",
  "Firebase Appok",
  "WooCommerce",
  "Figma Design",
];

export default function SocialProofStrip() {
  return (
    <section
      className="relative py-16 md:py-20 bg-bg-base border-y border-white/5 overflow-hidden"
      aria-label="Statisztikák és referenciák"
    >
      {/* Halvány elválasztó fény */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0, 181, 241,0.05) 50%, transparent 100%)",
        }}
      />

      <div className="relative max-w-360 mx-auto px-6 lg:px-12 xl:px-16">
        {/* KPI statisztikák — E-E-A-T */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: idx * 0.08,
                }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-bg-surface border border-[#00B5F1]/20 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-[#00B5F1]" aria-hidden="true" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
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
          <span className="h-px w-12 bg-white/10" />
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-sky-400/90">
            <span className="w-1.5 h-1.5 rotate-45 bg-sky-500" />
            47+ leszállított projekt
          </span>
          <span className="h-px w-12 bg-white/10" />
        </div>

        <p className="text-center text-xs text-slate-400 uppercase tracking-widest font-medium mb-6">
          Eddig együttműködtem
        </p>

        {/* Marquee 1 — balra (végtelenített) */}
        <div className="relative overflow-hidden mb-4" aria-hidden="true">
          <div className="marquee-track marquee-left flex w-max gap-8">
            {[...clients, ...clients].map((client, i) => (
              <span
                key={`mq-a-${client}-${i}`}
                className="text-slate-400 text-sm font-semibold uppercase tracking-widest px-4 py-2 rounded-full border border-white/8 bg-white/4"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* Marquee 2 — jobbra (ellentétes irány) */}
        <div className="relative overflow-hidden" aria-hidden="true">
          <div className="marquee-track marquee-right flex w-max gap-8">
            {[...clients, ...clients].reverse().map((client, i) => (
              <span
                key={`mq-b-${client}-${i}`}
                className="text-slate-400 text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full border border-white/6 bg-white/2"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
