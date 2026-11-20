import { expect, test } from "@playwright/test";
import { dismissConsentBanner, watchConsoleErrors } from "./smoke-helpers";

/**
 * v7.78.0 Ingyenes SEO & AI-Készség (AEO/GEO) Gyorsellenőrző E2E tesztek:
 *  - /ingyenes-seo-aeo-elemzes és /en/free-seo-aeo-checker:
 *    HTTP 200, 1 db <h1>, kétirányú hreflang, WebApplication + FAQPage JSON-LD, Dual Theme
 *  - POST /api/public/seo-quick-check SSRF-védelem: privát / localhost URL -> HTTP 400
 *  - /hirek/[slug] cikk alján látható a SEO gyorsellenőrző banner link (/ingyenes-seo-aeo-elemzes)
 */
test.describe("v7.78.0 Ingyenes SEO & AI-Készség Gyorsellenőrző", () => {
  test("1. /ingyenes-seo-aeo-elemzes és /en/free-seo-aeo-checker — HTTP 200, 1 db H1, hreflang & JSON-LD", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    const routes = [
      {
        path: "/ingyenes-seo-aeo-elemzes",
        canonical: "https://webdude.hu/ingyenes-seo-aeo-elemzes",
      },
      {
        path: "/en/free-seo-aeo-checker",
        canonical: "https://webdude.hu/en/free-seo-aeo-checker",
      },
    ];

    for (const r of routes) {
      const res = await page.goto(r.path, { waitUntil: "domcontentloaded" });
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
      expect(canonical).toBe(r.canonical);

      const huAlt = await page
        .locator('link[rel="alternate"][hreflang="hu-HU"]')
        .first()
        .getAttribute("href");
      const enAlt = await page
        .locator('link[rel="alternate"][hreflang="en-US"]')
        .first()
        .getAttribute("href");
      expect(huAlt).toBe("https://webdude.hu/ingyenes-seo-aeo-elemzes");
      expect(enAlt).toBe("https://webdude.hu/en/free-seo-aeo-checker");

      const ldJsonRaw = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      const schemas = ldJsonRaw.map((raw) => JSON.parse(raw));
      expect(schemas.some((s) => s["@type"] === "WebApplication")).toBe(true);
      expect(schemas.some((s) => s["@type"] === "FAQPage")).toBe(true);

      // Zéró Fix Ár ellenőrzés
      const bodyText = (await page.locator("body").innerText()) ?? "";
      expect(bodyText).not.toMatch(
        /\b\d[\d\s.,]*\s*(?:Ft|HUF|EUR|USD|€|\$)\b/i
      );
    }

    expect(errors).toEqual([]);
  });

  test("2. POST /api/public/seo-quick-check SSRF-védelem — localhost és privát IP elutasítása (HTTP 400)", async ({
    request,
  }) => {
    for (const blockedUrl of [
      "http://127.0.0.1",
      "http://localhost:3000",
      "http://192.168.1.1",
    ]) {
      const res = await request.post("/api/public/seo-quick-check", {
        data: { url: blockedUrl, locale: "hu" },
        timeout: 20_000,
      });
      expect(res.status()).toBe(400);
    }
  });

  test("3. Szakcikk (/hirek/[slug]) tartalmazza az alacsony küszöbű SEO gyorsellenőrző CTA-t", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    const res = await page.goto(
      "/hirek/2026-11-17-ai-keresooptimalizalas-geo-aeo-utmutato-cegeknek",
      { waitUntil: "domcontentloaded" }
    );
    expect(res?.status()).toBe(200);
    await page.waitForLoadState("load");
    await dismissConsentBanner(page);

    const ctaLink = page
      .locator('a[href="/ingyenes-seo-aeo-elemzes"]')
      .first();
    await expect(ctaLink).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("4. Főoldal (/) és /en tartalmazza az ingyenes SEO/AEO gyorsellenőrző CTA / Footer linket", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    await dismissConsentBanner(page);
    await expect(
      page.locator('a[href="/ingyenes-seo-aeo-elemzes"]').first()
    ).toBeAttached();

    await page.goto("/en", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    await dismissConsentBanner(page);
    await expect(
      page.locator('a[href="/en/free-seo-aeo-checker"]').first()
    ).toBeAttached();

    expect(errors).toEqual([]);
  });

  test("5. Új 2026-11-20 BOFU szakcikk: HTTP 200, TechArticle + FAQPage JSON-LD és SeoQuickCheckBanner", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    const res = await page.goto(
      "/hirek/2026-11-20-ugynokseg-vs-senior-szabaduszo-webfejleszto",
      { waitUntil: "domcontentloaded" }
    );
    expect(res?.status()).toBe(200);
    await page.waitForLoadState("load");
    await dismissConsentBanner(page);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page.locator('a[href="/ingyenes-seo-aeo-elemzes"]').first()
    ).toBeVisible();

    const ldJsonRaw = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const schemas = ldJsonRaw.map((raw) => JSON.parse(raw));
    expect(schemas.some((s) => s["@type"] === "TechArticle")).toBe(true);
    expect(schemas.some((s) => s["@type"] === "FAQPage")).toBe(true);

    expect(errors).toEqual([]);
  });
});
