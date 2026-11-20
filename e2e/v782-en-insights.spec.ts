import { expect, test } from "@playwright/test";
import { dismissConsentBanner, visit, watchConsoleErrors } from "./smoke-helpers";

/**
 * v7.82.0 Nemzetközi Tudásbázis (/en/insights + 3 angol BOFU/GEO szakcikk) E2E tesztek.
 */
test.describe("v7.82.0 Angol Tudásbázis (/en/insights)", () => {
  test("1. /en/insights — HTTP 200, 1 H1, kétirányú hreflang (/hirek <-> /en/insights), 3 cikk-kártya & nyelvváltó", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    const res = await page.goto("/en/insights", {
      waitUntil: "domcontentloaded",
    });
    expect(res?.status()).toBe(200);
    await page.waitForLoadState("load");
    await dismissConsentBanner(page);

    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1.first()).toBeVisible();

    const canonical = await page
      .locator('link[rel="canonical"]')
      .first()
      .getAttribute("href");
    expect(canonical).toBe("https://webdude.hu/en/insights");

    const huAlt = await page
      .locator('link[rel="alternate"][hreflang="hu-HU"]')
      .first()
      .getAttribute("href");
    const enAlt = await page
      .locator('link[rel="alternate"][hreflang="en-US"]')
      .first()
      .getAttribute("href");
    expect(huAlt).toBe("https://webdude.hu/hirek");
    expect(enAlt).toBe("https://webdude.hu/en/insights");

    // 3 angol cikk kártya látható és /en/insights/* útvonalra mutat
    const cards = page.locator("article");
    await expect(cards).toHaveCount(3);
    const cardLinks = page.locator("article h3 a");
    await expect(cardLinks).toHaveCount(3);
    const hrefs = await cardLinks.evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "")
    );
    for (const href of hrefs) {
      expect(href).toMatch(/^\/en\/insights\/[a-z0-9-]+$/);
    }

    // CollectionPage + ItemList JSON-LD & Zéró Fix Ár + nincs Kecskemét
    const ldJsonRaw = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const schemas = ldJsonRaw.map((raw) => JSON.parse(raw));
    expect(schemas.some((s) => s["@type"] === "CollectionPage")).toBe(true);
    expect(schemas.some((s) => s["@type"] === "BreadcrumbList")).toBe(true);

    const bodyText = (await page.locator("body").innerText()) ?? "";
    expect(bodyText).not.toMatch(/\b\d[\d\s.,]*\s*(?:Ft|HUF|EUR|USD|€|\$)\b/i);
    expect(bodyText).not.toMatch(/Kecskem[eé]t/i);

    // Kétirányú LanguageSwitcher: /en/insights -> /hirek -> /en/insights
    await page
      .locator('button[aria-label="Switch language"]:visible')
      .first()
      .click();
    await page.getByRole("button", { name: /Magyar/i }).first().click();
    await expect(page).toHaveURL(/\/hirek$/);

    const enAltOnHu = await page
      .locator('link[rel="alternate"][hreflang="en-US"]')
      .first()
      .getAttribute("href");
    expect(enAltOnHu).toBe("https://webdude.hu/en/insights");

    await page
      .locator('button[aria-label="Switch language"]:visible')
      .first()
      .click();
    await page.getByRole("button", { name: /English/i }).first().click();
    await expect(page).toHaveURL(/\/en\/insights$/);

    expect(errors).toEqual([]);
  });

  test("2. /en/insights/ai-search-geo-aeo-guide-for-businesses — TechArticle + FAQPage JSON-LD, HTML <table>, SEO Checker CTA & borítókép", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    await visit(page, "/en/insights/ai-search-geo-aeo-guide-for-businesses");

    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1.first()).toBeVisible();

    const tables = page.locator("article table");
    await expect(tables.first()).toBeVisible();
    expect(await tables.count()).toBeGreaterThanOrEqual(1);

    const checkerCta = page.locator('article a[href="/en/free-seo-aeo-checker"]');
    await expect(checkerCta.first()).toBeVisible();

    await expect
      .poll(
        async () =>
          page.locator("img:visible").evaluateAll((els) => {
            const imgs = els as HTMLImageElement[];
            return {
              hasCover: imgs.some(
                (im) =>
                  (im.currentSrc || im.getAttribute("src") || "").includes(
                    "en-ai-search-geo-aeo-guide-for-businesses"
                  ) &&
                  im.complete &&
                  im.naturalWidth > 0
              ),
              broken: imgs
                .filter(
                  (im) =>
                    im.getAttribute("loading") !== "lazy" &&
                    (!im.complete || im.naturalWidth === 0)
                )
                .map((im) => im.currentSrc || im.getAttribute("src") || "unknown"),
            };
          }),
        { timeout: 10_000 }
      )
      .toEqual({ hasCover: true, broken: [] });

    const ldJsonRaw = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const schemas = ldJsonRaw.map((raw) => JSON.parse(raw));
    expect(schemas.some((s) => s["@type"] === "TechArticle")).toBe(true);
    expect(schemas.some((s) => s["@type"] === "FAQPage")).toBe(true);
    expect(schemas.some((s) => s["@type"] === "BreadcrumbList")).toBe(true);

    const bodyText = (await page.locator("body").innerText()) ?? "";
    expect(bodyText).not.toMatch(/\b\d[\d\s.,]*\s*(?:Ft|HUF|EUR|USD|€|\$)\b/i);
    expect(bodyText).not.toMatch(/Kecskem[eé]t/i);

    expect(errors).toEqual([]);
  });
});
