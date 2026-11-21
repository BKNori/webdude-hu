import {
  buildPrepressSpecSummary,
  compileOfflinePrintPrompt,
  DEFAULT_OFFLINE_PRINT_STATE,
  OFFLINE_PRINT_PRESETS,
  type OfflinePrintStudioState,
} from "@/data/offline-print-studio-config";

describe("Offline & Print Prepress Pro Prompt Studio config & compilers", () => {
  it("mind a 6 nyomdai preset érvényes, nem üres promptot fordít", () => {
    expect(OFFLINE_PRINT_PRESETS).toHaveLength(6);

    for (const preset of OFFLINE_PRINT_PRESETS) {
      const merged: OfflinePrintStudioState = {
        ...DEFAULT_OFFLINE_PRINT_STATE,
        ...preset.state,
      };
      const compiled = compileOfflinePrintPrompt(merged);
      expect(compiled.primaryPrompt.length).toBeGreaterThan(50);
      expect(compiled.stats.estimatedTokens).toBeGreaterThan(12);
    }
  });

  it("különbséget tesz a 2D Nyomdakész Grafikai Alap és a 3D Print Mockup mód között", () => {
    const artwork2d = compileOfflinePrintPrompt({
      ...DEFAULT_OFFLINE_PRINT_STATE,
      outputMode: "2d-print-artwork",
    });
    expect(artwork2d.primaryPrompt).toContain("Flat 2D print-ready prepress key artwork");
    expect(artwork2d.negativePrompt).toContain("3D mockup perspective");

    const mockup3d = compileOfflinePrintPrompt({
      ...DEFAULT_OFFLINE_PRINT_STATE,
      outputMode: "3d-print-mockup",
    });
    expect(mockup3d.primaryPrompt).toContain("Photorealistic 3D commercial print presentation mockup");
  });

  it("beépíti a Roll-up 150 mm holttér, a Tri-fold 97-100-100 mm és a FOGRA52 260% TAC szabályokat", () => {
    const rollup = compileOfflinePrintPrompt({
      ...DEFAULT_OFFLINE_PRINT_STATE,
      engine: "midjourney-v7",
      productFormat: "rollup-banner",
    });
    expect(rollup.primaryPrompt).toContain("150mm bottom cassette");
    expect(rollup.primaryPrompt).toContain("--ar 9:16");

    const trifold = compileOfflinePrintPrompt({
      ...DEFAULT_OFFLINE_PRINT_STATE,
      productFormat: "folded-brochure",
      colorProfile: "fogra52",
    });
    expect(trifold.primaryPrompt).toContain("97-100-100mm");
    expect(trifold.primaryPrompt).toContain("TAC 260%");
  });

  it("buildPrepressSpecSummary tartalmazza a PDF/X-4, TrimBox, Bleed, ICC/TAC és Spot réteg adatokat", () => {
    const summary = buildPrepressSpecSummary(DEFAULT_OFFLINE_PRINT_STATE);
    expect(summary).toContain("PDF/X-4");
    expect(summary).toContain("TrimBox");
    expect(summary).toContain("ISO Coated v2 (FOGRA39");
    expect(summary).toContain("Rich Black (C:60 M:40 Y:40 K:100)");
    expect(summary).toContain("100% K Overprint");
  });

  it("Flux 1.1 Pro esetén garantáltan 0 --flag kerül a kimenetbe", () => {
    const flux = compileOfflinePrintPrompt({
      ...DEFAULT_OFFLINE_PRINT_STATE,
      engine: "flux-1-1-pro",
    });
    expect(flux.primaryPrompt).not.toMatch(/\s--[a-z0-9-]+/i);
  });
});
