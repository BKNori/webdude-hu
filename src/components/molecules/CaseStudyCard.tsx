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
      className={`flex flex-col justify-between rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 shadow-[0_8px_24px_rgba(2,6,23,0.4)] hover:border-[#00B5F1]/40 hover:shadow-[0_18px_40px_rgba(0,181,241,0.12)] transition-all duration-500 ${className}`}
    >
      <div className="space-y-6">
        {/* Header */}
        <header>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00B5F1] bg-[#00B5F1]/10 px-3 py-1 rounded-md border border-[#00B5F1]/20 inline-block">
            {client}
          </span>
          <h3 className="mt-4 text-white text-2xl font-black tracking-tight leading-snug">
            {title}
          </h3>
        </header>

        {description && !problem && !solution ? (
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Részletek
            </span>
            <p className="text-sm leading-relaxed text-slate-300">
              {description}
            </p>
          </div>
        ) : (
          <>
            {/* 1. Probléma */}
            {problem && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Probléma (Fájdalompont)
                </span>
                <p className="text-sm leading-relaxed text-slate-300 italic">
                  &ldquo;{problem}&rdquo;
                </p>
              </div>
            )}

            {/* 2. Megoldás */}
            {solution && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Megoldás (Szakértelem)
                </span>
                <p className="text-sm leading-relaxed text-slate-300">
                  {solution}
                </p>
              </div>
            )}
          </>
        )}

        {/* 3. Eredmények (KPIs) */}
        {metrics.length > 0 && (
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Eredmények (KPI)
            </span>
            <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 text-center">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="text-[#00B5F1] font-black text-3xl tracking-tight">
                    {m.value}
                  </span>
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mt-1 leading-tight">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Social Proof */}
        {testimonial && (
          <div className="space-y-1.5 border-l-2 border-[#00B5F1]/40 pl-4 py-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Vélemény
            </span>
            <blockquote className="text-xs italic text-slate-300 leading-relaxed">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>
            <cite className="block text-[10px] font-bold text-slate-400 mt-1 not-italic">
              — {testimonial.author}
            </cite>
          </div>
        )}
      </div>

      {/* 5. Beágyazott CTA */}
      <div className="mt-8 pt-6 border-t border-slate-800/80">
        <Button
          href="/kapcsolat"
          variant="primary"
          className="w-full min-h-12 text-xs py-3 uppercase tracking-wider font-bold"
          analyticsEvent="casestudy_cta_click"
          analyticsParams={{ project: title }}
        >
          Hasonló eredményt szeretnék
        </Button>
      </div>
    </motion.article>
  );
}
