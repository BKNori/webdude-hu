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
  SocialMediaInput,
  SocialMediaOutput,
  SocialMediaResult,
} from "@/types/social-media-workshop";

const socialMediaSchema = z.object({
  campaignGoal: z.string().min(10, "Kampány célja minimum 10 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  platform: z.enum([
    "instagram",
    "facebook",
    "linkedin",
    "twitter",
    "tiktok",
    "youtube",
  ]),
  contentType: z.enum([
    "feed-post",
    "story",
    "cover",
    "carousel",
    "reels",
    "video-thumbnail",
  ]),
  visualStyle: z.enum([
    "minimalist",
    "bold-typography",
    "gradient",
    "photo-based",
    "geometric",
    "glassmorphism",
    "neon-cyberpunk",
    "corporate",
  ]),
  brandColors: z.array(z.string()).optional(),
  requiredTexts: z
    .object({
      headline: z.string().optional(),
      subheadline: z.string().optional(),
      caption: z.string().optional(),
      hashtags: z.string().optional(),
    })
    .optional(),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate Social Media AI Műhely content using Groq API.
 * Implements Norbi's 26-year graphic design and social media expertise:
 * Multi-platform specifications, platform-specific guidelines, and engagement-focused copywriting.
 */
export async function addSocialMediaGenerationAction(
  idToken: string,
  input: SocialMediaInput
): Promise<SocialMediaResult> {
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
  const validation = socialMediaSchema.safeParse(input);
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

  // 5. Build System Prompt with Norbi's 26-year graphic design and social media expertise
  const systemPrompt = `You are an Elite Social Media Designer with 26 years of graphic design and social media marketing expertise. Generate social media content concepts in valid JSON format.

CRITICAL: You MUST respond with valid JSON only. No markdown, no explanations outside JSON.

JSON Structure:
{
  "contentConcept": {
    "style": string,
    "description": string,
    "keyElements": ["element1", "element2"]
  },
  "specifications": {
    "dimensions": {"width": number, "height": number, "format": string},
    "aspectRatio": string,
    "safeZone": string,
    "textPlacement": string
  },
  "colorPalette": {
    "primary": string,
    "secondary": string,
    "accent": string,
    "background": string,
    "text": string,
    "rationale": string
  },
  "copywriting": {
    "headline": string,
    "subheadline": string,
    "caption": string,
    "hashtags": ["#tag1", "#tag2"],
    "alternativeHeadlines": ["alt1", "alt2"],
    "alternativeCaptions": ["alt1", "alt2"]
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
  "platformSpecific": {
    "instagram": string,
    "facebook": string,
    "linkedin": string,
    "twitter": string,
    "tiktok": string
  },
  "exportFormats": {
    "web": string,
    "social": string,
    "thumbnail": string
  },
  "variations": {
    "lightMode": string,
    "darkMode": string,
    "mobile": string
  }
}

All text content must be in Hungarian. Apply WebDude Cyber-Gold identity. Focus on platform-specific best practices and engagement optimization. Midjourney prompts must include --v 6.0 --style raw parameters with appropriate aspect ratio (--ar).`;

  // 6. Build User Prompt
  const platformDescriptions: Record<string, string> = {
    instagram: "Instagram",
    facebook: "Facebook",
    twitter: "Twitter/X",
    linkedin: "LinkedIn",
    tiktok: "TikTok",
    youtube: "YouTube",
  };

  const contentTypeDescriptions: Record<string, string> = {
    "feed-post": "Feed Post",
    story: "Story",
    cover: "Cover Kép",
    carousel: "Carousel",
    reels: "Reels",
    "video-thumbnail": "Video Thumbnail",
  };

  const visualStyleDescriptions: Record<string, string> = {
    minimalist: "Minimalista",
    "bold-typography": "Félkövér Tipográfia",
    gradient: "Gradiens",
    "photo-based": "Fotó-alapú",
    geometric: "Geometrikus",
    glassmorphism: "Glassmorphism",
    "neon-cyberpunk": "Neon Cyberpunk",
    corporate: "Vállalati",
  };

  const userPrompt = `Generate social media content concept for:
Campaign Goal: ${validatedInput.campaignGoal}
Audience: ${validatedInput.targetAudience}
Platform: ${platformDescriptions[validatedInput.platform]}
Content Type: ${contentTypeDescriptions[validatedInput.contentType]}
Visual Style: ${visualStyleDescriptions[validatedInput.visualStyle]}
Brand Colors: ${validatedInput.brandColors?.join(", ") || "None"}
Required Texts: ${JSON.stringify(validatedInput.requiredTexts)}
Requirements: ${validatedInput.additionalRequirements || "None"}

Return valid JSON only. Hungarian language. Apply WebDude Cyber-Gold identity. Focus on platform-specific best practices and engagement optimization.`;

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
    let parsedOutput: SocialMediaOutput;
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
      category: "social_media_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Social media generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
