"use client";

import { useState } from "react";
import { PenTool, Zap, Copy, Check } from "lucide-react";

/**
 * Logo AI Műhely — Midjourney prompt-összeállító (védett generátor).
 * KIZÁRÓLAG `ToolAccessGate` (toolId: "logo_ai_muhely") mögött renderelhető.
 */

const logoStyles = [
  {
    id: "minimalist",
    name: "Minimalista",
    description: "Tiszta, egyszerű vonalvezetés",
    prompt:
      "minimalist logo design, clean lines, geometric shapes, modern typography, professional aesthetic, scalable vector style",
    color: "from-[#00B5F1] to-sky-500",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Kortárs, innovatív",
    prompt:
      "modern logo design, contemporary aesthetic, bold typography, dynamic shapes, innovative visual identity",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professzionális, üzleti",
    prompt:
      "corporate logo design, professional business aesthetic, trustworthy colors, clean typography, established brand feel",
    color: "from-[#00B5F1] to-[#5B21B6]",
  },
  {
    id: "creative",
    name: "Kreatív",
    description: "Színes, dinamikus",
    prompt:
      "creative logo design, vibrant colors, artistic elements, unique composition, eye-catching visual",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "luxury",
    name: "Luxus",
    description: "Elegáns, prémium",
    prompt:
      "luxury logo design, elegant aesthetic, premium feel, sophisticated colors, high-end visual identity",
    color: "from-brand-secondary to-brand-primary",
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern, innovatív",
    prompt:
      "tech logo design, modern innovation aesthetic, digital elements, futuristic but professional, clean tech style",
    color: "from-indigo-500 to-blue-500",
  },
] as const;

const logoTypes = [
  { id: "wordmark", name: "Wordmark", description: "Szöveg alapú logo" },
  { id: "symbol", name: "Szimbólum", description: "Ikon alapú logo" },
  { id: "combination", name: "Kombinált", description: "Szöveg + ikon" },
  { id: "emblem", name: "Embléma", description: "Pajzs alapú" },
] as const;

const colorSchemes = [
  { id: "brand", name: "Kék-Lila", description: "Cián és lila márkaakcentus" },
  { id: "monochrome", name: "Monokróm", description: "Fekete-fehér árnyalatok" },
  { id: "gradient", name: "Gradiens", description: "Színátmenetes" },
  { id: "duotone", name: "Duotón", description: "Kétszínű" },
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
  { key: "companyName", label: "Cégnév (opcionális)", placeholder: "pl. WebDude, TechStart, Innovate" },
  { key: "industry", label: "Iparág (opcionális)", placeholder: "pl. webfejlesztés, e-kereskedelem, pénzügy" },
  { key: "slogan", label: "Szlogen (opcionális)", placeholder: "pl. Innováció a jövőben" },
  { key: "colorPreferences", label: "Szín preferenciák (opcionális)", placeholder: "pl. kék és narancs, monokróm, pasztell" },
] as const;

type TextFieldKey = (typeof textFields)[number]["key"];

export default function LogoPromptGenerator() {
  const [style, setStyle] = useState<(typeof logoStyles)[number]>(logoStyles[0]);
  const [type, setType] = useState<(typeof logoTypes)[number]>(logoTypes[0]);
  const [scheme, setScheme] = useState<(typeof colorSchemes)[number]>(colorSchemes[0]);
  const [fields, setFields] = useState<Record<TextFieldKey, string>>({
    companyName: "",
    industry: "",
    slogan: "",
    colorPreferences: "",
  });
  const [customInstructions, setCustomInstructions] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const parts = [
      `Logo design for ${style.name} style, ${style.description}, ${type.name} (${type.description}), ${scheme.description}, ${style.prompt}, professional vector graphics, scalable design, commercial quality, brand identity`,
    ];
    if (fields.companyName) parts.push(`company name: "${fields.companyName}"`);
    if (fields.industry) parts.push(`industry: ${fields.industry}`);
    if (fields.slogan) parts.push(`slogan: "${fields.slogan}"`);
    if (fields.colorPreferences) parts.push(`color preferences: ${fields.colorPreferences}`);
    if (customInstructions) parts.push(`custom requirements: ${customInstructions}`);
    setGeneratedPrompt(`${parts.join(", ")} --ar 1:1 --v 6.1 --style raw`);
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
          <PenTool className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-2xl text-[#0F172A] dark:text-white">AI Logo Generator</h3>
          <p className="text-sm text-[#475569] dark:text-slate-400">Midjourney v6 Master prompt generálás</p>
        </div>
      </div>

      <fieldset className="mb-8">
        <legend className={labelClass}>Stílus választás</legend>
        <div className="grid md:grid-cols-3 gap-4">
          {logoStyles.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStyle(s)}
              aria-pressed={style.id === s.id}
              className={`${optionClass(style.id === s.id)} p-4 rounded-xl`}
            >
              <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${s.color} mb-3`} aria-hidden="true" />
              <span className="block text-base font-semibold text-[#0F172A] dark:text-white mb-1">{s.name}</span>
              <span className="block text-xs text-[#475569] dark:text-slate-400">{s.description}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <fieldset>
          <legend className={labelClass}>Logo típus</legend>
          <div className="space-y-2">
            {logoTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t)}
                aria-pressed={type.id === t.id}
                className={`${optionClass(type.id === t.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{t.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{t.description}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={labelClass}>Szín séma</legend>
          <div className="space-y-2">
            {colorSchemes.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setScheme(c)}
                aria-pressed={scheme.id === c.id}
                className={`${optionClass(scheme.id === c.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{c.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{c.description}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="space-y-6 mb-8">
        {textFields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`logo-${f.key}`} className={labelClass}>
              {f.label}
            </label>
            <input
              id={`logo-${f.key}`}
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
          <label htmlFor="logo-custom" className={labelClass}>
            Egyedi utasítások (opcionális)
          </label>
          <textarea
            id="logo-custom"
            rows={3}
            maxLength={600}
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="pl. minimalista design, geometrikus formák, modern tipográfia"
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
        <span>Midjourney Prompt Generálás</span>
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
