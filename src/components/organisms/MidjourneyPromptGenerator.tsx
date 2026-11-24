"use client";

import { useState } from "react";
import { Image as ImageIcon, Zap, Copy, Check } from "lucide-react";

/**
 * Midjourney AI Műhely — Fotórealisztikus és kreatív vizuál prompt-összeállító (védett generátor).
 * KIZÁRÓLAG `ToolAccessGate` (toolId: "midjourney_ai_muhely") mögött renderelhető.
 */

const visualStyles = [
  {
    id: "photorealistic",
    name: "Fotórealisztikus",
    description: "Valósághű, részletes",
    prompt:
      "photorealistic visual, hyper-detailed, realistic lighting, 85mm G-Master optics, professional photography aesthetic",
    color: "from-blue-500 to-sky-500",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futurisztikus, neon",
    prompt:
      "cyberpunk visual, neon lights, futuristic aesthetic, dark slate background with electric cyan and violet glow",
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "minimalist",
    name: "Minimalista",
    description: "Tiszta, egyszerű",
    prompt:
      "minimalist visual, clean composition, ample negative space, modern aesthetic, professional simplicity",
    color: "from-[#00B5F1] to-[#5B21B6]",
  },
  {
    id: "artistic",
    name: "Művészi",
    description: "Kreatív, expresszív",
    prompt:
      "artistic visual, creative expression, dynamic composition, editorial visual storytelling, unique aesthetic",
    color: "from-sky-500 to-indigo-500",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Filmes, drámai",
    prompt:
      "cinematic visual, dramatic lighting, chiaroscuro, subtle film grain aesthetic, movie-like composition",
    color: "from-violet-600 to-[#00B5F1]",
  },
  {
    id: "abstract",
    name: "Absztrakt",
    description: "Koncepcionális",
    prompt:
      "abstract visual, conceptual design, geometric forms, modern architectural aesthetic, creative interpretation",
    color: "from-indigo-500 to-blue-500",
  },
] as const;

const lightingOptions = [
  { id: "chiaroscuro", name: "Chiaroscuro", description: "Fény-árnyék kontraszt" },
  { id: "rimlight", name: "Sunset Rim Light", description: "Meleg naplemente élfény" },
  { id: "studio", name: "Studio Lighting", description: "Kontrollált stúdiófény" },
  { id: "natural", name: "Natural Light", description: "Természetes szórt fény" },
] as const;

const qualitySettings = [
  { id: "ultra", name: "Ultra HD", description: "8K felbontás, max részlet" },
  { id: "high", name: "High Quality", description: "4K felbontás, magas részlet" },
  { id: "standard", name: "Standard", description: "2K felbontás, kiegyensúlyozott" },
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
  { key: "subject", label: "Téma / Tárgy (opcionális)", placeholder: "pl. portré, termékfotó, modern épületbelső" },
  { key: "visualDescription", label: "Vizuális leírás (opcionális)", placeholder: "pl. minimalista irodai tér, üvegfelületek, lágy háttérmosás" },
  { key: "stylePreferences", label: "Stílus preferenciák (opcionális)", placeholder: "pl. letisztult, drámai, monokróm, magazin-minőség" },
] as const;

type TextFieldKey = (typeof textFields)[number]["key"];

export default function MidjourneyPromptGenerator() {
  const [style, setStyle] = useState<(typeof visualStyles)[number]>(visualStyles[0]);
  const [lighting, setLighting] = useState<(typeof lightingOptions)[number]>(lightingOptions[0]);
  const [quality, setQuality] = useState<(typeof qualitySettings)[number]>(qualitySettings[0]);
  const [fields, setFields] = useState<Record<TextFieldKey, string>>({
    subject: "",
    visualDescription: "",
    stylePreferences: "",
  });
  const [customInstructions, setCustomInstructions] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const parts = [
      `Midjourney v6 ${style.name} visual, ${style.description}, ${lighting.name} (${lighting.description}), ${quality.name} (${quality.description}), ${style.prompt}, 90/8/2 color balance, 85mm G-Master optics, commercial photography aesthetic, high resolution`,
    ];
    if (fields.subject) parts.push(`subject: ${fields.subject}`);
    if (fields.visualDescription) parts.push(`visual description: ${fields.visualDescription}`);
    if (fields.stylePreferences) parts.push(`style preferences: ${fields.stylePreferences}`);
    if (customInstructions) parts.push(`custom requirements: ${customInstructions}`);
    setGeneratedPrompt(`${parts.join(", ")} --v 6.1 --style raw --q 2`);
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
          <ImageIcon className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-2xl text-[#0F172A] dark:text-white">AI Midjourney Generátor</h3>
          <p className="text-sm text-[#475569] dark:text-slate-400">Midjourney v6 Master vizuális prompt összeállítás</p>
        </div>
      </div>

      <fieldset className="mb-8">
        <legend className={labelClass}>Vizuális stílus</legend>
        <div className="grid md:grid-cols-3 gap-4">
          {visualStyles.map((s) => (
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
          <legend className={labelClass}>Fényelés</legend>
          <div className="space-y-2">
            {lightingOptions.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLighting(l)}
                aria-pressed={lighting.id === l.id}
                className={`${optionClass(lighting.id === l.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{l.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{l.description}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={labelClass}>Minőség</legend>
          <div className="space-y-2">
            {qualitySettings.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setQuality(q)}
                aria-pressed={quality.id === q.id}
                className={`${optionClass(quality.id === q.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{q.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{q.description}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="space-y-6 mb-8">
        {textFields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`mj-${f.key}`} className={labelClass}>
              {f.label}
            </label>
            <input
              id={`mj-${f.key}`}
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
          <label htmlFor="mj-custom" className={labelClass}>
            Egyedi utasítások (opcionális)
          </label>
          <textarea
            id="mj-custom"
            rows={3}
            maxLength={600}
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="pl. sekély mélységélesség (f/1.4), drámai kontraszt, szövegmentes kompozíció"
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
