"use server";

import { verifyUserToken } from "./portal";

// Helper translation for phase labels
const PHASE_LABELS: Record<string, string> = {
  planning: "Stratégia és Tervezés",
  development: "Fejlesztés",
  testing: "Tesztelés / QA",
  ai_integration: "AI Integráció & AEO",
  completed: "Átadás / Befejezés",
};

// Add-ons configuration
export const ADDONS_CONFIG: Record<
  string,
  { name: string; price: number; desc: string }
> = {
  addon_seo_article: {
    name: "🚀 Extra AI SEO Cikk (1 db)",
    price: 15000,
    desc: "Konverzió-optimalizált, keresőbarát szakcikk megírása és publikálása.",
  },
  addon_speed_opt: {
    name: "⚡ Webhely Sebesség Optimalizálás",
    price: 45000,
    desc: "Lighthouse pontszámok maximalizálása, betöltési sebesség radikális növelése.",
  },
  addon_security_pack: {
    name: "🛡️ Prémium Biztonsági Csomag (1 év)",
    price: 60000,
    desc: "Automatikus tűzfal, folyamatos malware scannelés és heti mentések.",
  },
  addon_ai_chatbot: {
    name: "🤖 Egyedi AI Chatbot Asszisztens",
    price: 120000,
    desc: "Saját tudásbázissal és egyedi stílussal rendelkező chatbot integrációja.",
  },
};

/**
 * Create a Stripe Checkout Session for a specific workflow milestone phase.
 */
export async function createStripeCheckoutSessionAction(
  idToken: string,
  workflowId: string,
  phase: string,
  origin: string
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return {
      success: false,
      error:
        "A Stripe fizetési kapu (STRIPE_SECRET_KEY) nincs konfigurálva a szerveren.",
    };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase projekt konfiguráció hiányzik." };
  }

  // Handle Add-on purchases
  if (workflowId === "addon" || phase.startsWith("addon_")) {
    const addon = ADDONS_CONFIG[phase];
    if (!addon) {
      return { success: false, error: "Érvénytelen kiegészítő szolgáltatás." };
    }

    try {
      const params = new URLSearchParams();
      params.append("payment_method_types[]", "card");
      params.append("line_items[0][price_data][currency]", "huf");
      params.append(
        "line_items[0][price_data][product_data][name]",
        `WebDude - ${addon.name}`
      );
      params.append(
        "line_items[0][price_data][product_data][description]",
        addon.desc
      );
      // For HUF currency Stripe expects amount in the smallest unit (forint), no cents multiplication
      params.append(
        "line_items[0][price_data][unit_amount]",
        String(addon.price)
      );
      params.append("line_items[0][quantity]", "1");
      params.append("mode", "payment");

      params.append(
        "success_url",
        `${origin}/portal?payment_success=true&session_id={CHECKOUT_SESSION_ID}&workflow_id=addon&phase=${phase}`
      );
      params.append("cancel_url", `${origin}/portal?payment_cancelled=true`);

      params.append("metadata[workflowId]", "addon");
      params.append("metadata[phase]", phase);
      params.append("metadata[clientId]", user.uid);

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

      if (!stripeRes.ok) {
        const err = (await stripeRes.json()) as {
          error?: { message?: string };
        };
        return {
          success: false,
          error:
            err.error?.message ||
            "Hiba történt a Stripe munkamenet létrehozásakor.",
        };
      }

      const sessionData = (await stripeRes.json()) as {
        id: string;
        url: string;
      };

      // Write pending order in Firestore orders collection
      const orderData = {
        fields: {
          clientId: { stringValue: user.uid },
          addonId: { stringValue: phase },
          title: { stringValue: addon.name },
          status: { stringValue: "pending" },
          amount: { integerValue: String(addon.price) },
          createdAt: { stringValue: new Date().toISOString() },
          deliveredAt: { nullValue: null },
          stripeSessionId: { stringValue: sessionData.id },
        },
      };

      const createOrderUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders`;
      await fetch(createOrderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(orderData),
      });

      return { success: true, url: sessionData.url };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Ismeretlen hiba a Stripe fizetés indításakor.",
      };
    }
  }

  try {
    // 1. Fetch workflow from Firestore REST API
    const wfUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/workflows/${workflowId}`;
    const wfRes = await fetch(wfUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!wfRes.ok) {
      return {
        success: false,
        error: "Nem sikerült betölteni a workflow részleteit a fizetéshez.",
      };
    }

    const doc = (await wfRes.json()) as {
      fields: Record<
        string,
        { stringValue?: string; integerValue?: string; booleanValue?: boolean }
      >;
    };
    const fields = doc.fields;

    // Verify ownership (unless Admin)
    const clientId = fields.clientId?.stringValue;
    if (!user.isAdmin && clientId !== user.uid) {
      return {
        success: false,
        error: "Ehhez a fizetéshez nincs jogosultságod.",
      };
    }

    // 2. Get price for the requested phase
    const priceKey = `${phase}Price`;
    const priceField = fields[priceKey];
    const price = priceField?.integerValue
      ? parseInt(priceField.integerValue)
      : 0;

    if (price <= 0) {
      return {
        success: false,
        error: `Ehhez a fázishoz (${PHASE_LABELS[phase] || phase}) nincs érvényes fizetendő összeg megadva az admin felületen.`,
      };
    }

    const workflowTitle = fields.title?.stringValue || "Webfejlesztési projekt";
    const phaseLabel = PHASE_LABELS[phase] || phase;

    // 3. Create Stripe Checkout Session via REST API
    const params = new URLSearchParams();
    params.append("payment_method_types[]", "card");
    params.append("line_items[0][price_data][currency]", "huf");
    params.append(
      "line_items[0][price_data][product_data][name]",
      `WebDude - ${workflowTitle}`
    );
    params.append(
      "line_items[0][price_data][product_data][description]",
      `Mérföldkő kifizetése: ${phaseLabel}`
    );
    params.append(
      "line_items[0][price_data][unit_amount]",
      String(price * 100)
    ); // amount in cents
    params.append("line_items[0][quantity]", "1");
    params.append("mode", "payment");

    // Pass success & cancel URLs
    params.append(
      "success_url",
      `${origin}/portal?payment_success=true&session_id={CHECKOUT_SESSION_ID}&workflow_id=${workflowId}&phase=${phase}`
    );
    params.append("cancel_url", `${origin}/portal?payment_cancelled=true`);

    // Include metadata to verify on return
    params.append("metadata[workflowId]", workflowId);
    params.append("metadata[phase]", phase);

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

    if (!stripeRes.ok) {
      const err = (await stripeRes.json()) as { error?: { message?: string } };
      return {
        success: false,
        error:
          err.error?.message ||
          "Hiba történt a Stripe munkamenet létrehozásakor.",
      };
    }

    const sessionData = (await stripeRes.json()) as { id: string; url: string };

    // Write pending order in Firestore orders collection for milestone
    const orderData = {
      fields: {
        clientId: { stringValue: user.uid },
        addonId: { stringValue: phase },
        title: { stringValue: `Mérföldkő kifizetése: ${phaseLabel}` },
        status: { stringValue: "pending" },
        amount: { integerValue: String(price) },
        createdAt: { stringValue: new Date().toISOString() },
        deliveredAt: { nullValue: null },
        stripeSessionId: { stringValue: sessionData.id },
      },
    };

    const createOrderUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders`;
    await fetch(createOrderUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(orderData),
    });

    return { success: true, url: sessionData.url };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba a Stripe fizetés indításakor.",
    };
  }
}

/**
 * Verify Stripe checkout session status and mark the milestone as PAID.
 */
export async function verifyStripePaymentAction(
  idToken: string,
  sessionId: string
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return {
      success: false,
      error: "A Stripe fizetési kapu nincs konfigurálva a szerveren.",
    };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase projekt konfiguráció hiányzik." };
  }

  try {
    // 1. Fetch Stripe session via REST API
    const stripeUrl = `https://api.stripe.com/v1/checkout/sessions/${sessionId}`;
    const stripeRes = await fetch(stripeUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
      },
    });

    if (!stripeRes.ok) {
      return {
        success: false,
        error:
          "Nem sikerült lekérdezni a fizetési tranzakció státuszát a Stripe-tól.",
      };
    }

    const session = (await stripeRes.json()) as {
      payment_status: string;
      metadata?: { workflowId?: string; phase?: string };
    };

    if (session.payment_status !== "paid") {
      return {
        success: false,
        error: "A fizetés még nem teljesült vagy megszakadt.",
      };
    }

    const workflowId = session.metadata?.workflowId;
    const phase = session.metadata?.phase;

    if (!workflowId || !phase) {
      return { success: false, error: "Hiányzó tranzakciós metaadatok." };
    }

    // Backup sync: update orders status to paid in case webhook is delayed
    try {
      const queryUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;
      const qRes = await fetch(queryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: "orders" }],
            where: {
              fieldFilter: {
                field: { fieldPath: "stripeSessionId" },
                op: "EQUAL",
                value: { stringValue: sessionId },
              },
            },
            limit: 1,
          },
        }),
      });

      if (qRes.ok) {
        const qData = (await qRes.json()) as Array<{
          document?: { name: string };
        }>;
        const docName = qData[0]?.document?.name;
        if (docName) {
          const patchUrl = `https://firestore.googleapis.com/v1/${docName}?updateMask.fieldPaths=status`;
          await fetch(patchUrl, {
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
        }
      }
    } catch (err) {
      console.warn("Backup order status sync failed:", err);
    }

    // Handle Add-on purchases verification
    if (workflowId === "addon") {
      const addon = ADDONS_CONFIG[phase];
      if (!addon) {
        return {
          success: false,
          error: "Érvénytelen kiegészítő szolgáltatás.",
        };
      }

      const createUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/purchased_addons`;
      const createRes = await fetch(createUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          fields: {
            clientId: { stringValue: user.uid },
            addonId: { stringValue: phase },
            addonName: { stringValue: addon.name },
            price: { integerValue: String(addon.price) },
            purchasedAt: { stringValue: new Date().toISOString() },
            sessionId: { stringValue: sessionId },
          },
        }),
      });

      if (!createRes.ok) {
        return {
          success: false,
          error:
            "A fizetés sikeres volt, de nem sikerült rögzíteni a megrendelést.",
        };
      }

      return {
        success: true,
        workflowId: "addon",
        phase,
        message: `Sikeresen megvásároltad a(z) ${addon.name} kiegészítőt! Hamarosan nekilátok a kivitelezésnek.`,
      };
    }

    // 2. Mark the milestone as paid in Firestore
    const paidKey = `${phase}Paid`;
    const patchUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/workflows/${workflowId}?updateMask.fieldPaths=${paidKey}`;

    const patchRes = await fetch(patchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: {
          [paidKey]: { booleanValue: true },
        },
      }),
    });

    if (!patchRes.ok) {
      return {
        success: false,
        error:
          "A fizetés sikeres volt, de nem sikerült frissíteni a projekt státuszát a széfben.",
      };
    }

    return {
      success: true,
      workflowId,
      phase,
      message: `A(z) ${PHASE_LABELS[phase] || phase} fázis díja sikeresen kiegyenlítve!`,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba a fizetés ellenőrzése során.",
    };
  }
}

/**
 * Retrieve all purchased add-ons for the current authenticated user.
 */
export async function getClientPurchasedAddonsAction(idToken: string) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase projekt konfiguráció hiányzik." };
  }

  try {
    const listUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/purchased_addons?pageSize=100`;
    const res = await fetch(listUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      return {
        success: false,
        error: "Nem sikerült betölteni a megvásárolt kiegészítőket.",
      };
    }

    const data = (await res.json()) as {
      documents?: Array<{
        name: string;
        fields: Record<string, { stringValue?: string; integerValue?: string }>;
      }>;
    };
    const docs = data.documents || [];

    const addons = docs
      .map((doc) => {
        const fields = doc.fields;
        const id = doc.name.split("/").pop() || "";
        return {
          id,
          clientId: fields.clientId?.stringValue || "",
          addonId: fields.addonId?.stringValue || "",
          addonName: fields.addonName?.stringValue || "",
          price: fields.price?.integerValue
            ? parseInt(fields.price.integerValue)
            : 0,
          purchasedAt: fields.purchasedAt?.stringValue || "",
        };
      })
      .filter((item) => item.clientId === user.uid);

    return { success: true, addons };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba a kiegészítők lekérése során.",
    };
  }
}
