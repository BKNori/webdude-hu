"use client";

import React from "react";
import Link from "next/link";
import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import { TrendingUp, ArrowRight, ExternalLink } from "lucide-react";
import { CasesContent } from "@/types/dictionary";

interface CaseStudiesBentoProps {
  /** Nyelvi tartalom a szótárból (HU/EN). */
  content: CasesContent;
}

const CASE_STUDY_DEFAULTS = [
  {
    id: "btshop",
    client: "btshop.hu",
    category: "E-commerce Webshop",
    eyebrow: "Esettanulmány #1",
    title: "Webshop újratervezés — +40% konverzió",
    description:
      "A btshop.hu B2B logisztikai webshop teljeskörű Next.js migrációja és UI/UX újratervezése. Eredmény: 40%-kal több megrendelés, Lighthouse 96/100, és 60%-kal jobb mobilos élmény.",
    kpis: [
      { label: "Konverzió növekedés", value: "+40%", color: "#00B5F1" },
      { label: "Lighthouse Score", value: "96/100", color: "#00B5F1" },
      { label: "Mobilos javulás", value: "+60%", color: "#00B5F1" },
    ],
    tags: ["Next.js", "WooCommerce Migration", "B2B Logisztika"],
    href: "/munkak",
    imgPlaceholder: "B2B",
    accentColor: "#00B5F1",
    image: "/assets/portfolio/btshop/btshop-banner-2.webp",
  },
  {
    id: "ai-prompt",
    client: "AI-Prompt.hu",
    category: "AI Platform",
    eyebrow: "Esettanulmány #2",
    title: "AI prompt platform — nulláról 3 hónap alatt",
    description:
      "Az AI-Prompt.hu platform teljes tervezése és fejlesztése: React 19 alapú UI, Groq LLM integráció, user portal és lead-generáló automatizáció. 180 nap alatt stabil, bevételt termelő rendszer.",
    kpis: [
      { label: "Organikus forgalom", value: "+184%", color: "#00B5F1" },
      { label: "AI automatizáció", value: "9 eszköz", color: "#00B5F1" },
      { label: "Build idő", value: "3 hónap", color: "#00B5F1" },
    ],
    tags: ["React 19", "Groq LLM", "Firebase", "Lead Gen"],
    href: "/munkak",
    imgPlaceholder: "AI",
    accentColor: "#00B5F1",
    image: "/assets/portfolio/ai-promt-hu/ai-promt-hi-banner-2.webp",
  },
];

export default function CaseStudiesBento({ content }: CaseStudiesBentoProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  // Nyelvi szövegek a szótárból; a KPI színek és a design tokenek maradnak.
  const caseStudies = CASE_STUDY_DEFAULTS.map((item, index) => {
    const override = content.items[index];
    if (!override) return item;
    return {
      ...item,
      ...override,
      accentColor: item.accentColor,
      kpis: override.kpis.map((kpi, kpiIndex) => ({
        ...kpi,
        color: item.kpis[kpiIndex]?.color ?? item.accentColor,
      })),
    };
  });

  return (
    <section
      id="cases"
      className="relative py-24 md:py-32 bg-[#F8FAFC] dark:bg-[#0B1120] border-y border-slate-200/80 dark:border-white/8 overflow-hidden"
      aria-label={content.ariaLabel}
    >
      {/* Halvány aurora glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 45% at 50% 100%, rgba(0, 181, 241, 0.08) 0%, rgba(124, 58, 237, 0.05) 50%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-360 mx-auto px-6 lg:px-12 xl:px-16">
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
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-600/25 dark:bg-brand-primary/10 dark:border-brand-primary/25 mb-6">
              <TrendingUp
                className="w-3.5 h-3.5 text-[#0369A1] dark:text-brand-primary"
                aria-hidden="true"
              />
              <span className="eyebrow-badge text-[#0369A1] dark:text-brand-primary">
                {content.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl text-[#0F172A] dark:text-white leading-tight">
              {content.title.prefix}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-brand-primary dark:to-brand-secondary">
                {content.title.highlight}
              </span>
              {content.title.suffix}
            </h2>
          </div>
          <Link
            href="/munkak"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-sky-600/35 bg-sky-500/8 text-[#0369A1] hover:bg-sky-500/15 hover:border-sky-600/60 dark:border-brand-primary/40 dark:bg-brand-primary/8 dark:text-brand-primary text-sm font-semibold transition-[background-color,border-color,box-shadow] duration-300 dark:hover:bg-brand-primary/15 dark:hover:border-brand-primary/70 hover:shadow-[0_0_24px_rgba(3,105,161,0.14)] dark:hover:shadow-[0_0_24px_rgba(0,181,241,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0369A1] dark:focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base shrink-0"
            aria-label={content.allLabel}
          >
            {content.allLabel}
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        {/* Kártyák */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((cs, idx) => (
            <motion.article
              key={cs.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: idx * 0.1,
                    }
              }
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -4,
                      scale: 1.01,
                    }
              }
              className="luminous-card group relative overflow-hidden flex flex-col"
            >
              {/* Kártya fejléc — színes sáv */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${cs.accentColor} 0%, #7C3AED 60%, transparent 90%)`,
                }}
                aria-hidden="true"
              />

              {/* Mock képernyő area */}
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.015,
                      }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 100, damping: 20 }
                }
                className="mx-6 mt-6 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 relative"
                style={{ minHeight: "140px" }}
              >
                {cs.image ? (
                  <ResponsiveImage
                    src={cs.image}
                    alt={cs.title}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${cs.accentColor}15 0%, rgba(255,255,255,0.03) 100%)`,
                    }}
                  >
                    <span
                      className="text-5xl font-black opacity-30 tracking-tighter"
                      style={{ color: cs.accentColor }}
                      aria-hidden="true"
                    >
                      {cs.imgPlaceholder}
                    </span>
                  </div>
                )}
                {/* Kék-Lila v7.2 ablak-pontok (legacy orange/red/green kivezetve) */}
                <div
                  className="absolute top-3 left-4 flex gap-1.5 z-10"
                  aria-hidden="true"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00B5F1]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]/70" />
                </div>
              </motion.div>

              {/* Tartalom */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1]">
                    {cs.eyebrow}
                  </span>
                  <h3 className="text-xl md:text-2xl text-[#0F172A] dark:text-white mt-1.5 leading-snug tracking-wider">
                    {cs.title}
                  </h3>
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-normal">
                  {cs.description}
                </p>

                {/* KPI sorok — WCAG AA/AAA kontrasztú címkékkel */}
                <dl className="grid grid-cols-3 gap-3">
                  {cs.kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="flex flex-col items-center text-center p-3 rounded-2xl border border-slate-200/90 bg-[#F8FAFC] dark:border-white/10 dark:bg-[#0B1120]/70"
                    >
                      <dt className="font-mono text-[11px] text-slate-600 dark:text-slate-300 font-medium uppercase tracking-wider leading-tight mb-1">
                        {kpi.label}
                      </dt>
                      <dd className="text-lg font-extrabold tabular-nums text-[#0369A1] dark:text-[#00B5F1]">
                        {kpi.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {cs.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[11px] font-semibold border border-sky-300 bg-sky-50 text-[#0369A1] dark:border-brand-primary/25 dark:bg-brand-primary/10 dark:text-[#00B5F1]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={cs.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#0369A1] dark:text-slate-300 dark:hover:text-brand-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0369A1] dark:focus-visible:ring-brand-primary rounded-lg px-2 py-1 border border-transparent hover:border-[#0369A1]/30 dark:hover:border-brand-primary/30"
                    aria-label={`${cs.title} — ${content.detailsLabel}`}
                  >
                    {content.detailsLabel}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
