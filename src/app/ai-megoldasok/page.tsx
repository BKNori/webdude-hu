"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap,
  Bot,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Target,
  TrendingUp,
  Clock,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "AI-alapú üzleti automatizáció, amely éjjel-nappal dolgozik érted.",
    subtitle:
      "Felejtsd el a manuális folyamatokat. Next.js és Firebase alapú egyedi AI munkafolyamatokat építek, amelyek skálázhatóvá teszik a vállalkozásodat.",
    cta: "Megnézem az AI folyamatokat",
    ctaLink: "/szolgaltatasok/ai-workflow-kialakitas",
    background: "/assets/banners/banner-webdde-copy-2.webp",
  },
  {
    id: 2,
    title: "AI-Prompt.hu: Ahol az AI valódi üzleti értéket teremt.",
    subtitle:
      "Saját fejlesztésű prompt-könyvtárammal és AI-eszközeimmel megtanítalak arra, hogyan hozd ki a legtöbbet a mesterséges intelligenciából.",
    cta: "Felfedezem az AI-eszközöket",
    ctaLink: "https://ai-prompt.hu",
    background: "/assets/banners/webdude-hero.webp",
  },
  {
    id: 3,
    title: "26 év szakértelem, 2026-os technológiai dominancia.",
    subtitle:
      "Nem csak weboldalt kapsz, hanem egy digitális szakértői partnert. SEO-barát kódolás, AEO (Answer Engine Optimization) és prémium AI-integráció egy helyen.",
    cta: "Kérek egy ingyenes konzultációt",
    ctaLink: "/kapcsolat",
    background: "/assets/banners/Charli-chaplin-darth-copyssss-copy.webp",
  },
];

const aiSolutions = [
  {
    id: 1,
    name: "AI Workflow Kialakítás",
    category: "AI Automatizáció",
    description:
      "Egyedi AI workflow rendszerek tervezése és implementálása, amelyek automatizálják az üzleti folyamatokat és növelik a hatékonyságot.",
    icon: Zap,
    color: "from-[#00B5F1] to-orange-500",
    features: [
      "Egyedi workflow tervezés",
      "ChatGPT és Claude integráció",
      "Automatikus feladat kiosztás",
      "Real-time monitoring",
    ],
    href: "/szolgaltatasok/ai-workflow-kialakitas",
  },
  {
    id: 2,
    name: "AI Kép és Videó Generálás",
    category: "AI Tartalomgyártás",
    description:
      "AI alapú kép és videó generálás marketing anyagokhoz, social media tartalmakhoz és weboldalakhoz. Midjourney, DALL-E, Runway ML.",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    features: [
      "AI képgenerálás (Midjourney, DALL-E)",
      "AI videó generálás (Runway ML)",
      "Social media tartalom",
      "Marketing anyagok",
    ],
    href: "/szolgaltatasok/ai-kep-es-videogeneralas",
  },
  {
    id: 3,
    name: "AI Prompt Engineering",
    category: "AI Fejlesztés",
    description:
      "Professzionális prompt engineering szolgáltatás, amely optimalizálja az AI modellek teljesítményét és biztosítja a konzisztens kimeneteket.",
    icon: Bot,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Prompt optimalizálás",
      "AI model tuning",
      "Kimenet minőségbiztosítás",
      "Batch processing",
    ],
    href: "/szolgaltatasok/ai-prompt-engineering",
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Hatékonyság Növelése",
    description:
      "Automatizálja az ismétlődő feladatokat és növelje a termelékenységet akár 300%-kal.",
  },
  {
    icon: Clock,
    title: "Időmegtakarítás",
    description:
      "Csökkentse a manuális munkaidőt és fókuszáljon a stratégiai feladatokra.",
  },
  {
    icon: Shield,
    title: "Hibamentes Működés",
    description:
      "AI rendszerek minimalizálják a hibákat és biztosítják a konzisztens minőséget.",
  },
  {
    icon: Target,
    title: "Skálázhatóság",
    description:
      "Növelje a kapacitást extra erőforrások nélkül, automatizált rendszerekkel.",
  },
];

export default function AIMSolutionsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <main className="min-h-screen bg-transparent text-text-primary">
      {/* Hero Slider Section */}
      <section className="relative min-h-150 overflow-hidden">
        <AnimatePresence mode="wait">
          {heroSlides.map(
            (slide, index) =>
              currentSlide === index && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={slide.background}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-slate-900/50" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center py-24">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-center space-y-6"
                    >
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-4xl md:text-6xl font-bold text-white leading-tight"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-lg text-white/90 max-w-3xl mx-auto"
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <Link
                          href={slide.ctaLink}
                          target={
                            slide.ctaLink.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            slide.ctaLink.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="inline-flex items-center gap-2 px-8 py-4 bg-[#00B5F1] text-white font-bold rounded-xl hover:bg-[#0095C7] transition-all border border-[#00B5F1]/30"
                        >
                          {slide.cta}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-[#00B5F1]/20 transition-colors border border-[#00B5F1]/30"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-[#00B5F1]/20 transition-colors border border-[#00B5F1]/30"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-[#00B5F1] w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 border-t border-[#E7ECF2] bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 mx-auto rounded-xl bg-white border border-[#E7ECF2] flex items-center justify-center shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
                    <BenefitIcon className="w-8 h-8 text-[#00B5F1]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111827]">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[#4B5563]">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Solutions Grid */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-[#111827] leading-tight tracking-tight mb-6">
              AI Megoldások{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#FF7A00] italic">
                Vállalkozásoknak
              </span>
            </h2>
            <p className="text-lg md:text-xl text-[#4B5563] max-w-lg leading-relaxed mx-auto mb-8 tracking-wide font-medium">
              Automatizált AI rendszerek, amelyek időt és pénzt takarítanak meg
              a KKV-knak. ChatGPT, Claude és egyedi AI megoldások.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiSolutions.map((solution, index) => {
              const SolutionIcon = solution.icon;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white border border-[#E7ECF2] rounded-2xl overflow-hidden hover:border-[#00B5F1]/30 transition-all duration-300 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] hover:-translate-y-1"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="w-14 h-14 rounded-xl bg-white border border-[#E7ECF2] flex items-center justify-center mb-4 group-hover:border-[#00B5F1]/30 transition-colors">
                      <SolutionIcon className="w-7 h-7 text-[#00B5F1]" />
                    </div>

                    {/* Category */}
                    <span className="text-xs font-bold text-[#00B5F1] uppercase tracking-wider mb-2 block">
                      {solution.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#111827] mb-3 group-hover:text-[#00B5F1] transition-colors">
                      {solution.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[#4B5563] text-sm mb-6 line-clamp-2">
                      {solution.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {solution.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-[#4B5563]"
                        >
                          <CheckCircle className="w-4 h-4 text-[#00B5F1]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href={solution.href}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-linear-to-r from-[#00B5F1] to-[#FF7A00] text-white font-bold rounded-xl hover:shadow-[0_8px_24px_rgba(0,181,241,0.3)] transition-all group-hover:scale-[1.02]"
                    >
                      <span>Részletek</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-[#E7ECF2] bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#111827] mb-4 tracking-tight">
            Készen áll az AI automatizációra?
          </h2>
          <p className="text-[#4B5563] mb-8 tracking-wide font-medium">
            Ingyenes konzultáció keretében együtt találjuk meg a legjobb AI
            megoldást az Ön üzleti igényeire.
          </p>
          <Link
            href="/kapcsolat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00B5F1] text-white font-bold rounded-xl hover:bg-[#0095C7] transition-all tracking-wide"
          >
            Ingyenes Konzultáció
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
