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
  SeasonalWorkshopInput,
  SeasonalWorkshopOutput,
  SeasonalWorkshopResult,
} from "@/types/seasonal-workshop";

const seasonalWorkshopSchema = z.object({
  season: z.enum([
    "christmas",
    "new-year",
    "valentine",
    "easter",
    "summer",
    "autumn",
    "halloween",
    "black-friday",
    "cyber-monday",
    "custom",
  ]),
  campaignType: z.enum([
    "social-media",
    "email",
    "landing-page",
    "banner",
    "story",
    "video-thumbnail",
  ]),
  targetAudience: z.string().min(5, "Célközönség minimum 5 karakter"),
  brandVoice: z.enum([
    "professional",
    "friendly",
    "luxury",
    "playful",
    "corporate",
    "minimalist",
  ]),
  primaryGoal: z.enum([
    "sales",
    "brand-awareness",
    "engagement",
    "traffic",
    "lead-generation",
  ]),
  customSeason: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate Seasonal Workshop AI Műhely content using Groq API.
 * Implements Norbi's 16+ years marketing and visual design expertise with focus on
 * seasonal campaign graphics, moods, and promotional copy generation.
 */
export async function addSeasonalWorkshopAction(
  idToken: string,
  input: SeasonalWorkshopInput
): Promise<SeasonalWorkshopResult> {
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
  const validation = seasonalWorkshopSchema.safeParse(input);
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

  // 5. Build System Prompt with Norbi's 16+ years marketing and visual design expertise
  const systemPrompt = `You are an Elite Marketing Strategist and Visual Designer with 16+ years of experience in seasonal campaign planning, visual design, and promotional copywriting. Your expertise includes:

**Seasonal Marketing:**
- Campaign strategy and timing optimization
- Seasonal mood and atmosphere creation
- Target audience engagement tactics
- Multi-channel campaign coordination
- Conversion-focused seasonal promotions

**Visual Design:**
- Seasonal color palettes and imagery
- Mood board creation
- Composition and layout optimization
- Cyber-Gold identity integration (90% dark/graphite background, max 2% Cyber-Gold focus)
- Midjourney prompt engineering for seasonal visuals

**Copywriting:**
- Seasonal headline generation
- Promotional body copy
- Call-to-action optimization
- Hashtag strategy
- Email subject line optimization

**Campaign Types:**
- Social media campaigns (Instagram, Facebook, LinkedIn, Twitter)
- Email marketing campaigns
- Landing page optimization
- Banner and display ads
- Story formats
- Video thumbnails

**Seasonal Themes:**
- Christmas, New Year, Valentine's Day, Easter
- Summer, Autumn, Halloween
- Black Friday, Cyber Monday
- Custom seasonal events

**WebDude Marketing Philosophy:**
- Hungarian language optimization
- Professional yet engaging tone
- Conversion-focused campaigns
- Cyber-Gold visual identity
- Mobile-first approach
- Seasonal urgency and FOMO tactics

**Output Requirements:**
Generate a comprehensive seasonal campaign plan with the following structure:

1. **Campaign Strategy:**
   - theme (core seasonal theme and concept)
   - mood (emotional atmosphere and feeling)
   - keyMessages (array of 3-5 key campaign messages)
   - timing (recommended campaign timeline)

2. **Visual Guidance:**
   - colorPalette (array of 4-6 hex codes or color names)
   - imagery (array of 3-5 image concepts)
   - style (visual style description)
   - composition (layout and composition recommendations)

3. **Copywriting:**
   - headlines (array of 5-7 headline variations)
   - bodyCopy (array of 3-5 body copy options)
   - callToActions (array of 3-5 CTA variations)
   - hashtags (array of 8-10 relevant hashtags)

4. **Social Media Content:**
   - instagram (Instagram-specific content with hashtags)
   - facebook (Facebook-specific content)
   - linkedin (LinkedIn professional content)
   - twitter (Twitter/X concise content)

5. **Email Campaign:**
   - subjectLines (array of 5-7 subject line options)
   - previewText (array of 3-5 preview text options)
   - bodyContent (email body content structure)

6. **Midjourney Prompts:**
   - heroImage (detailed Midjourney prompt for hero image)
   - productShot (Midjourney prompt for product photography)
   - lifestyle (Midjourney prompt for lifestyle imagery)

7. **Promotional Calendar:**
   - preLaunch (array of 3-5 pre-launch activities)
   - launch (array of 3-5 launch day activities)
   - postLaunch (array of 3-5 post-launch follow-ups)

Provide the output in structured JSON format with these exact keys. All content should be in Hungarian, tailored to the WebDude Cyber-Gold identity, and optimized for conversions. Apply seasonal urgency and engagement tactics.`;

  // 6. Build User Prompt
  const seasonDescriptions: Record<string, string> = {
    christmas: "Karácsony",
    "new-year": "Újév",
    valentine: "Valentin-nap",
    easter: "Húsvét",
    summer: "Nyár",
    autumn: "Ősz",
    halloween: "Halloween",
    "black-friday": "Black Friday",
    "cyber-monday": "Cyber Monday",
    custom: validatedInput.customSeason || "Egyedi szezon",
  };

  const campaignTypeDescriptions: Record<string, string> = {
    "social-media": "Social media kampány",
    email: "Email kampány",
    "landing-page": "Landing oldal",
    banner: "Banner hirdetés",
    story: "Story formátum",
    "video-thumbnail": "Video thumbnail",
  };

  const brandVoiceDescriptions: Record<string, string> = {
    professional: "Professzionális",
    friendly: "Barátságos",
    luxury: "Luxus",
    playful: "Játékos",
    corporate: "Vállalati",
    minimalist: "Minimalista",
  };

  const goalDescriptions: Record<string, string> = {
    sales: "Eladás növelés",
    "brand-awareness": "Márka tudatosság",
    engagement: "Elköteleződés növelés",
    traffic: "Forgalom növelés",
    "lead-generation": "Lead generálás",
  };

  const userPrompt = `Generate a comprehensive seasonal campaign plan for:
Season: ${seasonDescriptions[validatedInput.season]}
Campaign Type: ${campaignTypeDescriptions[validatedInput.campaignType]}
Target Audience: ${validatedInput.targetAudience}
Brand Voice: ${brandVoiceDescriptions[validatedInput.brandVoice]}
Primary Goal: ${goalDescriptions[validatedInput.primaryGoal]}
Additional Requirements: ${validatedInput.additionalRequirements || "None"}

Apply Norbi's 16+ years marketing and visual design expertise with focus on seasonal campaign graphics, moods, and promotional copy generation. Optimize for WebDude Cyber-Gold identity and Hungarian language.`;

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
    let parsedOutput: SeasonalWorkshopOutput;
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
      category: "seasonal_workshop_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Seasonal workshop generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
