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
  BannerWorkshopInput,
  BannerWorkshopOutput,
  BannerWorkshopResult,
} from "@/types/banner-workshop";

const bannerWorkshopSchema = z.object({
  campaignGoal: z.string().min(10, "Kampány célja minimum 10 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  platform: z.enum([
    "facebook",
    "instagram",
    "twitter",
    "linkedin",
    "youtube",
    "google-ads",
    "web",
    "print",
  ]),
  bannerType: z.enum([
    "hero",
    "story",
    "cover",
    "sidebar",
    "display",
    "social-post",
  ]),
  artDirection: z.enum([
    "minimalist",
    "bold-typography",
    "gradient",
    "photo-based",
    "geometric",
    "glassmorphism",
    "neon-cyberpunk",
  ]),
  aspectRatio: z.enum(["16:9", "1:1", "9:16"]),
  brandColors: z.array(z.string()).optional(),
  requiredTexts: z
    .object({
      headline: z.string().optional(),
      subheadline: z.string().optional(),
      cta: z.string().optional(),
    })
    .optional(),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate Banner AI Műhely content using Groq API.
 * Implements Norbi's 26-year graphic design and conversion vision:
 * 90% dark/graphite background, maximum 2% Cyber-Gold focus, perfect typographic contrast.
 */
export async function addBannerGenerationAction(
  idToken: string,
  input: BannerWorkshopInput
): Promise<BannerWorkshopResult> {
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
  const validation = bannerWorkshopSchema.safeParse(input);
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
  const systemPrompt = `You are an Elite CRO Art Director with 26 years of banner design and conversion expertise. Generate banner concepts in valid JSON format.

CRITICAL: You MUST respond with valid JSON only. No markdown, no explanations outside JSON.

JSON Structure:
{
  "bannerConcept": {
    "style": string,
    "description": string,
    "keyElements": ["element1", "element2"],
    "tailwindLayout": "Valid Tailwind CSS v4 layout structure (e.g., 'flex flex-col items-center justify-center gap-4 p-8')"
  },
  "specifications": {
    "dimensions": {"width": number, "height": number, "format": string},
    "safeZone": string,
    "ctaPlacement": string,
    "aspectRatioParam": "--ar 16:9 or --ar 1:1 or --ar 9:16"
  },
  "colorPalette": {
    "primary": string,
    "secondary": string,
    "accent": string,
    "background": string,
    "text": string,
    "rationale": string,
    "psychology": "Color psychology explanation (e.g., 'Primary #00B5F1 evokes trust and professionalism')"
  },
  "copywriting": {
    "headline": string,
    "subheadline": string,
    "cta": string,
    "alternativeHeadlines": ["alt1", "alt2"],
    "alternativeCTAs": ["cta1", "cta2"]
  },
  "midjourneyPrompts": {
    "primary": string,
    "alternative1": string,
    "alternative2": string
  },
  "designGuidelines": {
    "spacing": string,
    "typography": string,
    "imagery": string,
    "doNot": ["dont1", "dont2"]
  },
  "exportFormats": {
    "web": string,
    "print": string,
    "social": string
  },
  "variations": {
    "lightMode": string,
    "darkMode": string,
    "mobile": string
  }
}

COLOR PSYCHOLOGY & HEX PALETTES:
- Trust/Professional: #00B5F1 (Primary Blue), #1E293B (Slate Dark), #F8FAFC (Light Gray)
- Conversion/Action: #FF7A00 (Accent Orange), #EF4444 (Urgency Red), #10B981 (Success Green)
- Luxury/Premium: #00B5F1 (Gold), #0F172A (Deep Navy), #E2E8F0 (Silver)
- Innovation/Tech: #8B5CF6 (Purple), #3B82F6 (Blue), #06B6D4 (Cyan)

MIDJOURNEY PARAMETERS (v6.0):
- Aspect Ratio: --ar 16:9 (landscape), --ar 1:1 (square), --ar 9:16 (portrait)
- Version: --v 6.0
- Style: --style raw
- Quality: --quality 2
- Stylize: --stylize 250
- Lighting: --volumetric, --cinematic, --golden-hour
- Focus: --depth of field, --macro, --wide-angle

All text content must be in Hungarian. Apply WebDude Cyber-Gold identity (90% dark background, max 2% gold focus). Focus on conversion optimization and visual hierarchy. Midjourney prompts MUST include: --v 6.0 --style raw --ar [aspect_ratio] --quality 2 --stylize 250 --volumetric lighting parameters.`;

  // 6. Build User Prompt
  const platformDescriptions: Record<string, string> = {
    facebook: "Facebook",
    instagram: "Instagram",
    twitter: "Twitter/X",
    linkedin: "LinkedIn",
    youtube: "YouTube",
    "google-ads": "Google Ads",
    web: "Weboldal",
    print: "Print",
  };

  const bannerTypeDescriptions: Record<string, string> = {
    hero: "Hero Banner",
    story: "Story",
    cover: "Cover Kép",
    sidebar: "Sidebar",
    display: "Display Hirdetés",
    "social-post": "Social Media Poszt",
  };

  const artDirectionDescriptions: Record<string, string> = {
    minimalist: "Minimalista",
    "bold-typography": "Félkövér Tipográfia",
    gradient: "Gradiens",
    "photo-based": "Fotó-alapú",
    geometric: "Geometrikus",
    glassmorphism: "Glassmorphism",
    "neon-cyberpunk": "Neon Cyberpunk",
  };

  const aspectRatioDescriptions: Record<string, string> = {
    "16:9": "16:9 (Facebook / Webshop Főoldali Banner)",
    "1:1": "1:1 (Instagram Feed / Négyzetes hirdetés)",
    "9:16": "9:16 (Story / TikTok / Reels)",
  };

  const userPrompt = `Generate banner concept for:
Campaign Goal: ${validatedInput.campaignGoal}
Audience: ${validatedInput.targetAudience}
Platform: ${platformDescriptions[validatedInput.platform]}
Banner Type: ${bannerTypeDescriptions[validatedInput.bannerType]}
Art Direction: ${artDirectionDescriptions[validatedInput.artDirection]}
Aspect Ratio: ${aspectRatioDescriptions[validatedInput.aspectRatio]}
Brand Colors: ${validatedInput.brandColors?.join(", ") || "None"}
Required Texts: ${JSON.stringify(validatedInput.requiredTexts)}
Requirements: ${validatedInput.additionalRequirements || "None"}

Return valid JSON only. Hungarian language. Apply WebDude Cyber-Gold identity. Focus on conversion and visual hierarchy.`;

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
    let parsedOutput: BannerWorkshopOutput;
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
      category: "banner_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Banner generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
