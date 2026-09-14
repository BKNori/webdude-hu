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
  IconWorkshopInput,
  IconWorkshopOutput,
  IconWorkshopResult,
} from "@/types/icon-workshop";

const iconWorkshopSchema = z.object({
  iconPurpose: z.string().min(10, "Ikon célja minimum 10 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  iconType: z.enum([
    "single-icon",
    "icon-set",
    "symbol",
    "logo-icon",
    "app-icon",
    "favicon",
  ]),
  iconStyle: z.enum([
    "minimalist",
    "line-art",
    "filled",
    "outline",
    "geometric",
    "hand-drawn",
    "flat",
    "3d",
  ]),
  iconCount: z.number().min(1, "Minimum 1 ikon").max(50, "Maximum 50 ikon"),
  brandColors: z.array(z.string()).optional(),
  requiredConcepts: z.array(z.string()).optional(),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate Icon Design AI Műhely content using Groq API.
 * Implements Norbi's 26-year graphic design and icon design expertise:
 * SVG vector icons, icon sets (15 styles), and minimalist symbol design principles.
 */
export async function addIconGenerationAction(
  idToken: string,
  input: IconWorkshopInput
): Promise<IconWorkshopResult> {
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
  const validation = iconWorkshopSchema.safeParse(input);
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

  // 5. Build System Prompt with Norbi's 26-year graphic design and icon design expertise
  const systemPrompt = `You are an Elite Icon Designer with 26 years of graphic design and icon design expertise. Generate icon design concepts in valid JSON format.

CRITICAL: You MUST respond with valid JSON only. No markdown, no explanations outside JSON.

JSON Structure:
{
  "iconConcept": {
    "style": string,
    "description": string,
    "keyElements": ["element1", "element2"]
  },
  "specifications": {
    "dimensions": {"width": number, "height": number, "format": string},
    "viewBox": string,
    "strokeWidth": string,
    "cornerRadius": string
  },
  "colorPalette": {
    "primary": string,
    "secondary": string,
    "accent": string,
    "background": string,
    "rationale": string
  },
  "designPrinciples": {
    "simplicity": string,
    "scalability": string,
    "recognizability": string,
    "consistency": string
  },
  "iconSet": {
    "icons": [
      {"name": string, "description": string, "svgPath": string}
    ],
    "namingConvention": string,
    "gridSystem": string
  },
  "svgGuidelines": {
    "pathSimplification": string,
    "strokeOptimization": string,
    "colorUsage": string,
    "doNot": ["dont1", "dont2"]
  },
  "midjourneyPrompts": {
    "primary": string,
    "alternative1": string,
    "alternative2": string
  },
  "exportFormats": {
    "svg": string,
    "png": string,
    "iconFont": string
  },
  "variations": {
    "lightMode": string,
    "darkMode": string,
    "colored": string
  }
}

All text content must be in Hungarian. Apply WebDude Cyber-Gold identity. Focus on icon design best practices (simplicity, scalability, recognizability). SVG paths should be minimal and optimized. Midjourney prompts must include --v 6.0 --style raw parameters with appropriate aspect ratio (--ar).`;

  // 6. Build User Prompt
  const iconTypeDescriptions: Record<string, string> = {
    "single-icon": "Egyedi Ikon",
    "icon-set": "Ikon Szett",
    symbol: "Szimbólum",
    "logo-icon": "Logo Ikon",
    "app-icon": "App Ikon",
    favicon: "Favicon",
  };

  const iconStyleDescriptions: Record<string, string> = {
    minimalist: "Minimalista",
    "line-art": "Line Art",
    filled: "Kitöltött",
    outline: "Körvonal",
    geometric: "Geometrikus",
    "hand-drawn": "Kézzel Rajzolt",
    flat: "Flat",
    "3d": "3D",
  };

  const userPrompt = `Generate icon design concept for:
Purpose: ${validatedInput.iconPurpose}
Audience: ${validatedInput.targetAudience}
Type: ${iconTypeDescriptions[validatedInput.iconType]}
Style: ${iconStyleDescriptions[validatedInput.iconStyle]}
Icon Count: ${validatedInput.iconCount}
Brand Colors: ${validatedInput.brandColors?.join(", ") || "None"}
Concepts: ${validatedInput.requiredConcepts?.join(", ") || "None"}
Requirements: ${validatedInput.additionalRequirements || "None"}

Return valid JSON only. Hungarian language. Apply WebDude Cyber-Gold identity. Focus on icon design best practices and SVG optimization.`;

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
    let parsedOutput: IconWorkshopOutput;
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
      category: "icon_design_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Icon generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
