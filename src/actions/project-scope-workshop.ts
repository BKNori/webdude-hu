"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { verifyUserToken } from "./portal";
import { saveAiGeneration } from "@/lib/ai-generation-store";
import type {
  ProjectScopeInput,
  ProjectScopeOutput,
  ProjectScopeGenerationResult,
} from "@/types/project-scope-workshop";

const projectTypeSchema = z.enum([
  "corporate_website",
  "ecommerce_webshop",
  "custom_webapp_portal",
  "website_redesign_migration",
  "landing_funnel",
  "full_digital_launch",
]);

const recommendedStackSchema = z.enum([
  "nextjs_firebase",
  "wordpress_custom",
  "woocommerce_erp",
  "hybrid_headless",
  "ai_auto_recommend",
]);

const projectScopeSchema = z.object({
  clientName: z.string().min(2, "Ügyfélnév minimum 2 karakter"),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  rawClientBrief: z.string().min(20, "A brief minimum 20 karakter legyen"),
  projectType: projectTypeSchema,
  recommendedStack: recommendedStackSchema,
  requiredIntegrations: z.string().max(600).optional(),
  timelinePreference: z.string().max(120).optional(),
});

/**
 * Server Action: Ügyfél-Brief -> Weboldal/Webshop Architektúra, Sitemap &
 * Árajánlat Tervező Stúdió. ZÉRÓ FIX ÁR SZABÁLY.
 */
export async function addProjectScopeGenerationAction(
  idToken: string,
  input: ProjectScopeInput
): Promise<ProjectScopeGenerationResult> {
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
  const validation = projectScopeSchema.safeParse(input);
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

  // 5. System Prompt — WebDude Lead Architect (26 év grafika + 16 év web)
  const systemPrompt = `You are the WebDude Lead Architect: Balog Norbert's AI systems engineer persona with 26 years of graphic design and 16 years of web development experience. You design premium websites, webshops, portals and digital launches for Hungarian clients.

ABSOLUTE RULES (ZERO TOLERANCE):
- NEVER write a fixed price in HUF or EUR anywhere — not in tierPackages, not in the proposal email, not anywhere. Every tier's priceLabel MUST be exactly "Egyedi árajánlat alapján". No "~100.000 Ft", no "from X", no currency figures of any kind.
- All user-facing Hungarian copy must be direct, confident, first-person singular ("én", "segítek", "készítem") — never "mi", "csapatunk".
- Balance technical depth with business language: every technology recommendation must include a clientBenefit phrased in business value (speed, security, easy management, SEO, conversion).
- WebDude E-E-A-T: one person handles design + development + technical SEO/AEO/GEO + server integrations end-to-end.

OUTPUT: valid JSON only — no markdown, no text outside JSON.

JSON STRUCTURE (MUST match exactly):
{
  "executiveSummary": {
    "projectTitle": "<magyar projekt cím>",
    "businessObjective": "<1-2 mondat: üzleti cél a brief alapján>",
    "targetConversionGoal": "<konkrét konverziós cél: lead, vásárlás, időpontfoglalás stb.>",
    "recommendedTechStack": "<stack magyarázat 1-2 mondatban>",
    "techStackClientBenefits": [
      {"technology": "<tech>", "clientBenefit": "<üzleti előny magyarul>"}
    ]
  },
  "sitemapAndSeoArchitecture": [
    {
      "pageName": "<magyar oldalnév>",
      "urlSlug": "</slo/g...>",
      "pagePurpose": "<magyar: az oldal funkciója>",
      "recommendedH1": "<javasolt H1>",
      "keySections": ["<fő szekciók>"],
      "schemaOrgTypes": ["LocalBusiness", "Service", "FAQPage", "Product", "BreadcrumbList"],
      "aeoDirectAnswerFocus": "<milyen kérdésre adjon közvetlen választ az oldal az AI search-nek>"
    }
  ],
  "tierPackages": [
    {
      "tierName": "Start / Alap" | "Pro / Üzleti Növekedés" | "Enterprise / Teljes Automatizáció",
      "badge": "<pl. Ajánlott / Legnépszerűbb / B2B Enterprise>",
      "idealFor": "<kinek ideális>",
      "deliverables": ["<konkrét deliverable-ek>"],
      "includedIntegrations": ["<integrációk>"],
      "estimatedWeeks": "<pl. 3-4 hét>",
      "priceLabel": "Egyedi árajánlat alapján",
      "ctaText": "<pl. Ingyenes konzultáció igénylése>"
    }
  ],
  "milestoneRoadmap": [
    {
      "phaseNumber": 1,
      "phaseTitle": "<fázisnév>",
      "durationWeeks": "<pl. 1-2 hét>",
      "tasks": ["<feladatok>"],
      "clientDeliverable": "<amit az ügyfél kap ebben a fázisban>"
    }
  ],
  "riskAndPreconditions": ["<8-10 pont: mit kell az ügyféltől + milyen kockázatokat védünk ki — pl. 301 redirect térkép migrációnál, tartalomátadás, DNS>"],
  "clientProposalEmail": "<kész, másolható, személyes magyar árajánlat-kísérőlevél Balog Norbert nevében — üdvözlés, a brief megértésének összefoglalása, 3 csomag-szint említése ÁR NÉLKÜL, következő lépés (ingyenes konzultáció), aláírás. 4-6 bekezdés, formázás \n-szel>"
}

RULES:
- sitemapAndSeoArchitecture: 6-10 kulcsoldal a projekttípushoz illeszkedve (pl. webshop: főoldal, terméklista/kategóriák, termékoldal sablon, kosár, fizetés, szállítás, blog/hírlevél, GDPR/ÁSZF).
- tierPackages: MINDIG pontosan 3 csomag, a középső Pro kapja az "Ajánlott" badge-et.
- milestoneRoadmap: MINDIG 5 fázis (Stratégia & Drótváz → UI/UX & Arculat → Fejlesztés & Integrációk → Technikai SEO/AEO & QA → Élesítés & Betanítás).
- riskAndPreconditions: projekttípus-specifikus (migrációnál kötelezően 301 redirect terv, tartalom/WC export, backup; webshopnál termékadat-export, fizetési/számlázó API-hozzáférések).
- clientProposalEmail: magyar, meggyőző, fix ár EMUTATÁSA NÉLKÜL, az "egyedi árajánlat" megközelítést magabiztosan kommunikálja.`;

  const projectTypeLabels: Record<string, string> = {
    corporate_website:
      "Prémium Céges Weboldal & Lead-Generáló Rendszer",
    ecommerce_webshop:
      "Automatizált Webáruház (WooCommerce / Next.js Commerce)",
    custom_webapp_portal:
      "Egyedi Webalkalmazás, Ügyfélportál & AI Integráció",
    website_redesign_migration:
      "Elavult Weboldal Felújítás, Sebesség- & SEO Migráció",
    landing_funnel:
      "High-Conversion Kampány Landing Page & Sales Funnel",
    full_digital_launch:
      "Teljes Digitális Indulás (Logó + Arculat + Weboldal + SEO)",
  };

  const stackLabels: Record<string, string> = {
    nextjs_firebase:
      "Next.js 16 + React 19 + Tailwind v4 + Firebase (Ultragyors Custom Stack)",
    wordpress_custom:
      "Egyedi WordPress + Tiszta Gutenberg (Könnyen szerkeszthető, 95+ PageSpeed)",
    woocommerce_erp:
      "WooCommerce + ERP / Számlázó & Logisztikai API Szinkron",
    hybrid_headless:
      "Headless WordPress / WooCommerce + Next.js Frontend",
    ai_auto_recommend:
      "AI Rendszermérnök javasolja a brief alapján",
  };

  const userPrompt = `Ügyfél: ${validatedInput.clientName}
Iparág: ${validatedInput.industry}
Projekttípus: ${projectTypeLabels[validatedInput.projectType]}
Technológiai irány: ${stackLabels[validatedInput.recommendedStack]}
Integrációk/fókuszok: ${validatedInput.requiredIntegrations || "-"}
Ütemezési cél: ${validatedInput.timelinePreference || "-"}

NYERS ÜGYFÉL-BRIEF (e-mail / igénylista / üzleti cél):
"""
${validatedInput.rawClientBrief}
"""

Tervezd meg a projektet: sitemap + SEO/AEO architektúra, 3 csomagszint (ZÉRÓ FIX ÁR!), 5 fázisú roadmap, kockázat/precondition lista és a kész ügyfél árajánlat-kísérőlevél. Minden válasz MAGYARUL, a technológiai döntéseket üzleti előnyre fordítva.`;

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
    let parsedOutput: ProjectScopeOutput;
    try {
      parsedOutput = JSON.parse(content);
    } catch {
      return {
        success: false,
        error:
          "Nem sikerült értelmezni a generált tartalmat. Kérlek, próbáld újra!",
      };
    }

    // 8. ZÉRÓ FIX ÁR GARANCIA — ha az AI mégis árat írt volna, felülírjuk.
    parsedOutput.tierPackages?.forEach((tier) => {
      tier.priceLabel = "Egyedi árajánlat alapján";
    });

    // Save to Firestore (Admin SDK vagy REST fallback — soha nem dob hibát)
    await saveAiGeneration({
      idToken,
      userId: user.uid,
      userEmail: user.email,
      category: "project_scope_ai_muhely",
      input: validatedInput,
      output: parsedOutput,
    });

    return {
      success: true,
      output: parsedOutput,
    };
  } catch (error) {
    console.error("Project scope generation error:", error);
    return {
      success: false,
      error: "Hiba történt a generálás során. Kérlek, próbáld újra!",
    };
  }
}
