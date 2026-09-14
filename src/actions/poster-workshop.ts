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
  PosterWorkshopInput,
  PosterWorkshopOutput,
  PosterWorkshopResult,
} from "@/types/poster-workshop";

const posterWorkshopSchema = z.object({
  posterPurpose: z.string().min(10, "Poszter célja minimum 10 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  posterSize: z.enum(["A4", "A3", "A2", "A1", "custom"]),
  posterStyle: z.enum([
    "minimalist",
    "typographic",
    "photographic",
    "illustration",
    "abstract",
    "vintage",
    "modern-bold",
    "corporate",
  ]),
  printSpecs: z.enum(["standard", "premium", "large-format", "outdoor"]),
  brandColors: z.array(z.string()).optional(),
  requiredTexts: z
    .object({
      headline: z.string().optional(),
      subheadline: z.string().optional(),
      bodyText: z.string().optional(),
      cta: z.string().optional(),
      eventDetails: z.string().optional(),
    })
    .optional(),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate Poster AI Műhely content using Groq API.
 * Implements Norbi's 26-year graphic design and print expertise:
 * Print-ready specifications, CMYK color values, typography hierarchy, and bleed/safe zone guidelines.
 */
export async function addPosterGenerationAction(
  idToken: string,
  input: PosterWorkshopInput
): Promise<PosterWorkshopResult> {
  // 1. Rate Limiting Check (max 10 generations per hour per client IP)
  const headersList = await headers();
  const req = { headers: headersList } as unknown as Request;
  const identifier = getClientIdentifier(req);
  const rateLimitResult = checkRateLimit(identifier, 10, 3600000); // 10 requests per hour

  if (!rateLimitResult.success) {
    return {
      success: false,
      error:
        "Túl sok generálási kísérlet. Kérlek, várj egy órát az újabb generálás előtt!",
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
  const validation = posterWorkshopSchema.safeParse(input);
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

  // 5. Build System Prompt with Norbi's 26-year graphic design and print expertise
  const systemPrompt = `You are an Elite Print Designer with 26 years of poster design and print production expertise. Generate poster concepts in valid JSON format.

CRITICAL: You MUST respond with valid JSON only. No markdown, no explanations outside JSON.

JSON Structure:
{
  "posterConcept": {
    "style": string,
    "description": string,
    "keyElements": ["element1", "element2"]
  },
  "specifications": {
    "dimensions": {"width": number, "height": number, "format": string, "dpi": string},
    "bleed": string,
    "safeZone": string,
    "cropMarks": string
  },
  "colorPalette": {
    "primary": string,
    "secondary": string,
    "accent": string,
    "background": string,
    "text": string,
    "rationale": string,
    "cmykValues": {"primary": string, "secondary": string, "accent": string}
  },
  "typography": {
    "headlineFont": string,
    "bodyFont": string,
    "fontSizes": {"headline": string, "subheadline": string, "body": string, "caption": string},
    "fontWeights": {"headline": string, "body": string},
    "lineHeight": string,
    "kerning": string
  },
  "layout": {
    "gridSystem": string,
    "visualHierarchy": string,
    "elementPlacement": string,
    "whitespace": string
  },
  "copywriting": {
    "headline": string,
    "subheadline": string,
    "bodyText": string,
    "cta": string,
    "alternativeHeadlines": ["alt1", "alt2"],
    "alternativeCTAs": ["cta1", "cta2"]
  },
  "midjourneyPrompts": {
    "primary": string,
    "alternative1": string,
    "alternative2": string
  },
  "printGuidelines": {
    "colorMode": string,
    "resolution": string,
    "fileFormat": string,
    "colorProfile": string,
    "doNot": ["dont1", "dont2"]
  },
  "exportFormats": {
    "print": string,
    "web": string,
    "social": string
  },
  "variations": {
    "lightMode": string,
    "darkMode": string,
    "grayscale": string
  }
}

All text content must be in Hungarian. Apply WebDude Cyber-Gold identity. Focus on print-ready specifications (CMYK, bleed, safe zone, crop marks). Typography must be legible at poster viewing distance. Midjourney prompts must include --v 6.0 --style raw parameters with appropriate aspect ratio (--ar).`;

  // 6. Build User Prompt
  const sizeDescriptions: Record<string, string> = {
    A4: "A4 (210x297mm)",
    A3: "A3 (297x420mm)",
    A2: "A2 (420x594mm)",
    A1: "A1 (594x841mm)",
    custom: "Egyedi méret",
  };

  const styleDescriptions: Record<string, string> = {
    minimalist: "Minimalista",
    typographic: "Tipográfiai",
    photographic: "Fotográfiai",
    illustration: "Illusztrációs",
    abstract: "Absztrakt",
    vintage: "Vintage",
    "modern-bold": "Modern Félkövér",
    corporate: "Vállalati",
  };

  const printSpecsDescriptions: Record<string, string> = {
    standard: "Standard nyomtatás",
    premium: "Prémium nyomtatás",
    "large-format": "Nagyformátumú",
    outdoor: "Kültéri",
  };

  const userPrompt = `Generate poster concept for:
Purpose: ${validatedInput.posterPurpose}
Audience: ${validatedInput.targetAudience}
Size: ${sizeDescriptions[validatedInput.posterSize]}
Style: ${styleDescriptions[validatedInput.posterStyle]}
Print Specs: ${printSpecsDescriptions[validatedInput.printSpecs]}
Brand Colors: ${validatedInput.brandColors?.join(", ") || "None"}
Required Texts: ${JSON.stringify(validatedInput.requiredTexts)}
Requirements: ${validatedInput.additionalRequirements || "None"}

Return valid JSON only. Hungarian language. Apply WebDude Cyber-Gold identity. Focus on print-ready specifications and typography hierarchy.`;

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
          max_tokens: 2048,
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
    let parsedOutput: PosterWorkshopOutput;
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
      category: "poster_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Poster generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
