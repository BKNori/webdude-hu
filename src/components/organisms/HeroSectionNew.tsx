"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import { ArrowRight, CheckCircle2, Award } from "lucide-react";
import HeroDashboardMockup from "@/components/molecules/HeroDashboardMockup";
import { HeroContent } from "@/types/dictionary";
import { buildHeroSlides } from "@/components/organisms/hero/heroSlidesConfig";
import HeroBackgroundLayers from "@/components/organisms/hero/HeroBackgroundLayers";
import {
  HeroSliderControls,
  HeroScrollHint,
} from "@/components/organisms/hero/HeroSliderControls";

interface HeroSectionNewProps {
  /** Nyelvi tartalom a szótárból (HU/EN). */
  content: HeroContent;
}

export default function HeroSectionNew({ content }: HeroSectionNewProps) {
  const SLIDES = buildHeroSlides(content);
  const shouldReduceMotion = useHydratedReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, [SLIDES.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, [SLIDES.length]);

  const goToSlide = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 12000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const panelY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);

  const slide = SLIDES[currentSlide];

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative isolate w-full min-h-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#0B1120] flex items-center"
      aria-label={content.ariaLabel}
    >
      <HeroBackgroundLayers
        slide={slide}
        currentSlide={currentSlide}
        glowOpacity={glowOpacity}
      />

      {/* Fő tartalom konténer */}
      <div className="relative z-10 w-full max-w-360 mx-auto px-6 lg:px-12 xl:px-16 pt-24 pb-14 lg:pt-40 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* BAL OLDAL — Animált Dia Tartalom (initial={false}: 0ms SSR LCP festés!) */}
          <div className="relative min-h-0 lg:min-h-130 flex items-center">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={slide.id}
                custom={direction}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: direction * 40 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction * -40 }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }
                }
                className="w-full flex flex-col items-start"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 shadow-2xs dark:shadow-none dark:bg-white/6 dark:border-white/15 dark:border-t-white/25 backdrop-blur-md mb-6">
                  <span
                    className="w-2 h-2 rounded-full bg-[#0369A1] dark:bg-brand-primary hero-pulse-dot"
                    aria-hidden="true"
                  />
                  <span className="eyebrow-badge text-[#0369A1] dark:text-brand-primary">
                    {slide.badge}
                  </span>
                </div>

                {/* H1 Címsor */}
                <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.7rem] leading-[1.12] text-[#0F172A] dark:text-white mb-6 text-balance">
                  {slide.titlePrefix}
                  <span className="hero-shimmer-text text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] via-[#0284C7] to-[#5B21B6] dark:from-[#00B5F1] dark:via-[#38bdf8] dark:to-[#5B21B6]">
                    {slide.titleHighlight}
                  </span>
                  {slide.titleSuffix}
                </h1>

                {/* Alcím */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl mb-6 text-balance">
                  {slide.subtitle}
                </p>

                {/* Szolgáltatás kulcsszavak */}
                <ul
                  className="flex flex-wrap gap-2 mb-6"
                  aria-label={content.highlightsAriaLabel}
                >
                  {slide.highlights.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-[#0369A1] dark:bg-brand-primary/8 dark:border-brand-primary/20 dark:text-brand-primary tracking-wide"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#0369A1] dark:bg-brand-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Bizalmi pontok */}
                <ul
                  className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8"
                  aria-label={content.trustAriaLabel}
                >
                  {slide.trustPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[#0369A1] dark:text-brand-primary shrink-0"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* CTA Gombok */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <motion.div
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                    whileTap={shouldReduceMotion ? { scale: 1 } : { scale: 0.97 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 100, damping: 20 }
                    }
                  >
                    <Link
                      href={slide.cta1.href}
                      id={slide.cta1.id}
                      className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white text-base uppercase tracking-wider bg-linear-to-r from-cta-from to-brand-secondary hover:from-brand-secondary hover:to-brand-secondary shadow-[0_8px_32px_rgba(0,181,241,0.35)] hover:shadow-[0_12px_40px_rgba(0,181,241,0.5)] transition-[transform,box-shadow,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0369A1] dark:focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                      aria-label={slide.cta1.text}
                    >
                      <span>{slide.cta1.text}</span>
                      <ArrowRight
                        className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>

                  {slide.cta2 && (
                    <Link
                      href={slide.cta2.href}
                      id={slide.cta2.id}
                      className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-base font-semibold text-slate-800 bg-white/85 border border-slate-300 hover:border-[#0369A1]/60 hover:text-[#0369A1] hover:bg-sky-500/8 dark:bg-transparent dark:text-slate-200 dark:border-white/15 dark:hover:border-brand-primary/60 dark:hover:text-brand-primary dark:hover:bg-brand-primary/8 transition-[color,border-color,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0369A1] dark:focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                      aria-label={slide.cta2.text}
                    >
                      {slide.cta2.text}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>

                {/* Tapasztalat és szakmai garancia / Social proof */}
                <div className="mt-8 flex items-center gap-3 text-slate-700 dark:text-slate-300 text-sm">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-600/25 text-[#0369A1] dark:bg-brand-primary/10 dark:border-brand-primary/20 dark:text-brand-primary">
                    <Award className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span>
                    <strong className="text-[#0F172A] dark:text-white font-mono tabular-nums">
                      {content.experienceYearsDesign}
                    </strong>{" "}
                    {content.experienceLabelDesign} ·{" "}
                    <strong className="text-[#0F172A] dark:text-white font-mono tabular-nums">
                      {content.experienceYearsDev}
                    </strong>{" "}
                    {content.experienceLabelDev} —{" "}
                    <span className="text-slate-600 dark:text-slate-400">{slide.ratingText}</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* JOBB OLDAL — Lebegő Mockup & Kiegészítő Vizuális Elem */}
          <motion.div
            style={shouldReduceMotion ? undefined : { y: panelY }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <HeroDashboardMockup content={content.dashboard} />
          </motion.div>
        </div>

        <HeroSliderControls
          slides={SLIDES}
          currentSlide={currentSlide}
          content={content}
          onGoToSlide={goToSlide}
          onPrevSlide={prevSlide}
          onNextSlide={nextSlide}
        />
      </div>

      <HeroScrollHint scrollHint={content.scrollHint} />
    </section>
  );
}
