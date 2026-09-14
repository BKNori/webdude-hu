"use server";

import {
  MultiAgentInput,
  MultiAgentResult,
  AgentOutput,
  AgentType,
} from "@/types/multiAgent";
import { callLLMWithHelicone } from "@/lib/helicone";

// Ágens végrehajtás wrapper Helicone monitoringgal
async function executeAgent(
  agentType: AgentType,
  prompt: string,
  provider: "groq" | "anthropic" | "openai" | "gemini",
  model: string
): Promise<AgentOutput> {
  try {
    const response = await callLLMWithHelicone({
      provider,
      model,
      messages: [{ role: "user", content: prompt }],
      maxTokens: 2048,
      temperature: 0.7,
    });

    return {
      agent: agentType,
      status: "success",
      data: response.content,
      executionTimeMs: response.latencyMs,
      tokensUsed: response.usage.totalTokens,
    };
  } catch (error) {
    return {
      agent: agentType,
      status: "error",
      data: null,
      executionTimeMs: 0,
      tokensUsed: 0,
      errorMessage: error instanceof Error ? error.message : "Ismeretlen hiba",
    };
  }
}

// 1. B2B Client Persona Simulator
async function executePersonaAgent(
  input: MultiAgentInput
): Promise<AgentOutput> {
  const prompt = `B2B ügyfél profil elemzés: ${JSON.stringify(input.params)}`;
  return executeAgent("persona-simulator", prompt, "gemini", "gemini-1.5-pro");
}

// 2. Copywriter Agent
async function executeCopywriterAgent(
  personaResult: AgentOutput
): Promise<AgentOutput> {
  const prompt = `B2B szövegírás profil alapján: ${JSON.stringify(personaResult.data)}`;
  return executeAgent(
    "copywriter",
    prompt,
    "anthropic",
    "claude-3-5-sonnet-20240620"
  );
}

// 3. Creative Director Agent
async function executeCreativeDirectorAgent(
  personaResult: AgentOutput
): Promise<AgentOutput> {
  const prompt = `Design irányelvek profil alapján: ${JSON.stringify(personaResult.data)}`;
  return executeAgent(
    "creative-director",
    prompt,
    "anthropic",
    "claude-3-5-sonnet-20240620"
  );
}

// 4. SEO Optimizer Agent
async function executeSeoOptimizerAgent(
  copywriterResult: AgentOutput
): Promise<AgentOutput> {
  const prompt = `SEO stratégia szöveg alapján: ${JSON.stringify(copywriterResult.data)}`;
  return executeAgent("seo-optimizer", prompt, "openai", "gpt-4o");
}

// 5. Programmer Agent
async function executeProgrammerAgent(
  creativeResult: AgentOutput,
  seoResult: AgentOutput
): Promise<AgentOutput> {
  const prompt = `Next.js kód generálás: ${JSON.stringify({ creative: creativeResult.data, seo: seoResult.data })}`;
  return executeAgent(
    "programmer",
    prompt,
    "anthropic",
    "claude-3-5-sonnet-20240620"
  );
}

// 6. Auditor Agent
async function executeAuditorAgent(
  programmerResult: AgentOutput,
  seoResult: AgentOutput
): Promise<AgentOutput> {
  const prompt = `Minőségellenőrzés: ${JSON.stringify({ programmer: programmerResult.data, seo: seoResult.data })}`;
  return executeAgent("auditor", prompt, "openai", "gpt-4o");
}

// Fő orchestration függvény
export async function executeMultiAgentWorkflow(
  input: MultiAgentInput
): Promise<MultiAgentResult> {
  const startTime = Date.now();

  const personaResult = await executePersonaAgent(input);
  const copywriterResult = await executeCopywriterAgent(personaResult);
  const creativeResult = await executeCreativeDirectorAgent(personaResult);
  const seoResult = await executeSeoOptimizerAgent(copywriterResult);
  const programmerResult = await executeProgrammerAgent(
    creativeResult,
    seoResult
  );
  const auditorResult = await executeAuditorAgent(programmerResult, seoResult);

  const totalExecutionTimeMs = Date.now() - startTime;
  const outputs = [
    personaResult,
    copywriterResult,
    creativeResult,
    seoResult,
    programmerResult,
    auditorResult,
  ];
  const totalTokensUsed = outputs.reduce((sum, o) => sum + o.tokensUsed, 0);
  const estimatedCostUsd = totalTokensUsed * 0.00001;

  return {
    outputs,
    finalResult: auditorResult.data,
    totalExecutionTimeMs,
    totalTokensUsed,
    estimatedCostUsd,
  };
}
