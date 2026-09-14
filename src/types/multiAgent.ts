export type AgentType =
  | "persona-simulator"
  | "copywriter"
  | "creative-director"
  | "programmer"
  | "seo-optimizer"
  | "auditor";

export interface AgentOutput {
  agent: AgentType;
  status: "success" | "error";
  data: unknown;
  executionTimeMs: number;
  tokensUsed: number;
  errorMessage?: string;
}

export interface MultiAgentResult {
  outputs: AgentOutput[];
  finalResult: unknown;
  totalExecutionTimeMs: number;
  totalTokensUsed: number;
  estimatedCostUsd: number;
}

export interface MultiAgentInput {
  workflowId: string;
  params: Record<string, unknown>;
  userId: string;
}

export interface PersonaSimulatorInput {
  industry: string;
  companySize: string;
  targetAudience: string;
  goals: string[];
}

export interface CopywriterInput {
  persona: PersonaSimulatorInput;
  contentType: "landing-page" | "email" | "social-media" | "blog";
  tone: "professional" | "casual" | "technical";
  keywords: string[];
}

export interface CreativeDirectorInput {
  persona: PersonaSimulatorInput;
  brandGuidelines?: string;
  colorPalette?: string[];
  style: "minimalist" | "bold" | "corporate" | "creative";
}

export interface ProgrammerInput {
  persona: PersonaSimulatorInput;
  creative: CreativeDirectorInput;
  copywriter: CopywriterInput;
  seo: unknown;
  techStack: string[];
  requirements: string[];
}

export interface SeoOptimizerInput {
  persona: PersonaSimulatorInput;
  copywriter: CopywriterInput;
  targetKeywords: string[];
  location?: string;
}

export interface AuditorInput {
  programmer: unknown;
  seo: unknown;
  copywriter: unknown;
  creative: unknown;
  persona: PersonaSimulatorInput;
  validationRules: string[];
}
