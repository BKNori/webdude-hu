"use server";

import {
  getProjectContextAction,
  getAIKnowledgeBaseAction,
} from "./context-engine";
import { tavilySearchAction } from "./tavily";

interface AIResponse {
  success: boolean;
  response?: string;
  error?: string;
}

/**
 * Generate AI Copilot response with context injection and Tavily web search
 */
export async function generateAICopilotResponseAction(
  workflowId: string,
  userMessage: string
): Promise<AIResponse> {
  try {
    // Get project context
    const contextRes = await getProjectContextAction(workflowId);
    if (!contextRes.success || !contextRes.context) {
      return {
        success: false,
        error: "Nem sikerült lekérni a projekt kontextust.",
      };
    }

    // Get AI knowledge base
    const knowledgeBaseRes = await getAIKnowledgeBaseAction();
    if (!knowledgeBaseRes.success || !knowledgeBaseRes.knowledgeBase) {
      return { success: false, error: "Nem sikerült lekérni a tudásbázist." };
    }

    // Check if user message requires fresh web data
    const searchKeywords = [
      "keress rá",
      "aktuális",
      "friss",
      "2026",
      "trend",
      "versenytárs",
      "weben",
      "google",
      "seo",
      "algoritmus",
      "hír",
      "ma",
    ];
    const needsSearch = searchKeywords.some((keyword) =>
      userMessage.toLowerCase().includes(keyword)
    );

    let liveWebContext = "";
    if (needsSearch) {
      try {
        liveWebContext = await tavilySearchAction(userMessage);
      } catch (error) {
        console.error("Tavily search error:", error);
        // Fallback: continue without web context
        liveWebContext = "";
      }
    }

    // Build system prompt with context injection
    const systemPrompt = `
Te Norbi (WebDude), egy 26 éves grafikai és 16 éves webfejlesztői tapasztalattal rendelkező Elite Lead Architect.
Szakterületed: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Firebase, AI automatizáció.

Kommunikációs stílusod:
- Tömör és lényegretörő
- Szakmailag elmélyült, de közérthető
- Professzionális és határozott
- Magyarul válaszolsz ékezetes betűkkel

Projekt kontextus:
- Projekt neve: ${contextRes.context.projectName}
- Projektfázis: ${contextRes.context.projectPhase}
- Ügyfél: ${contextRes.context.clientName}
- Iparág: ${contextRes.context.industry}
- Célközönség: ${contextRes.context.targetAudience}
- Workflow típus: ${contextRes.context.workflowType}
- Státusz: ${contextRes.context.status}

WebDude OS Tudásbázis:
${knowledgeBaseRes.knowledgeBase}

${liveWebContext ? `FONTOS! Itt vannak a legfrissebb valós idejű adatok a webről, használd fel őket a válaszodhoz:\n${liveWebContext}` : ""}

Feladat:
Válaszolj az ügyfél kérdésére a fenti kontextus alapján. Ha a kérdés a projekttel kapcsolatos,
használd a projektspecifikus információkat. Ha általános kérdés, használd a WebDude OS tudásbázist.
${liveWebContext ? "Ha valós idejű webes adatok állnak rendelkezésre, használd őket a válaszodhoz." : ""}
Proaktívan jelölj meg, ha szükséges egy konzultációt vagy további információt.
`;

    // Call Groq API for AI response
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", errorText);
      return {
        success: false,
        error: "Hiba történt az AI válasz generálásakor.",
      };
    }

    const groqData = await groqResponse.json();
    const aiResponse =
      groqData.choices[0]?.message?.content ||
      "Nem sikerült generálni választ.";

    return { success: true, response: aiResponse };
  } catch (error) {
    console.error("AI Copilot error:", error);
    return {
      success: false,
      error: "Hiba történt az AI válasz generálásakor.",
    };
  }
}
