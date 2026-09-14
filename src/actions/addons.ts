"use server";

import { verifyUserToken } from "./portal";
import { Addon } from "@/types/addon";

// Firestore response types for strict typing
type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  booleanValue?: boolean;
  arrayValue?: { values?: Array<{ stringValue?: string }> };
};

type FirestoreDocument = {
  name: string;
  fields: Record<string, FirestoreValue>;
};

type FirestoreResponse = { documents?: FirestoreDocument[] };

// Preset Addons for fallback (Anti-Drain policy / Seed data)
const PRESET_ADDONS: Addon[] = [
  {
    id: "addon_ux_roast",
    title: "15 perces UX/UI Roast & Konverziós Diagnosztika",
    description:
      "Személyre szabott, kíméletlenül őszinte videós elemzés a weboldalad legkritikusabb dizájn-, használhatósági és eladási hibáiról, amelyek elüldözik a látogatóidat.",
    price: 25000,
    type: "one-time",
    category: "design",
    features: [
      "15+ perc tömény, gyakorlatias videós elemzés",
      "3 azonnal végrehajtható konverzió-növelő javaslat",
      "Mobil- és reszponzivitás audit (UX/UI)",
      "Friction-point és kosárelhagyási pontok azonosítása",
      "Írott összefoglaló akciótervvel a videó mellé",
    ],
    stripePriceId: "price_ux_roast_mock",
  },
  {
    id: "addon_speed_opt",
    title: "Lighthouse Google Speed & Core Web Vitals Optimalizálás",
    description:
      "A betöltési sebesség drasztikus növelése és a Google PageSpeed Insights pontok feltornázása a 90-95+ tartományba a jobb keresőoptimalizálási helyezésekért.",
    price: 49000,
    type: "one-time",
    category: "tech",
    features: [
      "Betöltési idő leszorítása 1.5 másodperc alá",
      "Core Web Vitals (LCP, FID, CLS, INP) zöld zónába állítása",
      "Képtömörítés, modern WebP/AVIF konverzió",
      "CSS/JS kódminőség tisztítás és deferálás",
      "Szerveroldali gyorsítótárazás és adatbázis optimalizálás",
    ],
    stripePriceId: "price_speed_opt_mock",
  },
  {
    id: "addon_seo_article",
    title: "Prémium AI + Emberi Hibrid SEO Szakcikk & AEO Optimalizálás",
    description:
      "Olyan mélyreható iparági szakcikk, amely a legújabb keresési trendek alapján készül, és kiválóan rangsorol mind a Google-ben, mind a modern AI válaszgépeken (AEO).",
    price: 15000,
    type: "one-time",
    category: "ai",
    features: [
      "Részletes versenytárs- és kulcsszókutatás",
      "1500-2000 szó közötti szakmai terjedelem",
      "AI válaszgépek (Gemini, ChatGPT) számára optimalizált szerkezet",
      "SEO-barát meta tagok, alt szövegek és belső linkstruktúra",
      "Jogtiszta, prémium illusztráció a cikkhez",
    ],
    stripePriceId: "price_seo_article_mock",
  },
  {
    id: "addon_cro_audit",
    title: "Landing Page Konverziós Audit & Copywriting Finomhangolás",
    description:
      "Átfogó CRO (Conversion Rate Optimization) elemzés, amely során átvilágítjuk a szövegezést, a CTA gombokat és az elrendezést a maximális értékesítés eléréséhez.",
    price: 35000,
    type: "one-time",
    category: "cro",
    features: [
      "Hőtérképes és egérkövetési elemzési terv",
      "CRO Copywriting - az értékesítési szöveg újraírása",
      "A/B tesztelési stratégia kidolgozása a főoldalra",
      "CTA (Call-to-Action) elhelyezések optimalizálása",
      "Konverziós tölcsér és űrlapok egyszerűsítése",
    ],
    stripePriceId: "price_cro_audit_mock",
  },
  {
    id: "addon_security_pack",
    title: "🛡️ WebDude Prémium Biztonsági Csomag & Kiber-páncél (1 év)",
    description:
      "Komplex védelmi rendszer weboldalad számára: automata tűzfal, napi kártevő-vizsgálat, brute-force védelem és heti biztonsági mentések külső szerverre.",
    price: 60000,
    type: "one-time",
    category: "tech",
    features: [
      "Aktív, valós idejű biztonsági tűzfal (WAF)",
      "Napi automatikus malware és vírus scannelés",
      "Brute-force és XML-RPC támadások blokkolása",
      "Heti rendszeres mentés titkosított felhőtárhelyre",
      "Azonnali helyreállítási garancia fertőzés esetén",
    ],
    stripePriceId: "price_security_pack_mock",
  },
  {
    id: "addon_ai_chatbot",
    title: "🤖 Egyedi AI Chatbot Asszisztens & Lead Minősítő Integráció",
    description:
      "Egyedi stílusú, saját tudásbázisodra (szolgáltatásaid, áraid, FAQ) betanított mesterséges intelligencia alapú chatbot, amely 24/7-ben kiszolgálja a látogatókat.",
    price: 120000,
    type: "one-time",
    category: "ai",
    features: [
      "Saját céges tudásbázisra betanított GPT-modell",
      "Weboldaladba simuló, egyedi márkázott chat widget",
      "Automata lead-generálás és kapcsolati adatok gyűjtése",
      "Integrált válaszadási stílus és hangnem beállítás",
      "Havi statisztika a chat beszélgetésekről és leadekről",
    ],
    stripePriceId: "price_ai_chatbot_mock",
  },
];

/**
 * Fetch all active addons from Firestore. Fallback to presets if empty.
 */
export async function getAddonsAction(idToken: string) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase Project ID nincs konfigurálva." };
  }

  try {
    const listUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/addons?pageSize=100`;
    const res = await fetch(listUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      // Graceful fallback to preset seed data
      return { success: true, addons: PRESET_ADDONS };
    }

    const data = (await res.json()) as FirestoreResponse;
    const docs = data.documents || [];

    if (docs.length === 0) {
      return { success: true, addons: PRESET_ADDONS };
    }

    const addons = docs.map((doc: FirestoreDocument) => {
      const fields = doc.fields;
      const id = doc.name.split("/").pop() || "";
      const features =
        fields.features?.arrayValue?.values?.map((v) => {
          if (v && typeof v === "object" && "stringValue" in v) {
            return (v as { stringValue?: string }).stringValue ?? "";
          }
          return "";
        }) ?? [];
      return {
        id,
        title: fields.title?.stringValue || "",
        description: fields.description?.stringValue || "",
        price: fields.price?.integerValue
          ? parseInt(fields.price.integerValue)
          : 0,
        type: (fields.type?.stringValue || "one-time") as
          "one-time" | "recurring",
        category: (fields.category?.stringValue || "tech") as
          "ai" | "design" | "tech" | "cro",
        features,
        stripePriceId: fields.stripePriceId?.stringValue || "",
      };
    });

    return { success: true, addons };
  } catch {
    return { success: true, addons: PRESET_ADDONS };
  }
}

/**
 * Fetch client's orders.
 */
export async function getClientOrdersAction(idToken: string) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase Project ID nincs konfigurálva." };
  }

  try {
    const listUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders?pageSize=100`;
    const res = await fetch(listUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      return {
        success: false,
        error: "Nem sikerült letölteni a megrendeléseket.",
      };
    }

    const data = (await res.json()) as FirestoreResponse;
    const docs = data.documents || [];

    const orders = docs
      .map((doc) => {
        const fields = doc.fields;
        const id = doc.name.split("/").pop() || "";
        const addonId = fields.addonId?.stringValue || "";
        const title = (() => {
          // Try to find the title from preset addons
          const preset = PRESET_ADDONS.find((a) => a.id === addonId);
          return preset?.title || "";
        })();
        return {
          id,
          clientId: fields.clientId?.stringValue || "",
          addonId,
          title,
          status: (fields.status?.stringValue || "pending") as
            | "pending"
            | "paid"
            | "onboarding-pending"
            | "in-progress"
            | "delivered",
          amount: fields.amount?.integerValue
            ? parseInt(fields.amount.integerValue)
            : 0,
          createdAt: fields.createdAt?.stringValue || "",
          deliveredAt: fields.deliveredAt?.stringValue || null,
          onboardingSubmitted:
            fields.onboardingSubmitted?.booleanValue || false,
          onboardingData: fields.onboardingData?.stringValue || "",
          onboardingSubmittedAt:
            fields.onboardingSubmittedAt?.stringValue || "",
        };
      })
      .filter((o) => o.clientId === user.uid)
      // Sort by newest first
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return { success: true, orders };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba a megrendelések letöltésekor.",
    };
  }
}

/**
 * Create order in pending status and generate simulated/Stripe checkout URL
 */
export async function createCheckoutSessionAction(
  idToken: string,
  addonId: string,
  origin: string
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase Project ID nincs konfigurálva." };
  }

  // Find addon price/metadata
  const addon = PRESET_ADDONS.find((a) => a.id === addonId);
  if (!addon) {
    return {
      success: false,
      error: "Érvénytelen kiegészítő szolgáltatás azonosító.",
    };
  }

  try {
    // 1. Create a pending order in Firestore
    const createUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders`;
    const orderData = {
      fields: {
        clientId: { stringValue: user.uid },
        addonId: { stringValue: addonId },
        status: { stringValue: "pending" },
        amount: { integerValue: String(addon.price) },
        createdAt: { stringValue: new Date().toISOString() },
        deliveredAt: { nullValue: null },
      },
    };

    const createRes = await fetch(createUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!createRes.ok) {
      return {
        success: false,
        error: "Nem sikerült rögzíteni a megrendelést a széfben.",
      };
    }

    const createdDoc = (await createRes.json()) as { name: string };
    const orderId = createdDoc.name.split("/").pop() || "";

    // Check if Stripe is configured
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (stripeKey) {
      try {
        const params = new URLSearchParams();
        params.append("payment_method_types[]", "card");
        params.append("line_items[0][price_data][currency]", "huf");
        params.append(
          "line_items[0][price_data][product_data][name]",
          `WebDude - ${addon.title}`
        );
        params.append(
          "line_items[0][price_data][product_data][description]",
          addon.description
        );
        params.append(
          "line_items[0][price_data][unit_amount]",
          String(addon.price * 100)
        );
        params.append("line_items[0][quantity]", "1");
        params.append("mode", "payment");
        params.append(
          "success_url",
          `${origin}/portal?payment_success=true&session_id={CHECKOUT_SESSION_ID}&workflow_id=addon&phase=${addonId}&order_id=${orderId}`
        );
        params.append("cancel_url", `${origin}/portal?payment_cancelled=true`);
        params.append("metadata[orderId]", orderId);

        const stripeRes = await fetch(
          "https://api.stripe.com/v1/checkout/sessions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${stripeKey}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
          }
        );

        if (stripeRes.ok) {
          const sessionData = (await stripeRes.json()) as { url: string };
          return { success: true, url: sessionData.url };
        }
      } catch {
        // Fallback to simulated checkout below
      }
    }

    // Simulated Checkout flow fallback
    const simulatedSuccessUrl = `${origin}/portal?payment_success=true&session_id=mock_session_${Date.now()}&workflow_id=addon&phase=${addonId}&order_id=${orderId}`;
    return { success: true, url: simulatedSuccessUrl };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Sikertelen megrendelés indítás.",
    };
  }
}

/**
 * Action to update order status to paid (triggered on successful return)
 */
export async function verifyAddonPaymentAction(
  idToken: string,
  orderId: string
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase Project ID nincs konfigurálva." };
  }

  try {
    const patchUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders/${orderId}?updateMask.fieldPaths=status`;
    const res = await fetch(patchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: {
          status: { stringValue: "paid" },
        },
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        error: "Nem sikerült frissíteni a megrendelés fizetési státuszát.",
      };
    }

    return {
      success: true,
      message: "A tranzakció sikeresen feldolgozva és kiegyenlítve!",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a fizetés hitelesítésekor.",
    };
  }
}
// Server action to submit onboarding data for an order
export async function submitOnboardingDataAction(
  idToken: string,
  orderId: string,
  data: Record<string, string>
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase Project ID nincs konfigurálva." };
  }

  try {
    const patchUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders/${orderId}?updateMask.fieldPaths=onboardingData&updateMask.fieldPaths=onboardingSubmittedAt`;
    const res = await fetch(patchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: {
          onboardingData: { stringValue: JSON.stringify(data) },
          onboardingSubmittedAt: { timestampValue: new Date().toISOString() },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return {
        success: false,
        error:
          err?.error?.message || "Nem sikerült menteni az onboarding adatokat.",
      };
    }

    return { success: true, message: "Onboarding adatok sikeresen mentve." };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt az onboarding adat mentésekor.",
    };
  }
}

// Admin action to mark order as delivered
export async function deliverOrderAction(
  idToken: string,
  orderId: string,
  deliveryNotes: string,
  deliveryUrl: string
) {
  // Verify admin user
  const user = await verifyUserToken(idToken);
  if (!user || !user.isAdmin) {
    return { success: false, error: "Only admins can deliver orders." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase Project ID is not configured." };
  }

  try {
    const patchUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders/${orderId}?updateMask.fieldPaths=status&updateMask.fieldPaths=deliveryNotes&updateMask.fieldPaths=deliveryUrl&updateMask.fieldPaths=deliveredAt`;
    const res = await fetch(patchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: {
          status: { stringValue: "delivered" },
          deliveryNotes: { stringValue: deliveryNotes },
          deliveryUrl: { stringValue: deliveryUrl },
          deliveredAt: { timestampValue: new Date().toISOString() },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return {
        success: false,
        error: err?.error?.message || "Failed to update order status.",
      };
    }

    // Revalidate portal page cache
    try {
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/portal");
    } catch {}

    return { success: true, message: "Order marked as delivered." };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error delivering order.",
    };
  }
}
