"use client";

import React from "react";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import { CheckCircle2 } from "lucide-react";

interface BenefitItem {
  title: string;
  description: string;
}

interface AIBenefitsGridProps {
  benefits: BenefitItem[];
}

export default function AIBenefitsGrid({ benefits }: AIBenefitsGridProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring" as const, stiffness: 100, damping: 20 },
        },
      };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
          className="luminous-card group p-6 md:p-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/12 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 flex items-center justify-center mb-6 group-hover:border-[#0369A1]/50 dark:group-hover:border-[#00B5F1]/50 transition-colors">
            <CheckCircle2
              className="w-8 h-8 text-[#0369A1] dark:text-brand-primary"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-3">
            {benefit.title}
          </h3>
          <p className="text-[#334155] dark:text-slate-300 text-base leading-relaxed">
            {benefit.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
