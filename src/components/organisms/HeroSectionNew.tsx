"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
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
    }, 6000);
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
      className="relative isolate w-full min-h-screen overflow-hidden bg-bg-base flex items-center"
      aria-label={content.ariaLabel}
    >
      <HeroBackgroundLayers
        slide={slide}
        currentSlide={currentSlide}
        glowOpacity={glowOpacity}
      />

      {/* Fő tartalom konténer */}
      <div className="relative z-10 w-full max-w-360 mx-auto px-6 lg:px-12 xl:px-16 pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* BAL OLDAL — Animált Dia Tartalom */}
          <div className="relative min-h-115 sm:min-h-120 lg:min-h-130 flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={slide.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 18,
                  mass: 0.8,
                }}
                className="w-full flex flex-col items-start"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-brand-primary/25 backdrop-blur-sm mb-6">
                  <span
                    className="w-2 h-2 rounded-full bg-brand-primary hero-pulse-dot"
                    aria-hidden="true"
                  />
                  <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">
                    {slide.badge}
                  </span>
                </div>

                {/* H1 Címsor */}
                <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.7rem] leading-[1.12] text-white mb-6 text-balance">
                  {slide.titlePrefix}
                  <span
                    className="hero-shimmer-text"
                    style={{
                      background:
                        "linear-gradient(90deg, #00B5F1 0%, #38bdf8 50%, #5B21B6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {slide.titleHighlight}
                  </span>
                  {slide.titleSuffix}
                </h1>

                {/* Alcím */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl mb-6 text-balance">
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-primary/8 border border-brand-primary/20 text-xs font-semibold text-brand-primary tracking-wide"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-brand-primary"
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
                      className="flex items-center gap-2 text-sm text-slate-400 font-medium"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-brand-primary shrink-0"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* CTA Gombok */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Link
                      href={slide.cta1.href}
                      id={slide.cta1.id}
                      className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-base uppercase tracking-wider bg-linear-to-r from-cta-from to-brand-secondary hover:from-brand-secondary hover:to-brand-secondary shadow-[0_8px_32px_rgba(0,181,241,0.35)] hover:shadow-[0_12px_40px_rgba(0,181,241,0.5)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
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
                      className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-base font-semibold text-slate-200 border border-slate-700/80 hover:border-brand-primary/60 hover:text-brand-primary hover:bg-brand-primary/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                      aria-label={slide.cta2.text}
                    >
                      {slide.cta2.text}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>

                {/* Tapasztalat és szakmai garancia / Social proof */}
                <div className="mt-8 flex items-center gap-3 text-slate-300 text-sm">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                    <Award className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span>
                    <strong className="text-white font-mono tabular-nums">
                      26+ év
                    </strong>{" "}
                    grafika ·{" "}
                    <strong className="text-white font-mono tabular-nums">
                      16+ év
                    </strong>{" "}
                    webfejlesztés —{" "}
                    <span className="text-slate-400">{slide.ratingText}</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* JOBB OLDAL — Lebegő Mockup & Kiegészítő Vizuális Elem */}
          <motion.div
            style={{ y: panelY }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <HeroDashboardMockup />
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
