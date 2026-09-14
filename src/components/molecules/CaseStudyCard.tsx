"use client";
import { motion } from "motion/react";
import React from "react";
import Button from "@/components/atoms/Button";

type Metric = { label: string; value: string };

interface CaseStudyCardProps {
  title: string;
  client: string;
  problem?: string;
  solution?: string;
  description?: string;
  testimonial?: {
    text: string;
    author: string;
  };
  metrics?: Metric[];
  className?: string;
}

export default function CaseStudyCard({
  title,
  client,
  problem,
  solution,
  description,
  testimonial,
  metrics = [],
  className = "",
}: CaseStudyCardProps) {
  return (
    <motion.article
      whileHover={{ translateY: -6 }}
      className={`flex flex-col justify-between rounded-3xl bg-white border border-[#E7ECF2] p-8 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] hover:border-[#00B5F1]/70 transition-all duration-500 ${className}`}
    >
      <div className="space-y-6">
        {/* Header */}
        <header>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#4B5563] bg-[#F8FAFC] px-3 py-1 rounded-md border border-[#E7ECF2] inline-block">
            {client}
          </span>
          <h3 className="mt-4 text-[#111827] text-2xl font-black tracking-tight leading-snug font-mono">
            {title}
          </h3>
        </header>

        {description && !problem && !solution ? (
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] block">
              Részletek
            </span>
            <p className="text-sm leading-relaxed text-[#4B5563]">
              {description}
            </p>
          </div>
        ) : (
          <>
            {/* 1. Probléma */}
            {problem && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] block">
                  Probléma (Fájdalompont)
                </span>
                <p className="text-sm leading-relaxed text-[#4B5563] italic">
                  &ldquo;{problem}&rdquo;
                </p>
              </div>
            )}

            {/* 2. Megoldás */}
            {solution && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] block">
                  Megoldás (Szakértelem)
                </span>
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  {solution}
                </p>
              </div>
            )}
          </>
        )}

        {/* 3. Eredmények (KPIs) */}
        {metrics.length > 0 && (
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] block">
              Eredmények (KPI)
            </span>
            <div className="grid grid-cols-2 gap-4 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E7ECF2] text-center">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="text-[#00B5F1] font-black text-3xl tracking-tight font-mono">
                    {m.value}
                  </span>
                  <span className="text-[9px] text-[#94A3B8] uppercase tracking-widest font-bold mt-1 leading-tight">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Social Proof */}
        {testimonial && (
          <div className="space-y-1.5 border-l-2 border-[#E7ECF2] pl-4 py-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] block">
              Vélemény
            </span>
            <blockquote className="text-xs italic text-[#4B5563] leading-relaxed">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>
            <cite className="block text-[10px] font-bold text-[#94A3B8] mt-1 not-italic">
              — {testimonial.author}
            </cite>
          </div>
        )}
      </div>

      {/* 5. Beágyazott CTA */}
      <div className="mt-8 pt-6 border-t border-[#E7ECF2]">
        <Button
          href="/kapcsolat"
          variant="primary"
          className="w-full min-h-12 text-xs py-3 uppercase tracking-wider font-mono font-bold"
          analyticsEvent="casestudy_cta_click"
          analyticsParams={{ project: title }}
        >
          Hasonló eredményt szeretnék
        </Button>
      </div>
    </motion.article>
  );
}
