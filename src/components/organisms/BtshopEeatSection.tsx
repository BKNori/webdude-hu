"use client";

import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import { ShieldCheck, Award, Code2, type LucideIcon } from "lucide-react";

export default function BtshopEeatSection() {
  const shouldReduceMotion = useHydratedReducedMotion();

  const signals: {
    icon: LucideIcon;
    label: string;
    value: string;
  }[] = [
    {
      icon: Award,
      label: "Grafikai tapasztalat",
      value: "26 év",
    },
    {
      icon: Code2,
      label: "Komplex webfejlesztés",
      value: "16 év",
    },
    {
      icon: ShieldCheck,
      label: "Ügynökségi lánc",
      value: "Nincs",
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-28 px-6 bg-bg-base"
      aria-labelledby="btshop-eeat-heading"
    >
      {/* Luminous glow háttér */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(124, 58, 237,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0369A1] dark:text-brand-primary">
            Egyetlen szerző, teljes felelősség
          </span>
          <h2
            id="btshop-eeat-heading"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-text-primary"
          >
            Nem ügynökségi lánc.{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-brand-primary dark:to-brand-secondary">
              Közvetlen mérnöki precizitás.
            </span>
          </h2>
        </motion.div>

        {/* Hitelesítési signalok */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {signals.map((signal, index) => (
            <motion.div
              key={signal.label}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 28 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.08,
              }}
              className="group relative luminous-card rounded-3xl p-8 text-center"
            >
              <div
                aria-hidden
                className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-[#0369A1]/40 dark:via-brand-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <signal.icon
                className="w-9 h-9 text-[#0369A1] dark:text-brand-primary mx-auto mb-4"
                strokeWidth={1.5}
                aria-hidden
              />
              <div className="text-3xl md:text-4xl font-black text-[#0F172A] dark:text-text-primary tracking-tight">
                {signal.value}
              </div>
              <div className="mt-2 text-sm text-[#475569] dark:text-slate-400 leading-snug">
                {signal.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Authority-driven hitelesítő szöveg */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 28 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.24 }}
          className="relative luminous-card rounded-3xl p-10 md:p-14"
        >
          <p className="text-xl md:text-2xl leading-relaxed text-[#334155] dark:text-slate-200 text-center">
            26 év grafikai és 16 év komplex webfejlesztői tapasztalat.{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-brand-primary dark:to-brand-secondary font-bold">
              Nincs ügynökségi lánc, csak közvetlen, mérnöki precizitás.
            </span>{" "}
            A rendszerterv, az implementáció és a döntési jog ugyanannál a
            szakembernél van — így ha valami nem működik, nem lehet
            áthárítani senkinek.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
