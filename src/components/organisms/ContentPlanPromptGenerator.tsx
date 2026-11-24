"use client";

import { useState } from "react";
import { FileText, Zap, Copy, Check } from "lucide-react";

/**
 * Tartalomtervező AI Műhely — SEO/AEO tartalom-prompt összeállító (védett generátor).
 * KIZÁRÓLAG `ToolAccessGate` (toolId: "tartalomtervezo_ai_muhely") mögött renderelhető.
 */

const contentTypes = [
  {
    id: "blog",
    name: "Blog Poszt",
    description: "SEO & AEO szakcikk",
    prompt:
      "SEO and AEO optimized blog article structure, Direct Answer summary, H2-H3 hierarchy, FAQ section, authoritative tone",
    color: "from-blue-500 to-sky-500",
  },
  {
    id: "social",
    name: "Social Media",
    description: "Poszt és kampányszöveg",
    prompt:
      "social media post matrix, strong scroll-stopping hook, platform-native structure, clear engagement CTA",
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "email",
    name: "Email Marketing",
    description: "Hírlevél és kampány",
    prompt:
      "email marketing sequence, high-open-rate subject lines, concise value-driven copy, single clear CTA",
    color: "from-[#00B5F1] to-[#5B21B6]",
  },
  {
    id: "landing",
    name: "Landing Page",
    description: "Konverziós értékesítési oldal",
    prompt:
      "high-converting landing page copy, Hero value proposition, social proof framing, objection-handling FAQ, strong CTA",
    color: "from-sky-500 to-indigo-500",
  },
  {
    id: "product",
    name: "Termékleírás",
    description: "Webshop és B2B adatlap",
    prompt:
      "benefit-driven product description, structured specifications, scannable bullet points, search-friendly phrasing",
    color: "from-violet-600 to-[#00B5F1]",
  },
  {
    id: "ad",
    name: "Hirdetésszöveg",
    description: "PPC & Meta variációk",
    prompt:
      "PPC and social ad copy variations, A/B testable headlines, pain-point to outcome framing, concise CTA",
    color: "from-indigo-500 to-blue-500",
  },
] as const;

const contentTones = [
  { id: "professional", name: "Professzionális", description: "Szakmai, hiteles" },
  { id: "casual", name: "Közvetlen", description: "Barátságos, érthető" },
  { id: "creative", name: "Kreatív", description: "Karakteres, figyelemfelkeltő" },
  { id: "urgent", name: "Akciós", description: "Fókuszált, cselekvésre ösztönző" },
] as const;

const contentLengths = [
  { id: "short", name: "Rövid", description: "150–300 szó" },
  { id: "medium", name: "Közepes", description: "300–600 szó" },
  { id: "long", name: "Hosszú", description: "600–1200 szó" },
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
  { key: "topic", label: "Téma (opcionális)", placeholder: "pl. egyedi weboldal vs. sablon, AI automatizáció KKV-knak" },
  { key: "targetAudience", label: "Célközönség (opcionális)", placeholder: "pl. cégvezetők, marketingvezetők, webshop-tulajdonosok" },
  { key: "keywords", label: "Kulcsszavak (opcionális)", placeholder: "pl. SEO optimalizálás, konverzió, Next.js webfejlesztés" },
] as const;

type TextFieldKey = (typeof textFields)[number]["key"];

export default function ContentPlanPromptGenerator() {
  const [content, setContent] = useState<(typeof contentTypes)[number]>(contentTypes[0]);
  const [tone, setTone] = useState<(typeof contentTones)[number]>(contentTones[0]);
  const [length, setLength] = useState<(typeof contentLengths)[number]>(contentLengths[0]);
  const [fields, setFields] = useState<Record<TextFieldKey, string>>({
    topic: "",
    targetAudience: "",
    keywords: "",
  });
  const [customInstructions, setCustomInstructions] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const parts = [
      `Hungarian content brief for ${content.name} (${content.description}), tone: ${tone.name} (${tone.description}), length: ${length.name} (${length.description}), ${content.prompt}, anti-AI-slop phrasing, concrete facts`,
    ];
    if (fields.topic) parts.push(`topic: ${fields.topic}`);
    if (fields.targetAudience) parts.push(`target audience: ${fields.targetAudience}`);
    if (fields.keywords) parts.push(`keywords: ${fields.keywords}`);
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
          <FileText className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-2xl text-[#0F172A] dark:text-white">AI Tartalomtervező Generátor</h3>
          <p className="text-sm text-[#475569] dark:text-slate-400">Strukturált SEO/AEO tartalom-prompt összeállítás</p>
        </div>
      </div>

      <fieldset className="mb-8">
        <legend className={labelClass}>Tartalom típus</legend>
        <div className="grid md:grid-cols-3 gap-4">
          {contentTypes.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setContent(c)}
              aria-pressed={content.id === c.id}
              className={`${optionClass(content.id === c.id)} p-4 rounded-xl`}
            >
              <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${c.color} mb-3`} aria-hidden="true" />
              <span className="block text-base font-semibold text-[#0F172A] dark:text-white mb-1">{c.name}</span>
              <span className="block text-xs text-[#475569] dark:text-slate-400">{c.description}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <fieldset>
          <legend className={labelClass}>Hangnem</legend>
          <div className="space-y-2">
            {contentTones.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTone(t)}
                aria-pressed={tone.id === t.id}
                className={`${optionClass(tone.id === t.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{t.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{t.description}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={labelClass}>Terjedelem</legend>
          <div className="space-y-2">
            {contentLengths.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLength(l)}
                aria-pressed={length.id === l.id}
                className={`${optionClass(length.id === l.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{l.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{l.description}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="space-y-6 mb-8">
        {textFields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`content-${f.key}`} className={labelClass}>
              {f.label}
            </label>
            <input
              id={`content-${f.key}`}
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
          <label htmlFor="content-custom" className={labelClass}>
            Egyedi utasítások (opcionális)
          </label>
          <textarea
            id="content-custom"
            rows={3}
            maxLength={600}
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="pl. gyakorlati példák, összehasonlító táblázat, AEO GYIK blokk a végén"
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
        <span>Tartalom Prompt Generálás</span>
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
