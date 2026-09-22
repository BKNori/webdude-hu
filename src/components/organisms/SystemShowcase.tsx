"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Search, Brain, Code2, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    id: "audit",
    step: "01",
    icon: Search,
    title: "Audit & Stratégia",
    description:
      "Ingyenes weboldal audit — sebességmérés, SEO elemzés, konverzió diagnózis. Ezek alapján születik a precíz fejlesztési terv.",
    color: "#00B5F1",
    bgGlow: "rgba(0, 181, 241,0.12)",
  },
  {
    id: "design",
    step: "02",
    icon: Brain,
    title: "AI Tervezés & UX",
    description:
      "AI-asszisztált user journey tervezés, wireframe és prototípus — mielőtt egy sor kód íródna. Pontosan tudod, mit kapsz.",
    color: "#a78bfa",
    bgGlow: "rgba(167,139,250,0.12)",
  },
  {
    id: "dev",
    step: "03",
    icon: Code2,
    title: "Next.js Fejlesztés",
    description:
      "React 19, TypeScript, Tailwind CSS v4 — villámgyors, skálázható architektúra, beépített SEO, Schema.org és Firebase backend.",
    color: "#00B5F1",
    bgGlow: "rgba(0, 181, 241,0.12)",
  },
  {
    id: "launch",
    step: "04",
    icon: Rocket,
    title: "Élesítés & Növekedés",
    description:
      "Firebase Hosting, automatizált CI/CD, Lighthouse 95+ garantálva. Átadás után sem hagylak magadra — havi support opcionálisan.",
    color: "#00B5F1",
    bgGlow: "rgba(0, 181, 241,0.12)",
  },
];

export default function SystemShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // A vonal progress a görgetéshez kötve
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-bg-base overflow-hidden"
      aria-label="Munkafolyamat bemutató"
    >
      {/* Háttér effekt */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(rgba(167,139,250,0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 181, 241,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-360 mx-auto px-6 lg:px-12 xl:px-16">
        {/* Szekció fejléc */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B5F1]/10 border border-[#00B5F1]/20 mb-6">
            <span className="text-[#00B5F1] text-xs font-bold uppercase tracking-widest">
              A rendszer, nem a személyem
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Hogyan születik egy{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
              eredményes
            </span>{" "}
            weboldal?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            4 atomi fázis — auditot követő AI-tervezéstől az élesítésig, mérhető
            KPI-okkal minden lépésnél.
          </p>
        </motion.div>

        {/* Folyamatábra */}
        <div className="relative">
          {/* Összekötő vonal — desktop */}
          <div
            className="absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-white/5 hidden lg:block"
            aria-hidden="true"
          />
          {/* Animált töltési vonal */}
          <motion.div
            className="absolute top-16 left-[12.5%] h-0.5 bg-linear-to-r from-[#00B5F1] via-[#00B5F1]/80 to-sky-400 hidden lg:block origin-left"
            style={{ scaleX: lineProgress, width: "75%" }}
            aria-hidden="true"
          />

          {/* Lépések */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: idx * 0.1,
                  }}
                  className="relative flex flex-col"
                >
                  {/* Ikon kör */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="relative mb-6"
                  >
                    {/* Outer glow gyűrű */}
                    <div
                      className="absolute inset-0 rounded-full blur-lg opacity-40"
                      style={{
                        background: `radial-gradient(circle, ${step.color} 0%, transparent 70%)`,
                        transform: "scale(1.4)",
                      }}
                      aria-hidden="true"
                    />
                    <div
                      className="relative w-16 h-16 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: step.color,
                        background: step.bgGlow,
                      }}
                    >
                      <Icon
                        className="w-8 h-8"
                        style={{ color: step.color }}
                        aria-hidden="true"
                      />
                    </div>
                    {/* Step szám badge */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                      style={{ background: step.color }}
                      aria-hidden="true"
                    >
                      {step.step}
                    </div>
                  </motion.div>

                  {/* Kártya */}
                  <motion.div
                    whileHover={{
                      y: -4,
                      scale: 1.02,
                      boxShadow: `0 20px 60px ${step.bgGlow}`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                    className="flex-1 p-6 rounded-3xl border border-white/8 hover:border-sky-500/50 backdrop-blur-sm transition-colors duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                    }}
                  >
                    <h3
                      className="text-lg font-bold mb-3"
                      style={{ color: step.color }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            delay: 0.4,
          }}
          className="mt-16 text-center"
        >
          <motion.a
            href="/kapcsolat"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 40px rgba(0, 181, 241,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-[#00B5F1] text-base uppercase tracking-wider border border-[#00B5F1]/40 hover:border-sky-500/50 hover:bg-[#00B5F1]/10 hover:shadow-[0_0_32px_rgba(0, 181, 241,0.25)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-bg-base"
            aria-label="Egyedi árajánlat kérése"
          >
            Egyedi árajánlat kérése
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
