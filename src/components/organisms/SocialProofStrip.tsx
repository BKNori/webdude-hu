"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Trophy, Users, Clock, Star } from "lucide-react";

const stats = [
  { icon: Trophy, value: "26+", label: "Év tapasztalat" },
  { icon: Users, value: "47+", label: "Elégedett ügyfél" },
  { icon: Star, value: "4.9", label: "Átlagos értékelés" },
  { icon: Clock, value: "24h", label: "Átlagos válaszidő" },
];

// Logók / partnerek (szövegesen, ikonként)
const clients = [
  "btshop.hu",
  "Rimai Kft.",
  "B2B Logisztika",
  "AI-Prompt.hu",
  "Next.js Projects",
  "Firebase Apps",
  "WooCommerce",
  "Figma Designs",
];

export default function SocialProofStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ["start end", "end start"],
  });

  // Scroll-velocity marquee sebesség
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-120, 0]);

  const reversedClients = [...clients].reverse();

  return (
    <section
      ref={stripRef}
      className="relative py-16 md:py-20 bg-[#020617] border-y border-white/5 overflow-hidden"
      aria-label="Statisztikák és referenciák"
    >
      {/* Halvány elválasztó vonal effekt */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,181,241,0.04) 50%, transparent 100%)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
        {/* KPI statisztikák */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: idx * 0.08,
                }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-[#00B5F1]" aria-hidden="true" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Elválasztó */}
        <div className="border-t border-white/5 mb-8" aria-hidden="true" />

        {/* Feliratok */}
        <p className="text-center text-xs text-slate-600 uppercase tracking-widest font-medium mb-6">
          Eddig együttműködtem
        </p>

        {/* Marquee szalag 1 — balra */}
        <div className="relative overflow-hidden mb-4" aria-hidden="true">
          <motion.div
            style={{ x: x1 }}
            className="flex gap-8 whitespace-nowrap"
            aria-hidden="true"
          >
            {[...clients, ...clients, ...clients].map((client, i) => (
              <span
                key={`${client}-${i}`}
                className="text-slate-600 text-sm font-semibold uppercase tracking-widest px-4 py-2 rounded-full border border-white/5 bg-white/2"
              >
                {client}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Marquee szalag 2 — jobbra (scroll velocity ellentétes) */}
        <div className="relative overflow-hidden" aria-hidden="true">
          <motion.div
            style={{ x: x2 }}
            className="flex gap-8 whitespace-nowrap"
            aria-hidden="true"
          >
            {[...reversedClients, ...reversedClients, ...reversedClients].map(
              (client, i) => (
                <span
                  key={`rev-${client}-${i}`}
                  className="text-slate-700 text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full border border-white/4 bg-white/1"
                >
                  {client}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
