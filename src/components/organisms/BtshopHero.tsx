"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";

const spring = { type: "spring" as const, stiffness: 60, damping: 16 };

const stats = [
  { value: "3200+", label: "Aktív termék, valós idejű szinkronban" },
  { value: "100%", label: "Automatizált rendelés- és készletkezelés" },
  { value: "0", label: "Manuális adminisztrációs lépés" },
];

export default function BtshopHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 px-6">
      {/* Mesh grid + cyan glow háttér */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,181,241,0.14) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={spring}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950/80 backdrop-blur-2xl border border-[#00B5F1]/30 shadow-[0_0_40px_rgba(0,181,241,0.15)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00B5F1] shadow-[0_0_12px_#00B5F1]" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00B5F1]">
            Enterprise E-commerce &amp; Rendszerintegráció
          </span>
        </motion.div>

        <motion.h1
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 32 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.08] tracking-tight text-[#e2e8f0]"
        >
          Amikor a weboldal nemcsak elad, hanem a{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#0095C7]">
            teljes céges infrastruktúrát
          </span>{" "}
          mozgatja.
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          A btshop.hu egy 3200 termékes B2B/B2C óriásáruház, ahol a
          WooCommerce nem egy külön sziget, hanem a cég idegrendszere:
          kétirányú szinkronban él a Kulcs-Soft könyvelőprogrammal, a Google
          Merchant Center feedjével és az MPL / Foxpost szállítási lánccal —
          emberi beavatkozás nélkül.
        </motion.p>

        {/* Statisztikák — Luminous Glassmorphism */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 28 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.3 + i * 0.08 }}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              className="bg-slate-950/80 backdrop-blur-2xl border border-slate-800/80 hover:border-[#00B5F1]/40 rounded-2xl p-8 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-black text-[#00B5F1] tracking-tight">
                {s.value}
              </div>
              <div className="mt-3 text-sm text-slate-400 leading-snug">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hero vizuál */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.45 }}
          className="mt-16 relative rounded-3xl overflow-hidden border border-[#00B5F1]/25 shadow-[0_0_80px_rgba(0,181,241,0.18)]"
        >
          <div className="relative aspect-video w-full bg-[#020617]">
            <Image
              src="/assets/portfolio/btshop/btshop-hero-placeholder.svg"
              alt="btshop.hu — 3200 termékes e-kereskedelmi rendszer vizuál"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
        <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest">
          Vizuális placeholder — a végleges kreatív hamarosan
        </p>
      </div>
    </section>
  );
}
