import {
  buildArchBlueprintChecklist,
  compileSoftwareArchPrompt,
  DEFAULT_SOFTWARE_ARCH_STATE,
  SOFTWARE_ARCH_MODES,
  SOFTWARE_ARCH_PRESETS,
} from "@/data/software-arch-studio-config";

describe("software-arch-studio-config", () => {
  it("exposes 7 architecture modes and 6 engineering presets with 0% gold/amber tokens", () => {
    expect(SOFTWARE_ARCH_MODES).toHaveLength(7);
    expect(SOFTWARE_ARCH_PRESETS).toHaveLength(6);

    const serialized = JSON.stringify({
      SOFTWARE_ARCH_MODES,
      SOFTWARE_ARCH_PRESETS,
      DEFAULT_SOFTWARE_ARCH_STATE,
    });
    expect(serialized).not.toMatch(/#f59e0b|#ffd700|amber-|yellow-/i);
  });

  it("compiles Claude XML syntax with <role>, <context>, <constraints>, <workflow>, and <qa_gate> tags", () => {
    const compiled = compileSoftwareArchPrompt({
      ...DEFAULT_SOFTWARE_ARCH_STATE,
      engine: "claude-xml",
    });

    expect(compiled.engineId).toBe("claude-xml");
    expect(compiled.primaryPrompt).toContain("<role>");
    expect(compiled.primaryPrompt).toContain("<context>");
    expect(compiled.primaryPrompt).toContain("<constraints>");
    expect(compiled.primaryPrompt).toContain("<workflow>");
    expect(compiled.primaryPrompt).toContain("<qa_gate>");
    expect(compiled.primaryPrompt).toContain("max 300 lines");
    expect(compiled.stats.chars).toBeGreaterThan(250);
  });

  it("compiles ChatGPT Markdown and Perplexity Research formats without XML wrapper tags", () => {
    const markdownResult = compileSoftwareArchPrompt({
      ...DEFAULT_SOFTWARE_ARCH_STATE,
      engine: "chatgpt-markdown",
      mode: "refactor-migration",
    });
    expect(markdownResult.primaryPrompt).toContain("# Role");
    expect(markdownResult.primaryPrompt).toContain("## QA Gate");
    expect(markdownResult.primaryPrompt).not.toContain("<role>");

    const perplexityResult = compileSoftwareArchPrompt({
      ...DEFAULT_SOFTWARE_ARCH_STATE,
      engine: "perplexity-research",
      mode: "prd-adr",
    });
    expect(perplexityResult.primaryPrompt).toContain("# Research Role");
    expect(perplexityResult.primaryPrompt).toContain(
      "Cite primary documentation, benchmarks, and verifiable URLs"
    );
  });

  it("injects OWASP AISVS <untrusted_data> and discovery-first 5 clarifying questions guardrails when enabled", () => {
    const compiled = compileSoftwareArchPrompt({
      ...DEFAULT_SOFTWARE_ARCH_STATE,
      mode: "api-ai-agent",
      guardrailIds: ["discovery-first", "owasp-aisvs", "terminal-qa-gate"],
    });

    expect(compiled.primaryPrompt).toContain("<untrusted_data>");
    expect(compiled.primaryPrompt).toContain("5 high-leverage clarifying questions");
    expect(compiled.primaryPrompt).toContain("npx tsc --noEmit");
  });

  it("builds a copyable Hungarian Architecture & QA Blueprint Checklist summary", () => {
    const summary = buildArchBlueprintChecklist(DEFAULT_SOFTWARE_ARCH_STATE);
    expect(summary).toContain(
      "=== WEBDUDE SZOFTVER-ARCHITEKTÚRA & QA MŰSZAKI ADATLAP ==="
    );
    expect(summary).toContain("5-Pilléres AI Coding Agent Sprint");
    expect(summary).toContain("claude-xml");
    expect(summary).toContain("npx tsc --noEmit");

    const emptyState = {
      ...DEFAULT_SOFTWARE_ARCH_STATE,
      projectName: "",
      objectiveBrief: "",
      ssotFiles: "",
      risksAndConstraints: "Strict GDPR isolation",
      customAntiPatterns: "Never use any",
      stackIds: [],
      guardrailIds: [],
    };
    const fallbackCompiled = compileSoftwareArchPrompt(emptyState);
    const fallbackSummary = buildArchBlueprintChecklist(emptyState);
    expect(fallbackCompiled.primaryPrompt).toContain("WebDude Digital Platform");
    expect(fallbackCompiled.primaryPrompt).toContain("CUSTOM ANTI-PATTERNS TO AVOID: Never use any");
    expect(fallbackSummary).toContain("Névtelen rendszer");
    expect(fallbackSummary).toContain("Alapértelmezett stack");
  });
});
