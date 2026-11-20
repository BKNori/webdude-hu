"use client";

import React from "react";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
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
    <div className="mt-12 lg:mt-16 flex items-center justify-between border-t border-slate-200/90 dark:border-white/5 pt-6">
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
              className={`h-2.5 rounded-full transition-[width,background-color] duration-300 focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-brand-primary ${
                isActive
                  ? "w-8 bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-brand-primary dark:to-brand-secondary shadow-[0_0_12px_rgba(3,105,161,0.35)] dark:shadow-[0_0_12px_rgba(0,181,241,0.5)]"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"
              }`}
            />
          );
        })}
        <span className="text-xs text-slate-600 dark:text-slate-400 font-mono ml-2">
          0{currentSlide + 1} / 0{slides.length}
        </span>
      </div>

      {/* Léptető Nyilak (Arrows) */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevSlide}
          aria-label={content.prevLabel}
          className="w-10 h-10 rounded-full border border-slate-300/90 bg-white/90 text-slate-700 hover:text-[#0369A1] hover:border-[#0369A1]/50 shadow-2xs dark:shadow-none dark:border-white/12 dark:border-t-white/20 dark:bg-[#0F172A]/75 backdrop-blur-sm dark:text-slate-200 dark:hover:text-brand-primary dark:hover:border-brand-primary/50 flex items-center justify-center transition-[color,border-color,transform] duration-300 focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-brand-primary"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={onNextSlide}
          aria-label={content.nextLabel}
          className="w-10 h-10 rounded-full border border-slate-300/90 bg-white/90 text-slate-700 hover:text-[#0369A1] hover:border-[#0369A1]/50 shadow-2xs dark:shadow-none dark:border-white/12 dark:border-t-white/20 dark:bg-[#0F172A]/75 backdrop-blur-sm dark:text-slate-200 dark:hover:text-brand-primary dark:hover:border-brand-primary/50 flex items-center justify-center transition-[color,border-color,transform] duration-300 focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-brand-primary"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export function HeroScrollHint({ scrollHint }: { scrollHint: string }) {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { delay: 1.5, duration: 0.6 }
      }
      className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[11px] pointer-events-none"
      aria-hidden="true"
    >
      <span className="eyebrow-badge">{scrollHint}</span>
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-4 h-7 rounded-full border border-slate-300 dark:border-white/20 flex items-start justify-center pt-1"
      >
        <div className="w-1 h-1.5 rounded-full bg-[#0369A1] dark:bg-brand-primary" />
      </motion.div>
    </motion.div>
  );
}
