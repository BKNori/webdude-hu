import { createOpenAI } from "@ai-sdk/openai";
import { streamText, tool, convertToModelMessages, type UIMessage } from "ai";
import { z } from "zod";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

/** Konfiguráció-hiba: nem a felhasználó hibája, de nem is 500. */
class ChatConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatConfigError";
  }
}

/**
 * Groq API integráció (OpenAI-kompatibilis végpont).
 *
 * **Miért dinamikusan épül a provider?**
 * A `createOpenAI` modul-szinten futott, és a `process.env.GROQ_API_KEY`
 * értékét **betöltéskor** kapta meg. Ha a kulcs hiányzik (pl. hibás
 * `.env.local`, vagy a Firebase Hosting eltérő env-kezelése), akkor
 * `apiKey: undefined` lett → a `streamText` hívás `TypeError`-rel
 * elhasalt → a route 500-at adott → az AI SDK `useChat` hibát jelzett →
 * a felhasználó a "Valami hiba történt a csatlakozás során" semleges
 * üzenetet látta, diagnosztika nélkül.
 *
 * A `getGroq()` most **kérésenként** ellenőrzi a kulcsot, és ha hiányzik,
 * **emberi olvasásra szánt hibát** ad vissza (503 + magyar üzenet),
 * nem egy rejtélyes 500-at. Így a kliens értelmes hibaobjektumot kap,
 * és a naplóban egyértelműen látszik, hogy a konfiguráció hiányzik.
 */
function getGroq() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new ChatConfigError(
      "Az AI asszisztens nincs konfigurálva (hiányzó GROQ_API_KEY)."
    );
  }
  return createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey,
  });
}

/** A felhasználónak megjelenítendő, technikai részletek nélküli hiba. */
const FRIENDLY_ERRORS: Record<string, string> = {
  rate_limit: "Túl sok kérés érkezett. Kérlek, várj egy percet, majd próbáld újra.",
  config: "Az AI asszisztens jelenleg nem elérhető. Kérlek, írj emailt, és szívesen segítek!",
  upstream: "Az AI asszisztens nem tudott válaszolni. Kérlek, próbáld meg újra!",
  generic: "Valami hiba történt. Kérlek, próbáld meg újra!",
};

/** Hiba → felhasználóbarát kód + HTTP státusz. */
function toFriendlyError(error: unknown): {
  code: string;
  message: string;
  status: number;
} {
  if (error instanceof ChatConfigError) {
    return {
      code: "config",
      message: FRIENDLY_ERRORS.config,
      status: 503,
    };
  }

  const raw = error instanceof Error ? error.message : String(error ?? "");

  // Rate limit a Groq upstreamjétől.
  if (/rate.?limit|429/i.test(raw)) {
    return {
      code: "rate_limit",
      message: FRIENDLY_ERRORS.rate_limit,
      status: 429,
    };
  }

  // Hálózati/szolgáltatói hiba (DNS, timeout, 5xx).
  if (/fetch failed|ECONNREFUSED|ETIMEDOUT|ENOTFOUND|network/i.test(raw)) {
    return {
      code: "upstream",
      message: FRIENDLY_ERRORS.upstream,
      status: 502,
    };
  }

  // Minden más: a technikai részlet a szerver logjába megy,
  // a felhasználó csak a semleges üzenetet látja.
  console.error("[chat] nem kezelt hiba:", raw);
  return {
    code: "generic",
    message: FRIENDLY_ERRORS.generic,
    status: 500,
  };
}

export async function POST(req: Request) {
  try {
    // Rate limiting check (max 20 requests per minute per client)
    const identifier = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(identifier, 20, 60000);

    if (!rateLimitResult.success) {
      return new Response(
        JSON.stringify({
          error: FRIENDLY_ERRORS.rate_limit,
          code: "rate_limit",
          resetTime: rateLimitResult.resetTime,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Reset": String(rateLimitResult.resetTime || 0),
            "Retry-After": "60",
          },
        }
      );
    }

    // A provider kérésenként épül fel → hiányzó kulcs esetén a
    // `ChatConfigError` 503-at vált, nem egy rejtélyes TypeError.
    const groq = getGroq();

    const { messages } = (await req.json()) as { messages: UIMessage[] };

    const result = await streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages: await convertToModelMessages(messages),
      system: `Te a WebDude.hu digitális projektmenedzsere és lead minősítő asszisztense vagy.
A megbízód Norbi (WebDude), aki egy high-end digitális kézműves, fejlesztő és designer.
Szakterületeid, amelyekben szolgáltatásokat kínálunk az ügyfeleknek:
1. Egyedi SaaS/Webapp fejlesztés (Next.js 16, React 19, Tailwind CSS 4, Node.js standalone backend)
2. E-commerce webáruház készítés (WordPress + WooCommerce alapú konverzió-optimalizált rendszerek)
3. Vizuális Identitás (Egyedi arculattervezés, prémium logó, csomagolás és nyomdai előkészítés)
4. AI Rendszerek & Vállalati munkafolyamat automatizálás (AI Prompt Engineering, integrált ügynökök)
5. WordPress vírusirtás, biztonsági audit és karbantartás

Szabályok a viselkedésedre:
- Légy rendkívül professzionális, segítőkész, határozott, célorientált és tömör.
- SOHA ne adj meg konkrét fix árat, vagy árajánlatot! Ehelyett hangsúlyozd, hogy minden projekt egyedi felmérést igényel, és Norbi fogja elkészíteni a személyre szabott ajánlatot a lead adatok alapján.
- Aktívan próbáld minősíteni a leadeket (kérdezz rá a célokra, elvárt határidőre, a projektre szánt büdzsé nagyságrendjére).
- Ha a látogató érdeklődik a referenciáink iránt, hívd meg a 'getPortfolio' eszközt a megfelelő kategóriával (saas, wordpress, design, ai). A visszakapott eredményt foglald össze röviden, és ajánld fel a linkeket a bemutatáshoz.
- Ha a beszélgetés során körvonalazódott a projekt igénye és a látogató komolyan érdeklődik, proaktívan kérd el a nevét, e-mail címét, és hívd meg a 'saveLead' eszközt az adataik mentéséhez. Ígérd meg nekik, hogy Norbi 24 órán belül felveszi velük a kapcsolatot.`,
      tools: {
        getPortfolio: tool({
          description:
            "Lekéri a kategóriának megfelelő (saas, wordpress, design, ai) WebDude referenciákat a portfólióból.",
          inputSchema: z.object({
            category: z
              .enum(["saas", "wordpress", "design", "ai"])
              .describe("A kért portfólió kategória"),
          }),
          execute: async ({
            category,
          }: {
            category: "saas" | "wordpress" | "design" | "ai";
          }) => {
            try {
              const { collection, query, where, getDocs } =
                await import("firebase/firestore");
              const { db } = await import("@/lib/firebase");

              const portfolioRef = collection(db!, "portfolio");
              const q = query(portfolioRef, where("category", "==", category));
              const snapshot = await getDocs(q);

              let items: Array<{
                id: string;
                title: string;
                tag: string;
                description: string;
                slug?: string;
              }> = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                  id: doc.id,
                  title: String(data.title || ""),
                  tag: String(data.tag || ""),
                  description: String(data.description || ""),
                  slug: data.slug ? String(data.slug) : undefined,
                };
              });

              // Robust Fallback: ha a Firestore portfolio kollekció még üres,
              // a helyi statikus projects.js fájlból szűrünk kategóriák szerint,
              // így a demo/asszisztens azonnal működőképes.
              if (items.length === 0) {
                interface FallbackProject {
                  id: string;
                  slug: string;
                  title: string;
                  tag: string;
                  description: string;
                  challenge: string;
                  solution: string;
                  result: string;
                  assets: {
                    hero?: string;
                    videoMac?: string;
                    videoIphone?: string;
                    mockup?: string;
                    tablet?: string;
                  };
                  keywords?: string[];
                }

                const { projects } = await import("@/data/projects");
                items = (projects as unknown as Omit<FallbackProject, "id">[])
                  .map((p) => ({
                    id: p.slug,
                    slug: p.slug,
                    title: p.title,
                    tag: p.tag,
                    description: p.description,
                    challenge: p.challenge,
                    solution: p.solution,
                    result: p.result,
                    assets: p.assets || {},
                    keywords: p.keywords || [],
                  }))
                  .filter((p: FallbackProject) => {
                    const tagLower = (p.tag || "").toLowerCase();
                    const descLower = (p.description || "").toLowerCase();
                    const keysLower = p.keywords
                      ? p.keywords.map((k: string) => k.toLowerCase())
                      : [];

                    if (category === "wordpress") {
                      return (
                        tagLower.includes("wordpress") ||
                        tagLower.includes("webshop") ||
                        tagLower.includes("woocommerce") ||
                        descLower.includes("wordpress") ||
                        descLower.includes("woocommerce")
                      );
                    }
                    if (category === "saas") {
                      return (
                        keysLower.includes("next.js fejlesztés") ||
                        descLower.includes("next.js") ||
                        descLower.includes("saas") ||
                        descLower.includes("webapp")
                      );
                    }
                    if (category === "design") {
                      return (
                        tagLower.includes("arculat") ||
                        tagLower.includes("grafika") ||
                        tagLower.includes("branding") ||
                        tagLower.includes("design")
                      );
                    }
                    if (category === "ai") {
                      return (
                        descLower.includes("ai") ||
                        descLower.includes("workflow") ||
                        descLower.includes("mesterséges")
                      );
                    }
                    return false;
                  });
              }

              return { items };
            } catch (error: unknown) {
              const errorMessage =
                error instanceof Error ? error.message : "Ismeretlen hiba";
              return { error: errorMessage, items: [] };
            }
          },
        }),
        saveLead: tool({
          description:
            "Elmenti a látogató (lead) adatait és a projekt részleteit a Firestore-ba.",
          inputSchema: z.object({
            name: z.string().describe("A látogató neve"),
            email: z.string().email().describe("A látogató e-mail címe"),
            projectType: z
              .enum(["saas", "wordpress", "design", "ai"])
              .describe("A tervezett projekt típusa"),
            summary: z
              .string()
              .describe(
                "Rövid összefoglaló a projekt igényeiről és az AI által végzett előminősítésről"
              ),
          }),
          execute: async ({
            name,
            email,
            projectType,
            summary,
          }: {
            name: string;
            email: string;
            projectType: "saas" | "wordpress" | "design" | "ai";
            summary: string;
          }) => {
            try {
              const { collection, addDoc } = await import("firebase/firestore");
              const { db } = await import("@/lib/firebase");

              const leadsRef = collection(db!, "leads");
              const docRef = await addDoc(leadsRef, {
                name,
                email,
                projectType,
                summary,
                createdAt: new Date().toISOString(),
              });

              return {
                success: true,
                message:
                  "A lead adatai sikeresen elmentve. Norbi hamarosan keresni fogja Önt!",
                id: docRef.id,
              };
            } catch (error: unknown) {
              const errorMessage =
                error instanceof Error ? error.message : "Ismeretlen hiba";
              return { success: false, error: errorMessage };
            }
          },
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error: unknown) {
    /**
     * **Nem omlik össze a Server Action/route.** A korábbi catch a
     * nyers `error.message`-et küldte vissza 500-as státusszal — ez
     * a kliensen a semleges "Valami hiba történt a csatlakozás során"
     * üzenetet eredményezte, diagnosztika nélkül.
     *
     * Most: (a) a hiba kód- és státusz-hozzárendelést kap
     * (`config` → 503, `rate_limit` → 429, `upstream` → 502), és
     * (b) a felhasználó magyar, technikai részlet nélküli üzenetet kap,
     * miközben a teljes stack a **szerver logjába** kerül.
     */
    const friendly = toFriendlyError(error);
    return new Response(
      JSON.stringify({ error: friendly.message, code: friendly.code }),
      {
        status: friendly.status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
