"use client";

import React from "react";
import Link from "next/link";
import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import { motion } from "motion/react";
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
      className="relative py-24 md:py-32 bg-bg-base overflow-hidden"
      aria-label={content.ariaLabel}
    >
      {/* Halvány háttér glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(0, 181, 241,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-360 mx-auto px-6 lg:px-12 xl:px-16">
        {/* Szekció fejléc */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
              <TrendingUp
                className="w-3.5 h-3.5 text-brand-primary"
                aria-hidden="true"
              />
              <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">
                {content.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {content.title.prefix}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-brand-secondary">
                {content.title.highlight}
              </span>
              {content.title.suffix}
            </h2>
          </div>
          <Link
            href="/munkak"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-primary/40 bg-brand-primary/5 text-brand-primary text-sm font-semibold transition-all duration-300 hover:bg-brand-primary/10 hover:border-brand-primary/70 hover:shadow-[0_0_24px_rgba(0,181,241,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base shrink-0"
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: idx * 0.12,
              }}
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/8 hover:border-sky-500/50 flex flex-col transition-colors duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              }}
            >
              {/* Kártya fejléc — színes sáv */}
              <div
                className="h-1.5 w-full"
                style={{
                  background: `linear-gradient(90deg, ${cs.accentColor} 0%, transparent 80%)`,
                }}
                aria-hidden="true"
              />

              {/* Mock képernyő area */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 60px ${cs.accentColor}22`,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="mx-6 mt-6 rounded-2xl overflow-hidden border border-white/8 relative"
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
                {/* MacOS dots dísz */}
                <div
                  className="absolute top-3 left-4 flex gap-1.5 z-10"
                  aria-hidden="true"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
              </motion.div>

              {/* Tartalom */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: cs.accentColor }}
                  >
                    {cs.eyebrow}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 leading-snug">
                    {cs.title}
                  </h3>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {cs.description}
                </p>

                {/* KPI sorok — jól olvasható, géppel is értelmezhető */}
                <dl className="grid grid-cols-3 gap-3">
                  {cs.kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="flex flex-col items-center text-center p-3 rounded-2xl border border-white/6"
                      style={{ background: `${kpi.color}08` }}
                    >
                      <dt className="text-[10px] text-slate-500 font-medium uppercase tracking-wider leading-tight mb-1">
                        {kpi.label}
                      </dt>
                      <dd
                        className="text-lg font-extrabold tabular-nums"
                        style={{ color: kpi.color }}
                      >
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
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold border"
                        style={{
                          color: cs.accentColor,
                          borderColor: `${cs.accentColor}25`,
                          background: `${cs.accentColor}0a`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={cs.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg px-2 py-1 border border-transparent hover:border-brand-primary/30"
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
