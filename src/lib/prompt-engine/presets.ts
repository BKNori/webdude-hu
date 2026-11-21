/**
 * Közös Pro Prompt Stúdió chip-készletek (1/6. fázis).
 * A meglévő `src/lib/workshop-presets.ts` összes exportját változatlanul megőrzi
 * és re-exportálja, miközben új motor-, anti-AI-slop-, fényfizika-, paletta- és
 * LLM guardrail chipeket biztosít az 5 szakmai pillér számára.
 */

import type { PresetOption } from "@/lib/workshop-presets";
import type { LlmTargetEngine, VisualTargetEngine } from "./types";

export {
  AI_ENGINE_PRESETS,
  ASPECT_RATIO_OPTIONS,
  COLOR_PALETTE_PRESETS,
  DESIGN_STYLE_PRESETS,
  OPTICS_PRESETS,
  resolvePresetHints,
  type AspectRatio,
  type PresetOption,
} from "@/lib/workshop-presets";

export interface EnginePresetOption<TEngine extends string> {
  id: TEngine;
  label: string;
  shortHint: string;
}

/** Vizuális generátor célmotor választó chipek. */
export const VISUAL_TARGET_ENGINE_CHIPS: readonly EnginePresetOption<VisualTargetEngine>[] =
  [
    {
      id: "midjourney-v7",
      label: "Midjourney v7",
      shortHint: "Teljes flag-szintaxis (--ar, --style raw, --sref, --no)",
    },
    {
      id: "flux-1-1-pro",
      label: "Flux 1.1 Pro",
      shortHint: "Tiszta angol fényképi próza, 0 --flag",
    },
    {
      id: "ideogram-3",
      label: "Ideogram 3.0",
      shortHint: "Pontos idézőjeles tipográfia és HEX paletta-zár",
    },
    {
      id: "recraft-v3-svg",
      label: "Recraft v3 SVG",
      shortHint: "Tiszta 2D vektor, korlátozott szín- és útkezelés",
    },
    {
      id: "video-motion",
      label: "Videó & Motion",
      shortHint: "0–3 mp hook, kameramozgás, fényfizika és tempó",
    },
  ];

/** Strukturált LLM célmotor választó chipek. */
export const LLM_TARGET_ENGINE_CHIPS: readonly EnginePresetOption<LlmTargetEngine>[] =
  [
    {
      id: "claude-xml",
      label: "Claude XML",
      shortHint: "<role>, <constraints>, <evidence_rules>, <qa_gate>",
    },
    {
      id: "chatgpt-markdown",
      label: "ChatGPT Markdown",
      shortHint: "Tiszta strukturált Markdown szekciók és kimeneti séma",
    },
    {
      id: "gemini-multimodal",
      label: "Gemini Multimodális",
      shortHint: "Vizuális/kód bemenetre és nagy kontextusra optimalizált",
    },
    {
      id: "perplexity-research",
      label: "Perplexity Kutatás",
      shortHint: "Elsődleges források és hivatkozási fegyelem",
    },
  ];

/** Anti-AI-slop negatív szűrő chipek (vizuális műhelyekhez). */
export const ANTI_AI_SLOP_NEGATIVE_CHIPS: PresetOption[] = [
  {
    id: "no-anatomy-glitches",
    label: "Anatómiai torzulás kizárása",
    promptHint: "extra fingers, mutated hands, deformed anatomy, fused limbs",
  },
  {
    id: "no-fake-text",
    label: "Halmozott kamuszöveg kizárása",
    promptHint: "gibberish text, misspelled typography, broken letters, random watermark",
  },
  {
    id: "no-plastic-ai-look",
    label: "Műanyag AI-fény kizárása",
    promptHint: "plastic skin, over-sharpened HDR, cheesy stock photo look, waxy texture",
  },
  {
    id: "no-clutter-artifacts",
    label: "Vizuális zaj & felesleges kellék",
    promptHint: "cluttered background, floating artifacts, cropped main subject, lens dust",
  },
];

/** Haladó optika és fényfizika chipek. */
export const OPTICS_AND_LIGHTING_CHIPS: PresetOption[] = [
  {
    id: "editorial-softbox",
    label: "Softbox Diffúz Stúdió",
    promptHint:
      "large diffused overhead softbox, gentle specular roll-off, clean contact shadow",
  },
  {
    id: "daylight-architectural",
    label: "Természetes Építészeti Fény",
    promptHint:
      "crisp natural north-facing daylight, accurate bounce light, clean architectural verticals",
  },
  {
    id: "rim-cyber-lighting",
    label: "Kontúrfény & Mélység",
    promptHint:
      "subtle directional rim light separating subject from deep background, shallow depth of field",
  },
  {
    id: "macro-material",
    label: "Makró Anyagtextúra",
    promptHint:
      "90mm macro lens f/8, razor-sharp surface micro-texture, natural tactile grain",
  },
];

/** Márka- és színpaletta-zár chipek. */
export const BRAND_COLOR_LOCK_CHIPS: PresetOption[] = [
  {
    id: "lock-webdude-blue-violet",
    label: "WebDude Kék-Lila",
    promptHint:
      "strict color palette lock: luminous sky cyan #00B5F1, deep violet #5B21B6, obsidian slate #0B1120",
    colors: ["#00B5F1", "#5B21B6", "#0B1120"],
  },
  {
    id: "lock-nordic-slate",
    label: "Skandináv Világos Slate",
    promptHint:
      "strict color palette lock: crisp daylight white #F8FAFC, cool slate #334155, royal sky #0369A1",
    colors: ["#F8FAFC", "#334155", "#0369A1"],
  },
  {
    id: "lock-emerald-dark",
    label: "Smaragd & Obszidián",
    promptHint:
      "strict color palette lock: deep charcoal #0F172A, emerald #10B981, clean white #FFFFFF",
    colors: ["#0F172A", "#10B981", "#FFFFFF"],
  },
];

/** Strukturált LLM guardrail chipek (architektúra & elemzés pillérekhez). */
export const LLM_GUARDRAIL_CHIPS: PresetOption[] = [
  {
    id: "zero-hallucination",
    label: "Zéró hallucináció",
    promptHint:
      "State only directly verified facts from provided context; explicitly flag any missing inputs.",
  },
  {
    id: "strict-typescript",
    label: "Strict TypeScript (0 any)",
    promptHint:
      "Enforce strict TypeScript without 'any', explicit return types, and clean error boundaries.",
  },
  {
    id: "wcag-dual-theme",
    label: "WCAG AA + Dual Theme",
    promptHint:
      "Ensure WCAG AA contrast across both light default and dark themes plus reduced-motion compliance.",
  },
  {
    id: "zero-fixed-price",
    label: "Zéró Fix Ár",
    promptHint:
      "Never output fixed prices or currency amounts; frame engagements as custom-scoped quotes.",
  },
];
