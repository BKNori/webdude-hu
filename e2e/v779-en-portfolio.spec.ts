import { expect, test } from "@playwright/test";
import { dismissConsentBanner, visit, watchConsoleErrors } from "./smoke-helpers";

/**
 * v7.79.0 Nemzetközi portfólió lezárása (/en/portfolio/[slug]) & dinamikus nyelvváltás E2E.
 */
test.describe("v7.79.0 Angol esettanulmányok (/en/portfolio/[slug]) & izoláció", () => {
  test("1. /en/portfolio — minden kártya /en/portfolio/* útvonalra mutat (0 /munkak/ link)", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    await visit(page, "/en/portfolio");

    const cardLinks = page.locator("article h3 a");
    const count = await cardLinks.count();
    expect(count).toBe(14);

    const hrefs = await cardLinks.evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "")
    );
    for (const href of hrefs) {
      expect(href).toMatch(/^\/en\/portfolio\/.+/);
      expect(href).not.toContain("/munkak/");
    }

    expect(errors).toEqual([]);
  });

  test("2. Kiemelt /en/portfolio/[slug] esettanulmányok: HTTP 200, 1 H1, hreflang, CreativeWork+FAQPage JSON-LD, képek & nyelvváltó", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    for (const slug of ["btshop", "classi-co"]) {
      const enPath = `/en/portfolio/${slug}`;
      const huUrl = `https://webdude.hu/munkak/${slug}`;
      const enUrl = `https://webdude.hu${enPath}`;

      const res = await page.goto(enPath, { waitUntil: "domcontentloaded" });
      expect(res?.status()).toBe(200);
      await page.waitForLoadState("load");
      await dismissConsentBanner(page);

      // Dual Theme & 1 H1
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1.first()).toBeVisible();

      // Kétirányú hreflang + canonical
      const canonical = await page
        .locator('link[rel="canonical"]')
        .first()
        .getAttribute("href");
      expect(canonical).toBe(enUrl);

      const huAlt = await page
        .locator('link[rel="alternate"][hreflang="hu-HU"]')
        .first()
        .getAttribute("href");
      const enAlt = await page
        .locator('link[rel="alternate"][hreflang="en-US"]')
        .first()
        .getAttribute("href");
      expect(huAlt).toBe(huUrl);
      expect(enAlt).toBe(enUrl);

      // CreativeWork + FAQPage JSON-LD
      const ldJsonRaw = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      const schemas = ldJsonRaw.map((raw) => JSON.parse(raw));
      expect(schemas.some((s) => s["@type"] === "CreativeWork")).toBe(true);
      expect(schemas.some((s) => s["@type"] === "FAQPage")).toBe(true);

      // Zéró törött kép
      await expect
        .poll(
          async () =>
            page.locator("img:visible").evaluateAll((els) => {
              const imgs = els as HTMLImageElement[];
              return {
                hasImages: imgs.length > 0,
                broken: imgs
                  .filter((im) => !im.complete || im.naturalWidth === 0)
                  .map(
                    (im) => im.currentSrc || im.getAttribute("src") || "unknown"
                  ),
              };
            }),
          { timeout: 10_000 }
        )
        .toEqual({ hasImages: true, broken: [] });
    }

    // Dinamikus nyelvváltó teszt: /en/portfolio/btshop -> /munkak/btshop -> vissza /en/portfolio/btshop
    await visit(page, "/en/portfolio/btshop");
    const switcher = page
      .locator('button[aria-label="Switch language"]:visible')
      .first();
    await switcher.click();
    await page.getByRole("button", { name: /Magyar/i }).first().click();
    await expect(page).toHaveURL(/\/munkak\/btshop$/);

    // Magyar oldalon visszafelé hreflang ellenőrzése
    const enAltOnHu = await page
      .locator('link[rel="alternate"][hreflang="en-US"]')
      .first()
      .getAttribute("href");
    expect(enAltOnHu).toBe("https://webdude.hu/en/portfolio/btshop");

    const switcherHu = page
      .locator('button[aria-label="Switch language"]:visible')
      .first();
    await switcherHu.click();
    await page.getByRole("button", { name: /English/i }).first().click();
    await expect(page).toHaveURL(/\/en\/portfolio\/btshop$/);

    expect(errors).toEqual([]);
  });
});
