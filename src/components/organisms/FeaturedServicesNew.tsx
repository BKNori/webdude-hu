"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import Surface from "@/components/atoms/Surface";
import {
  Globe,
  Bot,
  Palette,
  ArrowRight,
  Zap,
  ShieldCheck,
  TrendingUp,
  Search,
  LayoutTemplate,
  Brush,
  RefreshCw,
  BarChart3,
  FileImage,
} from "lucide-react";
import { ServicesContent } from "@/types/dictionary";

interface FeaturedServicesNewProps {
  /** Nyelvi tartalom a szótárból (HU/EN). */
  content: ServicesContent;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4 FŐ SZOLGÁLTATÁS — Bento Grid (KKV fókusz, AEO mikro-GYIK blokkok)
// ─────────────────────────────────────────────────────────────────────────────
const PRIMARY_SERVICE_DEFAULTS = [
  {
    id: "weboldal",
    icon: Globe,
    eyebrow: "Fő szolgáltatás",
    title: "Weboldal készítés",
    description:
      "Prémium, villámgyors weboldalak és webshopok — Next.js 16, WordPress vagy teljesen egyedi fejlesztésben. Beépített SEO, Schema.org JSON-LD és Firebase backend.",
    microFaq:
      "Mennyi idő alatt készül el? 2–6 hét, a projekt komplexitásától függően.",
    tags: ["Egyedi fejlesztés", "Lighthouse 95+", "Mobile-first"],
    href: "/szolgaltatasok/weboldal-keszites",
    color: "#00B5F1",
    bgGlow: "rgba(0, 181, 241,0.08)",
    accent: "from-brand-primary/15 to-transparent",
    large: true, // 2-oszlopos
    features: [
      { icon: Zap, text: "LCP < 2.5s garantálva" },
      { icon: ShieldCheck, text: "Biztonságos, karbantartható kód" },
      { icon: TrendingUp, text: "Konverzió-optimalizált dizájn" },
    ],
  },
  {
    id: "wordpress",
    icon: LayoutTemplate,
    eyebrow: "WordPress fejlesztés",
    title: "WordPress fejlesztés",
    description:
      "Egyedi WordPress témák, WooCommerce webshopok és plugin fejlesztés. Gyors, biztonságos, karbantartható — saját admin felülettel.",
    microFaq:
      "WordPress vagy egyedi weboldal? WordPress KKV-knak, egyedi fejlesztés komplexebb rendszerekhez.",
    tags: ["WordPress", "WooCommerce", "Egyedi téma"],
    href: "/szolgaltatasok/wordpress-fejlesztes",
    color: "#00B5F1",
    bgGlow: "rgba(0, 181, 241,0.08)",
    accent: "from-brand-primary/15 to-transparent",
    large: false,
    features: [
      { icon: RefreshCw, text: "Könnyű szerkeszthetőség" },
    ],
  },
  {
    id: "seo",
    icon: Search,
    eyebrow: "SEO & AEO",
    title: "SEO optimalizálás",
    description:
      "Technikai SEO audit, tartalom-optimalizálás és AEO (AI-keresők számára) — hogy megtaláljanak Google-on és ChatGPT-n is.",
    microFaq:
      "Mikor lesznek SEO eredmények? 3–6 hónapon belül mérhető organikus forgalom-növekedés.",
    tags: ["Technikai SEO", "Kulcsszó stratégia", "AEO / AI Search"],
    href: "/szolgaltatasok/seo-optimalizalas",
    color: "#A78BFA",
    isViolet: true,
    bgGlow: "rgba(124, 58, 237, 0.12)",
    accent: "from-[#7C3AED]/15 to-transparent",
    large: false,
    features: [
      { icon: BarChart3, text: "+40–180% organikus forgalom (mért)" },
    ],
  },
  {
    id: "grafika",
    icon: Palette,
    eyebrow: "Vizuális Identitás",
    title: "Grafikai tervezés",
    description:
      "26 éves grafikai tapasztalattal: logó, arculattervezés, nyomdai anyagok és UI/UX design — pixel-perfect minőségben, Adobe CC és Figma eszközökkel.",
    microFaq:
      "Mit tartalmaz az arculattervezés? Logó, színpaletta, tipográfia, brand book és alkalmazott grafikai elemek.",
    tags: ["Logó & Arculat", "UI/UX Design", "Nyomdai anyagok"],
    href: "/munkak",
    color: "#00B5F1",
    isViolet: false,
    bgGlow: "rgba(0, 181, 241, 0.12)",
    accent: "from-[#00B5F1]/12 to-transparent",
    large: true,
    features: [
      { icon: Brush, text: "26 év grafikai rutin" },
      { icon: FileImage, text: "Nyomtatásra kész anyagok" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MÁSODLAGOS SZOLGÁLTATÁS — AI Automatizáció (külön sávban, vizuálisan hátrébb)
// ─────────────────────────────────────────────────────────────────────────────
const SECONDARY_SERVICE_DEFAULTS = {
  id: "ai",
  icon: Bot,
  eyebrow: "Kiegészítő megoldás",
  title: "AI Automatizáció",
  description:
    "OpenAI GPT-4, Groq LLM integráció, AI chatbot és CRM automatizáció. Kevesebb manualitás, több lead — meglévő vállalkozásodra ráépítve.",
  microFaq:
    "Kinek ajánlott az AI automatizáció? Olyan vállalkozásoknak, akik ismétlődő folyamataikat szeretnék hatékonyabbá tenni.",
  tags: ["GPT-4 integráció", "Chatbot", "CRM automatizáció"],
  href: "/szolgaltatasok/ai-prompt-engineering",
  color: "#A78BFA",
};

export default function FeaturedServicesNew({
  content,
}: FeaturedServicesNewProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  // Nyelvi szövegek a szótárból; a HU vizuális tokenek (ikon, szín) maradnak.
  const primaryServices = PRIMARY_SERVICE_DEFAULTS.map((item, index) => {
    const override = content.primary[index];
    if (!override) return item;
    return {
      ...item,
      eyebrow: override.eyebrow,
      title: override.title,
      description: override.description,
      microFaq: override.directAnswer,
      tags: override.tags,
      href: override.href,
      features: item.features.map((feature, featureIndex) => ({
        ...feature,
        text: override.features[featureIndex] ?? feature.text,
      })),
    };
  });

  const secondaryService = {
    ...SECONDARY_SERVICE_DEFAULTS,
    eyebrow: content.secondary.eyebrow,
    title: content.secondary.title,
    description: content.secondary.description,
    microFaq: content.secondary.directAnswer,
    tags: content.secondary.tags,
    href: content.secondary.href,
  };

  return (
    <Surface
      tone="slate-lift"
      aurora
      grid
      id="services"
      ariaLabel={content.ariaLabel}
      className="py-24 md:py-32"
    >
      <div className="max-w-360 mx-auto px-6 lg:px-12 xl:px-16">
        {/* Szekció fejléc */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 100, damping: 20 }
          }
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 shadow-2xs dark:shadow-none dark:bg-white/6 dark:border-white/15 dark:border-t-white/25 backdrop-blur-md mb-6">
            <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1]">
              {content.eyebrow}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-3xl md:text-5xl text-[#0F172A] dark:text-white leading-tight max-w-2xl">
              {content.title.prefix}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
                {content.title.highlight}
              </span>
              {content.title.suffix}
            </h2>
            <Link
              href={content.allServicesHref}
              className="inline-flex items-center gap-2 text-slate-700 hover:text-[#0369A1] dark:text-slate-300 dark:hover:text-[#00B5F1] text-sm font-semibold transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#00B5F1] rounded-lg px-2 py-1"
              aria-label={content.allServicesLabel}
            >
              {content.allServicesLabel}
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </motion.div>

        {/* ── 4 FŐ SZOLGÁLTATÁS BENTO GRID (2+1 / 1+2 aszimmetrikus) ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {primaryServices.map((service, idx) => {
            const Icon = service.icon;
            const isViolet = "isViolet" in service && service.isViolet;
            const accentText = isViolet
              ? "text-[#6D28D9] dark:text-[#A78BFA]"
              : "text-[#0369A1] dark:text-[#00B5F1]";
            const accentBox = isViolet
              ? "bg-violet-500/10 border-violet-600/25 text-[#6D28D9] dark:bg-[#7C3AED]/15 dark:border-[#A78BFA]/30 dark:text-[#A78BFA]"
              : "bg-sky-500/10 border-sky-600/25 text-[#0369A1] dark:bg-[#00B5F1]/12 dark:border-[#00B5F1]/25 dark:text-[#00B5F1]";
            const accentTag = isViolet
              ? "border-violet-300 bg-violet-50 text-[#5B21B6] dark:border-[#A78BFA]/30 dark:bg-[#7C3AED]/15 dark:text-[#DDD6FE]"
              : "border-sky-300 bg-sky-50 text-[#0369A1] dark:border-[#00B5F1]/25 dark:bg-[#00B5F1]/10 dark:text-[#00B5F1]";
            const accentBorderL = isViolet
              ? "border-l-[#6D28D9] dark:border-l-[#A78BFA]"
              : "border-l-[#0369A1] dark:border-l-[#00B5F1]";

            return (
              <motion.div
                key={service.id}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 36 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: idx * 0.08,
                      }
                }
                className={service.large ? "lg:col-span-2" : "lg:col-span-1"}
              >
                <motion.div
                  whileHover={
                    shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 100, damping: 20 }
                  }
                  className="luminous-card group h-full flex flex-col p-8 relative overflow-hidden"
                >
                  {/* Hover gradient fény */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Fejléc */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <span
                          className={`eyebrow-badge ${accentText} mb-2 block`}
                        >
                          {service.eyebrow}
                        </span>
                        <div
                          className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${accentBox}`}
                        >
                          <Icon className="w-7 h-7" aria-hidden="true" />
                        </div>
                      </div>
                      <Link
                        href={service.href}
                        className="w-10 h-10 rounded-full border border-slate-200 bg-slate-100/80 text-slate-700 group-hover:bg-[#0369A1] group-hover:text-white group-hover:border-[#0369A1] dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:group-hover:bg-[#00B5F1] dark:group-hover:text-slate-950 dark:group-hover:border-[#00B5F1] flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#00B5F1]"
                        aria-label={`${service.title} ${content.detailsAriaSuffix}`}
                        tabIndex={0}
                      >
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>

                    {/* Cím és leírás */}
                    <h3 className="text-xl md:text-2xl text-[#0F172A] dark:text-white mb-3 tracking-wider">
                      {service.title}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4 flex-1 font-normal">
                      {service.description}
                    </p>

                    {/* AEO Mikro-GYIK blokk — Direct Answer ChatGPT/Perplexity számára */}
                    <div
                      className={`mb-4 px-4 py-3 rounded-xl border border-slate-200/90 dark:border-white/8 border-l-4 ${accentBorderL} bg-[#F8FAFC] dark:bg-[#0B1120]/70 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal`}
                    >
                      <span className={`font-semibold ${accentText}`}>
                        {content.quickAnswerLabel}
                      </span>{" "}
                      {service.microFaq}
                    </div>

                    {/* Feature jelek */}
                    {service.features.length > 0 && (
                      <ul className="flex flex-col gap-2 mb-6">
                        {service.features.map((feat) => {
                          const FIcon = feat.icon;
                          return (
                            <li
                              key={feat.text}
                              className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium"
                            >
                              <FIcon
                                className={`w-3.5 h-3.5 shrink-0 ${accentText}`}
                                aria-hidden="true"
                              />
                              {feat.text}
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {/* Tag-ek */}
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${accentTag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ── MÁSODLAGOS SZEKCIÓ — AI Automatizáció ─────────────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 100, damping: 20, delay: 0.15 }
          }
        >
          {/* Elválasztó felirat */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-slate-300/80 dark:bg-white/12" aria-hidden="true" />
            <span className="eyebrow-badge text-slate-600 dark:text-slate-300">
              {content.secondary.dividerLabel}
            </span>
            <div className="flex-1 h-px bg-slate-300/80 dark:bg-white/12" aria-hidden="true" />
          </div>

          {/* AI kártya — vízszintes Dual Theme kártya */}
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 100, damping: 20 }
            }
            className="luminous-card flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8"
          >
            {/* Ikon */}
            <div className="w-12 h-12 rounded-xl border border-violet-600/25 bg-violet-500/10 text-[#6D28D9] dark:border-[#A78BFA]/30 dark:bg-[#7C3AED]/15 flex items-center justify-center shrink-0 dark:text-[#A78BFA]">
              <secondaryService.icon className="w-6 h-6" aria-hidden="true" />
            </div>

            {/* Szöveg */}
            <div className="flex-1 min-w-0">
              <span className="eyebrow-badge text-[#6D28D9] dark:text-[#A78BFA] mb-1 block">
                {secondaryService.eyebrow}
              </span>
              <h3 className="text-xl md:text-2xl text-[#0F172A] dark:text-white mb-1 tracking-wider">
                {secondaryService.title}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-2 font-normal">
                {secondaryService.description}
              </p>
              {/* AEO Mikro-GYIK */}
              <p className="text-xs text-slate-700 dark:text-slate-300 font-normal">
                <span className="font-semibold text-[#6D28D9] dark:text-[#A78BFA]">
                  {content.quickAnswerLabel}
                </span>{" "}
                {secondaryService.microFaq}
              </p>
            </div>

            {/* Tag-ek + link */}
            <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
              <div className="flex flex-wrap gap-2">
                {secondaryService.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold border border-violet-300 bg-violet-50 text-[#5B21B6] dark:border-[#A78BFA]/30 dark:bg-[#7C3AED]/15 dark:text-[#DDD6FE]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={secondaryService.href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6D28D9] hover:text-[#0F172A] dark:text-[#A78BFA] dark:hover:text-white transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] dark:focus-visible:ring-[#A78BFA] rounded"
                aria-label={`${secondaryService.title} ${content.detailsAriaSuffix}`}
              >
                {content.secondary.detailsLabel}
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Surface>
  );
}
