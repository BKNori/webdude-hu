"use client";

import { useState } from "react";
import { Layout, Zap, Copy, Check } from "lucide-react";

/**
 * UI/UX AI Műhely — Interface és wireframe prompt-összeállító (védett generátor).
 * KIZÁRÓLAG `ToolAccessGate` (toolId: "ui_ux_ai_muhely") mögött renderelhető.
 */

const designStyles = [
  {
    id: "minimalist",
    name: "Minimalista",
    description: "Tiszta, átlátható felület",
    prompt:
      "minimalist UI/UX design, clean interface, generous whitespace, 8px grid, crisp typography, intuitive hierarchy",
    color: "from-blue-500 to-sky-500",
  },
  {
    id: "modern",
    name: "Modern SaaS",
    description: "Kortárs Bento elrendezés",
    prompt:
      "modern SaaS UI/UX design, Bento grid cards, subtle glassmorphism, clear KPI hierarchy, high legibility",
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "corporate",
    name: "Corporate B2B",
    description: "Professzionális, üzleti",
    prompt:
      "corporate B2B UI/UX design, trustworthy palette, structured layout, clear trust signals, conversion-focused UX",
    color: "from-[#00B5F1] to-[#5B21B6]",
  },
  {
    id: "creative",
    name: "Kreatív",
    description: "Karakteres vizuális ritmus",
    prompt:
      "creative editorial UI/UX design, bold display headings, asymmetric balance, expressive visual storytelling",
    color: "from-sky-500 to-indigo-500",
  },
  {
    id: "luxury",
    name: "Prémium",
    description: "Elegáns, szellős felület",
    prompt:
      "quiet luxury UI/UX design, refined spacing, high-contrast typography, understated elegance, tactile card elevation",
    color: "from-violet-600 to-[#00B5F1]",
  },
  {
    id: "tech",
    name: "Tech Dashboard",
    description: "Adatvezérelt felület",
    prompt:
      "modern tech dashboard UI/UX, dark slate and daylight dual-theme tokens, electric cyan and violet accents, clean data cards",
    color: "from-indigo-500 to-blue-500",
  },
] as const;

const deviceTypes = [
  { id: "desktop", name: "Desktop", description: "1440px asztali nézet" },
  { id: "mobile", name: "Mobile First", description: "390px mobil felület" },
  { id: "responsive", name: "Reszponzív", description: "Több töréspontos rendszer" },
  { id: "tablet", name: "Tablet", description: "Érintésbarát táblagép nézet" },
] as const;

const uxFocus = [
  { id: "conversion", name: "Konverzió (CRO)", description: "Fókuszált CTA útvonal" },
  { id: "accessibility", name: "Akadálymentesítés", description: "WCAG AA kontraszt & fókusz" },
  { id: "speed", name: "Teljesítmény", description: "Core Web Vitals tudatos UI" },
  { id: "engagement", name: "Elköteleződés", description: "Átlátható felhasználói út" },
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
  { key: "projectType", label: "Projekt típus (opcionális)", placeholder: "pl. B2B szolgáltató landing, webáruház, ügyfélportál" },
  { key: "targetAudience", label: "Célközönség (opcionális)", placeholder: "pl. cégvezetők, visszatérő vásárlók, mobil felhasználók" },
  { key: "brandGuidelines", label: "Márkairányelvek (opcionális)", placeholder: "pl. Kék-Lila paletta, világos alapértelmezett téma, szellős rács" },
] as const;

type TextFieldKey = (typeof textFields)[number]["key"];

export default function UiUxPromptGenerator() {
  const [style, setStyle] = useState<(typeof designStyles)[number]>(designStyles[0]);
  const [device, setDevice] = useState<(typeof deviceTypes)[number]>(deviceTypes[0]);
  const [focus, setFocus] = useState<(typeof uxFocus)[number]>(uxFocus[0]);
  const [fields, setFields] = useState<Record<TextFieldKey, string>>({
    projectType: "",
    targetAudience: "",
    brandGuidelines: "",
  });
  const [customInstructions, setCustomInstructions] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const parts = [
      `UI/UX interface design for ${style.name} (${style.description}), viewport: ${device.name} (${device.description}), UX priority: ${focus.name} (${focus.description}), ${style.prompt}, Figma-ready component hierarchy, high-precision layout`,
    ];
    if (fields.projectType) parts.push(`project type: ${fields.projectType}`);
    if (fields.targetAudience) parts.push(`target audience: ${fields.targetAudience}`);
    if (fields.brandGuidelines) parts.push(`brand guidelines: ${fields.brandGuidelines}`);
    if (customInstructions) parts.push(`custom requirements: ${customInstructions}`);
    setGeneratedPrompt(`${parts.join(", ")} --ar 16:9 --v 6.1 --style raw`);
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
          <Layout className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-2xl text-[#0F172A] dark:text-white">AI UI/UX Generátor</h3>
          <p className="text-sm text-[#475569] dark:text-slate-400">Figma-kész wireframe és UI koncepció prompt összeállítás</p>
        </div>
      </div>

      <fieldset className="mb-8">
        <legend className={labelClass}>Design stílus</legend>
        <div className="grid md:grid-cols-3 gap-4">
          {designStyles.map((s) => (
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
          <legend className={labelClass}>Eszköz típus</legend>
          <div className="space-y-2">
            {deviceTypes.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDevice(d)}
                aria-pressed={device.id === d.id}
                className={`${optionClass(device.id === d.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{d.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{d.description}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={labelClass}>UX fókusz</legend>
          <div className="space-y-2">
            {uxFocus.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFocus(f)}
                aria-pressed={focus.id === f.id}
                className={`${optionClass(focus.id === f.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{f.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{f.description}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="space-y-6 mb-8">
        {textFields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`uiux-${f.key}`} className={labelClass}>
              {f.label}
            </label>
            <input
              id={`uiux-${f.key}`}
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
          <label htmlFor="uiux-custom" className={labelClass}>
            Egyedi utasítások (opcionális)
          </label>
          <textarea
            id="uiux-custom"
            rows={3}
            maxLength={600}
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="pl. sticky fejléc, 3 oszlopos Bento kártyák, látható fókuszgyűrűk"
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
        <span>UI/UX Prompt Generálás</span>
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
