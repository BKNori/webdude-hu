/**
 * Leanperial — "Quiet Luxury" esettanulmány (WebDude OS v7.0 / Kék-Lila).
 *
 * TISZTA React Server Component (RSC): nincs kliensoldali állapot, nincs
 * `"use client"`, nincs `motion`. A teljes interakciót (hover-lift, cyan/lila
 * glow, glassmorphism) tiszta CSS/Tailwind rétegek adják. Ennek köszönhetően
 * az oldal a lehető legkisebb JS-lábnyommal, maximális LCP-vel és SEO/AEO
 * optimalizáltsággal renderelődik (AGENTS.md Server-First elv, 90-8-2 szabály).
 *
 * METAADATOK & JSON-LD: NEM itt élnek. A `generateMetadata` és a strukturált
 * adatok a `src/data/caseStudySeo.ts` SSOT-táblájában vannak; a
 * `[slug]/page.tsx` szerveroldalon, XSS-védett módon injektálja őket.
 *
 * Színek: kizárólag a Kék-Lila v7.0 design tokenek (`bg-bg-base`,
 * `from-cta-from`/`to-cta-to`, `text-brand-primary`, `text-brand-secondary`).
 * Arany/amber/sárga osztály SZIGORÚAN TILOS.
 */

import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import Link from "next/link";
import { Gauge } from "lucide-react";
import LeanperialProcessGrid from "@/components/organisms/LeanperialProcessGrid";

/** A hero kép útvonala (a generátor a works.ts `image:` mezőn is feldolgozza). */
const IMG = {
  hero: "/assets/portfolio/leanperial/leanperial website mockup.webp",
};

/** A KPI / áttekintő blokk négy mezője. */
const OVERVIEW = [
  {
    label: "Ügyfél",
    value: "Leanperial",
    sub: "Executive Search & Private Advisory",
  },
  {
    label: "Iparág",
    value: "Nemzetközi luxusmárka-tanácsadás",
    sub: "Diszkréció, megbízhatóság, elit szint",
  },
  {
    label: "Megoldás",
    value: "Quiet Luxury weboldal",
    sub: "Egyedi WordPress + Kadence alapon",
  },
  {
    label: "Eredmény",
    value: "100/100 SEO",
    sub: "Ultragyors, kártevőmentes platform",
  },
];

export default function LeanperialCaseStudy() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary overflow-x-hidden">
      {/* ── 1. HERO SZEKCIÓ ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
        {/* Luminous háttérkép + Kék-Lila gradiens réteg */}
        <div className="absolute inset-0 z-0">
          <ResponsiveImage
            src={IMG.hero}
            alt="Leanperial — Quiet Luxury weboldal, prémium executive search felület mockup"
            sizes="100vw"
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-b from-bg-base/70 via-bg-base/60 to-bg-base" />
        </div>

        {/* Ambient cyan + lila glow (a 90-8-2 szabály 2%-a) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-brand-secondary/20 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-5 py-2 backdrop-blur-sm">
            <Gauge className="h-4 w-4 text-brand-primary" aria-hidden />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand-primary">
              Quiet Luxury · Executive Search
            </span>
          </div>

          <h1 className="mt-8 text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
            Leanperial — a halk luxus{" "}
            <span className="bg-linear-to-r from-cta-from to-cta-to bg-clip-text text-transparent">
              digitális öröksége
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-slate-200 md:text-xl">
            Egy nemzetközi luxusmárka-tanácsadó számára építettem prémium,
            diszkréciót közvetítő weboldalt: kártevőmentesítés, egyedi
            WordPress + Kadence fejlesztés és technikai SEO-tökéletesítés
            egyetlen munkában. Az eredmény egy ultragyors, teljesen biztonságos,
            100/100 SEO pontszámú platform.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/kapcsolat"
              className="rounded-full bg-linear-to-r from-cta-from to-cta-to px-8 py-4 font-bold text-white shadow-lg shadow-brand-secondary/25 transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
            >
              Hasonló weboldalt szeretnék
            </Link>
            <Link
              href="/munkak"
              className="rounded-full border border-slate-600 px-8 py-4 font-bold text-slate-300 transition-colors duration-300 hover:border-brand-primary hover:text-brand-primary"
            >
              Vissza a munkákhoz
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. KPI / ÁTTEKINTÉS BLOKK ───────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OVERVIEW.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-8 backdrop-blur-xl transition-colors duration-300 hover:border-brand-primary/50"
            >
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary">
                {item.label}
              </div>
              <div className="mt-3 text-2xl font-bold text-brand-primary">
                {item.value}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. BENTO GRID (kibontva: LeanperialProcessGrid) ─────────── */}
      <LeanperialProcessGrid />

      {/* ── 4. CTA BLOKK (ZÉRÓ FIX ÁR) ──────────────────────────────────── */}
      <section className="px-6 py-32">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-cta-from/20 to-cta-to/20 p-12 text-center backdrop-blur-xl md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-brand-primary/20 blur-3xl"
          />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold md:text-5xl">
              Egy{" "}
              <span className="bg-linear-to-r from-cta-from to-cta-to bg-clip-text text-transparent">
                quiet luxury
              </span>{" "}
              weboldalt szeretnél?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-slate-300">
              Kérj ingyenes konzultációt. Átvizsgálom a jelenlegi oldalad
              biztonságát és teljesítményét, majd egyedi, értékalapú
              javaslattal térek vissza — fix árazás nélkül.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/kapcsolat"
                className="rounded-full bg-linear-to-r from-cta-from to-cta-to px-10 py-5 font-bold text-white shadow-lg shadow-brand-secondary/25 transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Kérj Ingyenes Konzultációt
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

