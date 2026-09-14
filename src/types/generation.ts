export type GenerationStatus =
  "pending" | "processing" | "completed" | "failed";

export interface GenerationInput {
  workflowId: string;
  params: Record<string, unknown>;
}

export interface GenerationData {
  id: string;
  userId: string;
  workflowId: string;
  status: GenerationStatus;
  inputParams: Record<string, unknown>;
  outputResult?: unknown;
  errorMessage?: string;
  tokensUsed: number;
  estimatedCostUsd: number;
  executionTimeMs: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface CreateGenerationResponse {
  success: boolean;
  generationId?: string;
  error?: string;
}
