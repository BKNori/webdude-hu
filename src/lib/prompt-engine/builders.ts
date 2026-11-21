import type {
  CompiledPromptResult,
  LlmTargetEngine,
  PromptStats,
  StructuredLlmPromptInput,
  VisualPromptBuildInput,
  VisualTargetEngine,
} from "./types";

const ENGINE_LABELS: Record<VisualTargetEngine | LlmTargetEngine, string> = {
  "midjourney-v7": "Midjourney v7",
  "flux-1-1-pro": "Flux 1.1 Pro",
  "ideogram-3": "Ideogram 3.0",
  "recraft-v3-svg": "Recraft v3 SVG",
  "video-motion": "Videó & Motion",
  "claude-xml": "Claude XML",
  "chatgpt-markdown": "ChatGPT Markdown",
  "gemini-multimodal": "Gemini Multimodális",
  "perplexity-research": "Perplexity Kutatás",
};

/**
 * Pontos karakter-, szó- és tokenbecslés pre-flight ellenőrzéshez.
 */
export function estimatePromptStats(text: string): PromptStats {
  const chars = text.length;
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const estimatedTokens = chars > 0 ? Math.ceil(chars / 4) : 0;
  return { chars, words, estimatedTokens };
}

function normalizeTerms(items?: string[], extraCommaList?: string): string {
  const collected: string[] = [];
  for (const item of items ?? []) {
    const clean = item.trim();
    if (clean) collected.push(clean);
  }
  if (extraCommaList) {
    for (const part of extraCommaList.split(",")) {
      const clean = part.trim();
      if (clean) collected.push(clean);
    }
  }
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const term of collected) {
    const key = term.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(term);
    }
  }
  return unique.join(", ");
}

function stripCliFlags(text: string): string {
  return text
    .replace(/\s--[a-zA-Z0-9_-]+(?:\s+[^\s--][^\s]*)?/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildHexLockClause(colors?: string[]): string | undefined {
  const clean = (colors ?? [])
    .map((c) => c.trim())
    .filter((c) => /^#[0-9A-Fa-f]{3,8}$/.test(c));
  if (clean.length === 0) return undefined;
  return `Locked HEX palette: ${clean.join(", ")}`;
}

/**
 * 0 ms-os determinisztikus szintaxis-fordító vizuális és motion generátorokhoz.
 */
export function buildVisualPrompt(
  input: VisualPromptBuildInput
): CompiledPromptResult {
  const engineLabel = ENGINE_LABELS[input.engine];
  const baseNegative = normalizeTerms(input.negativeItems, input.customNegative);
  const hexLock = buildHexLockClause(input.brandColorsHex);

  const materialClause =
    input.materials && input.materials.length > 0
      ? `Materiality & surface textures: ${input.materials.map((m) => m.trim()).filter(Boolean).join(", ")}`
      : undefined;

  const coreClauses = [
    input.subject.trim(),
    input.styleNotes?.trim(),
    input.composition?.trim(),
    input.copySpace?.trim(),
    input.readingPattern?.trim(),
    input.safeZoneNote?.trim(),
    input.opticsAndLighting?.trim(),
    materialClause,
    input.typographyNote?.trim(),
    input.colorPalette?.trim(),
    hexLock,
  ].filter((part): part is string => Boolean(part && part.length > 0));

  if (input.engine === "midjourney-v7") {
    const flags: string[] = ["--v 7"];
    if (input.aspectRatio) flags.push(`--ar ${input.aspectRatio.trim()}`);
    if (input.styleRaw ?? true) flags.push("--style raw");
    if (typeof input.stylize === "number") flags.push(`--stylize ${input.stylize}`);
    if (typeof input.chaos === "number" && input.chaos > 0) {
      flags.push(`--chaos ${input.chaos}`);
    }
    if (typeof input.weird === "number" && input.weird > 0) {
      flags.push(`--weird ${input.weird}`);
    }
    if (input.sref?.trim()) {
      flags.push(`--sref ${input.sref.trim()}`);
      if (typeof input.sw === "number") flags.push(`--sw ${input.sw}`);
    }
    if (input.oref?.trim()) {
      flags.push(`--oref ${input.oref.trim()}`);
      if (typeof input.cw === "number") flags.push(`--cw ${input.cw}`);
    }
    if (input.tile) flags.push("--tile");
    if (input.draft) flags.push("--draft");
    if (baseNegative) flags.push(`--no ${baseNegative}`);

    const primaryPrompt = `${coreClauses.join(", ")} ${flags.join(" ")}`.trim();
    return {
      engineId: input.engine,
      engineLabel,
      primaryPrompt,
      negativePrompt: baseNegative,
      copyAllText: primaryPrompt,
      stats: estimatePromptStats(primaryPrompt),
    };
  }

  if (input.engine === "flux-1-1-pro") {
    const ratioNote = input.aspectRatio
      ? `Composed for a ${input.aspectRatio.trim()} frame.`
      : undefined;
    const exclusionProse = baseNegative
      ? `Exclude: ${stripCliFlags(baseNegative)}.`
      : undefined;
    const proseParts = [
      ...coreClauses.map(stripCliFlags),
      ratioNote,
      exclusionProse,
    ].filter((part): part is string => Boolean(part && part.length > 0));

    const primaryPrompt = proseParts.join(" ").replace(/\s+/g, " ").trim();
    return {
      engineId: input.engine,
      engineLabel,
      primaryPrompt,
      negativePrompt: stripCliFlags(baseNegative),
      copyAllText: primaryPrompt,
      stats: estimatePromptStats(primaryPrompt),
    };
  }

  if (input.engine === "ideogram-3") {
    const textSnippet = input.exactTextToRender?.trim();
    const textInstruction = textSnippet
      ? `Typography centerpiece displaying the exact text "${textSnippet}"${
          input.typographyDirection?.trim()
            ? `, styled as ${input.typographyDirection.trim()}`
            : ""
        }`
      : input.typographyDirection?.trim();

    const parts = [
      ...coreClauses,
      textInstruction,
      input.aspectRatio ? `Aspect ratio ${input.aspectRatio.trim()}` : undefined,
    ].filter((part): part is string => Boolean(part && part.length > 0));

    const primaryPrompt = parts.join(". ").trim();
    const copyAllText = baseNegative
      ? `${primaryPrompt}\n\nNegative Prompt: ${baseNegative}`
      : primaryPrompt;

    return {
      engineId: input.engine,
      engineLabel,
      primaryPrompt,
      negativePrompt: baseNegative,
      copyAllText,
      stats: estimatePromptStats(primaryPrompt),
    };
  }

  if (input.engine === "recraft-v3-svg") {
    const maxColors = input.maxVectorColors ?? 4;
    const vectorNegative = normalizeTerms(
      [
        "photorealism",
        "3D shading",
        "drop shadows",
        "photographic grain",
        "gradients",
        ...(input.negativeItems ?? []),
      ],
      input.customNegative
    );
    const parts = [
      "Clean flat 2D SVG vector artwork, crisp Bezier paths, zero photorealism, zero 3D shading",
      `Limited to a maximum of ${maxColors} solid colors`,
      ...coreClauses,
      input.aspectRatio ? `Canvas ratio ${input.aspectRatio.trim()}` : undefined,
    ].filter((part): part is string => Boolean(part && part.length > 0));

    const primaryPrompt = parts.join(". ").trim();
    const copyAllText = `${primaryPrompt}\n\nNegative Prompt: ${vectorNegative}`;

    return {
      engineId: input.engine,
      engineLabel,
      primaryPrompt,
      negativePrompt: vectorNegative,
      copyAllText,
      stats: estimatePromptStats(primaryPrompt),
    };
  }

  // video-motion
  const hook = input.videoHook?.trim() || "0-3s Visual Hook: immediate focal motion reveal";
  const camera = input.videoCameraMove?.trim() || "Smooth stabilized dolly-in";
  const pacing = input.videoPacing?.trim() || "Measured editorial pacing, 24fps";
  const motionParts = [
    `[0-3s Hook] ${hook}`,
    `[Camera] ${camera}`,
    `[Scene & Subject] ${coreClauses.join(", ")}`,
    `[Pacing] ${pacing}`,
    input.aspectRatio ? `[Aspect Ratio] ${input.aspectRatio.trim()}` : undefined,
  ].filter((part): part is string => Boolean(part && part.length > 0));

  const primaryPrompt = motionParts.join("\n");
  const copyAllText = baseNegative
    ? `${primaryPrompt}\n[Avoid] ${baseNegative}`
    : primaryPrompt;

  return {
    engineId: input.engine,
    engineLabel,
    primaryPrompt,
    negativePrompt: baseNegative,
    copyAllText,
    stats: estimatePromptStats(primaryPrompt),
  };
}

function renderList(items?: string[], fallback = "None specified."): string {
  const clean = (items ?? []).map((item) => item.trim()).filter(Boolean);
  if (clean.length === 0) return `- ${fallback}`;
  return clean.map((item, idx) => `${idx + 1}. ${item}`).join("\n");
}

function renderBullets(items?: string[]): string {
  const clean = (items ?? []).map((item) => item.trim()).filter(Boolean);
  if (clean.length === 0) return "- None specified.";
  return clean.map((item) => `- ${item}`).join("\n");
}

/**
 * 0 ms-os determinisztikus szintaxis-fordító szoftver-architektúra és elemzés LLM promptokhoz.
 */
export function buildStructuredLlmPrompt(
  input: StructuredLlmPromptInput
): CompiledPromptResult {
  const engineLabel = ENGINE_LABELS[input.engine];
  const constraints = input.constraints ?? [];
  const evidenceRules = input.evidenceRules ?? [];
  const workflowSteps = input.workflowSteps ?? [];
  const qaGate = input.qaGate ?? [];
  const outputFormat =
    input.outputFormat?.trim() ||
    "Structured executive report with concrete code/action items.";
  const contextText = input.context?.trim() || "Project domain: WebDude platform.";
  const guardrailsSummary = [...constraints, ...evidenceRules]
    .map((item) => item.trim())
    .filter(Boolean)
    .join("; ");

  let primaryPrompt = "";

  if (input.engine === "claude-xml") {
    primaryPrompt = [
      `<role>\n${input.role.trim()}\n</role>`,
      `<context>\nDomain: ${input.domain}\n${contextText}\n</context>`,
      `<objective>\n${input.objective.trim()}\n</objective>`,
      `<constraints>\n${renderBullets(constraints)}\n</constraints>`,
      `<evidence_rules>\n${renderBullets(evidenceRules)}\n</evidence_rules>`,
      `<workflow>\n${renderList(workflowSteps, "Analyze requirements and execute step by step.")}\n</workflow>`,
      `<output_format>\n${outputFormat}\n</output_format>`,
      `<qa_gate>\n${renderBullets(qaGate)}\n</qa_gate>`,
    ].join("\n\n");
  } else if (input.engine === "perplexity-research") {
    const sourceRules = [
      "Cite primary documentation, benchmarks, and verifiable URLs for every factual claim.",
      "Explicitly note conflicting evidence or insufficient data instead of guessing.",
      ...evidenceRules,
    ];
    primaryPrompt = [
      `# Research Role\n${input.role.trim()}`,
      `## Research Question & Objective\n${input.objective.trim()}`,
      `## Context (${input.domain})\n${contextText}`,
      `## Source & Evidence Rules\n${renderBullets(sourceRules)}`,
      `## Scope Constraints\n${renderBullets(constraints)}`,
      `## Investigation Steps\n${renderList(workflowSteps, "Survey primary sources, cross-verify claims, synthesize recommendations.")}`,
      `## Output Format\n${outputFormat}`,
      `## Verification Gate\n${renderBullets(qaGate)}`,
    ].join("\n\n");
  } else if (input.engine === "gemini-multimodal") {
    primaryPrompt = [
      `# Role\n${input.role.trim()}`,
      `## Multimodal & Context Inputs (${input.domain})\nInspect all attached codebases, UI screenshots, PDFs, or structured documents alongside the brief below.\n\n${contextText}`,
      `## Objective\n${input.objective.trim()}`,
      `## Constraints\n${renderBullets(constraints)}`,
      `## Evidence & Accuracy Rules\n${renderBullets(evidenceRules)}`,
      `## Execution Workflow\n${renderList(workflowSteps, "Parse inputs, cross-reference requirements, produce validated deliverables.")}`,
      `## Output Format\n${outputFormat}`,
      `## Quality Gate\n${renderBullets(qaGate)}`,
    ].join("\n\n");
  } else {
    // chatgpt-markdown
    primaryPrompt = [
      `# Role\n${input.role.trim()}`,
      `## Objective\n${input.objective.trim()}`,
      `## Context (${input.domain})\n${contextText}`,
      `## Constraints\n${renderBullets(constraints)}`,
      `## Evidence Rules\n${renderBullets(evidenceRules)}`,
      `## Workflow\n${renderList(workflowSteps, "Break down the problem, verify edge cases, deliver production output.")}`,
      `## Output Format\n${outputFormat}`,
      `## QA Gate\n${renderBullets(qaGate)}`,
    ].join("\n\n");
  }

  return {
    engineId: input.engine,
    engineLabel,
    primaryPrompt,
    negativePrompt: guardrailsSummary,
    copyAllText: primaryPrompt,
    stats: estimatePromptStats(primaryPrompt),
  };
}
