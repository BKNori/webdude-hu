"use client";

import { useState } from "react";
import { Image as ImageIcon, Zap, Copy, Check } from "lucide-react";

/**
 * Banner AI Műhely — Midjourney kampánybanner prompt-összeállító (védett generátor).
 * KIZÁRÓLAG `ToolAccessGate` (toolId: "banner_ai_muhely") mögött renderelhető.
 */

const bannerStyles = [
  {
    id: "minimalist",
    name: "Minimalista",
    description: "Tiszta, egyszerű vonalvezetés",
    prompt:
      "minimalist banner design, clean lines, ample negative space, modern typography, professional aesthetic",
    color: "from-[#00B5F1] to-sky-500",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futurisztikus, neon elemek",
    prompt:
      "cyberpunk banner design, neon lights, futuristic aesthetic, dark slate background with electric cyan and violet accents",
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professzionális, üzleti",
    prompt:
      "corporate banner design, professional business aesthetic, clean typography, trustworthy colors, modern corporate style",
    color: "from-[#00B5F1] to-[#5B21B6]",
  },
  {
    id: "creative",
    name: "Kreatív",
    description: "Dinamikus kompozíció",
    prompt:
      "creative banner design, vibrant composition, artistic visual hierarchy, eye-catching focal point",
    color: "from-sky-500 to-indigo-500",
  },
  {
    id: "luxury",
    name: "Prémium",
    description: "Elegáns, letisztult",
    prompt:
      "quiet luxury banner design, refined aesthetic, high-end feel, sophisticated palette, editorial composition",
    color: "from-violet-600 to-[#00B5F1]",
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern, innovatív",
    prompt:
      "tech banner design, modern innovation aesthetic, clean SaaS style, subtle geometric grid, futuristic professional look",
    color: "from-indigo-500 to-blue-500",
  },
] as const;

const aspectRatios = [
  { id: "16:9", name: "16:9 (Wide)", resolution: "1920×1080" },
  { id: "4:3", name: "4:3 (Standard)", resolution: "1920×1440" },
  { id: "1:1", name: "1:1 (Square)", resolution: "1080×1080" },
  { id: "9:16", name: "9:16 (Story)", resolution: "1080×1920" },
] as const;

const colorPalettes = [
  {
    id: "9082",
    name: "90/8/2 (Kék-Lila)",
    description: "90% mély palaszürke, 8% lila, 2% cián kiemelő",
  },
  { id: "monochrome", name: "Monokróm", description: "Fekete-fehér árnyalatok" },
  { id: "vibrant", name: "Vibráns", description: "Erős, kontrasztos színek" },
  { id: "pastel", name: "Pasztell", description: "Finom, lágy tónusok" },
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
  { key: "logoDescription", label: "Logó leírása (opcionális)", placeholder: "pl. minimalista kör alakú logó, cián akcentus" },
  { key: "bannerText", label: "Fő szöveg (opcionális)", placeholder: "pl. Prémium webfejlesztés vállalkozásoknak" },
  { key: "imageDescription", label: "Háttérkép leírása (opcionális)", placeholder: "pl. termékfotó, modern stúdió háttér, absztrakt fényív" },
  { key: "ctaText", label: "CTA gomb szövege (opcionális)", placeholder: "pl. Egyedi árajánlat kérése, Tovább" },
] as const;

type TextFieldKey = (typeof textFields)[number]["key"];

export default function BannerPromptGenerator() {
  const [style, setStyle] = useState<(typeof bannerStyles)[number]>(bannerStyles[0]);
  const [ratio, setRatio] = useState<(typeof aspectRatios)[number]>(aspectRatios[0]);
  const [palette, setPalette] = useState<(typeof colorPalettes)[number]>(colorPalettes[0]);
  const [fields, setFields] = useState<Record<TextFieldKey, string>>({
    logoDescription: "",
    bannerText: "",
    imageDescription: "",
    ctaText: "",
  });
  const [customInstructions, setCustomInstructions] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const parts = [
      `Banner design for ${style.name} style, ${style.description}, ${palette.description}, aspect ratio ${ratio.id}, ${style.prompt}, 90/8/2 color ratio rule, 85mm G-Master optics, chiaroscuro lighting, high resolution, commercial quality`,
    ];
    if (fields.logoDescription) parts.push(`include logo: ${fields.logoDescription}`);
    if (fields.bannerText) parts.push(`main text: "${fields.bannerText}"`);
    if (fields.imageDescription) parts.push(`background image: ${fields.imageDescription}`);
    if (fields.ctaText) parts.push(`CTA button: "${fields.ctaText}"`);
    if (customInstructions) parts.push(`custom requirements: ${customInstructions}`);
    setGeneratedPrompt(`${parts.join(", ")} --ar ${ratio.id} --v 6.1 --style raw`);
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
          <h3 className="text-2xl text-[#0F172A] dark:text-white">AI Banner Generátor</h3>
          <p className="text-sm text-[#475569] dark:text-slate-400">Midjourney v6 Master kampánybanner prompt összeállítás</p>
        </div>
      </div>

      <fieldset className="mb-8">
        <legend className={labelClass}>Stílus választás</legend>
        <div className="grid md:grid-cols-3 gap-4">
          {bannerStyles.map((s) => (
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
          <legend className={labelClass}>Méretarány</legend>
          <div className="space-y-2">
            {aspectRatios.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRatio(r)}
                aria-pressed={ratio.id === r.id}
                className={`${optionClass(ratio.id === r.id)} flex items-center justify-between`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{r.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400">{r.resolution}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={labelClass}>Színpaletta</legend>
          <div className="space-y-2">
            {colorPalettes.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPalette(p)}
                aria-pressed={palette.id === p.id}
                className={`${optionClass(palette.id === p.id)} flex items-center justify-between gap-2`}
              >
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">{p.name}</span>
                <span className="text-xs text-[#475569] dark:text-slate-400 text-right">{p.description}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="space-y-6 mb-8">
        {textFields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`banner-${f.key}`} className={labelClass}>
              {f.label}
            </label>
            <input
              id={`banner-${f.key}`}
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
          <label htmlFor="banner-custom" className={labelClass}>
            Egyedi utasítások (opcionális)
          </label>
          <textarea
            id="banner-custom"
            rows={3}
            maxLength={600}
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="pl. copy-space a bal oldalon, minimalista tipográfia, kontrasztos CTA zóna"
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
