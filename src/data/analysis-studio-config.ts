import { buildStructuredLlmPrompt, type CompiledPromptResult } from "@/lib/prompt-engine";
import {
  ANALYSIS_AUDIT_MODES,
  ANALYSIS_GUARDRAILS,
  ANALYSIS_INPUT_SOURCES,
  ANALYSIS_PRIORITY_FRAMEWORKS,
  ANALYSIS_WORKFLOW_MODES,
  STRICT_AUDIT_DEFAULT_GUARDRAILS,
  type AnalysisAuditMode,
  type AnalysisGuardrailId,
  type AnalysisInputSourceId,
  type AnalysisPriorityFrameworkId,
  type AnalysisStudioState,
  type AnalysisWorkflowModeId,
} from "./analysis-studio-options";

export {
  ANALYSIS_AUDIT_MODES,
  ANALYSIS_GUARDRAILS,
  ANALYSIS_INPUT_SOURCES,
  ANALYSIS_PRIORITY_FRAMEWORKS,
  ANALYSIS_WORKFLOW_MODES,
  STRICT_AUDIT_DEFAULT_GUARDRAILS,
  type AnalysisAuditMode,
  type AnalysisGuardrailId,
  type AnalysisInputSourceId,
  type AnalysisPriorityFrameworkId,
  type AnalysisStudioState,
  type AnalysisWorkflowModeId,
};

export interface AnalysisPreset {
  id: string;
  title: string;
  badge: string;
  description: string;
  state: Partial<AnalysisStudioState>;
}

export const DEFAULT_ANALYSIS_STUDIO_STATE: AnalysisStudioState = {
  mode: "seo-aeo-geo",
  engine: "perplexity-research",
  inputSourceId: "url",
  targetAsset: "https://webdude.hu/szolgaltatasok/weboldal-keszites",
  businessContext:
    "B2B prémium webfejlesztési és AI-automatizációs szolgáltató oldal. Cél: magas vásárlási szándékú (BOFU) ügyfelek konvertálása és idézhetőség ChatGPT / Perplexity / Google AI Overviews válaszokban.",
  rawSampleData: "",
  priorityFrameworkId: "p0-p3",
  workflowModeId: "chained-3-phase",
  guardrailIds: [...STRICT_AUDIT_DEFAULT_GUARDRAILS],
  customFocusQuestion:
    "Hol veszítünk organikus vagy AI-keresős (GEO) láthatóságot, és melyik 3 konkrét blokk javítása hozza a leggyorsabb lead-növekedést?",
};

/** 6 db 1-kattintásos Profi Elemzés & Audit Preset. */
export const ANALYSIS_PRESETS: readonly AnalysisPreset[] = [
  {
    id: "seo-aeo-geo-visibility",
    title: "SEO + AEO + GEO Teljes Láthatósági Audit",
    badge: "PERPLEXITY · P0–P3",
    description:
      "3 rétegű (Crawl/Index SEO + Direct Answer/Schema AEO + Entitás/llms.txt GEO) mélyaudit P0–P3 mátrixszal.",
    state: { ...DEFAULT_ANALYSIS_STUDIO_STATE },
  },
  {
    id: "seven-layer-ux-cro-roast",
    title: "7-Lépcsős Prémium UX/UI & CRO Landing Roast",
    badge: "GEMINI · 7-LAYER ROAST",
    description:
      "Képernyőkép és landing audit: Signature Blueprint, Anti-Sameness tipográfia, térköz, fókusz, bizalmi jelek és CTA-súrlódás.",
    state: {
      mode: "ux-ui-cro",
      engine: "gemini-multimodal",
      inputSourceId: "screenshot",
      targetAsset: "Csatolt Hero + Szolgáltatás Landing Képernyőkép (Desktop + Mobile)",
      businessContext:
        "Hideg hirdetési és organikus forgalom konvertálása 10 perces videós audit vagy egyedi árajánlat kérésre.",
      priorityFrameworkId: "ice",
      workflowModeId: "seven-layer-roast",
      guardrailIds: [...STRICT_AUDIT_DEFAULT_GUARDRAILS],
      customFocusQuestion:
        "Pontozd 1-10 skálán a 7 prémium réteget, és adj konkrét szöveg- és hierarchia-cserét a fold feletti szekcióra!",
    },
  },
  {
    id: "competitor-market-gap",
    title: "Versenytárs & Piac Benchmark + Tartalmi Rés",
    badge: "PERPLEXITY · ICE",
    description:
      "Pozicionálási mátrix, BOFU kulcsszó- és AI-idézettségi rések, valamint aszimmetrikus E-E-A-T előnyök feltárása.",
    state: {
      mode: "competitor-market",
      engine: "perplexity-research",
      inputSourceId: "url",
      targetAsset: "Saját domain vs. Top 3 hazai/nemzetközi ügynökségi versenytárs",
      businessContext:
        "Senior egyszemélyes kivitelezői pozicionálás (26+ év grafika, 16+ év fejlesztés) szembeállítása a lassú, többlépcsős ügynökségi modellel.",
      priorityFrameworkId: "ice",
      workflowModeId: "executive-client-report",
      guardrailIds: [...STRICT_AUDIT_DEFAULT_GUARDRAILS, "verify-before-claim"],
      customFocusQuestion:
        "Melyik 5 magas üzleti értékű témát és döntési kérdést nem fedik le hitelesen a versenytársak?",
    },
  },
  {
    id: "nextjs-code-owasp-cwv",
    title: "Next.js / WebApp Kód, OWASP & CWV Audit",
    badge: "CLAUDE XML · OWASP",
    description:
      "OWASP ASVS/AISVS biztonság, <untrusted_data> izoláció, <=300 soros Atomic Design, RSC/Client határok és LCP/INP.",
    state: {
      mode: "code-security-audit",
      engine: "claude-xml",
      inputSourceId: "code-repo",
      targetAsset: "src/app/**, src/actions/**, src/components/**",
      businessContext:
        "Next.js 16 App Router + React 19 + Firebase produkciós kódbázis biztonsági, típusbiztonsági (0 any) és teljesítmény-felülvizsgálata.",
      priorityFrameworkId: "p0-p3",
      workflowModeId: "single-deep-audit",
      guardrailIds: [...STRICT_AUDIT_DEFAULT_GUARDRAILS],
      customFocusQuestion:
        "Keress RBAC megkerülési pontokat, hiányzó Zod szerveroldali validációt, hydration hibát vagy 300 sor feletti komponenst!",
    },
  },
  {
    id: "campaign-funnel-ai-slop",
    title: "Kampány, Funnel & Copywriting AI-Slop Audit",
    badge: "CHATGPT · QUICK WINS",
    description:
      "Üres AI-klisék kigyomlálása, hirdetés–landing összhang (message match) és 48 órás konverziós szövegjavítások.",
    state: {
      mode: "copy-ai-slop",
      engine: "chatgpt-markdown",
      inputSourceId: "copy-brief",
      targetAsset: "Landing oldal szövegkönyv + Meta/Google Ads hirdetésszövegek",
      businessContext:
        "Egyes szám első személyű, konkrét mérnöki és üzleti bizonyítékokra épülő szövegezés Zéró Fix Ár szabállyal.",
      priorityFrameworkId: "quick-wins-90d",
      workflowModeId: "chained-3-phase",
      guardrailIds: [...STRICT_AUDIT_DEFAULT_GUARDRAILS],
      customFocusQuestion:
        "Írd át az összes általános, sablonos mondatot konkrét, mérhető előnyt kommunikáló Előtte -> Utána blokkokra!",
    },
  },
  {
    id: "ga4-gsc-csv-action-plan",
    title: "GA4 / Search Console / CSV CTR-Rés & Akcióterv",
    badge: "CLAUDE XML · RICE",
    description:
      "Magas megjelenésű, alacsony CTR-ű lekérdezések, kannibalizáció és konverziós lemorzsolódás elemzése RICE rangsorral.",
    state: {
      mode: "data-analytics-csv",
      engine: "claude-xml",
      inputSourceId: "csv-report",
      targetAsset: "Google Search Console & GA4 90 napos export (Queries + Pages)",
      businessContext:
        "Organikus kattintási arány (CTR) és BOFU cikk -> kapcsolatfelvétel konverzió növelése új linképítés nélkül.",
      priorityFrameworkId: "rice",
      workflowModeId: "chained-3-phase",
      guardrailIds: [...STRICT_AUDIT_DEFAULT_GUARDRAILS, "verify-before-claim"],
      customFocusQuestion:
        "Azonosítsd a 3–15. pozícióban lévő, magas impressziójú oldalakat, és adj hozzájuk konkrét Title/Meta/TL;DR javítást!",
    },
  },
];

/** 0 ms-os determinisztikus Elemzés & Audit LLM prompt fordító. */
export function compileAnalysisPrompt(state: AnalysisStudioState): CompiledPromptResult {
  const mode = ANALYSIS_AUDIT_MODES.find((m) => m.id === state.mode) ?? ANALYSIS_AUDIT_MODES[0];
  const inputSource = ANALYSIS_INPUT_SOURCES.find((s) => s.id === state.inputSourceId) ?? ANALYSIS_INPUT_SOURCES[0];
  const priority = ANALYSIS_PRIORITY_FRAMEWORKS.find((p) => p.id === state.priorityFrameworkId) ?? ANALYSIS_PRIORITY_FRAMEWORKS[0];
  const workflow = ANALYSIS_WORKFLOW_MODES.find((w) => w.id === state.workflowModeId) ?? ANALYSIS_WORKFLOW_MODES[0];
  const selectedGuardrails = ANALYSIS_GUARDRAILS.filter((g) => state.guardrailIds.includes(g.id));

  const fencedRawSample = state.rawSampleData.trim()
    ? `\n<untrusted_audit_asset>\n${state.rawSampleData.trim()}\n</untrusted_audit_asset>`
    : "";

  const contextLines = [
    `Audit Domain: ${mode.label} [${mode.badge}]`,
    `Input Source Type: ${inputSource.label} — ${inputSource.inspectionRuleEn}`,
    `Target Asset / URL / Subject: ${state.targetAsset.trim() || "Unspecified target (request or inspect attached input)"}`,
    `Business Context & Conversion Goal: ${state.businessContext.trim() || "B2B lead generation, authority, and organic/AI search visibility."}`,
    `Prioritization Model: ${priority.label} [${priority.badge}] — ${priority.scoringRuleEn}`,
    state.customFocusQuestion.trim() ? `Primary Investigation Question: ${state.customFocusQuestion.trim()}` : undefined,
    fencedRawSample ? `Raw Audit Asset Payload (fenced for prompt-injection safety):${fencedRawSample}` : undefined,
  ].filter((line): line is string => Boolean(line));

  const constraints = selectedGuardrails.map((g) => g.ruleEn);
  const evidenceRules = [
    inputSource.inspectionRuleEn,
    priority.scoringRuleEn,
    ...selectedGuardrails
      .filter((g) => g.id === "evidence-schema" || g.id === "zero-hallucination" || g.id === "verify-before-claim")
      .map((g) => g.ruleEn),
  ];

  const workflowSteps = [
    ...mode.checklistEn,
    ...workflow.stepsEn,
  ];

  const qaGate = [
    "Every finding strictly follows [Exact Evidence / Location] -> [Why It Hurts] -> [Business/Technical Impact] -> [Concrete Drop-in Fix].",
    "Missing or unverified inputs are explicitly flagged as [ELLENŐRIZENDŐ / TO VERIFY] with zero fabricated numbers.",
    `All recommendations are scored and sorted using ${priority.label} (${priority.badge}).`,
    `Confirm final deliverables match: ${mode.deliverablesEn}`,
  ];

  return buildStructuredLlmPrompt({
    engine: state.engine,
    domain: "analysis-audit",
    role: mode.roleEn,
    objective:
      state.customFocusQuestion.trim() ||
      `Execute a rigorous ${mode.label} on "${state.targetAsset.trim() || "the provided target"}" using the ${workflow.label} workflow.`,
    context: contextLines.join("\n"),
    constraints,
    evidenceRules,
    workflowSteps,
    outputFormat: `${workflow.label} [${workflow.badge}] scored with ${priority.label}.\nExpected Deliverables: ${mode.deliverablesEn}`,
    qaGate,
  });
}

/** 1-kattintással másolható magyar Elemzési & Audit Specifikációs Adatlap. */
export function buildAuditBriefSummary(state: AnalysisStudioState): string {
  const mode = ANALYSIS_AUDIT_MODES.find((m) => m.id === state.mode) ?? ANALYSIS_AUDIT_MODES[0];
  const inputSource = ANALYSIS_INPUT_SOURCES.find((s) => s.id === state.inputSourceId) ?? ANALYSIS_INPUT_SOURCES[0];
  const priority = ANALYSIS_PRIORITY_FRAMEWORKS.find((p) => p.id === state.priorityFrameworkId) ?? ANALYSIS_PRIORITY_FRAMEWORKS[0];
  const workflow = ANALYSIS_WORKFLOW_MODES.find((w) => w.id === state.workflowModeId) ?? ANALYSIS_WORKFLOW_MODES[0];
  const selectedGuardrails = ANALYSIS_GUARDRAILS.filter((g) => state.guardrailIds.includes(g.id));

  return [
    "=== WEBDUDE PROFI ELEMZÉS & AUDIT SPECIFIKÁCIÓS ADATLAP ===",
    `Elemzési Szakterület: ${mode.label} (${mode.badge})`,
    `Bemeneti Forrás: ${inputSource.label}`,
    `Vizsgált Célpont: ${state.targetAsset.trim() || "Nincs megadva"}`,
    `Prioritási Keretrendszer: ${priority.label} [${priority.badge}]`,
    `Workflow & Láncolás: ${workflow.label} [${workflow.badge}]`,
    `Cél-LLM Motor: ${state.engine}`,
    `Aktív Bizonyíték- & Anti-Hallucináció Fékek (${selectedGuardrails.length}/8): ${
      selectedGuardrails.map((g) => g.label).join(" · ") || "Nincs"
    }`,
    `Fő Vizsgálati Kérdés: ${state.customFocusQuestion.trim() || "Átfogó bizonyíték-alapú diagnózis és akcióterv"}`,
  ].join("\n");
}
