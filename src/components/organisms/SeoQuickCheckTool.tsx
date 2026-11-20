"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Globe,
  Loader2,
  Search,
  Sparkles,
  XCircle,
} from "lucide-react";
import type {
  AuditLocale,
  SeoCheckItem,
  SeoQuickCheckReport,
} from "@/lib/seoQuickCheck";

interface SeoQuickCheckToolProps {
  locale: AuditLocale;
}

const COPY = {
  hu: {
    label: "Vizsgálandó weboldal URL címe",
    placeholder: "https://pelda-ceg.hu",
    submit: "Ingyenes elemzés indítása",
    loading: "Weboldal elemzése...",
    samplePrefix: "Minta:",
    samples: ["https://webdude.hu"],
    scoreTitle: "Összesített SEO & AI-Készségi Pontszám",
    grades: {
      excellent: "Kiváló AI & SEO felkészültség",
      good: "Jó alapok, finomhangolás ajánlott",
      needs_work: "Fejlesztendő technikai és AEO területek",
      critical: "Kritikus SEO és AI-láthatósági rések",
    },
    categories: { seo: "Technikai SEO", aeo: "AEO / Schema", geo: "GEO / AI-bot" },
    statuses: { pass: "Rendben", warn: "Figyelmeztetés", fail: "Hiányzik" },
    ctaTitle: "Szeretnél személyre szabott javítási tervet az én szemszögemből?",
    ctaDesc:
      "Átnézem az oldalad kódját, konverziós útvonalát és Schema.org struktúráját, majd küldök neked egy lényegre törő videós összefoglalót — kötelezettség nélkül.",
    ctaButton: "Kérem az ingyenes, 10 perces videós UX & SEO elemzést",
    ctaBaseHref: "/kapcsolat?tema=seo-aeo-audit",
    ttfbLabel: "Válaszidő",
  },
  en: {
    label: "Website URL to audit",
    placeholder: "https://your-business.com",
    submit: "Run Free Audit",
    loading: "Analyzing website...",
    samplePrefix: "Try:",
    samples: ["https://webdude.hu/en"],
    scoreTitle: "Overall SEO & AI-Readiness Score",
    grades: {
      excellent: "Excellent AI & SEO readiness",
      good: "Solid foundation, targeted improvements recommended",
      needs_work: "Important technical SEO & AEO gaps found",
      critical: "Critical SEO & AI visibility issues",
    },
    categories: { seo: "Technical SEO", aeo: "AEO / Schema", geo: "GEO / AI Bots" },
    statuses: { pass: "Pass", warn: "Needs Polish", fail: "Missing" },
    ctaTitle: "Want a tailored action plan directly from me?",
    ctaDesc:
      "I will personally review your page markup, conversion UX, and Schema.org graph and send you a concise video breakdown — zero obligation.",
    ctaButton: "Request a Free 10-Minute Video UX & SEO Audit",
    ctaBaseHref: "/en/contact?topic=seo-aeo-audit",
    ttfbLabel: "TTFB",
  },
} as const;

function StatusBadge({
  status,
  label,
}: {
  status: SeoCheckItem["status"];
  label: string;
}) {
  if (status === "pass") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
        {label}
      </span>
    );
  }
  if (status === "warn") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/12 text-[#0369A1] dark:text-[#00B5F1] border border-sky-500/30">
        <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/12 text-red-700 dark:text-red-300 border border-red-500/25">
      <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

export default function SeoQuickCheckTool({ locale }: SeoQuickCheckToolProps) {
  const t = COPY[locale];
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [report, setReport] = useState<SeoQuickCheckReport | null>(null);

  async function runAudit(targetUrl: string) {
    const trimmed = targetUrl.trim();
    if (!trimmed) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/public/seo-quick-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed, locale }),
      });
      const data = (await res.json()) as SeoQuickCheckReport & { error?: string };
      if (!res.ok) {
        setErrorMsg(data.error || "Audit failed.");
        setReport(null);
      } else {
        setReport(data);
      }
    } catch {
      setErrorMsg(
        locale === "en"
          ? "Network error while checking the website."
          : "Hálózati hiba történt a weboldal ellenőrzése közben."
      );
      setReport(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void runAudit(urlInput);
  }

  const gaugeRadius = 46;
  const gaugeCirc = 2 * Math.PI * gaugeRadius;
  const scorePct = report ? Math.max(0, Math.min(100, report.totalScore)) : 0;
  const dashOffset = gaugeCirc - (scorePct / 100) * gaugeCirc;

  const ctaHref = report
    ? `${t.ctaBaseHref}&url=${encodeURIComponent(report.finalUrl)}`
    : t.ctaBaseHref;

  return (
    <div className="space-y-8">
      {/* URL Input Card */}
      <form
        onSubmit={handleSubmit}
        className="luminous-card p-6 md:p-8 space-y-4"
        noValidate
      >
        <label
          htmlFor="seo-quick-check-url"
          className="block text-sm font-semibold text-[#0F172A] dark:text-white"
        >
          {t.label}
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe
              className="w-5 h-5 text-[#475569] dark:text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="seo-quick-check-url"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={t.placeholder}
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-[#0F172A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#00B5F1]"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !urlInput.trim()}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_8px_24px_rgba(7,89,133,0.35)] transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                {t.loading}
              </>
            ) : (
              <>
                <Search className="w-4 h-4" aria-hidden="true" />
                {t.submit}
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-[#475569] dark:text-slate-400">
          <span>{t.samplePrefix}</span>
          {t.samples.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                setUrlInput(sample);
                void runAudit(sample);
              }}
              className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/6 border border-slate-200 dark:border-white/10 text-[#0369A1] dark:text-[#00B5F1] hover:border-[#0369A1] dark:hover:border-[#00B5F1] transition-colors cursor-pointer"
            >
              {sample}
            </button>
          ))}
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-700 dark:text-red-300 flex items-center gap-2.5"
          >
            <XCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{errorMsg}</span>
          </div>
        )}
      </form>

      {/* Results Dashboard */}
      {report && (
        <div className="space-y-8" aria-live="polite">
          {/* Summary Gauge + Category Breakdown */}
          <div className="luminous-card p-6 md:p-8 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 112 112" className="w-full h-full -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r={gaugeRadius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="9"
                    className="text-slate-200 dark:text-slate-800"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r={gaugeRadius}
                    fill="none"
                    stroke="url(#seoScoreGrad)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={gaugeCirc}
                    strokeDashoffset={dashOffset}
                  />
                  <defs>
                    <linearGradient id="seoScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0369A1" />
                      <stop offset="100%" stopColor="#6D28D9" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-heading text-[#0F172A] dark:text-white">
                    {report.totalScore}
                  </span>
                  <span className="text-xs font-mono text-[#475569] dark:text-slate-400">
                    / 100
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-[#0369A1] dark:text-[#00B5F1]">
                {t.grades[report.grade]}
              </p>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div>
                <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white">
                  {t.scoreTitle}
                </h2>
                <p className="text-xs font-mono text-[#475569] dark:text-slate-400 break-all mt-1">
                  {report.finalUrl} · {t.ttfbLabel}: {report.ttfbMs} ms
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(["seo", "aeo", "geo"] as const).map((cat) => {
                  const data = report.categoryScores[cat];
                  return (
                    <div
                      key={cat}
                      className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1120]/70 border border-slate-200 dark:border-white/10"
                    >
                      <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] block mb-1">
                        {t.categories[cat]}
                      </span>
                      <span className="text-2xl font-heading text-[#0F172A] dark:text-white">
                        {data.score}
                      </span>
                      <span className="text-xs font-mono text-[#475569] dark:text-slate-400 ml-1">
                        / {data.max}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 10 Checks Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.checks.map((item) => (
              <div
                key={item.id}
                className="luminous-card p-5 flex flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <span className="eyebrow-badge text-[#475569] dark:text-slate-400">
                      {t.categories[item.category]} · {item.score}/10
                    </span>
                    <StatusBadge
                      status={item.status}
                      label={t.statuses[item.status]}
                    />
                  </div>
                  <h3 className="text-lg font-heading text-[#0F172A] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-[#334155] dark:text-slate-300 break-words">
                    {item.summary}
                  </p>
                </div>
                <p className="text-xs text-[#475569] dark:text-slate-300 border-t border-slate-200/80 dark:border-white/10 pt-2.5 leading-relaxed">
                  {item.recommendation}
                </p>
              </div>
            ))}
          </div>

          {/* Low-Threshold Lead Magnet CTA */}
          <div className="luminous-card p-8 md:p-10 text-center space-y-5 border-[#0369A1]/30 dark:border-[#00B5F1]/30">
            <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <Bot className="w-3.5 h-3.5" aria-hidden="true" />
              {locale === "en" ? "Free Personal Review" : "Személyes Szakértői Átnézés"}
            </span>
            <h2 className="text-2xl md:text-3xl font-heading text-[#0F172A] dark:text-white">
              {t.ctaTitle}
            </h2>
            <p className="text-sm md:text-base text-[#334155] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t.ctaDesc}
            </p>
            <div>
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold uppercase tracking-wider text-sm text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] shadow-[0_8px_28px_rgba(7,89,133,0.4)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                {t.ctaButton}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
