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
  LogoGenerationInput,
  LogoGenerationOutput,
  LogoGenerationResult,
} from "@/types/logo-workshop";

const logoGenerationSchema = z.object({
  brandName: z.string().min(2, "Márkanév minimum 2 karakter"),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  targetAudience: z.string().min(5, "Célközönség minimum 5 karakter"),
  logoStyle: z.enum([
    "minimalist",
    "modern",
    "vintage",
    "geometric",
    "typographic",
    "emblem",
    "abstract",
  ]),
  colorPreference: z.enum([
    "monochrome",
    "duotone",
    "vibrant",
    "pastel",
    "dark",
  ]),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate Logo AI Műhely content using Groq API.
 * Implements Norbi's 26-year graphic design and branding expertise:
 * Professional logo design principles, color psychology, typography pairing,
 * and Midjourney v6 Master prompt generation.
 */
export async function addLogoGenerationAction(
  idToken: string,
  input: LogoGenerationInput
): Promise<LogoGenerationResult> {
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
  const validation = logoGenerationSchema.safeParse(input);
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

  // 5. Build System Prompt with Norbi's 26-year graphic design expertise
  const systemPrompt = `You are an Elite Brand Identity Designer with 26 years of professional logo design and branding expertise. Generate logo concepts in valid JSON format.

CRITICAL: You MUST respond with valid JSON only. No markdown, no explanations outside JSON.

JSON Structure:
{
  "logoConcept": {
    "style": string,
    "description": string,
    "keyElements": ["element1", "element2"],
    "tailwindLayout": "Valid Tailwind CSS v4 layout structure for logo display (e.g., 'flex items-center justify-center gap-3')"
  },
  "logoVariants": {
    "primary": string,
    "secondary": string,
    "iconOnly": string,
    "wordmark": string
  },
  "colorPalette": {
    "primary": string,
    "secondary": string,
    "accent": string,
    "neutral": string,
    "rationale": string,
    "psychology": "Color psychology explanation (e.g., 'Primary #00B5F1 evokes trust and professionalism for tech brands')",
    "alternativePalettes": [
      {"name": string, "colors": ["#hex1", "#hex2"], "useCase": string}
    ]
  },
  "typography": {
    "primaryFont": string,
    "secondaryFont": string,
    "fontPairing": string,
    "rationale": string
  },
  "iconography": {
    "iconType": string,
    "symbolism": string,
    "usage": string
  },
  "midjourneyPrompts": {
    "primary": string,
    "secondary": string,
    "iconOnly": string,
    "wordmark": string
  },
  "brandGuidelines": {
    "logoUsage": ["usage1", "usage2"],
    "spacing": string,
    "minimumSize": string,
    "clearSpace": string,
    "doNot": ["dont1", "dont2"]
  },
  "exportFormats": {
    "svg": string,
    "png": string,
    "pdf": string,
    "favicon": string
  },
  "variations": {
    "lightMode": string,
    "darkMode": string,
    "monochrome": string
  }
}

COLOR PSYCHOLOGY & HEX PALETTES:
- Trust/Professional: #00B5F1 (Primary Blue), #1E293B (Slate Dark), #F8FAFC (Light Gray)
- Innovation/Tech: #8B5CF6 (Purple), #3B82F6 (Blue), #06B6D4 (Cyan)
- Luxury/Premium: #00B5F1 (Gold), #0F172A (Deep Navy), #E2E8F0 (Silver)
- Growth/Nature: #10B981 (Emerald), #064E3B (Forest), #ECFDF5 (Mint)
- Energy/Action: #FF7A00 (Orange), #EF4444 (Red), #FCA5A5 (Coral)

MIDJOURNEY PARAMETERS (v6.0):
- Aspect Ratio: --ar 1:1 (square for logos)
- Version: --v 6.0
- Style: --style raw
- Quality: --quality 2
- Stylize: --stylize 250
- Focus: --no text (for icon-only), --text (for wordmarks)
- Detail: --detail high, --sharp focus

All text content must be in Hungarian. Apply WebDude Cyber-Gold identity principles. Focus on scalability, memorability, and versatility. Midjourney prompts MUST include: --v 6.0 --style raw --ar 1:1 --quality 2 --stylize 250 parameters.`;

  // 6. Build User Prompt
  const styleDescriptions: Record<string, string> = {
    minimalist: "Minimalista (tiszta, egyszerű, sok negatív tér)",
    modern: "Modern (friss, innovatív, geometrikus)",
    vintage: "Vintage (retro, klasszikus, nosztalgikus)",
    geometric: "Geometrikus (alakzat-alapú, strukturált)",
    typographic: "Tipográfiai (betű-alapú, kreatív betűkép)",
    emblem: "Embléma (jelvény-szerű, kompozit)",
    abstract: "Absztrakt (szimbolikus, művészi)",
  };

  const colorDescriptions: Record<string, string> = {
    monochrome: "Monokróm (egyszínű, fekete-fehér)",
    duotone: "Duotón (két szín, kontrasztos)",
    vibrant: "Élénk (telített színek, figyelemfelkeltő)",
    pastel: "Pasztell (lágy színek, barátságos)",
    dark: "Sötét (sötét háttér, prémium)",
  };

  const userPrompt = `Generate logo concept for:
Brand: ${validatedInput.brandName}
Industry: ${validatedInput.industry}
Audience: ${validatedInput.targetAudience}
Style: ${styleDescriptions[validatedInput.logoStyle]}
Colors: ${colorDescriptions[validatedInput.colorPreference]}
Requirements: ${validatedInput.additionalRequirements || "None"}

Return valid JSON only. Hungarian language. Apply WebDude Cyber-Gold identity. Focus on scalability and versatility.`;

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
    let parsedOutput: LogoGenerationOutput;
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
      category: "logo_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Logo generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
