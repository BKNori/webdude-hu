// src/components/organisms/HeroSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroes = [
  {
    id: 1,
    title: "WordPress Weboldalak és Webshopok",
    subtitle: "Professzionális, skálázható megoldások KKV-k számára",
    description:
      "WordPress alapú weboldalak és webshopok fejlesztése WooCommerce integrációval, modern fizetési rendszerekkel és SEO-optimalizálással. 26 év tapasztalat, megbízható megoldások.",
    primaryCta: "Ingyenes konzultáció",
    primaryHref: "/kapcsolat",
    secondaryCta: "Webshop projektek",
    secondaryHref: "/munkak",
    background: "/assets/banners/webdude-hero.webp",
    trustIndicators: [
      "✓ WooCommerce szakértő",
      "✓ SEO-optimalizált",
      "✓ Fix árak",
    ],
  },
  {
    id: 2,
    title: "AI-Prompt.hu - AI Prompt Engineering",
    subtitle: "AI-vezérelt prompt engineering és workflow automatizáció",
    description:
      "AI-prompt.hu projectem - modern AI prompt engineering szolgáltatások, amelyek automatizálják a munkafolyamatokat és növelik a hatékonyságot. Kiváló leadek és konverzió.",
    primaryCta: "AI-Prompt.hu megtekintése",
    primaryHref: "https://ai-promt.hu",
    secondaryCta: "AI szolgáltatások",
    secondaryHref: "/ai-megoldasok",
    background: "/assets/banners/ai-design-hero.webp",
    trustIndicators: ["✓ OpenAI GPT-4", "✓ Custom LLM", "✓ Automatizáció"],
  },
  {
    id: 3,
    title: "Weboldal, ami dolgozik helyetted",
    subtitle: "Webfejlesztés, AI automatizáció és grafikai tervezés",
    description:
      "Next.js alapú, villámgyors weboldalak és AI-vezérelt lead-generálás kis- és középvállalkozásoknak. 26 év grafikai, 16 év fejlesztői tapasztalat — egy emberrel, ügynökségi mellébeszélés nélkül.",
    primaryCta: "Ingyenes konzultáció kérése",
    primaryHref: "/kapcsolat",
    secondaryCta: "Esettanulmányok",
    secondaryHref: "/munkak",
    background: "/assets/banners/Charli-chaplin-darth-copyssss-copy.webp",
    trustIndicators: [
      "✓ Nincs projektmenedzser",
      "✓ Közvetlen kommunikáció",
      "✓ Fix határidők",
    ],
  },
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroes.length);
    }, 6000); // 6 másodpercenként vált

    return () => clearInterval(timer);
  }, []);

  const nextHero = () => {
    setCurrentHero((prev) => (prev + 1) % heroes.length);
  };

  const prevHero = () => {
    setCurrentHero((prev) => (prev - 1 + heroes.length) % heroes.length);
  };

  const goToHero = (index: number) => {
    setCurrentHero(index);
  };

  return (
    <section className="relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
      {/* Liquid Gradient Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-linear-to-br from-[#00B5F1]/20 to-[#5B21B6]/20 rounded-full blur-3xl animate-blob-1 pointer-events-none" />
      <div className="absolute top-[30%] right-[-15%] w-[40vw] h-[40vw] bg-linear-to-br from-[#00B5F1]/15 to-[#5B21B6]/15 rounded-full blur-3xl animate-blob-2 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-linear-to-br from-[#00B5F1]/15 to-[#5B21B6]/15 rounded-full blur-3xl animate-blob-3 pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentHero}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 -z-20 w-full h-full"
          style={{ y }}
        >
          <Image
            src={heroes[currentHero].background}
            alt={`Hero Background ${currentHero + 1}`}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay a szöveg olvashatóságához */}
      <div className="absolute inset-0 -z-10 bg-slate-900/40" />

      {/* Navigation Arrows */}
      <button
        onClick={prevHero}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#E7ECF2] text-[#111827] hover:bg-[#00B5F1] hover:border-[#00B5F1] hover:text-slate-950 transition-all duration-300 flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextHero}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#E7ECF2] text-[#111827] hover:bg-[#00B5F1] hover:border-[#00B5F1] hover:text-slate-950 transition-all duration-300 flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToHero(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentHero === index
                ? "bg-[#00B5F1] w-8"
                : "bg-[#94A3B8] hover:bg-[#4B5563]"
            }`}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
                {heroes[currentHero].title}
              </span>
              <br className="hidden md:block" />
              <span className="text-3xl md:text-4xl lg:text-5xl text-white mt-2 block font-bold">
                {heroes[currentHero].subtitle}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              {heroes[currentHero].description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Elsődleges CTA */}
              <Link
                href={heroes[currentHero].primaryHref}
                className="w-full sm:w-auto bg-[#00B5F1] hover:bg-[#5B21B6] text-slate-950 font-bold text-lg py-4 px-8 rounded-full hover:shadow-[0_12px_32px_rgba(0, 181, 241,0.3)] transition-all duration-300 transform hover:scale-105"
              >
                {heroes[currentHero].primaryCta}
              </Link>

              {/* Másodlagos CTA */}
              <Link
                href={heroes[currentHero].secondaryHref}
                className="w-full sm:w-auto border border-white/40 text-white font-semibold text-lg py-4 px-8 rounded-full hover:border-[#00B5F1] hover:text-[#00B5F1] bg-white/10 backdrop-blur-md transition-all duration-300"
              >
                {heroes[currentHero].secondaryCta}
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-8 text-sm font-mono text-white/80 uppercase tracking-widest">
              {heroes[currentHero].trustIndicators.map((indicator, index) => (
                <span key={index}>{indicator}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
