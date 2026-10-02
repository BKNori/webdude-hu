"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import HeroDashboardMockup from "@/components/molecules/HeroDashboardMockup";
import EmphasizedText from "@/components/atoms/EmphasizedText";
import { HeroContent } from "@/types/dictionary";

interface SlideData {
  id: string;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: React.ReactNode;
  highlights: string[];
  trustPoints: string[];
  cta1: {
    text: string;
    href: string;
    id: string;
  };
  cta2?: {
    text: string;
    href: string;
    id: string;
  };
  bgImage: string;
  bgAlt: string;
  ratingText: string;
}

const SLIDE_DEFAULTS: SlideData[] = [
  {
    id: "web-dev",
    badge: "Kecskemét · Országos kiszolgálás · Távolról is",
    titlePrefix: "Weboldal, ami nemcsak ",
    titleHighlight: "szép, hanem ügyfeleket",
    titleSuffix: " is hoz.",
    subtitle: (
      <>
        Egy kézben kapod a{" "}
        <span className="text-text-primary font-semibold">
          weboldal készítést
        </span>
        ,{" "}
        <span className="text-text-primary font-semibold">
          WordPress fejlesztést
        </span>
        , <span className="text-text-primary font-semibold">SEO-t</span> és{" "}
        <span className="text-text-primary font-semibold">
          grafikai tervezést
        </span>{" "}
        – ügynökségi mellébeszélés nélkül,{" "}
        <span className="text-text-primary font-semibold">
          26 év kreatív és 16 év webfejlesztői tapasztalattal.
        </span>
      </>
    ),
    highlights: [
      "Weboldal készítés",
      "WordPress fejlesztés",
      "SEO optimalizálás",
      "Grafikai tervezés",
    ],
    trustPoints: [
      "Közvetlen kommunikáció — nincs közvetítő",
      "30 napos hibajavítási garancia",
      "Fix árak, fix határidők",
    ],
    cta1: {
      text: "Kérj projektfelmérést",
      href: "/kapcsolat",
      id: "hero-cta-1-primary",
    },
    cta2: {
      text: "Munkáim megtekintése",
      href: "/munkak",
      id: "hero-cta-1-secondary",
    },
    bgImage: "/assets/banners/webdude-hero.webp",
    bgAlt:
      "WebDude — Weboldal készítés, WordPress, SEO és grafikai tervezés Kecskemétről",
    ratingText: "47+ elégedett ügyfél",
  },
  {
    id: "client-magnet",
    badge: "Technikai Webfejlesztés · Konverziós Webshopok",
    titlePrefix: "Skálázható weboldalak és webshopok, amelyek ",
    titleHighlight: "valódi forgalmat és bevételt",
    titleSuffix: " termelnek.",
    subtitle: (
      <>
        Egyedi fejlesztésű, villámgyors{" "}
        <span className="text-text-primary font-semibold">
          WordPress, WooCommerce és Next.js webshopok
        </span>
        , amelyek zökkenőmentes vásárlási élményt nyújtanak és technikai hibák nélkül konvertálják a látogatóidat vásárlókká.
      </>
    ),
    highlights: [
      "Egyedi Webshop Fejlesztés",
      "Technikai Kódoptimalizálás",
      "Villámgyors Betöltés (LCP < 2s)",
      "Konverziófókuszú UI/UX",
    ],
    trustPoints: [
      "Automatizált fizetés és számlázás",
      "Mobil-első, akadálymentes design",
      "Biztonságos felhő architektúra",
    ],
    cta1: {
      text: "Egyedi árajánlat kérése",
      href: "/kapcsolat",
      id: "hero-cta-2-primary",
    },
    cta2: {
      text: "Webshop fejlesztés részletei",
      href: "/szolgaltatasok/webshop-fejlesztes",
      id: "hero-cta-2-secondary",
    },
    bgImage: "/assets/banners/ronch caffe adris nagybanner 20221005c copy 2.webp",
    bgAlt: "WebDude — Technikai webfejlesztés és konverziós webshop készítés",
    ratingText: "Kiemelkedő konverziós arány",
  },
  {
    id: "ai-prompt-platform",
    badge: "AI Prompt Platform · Kiemelt Esettanulmány",
    titlePrefix: "AI Prompt Platform",
    titleHighlight: "",
    titleSuffix: "",
    subtitle: (
      <>
        Teljes körű, skálázható AI architektúra és prompt-ökoszisztéma kivitelezése.{" "}
        <span className="text-text-primary font-semibold">Next.js 16</span> és modern mesterséges intelligencia munkafolyamatok integrációjával, amely automatizálja a tartalomkészítést és a feladatokat.
      </>
    ),
    highlights: [
      "AI Prompt Ökoszisztéma",
      "Next.js 16 & React 19",
      "3 Hónapos Piaci Bevezetés",
      "Automatizált Generálás",
    ],
    trustPoints: [
      "Élesben tesztelt AI rendszerek",
      "Azonnali produktivitási ugrás",
      "Modern, jövőbiztos infrastruktúra",
    ],
    cta1: {
      text: "AI Megoldások felfedezése",
      href: "/szolgaltatasok",
      id: "hero-cta-3-primary",
    },
    cta2: {
      text: "Prompt sablonok",
      href: "/portal/prompt-sablonok",
      id: "hero-cta-3-secondary",
    },
    bgImage: "/assets/banners/webdude banner 2000x1000.webp",
    bgAlt: "WebDude — AI Prompt Platform",
    ratingText: "100% egyedi AI integráció",
  },
];

interface HeroSectionNewProps {
  /** Nyelvi tartalom a szótárból (HU/EN). */
  content: HeroContent;
}

export default function HeroSectionNew({ content }: HeroSectionNewProps) {
  // Nyelvi tartalom: a szótár szövegei felülírják a HU alapértéket, a
  // háttérképek, ikonok és egyéb design tokenek a helyükön maradnak.
  const SLIDES: SlideData[] = SLIDE_DEFAULTS.map((slide, index) => {
    const override = content.slides[index];
    if (!override) return slide;
    return {
      ...slide,
      badge: override.badge,
      titlePrefix: override.titlePrefix,
      titleHighlight: override.titleHighlight,
      titleSuffix: override.titleSuffix,
      subtitle: <EmphasizedText value={override.subtitle} />,
      highlights: override.highlights,
      trustPoints: override.trustPoints,
      cta1: {
        text: override.cta1.label,
        href: override.cta1.href,
        id: `hero-cta-${index + 1}-primary`,
      },
      cta2: {
        text: override.cta2.label,
        href: override.cta2.href,
        id: `hero-cta-${index + 1}-secondary`,
      },
      bgImage: override.bgImage,
      bgAlt: override.bgAlt,
      ratingText: override.ratingText,
    };
  });

  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // 6 másodperces automatikus léptetés pause-on-hover támogatással
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

  // Scroll-bound parallax a háttérhez és a dashboardhoz
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
      {/* HÁTTÉRKÉPEK — LCP VÉDELEM: kizárólag a 0. slide kap priority-t! */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ResponsiveImage
              alt={slide.bgAlt}
              className="object-cover opacity-65"
              priority={currentSlide === 0}
              sizes="100vw"
              src={slide.bgImage}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sötét kontrasztréteg a háttérkép felett (Kék-Lila v7.0 WCAG AAA) */}
      <div
        className="absolute inset-0 bg-slate-950/60 -z-10"
        aria-hidden="true"
      />

      {/* Tiszta CSS mesh grid — nincs WebGL */}
      <div
        className="absolute inset-0 bg-mesh-grid opacity-35 pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Szövegvédelmi scrim — bal oldali gradient a szöveg WCAG AA kontrasztjához */}
      <div
        className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/55 to-slate-950/25 -z-10"
        aria-hidden="true"
      />

      {/* Finom fénygömbök — kék-lila glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none overflow-hidden -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute -top-1/4 -left-1/4 w-[55vw] h-[55vw] rounded-full hero-blob-1"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 181, 241,0.25) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full hero-blob-2"
          style={{
            background:
              "radial-gradient(circle, rgba(91, 33, 182,0.18) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </motion.div>

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
                <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.7rem] font-extrabold tracking-tight leading-[1.12] text-white mb-6">
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
                <p className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl mb-6">
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
                      className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-slate-200 border border-slate-700/80 hover:border-brand-primary/60 hover:text-brand-primary hover:bg-brand-primary/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                      aria-label={slide.cta2.text}
                    >
                      {slide.cta2.text}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>

                {/* Értékelés / Social proof */}
                <div className="mt-8 flex items-center gap-3 text-slate-400 text-sm">
                  <div className="flex gap-0.5" aria-label={content.ratingAriaLabel}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-brand-primary fill-brand-primary"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span>
                    <strong className="text-white">4.9/5</strong> —{" "}
                    {slide.ratingText}
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

        {/* SLIDER VEZÉRLŐ ELEMEK: Nyilak & Pöttyök */}
        <div className="mt-12 lg:mt-16 flex items-center justify-between border-t border-white/5 pt-6">
          {/* Pöttyök (Dots) & Progress bar indicator */}
          <div
            className="flex items-center gap-3"
            role="tablist"
            aria-label={content.slidesNavAriaLabel}
          >
            {SLIDES.map((s, idx) => {
              const isActive = currentSlide === idx;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${idx + 1}. ${content.slideLabel}: ${s.highlights[0]}`}
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                    isActive
                      ? "w-8 bg-linear-to-r from-brand-primary to-brand-secondary shadow-[0_0_12px_rgba(0,181,241,0.5)]"
                      : "w-2.5 bg-slate-800 hover:bg-slate-700"
                  }`}
                />
              );
            })}
            <span className="text-xs text-slate-500 font-mono ml-2">
              0{currentSlide + 1} / 0{SLIDES.length}
            </span>
          </div>

          {/* Léptető Nyilak (Arrows) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label={content.prevLabel}
              className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/60 backdrop-blur-sm text-slate-300 hover:text-brand-primary hover:border-brand-primary/50 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label={content.nextLabel}
              className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/60 backdrop-blur-sm text-slate-300 hover:text-brand-primary hover:border-brand-primary/50 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll jelző (alul középen) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-slate-500 text-[11px] pointer-events-none"
        aria-hidden="true"
      >
        <span className="uppercase tracking-widest font-medium">
          {content.scrollHint}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-7 rounded-full border border-slate-800 flex items-start justify-center pt-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-brand-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
