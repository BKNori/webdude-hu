// Helicone OpenTelemetry wrapper for LLM monitoring
// src/lib/helicone.ts

export interface HeliconeRequest {
  provider: "groq" | "anthropic" | "openai" | "gemini";
  model: string;
  messages: Array<{ role: string; content: string }>;
  maxTokens?: number;
  temperature?: number;
}

export interface HeliconeResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latencyMs: number;
}

export async function callLLMWithHelicone(
  request: HeliconeRequest
): Promise<HeliconeResponse> {
  const startTime = Date.now();
  const heliconeApiKey = process.env.HELICONE_API_KEY;

  let url = "";
  let headers: Record<string, string> = {};
  let body = {};

  // Base headers with Helicone
  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (heliconeApiKey) {
    baseHeaders["Helicone-Auth"] = `Bearer ${heliconeApiKey}`;
    baseHeaders["Helicone-User-Id"] = "webdude-system";
  }

  if (request.provider === "groq") {
    url = "https://api.groq.com/openai/v1/chat/completions";
    headers = {
      ...baseHeaders,
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    };
    body = {
      model: request.model,
      messages: request.messages,
      max_tokens: request.maxTokens || 2048,
      temperature: request.temperature || 0.7,
    };
  } else if (request.provider === "anthropic") {
    url = "https://api.anthropic.com/v1/messages";
    headers = {
      ...baseHeaders,
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    };
    body = {
      model: request.model,
      max_tokens: request.maxTokens || 2048,
      messages: request.messages,
    };
  } else if (request.provider === "openai") {
    url = "https://api.openai.com/v1/chat/completions";
    headers = {
      ...baseHeaders,
      Authorization: `Bearer ${process.env.OPENAI_API_KEY || ""}`,
    };
    body = {
      model: request.model,
      messages: request.messages,
      max_tokens: request.maxTokens || 2048,
      temperature: request.temperature || 0.7,
    };
  } else if (request.provider === "gemini") {
    url = `https://generativelanguage.googleapis.com/v1beta/models/${request.model}:generateContent?key=${process.env.GEMINI_API_KEY || ""}`;
    headers = baseHeaders;
    body = {
      contents: request.messages.map((m) => ({ parts: [{ text: m.content }] })),
      generationConfig: {
        temperature: request.temperature || 0.7,
        maxOutputTokens: request.maxTokens || 2048,
      },
    };
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`${request.provider} API hiba: ${response.status}`);
  }

  const data = await response.json();
  const latencyMs = Date.now() - startTime;

  let content = "";
  let promptTokens = 0;
  let completionTokens = 0;

  if (request.provider === "groq" || request.provider === "openai") {
    content = data.choices[0].message.content;
    promptTokens = data.usage?.prompt_tokens || 0;
    completionTokens = data.usage?.completion_tokens || 0;
  } else if (request.provider === "anthropic") {
    content = data.content[0].text;
    promptTokens = data.usage?.input_tokens || 0;
    completionTokens = data.usage?.output_tokens || 0;
  } else if (request.provider === "gemini") {
    content = data.candidates[0].content.parts[0].text;
    promptTokens = data.usageMetadata?.promptTokenCount || 0;
    completionTokens = data.usageMetadata?.candidatesTokenCount || 0;
  }

  return {
    content,
    usage: {
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens,
    },
    latencyMs,
  };
}
