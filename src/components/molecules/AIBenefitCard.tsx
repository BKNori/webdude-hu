"use client";

import React from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface AIBenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function AIBenefitCard({
  icon: Icon,
  title,
  description,
  index,
}: AIBenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      }}
      className="group relative bg-slate-950/60 backdrop-blur-xl ring-1 ring-white/5 rounded-3xl p-8 hover:border-[#00B5F1]/30 hover:shadow-[0_18px_40px_rgba(0,181,241,0.15)] transition-all duration-300"
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00B5F1]/30 transition-colors">
        <Icon className="w-8 h-8 text-[#00B5F1]" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-[#00B5F1] transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-base leading-relaxed">{description}</p>
    </motion.div>
  );
}
