"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Award,
  Users,
  Shield,
  Clock,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Target,
  TrendingUp,
  Rocket,
  Heart,
  Palette,
  Globe,
} from "lucide-react";
import Link from "next/link";

// ─── E-E-A-T Előnyök — Balog Norbert személyes pozicionálás ─────────────────
const advantages = [
  {
    icon: Award,
    title: "26 Év Grafikai Rutin",
    description:
      "Balog Norbert 26 éve foglalkozik grafikai tervezéssel és vizuális kommunikációval — amit csak a hosszú, megélt tapasztalat adhat.",
    color: "from-[#00B5F1]/20 to-[#5B21B6]/20",
    iconColor: "text-[#00B5F1]",
    stat: "26+",
    statLabel: "Év dizájn",
  },
  {
    icon: Globe,
    title: "16 Év Webfejlesztés",
    description:
      "Next.js, WordPress, WooCommerce, Firebase — 16 év folyamatos webfejlesztői tapasztalat, nem csak elmélet.",
    color: "from-[#00B5F1]/20 to-[#5B21B6]/20",
    iconColor: "text-[#00B5F1]",
    stat: "16+",
    statLabel: "Év fejlesztés",
  },
  {
    icon: Users,
    title: "Közvetlen Kapcsolat Velem",
    description:
      "Közvetlenül Balog Norberttel dolgozol — nincs projektmenedzser közvetítő, nincs kommunikációs veszteség, nincs félreértés.",
    color: "from-[#00B5F1]/20 to-[#5B21B6]/20",
    iconColor: "text-[#00B5F1]",
    stat: "1:1",
    statLabel: "Kommunikáció",
  },
  {
    icon: Shield,
    title: "30 Napos Garancia",
    description:
      "Átadást követően hibajavítási garancia és folyamatos támogatás. Ha valami nem működik, megoldom — plusz díj nélkül.",
    color: "from-[#00B5F1]/20 to-[#5B21B6]/20",
    iconColor: "text-[#00B5F1]",
    stat: "30",
    statLabel: "Nap garancia",
  },
  {
    icon: Clock,
    title: "Gyors Átfutás",
    description:
      "Nincs bürokrácia, nincs hosszú onboarding. Amint egyeztünk, azonnali indulás és hatékony, fókuszált munkavégzés.",
    color: "from-[#00B5F1]/20 to-[#5B21B6]/20",
    iconColor: "text-[#00B5F1]",
    stat: "2x",
    statLabel: "Gyorsabb",
  },
  {
    icon: MessageSquare,
    title: "Transzparens Árazás",
    description:
      "Rejtett költségek nélkül, előre egyeztetett fix árak és fix határidők. Amit megígérek, azt tartom.",
    color: "from-[#00B5F1]/20 to-[#5B21B6]/20",
    iconColor: "text-[#00B5F1]",
    stat: "0",
    statLabel: "Rejtett cost",
  },
];

const benefits = [
  {
    icon: Target,
    title: "100% Fókusz a projektedre",
    description:
      "Nincs megosztott figyelem — kizárólag a te projektedre koncentrálok, amíg kész nincs.",
  },
  {
    icon: TrendingUp,
    title: "ROI fókuszú szemlélet",
    description:
      "Nem csak szép weboldalt készítek, hanem olyat, ami konvertál és megtérül.",
  },
  {
    icon: Palette,
    title: "Grafika + Kód egyben",
    description:
      "A legtöbb fejlesztő nem tervez, a legtöbb dizájner nem kódol. Én mindkettőt csinálom.",
  },
  {
    icon: Rocket,
    title: "Szenvedély minden projektben",
    description:
      "Minden munkában az elejétől a végéig én vagyok jelen — nem junior, nem kiszervezett csapat.",
  },
  {
    icon: Heart,
    title: "Hosszú távú kapcsolat",
    description:
      "A projekt átadása nem a vége, hanem az eleje — opcionális havi support és karbantartás is elérhető.",
  },
];

export default function WhyChooseMeSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 md:py-32 bg-transparent relative overflow-hidden"
      aria-label="Miért a WebDude — Balog Norbert"
    >
      {/* Háttér effektek */}
      <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B5F1]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5B21B6]/10 rounded-full blur-3xl" />

      <div className="px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* ── SZEKCIÓ FEJLÉC — E-E-A-T: Balog Norbert személyes entitás ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B5F1]/10 border border-[#00B5F1]/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#00B5F1]" aria-hidden="true" />
            <span className="text-xs font-bold text-[#00B5F1] uppercase tracking-wider">
              Miért a WebDude?
            </span>
          </motion.div>

          {/* H2 — Balog Norbert explicit E-E-A-T hivatkozással */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Balog Norbert vagyok —{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
              és ez teszi a különbséget
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Nem egy ügynökség, hanem egy dedikált szakértő — aki 26 év grafikai
            és 16 év webfejlesztői rutinnal készíti el a weboldaladat,
            WordPress-projektedet, megtervezi a SEO-stratégiát vagy az
            arculatodat. Közvetlen kommunikáció, nincs közvetítő, nincs rejtett
            díj.
          </p>
        </motion.div>

        {/* ── 6 ELŐNY GRID ──────────────────────────────────────────────────── */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {advantages.map((advantage, idx) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group h-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-3xl p-8 hover:border-[#00B5F1]/50 transition-all duration-500 shadow-xl shadow-slate-950/50 hover:shadow-[#00B5F1]/20 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-linear-to-br ${advantage.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-linear-to-br ${advantage.color} border border-white/10 flex items-center justify-center ${advantage.iconColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <advantage.icon className="w-8 h-8" aria-hidden="true" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">
                        {advantage.stat}
                      </div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider">
                        {advantage.statLabel}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00B5F1] transition-colors">
                    {advantage.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed grow">
                    {advantage.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ── AMI TÉNYLEG MEGKÜLÖNBÖZTET ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-slate-900/60 border border-[#00B5F1]/20 rounded-3xl p-12 backdrop-blur-md relative overflow-hidden mb-12"
        >
          <div className="absolute inset-0 bg-linear-to-r from-[#00B5F1]/5 to-[#5B21B6]/5" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Ami tényleg{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
                megkülönböztet
              </span>
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center text-[#00B5F1] mx-auto mb-4">
                    <benefit.icon className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/szia-norbi-vagyok"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-slate-950 font-bold hover:shadow-lg hover:shadow-[#00B5F1]/30 transition-all duration-300 shadow-lg shadow-[#00B5F1]/20 hover:scale-105"
            aria-label="Ismerj meg jobban — Balog Norbert bemutatkozó oldala"
          >
            <span>Ismerj meg jobban</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
