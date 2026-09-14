"use server";

import { adminDb } from "@/lib/firebase-admin";
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
  workflowId: string
): Promise<{ success: boolean; context?: ProjectContext; error?: string }> {
  try {
    const workflowDoc = await adminDb
      .collection("workflows")
      .doc(workflowId)
      .get();

    if (!workflowDoc.exists) {
      return { success: false, error: "Workflow nem található." };
    }

    const workflowData = workflowDoc.data();

    const context: ProjectContext = {
      workflowId: workflowId,
      projectName: workflowData?.projectName || "Ismeretlen projekt",
      projectPhase: workflowData?.phase || "in_progress",
      clientName: workflowData?.clientName || "Ügyfél",
      industry: workflowData?.industry || "Nincs megadva",
      targetAudience: workflowData?.targetAudience || "Nincs megadva",
      onboardingResponses: workflowData?.onboardingResponses || {},
      workflowType: workflowData?.workflowType || "general",
      status: workflowData?.status || "active",
      createdAt: workflowData?.createdAt || new Date().toISOString(),
    };

    return { success: true, context };
  } catch (error) {
    console.error("Context fetch error:", error);
    return {
      success: false,
      error: "Hiba történt a kontextus lekérése során.",
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
      "_DOCS",
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
