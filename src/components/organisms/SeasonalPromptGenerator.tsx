"use client";

import { useState } from "react";
import { Calendar, Zap, Copy, Check } from "lucide-react";

/**
 * Szezonális AI Műhely — Ünnepi és szezonális kampány prompt-összeállító (védett generátor).
 * KIZÁRÓLAG `ToolAccessGate` (toolId: "szezonalis_ai_muhely") mögött renderelhető.
 */

const seasonalCampaigns = [
  {
    id: "christmas",
    name: "Karácsony",
    description: "Ünnepi téli kampány",
    prompt:
      "winter holiday campaign visual, festive atmosphere, refined seasonal lighting, premium commercial aesthetic",
    color: "from-[#00B5F1] to-[#5B21B6]",
  },
  {
    id: "easter",
    name: "Húsvét",
    description: "Tavaszi megújulás kampány",
    prompt:
      "spring seasonal campaign visual, fresh airy tones, clean natural lighting, refined spring marketing aesthetic",
    color: "from-sky-500 to-violet-500",
  },
  {
    id: "summer",
    name: "Nyár",
    description: "Nyári szezonális kampány",
    prompt:
      "summer campaign visual, crisp daylight atmosphere, energetic composition, high-impact seasonal visual",
    color: "from-blue-500 to-sky-400",
  },
  {
    id: "autumn",
    name: "Ősz",
    description: "Őszi szezonnyitó kampány",
    prompt:
      "autumn campaign visual, rich atmospheric depth, studio product focus, editorial seasonal aesthetic",
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "blackfriday",
    name: "Black Friday",
    description: "Kiemelt akciós kampány",
    prompt:
      "Black Friday campaign visual, high-contrast dark slate background, electric cyan and violet rim lighting, urgent conversion aesthetic",
    color: "from-violet-600 to-[#00B5F1]",
  },
  {
    id: "newyear",
    name: "Újév",
    description: "Évindító kampány",
    prompt:
      "New Year campaign visual, celebration bokeh lights, fresh start aesthetic, premium studio composition",
    color: "from-purple-500 to-blue-500",
  },
] as const;

const eventTypes = [
  { id: "launch", name: "Szezonnyitó", description: "Új kollekció vagy szolgáltatás" },
  { id: "anniversary", name: "Évforduló", description: "Márka- vagy cégünnep" },
  { id: "valentine", name: "Valentin-nap", description: "Ajándékozási kampány" },
  { id: "flashsale", name: "Villámakció", description: "Időkorlátos kampány" },
] as const;

const visualStyles = [
  { id: "festive", name: "Ünnepi", description: "Gazdag, atmoszférikus" },
  { id: "minimalist", name: "Minimalista", description: "Egyszerű, letisztult" },
  { id: "modern", name: "Modern", description: "Kortárs, márkafókuszú" },
  { id: "editorial", name: "Editorial", description: "Magazin-minőségű stúdió" },
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
  { key: "campaignGoal", label: "Kampány cél (opcionális)", placeholder: "pl. szezonális eladás növelése, új termék bevezetése" },
  { key: "targetAudience", label: "Célközönség (opcionális)", placeholder: "pl. B2B döntéshozók, online vásárlók, prémium szegmens" },
  { key: "promotion", label: "Ajánlat / Üzenet (opcionális)", placeholder: "pl. Kiemelt szezonális ajánlat, Ingyenes kiszállítás" },
] as const;

type TextFieldKey = (typeof textFields)[number]["key"];

export default function SeasonalPromptGenerator() {
  const [campaign, setCampaign] = useState<(typeof seasonalCampaigns)[number]>(seasonalCampaigns[0]);
  const [event, setEvent] = useState<(typeof eventTypes)[number]>(eventTypes[0]);
  const [style, setStyle] = useState<(typeof visualStyles)[number]>(visualStyles[0]);
  const [fields, setFields] = useState<Record<TextFieldKey, string>>({
    campaignGoal: "",
    targetAudience: "",
    promotion: "",
  });
  const [customInstructions, setCustomInstructions] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const parts = [
      `Seasonal campaign visual for ${campaign.name} (${campaign.description}), event: ${event.name} (${event.description}), style: ${style.name} (${style.description}), ${campaign.prompt}, Midjourney v6 Master prompt, 90/8/2 color balance, commercial photography quality`,
    ];
    if (fields.campaignGoal) parts.push(`campaign goal: ${fields.campaignGoal}`);
    if (fields.targetAudience) parts.push(`target audience: ${fields.targetAudience}`);
    if (fields.promotion) parts.push(`key message: "${fields.promotion}"`);
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
          <Calendar className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-2xl text-[#0F172A] dark:text-white">AI Szezonális Kampány Generátor</h3>
          <p className="text-sm text-[#475569] dark:text-slate-400">Ünnepi és szezonális Midjourney v6 kampányprompt összeállítás</p>
        </div>
      </div>

      <fieldset className="mb-8">
        <legend className={labelClass}>Szezonális kampány</legend>
        <div className="grid md:grid-cols-3 gap-4">
          {seasonalCampaigns.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCampaign(c)}
              aria-pressed={campaign.id === c.id}
              className={`${optionClass(campaign.id === c.id)} p-4 rounded-xl`}
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
          <legend className={labelClass}>Esemény típus</legend>
          <div className="space-y-2">
            {eventTypes.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setEvent(e)}
                aria-pressed={event.id === e.id}
                className={`${optionClass(event.id === e.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{e.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{e.description}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={labelClass}>Vizuális stílus</legend>
          <div className="space-y-2">
            {visualStyles.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStyle(s)}
                aria-pressed={style.id === s.id}
                className={`${optionClass(style.id === s.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{s.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{s.description}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="space-y-6 mb-8">
        {textFields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`seasonal-${f.key}`} className={labelClass}>
              {f.label}
            </label>
            <input
              id={`seasonal-${f.key}`}
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
          <label htmlFor="seasonal-custom" className={labelClass}>
            Egyedi utasítások (opcionális)
          </label>
          <textarea
            id="seasonal-custom"
            rows={3}
            maxLength={600}
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="pl. szabad szövegterület a bal oldalon, prémium csomagolás fókusz"
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
        <span>Szezonális Prompt Generálás</span>
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
