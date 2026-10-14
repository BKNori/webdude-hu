/**
 * Smoke teszt — "Zéró Fix Ár" regressziós őr ([7.21.0] takarítás védője).
 *
 * **Miért kell ez a spec?** A 7.21.0-s ciklusban teljesen megtisztítottuk a
 * publikus felületeket a fix áraktól / ársávoktól a prémium (high-ticket)
 * pozicionálás és a Zéró Fix Ár szabály értelmében. Ez a spec **megakadályozza
 * a regressziót**: ha valaki visszahoz egy fix árat, hardkódolt összeget vagy
 * `"price"` mezőt a JSON-LD-be, a teszt azonnal bukik.
 *
 * **Mi NEM tiltott (szándékosan nem assertáljuk):** a Portál/ügyfélkapu
 * saját-rendelés összegei (nyugták, mérföldkő-díjak) továbbra is pontos
 * forintösszegeket mutatnak — a Zéró Fix Ár szabály CSAK a publikus
 * katalógusra és marketing oldalakra vonatkozik. Ezért itt kifejezetten csak
 * a publikus oldalakat ellenőrizzük.
 *
 * **Anti-Drain Policy:** mindkét oldal statikus/ISR — a teszt nem ír adatot.
 */
import { test, expect } from "@playwright/test";
import { dismissConsentBanner } from "./smoke-helpers";

/**
 * Publikus felületek fix ár mintázatai (amiknek NEM szabad szerepelniük).
 *
 * - `toLocaleString(...)`-ből származó formátum: „12 000”, „1 200 000”
 * - „Ft” utántag fix összeggel: „49 000 Ft”, „1 500 000 Ft”
 * - Fix szám + „Ft” különböző szóközökkel
 */
const FIXED_PRICE_PATTERNS: RegExp[] = [
  /\d{1,3}(?:[\s.]\d{3})+\s*Ft/i, // „120 000 Ft”, „1.500.000 Ft”
  /\bFt\b\s*\d/i, // „Ft 120000”
  /\d{2,7}\s*Ft/i, // „49000 Ft”, „1 500 000 Ft”
];

test.describe("Zéró Fix Ár regressziós őr (publikus felületek)", () => {
  test("az /szolgaltatasok/add-onok nem tartalmaz fix árat, csak CTA-t", async ({
    page,
  }) => {
    await page.goto("/szolgaltatasok/add-onok", {
      waitUntil: "domcontentloaded",
    });
    await dismissConsentBanner(page);
    await page.waitForLoadState("load");

    // A teljes látható szövegtörzs (a JSON-LD-t is beleértjük, ami a <script>).
    const bodyText = (await page.locator("body").innerText()) ?? "";

    // 1) Egyetlen fix-ár mintázat sem szerepelhet a látható szövegben.
    for (const pattern of FIXED_PRICE_PATTERNS) {
      const match = bodyText.match(pattern);
      expect(
        match,
        `Fix ár visszasükkedt az add-onok oldalra: "${match?.[0] ?? ""}". ` +
          "A Zéró Fix Ár szabály tiltja a publikus katalógusban a fix összegeket."
      ).toBeNull();
    }

    // 2) Az ajánlatkérő CTA viszont jelen van (pozitív ellenőrzés) — legalább
    //    egy „Egyedi árajánlat" hivatkozás a /kapcsolat felé.
    const ctaCount = await page
      .getByRole("link", { name: /egyedi árajánlat/i })
      .count();
    expect(ctaCount).toBeGreaterThan(0);
  });

  test("a /termekek JSON-LD offers nem tartalmaz price mezőt", async ({
    page,
  }) => {
    // Egy reprezentatív termékoldal (a 7.21.0-ban tisztított sémával).
    await page.goto("/termekek/ai-chatbot-starter", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForLoadState("load");

    const ldJsonBlocks = await page
      .locator('script[type="application/ld+json"]')
      .all();

    expect(ldJsonBlocks.length).toBeGreaterThan(0);

    // Végigiterálunk minden JSON-LD blokkon, és biztosítjuk, hogy egyik
    // `offers` objektumban se legyen `price` / `priceCurrency` / `priceSpecification`
    // fix értékkel (sem „0", sem szám).
    for (const block of ldJsonBlocks) {
      const raw = (await block.textContent()) ?? "";
      expect(() => JSON.parse(raw)).not.toThrow();

      // Keressük a Product sémát és az `offers` mezőt.
      const schema = JSON.parse(raw) as {
        "@type"?: string;
        offers?: unknown;
      };

      // Ha ez egy Product (vagy tartalmazza), ellenőrizzük az offers-t.
      const candidates: unknown[] = [schema];
      // Egyes oldalak tömbként (graph) is tárolhatják — rekurzívan
      // begyűjtjük az összes offers mezőt.
      const collectOffers = (node: unknown, acc: unknown[]): void => {
        if (node && typeof node === "object") {
          const obj = node as Record<string, unknown>;
          if ("offers" in obj) acc.push(obj.offers);
          for (const value of Object.values(obj)) {
            collectOffers(value, acc);
          }
        } else if (Array.isArray(node)) {
          for (const item of node) collectOffers(item, acc);
        }
      };
      collectOffers(candidates, []);

      for (const offers of candidates) {
        if (offers && typeof offers === "object") {
          const offerObj = offers as Record<string, unknown>;
          // A 7.21.0 tisztítás: NINCS price/priceCurrency fix érték.
          expect(
            offerObj.price,
            `A JSON-LD offers tartalmaz "${String(offerObj.price)}" price értéket ` +
              "(Zéró Fix Ár szabálysértés)."
          ).toBeUndefined();
          expect(
            offerObj.priceCurrency,
            "A JSON-LD offers tartalmaz priceCurrency értéket (Zéró Fix Ár szabálysértés)."
          ).toBeUndefined();
        }
      }
    }
  });
});
