// src/components/organisms/HeroSlider.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  background: string;
  backgroundAlt: string;
  trustIndicators: string[];
}

const heroes: HeroSlide[] = [
  {
    id: 1,
    title: "Weboldal és webshop",
    subtitle: "Prémium fejlesztés, ami ügyfeleket hoz",
    description:
      "Next.js 16 alapú, villámgyors weboldalak és webshopok WooCommerce integrációval, SEO-optimalizálással. 26 év tapasztalat, egy emberrel — ügynökségi mellébeszélés nélkül.",
    primaryCta: "Ingyenes konzultáció",
    primaryHref: "/kapcsolat",
    secondaryCta: "Webshop projektek",
    secondaryHref: "/munkak",
    background: "/assets/banners/webdude-hero.webp",
    backgroundAlt: "WebDude prémium webfejlesztés — hero banner",
    trustIndicators: [
      "WooCommerce szakértő",
      "SEO-optimalizált",
      "Egyedi árazás",
    ],
  },
  {
    id: 2,
    title: "AI-Prompt.hu",
    subtitle: "AI prompt engineering és workflow automatizáció",
    description:
      "AI-Prompt.hu projektem — modern AI prompt engineering szolgáltatások, amelyek automatizálják a munkafolyamatokat és növelik a hatékonyságot. Kiváló leadek és konverzió.",
    primaryCta: "AI-Prompt.hu megtekintése",
    primaryHref: "https://ai-prompt.hu",
    secondaryCta: "AI szolgáltatások",
    secondaryHref: "/ai-megoldasok",
    background: "/assets/banners/ai-design-hero.webp",
    backgroundAlt: "AI-Prompt.hu — AI prompt engineering hero banner",
    trustIndicators: ["OpenAI GPT-4", "Custom LLM", "Automatizáció"],
  },
  {
    id: 3,
    title: "Weboldal, ami dolgozik helyetted",
    subtitle: "Webfejlesztés, AI automatizáció és grafika",
    description:
      "AI-vezérelt lead-generálás kis- és középvállalkozásoknak. 26 év grafikai, 16 év fejlesztői tapasztalat — egy emberrel, ügynökségi mellébeszélés nélkül.",
    primaryCta: "Ingyenes konzultáció kérése",
    primaryHref: "/kapcsolat",
    secondaryCta: "Esettanulmányok",
    secondaryHref: "/munkak",
    background: "/assets/banners/Charli-chaplin-darth-copyssss-copy.webp",
    backgroundAlt: "WebDude AI automatizáció — hero banner",
    trustIndicators: [
      "Nincs projektmenedzser",
      "Közvetlen kommunikáció",
      "Fix határidők",
    ],
  },
];

const SLIDE_INTERVAL_MS = 6000;

const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
} as const;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % heroes.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + heroes.length) % heroes.length);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return undefined;
    const timer = window.setInterval(nextSlide, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [nextSlide, shouldReduceMotion]);

  const slide = heroes[index];
  const isExternal = slide.primaryHref.startsWith("http");

  const primaryButtonClass =
    "inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cta-from to-cta-to px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sky-900/30 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950";

  const secondaryButtonClass =
    "inline-flex items-center justify-center rounded-lg border border-slate-600 px-8 py-4 text-base font-medium text-slate-200 transition-colors duration-200 hover:border-sky-500/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950";

  return (
    <section
      className="relative min-h-140 w-full max-w-[100vw] overflow-hidden bg-bg-base md:min-h-160"
      aria-roledescription="carousel"
      aria-label="Kiemelt szolgáltatások"
    >
      {/* Háttérkép — priority az LCP miatt (above the fold) */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0 z-0"
          initial={shouldReduceMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.8, ease: "easeOut" }
          }
        >
          <Image
            src={slide.background}
            alt={slide.backgroundAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Sötétítő réteg a WCAG kontraszthoz */}
          <div className="absolute inset-0 bg-linear-to-r from-bg-base/95 via-bg-base/80 to-bg-base/40" />
        </motion.div>
      </AnimatePresence>

      {/* Tartalom */}
      <div className="relative z-10 mx-auto flex min-h-140 max-w-7xl flex-col justify-center px-6 py-16 md:min-h-160 md:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -24 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { ...springTransition, opacity: { duration: 0.3 } }
            }
            className="max-w-2xl"
          >
            <h1 className="text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-4 text-xl font-medium text-sky-400 md:text-2xl">
              {slide.subtitle}
            </p>
            <p className="mt-6 text-base leading-relaxed text-slate-400 md:text-lg">
              {slide.description}
            </p>

            {/* Trust indikátorok */}
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {slide.trustIndicators.map((indicator) => (
                <li
                  key={indicator}
                  className="flex items-center gap-2 text-sm font-medium text-slate-300"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400"
                  />
                  {indicator}
                </li>
              ))}
            </ul>

            {/* CTA-k: egyetlen elsődleges + secondary ghost */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {isExternal ? (
                <a
                  href={slide.primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primaryButtonClass}
                >
                  {slide.primaryCta}
                </a>
              ) : (
                <Link href={slide.primaryHref} className={primaryButtonClass}>
                  {slide.primaryCta}
                </Link>
              )}
              <Link href={slide.secondaryHref} className={secondaryButtonClass}>
                {slide.secondaryCta}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Vezérlés: nyilak + indikátorok */}
        <div className="mt-12 flex items-center gap-6">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Előző dia"
            className="rounded-full border border-slate-700 bg-slate-900/70 p-3 text-slate-300 backdrop-blur-sm transition-colors hover:border-sky-500/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <div className="flex items-center gap-3">
            {heroes.map((hero, heroIndex) => (
              <button
                key={hero.id}
                type="button"
                onClick={() => setIndex(heroIndex)}
                aria-label={`Ugrás a(z) ${heroIndex + 1}. diára`}
                aria-current={heroIndex === index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  heroIndex === index
                    ? "w-8 bg-sky-400"
                    : "w-2 bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Következő dia"
            className="rounded-full border border-slate-700 bg-slate-900/70 p-3 text-slate-300 backdrop-blur-sm transition-colors hover:border-sky-500/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
