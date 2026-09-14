"use server";

interface TavilySearchResponse {
  answer?: string;
  results: Array<{
    title: string;
    url: string;
    content: string;
    score: number;
  }>;
}

export async function tavilySearchAction(query: string): Promise<string> {
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
        query: query,
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

    let context = `[VALÓS IDEJŰ WEBES KERESÉSI EREDMÉNYEK A KÖVETKEZŐHÖZ: "${query}"]\n`;
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
