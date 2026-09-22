"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";

interface AIFeatureCardProps {
  id: number;
  name: string;
  category: string;
  description: string;
  color: string;
  features: string[];
  href: string;
}

export default function AIFeatureCard({
  name,
  category,
  description,
  features,
  href,
}: AIFeatureCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = shouldReduceMotion
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
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
      className="group relative bg-slate-950/80 backdrop-blur-2xl ring-1 ring-white/5 rounded-3xl overflow-hidden hover:border-[#00B5F1]/40 hover:shadow-[0_18px_40px_rgba(0,181,241,0.15)] transition-all duration-300"
    >
      <div className="p-8">
        {/* Header */}
        <div className="w-16 h-16 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00B5F1]/30 transition-colors">
          <span className="text-2xl text-[#00B5F1]">⚡</span>
        </div>

        {/* Category */}
        <span className="text-xs font-bold text-[#00B5F1] uppercase tracking-wider mb-3 block">
          {category}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-200 mb-4 group-hover:text-[#00B5F1] transition-colors">
          {name}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-base mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-sm text-slate-300"
            >
              <CheckCircle
                className="w-4 h-4 text-[#00B5F1]"
                strokeWidth={1.5}
              />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={href}
          className="flex items-center justify-center gap-2 w-full py-4 bg-linear-to-r from-cta-from to-cta-to text-white font-bold rounded-2xl hover:shadow-[0_8px_24px_rgba(0,181,241,0.3)] transition-all group-hover:scale-[1.02]"
        >
          <span>Részletek</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </Link>
      </div>
    </motion.div>
  );
}
