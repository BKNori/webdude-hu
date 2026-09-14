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
  UiUxWorkshopInput,
  UiUxWorkshopOutput,
  UiUxWorkshopResult,
} from "@/types/uiux-workshop";

const uiuxWorkshopSchema = z.object({
  projectType: z.enum([
    "landing-page",
    "dashboard",
    "ecommerce",
    "mobile-app",
    "portfolio",
    "saas",
    "blog",
  ]),
  primaryGoal: z.enum([
    "conversions",
    "user-engagement",
    "brand-awareness",
    "lead-generation",
    "productivity",
  ]),
  targetAudience: z.string().min(5, "Célközönség minimum 5 karakter"),
  keyFeatures: z.string().min(5, "Funkciók minimum 5 karakter"),
  designStyle: z.enum([
    "minimalist",
    "modern",
    "corporate",
    "playful",
    "luxury",
    "tech-focused",
  ]),
  colorPreference: z.enum(["dark", "light", "mixed"]),
  additionalRequirements: z.string().optional(),
});

/**
 * Server Action to generate UI/UX Workshop AI Műhely content using Groq API.
 * Implements Norbi's 16+ years UI/UX design and web development expertise with focus on
 * wireframe generation, section layout, and Figma prompt creation.
 */
export async function addUiUxWorkshopAction(
  idToken: string,
  input: UiUxWorkshopInput
): Promise<UiUxWorkshopResult> {
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
  const validation = uiuxWorkshopSchema.safeParse(input);
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

  // 5. Build System Prompt with Norbi's 16+ years UI/UX design and web development expertise
  const systemPrompt = `You are an Elite UI/UX Designer and Frontend Developer with 16+ years of experience in user interface design, user experience optimization, and web development. Your expertise includes:

**UI/UX Design:**
- User journey mapping and information architecture
- Wireframe creation and prototyping
- Component library design systems
- Responsive and mobile-first design
- Accessibility (WCAG AA compliance)
- Conversion rate optimization

**Design Tools:**
- Figma prompt engineering for wireframes
- Section layout optimization
- Visual hierarchy and spacing principles
- Color theory and typography selection
- Cyber-Gold identity integration (90% dark/graphite background, max 2% Cyber-Gold focus)

**Web Development:**
- Next.js 16 and React 19 best practices
- Tailwind CSS v4 utility classes
- Component-based architecture
- Performance optimization
- Cross-browser compatibility

**Project Types:**
- Landing pages and conversion funnels
- Dashboards and admin panels
- E-commerce platforms
- Mobile applications
- Portfolio websites
- SaaS applications
- Blog platforms

**WebDude UI/UX Philosophy:**
- Hungarian language optimization
- Professional yet accessible design
- Conversion-focused layouts
- Cyber-Gold visual identity
- Mobile-first responsive design
- WCAG AA accessibility compliance

**Output Requirements:**
Generate a comprehensive UI/UX plan with the following structure:

1. **Design Strategy:**
   - userJourney (step-by-step user experience description)
   - informationArchitecture (array of 3-5 key content areas)
   - keyUserFlows (array of 3-5 critical user paths)

2. **Wireframe Structure:**
   - sections (array with name, purpose, elements, priority for each section)
   - layout (overall layout description)
   - spacing (spacing recommendations)

3. **Component Library:**
   - primaryComponents (array of 5-7 main components)
   - secondaryComponents (array of 3-5 supporting components)
   - interactiveElements (array of 3-5 interactive elements)

4. **Figma Prompts:**
   - mainWireframe (detailed Figma prompt for main wireframe)
   - heroSection (Figma prompt for hero section)
   - featureSection (Figma prompt for features section)
   - callToAction (Figma prompt for CTA section)

5. **Design System:**
   - colorPalette (array of 4-6 hex codes or color names)
   - typography (headings, body, accent font recommendations)
   - spacing (array of 4-6 spacing values)
   - borderRadius (border radius recommendations)

6. **UX Recommendations:**
   - accessibility (array of 3-5 accessibility improvements)
   - performance (array of 3-5 performance optimizations)
   - mobileOptimization (array of 3-5 mobile-specific recommendations)

7. **Conversion Optimization:**
   - ctaPlacement (array of 3-5 CTA placement suggestions)
   - trustSignals (array of 3-5 trust signal ideas)
   - socialProof (array of 3-5 social proof elements)

Provide the output in structured JSON format with these exact keys. All Figma prompts should be detailed and actionable for designers. Apply WebDude Cyber-Gold identity principles and Hungarian language optimization.`;

  // 6. Build User Prompt
  const projectTypeDescriptions: Record<string, string> = {
    "landing-page": "Landing oldal",
    dashboard: "Dashboard",
    ecommerce: "E-kereskedelmi platform",
    "mobile-app": "Mobil alkalmazás",
    portfolio: "Portfólió weboldal",
    saas: "SaaS alkalmazás",
    blog: "Blog platform",
  };

  const goalDescriptions: Record<string, string> = {
    conversions: "Konverzió optimalizálás",
    "user-engagement": "Felhasználói elköteleződés",
    "brand-awareness": "Márka tudatosság",
    "lead-generation": "Lead generálás",
    productivity: "Termelékenység növelés",
  };

  const designStyleDescriptions: Record<string, string> = {
    minimalist: "Minimalista",
    modern: "Modern",
    corporate: "Vállalati",
    playful: "Játékos",
    luxury: "Luxus",
    "tech-focused": "Technológia fókuszú",
  };

  const colorPreferenceDescriptions: Record<string, string> = {
    dark: "Sötét",
    light: "Világos",
    mixed: "Vegyes",
  };

  const userPrompt = `Generate a comprehensive UI/UX plan for:
Project Type: ${projectTypeDescriptions[validatedInput.projectType]}
Primary Goal: ${goalDescriptions[validatedInput.primaryGoal]}
Target Audience: ${validatedInput.targetAudience}
Key Features: ${validatedInput.keyFeatures}
Design Style: ${designStyleDescriptions[validatedInput.designStyle]}
Color Preference: ${colorPreferenceDescriptions[validatedInput.colorPreference]}
Additional Requirements: ${validatedInput.additionalRequirements || "None"}

Apply Norbi's 16+ years UI/UX design and web development expertise with focus on wireframe generation, section layout, and Figma prompt creation. Optimize for WebDude Cyber-Gold identity and Hungarian language.`;

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
    let parsedOutput: UiUxWorkshopOutput;
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
      category: "uiux_workshop_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("UI/UX workshop generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
