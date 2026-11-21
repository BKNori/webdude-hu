/** Vizuális generátor célmotorok (2026 Pro Prompt Stúdió). */
export type VisualTargetEngine =
  | "midjourney-v7"
  | "flux-1-1-pro"
  | "ideogram-3"
  | "recraft-v3-svg"
  | "video-motion";

/** Szöveges / architekturális / elemző LLM célmotorok. */
export type LlmTargetEngine =
  | "claude-xml"
  | "chatgpt-markdown"
  | "gemini-multimodal"
  | "perplexity-research";

/** A Pro Prompt Stúdió 5 szakmai tartományi pillére. */
export type PromptStudioDomain =
  | "online-graphics"
  | "offline-print"
  | "apparel-merch"
  | "software-arch"
  | "analysis-audit";

/** Pre-flight hossz- és tokenstatisztika a prompt előnézethez. */
export interface PromptStats {
  chars: number;
  words: number;
  estimatedTokens: number;
}

/** Determinisztikus vizuális prompt-összeállító bemeneti séma. */
export interface VisualPromptBuildInput {
  engine: VisualTargetEngine;
  domain: PromptStudioDomain;
  subject: string;
  styleNotes?: string;
  opticsAndLighting?: string;
  composition?: string;
  safeZoneNote?: string;
  copySpace?: string;
  readingPattern?: string;
  typographyNote?: string;
  materials?: string[];
  colorPalette?: string;
  brandColorsHex?: string[];
  aspectRatio?: string;
  stylize?: number;
  chaos?: number;
  weird?: number;
  styleRaw?: boolean;
  tile?: boolean;
  draft?: boolean;
  sref?: string;
  sw?: number;
  oref?: string;
  cw?: number;
  exactTextToRender?: string;
  typographyDirection?: string;
  maxVectorColors?: number;
  videoCameraMove?: string;
  videoHook?: string;
  videoPacing?: string;
  negativeItems?: string[];
  customNegative?: string;
}

/** Determinisztikus strukturált LLM prompt-összeállító bemeneti séma. */
export interface StructuredLlmPromptInput {
  engine: LlmTargetEngine;
  domain: PromptStudioDomain;
  role: string;
  objective: string;
  context?: string;
  constraints?: string[];
  evidenceRules?: string[];
  workflowSteps?: string[];
  outputFormat?: string;
  qaGate?: string[];
}

/** A 0 ms-os szintaxis-fordító közös kimeneti kontraktusa. */
export interface CompiledPromptResult {
  engineId: VisualTargetEngine | LlmTargetEngine;
  engineLabel: string;
  primaryPrompt: string;
  negativePrompt: string;
  copyAllText: string;
  stats: PromptStats;
}

/** AI által finomított alternatív prompt variáció. */
export interface PromptVariation {
  label: string;
  prompt: string;
  rationaleHu: string;
}

/** A Groq finomító Server Action bemenete. */
export interface PromptRefinementInput {
  domain: PromptStudioDomain;
  targetEngine: VisualTargetEngine | LlmTargetEngine;
  brief: string;
  compiledPrompt: string;
  negativePrompt?: string;
}

/** A Groq finomító Server Action validált strukturált kimenete. */
export interface PromptRefinementOutput {
  refinedMasterPrompt: string;
  variations: PromptVariation[];
  negativeOrGuardrails: string;
  expertNotesHu: string[];
}

/** A Groq finomító Server Action válasz burkolója. */
export type PromptRefinementResult =
  | { success: true; output: PromptRefinementOutput }
  | { success: false; error: string; details?: unknown };
