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
  Layers,
  TrendingUp,
} from "lucide-react";

// Aszimmetrikus Bento Grid szolgáltatás kártyák
const services = [
  {
    id: "webdev",
    icon: Globe,
    eyebrow: "Fő szolgáltatás",
    title: "Prémium Webfejlesztés",
    description:
      "Next.js 16 + React 19 alapú, villámgyors weboldalak és webshopok. Beépített SEO, Schema.org JSON-LD, Firebase backend és admin panel — minden, amire szükséged van.",
    tags: ["Next.js 16", "TypeScript", "Firebase", "Lighthouse 95+"],
    href: "/szolgaltatasok/weboldal-keszites",
    color: "#00B5F1",
    bgGlow: "rgba(0,181,241,0.08)",
    accent: "from-[#00B5F1]/15 to-transparent",
    large: true, // 2-oszlopos
    features: [
      { icon: Zap, text: "LCP < 2.5s garantálva" },
      { icon: ShieldCheck, text: "Firebase Security" },
      { icon: Layers, text: "ISR + SSR architektúra" },
    ],
  },
  {
    id: "ai",
    icon: Bot,
    eyebrow: "AI & Automatizáció",
    title: "AI Automatizáció",
    description:
      "OpenAI GPT-4, Groq LLM integráció, AI chatbot és CRM automatizáció. Kevesebb manualitás, több lead, jobb ügyfélélmény.",
    tags: ["GPT-4", "Groq", "Chatbot", "CRM"],
    href: "/szolgaltatasok/ai-prompt-engineering",
    color: "#a78bfa",
    bgGlow: "rgba(167,139,250,0.08)",
    accent: "from-[#a78bfa]/15 to-transparent",
    large: false,
    features: [{ icon: TrendingUp, text: "+300% lead hatékonyság" }],
  },
  {
    id: "design",
    icon: Palette,
    eyebrow: "Vizuális Identitás",
    title: "Grafikai Tervezés",
    description:
      "26 éves grafikai tapasztalattal: arculattervezés, logó, nyomdai anyagok és UI/UX design — pixel-perfect minőségben.",
    tags: ["Figma", "Adobe CC", "Brand Identity", "UI/UX"],
    href: "/munkak",
    color: "#00B5F1",
    bgGlow: "rgba(0,181,241,0.08)",
    accent: "from-[#00B5F1]/15 to-transparent",
    large: false,
    features: [{ icon: Palette, text: "26 év grafikai rutin" }],
  },
];

export default function FeaturedServicesNew() {
  return (
    <section
      className="relative py-24 md:py-32 bg-bg-base overflow-hidden"
      aria-label="Kiemelt szolgáltatások"
    >
      {/* Háttér */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(rgba(0,181,241,0.04) 1px, transparent 1px)`,
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
              Három pillér
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-2xl">
              Értékteremtő{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#0095C7]">
                szolgáltatások
              </span>
              ,
              <br />
              mért eredmények
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

        {/* Bento Grid — aszimmetrikus */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => {
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
                  className="group h-full flex flex-col p-8 rounded-3xl border border-white/8 hover:border-amber-500/50 relative overflow-hidden cursor-pointer transition-colors duration-300"
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
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        aria-label={`${service.title} részletei`}
                        tabIndex={0}
                      >
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>

                    {/* Szöveg */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                      {service.description}
                    </p>

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
      </div>
    </section>
  );
}
