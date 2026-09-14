"use server";

import { db } from "@/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { LighthouseMetrics, AuditResponse } from "@/types/lighthouse";

export async function runLighthouseAuditAction(
  url: string,
  clientId: string
): Promise<AuditResponse> {
  // 1. Input validáció
  if (!url || !url.startsWith("http")) {
    return {
      success: false,
      error: "Kérlek, érvényes, teljes URL-t adj meg (pl. https://pelda.hu)!",
    };
  }

  const apiKey = process.env.PAGESPEED_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "A Google PageSpeed API kulcs nincs beállítva a szerveren!",
    };
  }

  try {
    // 2. Google PageSpeed Insights API meghívása Desktop stratégiával
    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=desktop&key=${apiKey}`;

    // 1 órás Cache a visszaélések ellen (Anti-Drain Policy)
    const response = await fetch(psiUrl, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error(`A PageSpeed API hibát jelzett: ${response.statusText}`);
    }

    const json = (await response.json()) as {
      lighthouseResult?: {
        categories?: {
          performance?: { score?: number };
          accessibility?: { score?: number };
          "best-practices"?: { score?: number };
          seo?: { score?: number };
        };
      };
    };
    const categories = json.lighthouseResult?.categories;

    if (!categories) {
      throw new Error("Sikertelen Lighthouse adatextrakció.");
    }

    // Adatok normalizálása 0-100-as skálára
    const metrics: LighthouseMetrics = {
      url,
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round(
        (categories["best-practices"]?.score || 0) * 100
      ),
      seo: Math.round((categories.seo?.score || 0) * 100),
    };

    // 3. Mentés az ai_generations Firestore kollekcióba
    if (!db) {
      return { success: true, data: metrics };
    }

    await addDoc(collection(db, "ai_generations"), {
      clientId,
      toolId: "lighthouse_audit",
      toolName: "Lighthouse Weboldal Audit",
      inputValues: JSON.stringify({ url }),
      outputText: JSON.stringify(metrics),
      createdAt: Timestamp.now(),
    });

    return { success: true, data: metrics };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Váratlan hiba történt az audit futtatása során.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
