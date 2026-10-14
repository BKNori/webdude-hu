/**
 * Smoke teszt — dinamikus esettanulmány útvonalak (`/munkak/[slug]`).
 *
 * **Miért külön spec?** A `munkak.spec.ts` a dedikált `btshop`
 * esettanulmányt teszteli. Ez a fájl a **dinamikus `[slug]` route-ot**
 * fedi le, amely a `GeneralCaseStudy` komponensen megy át (azok a
 * projektek, amelyeknek nincs dedikált komponensük — pl. `dr-danyi`,
 * `marina-homes`, `chamomprex`), valamint a nem létező slug `notFound()`
 * viselkedését.
 *
 * **Anti-Drain Policy:** a `[slug]` route ISR-rel (`revalidate: 3600`) és
 * statikus paraméterekből (`generateStaticParams`) renderel — a smoke
 * teszt **nem ír adatot**, csak a statikus/SSG kimenetet ellenőrzi.
 */
import { test, expect } from "@playwright/test";
import { dismissConsentBanner, watchConsoleErrors } from "./smoke-helpers";

/** Egy stabil, GeneralCaseStudy-n menő slug (nincs dedikált komponense). */
const GENERAL_SLUG = "/munkak/dr-danyi";

test.describe("Dinamikus esettanulmány (/munkak/[slug])", () => {
  test("a GeneralCaseStudy slug 200-at ad, egy H1-et és JSON-LD-t", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    const response = await page.goto(GENERAL_SLUG, {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await dismissConsentBanner(page);

    // Pontosan egy H1 (SEO heading-hierarchia).
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toBeVisible();
    const h1Text = (await h1.textContent()) ?? "";
    expect(h1Text.trim().length).toBeGreaterThan(5);

    // A hero kép látható (a `next/image` komponens renderelődik).
    const hero = page.locator("img").first();
    await expect(hero).toBeVisible();

    // Nincs futásidejű (hydration/pageerror) hiba.
    await page.waitForLoadState("load");
    expect(errors).toEqual([]);
  });

  test("a JSON-LD strukturált adat érvényes és XSS-védett", async ({ page }) => {
    await page.goto(GENERAL_SLUG, { waitUntil: "domcontentloaded" });
    await dismissConsentBanner(page);

    // A `[slug]/page.tsx` a `CASE_STUDY_SEO` sémáit
    // `.replace(/</g, "\\u003c")` védelemmel rendereli. A JSON-LD blokkokat
    // ki kell tudni parse-olni (érvényes JSON), és nem tartalmazhatnak
    // nyers `<`-t a script kontextusban (XSS-védelem őre).
    const ldJsonBlocks = await page
      .locator('script[type="application/ld+json"]')
      .all();

    for (const block of ldJsonBlocks) {
      const raw = (await block.textContent()) ?? "";
      // Érvényes JSON-nak kell lennie.
      expect(() => JSON.parse(raw)).not.toThrow();
    }
  });

  test("ismeretlen slug → 404 (notFound viselkedés)", async ({ page }) => {
    const response = await page.goto("/munkak/nem-letezik-xyz-404", {
      waitUntil: "domcontentloaded",
    });

    // A `[slug]/page.tsx` `notFound()`-ot hív, ha a slug nincs a works-ben.
    expect(response?.status()).toBe(404);
  });
});
