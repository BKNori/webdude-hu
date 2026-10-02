"use server";

import { readFileSync } from "fs";
import { join } from "path";

interface ProjectContext {
  workflowId: string;
  projectName: string;
  projectPhase: string;
  clientName: string;
  industry: string;
  targetAudience: string;
  onboardingResponses: Record<string, string>;
  workflowType: string;
  status: string;
  createdAt: string;
}

/**
 * Get project-specific context for AI Copilot
 */
export async function getProjectContextAction(
  workflowId: string,
  idToken?: string
): Promise<{ success: boolean; context?: ProjectContext; error?: string }> {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId) {
      return { success: false, error: "Hiányzó projekt konfiguráció." };
    }

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/workflows/${workflowId}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (idToken) {
      headers["Authorization"] = `Bearer ${idToken}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!res.ok) {
      if (res.status === 404) {
        return { success: false, error: "Workflow nem található." };
      }
      if (res.status === 401 || res.status === 403) {
        return {
          success: false,
          error: "Jogosulatlan hozzáférés a workflow-hoz.",
        };
      }
      return {
        success: false,
        error: `Nem sikerült lekérni a workflow-t (${res.status}).`,
      };
    }

    const doc = (await res.json()) as {
      fields: Record<string, { stringValue?: string; timestampValue?: string }>;
    };

    const fields = doc.fields;

    const context: ProjectContext = {
      workflowId: workflowId,
      projectName: fields.projectName?.stringValue || "Ismeretlen projekt",
      projectPhase: fields.phase?.stringValue || "in_progress",
      clientName: fields.clientName?.stringValue || "Ügyfél",
      industry: fields.industry?.stringValue || "Nincs megadva",
      targetAudience: fields.targetAudience?.stringValue || "Nincs megadva",
      onboardingResponses: {}, // Complex nested object would need special handling
      workflowType: fields.workflowType?.stringValue || "general",
      status: fields.status?.stringValue || "active",
      createdAt: fields.createdAt?.timestampValue || new Date().toISOString(),
    };

    return { success: true, context };
  } catch (error) {
    console.error("Context fetch error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a kontextus lekérése során.",
    };
  }
}

/**
 * Get AI Context Engine knowledge base for system prompt
 * Reads from WEBDUDE_OS_KNOWLEDGE_BASE.md file
 */
export async function getAIKnowledgeBaseAction(): Promise<{
  success: boolean;
  knowledgeBase?: string;
  error?: string;
}> {
  try {
    // Read the WEBDUDE_OS_KNOWLEDGE_BASE.md file
    const knowledgeBasePath = join(
      process.cwd(),
      "_docs",
      "WEBDUDE_OS_KNOWLEDGE_BASE.md"
    );
    const knowledgeBaseContent = readFileSync(knowledgeBasePath, "utf-8");

    return { success: true, knowledgeBase: knowledgeBaseContent };
  } catch (error) {
    console.error("Knowledge base fetch error:", error);
    return {
      success: false,
      error: "Hiba történt a tudásbázis lekérése során.",
    };
  }
}
