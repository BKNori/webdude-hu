import { expect, test } from "@playwright/test";
import { dismissConsentBanner, visit, watchConsoleErrors } from "./smoke-helpers";

/**
 * v7.81.0 BOFU Cikk-Finomítás (JSX táblázat + egyedi borító) &
 * Ingyenes 10 Perces Videós UX & SEO Audit Landing (HU + EN) E2E tesztek.
 */
test.describe("v7.81.0 Videós UX & SEO Audit Landing + BOFU cikk-finomítás", () => {
  test("1. /ingyenes-weboldal-elemzes és /en/free-website-audit — HTTP 200, 1 H1, hreflang, Service+FAQPage JSON-LD & nyelvváltó", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    const routes = [
      {
        path: "/ingyenes-weboldal-elemzes",
        canonical: "https://webdude.hu/ingyenes-weboldal-elemzes",
      },
      {
        path: "/en/free-website-audit",
        canonical: "https://webdude.hu/en/free-website-audit",
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
      expect(huAlt).toBe("https://webdude.hu/ingyenes-weboldal-elemzes");
      expect(enAlt).toBe("https://webdude.hu/en/free-website-audit");

      const ldJsonRaw = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      const schemas = ldJsonRaw.map((raw) => JSON.parse(raw));
      expect(schemas.some((s) => s["@type"] === "Service")).toBe(true);
      expect(schemas.some((s) => s["@type"] === "FAQPage")).toBe(true);
      expect(schemas.some((s) => s["@type"] === "BreadcrumbList")).toBe(true);

      // Zéró Fix Ár ellenőrzés
      const bodyText = (await page.locator("body").innerText()) ?? "";
      expect(bodyText).not.toMatch(
        /\b\d[\d\s.,]*\s*(?:Ft|HUF|EUR|USD|€|\$)\b/i
      );
    }

    // Dinamikus nyelvváltó teszt mindkét irányban
    await visit(page, "/ingyenes-weboldal-elemzes");
    await page
      .locator('button[aria-label="Switch language"]:visible')
      .first()
      .click();
    await page.getByRole("button", { name: /English/i }).first().click();
    await expect(page).toHaveURL(/\/en\/free-website-audit$/);

    await page
      .locator('button[aria-label="Switch language"]:visible')
      .first()
      .click();
    await page.getByRole("button", { name: /Magyar/i }).first().click();
    await expect(page).toHaveURL(/\/ingyenes-weboldal-elemzes$/);

    expect(errors).toEqual([]);
  });

  test("2. BOFU szakcikk valódi HTML <table> táblázatot és betöltődő egyedi .webp borítóképet renderel", async ({
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

    const tables = page.locator("article table");
    await expect(tables.first()).toBeVisible();
    expect(await tables.count()).toBeGreaterThanOrEqual(1);

    // Nyers Markdown pipe táblázat szöveg nem maradhat a DOM-ban
    const articleText = (await page.locator("article").innerText()) ?? "";
    expect(articleText).not.toContain("| Szempont |");
    expect(articleText).not.toContain("| --- |");

    // Minden eager kép és az egyedi .webp borítókép sikeresen betöltődött (lazy off-screen képek nélkül)
    await expect
      .poll(
        async () =>
          page.locator("img:visible").evaluateAll((els) => {
            const imgs = els as HTMLImageElement[];
            return {
              hasImages: imgs.length > 0,
              hasCustomCover: imgs.some(
                (im) =>
                  (im.currentSrc || im.getAttribute("src") || "").includes(
                    "2026-11-20-ugynokseg-vs-senior-szabaduszo-webfejleszto"
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
                .map(
                  (im) => im.currentSrc || im.getAttribute("src") || "unknown"
                ),
            };
          }),
        { timeout: 10_000 }
      )
      .toEqual({ hasImages: true, hasCustomCover: true, broken: [] });

    const ldJsonRaw = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const schemas = ldJsonRaw.map((raw) => JSON.parse(raw));
    expect(schemas.some((s) => s["@type"] === "TechArticle")).toBe(true);
    expect(schemas.some((s) => s["@type"] === "FAQPage")).toBe(true);

    expect(errors).toEqual([]);
  });
});
