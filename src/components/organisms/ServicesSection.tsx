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
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const services = [
  {
    title: "Weboldal Készítés",
    description:
      "Next.js 16 és React 19 alapú ultragyors, SEO-optimalizált weboldalak, amelyek konvertálnak és skálázhatóak.",
    icon: Globe,
    href: "/szolgaltatasok/weboldal-keszites",
    cta: "Részletek",
    faq: {
      question: "Mennyi idő alatt készül el?",
      answer: "Egy bemutatkozó oldal 1–3 hét, komplexebb projektek 4–8 hét.",
    },
  },
  {
    title: "Webshop Fejlesztés",
    description:
      "Skálázható e-kereskedelmi megoldások WooCommerce és Shopify integrációval, modern fizetési rendszerekkel.",
    icon: ShoppingBag,
    href: "/szolgaltatasok/webshop-fejlesztes",
    cta: "Részletek",
    faq: {
      question: "Mennyibe kerül egy webshop?",
      answer: "800.000–2.000.000 Ft között, a funkcionalitástól függően.",
    },
  },
  {
    title: "AI Workflow Kialakítás",
    description:
      "AI automatizált munkafolyamatok, amelyek csökkentik a manuális munkát és növelik a hatékonyságot.",
    icon: Bot,
    href: "/szolgaltatasok/ai-workflow-kialakitas",
    cta: "Részletek",
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
    icon: Search,
    href: "/szolgaltatasok/seo-optimalizalas",
    cta: "Részletek",
    faq: {
      question: "Mennyi idő alatt látható az eredmény?",
      answer: "3–6 hónap alatt jelentős javulás, 6–12 hónapra stabil rangsor.",
    },
  },
  {
    title: "Grafikai Tervezés",
    description:
      "Professzionális arculattervezés, logo design és vizuális identitás kialakítása a WebDude 26 éves tapasztalatával.",
    icon: Palette,
    href: "/szolgaltatasok/grafikai-tervezes",
    cta: "Részletek",
    faq: {
      question: "Hány design variációt kapok?",
      answer: "3–5 variációt a végső kiválasztásig, korlátlan revízióval.",
    },
  },
  {
    title: "Egyedi Arculattervezés",
    description:
      "Stratégiai márkaépítés, vizuális identitás és teljes körű design rendszer kialakítása.",
    icon: Layout,
    href: "/szolgaltatasok/egyedi-arculattervezes-logo",
    cta: "Részletek",
    faq: {
      question: "Mi a különbség a logo és arculat között?",
      answer:
        "A logo a vizuális jelkép, az arculat a teljes vizuális identitásrendszer.",
    },
  },
];

export default function ServicesSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <section className="py-20 bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-amber-500/5 via-transparent to-amber-500/5" />
        <div className="px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                Prémium Szolgáltatások
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Szolgáltatásaim
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Modern, skálázható és jövőálló megoldások, amelyek a WebDude 26
              éves vizuális és 16 éves szakmai tapasztalatát tükrözik.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={service.href} className="block h-full">
                  <div className="group h-full bg-bg-card border border-bg-elevated/40 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/10 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/20 transition-colors">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider mb-4">
                      {service.cta}
                    </div>

                    {/* Mikro-GYIK */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCard(idx);
                      }}
                      className="w-full flex items-center justify-between gap-2 text-xs font-bold text-white/60 uppercase tracking-wider hover:text-amber-500 transition-colors mt-4 pt-4 border-t border-white/10"
                    >
                      <span>{service.faq.question}</span>
                      {expandedCard === idx ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {expandedCard === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 text-xs text-white/70 leading-relaxed"
                      >
                        {service.faq.answer}
                      </motion.div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/szolgaltatasok"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-amber-500 text-bg-base font-bold hover:bg-amber-500/90 transition-all duration-300 shadow-lg shadow-amber-500/20"
            >
              Összes Szolgáltatás
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
