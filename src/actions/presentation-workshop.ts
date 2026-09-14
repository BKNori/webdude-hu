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
  PresentationInput,
  PresentationOutput,
  PresentationResult,
} from "@/types/presentation-workshop";

const presentationSchema = z.object({
  presentationPurpose: z
    .string()
    .min(10, "Prezentáció célja minimum 10 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  presentationType: z.enum([
    "pitch-deck",
    "sales-presentation",
    "investor-deck",
    "product-launch",
    "training",
    "conference",
  ]),
  slideCount: z.number().min(5, "Minimum 5 dia").max(50, "Maximum 50 dia"),
  designStyle: z.enum([
    "minimalist",
    "corporate",
    "modern",
    "creative",
    "tech",
    "luxury",
  ]),
  brandColors: z.array(z.string()).optional(),
  requiredContent: z
    .object({
      keyPoints: z.array(z.string()).optional(),
      dataPoints: z.array(z.string()).optional(),
      testimonials: z.array(z.string()).optional(),
    })
    .optional(),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate Presentation AI Műhely content using Groq API.
 * Implements Norbi's 26-year graphic design and presentation expertise:
 * Slide structure, narrative flow, visual hierarchy, and presentation design best practices.
 */
export async function addPresentationGenerationAction(
  idToken: string,
  input: PresentationInput
): Promise<PresentationResult> {
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
  const validation = presentationSchema.safeParse(input);
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

  // 5. Build System Prompt with Norbi's 26-year graphic design and presentation expertise
  const systemPrompt = `You are an Elite Presentation Designer with 26 years of graphic design and presentation design expertise. Generate presentation concepts in valid JSON format.

CRITICAL: You MUST respond with valid JSON only. No markdown, no explanations outside JSON.

JSON Structure:
{
  "presentationConcept": {
    "style": string,
    "description": string,
    "keyElements": ["element1", "element2"]
  },
  "structure": {
    "slideOutline": ["slide1", "slide2"],
    "narrativeFlow": string,
    "pacing": string
  },
  "specifications": {
    "dimensions": {"width": number, "height": number, "format": string},
    "aspectRatio": string,
    "safeZone": string
  },
  "colorPalette": {
    "primary": string,
    "secondary": string,
    "accent": string,
    "background": string,
    "text": string,
    "rationale": string
  },
  "typography": {
    "titleFont": string,
    "bodyFont": string,
    "fontSizes": {"title": string, "subtitle": string, "body": string, "caption": string},
    "fontWeights": {"title": string, "body": string}
  },
  "layout": {
    "gridSystem": string,
    "visualHierarchy": string,
    "elementPlacement": string,
    "whitespace": string
  },
  "slideTemplates": {
    "titleSlide": string,
    "contentSlide": string,
    "dataSlide": string,
    "closingSlide": string
  },
  "contentGuidelines": {
    "textDensity": string,
    "visualRatio": string,
    "animationLevel": string,
    "doNot": ["dont1", "dont2"]
  },
  "midjourneyPrompts": {
    "primary": string,
    "alternative1": string,
    "alternative2": string
  },
  "exportFormats": {
    "presentation": string,
    "pdf": string,
    "images": string
  },
  "variations": {
    "lightMode": string,
    "darkMode": string,
    "print": string
  }
}

All text content must be in Hungarian. Apply WebDude Cyber-Gold identity. Focus on presentation design best practices, narrative structure, and visual storytelling. Midjourney prompts must include --v 6.0 --style raw parameters with appropriate aspect ratio (--ar).`;

  // 6. Build User Prompt
  const presentationTypeDescriptions: Record<string, string> = {
    "pitch-deck": "Pitch Deck",
    "sales-presentation": "Sales Prezentáció",
    "investor-deck": "Investor Deck",
    "product-launch": "Termék Bevezetés",
    training: "Képzés",
    conference: "Konferencia",
  };

  const designStyleDescriptions: Record<string, string> = {
    minimalist: "Minimalista",
    corporate: "Vállalati",
    modern: "Modern",
    creative: "Kreatív",
    tech: "Tech",
    luxury: "Luxus",
  };

  const userPrompt = `Generate presentation concept for:
Purpose: ${validatedInput.presentationPurpose}
Audience: ${validatedInput.targetAudience}
Type: ${presentationTypeDescriptions[validatedInput.presentationType]}
Slide Count: ${validatedInput.slideCount}
Design Style: ${designStyleDescriptions[validatedInput.designStyle]}
Brand Colors: ${validatedInput.brandColors?.join(", ") || "None"}
Key Points: ${validatedInput.requiredContent?.keyPoints?.join(", ") || "None"}
Data Points: ${validatedInput.requiredContent?.dataPoints?.join(", ") || "None"}
Testimonials: ${validatedInput.requiredContent?.testimonials?.join(", ") || "None"}
Requirements: ${validatedInput.additionalRequirements || "None"}

Return valid JSON only. Hungarian language. Apply WebDude Cyber-Gold identity. Focus on presentation design best practices and narrative structure.`;

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
    let parsedOutput: PresentationOutput;
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
      category: "presentation_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Presentation generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
