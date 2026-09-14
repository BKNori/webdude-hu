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
  CipWorkshopInput,
  CipWorkshopOutput,
  CipWorkshopResult,
} from "@/types/cip-workshop";

const cipWorkshopSchema = z.object({
  companyName: z.string().min(2, "Cégnév minimum 2 karakter"),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  brandPersonality: z.string().min(10, "Márka személyiség minimum 10 karakter"),
  cipElement: z.enum([
    "business-card",
    "letterhead",
    "brand-guidelines",
    "envelope",
    "folder",
    "complete-package",
  ]),
  designStyle: z.enum([
    "minimalist",
    "corporate",
    "modern",
    "classic",
    "tech",
    "creative",
    "luxury",
  ]),
  brandColors: z.array(z.string()).optional(),
  requiredElements: z
    .object({
      logo: z.string().optional(),
      tagline: z.string().optional(),
      contactInfo: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate Corporate Identity Program (CIP) AI Műhely content using Groq API.
 * Implements Norbi's 26-year graphic design and corporate identity expertise:
 * Print-ready specifications, CMYK color values, typography hierarchy, and brand guidelines.
 */
export async function addCipGenerationAction(
  idToken: string,
  input: CipWorkshopInput
): Promise<CipWorkshopResult> {
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
  const validation = cipWorkshopSchema.safeParse(input);
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

  // 5. Build System Prompt with Norbi's 26-year graphic design and corporate identity expertise
  const systemPrompt = `You are an Elite Corporate Identity Designer with 26 years of graphic design and brand identity expertise. Generate corporate identity concepts in valid JSON format.

CRITICAL: You MUST respond with valid JSON only. No markdown, no explanations outside JSON.

JSON Structure:
{
  "brandIdentity": {
    "style": string,
    "description": string,
    "keyElements": ["element1", "element2"]
  },
  "specifications": {
    "dimensions": {"width": number, "height": number, "format": string},
    "bleed": string,
    "safeZone": string,
    "printSpecs": string
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
    "logoFont": string,
    "bodyFont": string,
    "fontSizes": {"logo": string, "headline": string, "body": string, "caption": string},
    "fontWeights": {"logo": string, "body": string}
  },
  "layout": {
    "gridSystem": string,
    "visualHierarchy": string,
    "elementPlacement": string,
    "whitespace": string
  },
  "businessCard": {
    "frontLayout": string,
    "backLayout": string,
    "contactPlacement": string,
    "logoPosition": string
  },
  "letterhead": {
    "headerLayout": string,
    "footerLayout": string,
    "bodyLayout": string,
    "logoPosition": string
  },
  "brandGuidelines": {
    "logoUsage": string,
    "colorUsage": string,
    "typographyUsage": string,
    "doNot": ["dont1", "dont2"]
  },
  "midjourneyPrompts": {
    "primary": string,
    "alternative1": string,
    "alternative2": string
  },
  "exportFormats": {
    "print": string,
    "web": string,
    "vector": string
  },
  "variations": {
    "lightMode": string,
    "darkMode": string,
    "grayscale": string
  }
}

All text content must be in Hungarian. Apply WebDude Cyber-Gold identity. Focus on print-ready specifications (CMYK, bleed, safe zone) and professional corporate identity standards. Midjourney prompts must include --v 6.0 --style raw parameters with appropriate aspect ratio (--ar).`;

  // 6. Build User Prompt
  const cipElementDescriptions: Record<string, string> = {
    "business-card": "Névjegykártya",
    letterhead: "Levélpapír",
    "brand-guidelines": "Arculati Kézikönyv",
    envelope: "Boríték",
    folder: "Dosszié",
    "complete-package": "Teljes CIP Csomag",
  };

  const designStyleDescriptions: Record<string, string> = {
    minimalist: "Minimalista",
    corporate: "Vállalati",
    modern: "Modern",
    classic: "Klasszikus",
    tech: "Tech",
    creative: "Kreatív",
    luxury: "Luxus",
  };

  const userPrompt = `Generate corporate identity concept for:
Company: ${validatedInput.companyName}
Industry: ${validatedInput.industry}
Audience: ${validatedInput.targetAudience}
Brand Personality: ${validatedInput.brandPersonality}
CIP Element: ${cipElementDescriptions[validatedInput.cipElement]}
Design Style: ${designStyleDescriptions[validatedInput.designStyle]}
Brand Colors: ${validatedInput.brandColors?.join(", ") || "None"}
Required Elements: ${JSON.stringify(validatedInput.requiredElements)}
Requirements: ${validatedInput.additionalRequirements || "None"}

Return valid JSON only. Hungarian language. Apply WebDude Cyber-Gold identity. Focus on professional corporate identity standards and print-ready specifications.`;

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
    let parsedOutput: CipWorkshopOutput;
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
      category: "cip_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("CIP generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
