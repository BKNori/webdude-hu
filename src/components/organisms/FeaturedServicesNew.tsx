"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
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

// ─────────────────────────────────────────────────────────────────────────────
// 4 FŐ SZOLGÁLTATÁS — Bento Grid (KKV fókusz, AEO mikro-GYIK blokkok)
// ─────────────────────────────────────────────────────────────────────────────
const primaryServices = [
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
    accent: "from-[#00B5F1]/15 to-transparent",
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
    accent: "from-[#00B5F1]/15 to-transparent",
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
    color: "#a78bfa",
    bgGlow: "rgba(167,139,250,0.08)",
    accent: "from-[#a78bfa]/15 to-transparent",
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
    bgGlow: "rgba(0, 181, 241,0.08)",
    accent: "from-[#00B5F1]/15 to-transparent",
    large: false,
    features: [
      { icon: Brush, text: "26 év grafikai rutin" },
      { icon: FileImage, text: "Nyomtatásra kész anyagok" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MÁSODLAGOS SZOLGÁLTATÁS — AI Automatizáció (külön sávban, vizuálisan hátrébb)
// ─────────────────────────────────────────────────────────────────────────────
const secondaryService = {
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
  color: "#a78bfa",
};

export default function FeaturedServicesNew() {
  return (
    <section
      className="relative py-24 md:py-32 bg-bg-base overflow-hidden"
      aria-label="Kiemelt szolgáltatások — Weboldal, WordPress, SEO, Grafika"
    >
      {/* Háttér dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 181, 241,0.04) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-360 mx-auto px-6 lg:px-12 xl:px-16">
        {/* Szekció fejléc */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B5F1]/10 border border-[#00B5F1]/20 mb-6">
            <span className="text-[#00B5F1] text-xs font-bold uppercase tracking-widest">
              Fő szolgáltatásaim
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-2xl">
              Weboldal · WordPress · SEO ·{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
                Grafika
              </span>
            </h2>
            <Link
              href="/szolgaltatasok"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-[#00B5F1] text-sm font-semibold transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-[#00B5F1] rounded-lg px-2 py-1"
              aria-label="Összes szolgáltatás megtekintése"
            >
              Összes szolgáltatás
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </motion.div>

        {/* ── 4 FŐ SZOLGÁLTATÁS BENTO GRID ──────────────────────────────────── */}
        {/* Layout: [Weboldal készítés 2-col] [WordPress] + [SEO] [Grafika] */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {primaryServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: idx * 0.1,
                }}
                className={service.large ? "lg:col-span-2" : "lg:col-span-1"}
              >
                <motion.div
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    boxShadow: `0 24px 64px ${service.bgGlow}`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                  className="group h-full flex flex-col p-8 rounded-3xl border border-white/8 hover:border-sky-500/50 relative overflow-hidden cursor-pointer transition-colors duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Glow overlay — hover-re megjelenik */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    aria-hidden="true"
                  />

                  {/* Sarok dísz */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-10"
                    style={{ background: service.bgGlow }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Fejléc */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <span
                          className="text-xs font-bold uppercase tracking-widest mb-2 block"
                          style={{ color: service.color }}
                        >
                          {service.eyebrow}
                        </span>
                        <div
                          className="w-14 h-14 rounded-2xl border flex items-center justify-center"
                          style={{
                            borderColor: `${service.color}30`,
                            background: `${service.color}12`,
                          }}
                        >
                          <Icon
                            className="w-7 h-7"
                            style={{ color: service.color }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <Link
                        href={service.href}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        aria-label={`${service.title} részletei`}
                        tabIndex={0}
                      >
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>

                    {/* Cím és leírás */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>

                    {/* AEO Mikro-GYIK blokk — Direct Answer ChatGPT/Perplexity számára */}
                    <div
                      className="mb-4 px-4 py-3 rounded-xl border-l-2 text-xs text-slate-400 leading-relaxed italic"
                      style={{
                        borderColor: `${service.color}50`,
                        background: `${service.color}06`,
                      }}
                    >
                      <span
                        className="font-semibold not-italic"
                        style={{ color: service.color }}
                      >
                        Gyors válasz:
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
                              className="flex items-center gap-2 text-xs text-slate-400"
                            >
                              <FIcon
                                className="w-3.5 h-3.5 shrink-0"
                                style={{ color: service.color }}
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
                          className="px-3 py-1 rounded-full text-xs font-medium border"
                          style={{
                            color: service.color,
                            borderColor: `${service.color}25`,
                            background: `${service.color}10`,
                          }}
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

        {/* ── MÁSODLAGOS SZEKCIÓ — AI Automatizáció (vizuálisan hátrébb tolva) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
        >
          {/* Elválasztó felirat */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/6" aria-hidden="true" />
            <span className="text-slate-600 text-xs uppercase tracking-widest font-semibold">
              Kiegészítő megoldás
            </span>
            <div className="flex-1 h-px bg-white/6" aria-hidden="true" />
          </div>

          {/* AI kártya — vízszintes, kisebb, halványabb */}
          <motion.div
            whileHover={{ y: -2, boxShadow: "0 12px 48px rgba(167,139,250,0.1)" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl border border-white/6 hover:border-[#a78bfa]/30 transition-colors duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(167,139,250,0.04) 0%, rgba(255,255,255,0.02) 100%)",
            }}
          >
            {/* Ikon */}
            <div
              className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0"
              style={{
                borderColor: `${secondaryService.color}30`,
                background: `${secondaryService.color}10`,
              }}
            >
              <secondaryService.icon
                className="w-6 h-6"
                style={{ color: secondaryService.color }}
                aria-hidden="true"
              />
            </div>

            {/* Szöveg */}
            <div className="flex-1 min-w-0">
              <span
                className="text-xs font-bold uppercase tracking-widest mb-1 block"
                style={{ color: secondaryService.color }}
              >
                {secondaryService.eyebrow}
              </span>
              <h3 className="text-lg font-bold text-white mb-1">
                {secondaryService.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-2">
                {secondaryService.description}
              </p>
              {/* AEO Mikro-GYIK */}
              <p className="text-xs text-slate-600 italic">
                <span
                  className="font-semibold not-italic"
                  style={{ color: `${secondaryService.color}80` }}
                >
                  Gyors válasz:
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
                    className="px-2.5 py-1 rounded-full text-xs font-medium border"
                    style={{
                      color: secondaryService.color,
                      borderColor: `${secondaryService.color}25`,
                      background: `${secondaryService.color}08`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={secondaryService.href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-[#a78bfa] rounded"
                style={{ color: secondaryService.color }}
                aria-label="AI automatizáció részletei"
              >
                Részletek
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
