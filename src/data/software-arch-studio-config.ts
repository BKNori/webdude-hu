import { buildStructuredLlmPrompt, type CompiledPromptResult } from "@/lib/prompt-engine";
import {
  ARCH_GUARDRAILS,
  ARCH_OUTPUT_FORMATS,
  ARCH_RIGOR_LEVELS,
  ARCH_STACK_CHIPS,
  SOFTWARE_ARCH_MODES,
  WEBDUDE_DEFAULT_GUARDRAILS,
  type ArchGuardrailId,
  type ArchOutputFormatId,
  type ArchRigorLevelId,
  type SoftwareArchMode,
  type SoftwareArchStudioState,
} from "./software-arch-studio-options";

export {
  ARCH_GUARDRAILS,
  ARCH_OUTPUT_FORMATS,
  ARCH_RIGOR_LEVELS,
  ARCH_STACK_CHIPS,
  SOFTWARE_ARCH_MODES,
  WEBDUDE_DEFAULT_GUARDRAILS,
  type ArchGuardrailId,
  type ArchOutputFormatId,
  type ArchRigorLevelId,
  type SoftwareArchMode,
  type SoftwareArchStudioState,
};

export interface SoftwareArchPreset {
  id: string;
  title: string;
  badge: string;
  description: string;
  state: Partial<SoftwareArchStudioState>;
}

export const DEFAULT_SOFTWARE_ARCH_STATE: SoftwareArchStudioState = {
  mode: "coding-agent-sprint",
  engine: "claude-xml",
  projectName: "WebDude.hu — Ügyfélportál & AI Műhely",
  objectiveBrief:
    "Tervezz és implementálj egy új, moduláris (<300 sor/fájl) Pro Prompt Stúdió munkaeszközt Dual Theme (Light alapértelmezett + Dark) és Kék-Lila v7.0 palettával, 0 ms-os determinisztikus fordítómotorral, Firebase Auth + ToolAccessLock RBAC védelemmel és teljes Jest/Playwright QA-kapuval.",
  ssotFiles:
    "AGENTS.md, _docs/ARCHITECTURE.md, _docs/DESIGN_SYSTEM.md, src/lib/prompt-engine/types.ts, src/lib/prompt-engine/builders.ts",
  risksAndConstraints:
    "Zéró regresszió a meglévő generátorokon, 0% arany/amber szín, szigorúan <300 sor minden új fájlban, Zéró Fix Ár.",
  stackIds: ["nextjs-16", "react-19", "ts-strict", "tailwind-v4", "firebase", "ai-sdk-llm", "playwright-jest"],
  guardrailIds: [...WEBDUDE_DEFAULT_GUARDRAILS],
  outputFormatId: "small-batch-sprint",
  rigorId: "production-webdude",
  customAntiPatterns: "Ne használj any típust, ne csonkíts kódot '// ...' kommenttel, ne futtasd a deploy.bat-ot.",
};

/** 6 db 1-kattintásos Szoftver-Architektúra & Coding Agent Preset. */
export const SOFTWARE_ARCH_PRESETS: readonly SoftwareArchPreset[] = [
  {
    id: "webdude-coding-agent-sprint",
    title: "WebDude 5-Pilléres Coding Agent Sprint",
    badge: "CLAUDE XML · SPRINT",
    description: "Next.js 16 + Firebase + <300 soros Atomic Design + 3 Batch + kötelező Terminál QA Gate.",
    state: { ...DEFAULT_SOFTWARE_ARCH_STATE },
  },
  {
    id: "fullstack-saas-portal-c4",
    title: "Full-Stack SaaS / Ügyfélportál Rendszerterv",
    badge: "C4 MERMAID + RBAC",
    description: "C4 Context/Container Mermaid diagramok, Firestore Security Rules, Stripe idempotens webhookok és anti-drain olvasás.",
    state: {
      mode: "system-design-c4",
      engine: "claude-xml",
      projectName: "B2B Ügyfélportál & Mérföldkő-Elszámoló SaaS",
      objectiveBrief:
        "Készíts teljes C4 rendszerarchitektúra-tervet (Context, Container, Component), Firestore adatmodellt és RBAC jogosultsági mátrixot egy többszereplős (Ügyfél + Szuperadmin) portálhoz Stripe mérföldkő-fizetéssel és dokumentumszéffel.",
      ssotFiles: "_docs/ARCHITECTURE.md, firestore.rules, src/types/portal.ts, src/app/api/webhooks/stripe/route.ts",
      risksAndConstraints: "Firestore Spark/Blaze anti-drain szabály (zéró végtelen onSnapshot loop), HMAC-SHA256 webhook aláírás-ellenőrzés.",
      stackIds: ["nextjs-16", "react-19", "ts-strict", "firebase", "stripe-webhooks", "playwright-jest"],
      guardrailIds: ["hitl-plan-gate", "strict-clean-code", "owasp-aisvs", "mermaid-diagrams", "rollback-plan"],
      outputFormatId: "mermaid-c4-adr",
      rigorId: "enterprise-critical",
    },
  },
  {
    id: "ai-agent-mcp-owasp",
    title: "AI-Agent & MCP Backend (OWASP AISVS 2026)",
    badge: "AISVS · SECURITY",
    description: "<untrusted_data> prompt-injection izoláció, Zod I/O sémák, least-privilege MCP tool scoping, rate-limit és evals.",
    state: {
      mode: "api-ai-agent",
      engine: "claude-xml",
      projectName: "AI Agent Server Action & MCP Gateway",
      objectiveBrief:
        "Tervezz OWASP ASVS és OWASP AISVS 2026 kompatibilis Server Action és AI-Agent hívási láncot: minden külső/felhasználói szöveg <untrusted_data> blokkba zárva, dupla Zod validáció, IP + UID rate-limit, token-költség circuit breaker és determinisztikus hallucináció-tesztek.",
      ssotFiles: "src/actions/prompt-studio-refine.ts, src/lib/rate-limit.ts, src/lib/firebase-admin.ts",
      risksAndConstraints: "Soha ne szivárogjon API kulcs vagy nyers stack trace a kliensre; állapotmódosító tool hívás csak HITL jóváhagyással.",
      stackIds: ["nextjs-16", "ts-strict", "firebase", "ai-sdk-llm", "playwright-jest"],
      guardrailIds: ["strict-clean-code", "owasp-aisvs", "mermaid-diagrams", "terminal-qa-gate", "rollback-plan"],
      outputFormatId: "xml-agent-prompt",
      rigorId: "enterprise-critical",
    },
  },
  {
    id: "legacy-wp-nextjs-migration",
    title: "Legacy WordPress → Next.js 16 Migráció",
    badge: "301 SEO · MIGRÁCIÓ",
    description: "Zero-downtime átállás, 301 redirect térkép, SEO/AEO/GEO Schema.org öröklés és cPanel/Cloud Run döntési terv.",
    state: {
      mode: "refactor-migration",
      engine: "chatgpt-markdown",
      projectName: "Legacy WordPress / WooCommerce → Next.js 16 Migráció",
      objectiveBrief:
        "Készíts fázisolt, zéró adat- és SEO-vesztéses migrációs tervet egy nagy forgalmú WordPress oldal Next.js 16 App Router alapokra helyezéséhez: URL-leltár, 301-es átirányítási mátrix, MDX/Firestore tartalom-konverzió, kanonikus + hreflang + JSON-LD ellenőrzés és azonnali rollback protokoll.",
      ssotFiles: "next.config.js, src/app/sitemap.ts, src/lib/structuredData.ts, public/llms.txt",
      risksAndConstraints: "Meglévő organikus helyezések és backlinkek 100%-os megőrzése, Zéró Fix Ár, <2.5s LCP.",
      stackIds: ["nextjs-16", "react-19", "ts-strict", "wp-woo", "node-cpanel", "firebase"],
      guardrailIds: ["hitl-plan-gate", "small-diffs", "zero-fixed-price", "terminal-qa-gate", "rollback-plan"],
      outputFormatId: "small-batch-sprint",
      rigorId: "production-webdude",
    },
  },
  {
    id: "frontend-cwv-monolith-refactor",
    title: "Frontend CWV & Monolit Refaktor (<=300 sor)",
    badge: "CWV · ATOMIC DESIGN",
    description: "600+ soros monolit komponens szétbontása Atomic Design szerint, RSC vs. Client szeparáció, WCAG AA és Tailwind v4.",
    state: {
      mode: "frontend-cwv",
      engine: "gemini-multimodal",
      projectName: "Monolit UI Refaktor & Core Web Vitals Optimalizáció",
      objectiveBrief:
        "Bonts szét egy túlburjánzott kliensoldali UI komponenst <=300 soros Atomic Design modulokra (options.ts + config.ts + Form.tsx + TechPanel.tsx + vékony orchestrator), miközben a page.tsx tiszta Server Component marad, és a Dual Theme kontraszt (WCAG AA) 0 hibával átmegy az audit-contrast.js szkripten.",
      ssotFiles: "_docs/ARCHITECTURE.md, _docs/DESIGN_SYSTEM.md, scripts/audit-contrast.js",
      risksAndConstraints: "Minden meglévő prop és export maradjon visszafelé kompatibilis; minden motion animáció figyelje a useReducedMotion() hookot.",
      stackIds: ["nextjs-16", "react-19", "ts-strict", "tailwind-v4", "motion-react", "playwright-jest"],
      guardrailIds: ["small-diffs", "strict-clean-code", "ssot-docs-sync", "terminal-qa-gate"],
      outputFormatId: "small-batch-sprint",
      rigorId: "production-webdude",
    },
  },
  {
    id: "prd-adr-tech-benchmark",
    title: "PRD & ADR Technológiai Benchmark",
    badge: "PERPLEXITY · ADR",
    description: "PostgreSQL/Supabase vs. Firestore és cPanel Passenger vs. Cloud Run összehasonlító ADR élő forrásokkal.",
    state: {
      mode: "prd-adr",
      engine: "perplexity-research",
      projectName: "Adatbázis & Hosting Architektúra ADR Benchmark (2026)",
      objectiveBrief:
        "Készíts tényalapú, elsődleges dokumentációkkal alátámasztott Architecture Decision Record (ADR) és Trade-off Mátrix elemzést: Firestore vs. Supabase PostgreSQL (RLS, lekérdezési költség, tranzakciók, vendor lock-in), valamint cPanel Phusion Passenger standalone vs. Google Cloud Run üzemeltetés.",
      ssotFiles: "_docs/ARCHITECTURE.md, package.json, next.config.js",
      risksAndConstraints: "Minden állítást hivatalos 2025/2026-os dokumentációval és mérhető SLA/limittel támasztd alá; találgatás tilos.",
      stackIds: ["nextjs-16", "firebase", "supabase-pg", "node-cpanel", "docker-cloudrun"],
      guardrailIds: ["discovery-first", "mermaid-diagrams", "rollback-plan"],
      outputFormatId: "mermaid-c4-adr",
      rigorId: "enterprise-critical",
    },
  },
];

/** 0 ms-os determinisztikus Szoftver-Architektúra & Coding Agent prompt fordító. */
export function compileSoftwareArchPrompt(state: SoftwareArchStudioState): CompiledPromptResult {
  const mode = SOFTWARE_ARCH_MODES.find((m) => m.id === state.mode) ?? SOFTWARE_ARCH_MODES[0];
  const outputFormat = ARCH_OUTPUT_FORMATS.find((f) => f.id === state.outputFormatId) ?? ARCH_OUTPUT_FORMATS[0];
  const rigor = ARCH_RIGOR_LEVELS.find((r) => r.id === state.rigorId) ?? ARCH_RIGOR_LEVELS[1];
  const selectedStacks = ARCH_STACK_CHIPS.filter((s) => state.stackIds.includes(s.id));
  const selectedGuardrails = ARCH_GUARDRAILS.filter((g) => state.guardrailIds.includes(g.id));

  const stackSummary =
    selectedStacks.length > 0
      ? selectedStacks.map((s) => `${s.label} (${s.promptHint})`).join("; ")
      : "Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4";

  const contextLines = [
    `Project / System: ${state.projectName.trim() || "WebDude Digital Platform"}`,
    `Architecture Phase: ${mode.label} [${mode.badge}]`,
    `Engineering Rigor: ${rigor.label} [${rigor.badge}]`,
    `Target Technology Stack: ${stackSummary}`,
    state.ssotFiles.trim() ? `Mandatory SSOT & Repository Files to Inspect First: ${state.ssotFiles.trim()}` : undefined,
    state.risksAndConstraints.trim() ? `Domain Risks & Hard Boundaries: ${state.risksAndConstraints.trim()}` : undefined,
  ].filter((line): line is string => Boolean(line));

  const constraints = [
    ...selectedGuardrails.map((g) => g.constraintEn),
    state.customAntiPatterns.trim() ? `CUSTOM ANTI-PATTERNS TO AVOID: ${state.customAntiPatterns.trim()}` : undefined,
  ].filter((c): c is string => Boolean(c));

  const qaGate = [
    ...rigor.qaCommands.map((cmd) => `Run and pass with 0 errors: \`${cmd}\``),
    ...selectedGuardrails.map((g) => g.qaGateEn).filter((q): q is string => Boolean(q)),
    `Confirm deliverables match: ${mode.deliverablesEn}`,
  ];

  const workflowSteps = [
    state.ssotFiles.trim()
      ? `SSOT Deep Read: Inspect ${state.ssotFiles.trim()} and verify existing types/exports before proposing changes.`
      : "Context Verification: Audit existing architecture boundaries and interfaces before proposing changes.",
    ...mode.workflowEn,
    `Format output strictly as: ${outputFormat.label} (${outputFormat.formatEn})`,
  ];

  return buildStructuredLlmPrompt({
    engine: state.engine,
    domain: "software-arch",
    role: mode.roleEn,
    objective: state.objectiveBrief.trim() || `Design a production-ready ${mode.label} blueprint for ${state.projectName || "the system"}.`,
    context: contextLines.join("\n"),
    constraints,
    evidenceRules: rigor.evidenceEn,
    workflowSteps,
    outputFormat: `${outputFormat.label}: ${outputFormat.formatEn}\nExpected Deliverables: ${mode.deliverablesEn}`,
    qaGate,
  });
}

/** 1-kattintással másolható magyar Architektúra & QA Műszaki Összefoglaló (Blueprint Checklist). */
export function buildArchBlueprintChecklist(state: SoftwareArchStudioState): string {
  const mode = SOFTWARE_ARCH_MODES.find((m) => m.id === state.mode) ?? SOFTWARE_ARCH_MODES[0];
  const outputFormat = ARCH_OUTPUT_FORMATS.find((f) => f.id === state.outputFormatId) ?? ARCH_OUTPUT_FORMATS[0];
  const rigor = ARCH_RIGOR_LEVELS.find((r) => r.id === state.rigorId) ?? ARCH_RIGOR_LEVELS[1];
  const selectedStacks = ARCH_STACK_CHIPS.filter((s) => state.stackIds.includes(s.id));
  const selectedGuardrails = ARCH_GUARDRAILS.filter((g) => state.guardrailIds.includes(g.id));

  return [
    "=== WEBDUDE SZOFTVER-ARCHITEKTÚRA & QA MŰSZAKI ADATLAP ===",
    `Projekt / Rendszer: ${state.projectName.trim() || "Névtelen rendszer"}`,
    `Architektúra Fázis: ${mode.label} (${mode.badge})`,
    `Cél-LLM / Ügynök Motor: ${state.engine}`,
    `Kimeneti Formátum: ${outputFormat.label}`,
    `Mérnöki Szigorúság: ${rigor.label} [${rigor.badge}]`,
    `Technológiai Stack (${selectedStacks.length} db): ${selectedStacks.map((s) => s.label).join(", ") || "Alapértelmezett stack"}`,
    `Érintett SSOT Fájlok: ${state.ssotFiles.trim() || "Nincs megadva"}`,
    `Aktív Guardrail-ek (${selectedGuardrails.length} db): ${selectedGuardrails.map((g) => g.label).join(" · ") || "Nincs"}`,
    `Kötelező Terminál QA Parancsok: ${rigor.qaCommands.join(" && ")}`,
  ].join("\n");
}
