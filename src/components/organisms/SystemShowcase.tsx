"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import { Search, Brain, Code2, Rocket, ArrowRight } from "lucide-react";

const STEP_DEFAULTS = [
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

import { SystemContent } from "@/types/dictionary";

interface SystemShowcaseProps {
  /** Nyelvi tartalom a szótárból (HU/EN). */
  content: SystemContent;
}

export default function SystemShowcase({ content }: SystemShowcaseProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  // Nyelvi szövegek a szótárból; a HU vizuális tokenek (ikon, szín) maradnak.
  const steps = STEP_DEFAULTS.map((step, index) => ({
    ...step,
    ...(content.steps[index] ?? {}),
  }));
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
      className="relative py-24 md:py-32 bg-[#F8FAFC] dark:bg-[#0B1120] border-y border-slate-200/80 dark:border-white/8 overflow-hidden"
      aria-label={content.ariaLabel}
    >
      {/* Háttér effekt */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(rgba(167,139,250,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 181, 241, 0.08) 0%, rgba(124, 58, 237, 0.05) 45%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-360 mx-auto px-6 lg:px-12 xl:px-16">
        {/* Szekció fejléc */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 100, damping: 20 }
          }
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-600/25 dark:bg-brand-primary/10 dark:border-brand-primary/25 mb-6">
            <span className="eyebrow-badge text-[#0369A1] dark:text-brand-primary">
              {content.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl text-[#0F172A] dark:text-white mb-4 leading-tight">
            {content.title.prefix}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-brand-primary dark:to-brand-secondary">
              {content.title.highlight}
            </span>
            {content.title.suffix}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Folyamatábra */}
        <div className="relative">
          {/* Összekötő vonal — desktop */}
          <div
            className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-slate-200 dark:bg-white/10 hidden lg:block"
            aria-hidden="true"
          />
          {/* Görgetésre feltöltődő fénylő folyamatvonal */}
          <motion.div
            className="absolute top-8 left-[12.5%] h-0.5 bg-linear-to-r from-[#0369A1] via-[#0284C7] to-[#6D28D9] dark:from-[#00B5F1] dark:via-[#38bdf8] dark:to-[#7C3AED] shadow-[0_0_12px_rgba(3,105,161,0.35)] dark:shadow-[0_0_16px_rgba(0,181,241,0.6)] hidden lg:block origin-left"
            style={{
              scaleX: shouldReduceMotion ? 1 : lineProgress,
              width: "75%",
            }}
            aria-hidden="true"
          />

          {/* Lépések */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isViolet = step.id === "design";
              return (
                <motion.div
                  key={step.id}
                  initial={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 36 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                          delay: idx * 0.1,
                        }
                  }
                  className="relative flex flex-col"
                >
                  {/* Ikon kör */}
                  <motion.div
                    whileHover={
                      shouldReduceMotion ? undefined : { scale: 1.05, y: -4 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 100, damping: 20 }
                    }
                    className="relative mb-6 w-fit"
                  >
                    {/* Outer glow gyűrű */}
                    <div
                      className="absolute inset-0 rounded-full blur-lg opacity-25 dark:opacity-45"
                      style={{
                        background: `radial-gradient(circle, ${step.color} 0%, transparent 70%)`,
                        transform: "scale(1.35)",
                      }}
                      aria-hidden="true"
                    />
                    <div
                      className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center bg-white shadow-xs dark:shadow-none dark:bg-[#0F172A] ${
                        isViolet
                          ? "border-[#6D28D9] dark:border-[#a78bfa]"
                          : "border-[#0369A1] dark:border-[#00B5F1]"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          isViolet
                            ? "text-[#6D28D9] dark:text-[#a78bfa]"
                            : "text-[#0369A1] dark:text-[#00B5F1]"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    {/* Step szám badge */}
                    <div
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                        isViolet
                          ? "bg-[#6D28D9] text-white dark:bg-[#a78bfa] dark:text-[#020617]"
                          : "bg-[#0369A1] text-white dark:bg-[#00B5F1] dark:text-[#020617]"
                      }`}
                      aria-hidden="true"
                    >
                      {step.step}
                    </div>
                  </motion.div>

                  {/* Kártya */}
                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -4,
                            scale: 1.01,
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                          }
                    }
                    className="luminous-card flex-1 p-7"
                  >
                    <h3 className="text-xl md:text-2xl text-[#0F172A] dark:text-white mb-3 tracking-wider">
                      {step.title}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-normal">
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
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.3,
                }
          }
          className="mt-16 text-center"
        >
          <motion.a
            href={content.cta.href}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? { scale: 1 } : { scale: 0.97 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 100, damping: 20 }
            }
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white text-base uppercase tracking-wider bg-linear-to-r from-cta-from to-cta-to hover:from-[#0369a1] hover:to-[#6d28d9] shadow-[0_8px_28px_rgba(7,89,133,0.4)] hover:shadow-[0_12px_36px_rgba(124,58,237,0.45)] transition-[transform,box-shadow,background-color] duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-bg-base"
            aria-label={content.cta.label}
          >
            {content.cta.label}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
