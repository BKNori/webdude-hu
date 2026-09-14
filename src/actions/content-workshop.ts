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
  ContentWorkshopInput,
  ContentWorkshopOutput,
  ContentWorkshopResult,
} from "@/types/content-workshop";

const contentWorkshopSchema = z.object({
  topic: z.string().min(5, "Téma minimum 5 karakter"),
  contentType: z.enum([
    "blog-post",
    "social-media",
    "landing-page",
    "email-campaign",
    "product-description",
    "case-study",
  ]),
  targetAudience: z.string().min(5, "Célközönség minimum 5 karakter"),
  tone: z.enum([
    "professional",
    "casual",
    "friendly",
    "authoritative",
    "inspiring",
    "humorous",
  ]),
  platform: z.enum([
    "website",
    "linkedin",
    "instagram",
    "facebook",
    "twitter",
    "email",
    "other",
  ]),
  keywords: z.string().min(3, "Kulcsszavak minimum 3 karakter"),
  callToAction: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate Content Workshop AI Műhely content using Groq API.
 * Implements Norbi's 16+ years content strategy and visual design expertise with focus on
 * structured content and visual design planning.
 */
export async function addContentWorkshopAction(
  idToken: string,
  input: ContentWorkshopInput
): Promise<ContentWorkshopResult> {
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
  const validation = contentWorkshopSchema.safeParse(input);
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

  // 5. Build System Prompt with Norbi's 16+ years content strategy and visual design expertise
  const systemPrompt = `You are an Elite Content Strategist and Visual Designer with 16+ years of experience in content marketing, copywriting, and visual design. Your expertise includes:

**Content Strategy:**
- Strategic content planning and editorial calendars
- Audience-centric content development
- Conversion-focused copywriting
- SEO-optimized content structure
- Multi-platform content adaptation

**Visual Design:**
- Visual hierarchy and layout principles
- Color theory and palette selection
- Typography and readability optimization
- Image selection and visual storytelling
- Cyber-Gold identity integration (90% dark/graphite background, max 2% Cyber-Gold focus)

**Content Types:**
- Blog posts and articles
- Social media content (LinkedIn, Instagram, Facebook, Twitter)
- Landing pages and product descriptions
- Email campaigns and newsletters
- Case studies and testimonials

**SEO & AEO:**
- Keyword research and integration
- Meta descriptions and title tags
- Heading structure (H1, H2, H3)
- Featured snippet optimization
- AI search engine readiness

**WebDude Content Philosophy:**
- Hungarian language optimization
- Professional yet accessible tone
- Conversion-focused CTAs
- Cyber-Gold visual identity
- Mobile-first content structure

**Output Requirements:**
Generate a comprehensive content plan with the following structure:

1. **Content Strategy:**
   - angle (unique perspective or approach)
   - hook (compelling opening statement)
   - valueProposition (unique value delivered)
   - keyMessages (array of 3-5 key messages)

2. **Content Structure:**
   - headline (compelling, SEO-friendly headline)
   - subheadlines (array of 3-5 subheadlines)
   - bodySections (array with heading, content, wordCount for each section)

3. **Visual Guidance:**
   - imageSuggestions (array of 3-5 image concepts)
   - colorPalette (array of 3-4 hex codes or color names)
   - layoutRecommendations (array of 3-5 layout suggestions)

4. **SEO Optimization:**
   - primaryKeyword (main target keyword)
   - secondaryKeywords (array of 3-5 secondary keywords)
   - metaDescription (150-160 character description)
   - headingStructure (array of H1, H2, H3 suggestions)

5. **Social Media Variations:**
   - linkedin (professional, business-focused version)
   - instagram (visual, engaging version with hashtags)
   - twitter (concise, impactful version)

6. **Call to Action Variations:**
   - primary (main CTA)
   - secondary (alternative CTA)
   - tertiary (soft CTA)

7. **Content Calendar:**
   - publishingSchedule (recommended frequency and timing)
   - contentTypes (array of content type suggestions)
   - distributionChannels (array of recommended channels)

Provide the output in structured JSON format with these exact keys. All content should be in Hungarian, tailored to the WebDude Cyber-Gold identity, and optimized for conversions.`;

  // 6. Build User Prompt
  const contentTypeDescriptions: Record<string, string> = {
    "blog-post": "Blog bejegyzés",
    "social-media": "Social media tartalom",
    "landing-page": "Landing oldal",
    "email-campaign": "Email kampány",
    "product-description": "Termék leírás",
    "case-study": "Esettanulmány",
  };

  const toneDescriptions: Record<string, string> = {
    professional: "Professzionális",
    casual: "Lazább",
    friendly: "Barátságos",
    authoritative: "Szakértői",
    inspiring: "Inspiráló",
    humorous: "Humoros",
  };

  const platformDescriptions: Record<string, string> = {
    website: "Weboldal",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    facebook: "Facebook",
    twitter: "Twitter",
    email: "Email",
    other: "Egyéb platform",
  };

  const userPrompt = `Generate a comprehensive content plan for:
Topic: ${validatedInput.topic}
Content Type: ${contentTypeDescriptions[validatedInput.contentType]}
Target Audience: ${validatedInput.targetAudience}
Tone: ${toneDescriptions[validatedInput.tone]}
Platform: ${platformDescriptions[validatedInput.platform]}
Keywords: ${validatedInput.keywords}
Call to Action: ${validatedInput.callToAction || "None specified"}
Additional Requirements: ${validatedInput.additionalRequirements || "None"}

Apply Norbi's 16+ years content strategy and visual design expertise with focus on structured content and visual design planning. Optimize for WebDude Cyber-Gold identity and Hungarian language.`;

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
    let parsedOutput: ContentWorkshopOutput;
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
      category: "content_workshop_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Content workshop generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
