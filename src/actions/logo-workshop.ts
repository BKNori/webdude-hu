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
  LogoWorkshopInput,
  LogoGenerationOutput,
  LogoGenerationResult,
} from "@/types/logo-workshop";

const logoArchetypeSchema = z.enum([
  "pictorial",
  "abstract_geometric",
  "negative_space",
  "wordmark",
  "monogram",
  "monoline",
  "emblem",
]);

const constructionGridSchema = z.enum([
  "golden_ratio",
  "swiss_modular",
  "isometric_hex",
  "bauhaus",
  "organic",
]);

const logoGenerationSchema = z.object({
  brandName: z.string().min(2, "Márkanév minimum 2 karakter"),
  tagline: z.string().max(120).optional(),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  targetAudience: z.string().min(5, "Célközönség minimum 5 karakter"),
  logoArchetype: logoArchetypeSchema,
  constructionGrid: constructionGridSchema,
  visualStyle: z.string().max(600).optional(),
  colorPreference: z.string().max(600).optional(),
  symbolsToInclude: z.string().max(600).optional(),
  symbolsToAvoid: z.string().max(600).optional(),
});

/**
 * Server Action: Enterprise Logó & Arculattervező Stúdió.
 * 26 éves Senior Art Director / vektorgrafikus szemlélettel generál
 * 3 különböző, produkciós szintű logókoncepciót strukturált JSON-ban.
 */
export async function addLogoGenerationAction(
  idToken: string,
  input: LogoWorkshopInput
): Promise<LogoGenerationResult> {
  // 1. Rate Limiting Check (max 10 generations per hour per client IP)
  const headersList = await headers();
  const req = { headers: headersList } as unknown as Request;
  const identifier = getClientIdentifier(req);
  const rateLimitResult = checkRateLimit(identifier, 10, 3600000);

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

  // 5. System Prompt — Senior Art Director / vektorgrafikus Persona
  const systemPrompt = `You are a Senior Art Director and Vector Graphic Designer with 26 years of experience at Pentagram / Paul Rand level. You design production-ready logos that a professional illustrator can redraw in Adobe Illustrator or CorelDRAW. Generate valid JSON only — no markdown, no text outside JSON.

INPUT CONTEXT (Hungarian brand, respond with Hungarian explanations where specified, English prompts where specified):
- brandName, optional tagline, industry, targetAudience
- logoArchetype, constructionGrid, visualStyle, colorPreference
- symbolsToInclude, symbolsToAvoid

JSON STRUCTURE (MUST match exactly):
{
  "concepts": [
    {
      "name": "1. Koncepció: <rövid név>",
      "metaphor": "<magyar: a vizuális metafora és jelentésréteg magyarázata>",
      "illustratorBlueprint": "<magyar, RÉSZLETES vektoros szerkesztési útmutató Illustrator/CorelDRAW-hoz: pontos szögek fokban, arányok, aranymetszés koordináták, Pathfinder/Shapebuilder kivonások, vonalvastagság javaslatok pt-ban, optikai korrekciók (pl. a kör/forms eltolása a geometriai középponttól), rétegszerkezet>",
      "recraftSvgPrompt": "<ENGLISH: clean vector logo prompt for Recraft v3 / native SVG generation — flat shapes, geometric precision, named brand text placeholder \\"{{brandName}}\\">",
      "ideogramPrompt": "<ENGLISH: Ideogram 2.0 prompt with exact \\"{{brandName}}\\" typography instruction, kerning notes, white background>",
      "midjourneyPrompt": "<ENGLISH Midjourney v6.1 prompt: MUST end with --ar 1:1 --v 6.1 --style raw --no photorealistic, 3d mockup, shadows, gradients, complex details, text artifacts>"
    }
  ],
  "colorSystem": {
    "primary":   {"name","hex","cmyk","pantone","psychology"},
    "secondary": {"name","hex","cmyk","pantone","psychology"},
    "accent":    {"name","hex","cmyk","pantone","psychology"},
    "base":      {"name","hex","cmyk","pantone","psychology"}
  },
  "typographySystem": {
    "primaryFont":   {"name": "<konkrét Google/Adobe Font>", "weight": "<pl. Bold 700>", "tracking": "<pl. -20>", "ligatureTips": "<magyar: mely betűket érdemes egybekötni / optikailag korrigálni>"},
    "secondaryFont": {"name": "<kiegészítő font>", "usage": "<magyar: szlogen/arculat használat>"}
  },
  "logoVariants": {
    "primaryHorizontal": "<magyar leírás: vízszintes fővariáns elrendezése>",
    "stackedVertical": "<magyar leírás: függőleges stackelt változat>",
    "appIconFavicon": "<magyar: 16x16 px favicon — pontos egyszerűsítési szabály, mit hagyunk meg, mit dobunk el>",
    "monochromeStamp": "<magyar: 1 színű bélyegző/gravírozás verzió leírása>"
  },
  "brandGuidelines": {
    "clearSpaceRule": "<magyar: védőtávolság a logó X-mérete alapján>",
    "minSizePx": "<pl. 32px digitális / 120px nyomtatás>",
    "minSizeMm": "<pl. 15mm nyomtatásban>",
    "donts": ["<5 konkrét tiltás a logó torzításának megakadályozására, magyarul>"]
  }
}

RULES:
- EXACTLY 3 concepts, each radically different in metaphor and construction.
- illustratorBlueprint must be detailed enough that a junior designer can redraw it without guessing: angles, ratios, Pathfinder operations, stroke weights.
- colorSystem: 4 roles — primary, secondary, accent, base (dark/light). cmyk format "C:85 M:10 Y:0 K:0". pantone like "PMS 2995 C".
- typographySystem fonts must be real, commercially usable fonts (Google Fonts or Adobe Fonts).
- All Hungarian text fields in Hungarian; all *_prompt fields in English.
- WebDude Kék-Lila v7.0 identity awareness: prefer #00B5F1 cyan and #5B21B6/#7C3AED violet family when suitable, but ALWAYS prioritize the brand's industry psychology over house style.
- symbolsToAvoid must be strictly respected — never include forbidden clichés.`;

  // 6. Build User Prompt
  const archetypeLabels: Record<string, string> = {
    pictorial: "Pictorial / Szimbólum (Apple/Twitter stílus)",
    abstract_geometric: "Absztrakt Geometriai Jel (Pentagram stílus)",
    negative_space: "Negative Space — rejtett forma a negatív térben (FedEx stílus)",
    wordmark: "Wordmark / Egyedi Tipográfiai Logó (Ligatúra fókusz)",
    monogram: "Monogram / Lettermark (1-3 betűs összefonódás)",
    monoline: "Minimalista Monoline / Vonalgrafika",
    emblem: "Modern Emblem / Kortárs Pecsét",
  };

  const gridLabels: Record<string, string> = {
    golden_ratio: "Aranymetszés (Fibonacci φ=1.618 körháló)",
    swiss_modular: "Svájci Moduláris Rács (Massimo Vignelli stílus)",
    isometric_hex: "Izometrikus 30°-os Hexa Rács",
    bauhaus: "Bauhaus Geometriai Alapformák",
    organic: "Organikus / Szabadkézi Optikai Egyensúly",
  };

  const userPrompt = `Tervezd meg a(z) "${validatedInput.brandName}" márka logóját és arculatát.

Márkanév: ${validatedInput.brandName}
Tagline (opcionális): ${validatedInput.tagline || "-"}
Iparág: ${validatedInput.industry}
Célcsoport & Pozicionálás: ${validatedInput.targetAudience}
Logó-architektúra: ${archetypeLabels[validatedInput.logoArchetype]}
Konstrukciós rács: ${gridLabels[validatedInput.constructionGrid]}
Stílus irányzat: ${validatedInput.visualStyle || "szabad tervezői döntés"}
Színpreferencia: ${validatedInput.colorPreference || "szabad tervezői döntés"}
Kért metaforák/motívumok: ${validatedInput.symbolsToInclude || "-"}
TILTOTT klisék: ${validatedInput.symbolsToAvoid || "-"}

Adj vissza PONTOSAN 3 merőben eltérő koncepciót a megadott JSON struktúrában. Minden koncepcióhoz teljes illustratorBlueprint, recraftSvgPrompt, ideogramPrompt és midjourneyPrompt mezők kellenek.`;

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
          model: "openai/gpt-oss-120b",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 8192,
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
