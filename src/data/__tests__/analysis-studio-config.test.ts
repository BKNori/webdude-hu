import {
  ANALYSIS_AUDIT_MODES,
  ANALYSIS_PRESETS,
  buildAuditBriefSummary,
  compileAnalysisPrompt,
  DEFAULT_ANALYSIS_STUDIO_STATE,
} from "@/data/analysis-studio-config";

describe("analysis-studio-config", () => {
  it("exposes 8 analysis domains and 6 presets with 0% gold/amber tokens", () => {
    expect(ANALYSIS_AUDIT_MODES).toHaveLength(8);
    expect(ANALYSIS_PRESETS).toHaveLength(6);

    const serialized = JSON.stringify({
      ANALYSIS_AUDIT_MODES,
      ANALYSIS_PRESETS,
      DEFAULT_ANALYSIS_STUDIO_STATE,
    });
    expect(serialized).not.toMatch(/#f59e0b|#ffd700|amber-|yellow-/i);
  });

  it("strictly separates SEO, AEO, and GEO layers in seo-aeo-geo audit mode", () => {
    const compiled = compileAnalysisPrompt({
      ...DEFAULT_ANALYSIS_STUDIO_STATE,
      mode: "seo-aeo-geo",
      engine: "perplexity-research",
    });

    expect(compiled.engineId).toBe("perplexity-research");
    expect(compiled.primaryPrompt).toContain("LAYER 1 — Technical & On-Page SEO");
    expect(compiled.primaryPrompt).toContain(
      "LAYER 2 — Answer Engine Optimization (AEO)"
    );
    expect(compiled.primaryPrompt).toContain(
      "LAYER 3 — Generative Engine Optimization (GEO)"
    );
    expect(compiled.primaryPrompt).toContain("llms.txt");
  });

  it("includes the 7-Layer Premium Webdesign Roast stack in ux-ui-cro mode", () => {
    const compiled = compileAnalysisPrompt({
      ...DEFAULT_ANALYSIS_STUDIO_STATE,
      mode: "ux-ui-cro",
      engine: "gemini-multimodal",
      inputSourceId: "screenshot",
      workflowModeId: "seven-layer-roast",
    });

    expect(compiled.primaryPrompt).toContain("Signature Blueprint");
    expect(compiled.primaryPrompt).toContain("Anti-Sameness Typography");
    expect(compiled.primaryPrompt).toContain("Trust Signal Sweep");
    expect(compiled.primaryPrompt).toContain("Reference Anchor");
  });

  it("fences pasted raw sample data in <untrusted_audit_asset> and enforces [ELLENŐRIZENDŐ] anti-hallucination rules", () => {
    const compiled = compileAnalysisPrompt({
      ...DEFAULT_ANALYSIS_STUDIO_STATE,
      engine: "claude-xml",
      rawSampleData: "query,impressions,ctr\nweboldal keszites,4200,0.012",
      guardrailIds: [
        "evidence-schema",
        "zero-hallucination",
        "untrusted-asset-fence",
      ],
    });

    expect(compiled.primaryPrompt).toContain("<role>");
    expect(compiled.primaryPrompt).toContain("<untrusted_audit_asset>");
    expect(compiled.primaryPrompt).toContain("weboldal keszites,4200,0.012");
    expect(compiled.primaryPrompt).toContain("[ELLENŐRIZENDŐ / TO VERIFY]");
    expect(compiled.primaryPrompt).toContain(
      "[Exact Evidence / Location] -> [Why It Hurts]"
    );
  });

  it("builds a copyable Hungarian Audit Brief Specification summary", () => {
    const summary = buildAuditBriefSummary(DEFAULT_ANALYSIS_STUDIO_STATE);
    expect(summary).toContain(
      "=== WEBDUDE PROFI ELEMZÉS & AUDIT SPECIFIKÁCIÓS ADATLAP ==="
    );
    expect(summary).toContain("SEO + AEO + GEO Láthatósági Audit");
    expect(summary).toContain("P0–P3 Súlyossági Mátrix");
    expect(summary).toContain("perplexity-research");
  });
});
