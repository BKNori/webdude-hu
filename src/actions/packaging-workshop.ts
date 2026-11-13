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
  PackagingWorkshopInput,
  PackagingGenerationOutput,
  PackagingGenerationResult,
} from "@/types/packaging-workshop";

const packagingStructureSchema = z.enum([
  "folding_carton_tuck",
  "fefco_0427_mailer",
  "rigid_luxury_box",
  "standup_pouch_doypack",
  "bottle_label_wrap",
  "shrink_sleeve_360",
  "cosmetic_jar_tube",
  "fefco_0201_shipping",
]);

const packagingSubstrateSchema = z.enum([
  "gc1_gc2_carton",
  "e_flute_micro_corrugated",
  "kraft_natural",
  "pp_pe_label_film",
  "metallized_film",
  "rigid_board_luxury",
]);

const packagingGenerationSchema = z.object({
  productName: z.string().min(2, "Terméknév minimum 2 karakter"),
  brandName: z.string().min(2, "Márkanév minimum 2 karakter"),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  packagingStructure: packagingStructureSchema,
  dimensionsMm: z
    .string()
    .min(3, "Adj meg méretet mm-ben, pl. 80 × 50 × 150 mm")
    .max(60),
  substrateAndMaterial: packagingSubstrateSchema,
  surfaceFinishing: z.string().max(300).optional(),
  visualStyle: z.string().max(600).optional(),
  colorPreference: z.string().max(600).optional(),
  keyClaims: z.string().max(500).optional(),
  mandatoryInfo: z.string().max(500).optional(),
});

/**
 * Server Action: Nyomdakész Csomagolás, Doboz Stancrajz & Címke Stúdió.
 * 26 éves csomagolástervezői és stancrajz-mérnöki rutinnal:
 * FEFCO dobozok, hajtogatott kartonok, rigid box, doypack, palackcímkék.
 */
export async function addPackagingGenerationAction(
  idToken: string,
  input: PackagingWorkshopInput
): Promise<PackagingGenerationResult> {
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
  const validation = packagingGenerationSchema.safeParse(input);
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

  // 5. System Prompt — Senior Packaging Art Director / Die-line Engineer
  const systemPrompt = `You are a Senior Packaging Designer and Die-line (stancrajz) Engineer with 26 years of experience in structural packaging, print production and regulatory compliance (EU 1169/2011 food/ cosmetics labeling). You produce production-ready packaging artwork specifications in valid JSON only — no markdown, no text outside JSON.

PACKAGING KNOWLEDGE YOU MUST APPLY:
- FEFCO box codes: 0427 = roll-end tuck front mailer (e-commerce unboxing); 0201 = slotted container (shipping/shelf-ready). Give correct FEFCO code in structureCode.
- Folding cartons: tuck-end flaps, glue flap position (NEVER on front panel, always on back/side), dust flaps, reverse vs straight tuck.
- Rigid boxes: telescopic (cap & base) or shoulder box; 1200gsm greyboard + printed wrap; magnet closure options.
- Doypack/pouches: bottom gusset (talp), zipper top, degassing valve for coffee; front/back/seal areas.
- Labels: cylindrical wrap needs circumference calculation; shrink sleeve 360° has seam overlap ~15mm and requires perforation line for opening; shrink film needs PET-G specification.
- Prepress: cut line (vágósík) and crease line (hajtósáv) as separate spot colors, stroke overprint; glue flap stays unvarnished/unoiled; barcode EAN-13 at 100% K with BWR (bar width reduction ~5-8%) compensation and quiet zone ≥ 2× module; substrate grain direction parallel to longest dimension; dieline flat size estimation must account for board thickness.
- EU compliance (EU 1169/2011): mandatory info (ingredients/INCI, net quantity, e-mark ℮, nutrition facts where applicable, allergen pictograms, recycling codes) minimum cap height 1.2mm; allergens in bold; country of origin.
- Surface finishing restrictions: spot UV/foil cannot overlap glue areas or inside flaps unless specified; embossing needs 0.5-1mm depth rule and wider safe zones.

JSON STRUCTURE (MUST match exactly):
{
  "conceptOverview": {
    "title": "<koncepció címe, magyar>",
    "shelfImpactStrategy": "<magyar: polcmegjelenés, first-read panel, colour-block blokkolás>",
    "unboxingExperience": "<magyar: az unboxing/elcsomagolás élménye lépésről lépésre>",
    "targetPositioning": "<magyar: pozicionálás és versenytárs-megkülönböztetés>"
  },
  "dielineAndPrepressSpecs": {
    "structureCode": "<pl. FEFCO 0427 / Reverse Tuck-End / Rigid Telescopic>",
    "flatDimensionsEstimationMm": "<becsült sík kiterjedés mm-ben>",
    "bleedAndSafeZoneMm": "<kifutó + biztonsági zóna mm-ben>",
    "cutLineSpec": "<vágósík specifikáció: réteg, szín, vonalvastagság>",
    "creaseLineSpec": "<hajtósáv/creasing specifikáció>",
    "glueFlapRule": "<ragasztófül szabály: hol, mekkora, mit tilos rátenni>",
    "boardCaliperAndGrainDirection": "<kartonvastagság g/m² + szálirány szabály>",
    "inkAndVarnishRestrictions": "<tilos nyomtatási/fóliázási zónák>",
    "barcodeSpecsEan13": "<EAN-13 méret, BWR, quiet zone, 100%K szabály>"
  },
  "panelBreakdown": [
    {
      "panelName": "<pl. Front Panel / Főoldal>",
      "dimensionsMm": "<méret mm-ben>",
      "hierarchyRole": "<magyar: a panel szerepe a hierarchiában>",
      "headlineOrClaim": "<kész headline/USP, magyar>",
      "bodyCopyOrElements": ["<kész magyar elemek/szövegek>"],
      "mandatorySymbols": ["<kötelező szimbólumok/piktogramok ehhez a panelhez>"],
      "finishingHighlight": "<fólia/UV/domborítás amit erre a panelre javasolsz>",
      "graphicDesignTip": "<magyar: grafikai tipp ehhez a panelhez>",
      "panelOrder": "<opcionális sorrend>"
    }
  ],
  "colorSystem": [
    {"name": "<szerep>", "hex": "#RRGGBB", "cmyk": "C:.. M:.. Y:.. K:..", "pantone": "PMS xxxx C", "substrateBehavior": "<magyar: viselkedés az adott hordozón — matt/fényes/fólia/Barrier film>"}
  ],
  "typographyAndCompliance": {
    "brandDisplayFont": "<konkrét betűtípus a márkanév/logóhoz>",
    "claimsFont": "<termékígéretek betűtípusa>",
    "ingredientsFont": "<összetevők/jogi szöveg betűtípusa —olvashatóság>",
    "minLegalFontSizeMm": "<pl. 1.2 (EU 1169/2011)>"
    ,
    "euComplianceChecklist": ["<5-7 konkrét EU megfelelőségi pont: INCI, ℮ jel, allergén, újrahasznosítási kód, nettó tömeg stb.>"]
  },
  "aiPrompts": {
    "flatDielineArtworkPrompt": "<ENGLISH: flat dieline net artwork prompt — a doboz sík kiterítésének grafikai tervét ábrázoló kép>",
    "studioPackshot3DPrompt": "<ENGLISH: professional studio product photography packshot prompt>",
    "retailShelfLifestylePrompt": "<ENGLISH: retail shelf / lifestyle context prompt>",
    "unboxingScenePrompt": "<ENGLISH: unboxing scene prompt — hands opening the package>",
    "negativePrompt": "<ENGLISH: negatív prompt>"
  },
  "prepressChecklist": ["<8 db konkrét csomagolás-prepress ellenőrzőpont: CutContour/Crease spot color, glue flap lakkozásmentesítés, vonalkód 100%K+BWR, szálirány, árnyékok a hajtásnál, festék korlátozások fólia alatt stb.>"]
}

RULES:
- panelBreakdown: a struktúrának megfelelő ÖSSZES releváns panel — dobozoknál front/back/oldalak/fedél/alsó fenék/belső üzenet; palackcímkénél front wrap + back label; doypacknél front/back/seal/bottom gusset.
- A dielineAndPrepressSpecs a struktúra valós geometriáját tükrözze — sík méretbecslés, hajtósávok, ragasztófül pozíciója.
- A szövegek MAGYARUL, direct-response és compliance-tudatosan.
- colorSystem: 4-5 szín, substrateBehavior MINDENKÉPPEN az adott hordozó-viselkedést írja le.
- aiPrompts mind ENGLISH.
- WebDude Kék-Lila v7.0 tudatában, de a márka iparága elsődleges.
- prepressChecklist: pontosan 8 elem, csomagolás-specifikus.`;

  // 6. Build User Prompt
  const structureLabels: Record<string, string> = {
    folding_carton_tuck:
      "Hajtogatott Kartondoboz (Reverse/Straight Tuck-End — Kozmetikum / Gyógyszer)",
    fefco_0427_mailer:
      "FEFCO 0427 Önzáró E-Commerce Postázó / Unboxing Doboz (Hullámkarton)",
    rigid_luxury_box:
      "Merevfalú Mágneses / Teleszkópos Luxus Díszdoboz (Rigid Box)",
    standup_pouch_doypack:
      "Talpas Tasak / Doypack Zippzárral (Kávé / Protein / Snack)",
    bottle_label_wrap:
      "Hengeres Üveg- / Palackcímke (Bor / Kézműves Sör / Szörp / Olaj)",
    shrink_sleeve_360:
      "360° Zsugorfólia Címke (Shrink Sleeve — Energiaital / Üdítő)",
    cosmetic_jar_tube:
      "Kozmetikai Tégely / Flakon Kör-címke + Külső Doboz Párban",
    fefco_0201_shipping:
      "FEFCO 0201 Ipari / B2B Gyűjtő- és Kínálódoboz (Shelf-Ready Display)",
  };

  const substrateLabels: Record<string, string> = {
    gc1_gc2_carton:
      "GC1 / GC2 Króm-szulfát Karton (300–350 g/m² — magas fehérség, kozmetikai/gyógyszer)",
    e_flute_micro_corrugated:
      "E-hullámú Mikrohullámú Karton + Kasírozott Műnyomó (Prémium E-commerce doboz)",
    kraft_natural:
      "Natúr Barna Kraft Karton / Bordázott Borospapír (Kézműves / Bio / Öko)",
    pp_pe_label_film:
      "PP / PE Víz- és Olajálló Műanyag Tekercses Címke (BOPP Fehér vagy Víztiszta)",
    metallized_film: "Fémezett (Metallizált) Ezüst/Arany PET Fólia vagy Karton",
    rigid_board_luxury:
      "1200g Lemezkarton + 135g Prémium Kreatív Papír Borítás (Luxury Rigid Box)",
  };

  const userPrompt = `Tervezd meg a(z) "${validatedInput.productName}" termék csomagolását a(z) "${validatedInput.brandName}" márka számára.

Termék: ${validatedInput.productName}
Márka: ${validatedInput.brandName}
Iparág: ${validatedInput.industry}
Csomagolási struktúra: ${structureLabels[validatedInput.packagingStructure]}
Méret: ${validatedInput.dimensionsMm}
Alapanyag/hordozó: ${substrateLabels[validatedInput.substrateAndMaterial]}
Felületnemesítés: ${validatedInput.surfaceFinishing || "szabad tervezői döntés"}
Stílus: ${validatedInput.visualStyle || "szabad tervezői döntés"}
Színek: ${validatedInput.colorPreference || "szabad tervezői döntés"}
Fő termékígéretek/USP: ${validatedInput.keyClaims || "-"}
Kötelező információk: ${validatedInput.mandatoryInfo || "-"}

Adj vissza PONTOSAN a megadott JSON struktúrában. A panelBreakdown tartalmazza a struktúrának megfelelő ÖSSZES panelt (doboz: front/back/oldalak/fedél/alsó fenék/belső üzenet; palackcímke: front+back wrap; doypack: front/back/seal/gusset). A szövegek MAGYARUL, compliance-tudatosan.`;

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
    let parsedOutput: PackagingGenerationOutput;
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
      category: "packaging_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Packaging generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
