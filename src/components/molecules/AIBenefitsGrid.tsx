"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";

interface BenefitItem {
  title: string;
  description: string;
}

interface AIBenefitsGridProps {
  benefits: BenefitItem[];
}

export default function AIBenefitsGrid({ benefits }: AIBenefitsGridProps) {
  const shouldReduceMotion = useReducedMotion();

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
          className="group bg-slate-950/80 backdrop-blur-2xl ring-1 ring-white/5 rounded-3xl p-6 md:p-8 hover:border-[#00B5F1]/40 hover:shadow-[0_18px_40px_rgba(0,181,241,0.15)] transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00B5F1]/30 transition-colors group">
            <span className="text-2xl text-[#00B5F1]">✓</span>
          </div>
          <h3 className="text-xl font-bold text-slate-200 mb-3">
            {benefit.title}
          </h3>
          <p className="text-slate-400 text-base leading-relaxed">
            {benefit.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
