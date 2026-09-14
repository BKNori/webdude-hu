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
  DesignSystemInput,
  DesignSystemOutput,
  DesignSystemResult,
} from "@/types/design-system-workshop";

const designSystemSchema = z.object({
  systemPurpose: z.string().min(10, "Rendszer célja minimum 10 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  systemScope: z.enum([
    "full-system",
    "color-palette",
    "typography",
    "component-library",
    "spacing-grid",
  ]),
  designStyle: z.enum([
    "minimalist",
    "corporate",
    "modern",
    "creative",
    "tech",
    "luxury",
  ]),
  brandColors: z.array(z.string()).optional(),
  requiredComponents: z.array(z.string()).optional(),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate Design System AI Műhely content using Groq API.
 * Implements Norbi's 26-year graphic design and design system expertise:
 * Design tokens, component library, Tailwind CSS v4 integration, and Zod validation.
 */
export async function addDesignSystemGenerationAction(
  idToken: string,
  input: DesignSystemInput
): Promise<DesignSystemResult> {
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
  const validation = designSystemSchema.safeParse(input);
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

  // 5. Build System Prompt with Norbi's 26-year graphic design and design system expertise
  const systemPrompt = `You are an Elite Design System Architect with 26 years of graphic design and design system expertise. Generate design system concepts in valid JSON format.

CRITICAL: You MUST respond with valid JSON only. No markdown, no explanations outside JSON.

JSON Structure:
{
  "systemConcept": {
    "style": string,
    "description": string,
    "keyElements": ["element1", "element2"]
  },
  "designTokens": {
    "colors": {
      "primary": string,
      "secondary": string,
      "accent": string,
      "neutral": string,
      "success": string,
      "warning": string,
      "error": string
    },
    "spacing": {"xs": string, "sm": string, "md": string, "lg": string, "xl": string, "2xl": string},
    "typography": {
      "fontFamily": string,
      "fontSizes": {"xs": string, "sm": string, "base": string, "lg": string, "xl": string, "2xl": string, "3xl": string},
      "fontWeights": {"light": string, "normal": string, "medium": string, "semibold": string, "bold": string}
    },
    "borderRadius": {"sm": string, "md": string, "lg": string, "xl": string, "full": string},
    "shadows": {"sm": string, "md": string, "lg": string, "xl": string}
  },
  "tailwindConfig": {
    "themeExtension": string,
    "customUtilities": ["utility1", "utility2"],
    "pluginRecommendations": ["plugin1", "plugin2"]
  },
  "componentLibrary": {
    "components": [
      {"name": string, "description": string, "props": ["prop1", "prop2"], "variants": ["variant1", "variant2"]}
    ],
    "namingConvention": string,
    "fileStructure": string
  },
  "documentation": {
    "structure": string,
    "examples": ["example1", "example2"],
    "guidelines": ["guideline1", "guideline2"],
    "doNot": ["dont1", "dont2"]
  },
  "midjourneyPrompts": {
    "primary": string,
    "alternative1": string,
    "alternative2": string
  },
  "exportFormats": {
    "tailwindConfig": string,
    "cssVariables": string,
    "jsonTokens": string
  },
  "variations": {
    "lightMode": string,
    "darkMode": string,
    "customTheme": string
  }
}

All text content must be in Hungarian. Apply WebDude Cyber-Gold identity. Focus on design system best practices, Tailwind CSS v4 integration, and component library architecture. Midjourney prompts must include --v 6.0 --style raw parameters with appropriate aspect ratio (--ar).`;

  // 6. Build User Prompt
  const systemScopeDescriptions: Record<string, string> = {
    "full-system": "Teljes Rendszer",
    "color-palette": "Szín Paletta",
    typography: "Tipográfia",
    "component-library": "Komponens Könyvtár",
    "spacing-grid": "Spacing Grid",
  };

  const designStyleDescriptions: Record<string, string> = {
    minimalist: "Minimalista",
    corporate: "Vállalati",
    modern: "Modern",
    creative: "Kreatív",
    tech: "Tech",
    luxury: "Luxus",
  };

  const userPrompt = `Generate design system concept for:
Purpose: ${validatedInput.systemPurpose}
Audience: ${validatedInput.targetAudience}
Scope: ${systemScopeDescriptions[validatedInput.systemScope]}
Style: ${designStyleDescriptions[validatedInput.designStyle]}
Brand Colors: ${validatedInput.brandColors?.join(", ") || "None"}
Components: ${validatedInput.requiredComponents?.join(", ") || "None"}
Requirements: ${validatedInput.additionalRequirements || "None"}

Return valid JSON only. Hungarian language. Apply WebDude Cyber-Gold identity. Focus on design system best practices and Tailwind CSS v4 integration.`;

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
    let parsedOutput: DesignSystemOutput;
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
      category: "design_system_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Design system generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
