"use client";
import { motion } from "motion/react";
import React from "react";
import { Search, BrainCircuit, Code, Rocket } from "lucide-react";

interface SystemFlowStep {
  id: number;
  title: string;
  label: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const defaultSteps: SystemFlowStep[] = [
  {
    id: 1,
    title: "Audit",
    label: "Technológiai audit & elemzés",
    icon: Search,
  },
  {
    id: 2,
    title: "AI Tervezés",
    label: "Prompt engineering & workflow",
    icon: BrainCircuit,
  },
  {
    id: 3,
    title: "Next.js Fejlesztés",
    label: "React 19 & Firebase integráció",
    icon: Code,
  },
  {
    id: 4,
    title: "Élesítés (Launch)",
    label: "CI/CD, gyorsítás & skálázás",
    icon: Rocket,
  },
];

export default function AnimatedSystemFlow({
  steps = defaultSteps,
}: {
  steps?: SystemFlowStep[];
}) {
  const stepsToUse = steps || defaultSteps;
  return (
    <section className="w-full flex justify-center">
      <motion.div
        initial="hidden"
        animate="show"
        className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8 px-4"
        variants={{
          hidden: {},
          show: {},
        }}
      >
        {/* Steps column */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          {stepsToUse.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { delay: i * 0.12 } },
                }}
                className="relative bg-bg-surface/90 backdrop-blur-md border rounded-2xl p-6 flex flex-col gap-4 border-slate-700/80 hover:border-[#00B5F1]/50 transition-colors duration-300 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#00B5F1]/10 border border-[#00B5F1]/30 text-[#00B5F1] text-sm font-black font-mono">
                    0{step.id}
                  </div>
                  {Icon && (
                    <Icon
                      className="w-5 h-5 text-slate-400"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-text-primary">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.label}
                  </p>
                </div>
                {i < stepsToUse.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-px bg-slate-700" />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
