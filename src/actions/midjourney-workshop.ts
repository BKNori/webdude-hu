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
  MidjourneyGenerationInput,
  MidjourneyGenerationOutput,
  MidjourneyGenerationResult,
} from "@/types/midjourney-workshop";

const midjourneyGenerationSchema = z.object({
  subject: z.string().min(5, "Tárgy minimum 5 karakter"),
  style: z.enum([
    "photorealistic",
    "cinematic",
    "artistic",
    "minimalist",
    "vintage",
    "futuristic",
    "abstract",
  ]),
  mood: z.enum([
    "dramatic",
    "peaceful",
    "energetic",
    "mysterious",
    "romantic",
    "professional",
    "playful",
  ]),
  lighting: z.enum([
    "natural",
    "studio",
    "golden-hour",
    "blue-hour",
    "neon",
    "volumetric",
    "chiaroscuro",
  ]),
  aspectRatio: z.enum(["16:9", "9:16", "1:1", "4:5", "21:9"]),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate Midjourney AI Műhely content using Groq API.
 * Implements Norbi's 26-year visual and photographic expertise:
 * Midjourney v6, volumetric lighting, --ar parameters, professional photography principles.
 */
export async function addMidjourneyGenerationAction(
  idToken: string,
  input: MidjourneyGenerationInput
): Promise<MidjourneyGenerationResult> {
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
  const validation = midjourneyGenerationSchema.safeParse(input);
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

  // 5. Build System Prompt with Norbi's 26-year visual and photographic expertise
  const systemPrompt = `You are an Elite Visual Director and Professional Photographer with 26 years of experience in visual arts, photography, and Midjourney v6 prompt engineering. Your expertise includes:

**Photography Principles:**
- 85mm G-Master lens mastery (bokeh, depth of field, compression)
- Volumetric lighting and atmospheric effects
- Chiaroscuro lighting for dramatic contrast
- Golden hour and blue hour timing
- Professional color grading and color theory
- Composition rules (rule of thirds, leading lines, negative space)

**Midjourney v6 Expertise:**
- Advanced parameter usage (--ar, --style raw, --stylize, --chaos, --quality)
- Photorealistic rendering techniques
- Cinematic lighting setups
- Professional camera settings simulation
- AI prompt optimization for consistent results

**Visual Design Philosophy:**
- WebDude Cyber-Gold identity integration
- 90% dark/graphite background, maximum 2% Cyber-Gold focus
- Perfect typographic contrast (WCAG AA compliant)
- Professional visual hierarchy

**Tailwind CSS v4 Layout Integration:**
- Valid Tailwind CSS v4 utility classes for responsive layouts
- Flexbox and Grid systems for professional composition
- Mobile-first responsive design patterns
- Dark mode compatible color schemes

**Output Requirements:**
Generate a complete Midjourney v6 concept with the following structure:

1. **Visual Concept:**
   - Style description (photorealistic, cinematic, artistic, minimalist, vintage, futuristic, abstract)
   - Mood description (dramatic, peaceful, energetic, mysterious, romantic, professional, playful)
   - Visual description in vivid detail
   - Key elements breakdown (subject, environment, props, atmosphere)
   - tailwindLayout: Valid Tailwind CSS v4 layout structure (e.g., 'flex flex-col items-center justify-center gap-4 p-8')

2. **Lighting Setup:**
   - Type of lighting (natural, studio, golden-hour, blue-hour, neon, volumetric, chiaroscuro)
   - Direction of light (front, back, side, top, bottom)
   - Intensity level (soft, medium, harsh)
   - Color temperature (warm, cool, neutral)
   - Rationale for lighting choice based on mood and subject

3. **Composition:**
   - Framing (wide, medium, close-up, extreme close-up)
   - Perspective (eye-level, low angle, high angle, bird's eye, worm's eye)
   - Depth of field (shallow, medium, deep)
   - Focal point description

4. **Color Grading:**
   - Color palette (3-4 specific colors with hex codes)
   - Grading style (teal & orange, desaturated, high contrast, vintage, cinematic)
   - Contrast level (low, medium, high)
   - Saturation level (muted, normal, vibrant)
   - psychology: Color psychology explanation (e.g., 'Primary #00B5F1 evokes trust and professionalism')
   - Rationale for color choices based on mood and style

5. **Midjourney Prompt:** Professional Midjourney v6 prompt with:
   - Subject description in vivid detail
   - Style specifications (photorealistic, cinematic, artistic, etc.)
   - Lighting setup with specific direction
   - Camera settings (85mm G-Master lens, f/1.8, shutter speed)
   - Technical parameters: --v 6.0 --style raw --ar [aspect ratio] --quality 2 --stylize 250 --volumetric
   - No buzzwords like "photorealistic", "4K", "8K"

6. **Variations:**
   - Alternative 1: Different mood or lighting approach
   - Alternative 2: Different composition or perspective
   - Alternative 3: Different color grading or style

COLOR PSYCHOLOGY & HEX PALETTES:
- Trust/Professional: #00B5F1 (Primary Blue), #1E293B (Slate Dark), #F8FAFC (Light Gray)
- Cinematic/Dramatic: #0F172A (Deep Navy), #00B5F1 (Gold), #E2E8F0 (Silver)
- Nature/Peaceful: #10B981 (Emerald), #064E3B (Forest), #ECFDF5 (Mint)
- Energy/Dynamic: #FF7A00 (Orange), #EF4444 (Red), #FCA5A5 (Coral)
- Mystery/Dark: #1E1B4B (Indigo), #312E81 (Purple), #4C1D95 (Deep Purple)

MIDJOURNEY PARAMETERS (v6.0):
- Aspect Ratio: --ar 16:9 (landscape), --ar 9:16 (portrait), --ar 1:1 (square), --ar 4:5 (Instagram), --ar 21:9 (ultrawide)
- Version: --v 6.0
- Style: --style raw
- Quality: --quality 2
- Stylize: --stylize 250
- Lighting: --volumetric, --cinematic, --golden-hour, --blue-hour
- Focus: --depth of field, --macro, --wide-angle
- Detail: --detail high, --sharp focus

Provide the output in structured JSON format with these exact keys: visualConcept (with style, mood, description, keyElements, tailwindLayout), lightingSetup (with type, direction, intensity, colorTemperature, rationale), composition (with framing, perspective, depthOfField, focalPoint), colorGrading (with palette, gradingStyle, contrast, saturation, psychology, rationale), midjourneyPrompt, variations (with alternative1, alternative2, alternative3).`;

  // 6. Build User Prompt
  const styleDescriptions: Record<string, string> = {
    photorealistic:
      "Fotorealisztikus (élet-hű részletesség, valóságos textúrák)",
    cinematic: "Cinematikus (filmbevágás stílus, drámai kompozíció)",
    artistic: "Művészi (kreatív, expresszív, egyedi stílus)",
    minimalist: "Minimalista (tiszta, egyszerű, sok negatív tér)",
    vintage: "Vintage (retro, klasszikus, nosztalgikus)",
    futuristic: "Futurisztikus (sci-fi, modern, innovatív)",
    abstract: "Absztrakt (szimbolikus, művészi, non-reprezentatív)",
  };

  const moodDescriptions: Record<string, string> = {
    dramatic: "Drámai (erős kontraszt, intenzív érzelmek)",
    peaceful: "Békés (nyugodt, harmonikus, lágy)",
    energetic: "Energetikus (dinamikus, mozgalmas, üde)",
    mysterious: "Rejtélyes (sötét, titokzatos, feszült)",
    romantic: "Romantikus (szerelmes, lágy, meleg)",
    professional: "Professzionális (üzleti, megbízható, elegáns)",
    playful: "Játékos (vidám, kreatív, színes)",
  };

  const lightingDescriptions: Record<string, string> = {
    natural: "Természetes (napfény, környezeti fény)",
    studio: "Stúdió (kontrollált fény, mesterséges)",
    "golden-hour": "Golden Hour (naplemente előtti arany fény)",
    "blue-hour": "Blue Hour (naplemente utáni kék fény)",
    neon: "Neon (színes, mesterséges, városi)",
    volumetric: "Volumetrikus (fénygerenda, atmoszférikus)",
    chiaroscuro: "Chiaroscuro (erős kontraszt, fény-árnyék)",
  };

  const userPrompt = `Generate a Midjourney v6 concept for:
Subject: ${validatedInput.subject}
Style: ${styleDescriptions[validatedInput.style]}
Mood: ${moodDescriptions[validatedInput.mood]}
Lighting: ${lightingDescriptions[validatedInput.lighting]}
Aspect Ratio: ${validatedInput.aspectRatio}
Additional Requirements: ${validatedInput.additionalRequirements || "None"}

Apply the WebDude Cyber-Gold identity principles and Norbi's 26-year visual and photographic expertise for professional Midjourney v6 prompt generation.`;

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
    let parsedOutput: MidjourneyGenerationOutput;
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
      category: "midjourney_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Midjourney generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
