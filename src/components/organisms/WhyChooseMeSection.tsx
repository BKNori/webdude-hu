"use client";

import React from "react";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import Surface from "@/components/atoms/Surface";
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
import { WhyContent } from "@/types/dictionary";

// ─── E-E-A-T Előnyök — WebDude személyes pozicionálás ─────────────────
const ADVANTAGE_DEFAULTS = [
  {
    icon: Award,
    title: "26 Év Grafikai Rutin",
    description:
      "A WebDude 26 éve foglalkozik grafikai tervezéssel és vizuális kommunikációval — amit csak a hosszú, megélt tapasztalat adhat.",
    color: "from-brand-primary/20 to-brand-secondary/20",
    iconColor: "text-brand-primary",
    stat: "26+",
    statLabel: "Év dizájn",
  },
  {
    icon: Globe,
    title: "16 Év Webfejlesztés",
    description:
      "Next.js, WordPress, WooCommerce, Firebase — 16 év folyamatos webfejlesztői tapasztalat, nem csak elmélet.",
    color: "from-brand-primary/20 to-brand-secondary/20",
    iconColor: "text-brand-primary",
    stat: "16+",
    statLabel: "Év fejlesztés",
  },
  {
    icon: Users,
    title: "Közvetlen Kapcsolat Velem",
    description:
      "Közvetlenül velem, a WebDude-dal dolgozol — nincs projektmenedzser közvetítő, nincs kommunikációs veszteség, nincs félreértés.",
    color: "from-brand-primary/20 to-brand-secondary/20",
    iconColor: "text-brand-primary",
    stat: "1:1",
    statLabel: "Kommunikáció",
  },
  {
    icon: Shield,
    title: "30 Napos Garancia",
    description:
      "Átadást követően hibajavítási garancia és folyamatos támogatás. Ha valami nem működik, megoldom — plusz díj nélkül.",
    color: "from-brand-primary/20 to-brand-secondary/20",
    iconColor: "text-brand-primary",
    stat: "30",
    statLabel: "Nap garancia",
  },
  {
    icon: Clock,
    title: "Gyors Átfutás",
    description:
      "Nincs bürokrácia, nincs hosszú onboarding. Amint egyeztünk, azonnali indulás és hatékony, fókuszált munkavégzés.",
    color: "from-brand-primary/20 to-brand-secondary/20",
    iconColor: "text-brand-primary",
    stat: "2x",
    statLabel: "Gyorsabb",
  },
  {
    icon: MessageSquare,
    title: "Transzparens Árazás",
    description:
      "Rejtett költségek nélkül, előre egyeztetett fix árak és fix határidők. Amit megígérek, azt tartom.",
    color: "from-brand-primary/20 to-brand-secondary/20",
    iconColor: "text-brand-primary",
    stat: "0",
    statLabel: "Rejtett cost",
  },
];

const BENEFIT_DEFAULTS = [
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

interface WhyChooseMeProps {
  /** Nyelvi tartalom a szótárból (HU/EN). */
  content: WhyContent;
}

export default function WhyChooseMeSection({ content }: WhyChooseMeProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  // Nyelvi szövegek a szótárból; a HU vizuális tokenek (ikon, szín) maradnak.
  const advantages = ADVANTAGE_DEFAULTS.map((item, index) => ({
    ...item,
    ...(content.advantages[index] ?? {}),
  }));
  const benefits = BENEFIT_DEFAULTS.map((item, index) => ({
    ...item,
    ...(content.benefits[index] ?? {}),
  }));

  return (
    <Surface
      tone="night-lift"
      aurora
      id="about"
      ariaLabel={content.ariaLabel}
      className="py-24 md:py-32"
    >
      <div className="px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* ── SZEKCIÓ FEJLÉC — E-E-A-T: Balog Norbert személyes entitás ──────── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 100, damping: 20 }
          }
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 shadow-2xs dark:shadow-none dark:bg-white/6 dark:border-white/15 dark:border-t-white/25 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
            <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1]">
              {content.eyebrow}
            </span>
          </div>

          {/* H2 — WebDude explicit E-E-A-T hivatkozással */}
          <h2 className="text-4xl md:text-6xl text-[#0F172A] dark:text-white mb-6">
            {content.title.prefix}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
              {content.title.highlight}
            </span>
            {content.title.suffix}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </motion.div>

        {/* ── 6 ELŐNY GRID (Dual Theme kártyák) ─────────────────────────── */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {advantages.map((advantage, idx) => (
            <motion.div
              key={advantage.title}
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                className="luminous-card group h-full p-8 relative overflow-hidden"
              >
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-600/25 text-[#0369A1] dark:bg-[#00B5F1]/12 dark:border-[#00B5F1]/25 flex items-center justify-center dark:text-[#00B5F1] group-hover:scale-105 transition-transform duration-300">
                      <advantage.icon className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-extrabold text-[#0369A1] dark:text-[#00B5F1] tabular-nums">
                        {advantage.stat}
                      </div>
                      <div className="font-mono text-xs text-slate-600 dark:text-slate-300 font-semibold uppercase tracking-wider">
                        {advantage.statLabel}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl text-[#0F172A] dark:text-white mb-3 tracking-wider group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1] transition-colors">
                    {advantage.title}
                  </h3>

                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed grow font-normal">
                    {advantage.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ── AMI TÉNYLEG MEGKÜLÖNBÖZTET ────────────────────────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 100, damping: 20, delay: 0.2 }
          }
          className="luminous-card p-8 md:p-12 bg-linear-to-br from-white via-[#F8FAFC] to-[#EEF2FF]/70 dark:from-[#16223B]/90 dark:via-[#111C33]/90 dark:to-[#1E1B4B]/40 relative overflow-hidden mb-12"
        >
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl text-[#0F172A] dark:text-white text-center mb-12 tracking-wider">
              {content.benefitsTitle.prefix}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
                {content.benefitsTitle.highlight}
              </span>
              {content.benefitsTitle.suffix}
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={benefit.title}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, scale: 0.95 }
                  }
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
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
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-600/25 text-[#0369A1] dark:bg-[#00B5F1]/12 dark:border-[#00B5F1]/25 flex items-center justify-center dark:text-[#00B5F1] mx-auto mb-4">
                    <benefit.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h4 className="text-xl text-[#0F172A] dark:text-white mb-2 tracking-wider">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── CTA (WCAG AAA fehér szöveg sötét kék-lila gradiensen) ─────────── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 100, damping: 20, delay: 0.3 }
          }
          className="text-center"
        >
          <Link
            href={content.cta.href}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-semibold uppercase tracking-wider shadow-[0_10px_28px_rgba(7,89,133,0.3)] hover:shadow-[0_14px_36px_rgba(109,40,217,0.38)] transition-[transform,box-shadow,background-color] duration-300 hover:scale-[1.03]"
            aria-label={content.cta.label}
          >
            <span>{content.cta.label}</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </Surface>
  );
}
