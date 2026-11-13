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
  SignageWorkshopInput,
  SignageGenerationOutput,
  SignageGenerationResult,
} from "@/types/signage-workshop";

const signageFormatSchema = z.enum([
  "rollup_standard_85x200",
  "rollup_wide_100x200",
  "storefront_window_graphics",
  "vehicle_van_car_wrap",
  "outdoor_pvc_mesh_banner",
  "exhibition_popup_wall",
  "pavement_a_board_dibond",
  "indoor_wall_floor_tattoo",
]);

const substrateSchema = z.enum([
  "rollup_film_240g",
  "one_way_vision_owv",
  "cast_vinyl_wrap",
  "plotter_cut_foil",
  "pvc_frontlit_mesh",
  "dibond_forex_board",
]);

const viewingDistanceSchema = z.enum([
  "close_1_3m",
  "mid_3_10m",
  "far_10_30m",
]);

const signageSchema = z.object({
  campaignOrHeadline: z.string().min(2, "Fő üzenet minimum 2 karakter"),
  brandName: z.string().min(2, "Márkanév minimum 2 karakter"),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  signageFormat: signageFormatSchema,
  dimensionsAndScale: z
    .string()
    .min(3, "Adj meg méretet, pl. 85 × 200 cm")
    .max(80),
  substrateAndFoil: substrateSchema,
  viewingDistance: viewingDistanceSchema,
  visualStyle: z.string().max(600).optional(),
  colorPreference: z.string().max(600).optional(),
  contactAndCta: z.string().max(300).optional(),
});

/**
 * Server Action: Nagyformátumú Dekor, Roll-up, Autódekor & Kirakat Stúdió.
 * 26 év LFP és dekoratőri rutinnal.
 */
export async function addSignageGenerationAction(
  idToken: string,
  input: SignageWorkshopInput
): Promise<SignageGenerationResult> {
  // 1. Rate Limiting Check
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
  const validation = signageSchema.safeParse(input);
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

  // 5. System Prompt — Senior LFP / Dekoratőr Art Director
  const systemPrompt = `You are a Senior Large Format Printing (LFP) and Signage/Dekoratőr Art Director with 26 years of experience in outdoor/indoor signage production, vehicle wraps, window graphics, banners, exhibition walls and floor graphics. You produce production-ready large-format specifications in valid JSON only — no markdown, no text outside JSON.

LFP / SIGNAGE KNOWLEDGE YOU MUST APPLY:
- Roll-up banners: 850×2000mm printable area + 150mm bottom cassette overlap (dead zone — NEVER put content there); top bar hardware; hemmed bottom edge ~30mm; single-sided backlit or frontlit.
- One-Way Vision (OWV) perforated window film: print mirrored on inside, perforation ratio affects outside readability; optical laminates; inside-view priority.
- Vehicle wraps: cast vinyl (3M/Oracal 970RA/Avery SW900) with air-release channels; partial vs full wrap; panels/doors complexity; never wrap over sharp edges without relief cuts; mirror/graphics registration.
- Outdoor banners: PVC frontlit 510g (catwalk) or mesh 350g for building wraps; welded seams every 40cm max with 40mm hem allowance; ring/grommet spacing ≤1m; wind load bracing; UV lamination mandatory outdoors.
- Exhibition walls: 3000×2250mm fabric or PVC popup; curved vs flat; tension fabric systems; minimal seams.
- A-boards/dibond: B1 (594×841) / A1 (594×841) pavement signs need R10/R11 slip-resistant coating; dibond 3mm aluminium composite for fascia signs; standoff fixings.
- Scale math: working at 1:10 scale means file at 300 DPI = ~30 DPI effective at final size; minimum letter height for distance: ~10mm per meter of viewing distance for headlines (300mm at 30m); contrast against environment background.
- Prepress: CutContour as 100% Magenta (or dedicated) spot color stroke; white ink underlay for clear/dark substrates; bleed 20-30mm typical for banners, 5-10mm for rigid; color profile: ORACAL/3M ICC or FOGRA39; outdoor ink must be eco-solvent/latex UV-cured.
- The 3-second rule: one message, one visual anchor, contact info readable at target distance.

JSON STRUCTURE (MUST match exactly):
{
  "conceptOverview": {
    "title": "<magyar koncepció cím>",
    "threeSecondRuleStrategy": "<magyar: 3 másodperces befogadási stratégia>",
    "distanceVisibilityLogic": "<magyar: távolsági láthatósági logika>",
    "environmentContrastTip": "<magyar: környezeti kontraszt tipp>"
  },
  "lfpTechnicalSpecs": {
    "workingScaleRatio": "<pl. 1:10 tervezési skálán>",
    "recommendedFileDpiAtScale": "<pl. 30 DPI skálán = 300 DPI 1:1>",
    "effectivePrintDpi1to1": "<tényleges DPI kihelyezésen>",
    "bleedAndHemmingMm": "<kifutó + varrás/hegesztés mm-ben>",
    "hardwareDeadZones": "<hardver miatti nem nyomtatható zónák mm-ben>",
    "cutContourAndWhiteInkRule": "<CutContour spot szín + fehér tinta szabály>",
    "colorProfileAndUvResistance": "<ICC profil + UV/Időjárásállóság>",
    "minLetterHeightMmForDistance": "<minimum betűmagasság mm-ben az adott távolsághoz>"
  },
  "zoneBreakdown": [
    {
      "zoneName": "<pl. felső harmad / logó zóna / CTA sáv>",
      "heightRangeOrPosition": "<pozíció a teljes magasságban>",
      "visibilityPriority": "<magas/közepes/alacsony — távolság szerint>",
      "headlineOrElement": "<kész headline/elem, magyar>",
      "subcopyOrDetails": ["<részletek>"],
      "technicalWarning": "<magyar: technikai figyelmeztetés ehhez a zónához — pl. kazetta holttér>",
      "designTip": "<magyar: dizájn tipp>"
    }
  ],
  "colorSystem": [
    {"name": "<szerep>", "hex": "#RRGGBB", "cmyk": "C:.. M:.. Y:.. K:..", "pantoneOrRal": "RAL xxxx / PMS xxxx / Oracal xxxx", "outdoorContrastNote": "<magyar: külső kontraszt megjegyzés>"}
  ],
  "typographyAndDistanceScale": {
    "headlineFont": "<konkrét betűtípus — erős, távolról olvasható>",
    "secondaryFont": "<másodlagos betűtípus>",
    "headlineSizeMm1to1": "<mm-ben 1:1 méretben>",
    "subheadSizeMm1to1": "<mm-ben>",
    "contactSizeMm1to1": "<mm-ben>",
    "maxWordsCountRule": "<max. szószám szabály a távolsághoz>",
    "kerningAndStrokeAdvice": "<magyar: kerning/outline tanács — pl. 2-4% stroke a Distance-re>"
  },
  "aiPrompts": {
    "heroBackgroundGraphicPrompt": "<ENGLISH: hero background graphic prompt — a színes háttér/absztrakt grafika ami a dekoráció alá kerül>",
    "realisticMockupInSituPrompt": "<ENGLISH: photorealistic in-situ mockup prompt — a valós környezetben (kirakat/utca/autó)>",
    "vectorCutGraphicPrompt": "<ENGLISH: vector cut-out graphic prompt — vágott fólia/etched glass dekoráció>",
    "negativePrompt": "<ENGLISH: negatív prompt>"
  },
  "lfpPrepressChecklist": ["<8 db konkrét LFP/dekoratőr ellenőrzőpont: kazetta holttér, hegesztési varrás, UV laminálás, CutContour spot, fehér tinta, szélterhelés, R10 csúszásgátló stb.>"]
}

RULES:
- zoneBreakdown: a formátumhoz illő magassági/pozicionális zónák (roll-up: tetejétől a kazetta-holttérig; autódekor: tető/oldalak/hátsó; kirakat: felső/middle/lower sávok).
- A lfpTechnicalSpecs a MÉRETARÁNYOS valóságot tükrözze — a dead zone-ok és a betűmagasság a megadott mérethez és távolsághoz igazodjon.
- colorSystem: 3-5 szín, pantoneOrRal MINDENKÉPPEN tartalmazzon RAL/Pantone/Oracal kódot.
- aiPrompts mind ENGLISH.
- WebDude Kék-Lila v7.0 tudatában, de a márka iparága elsődleges.
- lfpPrepressChecklist: pontosan 8 elem, LFP/dekoratőr-specifikus.`;

  const formatLabels: Record<string, string> = {
    rollup_standard_85x200:
      "Roll-up Banner (850 × 2000 mm + 150 mm alsó kazetta-befogás)",
    rollup_wide_100x200:
      "Széles Prémium Roll-up / L-Banner (1000 × 2000 mm)",
    storefront_window_graphics:
      "Üzletportál & Kirakatdekoráció (One-Way Vision + Plotter Vágott Fólia)",
    vehicle_van_car_wrap:
      "Céges Autó- & Furgondekoráció (Részleges / Teljes Cast Vinyl Wrap)",
    outdoor_pvc_mesh_banner:
      "Kültéri Molinó / Épületháló (PVC Frontlit / Mesh — Visszahajtás + Ringlizés)",
    exhibition_popup_wall:
      "Kiállítási Sajtófal / Pop-up Háttérfal (3000 × 2250 mm íves/egyenes)",
    pavement_a_board_dibond:
      "Megállítótábla (A-Board B1/A1) & Homlokzati Dibond Cégtábla",
    indoor_wall_floor_tattoo:
      "Beltéri Irodai Falmatrica & Csúszásmentes Padlógrafika (R10 laminált)",
  };

  const substrateLabels: Record<string, string> = {
    rollup_film_240g: "240g Grayback Roll-up Film",
    one_way_vision_owv:
      "One-Way Vision (OWV) Perforált Ablakfólia + Optikai Laminálás",
    cast_vinyl_wrap:
      "3M / Avery / Oracal 3D Öntött Cast Légcsatornás Autófólia",
    plotter_cut_foil:
      "Plotterrel Vágott Színes / Homokfúvott Etched Glass Dekorfólia",
    pvc_frontlit_mesh: "510g Öntött PVC Molinó / 350g Mesh Épületháló",
    dibond_forex_board: "3mm Dibond Alumínium Szendvicslemez / 5mm Forex PVC",
  };

  const distanceLabels: Record<string, string> = {
    close_1_3m: "Közeli (1–3 m — beltér, recepció)",
    mid_3_10m: "Közepes (3–10 m — utcai kirakat, gyalogos)",
    far_10_30m: "Távoli / Mozgó (10–30+ m — közút, épületháló, autódekor)",
  };

  const userPrompt = `Tervezd meg a(z) "${validatedInput.campaignOrHeadline}" kampány/szolgáltatás dekorációját a(z) "${validatedInput.brandName}" márka számára.

Fő üzenet: ${validatedInput.campaignOrHeadline}
Márka: ${validatedInput.brandName}
Iparág: ${validatedInput.industry}
Formátum: ${formatLabels[validatedInput.signageFormat]}
Méret: ${validatedInput.dimensionsAndScale}
Hordozó/fólia: ${substrateLabels[validatedInput.substrateAndFoil]}
Olvasási távolság: ${distanceLabels[validatedInput.viewingDistance]}
Stílus: ${validatedInput.visualStyle || "szabad tervezői döntés"}
Színek: ${validatedInput.colorPreference || "szabad tervezői döntés"}
Kapcsolat/CTA: ${validatedInput.contactAndCta || "-"}

Adj vissza PONTOSAN a megadott JSON struktúrában. A zoneBreakdown a formátumhoz illő zónákat tartalmazza (magassági sávok, pozíciók, dead-zone-kerülés). A lfpTechnicalSpecs a MÉRETARÁNYOS valóságot tükrözze — 1:10-nél 30 DPI skála, minimum betűmagasság a távolsághoz. A szövegek MAGYARUL.`;

  try {
    // 6. Call Groq API
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

    // 7. Parse JSON output
    let parsedOutput: SignageGenerationOutput;
    try {
      parsedOutput = JSON.parse(content);
    } catch {
      return {
        success: false,
        error:
          "Nem sikerült értelmezni a generált tartalmat. Kérlek, próbáld újra!",
      };
    }

    // 8. Save to Firestore
    const db = getFirestore();
    await addDoc(collection(db, "ai_generations"), {
      userId: user.uid,
      userEmail: user.email,
      category: "signage_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Signage generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
