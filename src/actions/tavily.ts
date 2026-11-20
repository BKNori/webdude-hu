"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { verifyUserToken } from "@/actions/portal";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

interface TavilySearchResponse {
  answer?: string;
  results: Array<{
    title: string;
    url: string;
    content: string;
    score: number;
  }>;
}

const tavilyQuerySchema = z
  .string()
  .trim()
  .min(3, "A keresési kifejezésnek legalább 3 karakterből kell állnia.")
  .max(500, "A keresési kifejezés maximum 500 karakter lehet.");

export async function tavilySearchAction(
  query: string,
  idToken?: string
): Promise<string> {
  const headersList = await headers();
  const authHeader = headersList.get("authorization");
  const token =
    idToken?.trim() ||
    (authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : "");

  if (!token) {
    throw new Error("401 Unauthorized: Hitelesítés szükséges a Tavily kereséshez.");
  }

  const user = await verifyUserToken(token);
  if (!user) {
    throw new Error("401 Unauthorized: Érvénytelen vagy lejárt hitelesítési token.");
  }

  const req = { headers: headersList } as unknown as Request;
  const identifier = getClientIdentifier(req);
  const rateLimitResult = checkRateLimit(
    `tavily:${user.uid}:${identifier}`,
    20,
    3600000
  );
  if (!rateLimitResult.success) {
    throw new Error("429 Too Many Requests: Túl sok webes keresési kérés.");
  }

  const validation = tavilyQuerySchema.safeParse(query);
  if (!validation.success) {
    throw new Error(
      `400 Bad Request: ${validation.error.issues[0]?.message || "Érvénytelen keresési kifejezés."}`
    );
  }
  const safeQuery = validation.data;

  try {
    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) {
      throw new Error("Hiányzik a TAVILY_API_KEY környezeti változó.");
    }

    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: safeQuery,
        search_depth: "advanced",
        include_answer: true,
        include_raw_content: false,
        max_results: 3,
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavily API hiba: ${response.statusText}`);
    }

    const data: TavilySearchResponse = await response.json();

    let context = `[VALÓS IDEJŰ WEBES KERESÉSI EREDMÉNYEK A KÖVETKEZŐHÖZ: "${safeQuery}"]\n`;
    if (data.answer) {
      context += `Tavily AI Összefoglaló: ${data.answer}\n\n`;
    }

    data.results.forEach((res, index) => {
      context += `Forrás ${index + 1}: ${res.title} (${res.url})\nTartalom: ${res.content}\n\n`;
    });

    return context;
  } catch (error) {
    console.error("Tavily keresési hiba:", error);
    return "";
  }
}
