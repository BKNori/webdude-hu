import { expect, test } from "@playwright/test";
import { watchConsoleErrors } from "./smoke-helpers";

/**
 * v7.77.0 SEO / AIO / GEO & Feed ellenőrzések:
 *  - /llms-full.txt (200 OK, HU+EN összefoglaló, E-E-A-T, Zéró Fix Ár)
 *  - /feed.xml (200 OK, <rss version="2.0">, noindex kizárás)
 *  - <link rel="alternate" type="application/rss+xml"> autodiscovery
 *  - Látható GYIK + FAQPage JSON-LD egy régebbi frissített szakcikken
 */
test.describe("v7.77.0 SEO / AIO / GEO & Feed ellenőrzések", () => {
  test("1. /llms-full.txt 200 OK és teljes strukturált kontextust ad", async ({
    request,
  }) => {
    const res = await request.get("/llms-full.txt", { timeout: 25_000 });
    expect(res.status()).toBe(200);

    const text = await res.text();
    expect(text).toContain("Balog Norbert");
    expect(text).toContain("https://webdude.hu");
    expect(text).toContain("26+");
    expect(text).toContain("16+");
    expect(text).toContain("https://webdude.hu/en/about");
    expect(text).toContain("https://webdude.hu/feed.xml");
    // Zéró Fix Ár védelem
    expect(text).not.toMatch(/\b\d[\d\s.,]*\s*(?:Ft|HUF|EUR|USD|€|\$)\b/i);
  });

  test("2. /feed.xml 200 OK, érvényes RSS 2.0 XML és noindex cikkek nélkül", async ({
    request,
  }) => {
    const res = await request.get("/feed.xml", { timeout: 25_000 });
    expect(res.status()).toBe(200);

    const contentType = res.headers()["content-type"] || "";
    expect(contentType).toMatch(/application\/rss\+xml|xml/i);

    const xml = await res.text();
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("<channel>");
    expect(xml).toContain("<item>");
    expect(xml).toContain("https://webdude.hu/hirek/");
    expect(xml).not.toContain("netflix-kodok-2025");
    expect(xml).not.toContain("flipper-zero");
  });

  test("3. <link rel='alternate' type='application/rss+xml'> jelen van a HTML head-ben", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    for (const route of ["/", "/hirek"]) {
      const res = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(res?.status()).toBe(200);

      const rssHref = await page
        .locator('link[rel="alternate"][type="application/rss+xml"]')
        .first()
        .getAttribute("href");
      expect(rssHref).toBe("https://webdude.hu/feed.xml");
    }

    expect(errors).toEqual([]);
  });

  test("4. Régebbi frissített cikk látható GYIK szekciót és FAQPage JSON-LD-t is tartalmaz", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);
    const articleUrl =
      "/hirek/2026-07-14-kristofka-workflow-szuletese-amikor-a-26-eves-tervezoi-rutin-talalkozik-az-ai-val";

    const res = await page.goto(articleUrl, { waitUntil: "domcontentloaded" });
    expect(res?.status()).toBe(200);
    await page.waitForLoadState("load");

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page.getByRole("heading", { name: /Gyakori kérdések/i }).first()
    ).toBeVisible();

    const ldJsonRaw = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const parsedSchemas = ldJsonRaw.map((raw) => JSON.parse(raw));
    const faqSchema = parsedSchemas.find((s) => s["@type"] === "FAQPage");
    expect(faqSchema).toBeTruthy();
    expect(Array.isArray(faqSchema.mainEntity)).toBe(true);
    expect(faqSchema.mainEntity.length).toBeGreaterThanOrEqual(3);

    // Organization sameAs ellenőrzés a TechArticle sémában
    const articleSchema = parsedSchemas.find(
      (s) => s["@type"] === "TechArticle"
    );
    expect(articleSchema).toBeTruthy();
    expect(Array.isArray(articleSchema.publisher?.sameAs)).toBe(true);
    expect(articleSchema.publisher.sameAs.length).toBeGreaterThanOrEqual(3);

    expect(errors).toEqual([]);
  });
});
