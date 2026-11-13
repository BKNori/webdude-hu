"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { verifyUserToken } from "./portal";
import { saveAiGeneration } from "@/lib/ai-generation-store";
import type {
  FlyerWorkshopInput,
  FlyerWorkshopOutput,
  FlyerGenerationResult,
} from "@/types/flyer-workshop";

const flyerFormatSchema = z.enum([
  "A5_ketoldalas",
  "A6_kupon",
  "DL_exkluziv",
  "A4_ismertető",
  "A4_LA4_gongyolt",
  "A4_LA4_harmonikahajtas",
  "A4_A5_bifold",
  "negyzetes_premium",
]);

const paperAndFinishSchema = z.enum([
  "135g_fenyes_munyomo",
  "170g_matt_munyomo",
  "250g_softtouch_spotuv",
  "120g_kraft_natur",
  "300g_kreativ_karton_pregelesc",
]);

const distributionChannelSchema = z.enum([
  "kezbe_adott",
  "postalada",
  "unboxing_kupon",
  "display_pultos",
]);

const flyerGenerationSchema = z.object({
  campaignTitle: z.string().min(3, "Kampány neve minimum 3 karakter"),
  brandName: z.string().min(2, "Márkanév minimum 2 karakter"),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  flyerFormat: flyerFormatSchema,
  paperAndFinish: paperAndFinishSchema,
  distributionChannel: distributionChannelSchema,
  visualStyle: z.string().max(600).optional(),
  colorPreference: z.string().max(600).optional(),
  offerOrHook: z.string().max(400).optional(),
  callToAction: z.string().max(300).optional(),
});

/**
 * Server Action: Nyomdakész Szórólap & Hajtogatott Prospektus Stúdió.
 * 26 éves nyomdaipari/prepress tapasztalattal milliméter-pontos
 * vágási, kifutós, biztonsági zóna és hajtási mechanikai adatokat ad.
 */
export async function addFlyerGenerationAction(
  idToken: string,
  input: FlyerWorkshopInput
): Promise<FlyerGenerationResult> {
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
  const validation = flyerGenerationSchema.safeParse(input);
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

  // 5. System Prompt — Senior Prepress Art Director persona
  const systemPrompt = `You are a Senior Prepress Art Director and Print Production Specialist with 26 years of experience in commercial print (offset, digital, wide-format). You produce millimeter-perfect flyer and folded brochure specifications that a print buyer can hand directly to a Hungarian printer (DINA4/A-series, ISO Coated v2 / FOGRA39). Generate valid JSON only — no markdown, no text outside JSON.

PREPRESS KNOWLEDGE YOU MUST APPLY:
- German/folding standard: tri-fold (leporelló/göngyölt) A4→LA4 panels are 99×210mm; gatefold/letter-fold variants use 97-100-100mm; z-fold harmonic panels ~99mm each. ALWAYS specify the exact panel widths in mm and which panel is the wrap-around (behajló fül).
- Bleed: 3mm on all trim edges (5mm for large format). Safe zone: minimum 5mm inside trim for text/logos (8-10mm for folded panels near fold lines — keep critical content 10mm from any fold).
- Paper: above 150-170gsm, folding requires scoring (bígelés); uncoated/kraft needs wider safe zones. 250g+ = card, limited folds.
- Color: ISO Coated v2 (FOGRA39) for offset; TAC max 320-340%; Rich Black for large dark areas = C:60 M:40 Y:40 K:100 (NEVER 400% all-channel black); body text = 100% K only (single black plate) to avoid registration blur; small black text must NOT overprint.
- QR codes: minimum 20×20mm physical size with quiet zone; vector only.
- Fonts: all text must be outlined (betűk görbévé alakítása) before PDF export; PDF/X-1a or PDF/X-4 compliant.

JSON STRUCTURE (MUST match exactly):
{
  "conceptOverview": {
    "title": "<koncepció címe, magyar>",
    "creativeDirection": "<magyar: kreatív irány és fő vizuális gondolat>",
    "eyeTrackingStrategy": "<magyar: tekintetvezetés az előlapról a CTA-ig, F/Z-pattern elemzéssel>",
    "conversionPsychology": "<magyar: a pszichológiai mechanizmusok (anchoring, urgency, social proof) és hol jelennek meg>"
  },
  "prepressSpecs": {
    "trimSizeMm": "<pl. 210×297>",
    "bleedSizeMm": "<pl. 216×303>",
    "grossSizeMm": "<nyers méret hajtás előtt/után>",
    "safeZoneMm": "<pl. 5 (vágástól), 10 (hajtástól)>",
    "foldingMechanics": "<magyar: pontos hajtási mechanika mm-ben, pl. 97-100-100 mm behajló fül, információhordozás iránya, melyik panel nyílik először>",
    "paperRecommendation": "<magyar: papír- és felület-javaslat a választott papírhoz és formathoz>",
    "colorProfile": "<pl. ISO Coated v2 (FOGRA39) / PSO Coated v3>",
    "maxInkCoverageTac": "<pl. 320%>",
    "richBlackFormula": "<pl. C:60 M:40 Y:40 K:100>",
    "bodyTextBlackRule": "<pl. 100% K only — egy színlemez, regisztrációs hiba kiküszöbölése>",
    "qrCodeMinSizeMm": "<pl. 25×25 + 3mm quiet zone>"
  },
  "panelBreakdown": [
    {
      "panelName": "<pl. Előlap (Recto) / 1. Panel — Külső borító>",
      "sizeMm": "<pl. 210×297>",
      "visualZonePlan": "<magyar: a panel zónái %-ban vagy mm-ben — hol a kép, hol a szöveg, hol a CTA>",
      "headline": "<kész főcím, magyar, max 6-8 szó>",
      "subheadline": "<kész alcím>",
      "bodyPoints": ["<3-4 kész bullet-pont, magyar>"],
      "ctaOrElement": "<kész CTA szöveg + elem, pl. kuponkód, QR, telefonszám>",
      "layoutTip": "<magyar: elrendezési tipp a gridhez — pl. 12 oszlop, harmadokban>",
      "panelNumber": "<opcionális sorszám>"
    }
  ],
  "colorSystem": [
    {"name": "<szerep>", "hex": "#RRGGBB", "cmyk": "C:.. M:.. Y:.. K:..", "pantone": "PMS xxxx C", "printUsage": "<magyar: hol használjuk — háttér, főcím, akcentus/kupon, szöveg>"}
  ],
  "typographyHierarchy": {
    "headlineFont": "<konkrét betűtípus a főcímhez — Google/Adobe Font>",
    "bodyFont": "<szövegtörzs betűtípusa — olvashatóság 8-9pt-nél is>",
    "accentFont": "<kiemelés/kupon betűtípusa>",
    "printSizingPt": {
      "mainHeadlinePt": "<pl. 42-54>",
      "subheadPt": "<pl. 18-24>",
      "bodyTextPt": "<pl. 9-11 — nyomtatásban minimum 7pt>",
      "finePrintMinPt": "<pl. 6-7 — jogi szövegre>"
    },
    "kerningAndLeadingTips": "<magyar: tracking, leading, optikai illesztés nyomtatott formátumban>"
  },
  "aiPrompts": {
    "heroKeyVisualPrompt": "<ENGLISH: Midjourney v6.1/Flux prompt a kulcsgrafikához — flat lay, termékfotó, tipikus kompozíció a formátumhoz; zárja: --ar <megfelelő arány> --v 6.1 --style raw --no text, watermark, blurry>",
    "ideogramLayoutPrompt": "<ENGLISH: Ideogram 2.0 layout prompt a teljes oldal/flyer kompozíciójához pontos szövegekkel>",
    "printMockup3DPrompt": "<ENGLISH: 3D print mockup prompt — papírtextúra, hajtogatott állapot, professzionális fotózás>",
    "negativePrompt": "<ENGLISH: negatív prompt — ami NE legyen a képen>"
  },
  "prepressChecklist": ["<8 db konkrét, magyar nyomdai ellenőrzőpont InDesign/Illustrator/CorelDRAW export előtt>"]
}

RULES:
- panelBreakdown: KÉTSOLDALAS (A5, A6, A4, DL, négyzet) esetén PONTOSAN 2 panel: Előlap (Recto) + Hátlap (Verso). HAJTOTT (tri-fold, z-fold, bi-fold) esetén az ÖSSZES panel: 4 vagy 6 db, a helyes sorrendben (külső borító elöl-hátul, belső oldalak, utolsó panel a hátsó borító). Minden panelhez pontos méret mm-ben.
- A hajtogatott prospektusnál a foldingMechanics MINDENKÉPPEN tartalmazza a panel-szélességeket mm-ben (pl. 97-100-100) és a behajló fül irányát.
- A szövegek (headline, subheadline, bodyPoints, CTA) MAGYARUL, nyomdailag kész, meggyőző direct-response copywriting stílusban — nem generikus marketingszöveg.
- colorSystem: 4-5 szín, mindegyik hex+cmyk+pantone+printUsage mezővel.
- printSizingPt ÉRTÉKEI: tartományok mm helyett pontban (pl. "42-54").
- aiPrompts mind ENGLISH nyelven.
- WebDude Kék-Lila v7.0 tudatában, de a márka iparága és a papír/Papír stílusa elsődleges.
- prepressChecklist: pontosan 8 elem — betűk görbévé, 300 DPI, PDF/X-1a/X-4, kifutó ellenőrzés, bígelési stanc, QR vektor, színtérkép, overprint szabályok.`;

  // 6. Build User Prompt
  const formatLabels: Record<string, string> = {
    A5_ketoldalas: "A5 (148×210 mm) — Klasszikus Kétoldalas Szórólap",
    A6_kupon: "A6 (105×148 mm) — Kompakt Kupon / Postaládás Szórólap",
    DL_exkluziv: "DL / LA4 (99×210 mm) — Keskeny Exkluzív / Menü / Kupon",
    A4_ismertető: "A4 (210×297 mm) — Nagy Kétoldalas Termékismertető",
    A4_LA4_gongyolt:
      "A4 -> LA4 Göngyölt hajtás (Tri-fold, 6 oldal: 97-100-100 mm)",
    A4_LA4_harmonikahajtas:
      "A4 -> LA4 Harmonikahajtás (Z-fold / Leporelló, 6 oldal: 99-99-99 mm)",
    A4_A5_bifold: "A4 -> A5 Félbehajtott (Bi-fold, 4 oldalas Kisprospektus)",
    negyzetes_premium: "Négyzetes Prémium (148×148 mm) — Boutique / Lookbook",
  };

  const paperLabels: Record<string, string> = {
    "135g_fenyes_munyomo":
      "135g Fényes Műnyomó (Élénk színek, nagy példányszám)",
    "170g_matt_munyomo":
      "170g Matt Műnyomó (Elegáns, tükröződésmentes)",
    "250g_softtouch_spotuv":
      "250g Matt + Soft-Touch Fólia + Spot UV Formalakk (VIP Prémium)",
    "120g_kraft_natur":
      "120g Újrahasznosított / Kraft Natur Papír (Bio / Kézműves)",
    "300g_kreativ_karton_pregelesc":
      "300g Kreatív Karton + Arany/Ezüst Prégelés (Luxus Kupon)",
  };

  const channelLabels: Record<string, string> = {
    kezbe_adott: "Kézbe adott / Rendezvény",
    postalada: "Postaládás (Direct Mail)",
    unboxing_kupon: "Csomagba tett kupon (Unboxing)",
    display_pultos: "Recepciós / Pultos kihelyezés (Display)",
  };

  const isFolded = [
    "A4_LA4_gongyolt",
    "A4_LA4_harmonikahajtas",
    "A4_A5_bifold",
  ].includes(validatedInput.flyerFormat);

  const userPrompt = `Tervezd meg a(z) "${validatedInput.campaignTitle}" szórólapot / prospektust a(z) "${validatedInput.brandName}" márka számára.

Kampány / Termék / Esemény: ${validatedInput.campaignTitle}
Márka: ${validatedInput.brandName}
Iparág: ${validatedInput.industry}
Formátum és hajtás: ${formatLabels[validatedInput.flyerFormat]}${isFolded ? " — EZ EGY HAJTOTT, TÖBB OLDALAS PROSPEKTUS! A panelBreakdown-ba az ÖSSZES panel kerüljön a helyes sorrendben, a foldingMechanics-ba a pontos mm-szélességek!" : " — Kétsoldalas, pontosan 2 panel: Előlap (Recto) + Hátlap (Verso)."}
Papír és felületnemesítés: ${paperLabels[validatedInput.paperAndFinish]}
Terjesztési csatorna: ${channelLabels[validatedInput.distributionChannel]}
Stílus irányzat: ${validatedInput.visualStyle || "szabad tervezői döntés"}
Színpreferencia: ${validatedInput.colorPreference || "szabad tervezői döntés"}
Fő ajánlat / hook: ${validatedInput.offerOrHook || "-"}
Konverziós cél / CTA: ${validatedInput.callToAction || "-"}

Adj vissza PONTOSAN a megadott JSON struktúrában. A szövegek MAGYARUL, nyomdailag kész direct-response minőségben.`;

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
    let parsedOutput: FlyerWorkshopOutput;
    try {
      parsedOutput = JSON.parse(content);
    } catch {
      return {
        success: false,
        error:
          "Nem sikerült értelmezni a generált tartalmat. Kérlek, próbáld újra!",
      };
    }

    // Save to Firestore (Admin SDK vagy REST fallback — soha nem dob hibát)
    await saveAiGeneration({
      idToken,
      userId: user.uid,
      userEmail: user.email,
      category: "flyer_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Flyer generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
