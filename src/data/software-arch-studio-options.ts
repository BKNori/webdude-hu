import type { LlmTargetEngine } from "@/lib/prompt-engine";

export type SoftwareArchMode =
  | "system-design-c4"
  | "prd-adr"
  | "data-security"
  | "api-ai-agent"
  | "frontend-cwv"
  | "coding-agent-sprint"
  | "refactor-migration";

export type ArchOutputFormatId =
  | "xml-agent-prompt"
  | "agents-md-spec"
  | "mermaid-c4-adr"
  | "small-batch-sprint"
  | "technical-discovery";

export type ArchRigorLevelId =
  | "mvp-prototype"
  | "production-webdude"
  | "enterprise-critical";

export type ArchGuardrailId =
  | "discovery-first"
  | "hitl-plan-gate"
  | "small-diffs"
  | "strict-clean-code"
  | "owasp-aisvs"
  | "zero-fixed-price"
  | "mermaid-diagrams"
  | "ssot-docs-sync"
  | "terminal-qa-gate"
  | "rollback-plan";

export interface SoftwareArchStudioState {
  mode: SoftwareArchMode;
  engine: LlmTargetEngine;
  projectName: string;
  objectiveBrief: string;
  ssotFiles: string;
  risksAndConstraints: string;
  stackIds: string[];
  guardrailIds: ArchGuardrailId[];
  outputFormatId: ArchOutputFormatId;
  rigorId: ArchRigorLevelId;
  customAntiPatterns: string;
}

export interface SoftwareArchModeOption {
  id: SoftwareArchMode;
  label: string;
  badge: string;
  focusHu: string;
  roleEn: string;
  workflowEn: string[];
  deliverablesEn: string;
}

export interface ArchStackChip {
  id: string;
  label: string;
  promptHint: string;
}

export interface ArchGuardrailOption {
  id: ArchGuardrailId;
  label: string;
  shortHu: string;
  constraintEn: string;
  qaGateEn?: string;
}

export interface ArchOutputFormatOption {
  id: ArchOutputFormatId;
  label: string;
  formatEn: string;
}

export interface ArchRigorLevelOption {
  id: ArchRigorLevelId;
  label: string;
  badge: string;
  evidenceEn: string[];
  qaCommands: string[];
}

export const SOFTWARE_ARCH_MODES: readonly SoftwareArchModeOption[] = [
  {
    id: "system-design-c4",
    label: "System Design & C4 Modell",
    badge: "C4 & MERMAID",
    focusHu: "Context/Container/Component Mermaid diagramok, rendszerhatárok, adatáramlás és skálázási szűk keresztmetszetek.",
    roleEn: "Principal Systems Architect & Distributed Cloud Designer specialized in C4 Modeling and high-availability web architectures.",
    workflowEn: [
      "Map System Context and Container boundaries with explicit trust zones and external integrations.",
      "Produce valid Mermaid C4 / sequence diagrams for critical request and data flows.",
      "Analyze scaling bottlenecks, caching tiers (ISR/Edge/DB), failure modes, and observability.",
    ],
    deliverablesEn: "C4 Context & Container Mermaid diagrams, trust boundary matrix, data-flow narrative, and bottleneck mitigation plan.",
  },
  {
    id: "prd-adr",
    label: "PRD & ADR Döntési Napló",
    badge: "PRD + ADR",
    focusHu: "Üzleti cél → nem-funkcionális követelmények (NFR), SLA/SLO, Architecture Decision Record + trade-off mátrix, visszafordíthatóság.",
    roleEn: "Staff Product Architect & Technical Program Lead writing unambiguous PRDs and Architecture Decision Records (ADRs).",
    workflowEn: [
      "Translate business goals into testable functional and non-functional requirements (latency, SLA/SLO, security, cost).",
      "Evaluate 2-3 architectural options in a structured trade-off matrix (pros, cons, lock-in, TCO, reversibility).",
      "Formulate a normative ADR (Context, Decision, Consequences, Rollback Trigger).",
    ],
    deliverablesEn: "Executive PRD specification, NFR & SLO table, 3-option Trade-off Matrix, and formal ADR document.",
  },
  {
    id: "data-security",
    label: "Adatbázis, Séma & Biztonság",
    badge: "DB & RBAC",
    focusHu: "Firestore/PostgreSQL ERD Mermaid-ben, kompozit indexek, Security Rules / RLS, RBAC, PII maszkírozás és audit naplózás.",
    roleEn: "Principal Data Architect & Application Security Engineer specialized in Firestore NoSQL, PostgreSQL RLS, and GDPR/PII protection.",
    workflowEn: [
      "Design normalized or access-pattern-driven data schema with a valid Mermaid erDiagram.",
      "Define composite indexes, query cost guardrails (anti-drain pagination/limits), and data lifecycle rules.",
      "Specify least-privilege Firestore Security Rules or PostgreSQL Row-Level Security (RLS), RBAC claims, PII masking, and audit trails.",
    ],
    deliverablesEn: "Mermaid ERD, collection/table schema definitions, composite index list, and production Security Rules / RLS policies.",
  },
  {
    id: "api-ai-agent",
    label: "API, Integráció & AI-Agent",
    badge: "OWASP AISVS",
    focusHu: "Zod szerződések, idempotens webhookok, rate-limit, OWASP ASVS & OWASP AISVS 2026 (<untrusted_data> izoláció, MCP scoping, evals).",
    roleEn: "Principal API & AI Security Architect (OWASP ASVS v5 + OWASP AISVS 2026) designing resilient integrations and agentic workflows.",
    workflowEn: [
      "Define strict input/output Zod contracts, idempotency keys, HMAC signature verification, and exponential backoff retries.",
      "Enforce OWASP AISVS 2026 controls: wrap untrusted inputs in <untrusted_data> tags, apply least-privilege MCP/tool scoping, and require human-in-the-loop for state-mutating actions.",
      "Design rate-limiting, token/cost circuit breakers, structured error taxonomy, and deterministic evaluation test cases.",
    ],
    deliverablesEn: "TypeScript + Zod API/Action contracts, OWASP AISVS prompt-injection defense architecture, webhook sequence diagram, and eval suite.",
  },
  {
    id: "frontend-cwv",
    label: "Frontend, Design System & CWV",
    badge: "NEXT 16 & CWV",
    focusHu: "Atomic Design, <=300 soros komponensek, RSC vs. Client szeparáció, LCP/CLS/INP optimalizálás, WCAG AA, SEO/AEO/GEO JSON-LD + XSS védelem.",
    roleEn: "Lead Next.js 16 / React 19 Frontend Architect, Design Systems Engineer, and Core Web Vitals / Technical SEO Specialist.",
    workflowEn: [
      "Decompose UI into Atomic Design (atoms/molecules/organisms) keeping every file strictly under 300 lines and pushing 'use client' to leaf nodes.",
      "Optimize Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms), Dual Theme contrast (WCAG AA), keyboard focus rings, and useReducedMotion().",
      "Specify Metadata API, canonical/hreflang parity, and XSS-safe JSON-LD schemas (.replace(/</g, '\\\\u003c')).",
    ],
    deliverablesEn: "Component tree blueprint (<300 lines/file), Server/Client boundary table, CWV + WCAG AA checklist, and JSON-LD schema contract.",
  },
  {
    id: "coding-agent-sprint",
    label: "5-Pilléres AI Coding Agent Sprint",
    badge: "AGENTS.MD",
    focusHu: "Role + SSOT Deep Read + Anti-Patterns + Kis Batch-ek + Kötelező Terminál QA Gate (Claude Code, Cursor, Windsurf, Antigravity számára).",
    roleEn: "Principal AI Coding Agent Workflow Architect authoring deterministic multi-batch sprint prompts for Claude Code, Cursor, Windsurf, and Antigravity.",
    workflowEn: [
      "Phase 1 (SSOT Deep Read): List exact repository files the agent must read before writing any code.",
      "Phase 2 (Batched Implementation): Break execution into 2-3 atomic batches with explicit file paths, <300-line modularity budgets, and zero-truncation rules.",
      "Phase 3 (Mandatory Terminal QA Gate): Require zero-error verification via tsc --noEmit, eslint --max-warnings 0, jest, contrast audit, and production build.",
    ],
    deliverablesEn: "Copy-ready 5-Pillar Coding Agent Sprint Prompt (Role, SSOT Read List, Hard Anti-Patterns, Batched Plan, and Terminal QA Gate).",
  },
  {
    id: "refactor-migration",
    label: "Refaktor, Debugging & Migráció",
    badge: "ZERO-REGRESSION",
    focusHu: "Legacy (pl. WordPress/WooCommerce → Next.js) 301-átirányítási térképpel, monolit bontás <=300 sorra, regresszió- és rollback-terv.",
    roleEn: "Staff Legacy Modernization & Refactoring Architect specialized in zero-downtime migrations, SEO equity preservation, and monolith decomposition.",
    workflowEn: [
      "Audit current耦合/monolith hotspots, URL structure, data dependencies, and regression risks.",
      "Design incremental strangler-fig or modular extraction steps keeping every extracted module under 300 lines with 100% backward-compatible exports.",
      "Provide 301 redirect mapping, parity verification tests, and an instant rollback runbook.",
    ],
    deliverablesEn: "Root-cause & coupling audit, step-by-step decomposition/migration plan, 301 SEO redirect matrix, and rollback protocol.",
  },
];

export const ARCH_STACK_CHIPS: readonly ArchStackChip[] = [
  { id: "nextjs-16", label: "Next.js 16 App Router", promptHint: "Next.js 16.x App Router (RSC by default, Server Actions, standalone build)" },
  { id: "react-19", label: "React 19", promptHint: "React 19 hooks and concurrent server/client boundaries" },
  { id: "ts-strict", label: "TypeScript Strict", promptHint: "TypeScript strict mode (zero 'any', explicit interfaces and type guards)" },
  { id: "tailwind-v4", label: "Tailwind CSS v4", promptHint: "Tailwind CSS v4 (@theme tokens, Dual Theme light default + dark mode)" },
  { id: "motion-react", label: "Motion (motion/react)", promptHint: "Motion v12+ ('motion/react' import, mandatory useReducedMotion() support)" },
  { id: "firebase", label: "Firebase Auth & Firestore", promptHint: "Firebase Auth + Firestore (anti-drain single getDoc/getDocs, Admin SDK server verification)" },
  { id: "supabase-pg", label: "Supabase / PostgreSQL", promptHint: "PostgreSQL + Row-Level Security (RLS), typed migrations, connection pooling" },
  { id: "wp-woo", label: "WordPress / WooCommerce", promptHint: "WordPress / WooCommerce custom theme/plugin architecture, REST/GraphQL, ERP sync" },
  { id: "node-cpanel", label: "Node.js / cPanel Passenger", promptHint: "Node.js standalone deployment on Phusion Passenger / cPanel with memory guardrails" },
  { id: "docker-cloudrun", label: "Docker / Cloud Run", promptHint: "Multi-stage Docker containerization, stateless horizontal scaling on Cloud Run" },
  { id: "stripe-webhooks", label: "Stripe Webhooks", promptHint: "Stripe Checkout & HMAC-SHA256 verified idempotent webhook processing" },
  { id: "erp-billing", label: "ERP / Számlázó API", promptHint: "ERP & invoicing API integration (Billingo/Számlázz.hu/Kulcs-Soft) with retry queues" },
  { id: "ai-sdk-llm", label: "AI SDK (Groq/OpenAI/Claude/Gemini)", promptHint: "Structured LLM orchestration with Zod schema validation, rate limiting, and prompt-injection isolation" },
  { id: "playwright-jest", label: "Playwright E2E + Jest", promptHint: "Jest unit tests + Playwright E2E verification suites" },
];

export const ARCH_GUARDRAILS: readonly ArchGuardrailOption[] = [
  { id: "discovery-first", label: "Discovery mód (5 kérdés)", shortHu: "Először 5 pontosító kérdés, kódírás előtt", constraintEn: "DISCOVERY FIRST: Before writing implementation code, ask 5 high-leverage clarifying questions to eliminate ambiguity." },
  { id: "hitl-plan-gate", label: "HITL Terv-Kapu", shortHu: "Audit → Terv → Jóváhagyás → Kódolás", constraintEn: "HUMAN-IN-THE-LOOP GATE: Follow strict Audit -> Blueprint -> Approval -> Execution phases; pause after the blueprint if risky trade-offs exist." },
  { id: "small-diffs", label: "Kis diffek & Additív", shortHu: "Tilos a vak újraírás; meglévő tartalom védelme", constraintEn: "SMALL SURGICAL DIFFS: Never blindly rewrite working modules or delete existing domain logic; apply minimal, additive, reviewable edits." },
  { id: "strict-clean-code", label: "0 any & Max 300 sor", shortHu: "Strict TS, <=300 sor/fájl, Atomic Design", constraintEn: "CLEAN CODE & MODULARITY: Strictly 0 'any' types, full file outputs without '// ...' truncation, and max 300 lines per component/module (Atomic Design).", qaGateEn: "Verify every created or modified file is strictly under 300 lines." },
  { id: "owasp-aisvs", label: "OWASP ASVS + AISVS 2026", shortHu: "<untrusted_data> izoláció, Zod, RBAC, rate-limit", constraintEn: "OWASP ASVS & AISVS 2026 SECURITY: Validate all inputs twice (Client + Server Action) with Zod, isolate untrusted user/external text inside <untrusted_data> tags, enforce server-side RBAC + IP rate limiting, and never expose secrets." },
  { id: "zero-fixed-price", label: "Zéró Fix Ár Szabály", shortHu: "Tilos fix Ft/EUR/USD ár publikus sémában/UI-ban", constraintEn: "ZERO FIXED PRICE POLICY: Never output hardcoded currency amounts (Ft, HUF, EUR, USD) or JSON-LD priceRange on public surfaces; always use custom quote CTAs." },
  { id: "mermaid-diagrams", label: "Kötelező Mermaid Diagram", shortHu: "C4 / szekvencia / ERD érvényes Mermaid blokkban", constraintEn: "MERMAID ARCHITECTURE DIAGRAMS: Include valid, quoted-label Mermaid diagrams (flowchart TD, sequenceDiagram, or erDiagram) for system and data flows." },
  { id: "ssot-docs-sync", label: "SSOT Dokumentáció Szinkron", shortHu: "_docs/ARCHITECTURE.md + CHANGELOG.md frissítés", constraintEn: "SSOT DOCUMENTATION SYNC: Update _docs/ARCHITECTURE.md (component/route registry) and _docs/CHANGELOG.md upon completion." },
  { id: "terminal-qa-gate", label: "Kötelező Terminál QA Gate", shortHu: "tsc + eslint + jest + contrast + build = 0 hiba", constraintEn: "MANDATORY TERMINAL QA GATE: All changes must pass TypeScript, ESLint (--max-warnings 0), Jest unit tests, contrast audit, and production build with 0 errors.", qaGateEn: "npx tsc --noEmit && npm run lint -- --max-warnings 0 && npx jest --no-coverage && node scripts/audit-contrast.js && npm run build" },
  { id: "rollback-plan", label: "Rollback & Migrációs Terv", shortHu: "Minden DB/route módosításhoz visszaállítási terv", constraintEn: "ROLLBACK & BLAST-RADIUS PLAN: Document backward compatibility, feature-flag or revert steps, and zero-downtime migration safeguards." },
];

export const ARCH_OUTPUT_FORMATS: readonly ArchOutputFormatOption[] = [
  { id: "xml-agent-prompt", label: "XML Agent Prompt", formatEn: "Structured XML-tagged agent prompt (<role>, <context>, <objective>, <constraints>, <workflow>, <qa_gate>) ready to paste into Claude Code or autonomous coding agents." },
  { id: "agents-md-spec", label: "AGENTS.md / CLAUDE.md Spec", formatEn: "Production AGENTS.md / CLAUDE.md repository operating specification with project rules, architecture boundaries, anti-patterns, and verification commands." },
  { id: "mermaid-c4-adr", label: "Mermaid C4 + ADR Blueprint", formatEn: "System Architecture Blueprint containing Mermaid C4/Sequence/ERD diagrams, Trade-off Matrix, formal ADR entry, and implementation checklist." },
  { id: "small-batch-sprint", label: "Kis Batch-es Sprint Utasítás", formatEn: "3-Batch Engineering Sprint Execution Plan (BATCH 1: Data & Contracts, BATCH 2: Modular UI/Routes <300 lines, BATCH 3: Terminal QA Gate & Docs)." },
  { id: "technical-discovery", label: "Technical Discovery Kérdőív", formatEn: "Prioritized Technical Discovery & Risk Assessment questionnaire (architecture, security, data, integrations, NFRs) + recommended target blueprint." },
];

export const ARCH_RIGOR_LEVELS: readonly ArchRigorLevelOption[] = [
  {
    id: "mvp-prototype",
    label: "MVP / Gyors Prototípus",
    badge: "MVP SPEED",
    evidenceEn: ["Prioritize fastest validated vertical slice while keeping strict TypeScript and clean modular boundaries."],
    qaCommands: ["npx tsc --noEmit", "npm run lint"],
  },
  {
    id: "production-webdude",
    label: "Produkciós Standard (WebDude)",
    badge: "PROD SSOT",
    evidenceEn: [
      "Enforce Dual Theme (Light default + Dark), Kék-Lila v7.0 palette (0% gold/amber), <300 lines/file, WCAG AA, and deterministic tests.",
      "Base every architectural claim on verified repository files and official framework documentation.",
    ],
    qaCommands: ["npx tsc --noEmit", "npm run lint -- --max-warnings 0", "npx jest --no-coverage", "node scripts/audit-contrast.js", "npm run build"],
  },
  {
    id: "enterprise-critical",
    label: "Enterprise / Mission-Critical Audit",
    badge: "ZERO-TRUST",
    evidenceEn: [
      "Apply Zero-Trust security review (OWASP ASVS v5 + OWASP AISVS 2026), failure-mode analysis, idempotency proof, and explicit rollback runbook.",
      "Flag any unverified external assumption or missing SLA/SLO constraint before approving production deployment.",
    ],
    qaCommands: ["npx tsc --noEmit", "npm run lint -- --max-warnings 0", "npx jest --no-coverage", "node scripts/audit-contrast.js", "npm run build", "npx playwright test"],
  },
];

export const WEBDUDE_DEFAULT_GUARDRAILS: ArchGuardrailId[] = [
  "small-diffs",
  "strict-clean-code",
  "owasp-aisvs",
  "zero-fixed-price",
  "mermaid-diagrams",
  "ssot-docs-sync",
  "terminal-qa-gate",
];
