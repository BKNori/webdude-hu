"use client";

/**
 * Nedel Market — WooCommerce Katalógus & Irodai Szerver esettanulmány
 * (WebDude OS v7.0 / Kék-Lila).
 *
 * A `NedelMarketBentoGrid`-et összeszerkesztő, dedikált Client Component
 * (motion/react rugó-fizika + `useReducedMotion` akadálymentesítés). A
 * METAADATOK és a JSON-LD sémák NEM itt élnek: azok a `src/data/caseStudySeo.ts`
 * SSOT-táblájában vannak, a `[slug]/page.tsx` szerveroldalon, XSS-védve
 * injektálja őket.
 *
 * Színek: kizárólag Kék-Lila v7.0 tokenek; arany/amber/sárga TILOS.
 */

import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Server, ShieldCheck, Search, BarChart3 } from "lucide-react";
import NedelMarketBentoGrid from "@/components/organisms/NedelMarketBentoGrid";

/** A hero kép útvonala. */
const HERO_IMG = "/assets/portfolio/nedel-market/nedel_market_banner.webp";

/** A KPI / áttekintő blokk négy mezője. */
const OVERVIEW = [
  {
    icon: Server,
    label: "Megoldás",
    value: "Integrált B2B rendszer",
    sub: "WooCommerce + helyi irodai szerver + könyvelőprogram",
  },
  {
    icon: ShieldCheck,
    label: "Biztonság",
    value: "Wordfence védelem",
    sub: "Valós idejű tűzfal, 0-24 órás védelem",
  },
  {
    icon: Search,
    label: "Láthatóság",
    value: "RankMath AEO/SEO",
    sub: "Google és AI-keresők számára is",
  },
  {
    icon: BarChart3,
    label: "Eredmény",
    value: "Adatalapú növekedés",
    sub: "GA4 + Search Console + Bing Webmaster",
  },
];

export default function NedelMarketCaseStudy() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-bg-base text-text-primary overflow-x-hidden">
      {/* ── 1. HERO SZEKCIÓ ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
        <div className="absolute inset-0 z-0">
          <ResponsiveImage
            src={HERO_IMG}
            alt="Nedel Market — WooCommerce katalógus és irodai szerver integráció"
            sizes="100vw"
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-b from-bg-base/70 via-bg-base/60 to-bg-base" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-brand-secondary/20 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-5 py-2 backdrop-blur-sm"
          >
            <Server className="h-4 w-4 text-brand-primary" aria-hidden />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand-primary">
              B2B Ökoszisztéma · Helyi Szerver
            </span>
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: shouldReduceMotion ? 0 : 0.1,
            }}
            className="mt-8 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            Nedel Market: Komplett B2B Kereskedelmi Ökoszisztéma és{" "}
            <span className="bg-linear-to-r from-cta-from to-cta-to bg-clip-text text-transparent">
              Helyi Szerver Integráció
            </span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: shouldReduceMotion ? 0 : 0.2,
            }}
            className="mx-auto mt-8 max-w-3xl text-lg font-light leading-relaxed text-slate-200 md:text-xl"
          >
            Több mint egy WooCommerce katalógus. Egy teljesen integrált rendszer,
            amely összeköti a modern online értékesítést az irodai
            könyvelőprogrammal és egy egyedileg épített, tükörmentett helyi
            szerverkörnyezettel.
          </motion.p>
        </div>
      </section>
      {/* ── 2. KPI / ÁTTEKINTÉS BLOKK ───────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OVERVIEW.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                }}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-8 backdrop-blur-xl transition-colors duration-300 hover:border-brand-primary/50"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/30 bg-brand-primary/10">
                  <Icon className="h-5 w-5 text-brand-primary" aria-hidden />
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary">
                  {item.label}
                </div>
                <div className="mt-2 text-xl font-bold text-brand-primary">
                  {item.value}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.sub}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 3. BENTO GRID (kibontva: NedelMarketBentoGrid) ──────────────── */}
      <NedelMarketBentoGrid />

      {/* ── 4. CTA BLOKK (ZÉRÓ FIX ÁR) ──────────────────────────────────── */}
      <section className="px-6 py-32">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-cta-from/20 to-cta-to/20 p-12 text-center backdrop-blur-xl md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-brand-primary/20 blur-3xl"
          />

          <div className="relative z-10">
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="text-3xl font-bold md:text-5xl"
            >
              Hasonló, könyvelőprogrammal szinkronizált, golyóálló webes
              rendszert szeretnél a cégednek?
            </motion.h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-slate-300">
              Kérj ingyenes projektfelmérést. Átvizsgálom a jelenlegi
              rendszeredet, és egyedi, értékalapú javaslattal térek vissza — fix
              árazás nélkül.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/kapcsolat"
                className="rounded-full bg-linear-to-r from-cta-from to-cta-to px-10 py-5 font-bold text-white shadow-lg shadow-brand-secondary/25 transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Kérj Ingyenes Projektfelmérést
              </Link>
              <Link
                href="/munkak"
                className="rounded-full border border-slate-600 px-10 py-5 font-bold text-slate-300 transition-colors duration-300 hover:border-brand-primary hover:text-brand-primary"
              >
                További munkák
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

