"use client";

import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroContent } from "@/types/dictionary";
import type { SlideData } from "@/components/organisms/hero/heroSlidesConfig";

interface HeroSliderControlsProps {
  slides: SlideData[];
  currentSlide: number;
  content: HeroContent;
  onGoToSlide: (idx: number) => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
}

export function HeroSliderControls({
  slides,
  currentSlide,
  content,
  onGoToSlide,
  onPrevSlide,
  onNextSlide,
}: HeroSliderControlsProps) {
  return (
    <div className="mt-12 lg:mt-16 flex items-center justify-between border-t border-white/5 pt-6">
      {/* Pöttyök (Dots) & Progress bar indicator */}
      <div
        className="flex items-center gap-3"
        role="tablist"
        aria-label={content.slidesNavAriaLabel}
      >
        {slides.map((s, idx) => {
          const isActive = currentSlide === idx;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`${idx + 1}. ${content.slideLabel}: ${s.highlights[0]}`}
              onClick={() => onGoToSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                isActive
                  ? "w-8 bg-linear-to-r from-brand-primary to-brand-secondary shadow-[0_0_12px_rgba(0,181,241,0.5)]"
                  : "w-2.5 bg-slate-800 hover:bg-slate-700"
              }`}
            />
          );
        })}
        <span className="text-xs text-slate-500 font-mono ml-2">
          0{currentSlide + 1} / 0{slides.length}
        </span>
      </div>

      {/* Léptető Nyilak (Arrows) */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevSlide}
          aria-label={content.prevLabel}
          className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/60 backdrop-blur-sm text-slate-300 hover:text-brand-primary hover:border-brand-primary/50 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={onNextSlide}
          aria-label={content.nextLabel}
          className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/60 backdrop-blur-sm text-slate-300 hover:text-brand-primary hover:border-brand-primary/50 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export function HeroScrollHint({ scrollHint }: { scrollHint: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-slate-500 text-[11px] pointer-events-none"
      aria-hidden="true"
    >
      <span className="uppercase tracking-widest font-medium">{scrollHint}</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-4 h-7 rounded-full border border-slate-800 flex items-start justify-center pt-1"
      >
        <div className="w-1 h-1.5 rounded-full bg-brand-primary" />
      </motion.div>
    </motion.div>
  );
}
