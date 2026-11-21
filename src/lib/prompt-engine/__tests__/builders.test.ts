import {
  buildStructuredLlmPrompt,
  buildVisualPrompt,
  estimatePromptStats,
} from "@/lib/prompt-engine";

describe("Pro Prompt Engine builders", () => {
  it("estimatePromptStats pontos karakter-, szó- és becsült token-számot ad", () => {
    expect(estimatePromptStats("")).toEqual({
      chars: 0,
      words: 0,
      estimatedTokens: 0,
    });

    const stats = estimatePromptStats("Minimalist glass cube floating above slate");
    expect(stats.chars).toBe(42);
    expect(stats.words).toBe(6);
    expect(stats.estimatedTokens).toBe(Math.ceil(42 / 4));
  });

  it("buildVisualPrompt — Midjourney v7 helyesen formázza az összes flaget és a --no blokkot", () => {
    const result = buildVisualPrompt({
      engine: "midjourney-v7",
      domain: "online-graphics",
      subject: "Futuristic SaaS dashboard sculpture on obsidian pedestal",
      styleNotes: "editorial product photography",
      aspectRatio: "16:9",
      styleRaw: true,
      stylize: 250,
      chaos: 15,
      weird: 50,
      sref: "123456",
      sw: 400,
      oref: "https://example.com/ref.png",
      cw: 80,
      tile: true,
      draft: true,
      negativeItems: ["blurry", "watermark"],
      customNegative: "plastic skin, extra fingers",
    });

    expect(result.engineLabel).toBe("Midjourney v7");
    expect(result.primaryPrompt).toContain("--v 7");
    expect(result.primaryPrompt).toContain("--ar 16:9");
    expect(result.primaryPrompt).toContain("--style raw");
    expect(result.primaryPrompt).toContain("--stylize 250");
    expect(result.primaryPrompt).toContain("--chaos 15");
    expect(result.primaryPrompt).toContain("--weird 50");
    expect(result.primaryPrompt).toContain("--sref 123456 --sw 400");
    expect(result.primaryPrompt).toContain("--oref https://example.com/ref.png --cw 80");
    expect(result.primaryPrompt).toContain("--tile");
    expect(result.primaryPrompt).toContain("--draft");
    expect(result.primaryPrompt).toContain("--no blurry, watermark, plastic skin, extra fingers");
    expect(result.stats.estimatedTokens).toBeGreaterThan(10);
  });

  it("buildVisualPrompt — Flux 1.1 Pro tiszta természetes angol próza, garantáltan -- flagek nélkül", () => {
    const result = buildVisualPrompt({
      engine: "flux-1-1-pro",
      domain: "offline-print",
      subject: "Tactile cotton business card stack --stylize 300 --v 7",
      opticsAndLighting: "90mm macro lens, soft diffused studio light",
      aspectRatio: "4:5",
      negativeItems: ["bent corners", "blur"],
    });

    expect(result.engineLabel).toBe("Flux 1.1 Pro");
    expect(result.primaryPrompt).not.toMatch(/\s--[a-z0-9-]+/i);
    expect(result.copyAllText).not.toMatch(/\s--[a-z0-9-]+/i);
    expect(result.primaryPrompt).toContain("4:5 frame");
    expect(result.primaryPrompt).toContain("Exclude: bent corners, blur.");
  });

  it("buildVisualPrompt — Ideogram 3.0 idézőjelbe teszi a feliratot és rögzíti a HEX palettát", () => {
    const result = buildVisualPrompt({
      engine: "ideogram-3",
      domain: "online-graphics",
      subject: "Bold geometric SaaS launch poster",
      exactTextToRender: "WEBDUDE STUDIO",
      typographyDirection: "condensed grotesque all-caps display type",
      brandColorsHex: ["#00B5F1", "#7C3AED", "#0B1120"],
      aspectRatio: "4:5",
    });

    expect(result.engineLabel).toBe("Ideogram 3.0");
    expect(result.primaryPrompt).toContain('displaying the exact text "WEBDUDE STUDIO"');
    expect(result.primaryPrompt).toContain("condensed grotesque all-caps display type");
    expect(result.primaryPrompt).toContain("Locked HEX palette: #00B5F1, #7C3AED, #0B1120");
  });

  it("buildVisualPrompt — Recraft v3 SVG kizárja a fotórealizmust/3D árnyékolást és korlátozza a színeket", () => {
    const result = buildVisualPrompt({
      engine: "recraft-v3-svg",
      domain: "apparel-merch",
      subject: "Minimalist eagle geometric crest emblem",
      maxVectorColors: 3,
      brandColorsHex: ["#0B1120", "#00B5F1", "#FFFFFF"],
    });

    expect(result.engineLabel).toBe("Recraft v3 SVG");
    expect(result.primaryPrompt).toContain("flat 2D SVG vector artwork");
    expect(result.primaryPrompt).toContain("maximum of 3 solid colors");
    expect(result.primaryPrompt).toContain("zero photorealism, zero 3D shading");
    expect(result.negativePrompt).toContain("photorealism");
    expect(result.negativePrompt).toContain("3D shading");
  });

  it("buildVisualPrompt — Videó & Motion tartalmazza a 0–3s hookot, kameramozgást, fényfizikát és tempót", () => {
    const result = buildVisualPrompt({
      engine: "video-motion",
      domain: "online-graphics",
      subject: "Luxury watch rotating over dark slate reflection",
      videoHook: "Macro droplet impact reveals brushed titanium bezel",
      videoCameraMove: "Slow orbital parallax pan",
      opticsAndLighting: "Volumetric rim light, crisp specular highlight",
      videoPacing: "Smooth 24fps ramp",
      aspectRatio: "9:16",
    });

    expect(result.engineLabel).toBe("Videó & Motion");
    expect(result.primaryPrompt).toContain("[0-3s Hook] Macro droplet impact");
    expect(result.primaryPrompt).toContain("[Camera] Slow orbital parallax pan");
    expect(result.primaryPrompt).toContain("[Pacing] Smooth 24fps ramp");
    expect(result.primaryPrompt).toContain("[Aspect Ratio] 9:16");
  });

  it("buildStructuredLlmPrompt — Claude XML létrehozza a kötelező XML struktúra-blokkokat", () => {
    const result = buildStructuredLlmPrompt({
      engine: "claude-xml",
      domain: "software-arch",
      role: "Lead Next.js 16 Architect",
      objective: "Design an ISR-cached B2B catalog module",
      context: "TypeScript strict + Tailwind v4 codebase",
      constraints: ["Zero any types", "Max 300 lines per component"],
      evidenceRules: ["Verify all file paths before citing"],
      workflowSteps: ["Read existing config", "Implement types", "Add unit tests"],
      outputFormat: "Modular TypeScript patches",
      qaGate: ["npx tsc --noEmit", "npm run lint -- --max-warnings 0"],
    });

    expect(result.engineLabel).toBe("Claude XML");
    for (const tag of [
      "<role>",
      "</role>",
      "<context>",
      "<objective>",
      "<constraints>",
      "<evidence_rules>",
      "<workflow>",
      "<output_format>",
      "<qa_gate>",
    ]) {
      expect(result.primaryPrompt).toContain(tag);
    }
    expect(result.negativePrompt).toContain("Zero any types");
  });

  it("buildStructuredLlmPrompt — ChatGPT, Gemini és Perplexity motorok helyes formázást adnak", () => {
    const base = {
      domain: "analysis-audit" as const,
      role: "Senior Technical SEO Auditor",
      objective: "Audit schema markup gaps",
    };

    const gpt = buildStructuredLlmPrompt({ ...base, engine: "chatgpt-markdown" });
    expect(gpt.primaryPrompt).toContain("# Role");
    expect(gpt.primaryPrompt).toContain("## QA Gate");

    const gemini = buildStructuredLlmPrompt({ ...base, engine: "gemini-multimodal" });
    expect(gemini.primaryPrompt).toContain("## Multimodal & Context Inputs");

    const perplexity = buildStructuredLlmPrompt({
      ...base,
      engine: "perplexity-research",
    });
    expect(perplexity.primaryPrompt).toContain("## Source & Evidence Rules");
    expect(perplexity.primaryPrompt).toContain("verifiable URLs");
  });
});
