"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { verifyUserToken } from "./portal";
import {
  fetchUrlContent,
  extractMetaTags,
  extractHeadingStructure,
  analyzeContent,
  extractJsonLdSchema,
  generateSEOAuditPrompt,
  SEOAuditResult,
  extractCTAButtons,
  generateCompetitorAnalysisPromptComprehensive,
  generateContentPlanPrompt,
  generateKristofkaPitchPrompt,
} from "@/lib/ai-tools";

const aiGenerationSchema = z.object({
  category: z.enum([
    "product_desc",
    "review_assistant",
    "social_matrix",
    "cart_recovery",
    "midjourney_prompt",
    "banner_concept",
    "logo_designer",
    "ui_ux_designer",
    "seasonal_campaign_designer",
  ]),
  inputs: z.record(z.string(), z.string()),
});

/**
 * Server Action to call Groq API for Live AI Content Generation.
 * Strictly checks rate limit and auth token.
 */
export async function generateAIContentAction(
  idToken: string,
  category: string,
  inputs: Record<string, string>
) {
  // 1. Rate Limiting Check (max 15 generations per hour per client IP)
  const headersList = await headers();
  const req = { headers: headersList } as unknown as Request;
  const identifier = getClientIdentifier(req);
  const rateLimitResult = checkRateLimit(identifier, 15, 3600000); // 15 requests per hour

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
  const validation = aiGenerationSchema.safeParse({ category, inputs });
  if (!validation.success) {
    return {
      success: false,
      error: "Validációs hiba történt. Ellenőrizd a beviteli mezőket!",
      details: validation.error.flatten(),
    };
  }

  const { category: validatedCategory, inputs: validatedInputs } =
    validation.data;

  // 4. API Key Verification
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "Az AI szolgáltatás átmenetileg nem elérhető (hiányzó API kulcs).",
    };
  }

  // 5. Build prompt based on category
  let systemPrompt =
    "Te egy profi magyar e-kereskedelmi szövegíró, SEO és AEO szakértő vagy. Mindig a btshop.hu prémium márkahangján, meggyőzően, nyelvtanilag hibátlanul és kizárólag magyarul válaszolj.";
  let userPrompt = "";

  if (validatedCategory === "product_desc") {
    const name = validatedInputs.prodName || "";
    const specs = validatedInputs.prodSpecs || "Standard prémium termék";

    systemPrompt +=
      " Részletes, konverzió-optimalizált termékleírásokat írsz H2/H3 címsorokkal, bullet point előnyökkel és Schema.org FAQ vázlattal.";
    userPrompt = `Írj egy konverzió-optimalizált termékleírást és AEO sémát az alábbi termékről:\nTermék neve: \"${name}\"\nTulajdonságok: \"${specs}\"\n\nA kimenet formátuma:\n- H2 főcímsor (figyelemfelkeltő)\n- 2-3 bekezdéses kedvcsináló termékleírás\n- H3: \"Miért válaszd ezt a terméket?\" alatti bullet point előnyök (a vásárló hasznaival)\n- H3: \"Gyakran Ismételt Kérdések\" alatti 3 db FAQ kérdés-válasz pár\n- Schema.org JSON-LD FAQPage formátumú struktúrált adatkód a leírás végén (\`\`\`json blokkban)`;
  } else if (validatedCategory === "review_assistant") {
    const msg = validatedInputs.customerMsg || "";
    const tone =
      validatedInputs.tone === "profi"
        ? "Profi, megnyugtató és segítőkész"
        : "Lelkes, hálás és közvetlen";

    systemPrompt +=
      " Ügyfélszolgálati válaszokat írsz e-mailekre vagy Google véleményekre. Mindig védd a márka hírnevét és az E-E-A-T mutatókat.";
    userPrompt = `Írj egy válaszsablont az alábbi vásárlói megkeresésre:\nVásárló üzenete: \"${msg}\"\nElvárt hangnem: ${tone}\n\nBiztosítsd, hogy a válasz professzionális, segítőkész és elégedettséget növelő legyen. Úgy fogalmazz, mintha a btshop.hu hivatalos képviselője írná.`;
  } else if (validatedCategory === "social_matrix") {
    const theme = validatedInputs.campaignTheme || "";

    systemPrompt +=
      " E-kereskedelmi kampányterveket és social media mátrixokat készítesz.";
    userPrompt = `Készíts egy heti kampánymátrixot az alábbi promócióhoz:\nKampány/Akció témája: \"${theme}\"\n\nA kimenet tartalma:\n1. Facebook poszt szövege (emojikkal, erős CTA-val)\n2. Instagram vizuális ötlet / instrukció (milyen kép/videó kell)\n3. Fókuszált hírlevél sablon (3 tárgysor ötlettel és egyértelmű CTA gombbal)`;
  } else if (validatedCategory === "cart_recovery") {
    const offerType = validatedInputs.offerType || "free_shipping";
    const offerLabel =
      offerType === "free_shipping"
        ? "Ingyenes szállítás 24 órán belül"
        : offerType === "5_coupon"
          ? "5% extra kedvezmény kupon"
          : "10% kuponkód limitált ideig";

    systemPrompt +=
      " Kosárelhagyás-megmentő e-mail sablonokat írsz a konverziós pszichológia szabályai szerint.";
    userPrompt = `Írj 3 különböző stílusú kosárelhagyás-megmentő e-mailt a következő ajánlattal:\nAjánlat: \"${offerLabel}\"\n\nA 3 sablon az alábbi stílusokban készüljön:\n1. Sürgető / FOMO-alapú (a határidő vagy készlet szűkösségére építve)\n2. Humoros / Közvetlen (barátságos hangnem, ami megszünteti a vásárlási frikciót)\n3. Érték- és Garanciavezérelt (kiemelve a biztonságos fizetést, elállási jogot és a minőséget)`;
  } else if (validatedCategory === "midjourney_prompt") {
    const subject = validatedInputs.imgSubject || "";
    const style = validatedInputs.imgStyle || "cinematic";
    const aspectRatio = validatedInputs.imgAspectRatio || "16:9";
    const mood = validatedInputs.imgMood || "dramatic";

    systemPrompt =
      "You are an Elite Midjourney v6 Prompt Engineer. Your task is to generate highly optimized, professional image-generation prompts based on the user's concept, style, aspect ratio, and mood. You must construct the prompt using Midjourney v6 best practices:\n- Start with the core subject described in vivid, sensory detail.\n- Apply expert camera settings (e.g., 'photographed on 35mm lens, f/1.8, cinematic lighting, volumetric dust' for photos) or render engine details (e.g., 'Octane Render, Ray Tracing, Unreal Engine 5' for 3D).\n- Append official technical parameters strictly at the end: `--v 6.0`, `--style raw` (if photo), and the specified aspect ratio `--ar W:H`.\n- Do not use buzzwords like 'photorealistic', 'hyperrealistic', '4K', or '8K'. Use descriptive lighting terms instead.\nProvide the output in structured Hungarian:\n1. **Bemásolható Prompt:** (The exact English Midjourney prompt in a code block)\n2. **Magyar nyelvű koncepció leírás:** (Short summary of what is happening in the scene)\n3. **Szakmai tippek a testreszabáshoz:** (3 bullet points on how to tweak colors, objects, or parameters to fit different needs)";
    userPrompt = `Generate a Midjourney prompt for:\nSubject: ${subject}\nStyle: ${style}\nAspect Ratio: ${aspectRatio}\nMood: ${mood}`;
  } else if (validatedCategory === "banner_concept") {
    const topic = validatedInputs.bannerTopic || "";
    const platform = validatedInputs.bannerPlatform || "Facebook Cover";
    const brandVibe = validatedInputs.bannerBrandVibe || "cyber_gold";

    systemPrompt =
      "You are an Elite CRO (Conversion Rate Optimization) Art Director. Based on the user's business type and campaign goal, design a complete high-converting banner concept (e.g., Facebook Cover, Instagram Post, LinkedIn Banner, Webshop Hero).\nYour output must contain:\n1. **Vizuális Elrendezés (Layout Hierarchy):** Detailed description of the element placements (where the text goes, where the button goes, where the main subject is placed for optimal eye-tracking).\n2. **Konverziós Színpaletta (HEX):** 3-4 specific hex codes (Base, Surface, Accent/CTA, Text) that drive action based on color psychology.\n3. **Copywriting Javaslatok (Magyarul):\n- Primary Headline (Max 5-7 words, high emotional impact)\n- Secondary Subtitle (Supporting value proposition)\n- CTA Button Text (Action-oriented, e.g., 'Kérem a kedvezményt!')\n4. **Képgeneráló Prompt (DALL-E 3 / Midjourney):** A detailed English prompt to generate the perfect background image that fits this banner layout.";
    userPrompt = `Design a banner concept for:\nTopic/Promotion: ${topic}\nPlatform: ${platform}\nBrand Vibe: ${brandVibe}`;
  } else if (validatedCategory === "logo_designer") {
    const brandName = validatedInputs.logoBrandName || "";
    const industry = validatedInputs.logoIndustry || "";
    const coreValues = validatedInputs.logoCoreValues || "";

    systemPrompt =
      "You are a Senior Brand Identity Designer. Generate 3 distinct minimalist logo concept prompts based on the user's brand name, industry, and core values.\nFor each concept, provide:\n- **Koncepció Neve:** (e.g., Abstract Geometric, Monogram, Mascot)\n- **Képi Leírás (Magyarul):** Metaphorical description of the visual symbol.\n- **Angol Midjourney Prompt:** A clean vector-focused prompt. Use terms like 'minimalist logo, flat vector, clean lines, golden ratio, vector file, white background, no gradients --v 6.0 --style raw' to ensure clean, editable results.";
    userPrompt = `Create 3 logo concepts for:\nBrand Name: ${brandName}\nIndustry: ${industry}\nCore Values: ${coreValues}`;
  } else if (validatedCategory === "ui_ux_designer") {
    const targetAudience = validatedInputs.uiTargetAudience || "";
    const pageType = validatedInputs.uiPageType || "";

    systemPrompt =
      "You are a Senior UI/UX Designer. Based on the user's target audience and webpage type, outline a conversion-optimized wireframe.\nOutput must contain:\n1. **Szekcióról-szekcióra haladó felépítés:** A step-by-step wireframe structure (from Hero to Footer) detailing what content goes where.\n2. **Interaktivitási Javaslatok:** Micro-interactions, hover effects, and scroll-driven animation ideas.\n3. **UI Mockup Prompt:** A professional English Midjourney prompt to generate a beautiful, modern UI screen concept (e.g., 'premium dark mode web UI, SaaS dashboard, cyber-gold accents, clean grid, Figma design style --ar 16:9').";
    userPrompt = `Design UI wireframe & mockup concept for:\nPage Type: ${pageType}\nTarget Audience: ${targetAudience}`;
  } else if (validatedCategory === "seasonal_campaign_designer") {
    const season = validatedInputs.campaignSeason || "";
    const product = validatedInputs.campaignProduct || "";

    systemPrompt =
      "You are an Elite Retail & E-commerce Visual Merchandiser. Design a cohesive seasonal campaign concept based on the holiday/season and product type.\nOutput must include:\n1. **Kampány Hangulat & Stílus:** Visual theme, textures, and mood description.\n2. **Szezonális Színvilág:** Color codes matching the festive or seasonal vibe.\n3. **Fényképezési / Grafikai Prompt Sablon:** An English prompt template for generating thematic assets (e.g., 'Christmas flatlay of luxury cosmetics, pine branches, gold ornaments, soft bokeh --ar 1:1').";
    userPrompt = `Design a seasonal campaign visual concept for:\nSeason/Holiday: ${season}\nProduct/Service: ${product}`;
  }

  // 6. Make API call to Groq
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API Error:", errorText);
      let errorMessage =
        "Nem sikerült kapcsolatot teremteni az AI szolgáltatással.";

      try {
        const errorData = JSON.parse(errorText) as {
          error?: { message?: string };
        };
        errorMessage = errorData.error?.message || errorMessage;
      } catch {
        // If JSON parse fails, use the raw error text
        errorMessage = `API hiba (${response.status}): ${errorText}`;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content || "";

    if (!content) {
      return {
        success: false,
        error: "Az AI üres választ adott vissza. Kérlek, próbáld újra!",
      };
    }

    return {
      success: true,
      content,
    };
  } catch (error: unknown) {
    console.error("Groq API Exception:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a generálás közben.",
    };
  }
}

/**
 * Server Action for client to save a generated prompt/content to their notes collection.
 */
export async function saveClientNoteAction(
  idToken: string,
  title: string,
  content: string,
  category: string
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return {
      success: false,
      error: "Jogosulatlan hozzáférés. Kérlek, jelentkezz be újra!",
    };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Hiányzó projekt konfiguráció." };
  }

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/notes`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: {
          clientId: { stringValue: user.uid },
          title: { stringValue: title },
          content: { stringValue: content },
          category: { stringValue: category },
          createdAt: { timestampValue: new Date().toISOString() },
        },
      }),
    });

    if (!res.ok) {
      const errData = (await res.json()) as { error?: { message?: string } };
      return {
        success: false,
        error:
          errData.error?.message ||
          "Nem sikerült elmenteni a jegyzetet a Firestore-ban.",
      };
    }

    return {
      success: true,
      message: "Jegyzet sikeresen elmentve a projekthez!",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Hiba történt a mentés során.",
    };
  }
}

/**
 * Save an AI prompt generation record to Firestore.
 */
export async function saveAiGenerationAction(
  idToken: string,
  data: {
    toolId: string;
    toolName: string;
    inputValues: Record<string, string>;
    outputText: string;
  }
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase projekt konfiguráció hiányzik." };
  }

  try {
    let clientName = user.email;
    try {
      const userDocUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${user.uid}`;
      const userRes = await fetch(userDocUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (userRes.ok) {
        const userDoc = (await userRes.json()) as {
          fields?: { name?: { stringValue?: string } };
        };
        if (userDoc.fields?.name?.stringValue) {
          clientName = userDoc.fields.name.stringValue;
        }
      }
    } catch {
      // Use fallback
    }

    const createUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/ai_generations`;
    const res = await fetch(createUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: {
          clientId: { stringValue: user.uid },
          clientName: { stringValue: clientName },
          toolId: { stringValue: data.toolId },
          toolName: { stringValue: data.toolName },
          inputValues: { stringValue: JSON.stringify(data.inputValues) },
          outputText: { stringValue: data.outputText },
          createdAt: { stringValue: new Date().toISOString() },
        },
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        error: "Nem sikerült elmenteni az AI generálást.",
      };
    }

    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba a mentés során.",
    };
  }
}

export interface AiGenerationItem {
  id: string;
  clientId: string;
  clientName: string;
  toolId: string;
  toolName: string;
  inputValuesStr: string;
  outputText: string;
  createdAt: string;
}

/**
 * Retrieve the AI generation history of the currently authenticated client.
 */
export async function getClientAiGenerationsAction(idToken: string) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase projekt konfiguráció hiányzik." };
  }

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;

    const queryBody = {
      structuredQuery: {
        from: [{ collectionId: "ai_generations" }],
        where: {
          fieldFilter: {
            field: { fieldPath: "clientId" },
            op: "EQUAL",
            value: { stringValue: user.uid },
          },
        },
      },
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(queryBody),
    });

    if (!res.ok) {
      return {
        success: false,
        error: "Nem sikerült betölteni az AI előzményeket.",
      };
    }

    interface QueryResultItem {
      document?: {
        name: string;
        fields: Record<string, { stringValue?: string }>;
        createTime?: string;
      };
    }

    const rawData = (await res.json()) as QueryResultItem[];
    const generations: AiGenerationItem[] = [];

    if (Array.isArray(rawData)) {
      rawData.forEach((item) => {
        if (item.document) {
          const doc = item.document;
          const fields = doc.fields;
          const id = doc.name.split("/").pop() || "";

          generations.push({
            id,
            clientId: fields.clientId?.stringValue || "",
            clientName: fields.clientName?.stringValue || "",
            toolId: fields.toolId?.stringValue || "",
            toolName: fields.toolName?.stringValue || "",
            inputValuesStr: fields.inputValues?.stringValue || "{}",
            outputText: fields.outputText?.stringValue || "",
            createdAt: fields.createdAt?.stringValue || doc.createTime || "",
          });
        }
      });
    }

    generations.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return { success: true, generations };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba az előzmények lekérése során.",
    };
  }
}

/**
 * Delete an AI generation history item.
 */
export async function deleteAiGenerationAction(idToken: string, genId: string) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase projekt konfiguráció hiányzik." };
  }

  try {
    const docUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/ai_generations/${genId}`;
    const docRes = await fetch(docUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!docRes.ok) {
      return { success: false, error: "Az elem nem található." };
    }

    const doc = (await docRes.json()) as {
      fields: Record<string, { stringValue?: string }>;
    };
    const clientId = doc.fields?.clientId?.stringValue;

    if (!user.isAdmin && clientId !== user.uid) {
      return {
        success: false,
        error: "Nincs jogosultságod az elem törléséhez.",
      };
    }

    const deleteRes = await fetch(docUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!deleteRes.ok) {
      return { success: false, error: "Nem sikerült törölni az AI előzményt." };
    }

    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba a törlés során.",
    };
  }
}

/**
 * Retrieve all AI usage analytics (Admin Only).
 */
export async function getAdminAiAnalyticsAction(idToken: string) {
  try {
    const user = await verifyUserToken(idToken);
    if (!user || !user.isAdmin) {
      return {
        success: false,
        error: "Csak adminisztrátorok érhetik el ezt a funkciót.",
      };
    }

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId) {
      return {
        success: false,
        error: "Firebase projekt konfiguráció hiányzik.",
      };
    }

    try {
      const listUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/ai_generations?pageSize=500`;
      const res = await fetch(listUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!res.ok) {
        // Fallback: return empty stats instead of error
        console.error("AI analytics fetch error:", res.status, res.statusText);
        return {
          success: true,
          stats: {
            totalGenerations: 0,
            popularTools: [],
            activeClients: [],
            recentLogs: [],
          },
        };
      }

      const data = (await res.json()) as {
        documents?: Array<{
          name: string;
          fields: Record<string, { stringValue?: string }>;
        }>;
      };
      const docs = data.documents || [];

      const list = docs
        .map((doc) => {
          const fields = doc.fields;
          const id = doc.name.split("/").pop() || "";
          return {
            id,
            clientId: fields.clientId?.stringValue || "",
            clientName: fields.clientName?.stringValue || "",
            toolId: fields.toolId?.stringValue || "",
            toolName: fields.toolName?.stringValue || "",
            createdAt: fields.createdAt?.stringValue || "",
          };
        })
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

      const totalGenerations = list.length;
      const toolsMap: Record<string, number> = {};
      const clientsMap: Record<string, { name: string; count: number }> = {};

      list.forEach((item) => {
        toolsMap[item.toolName] = (toolsMap[item.toolName] || 0) + 1;

        if (!clientsMap[item.clientId]) {
          clientsMap[item.clientId] = { name: item.clientName, count: 0 };
        }
        clientsMap[item.clientId].count += 1;
      });

      const popularTools = Object.entries(toolsMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      const activeClients = Object.entries(clientsMap)
        .map(([id, info]) => ({ id, name: info.name, count: info.count }))
        .sort((a, b) => b.count - a.count);

      return {
        success: true,
        stats: {
          totalGenerations,
          popularTools,
          activeClients,
          recentLogs: list.slice(0, 15),
        },
      };
    } catch (fetchError) {
      console.error("AI analytics fetch exception:", fetchError);
      // Fallback: return empty stats instead of error
      return {
        success: true,
        stats: {
          totalGenerations: 0,
          popularTools: [],
          activeClients: [],
          recentLogs: [],
        },
      };
    }
  } catch (error: unknown) {
    console.error("AI analytics general error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba a statisztikák betöltésekor.",
    };
  }
}

/**
 * Server Action for AI SEO Audit
 * Analyzes a URL and provides SEO recommendations using Llama 3.3-70b
 */
export async function performSEOAuditAction(idToken: string, url: string) {
  // 1. Rate Limiting Check (max 5 audits per hour per client IP)
  const headersList = await headers();
  const req = { headers: headersList } as unknown as Request;
  const identifier = getClientIdentifier(req);
  const rateLimitResult = checkRateLimit(identifier, 5, 3600000); // 5 requests per hour

  if (!rateLimitResult.success) {
    return {
      success: false,
      error: "Túl sok audit kérés. Kérlek, várj egy órát az újabb audit előtt!",
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

  // 3. URL Validation
  try {
    new URL(url);
  } catch {
    return { success: false, error: "Érvénytelen URL formátum." };
  }

  // 4. Fetch and analyze URL content
  let html: string;
  try {
    html = await fetchUrlContent(url);
  } catch (error) {
    return {
      success: false,
      error: `Nem sikerült elérni az URL-t: ${error instanceof Error ? error.message : "Ismeretlen hiba"}`,
    };
  }

  // 5. Extract SEO data
  const metaTags = extractMetaTags(html);
  const headings = extractHeadingStructure(html);
  const contentAnalysis = analyzeContent(html);
  const jsonLdSchema = extractJsonLdSchema(html);

  // 6. Generate AI audit prompt
  const auditPrompt = generateSEOAuditPrompt(
    url,
    metaTags,
    headings,
    contentAnalysis,
    jsonLdSchema
  );

  // 7. Call Groq API for AI analysis
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "Az AI szolgáltatás átmenetileg nem elérhető (hiányzó API kulcs).",
    };
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "Te egy profi SEO és AEO szakértő vagy. Részletes, gyakorlatias auditokat készítesz magyarul. A válaszaidat mindig strukturált JSON formátumban add meg.",
            },
            { role: "user", content: auditPrompt },
          ],
          temperature: 0.5,
          max_tokens: 2048,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!response.ok) {
      const errorData = (await response.json()) as {
        error?: { message?: string };
      };
      return {
        success: false,
        error:
          errorData.error?.message ||
          "Nem sikerült kapcsolatot teremteni az AI szolgáltatással.",
      };
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content || "";

    if (!content) {
      return {
        success: false,
        error: "Az AI üres választ adott vissza. Kérlek, próbáld újra!",
      };
    }

    // 7. Parse AI response
    let aiAnalysis;
    try {
      aiAnalysis = JSON.parse(content);
    } catch {
      return {
        success: false,
        error: "Az AI válasz nem értelmezhető. Kérlek, próbáld újra!",
      };
    }

    // 8. Construct final result
    const result: SEOAuditResult = {
      url,
      score: aiAnalysis.score || 50,
      metaTags,
      headingStructure: headings,
      contentAnalysis,
      jsonLdSchema,
      recommendations: aiAnalysis.recommendations || [],
      gapAnalysis: aiAnalysis.gapAnalysis || {
        missingKeywords: [],
        competitorAdvantage: [],
      },
    };

    // 9. Save audit to Firestore
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (projectId) {
      try {
        let clientName = user.email;
        try {
          const userDocUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${user.uid}`;
          const userRes = await fetch(userDocUrl, {
            method: "GET",
            headers: { Authorization: `Bearer ${idToken}` },
          });
          if (userRes.ok) {
            const userDoc = (await userRes.json()) as {
              fields?: { name?: { stringValue?: string } };
            };
            if (userDoc.fields?.name?.stringValue) {
              clientName = userDoc.fields.name.stringValue;
            }
          }
        } catch {
          // Use fallback
        }

        const createUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/seo_audits`;
        await fetch(createUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            fields: {
              clientId: { stringValue: user.uid },
              clientName: { stringValue: clientName },
              url: { stringValue: url },
              score: { integerValue: result.score },
              recommendations: {
                arrayValue: {
                  values: result.recommendations.map((r) => ({
                    stringValue: r,
                  })),
                },
              },
              createdAt: { timestampValue: new Date().toISOString() },
            },
          }),
        });
      } catch {
        // Non-critical: log save failure but continue
      }
    }

    return {
      success: true,
      auditResult: result,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Hiba történt az audit során.",
    };
  }
}

/**
 * Server Action for AI Competitor Analysis
 * Analyzes target URL and competitor URLs for CRO comparison using Llama 3.3-70b
 */
export async function analyzeCompetitorsAction(
  idToken: string,
  targetUrl: string,
  competitorUrls: string[]
) {
  // 1. Rate Limiting Check (max 3 analyses per hour per client IP)
  const headersList = await headers();
  const req = { headers: headersList } as unknown as Request;
  const identifier = getClientIdentifier(req);
  const rateLimitResult = checkRateLimit(identifier, 3, 3600000); // 3 requests per hour

  if (!rateLimitResult.success) {
    return {
      success: false,
      error:
        "Túl sok elemzési kérés. Kérlek, várj egy órát az újabb elemzés előtt!",
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

  // 3. URL Validation
  try {
    new URL(targetUrl);
    competitorUrls.forEach((url) => new URL(url));
  } catch {
    return { success: false, error: "Érvénytelen URL formátum." };
  }

  // 4. Fetch and analyze target URL
  let targetHtml: string;
  try {
    targetHtml = await fetchUrlContent(targetUrl);
  } catch (error) {
    return {
      success: false,
      error: `Nem sikerült elérni a céloldalt: ${error instanceof Error ? error.message : "Ismeretlen hiba"}`,
    };
  }

  const targetMeta = extractMetaTags(targetHtml);
  const targetHeadings = extractHeadingStructure(targetHtml);
  const targetCTAs = extractCTAButtons(targetHtml);

  // 5. Fetch and analyze competitor URLs
  const competitors = [];
  for (const url of competitorUrls) {
    try {
      const html = await fetchUrlContent(url);
      competitors.push({
        url,
        meta: extractMetaTags(html),
        headings: extractHeadingStructure(html),
        ctas: extractCTAButtons(html),
      });
    } catch {
      // Skip failed competitor fetches but continue with others
      competitors.push({
        url,
        meta: { title: "", description: "", keywords: [] },
        headings: { h1: [], h2: [], h3: [] },
        ctas: [],
      });
    }
  }

  // 6. Generate AI analysis prompt
  const analysisPrompt = generateCompetitorAnalysisPromptComprehensive(
    targetUrl,
    targetMeta,
    targetHeadings,
    targetCTAs,
    competitors
  );

  // 7. Call Groq API for AI analysis
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "Az AI szolgáltatás átmenetileg nem elérhető (hiányzó API kulcs).",
    };
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "Te egy profi UX/CRO szakértő vagy. Részletes, gyakorlatias versenytárs-elemzéseket készítesz magyarul. A válaszaidat mindig strukturált JSON formátumban add meg.",
            },
            { role: "user", content: analysisPrompt },
          ],
          temperature: 0.5,
          max_tokens: 2048,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!response.ok) {
      const errorData = (await response.json()) as {
        error?: { message?: string };
      };
      return {
        success: false,
        error:
          errorData.error?.message ||
          "Nem sikerült kapcsolatot teremteni az AI szolgáltatással.",
      };
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content || "";

    if (!content) {
      return {
        success: false,
        error: "Az AI üres választ adott vissza. Kérlek, próbáld újra!",
      };
    }

    // 8. Parse AI response
    let aiAnalysis;
    try {
      aiAnalysis = JSON.parse(content);
    } catch {
      return {
        success: false,
        error: "Az AI válasz nem értelmezhető. Kérlek, próbáld újra!",
      };
    }

    // 9. Return result
    return {
      success: true,
      analysisResult: {
        targetUrl,
        targetScore: aiAnalysis.targetScore || {
          clarity: 50,
          ctaQuality: 50,
          overallUX: 50,
        },
        competitorScores: aiAnalysis.competitorScores || [],
        analysis: aiAnalysis.analysis || {
          visualStyleComparison: "",
          ctaComparison: "",
          valuePropComparison: "",
        },
        recommendations: aiAnalysis.recommendations || [],
        upsellOpportunity: aiAnalysis.upsellOpportunity || "",
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt az elemzés során.",
    };
  }
}

/**
 * Server Action for AI Content Planning
 * Generates a 3-month content calendar using Llama 3.3-70b
 */
export async function generateContentPlanAction(
  idToken: string,
  industry: string,
  targetAudience: string,
  mainProduct: string
) {
  // 1. Rate Limiting Check (max 10 plans per hour per client IP)
  const headersList = await headers();
  const req = { headers: headersList } as unknown as Request;
  const identifier = getClientIdentifier(req);
  const rateLimitResult = checkRateLimit(identifier, 10, 3600000); // 10 requests per hour

  if (!rateLimitResult.success) {
    return {
      success: false,
      error:
        "Túl sok tartalomtervezési kérés. Kérlek, várj egy órát az újabb tervezés előtt!",
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

  // 3. Input Validation
  if (!industry.trim() || !targetAudience.trim() || !mainProduct.trim()) {
    return { success: false, error: "Minden mező kitöltése kötelező!" };
  }

  // 4. Generate AI content planning prompt
  const contentPlanPrompt = generateContentPlanPrompt(
    industry,
    targetAudience,
    mainProduct
  );

  // 5. Call Groq API for AI analysis
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "Az AI szolgáltatás átmenetileg nem elérhető (hiányzó API kulcs).",
    };
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "Te egy profi tartalomstratégia szakértő vagy. Részletes, gyakorlatias tartalomterveket készítesz magyarul. A válaszaidat mindig strukturált JSON formátumban add meg.",
            },
            { role: "user", content: contentPlanPrompt },
          ],
          temperature: 0.7,
          max_tokens: 2048,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!response.ok) {
      const errorData = (await response.json()) as {
        error?: { message?: string };
      };
      return {
        success: false,
        error:
          errorData.error?.message ||
          "Nem sikerült kapcsolatot teremteni az AI szolgáltatással.",
      };
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content || "";

    if (!content) {
      return {
        success: false,
        error: "Az AI üres választ adott vissza. Kérlek, próbáld újra!",
      };
    }

    // 6. Parse AI response
    let aiAnalysis;
    try {
      aiAnalysis = JSON.parse(content);
    } catch {
      return {
        success: false,
        error: "Az AI válasz nem értelmezhető. Kérlek, próbáld újra!",
      };
    }

    // 7. Return result
    return {
      success: true,
      contentPlan: {
        industry,
        targetAudience,
        mainProduct,
        blogTopics: aiAnalysis.blogTopics || [],
        linkedinPosts: aiAnalysis.linkedinPosts || [],
        newsletterTopics: aiAnalysis.newsletterTopics || [],
        suggestedKeywords: aiAnalysis.suggestedKeywords || [],
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a tartalomtervezés során.",
    };
  }
}

export async function generateKristofkaPitchAction(
  idToken: string,
  params: {
    fileUrl: string;
    fileName: string;
    targetAudience: string;
    narrative: string;
    tone: string;
    energetikaiBesorolas?: string;
  }
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  // Rate limiting: 5 pitch/óra
  const headersList = await headers();
  const identifier = getClientIdentifier(
    new Request("https://dummy", { headers: headersList })
  );
  const rateLimitResult = await checkRateLimit(identifier, 5, 3600);
  if (!rateLimitResult.success) {
    return {
      success: false,
      error: "Túl sok generálási kérés. Várj 1 órát.",
    };
  }

  try {
    const prompt = generateKristofkaPitchPrompt(
      params.fileUrl,
      params.fileName,
      params.targetAudience,
      params.narrative,
      params.tone,
      params.energetikaiBesorolas
    );

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "Te egy veterán ingatlanbefektető és storytelling szakértő. A feladatod professzionális befektetői pitch generálása JSON formátumban.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error?.message || "AI API hiba történt.",
      };
    }

    const data = await response.json();
    const aiContent = data.choices[0]?.message?.content;

    if (!aiContent) {
      return { success: false, error: "Nem sikerült generálni a választ." };
    }

    // Parse JSON response
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return {
        success: false,
        error: "Nem sikerült értelmezni a JSON választ.",
      };
    }

    const aiAnalysis = JSON.parse(jsonMatch[0]);

    // Save to AI generations
    await saveAiGenerationAction(idToken, {
      toolId: "kristofka_workflow",
      toolName: "Kristófka Munkafolyamat",
      inputValues: {
        fileUrl: params.fileUrl,
        fileName: params.fileName,
        targetAudience: params.targetAudience,
        narrative: params.narrative,
        tone: params.tone,
      },
      outputText: aiContent,
    });

    return {
      success: true,
      result: {
        legacy: aiAnalysis.legacy || "",
        vision: aiAnalysis.vision || "",
        financial: aiAnalysis.financial || "",
        roi: aiAnalysis.roi || "",
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a Kristófka pitch generálás során.",
    };
  }
}
