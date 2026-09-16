"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Globe,
  ShoppingBag,
  Bot,
  Search,
  Palette,
  Layout,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const services = [
  {
    title: "Weboldal Készítés",
    description:
      "Next.js 16 és React 19 alapú ultragyors, SEO-optimalizált weboldalak, amelyek konvertálnak és skálázhatóak.",
    icon: <Globe />,
    featured: true,
    span: "col-span-1 lg:col-span-2 row-span-2",
    href: "/szolgaltatasok/weboldal-keszites",
    faq: {
      question: "Mennyi idő alatt készül el?",
      answer: "Egy bemutatkozó oldal 1–3 hét, komplexebb projektek 4–8 hét.",
    },
  },
  {
    title: "Webshop Fejlesztés",
    description:
      "Skálázható e-kereskedelmi megoldások WooCommerce és Shopify integrációval, modern fizetési rendszerekkel.",
    icon: <ShoppingBag />,
    featured: false,
    span: "col-span-1 row-span-1",
    href: "/szolgaltatasok/webshop-fejlesztes",
    faq: {
      question: "Milyen funkciókat tartalmaz?",
      answer:
        "Termékkezelés, rendelésfeldolgozás, fizetési integráció és raktárkészlet-nyomonkövetés.",
    },
  },
  {
    title: "AI Workflow Kialakítás",
    description:
      "AI automatizált munkafolyamatok, amelyek csökkentik a manuális munkát és növelik a hatékonyságot.",
    icon: <Bot />,
    featured: false,
    span: "col-span-1 row-span-1",
    href: "/szolgaltatasok/ai-workflow-kialakitas",
    faq: {
      question: "Milyen AI technológiákat használsz?",
      answer:
        "Groq API, OpenAI, és egyedi LLM integrációk a projekthez igazítva.",
    },
  },
  {
    title: "SEO Optimalizálás",
    description:
      "Technikai SEO audit, Lighthouse optimalizálás, Schema.org JSON-LD implementáció és kulcsszó stratégia.",
    icon: <Search />,
    featured: false,
    span: "col-span-1 row-span-1",
    href: "/szolgaltatasok/seo-optimalizalas",
    faq: {
      question: "Mennyi idő alatt látható az eredmény?",
      answer: "3–6 hónap alatt jelentős javulás, 6–12 hónapra stabil rangsor.",
    },
  },
  {
    title: "Grafikai Tervezés",
    description:
      "Professzionális arculattervezés, logo design és vizuális identitás kialakítása a WebDude 26 éves tapasztalatával.",
    icon: <Palette />,
    featured: false,
    span: "col-span-1 row-span-1",
    href: "/szolgaltatasok/grafikai-tervezes",
    faq: {
      question: "Hány design variációt kapok?",
      answer: "3–5 variációt a végső kiválasztásig, korlátlan revízióval.",
    },
  },
  {
    title: "Egyedi Arculattervezés",
    description:
      "Stratégiai márkaépítés, vizuális identitás és teljes körű design rendszer kialakítása.",
    icon: <Layout />,
    featured: false,
    span: "col-span-1 row-span-1",
    href: "/szolgaltatasok/egyedi-arculattervezes-logo",
    faq: {
      question: "Mi a különbség a logo és arculat között?",
      answer:
        "A logo a vizuális jelkép, az arculat a teljes vizuális identitásrendszer.",
    },
  },
];

export default function ServiceSectionNew() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };
  return (
    <section className="relative py-32 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-sky-500/10 text-sky-500 text-sm font-semibold tracking-wider uppercase mb-4">
            Szolgáltatások
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#e2e8f0] mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Amit nyújtok
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Prémium webfejlesztés, grafikai tervezés és AI automatizáció
            Kecskemétről
          </p>
        </motion.div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(240px,auto)]">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`${service.span} ${service.featured ? "bg-slate-900/80" : "bg-slate-900/80"} backdrop-blur-md rounded-4xl p-10 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-sky-500/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 border border-slate-700`}
            >
              {/* 3D Clay Icon */}
              <div className="relative mb-8">
                <motion.div
                  className="w-20 h-20 rounded-3xl bg-linear-to-br from-sky-500/20 to-violet-700/20 flex items-center justify-center text-sky-500 shadow-[0_4px_12px_rgba(0, 181, 241,0.2)]"
                  whileHover={{ rotate: [0, -5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-8 h-8">{service.icon}</div>
                </motion.div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-[#e2e8f0] mb-5 group-hover:text-sky-500 transition-colors duration-300 tracking-tight leading-tight">
                {service.title}
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-slate-400 mb-8 tracking-wide font-medium">
                {service.description}
              </p>

              {/* FAQ Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCard(index);
                }}
                className="w-full flex items-center justify-between gap-2 text-xs font-bold text-slate-500 uppercase tracking-[0.15em] hover:text-sky-500 transition-colors mt-4 pt-4 border-t border-slate-700 hover:border-sky-500/30"
              >
                <span>{service.faq.question}</span>
                {expandedCard === index ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {expandedCard === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-sm text-slate-400 leading-relaxed tracking-wide font-medium"
                >
                  {service.faq.answer}
                </motion.div>
              )}

              {service.featured && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-sky-500 font-semibold hover:text-sky-400 transition-colors mt-4"
                  >
                    Részletek
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="/szolgaltatasok"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-linear-to-r from-sky-500 to-violet-700 hover:from-violet-700 hover:to-sky-800 text-slate-950 font-semibold transition-all duration-300 shadow-[0_8px_24px_rgba(0, 181, 241,0.3)] hover:shadow-[0_18px_40px_rgba(0, 181, 241,0.4)]"
          >
            Összes szolgáltatás megtekintése
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
