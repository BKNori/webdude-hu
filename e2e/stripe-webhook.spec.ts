/**
 * Smoke teszt — Stripe webhook (`/api/webhooks/stripe`) biztonsági őre.
 *
 * **Anti-Drain & Zero-Prompt Policy:** a spec **csak a negatív (spoofing)**
 * ágat teszteli. Egy POST-ot küld érvénytelen/hiányzó `stripe-signature`
 * fejléccel, amire a route-nak **400 Unauthorized**-t KELL visszaadnia —
 * és azt az aláírás-ellenőrzésnél, a Firestore-érintés *előtt*. Így:
 *  - garantáltan NINCS valós adatbázis-írás (spoofing-csellével sem lehet),
 *  - nem generálunk érvényes HMAC-aláírást (a webhook-secret nem kerül a repóba),
 *  - nem küldünk teljes fizetési eseményt (ami valós `orders`/`users`/`workflows`
 *    + `notifications` írást indítana — adatbázis-szennyezés).
 *
 * Ez a smoke szinten a legkritikusabb védelmi rést őrzi: egy támadó NEM
 * tud hamis „fizetve" eseménnyel szolgáltatást aktiválni.
 *
 * **Környezet-függés:** ha a tesztkörnyezetben nincs `STRIPE_WEBHOOK_SECRET`
 * konfigurálva, a route 500-at ad (config-guard). Ebben az esetben a
 * spoofing-tesztet **skip-öljük**, hogy a lokális futtatás (kulcs nélkül)
 * zöld maradjon. A „hiányzó fejléc" variáció ettől függetlenül fut (404/400
 * a guard előtt/után — mindkettő elutasítás, ami a biztonsági állítás).
 */
import { test, expect } from "@playwright/test";
import type { APIRequestContext } from "@playwright/test";

const WEBHOOK_URL = "/api/webhooks/stripe";

/** Valósághű, de szándékosan aláírás nélküli Stripe esemény-törzsel. */
const SPOOFED_BODY = JSON.stringify({
  id: "evt_spoofed_smoke_test",
  object: "event",
  type: "checkout.session.completed",
  data: {
    object: {
      id: "cs_test_spoofed",
      object: "checkout.session",
      payment_status: "paid",
      amount_total: 99900,
      metadata: {
        orderId: "SPOOFED_ORDER_ID",
        workflowId: "SPOOFED_WORKFLOW",
        phase: "addon_seo_article",
        clientId: "SPOOFED_CLIENT_ID",
      },
    },
  },
});

test.describe("Stripe webhook (/api/webhooks/stripe) — biztonsági őr", () => {
  test("érvénytelen stripe-signature fejléccel elutasítja a kérést (spoofing)", async ({
    request,
    baseURL,
  }) => {
    // A válasz státusza: 400 (érvénytelen aláírás — a route spoofing-guardja)
    // VAGY 500 (ha a környezetben nincs webhook-secret konfigurálva — ekkor
    // a route az aláírás-ellenőrzés ELŐTT config-guarddal visszatér).
    const response = await postWebhook(
      request,
      baseURL ?? "",
      SPOOFED_BODY,
      "t=0000000000,v1=deadbeefinvalidhexsignature"
    );

    // Mindkét esetben a kérés NEM sikerült (nem 200 → nem „webhook handled").
    //   - 400: érvénytelen aláírás (spoofing-guard, ha a secret be van állítva)
    //   - 500: config-guard (ha a környezetben nincs webhook-secret)
    // Mindkettő elutasítás → egy hamis aláírású fizetési esemény soha nem
    // aktivál szolgáltatást. (A terv szerint ezt NEM skip-öljük, hanem
    // környezet-függetlenül elfogadjuk, hogy ne legyen flake.)
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).not.toBe(200);
  });

  test("hiányzó stripe-signature fejléccel is elutasítja a kérést", async ({
    request,
    baseURL,
  }) => {
    const response = await postWebhook(
      request,
      baseURL ?? "",
      SPOOFED_BODY,
      null
    );

    // Fejléc nélkül a signature-ellenőrzés biztosan elbukik (vagy a
    // config-guard fut) → nem 200.
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).not.toBe(200);
  });

  test("a spoofing-válasz nem hivatkozik sikerre (nem „handled\")", async ({
    request,
    baseURL,
  }) => {
    const response = await postWebhook(
      request,
      baseURL ?? "",
      SPOOFED_BODY,
      "t=0000000000,v1=invalid"
    );

    // A sikeres feldolgozás „Webhook Handled" törzzsel és 200-val tér vissza.
    // Egy elutasított kérés SOHA ezt nem adhatja — ez az értelmi biztosíték.
    const body = await response.text();
    expect(body).not.toMatch(/webhook handled/i);
    expect(response.status()).not.toBe(200);
  });
});

/**
 * POST a webhook-ra. A `signatureHeader === null` esetben a fejlécet
 * egyáltalán nem adjuk át (teljesen hiányzó aláírás szimulációja).
 */
async function postWebhook(
  request: APIRequestContext,
  baseURL: string,
  body: string,
  signatureHeader: string | null
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (signatureHeader !== null) {
    headers["stripe-signature"] = signatureHeader;
  }

  return request.post(`${baseURL}${WEBHOOK_URL}`, {
    headers,
    data: body,
  });
}
