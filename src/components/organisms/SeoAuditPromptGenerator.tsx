"use client";

import { useState } from "react";
import { Search, Zap, Copy, Check } from "lucide-react";

/**
 * SEO Audit AI Műhely — Technikai SEO/AEO/GEO audit prompt-összeállító (védett generátor).
 * KIZÁRÓLAG `ToolAccessGate` (toolId: "seo_audit_ai_muhely") mögött renderelhető.
 */

const auditTypes = [
  {
    id: "technical",
    name: "Technikai SEO",
    description: "Crawlability & indexelés",
    prompt:
      "technical SEO audit, site speed analysis, mobile optimization, crawlability, indexability, canonical and HTTP status review",
    color: "from-blue-500 to-sky-500",
  },
  {
    id: "content",
    name: "Tartalom SEO",
    description: "Kulcsszavak & szemantika",
    prompt:
      "content SEO audit, search intent mapping, heading hierarchy H1-H3, internal linking, E-E-A-T authority signals",
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "aeo",
    name: "AEO & GEO",
    description: "AI válaszmotor optimalizáció",
    prompt:
      "AEO and GEO optimization, AI answer engine readiness, Schema.org JSON-LD graph, Direct Answer blocks, FAQPage entities",
    color: "from-[#00B5F1] to-[#5B21B6]",
  },
  {
    id: "local",
    name: "Helyi SEO",
    description: "Regionális láthatóság",
    prompt:
      "local SEO audit, Google Business Profile optimization, NAP consistency, LocalBusiness structured data, local search visibility",
    color: "from-sky-500 to-indigo-500",
  },
  {
    id: "performance",
    name: "Core Web Vitals",
    description: "Lighthouse 95+ fókusz",
    prompt:
      "Core Web Vitals audit, LCP, CLS, INP optimization, Lighthouse performance diagnostics, asset delivery analysis",
    color: "from-violet-600 to-[#00B5F1]",
  },
  {
    id: "backlink",
    name: "Autoritás & Linkek",
    description: "Linkprofil elemzés",
    prompt:
      "backlink profile audit, domain authority signals, toxic link detection, digital PR and citation opportunities",
    color: "from-indigo-500 to-blue-500",
  },
] as const;

const focusAreas = [
  { id: "keywords", name: "Kulcsszavak", description: "Kulcsszó- és entitásstratégia" },
  { id: "competitors", name: "Versenytársak", description: "SERP rés-elemzés" },
  { id: "technical", name: "Technikai", description: "Architektúra és indexelés" },
  { id: "content", name: "Tartalom", description: " Tartalmi mélység és AEO" },
] as const;

const depthLevels = [
  { id: "basic", name: "Gyors diagnózis", description: "48 órás Quick Wins" },
  { id: "detailed", name: "Részletes", description: "Mélyreható elemzés" },
  { id: "comprehensive", name: "Komplex", description: "Teljes 30–90 napos terv" },
] as const;

const labelClass =
  "text-sm font-bold text-[#0369A1] dark:text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block";
const inputClass =
  "w-full p-3 rounded-lg border-2 border-slate-200 dark:border-bg-elevated bg-white dark:bg-bg-base text-[#0F172A] dark:text-text-primary placeholder:text-[#475569] dark:placeholder:text-slate-500 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-all";
const optionClass = (active: boolean) =>
  `w-full p-3 rounded-lg border-2 transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
    active
      ? "border-[#0369A1] dark:border-[#00B5F1] bg-[#0369A1]/10 dark:bg-[#00B5F1]/10"
      : "border-slate-200 dark:border-bg-elevated bg-white dark:bg-bg-surface hover:border-[#0369A1]/50 dark:hover:border-[#00B5F1]/50"
  }`;

const textFields = [
  { key: "websiteUrl", label: "Weboldal URL (opcionális)", placeholder: "pl. https://pelda.hu" },
  { key: "targetKeywords", label: "Cél kulcsszavak (opcionális)", placeholder: "pl. egyedi weboldal készítés, B2B szoftver, automatizáció" },
  { key: "businessGoals", label: "Üzleti célok (opcionális)", placeholder: "pl. kvalifikált leadek növelése, AI kereső láthatóság" },
] as const;

type TextFieldKey = (typeof textFields)[number]["key"];

export default function SeoAuditPromptGenerator() {
  const [audit, setAudit] = useState<(typeof auditTypes)[number]>(auditTypes[0]);
  const [focus, setFocus] = useState<(typeof focusAreas)[number]>(focusAreas[0]);
  const [depth, setDepth] = useState<(typeof depthLevels)[number]>(depthLevels[0]);
  const [fields, setFields] = useState<Record<TextFieldKey, string>>({
    websiteUrl: "",
    targetKeywords: "",
    businessGoals: "",
  });
  const [customInstructions, setCustomInstructions] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const parts = [
      `SEO & AEO audit for ${audit.name} (${audit.description}), focus: ${focus.name} (${focus.description.trim()}), depth: ${depth.name} (${depth.description}), ${audit.prompt}, prioritized P0-P3 action plan, Lighthouse 95+ and Schema.org verification`,
    ];
    if (fields.websiteUrl) parts.push(`website: ${fields.websiteUrl}`);
    if (fields.targetKeywords) parts.push(`target keywords: ${fields.targetKeywords}`);
    if (fields.businessGoals) parts.push(`business goals: ${fields.businessGoals}`);
    if (customInstructions) parts.push(`custom requirements: ${customInstructions}`);
    setGeneratedPrompt(parts.join(", "));
    setCopied(false);
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="luminous-card rounded-3xl p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#00B5F1]/10 to-[#5B21B6]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20 flex items-center justify-center">
          <Search className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-2xl text-[#0F172A] dark:text-white">AI SEO & AEO Audit Generátor</h3>
          <p className="text-sm text-[#475569] dark:text-slate-400">Priorizált technikai SEO/AEO diagnosztikai prompt összeállítás</p>
        </div>
      </div>

      <fieldset className="mb-8">
        <legend className={labelClass}>Audit típus</legend>
        <div className="grid md:grid-cols-3 gap-4">
          {auditTypes.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAudit(a)}
              aria-pressed={audit.id === a.id}
              className={`${optionClass(audit.id === a.id)} p-4 rounded-xl`}
            >
              <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${a.color} mb-3`} aria-hidden="true" />
              <span className="block text-base font-semibold text-[#0F172A] dark:text-white mb-1">{a.name}</span>
              <span className="block text-xs text-[#475569] dark:text-slate-400">{a.description}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <fieldset>
          <legend className={labelClass}>Fókusz terület</legend>
          <div className="space-y-2">
            {focusAreas.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFocus(f)}
                aria-pressed={focus.id === f.id}
                className={`${optionClass(focus.id === f.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{f.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{f.description.trim()}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={labelClass}>Audit mélység</legend>
          <div className="space-y-2">
            {depthLevels.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDepth(d)}
                aria-pressed={depth.id === d.id}
                className={`${optionClass(depth.id === d.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{d.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{d.description}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="space-y-6 mb-8">
        {textFields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`seo-${f.key}`} className={labelClass}>
              {f.label}
            </label>
            <input
              id={`seo-${f.key}`}
              type="text"
              maxLength={200}
              value={fields[f.key]}
              onChange={(e) => setFields((prev) => ({ ...prev, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              className={inputClass}
            />
          </div>
        ))}
        <div>
          <label htmlFor="seo-custom" className={labelClass}>
            Egyedi utasítások (opcionális)
          </label>
          <textarea
            id="seo-custom"
            rows={3}
            maxLength={600}
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="pl. Next.js App Router vagy WooCommerce fókusz, AI kereső idézhetőség vizsgálata"
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={generatePrompt}
        className="w-full py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
      >
        <Zap className="w-5 h-5" aria-hidden="true" />
        <span>SEO Audit Prompt Generálás</span>
      </button>

      {generatedPrompt && (
        <div className="mt-8 p-6 rounded-xl border border-slate-200 dark:border-bg-elevated bg-[#F8FAFC] dark:bg-bg-base" aria-live="polite">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg text-[#0F172A] dark:text-white">Generált Prompt</h4>
            <button
              type="button"
              onClick={copyPrompt}
              aria-label="Prompt másolása vágólapra"
              className="p-2 rounded-lg bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20 text-[#0369A1] dark:text-[#00B5F1] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
          <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed break-words">{generatedPrompt}</p>
        </div>
      )}
    </div>
  );
}
