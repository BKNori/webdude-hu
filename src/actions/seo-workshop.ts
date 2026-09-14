"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { verifyUserToken } from "./portal";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import type {
  SeoAuditInput,
  SeoAuditOutput,
  SeoAuditResult,
} from "@/types/seo-workshop";

const seoAuditSchema = z.object({
  url: z.string().url("Érvénytelen URL formátum"),
  targetKeywords: z.string().min(3, "Kulcsszavak minimum 3 karakter"),
  industry: z.enum([
    "ecommerce",
    "saas",
    "local-business",
    "content",
    "portfolio",
    "blog",
    "other",
  ]),
  targetAudience: z.string().min(5, "Célközönség minimum 5 karakter"),
  primaryGoal: z.enum([
    "organic-traffic",
    "conversions",
    "brand-awareness",
    "local-seo",
    "aee-optimization",
  ]),
  competitors: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate SEO Audit AI Műhely content using Groq API.
 * Implements Norbi's 16+ years CMS and SEO expertise with focus on AEO (Answer Engine Optimization)
 * and Schema.org structured data optimization for AI search engines (ChatGPT, Perplexity, Gemini).
 */
export async function addSeoAuditAction(
  idToken: string,
  input: SeoAuditInput
): Promise<SeoAuditResult> {
  // 1. Rate Limiting Check (max 10 audits per hour per client IP)
  const headersList = await headers();
  const req = { headers: headersList } as unknown as Request;
  const identifier = getClientIdentifier(req);
  const rateLimitResult = checkRateLimit(identifier, 10, 3600000); // 10 requests per hour

  if (!rateLimitResult.success) {
    return {
      success: false,
      error:
        "Túl sok audit kísérlet. Kérlek, várj egy órát az újabb audit előtt!",
    };
  }

  // 2. Auth Verification
  const user = await verifyUserToken(idToken);
  if (!user) {
    return {
      success: false,
      error: "Jogosulatlan hozzáférés. Kérlek, jelentkezz be újra!",
    };
  }

  // 3. Schema Validation
  const validation = seoAuditSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: "Validációs hiba történt. Ellenőrizd a beviteli mezőket!",
      details: validation.error.flatten(),
    };
  }

  const validatedInput = validation.data;

  // 4. API Key Verification
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "Az AI szolgáltatás átmenetileg nem elérhető (hiányzó API kulcs).",
    };
  }

  // 5. Build System Prompt with Norbi's 16+ years CMS and SEO expertise
  const systemPrompt = `You are an Elite SEO Specialist with 16+ years of experience. Generate a comprehensive SEO audit in valid JSON format.

CRITICAL: You MUST respond with valid JSON only. No markdown, no explanations outside JSON.

JSON Structure:
{
  "executiveSummary": {
    "overallScore": number,
    "criticalIssues": number,
    "warnings": number,
    "opportunities": number,
    "priorityActions": ["action1", "action2", "action3"]
  },
  "technicalSEO": {
    "performance": {
      "lighthouseScore": number,
      "lcp": string,
      "fid": string,
      "cls": string,
      "recommendations": ["rec1", "rec2"]
    },
    "crawlability": {
      "robotsTxt": string,
      "sitemap": string,
      "canonicalTags": string,
      "recommendations": ["rec1", "rec2"]
    },
    "mobileOptimization": {
      "responsiveDesign": string,
      "mobileSpeed": string,
      "recommendations": ["rec1", "rec2"]
    }
  },
  "contentAnalysis": {
    "keywordDensity": {
      "primary": string,
      "secondary": ["kw1", "kw2"],
      "longTail": ["kw1", "kw2"]
    },
    "contentGaps": ["gap1", "gap2"],
    "contentQuality": {
      "readability": string,
      "structure": string,
      "recommendations": ["rec1", "rec2"]
    }
  },
  "aEOOptimization": {
    "entityBasedSeo": {
      "entities": ["entity1", "entity2"],
      "schemaImplementation": string,
      "recommendations": ["rec1", "rec2"]
    },
    "answerEngineReadiness": {
      "featuredSnippets": string,
      "peopleAlsoAsk": string,
      "voiceSearch": string,
      "recommendations": ["rec1", "rec2"]
    },
    "structuredData": {
      "schemaTypes": ["schema1", "schema2"],
      "implementationStatus": string,
      "recommendations": ["rec1", "rec2"]
    }
  },
  "competitorAnalysis": {
    "topCompetitors": [
      {"name": string, "domain": string, "strengths": string, "weaknesses": string}
    ],
    "gapOpportunities": ["opportunity1", "opportunity2"],
    "strategicInsights": ["insight1", "insight2"]
  },
  "actionPlan": {
    "immediate": [
      {"task": string, "impact": "high/medium/low", "effort": "high/medium/low"}
    ],
    "shortTerm": [
      {"task": string, "impact": "high/medium/low", "effort": "high/medium/low"}
    ],
    "longTerm": [
      {"task": string, "impact": "high/medium/low", "effort": "high/medium/low"}
    ]
  }
}

All text content must be in Hungarian. Target 95+ Lighthouse score. Focus on AEO (Answer Engine Optimization) and Schema.org structured data for AI search engines.`;

  // 6. Build User Prompt
  const industryDescriptions: Record<string, string> = {
    ecommerce: "E-kereskedelmi weboldal",
    saas: "SaaS szoftver szolgáltatás",
    "local-business": "Helyi vállalkozás",
    content: "Tartalom alapú weboldal",
    portfolio: "Portfólió weboldal",
    blog: "Blog weboldal",
    other: "Egyéb típusú weboldal",
  };

  const goalDescriptions: Record<string, string> = {
    "organic-traffic": "Organikus forgalom növelése",
    conversions: "Konverzió optimalizálás",
    "brand-awareness": "Márka tudatosság növelése",
    "local-seo": "Helyi SEO optimalizálás",
    "aee-optimization": "AI keresőmotor optimalizálás (AEO)",
  };

  const userPrompt = `Generate SEO audit for:
URL: ${validatedInput.url}
Keywords: ${validatedInput.targetKeywords}
Industry: ${industryDescriptions[validatedInput.industry]}
Audience: ${validatedInput.targetAudience}
Goal: ${goalDescriptions[validatedInput.primaryGoal]}
Competitors: ${validatedInput.competitors || "None"}
Requirements: ${validatedInput.additionalRequirements || "None"}

Return valid JSON only. Hungarian language. Target 95+ Lighthouse score. Focus on AEO and Schema.org.`;

  try {
    // 7. Call Groq API
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 4096,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: `Groq API hiba: ${errorData.error?.message || response.statusText}`,
      };
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return {
        success: false,
        error: "Nem sikerült generálni a tartalmat. Kérlek, próbáld újra!",
      };
    }

    // 8. Parse JSON output
    let parsedOutput: SeoAuditOutput;
    try {
      parsedOutput = JSON.parse(content);
    } catch {
      return {
        success: false,
        error:
          "Nem sikerült értelmezni a generált tartalmat. Kérlek, próbáld újra!",
      };
    }

    // 9. Save to Firestore
    const db = getFirestore();
    await addDoc(collection(db, "ai_generations"), {
      userId: user.uid,
      userEmail: user.email,
      category: "seo_audit_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("SEO audit generation error:", error);
    return {
      success: false,
      error: "Hiba történt az audit során. Kérlek, próbáld újra!",
    };
  }
}
