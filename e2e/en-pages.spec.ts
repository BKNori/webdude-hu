import { expect, test } from "@playwright/test";
import { dismissConsentBanner, visit, watchConsoleErrors } from "./smoke-helpers";

/**
 * v7.76.0 EN felület lezárása — E2E tesztek az új angol oldalakhoz és
 * a teljes kétirányú navigációs / jogi izolációhoz.
 */
test.describe("v7.76.0 Angol (/en) aloldalak & teljes útvonal-izoláció", () => {
  test("1. /en/about, /en/privacy-policy, /en/terms — HTTP 200, 1 db H1, kétirányú hreflang & JSON-LD", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    const pairs = [
      {
        enPath: "/en/about",
        huUrl: "https://webdude.hu/szia-norbi-vagyok",
        enUrl: "https://webdude.hu/en/about",
      },
      {
        enPath: "/en/privacy-policy",
        huUrl: "https://webdude.hu/adatvedelmi-szabalyzat",
        enUrl: "https://webdude.hu/en/privacy-policy",
      },
      {
        enPath: "/en/terms",
        huUrl: "https://webdude.hu/felhasznalasi-feltetelek",
        enUrl: "https://webdude.hu/en/terms",
      },
    ];

    for (const pair of pairs) {
      const response = await page.goto(pair.enPath, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status()).toBe(200);
      await page.waitForLoadState("load");
      await dismissConsentBanner(page);

      // Dual Theme alapértelmezett világos mód
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

      // Pontosan 1 db látható H1
      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1.first()).toBeVisible();

      // Canonical és kétirányú hreflang ellenőrzés
      const canonical = await page
        .locator('link[rel="canonical"]')
        .first()
        .getAttribute("href");
      expect(canonical).toBe(pair.enUrl);

      const huAlt = await page
        .locator('link[rel="alternate"][hreflang="hu-HU"]')
        .first()
        .getAttribute("href");
      const enAlt = await page
        .locator('link[rel="alternate"][hreflang="en-US"]')
        .first()
        .getAttribute("href");
      const xDefaultAlt = await page
        .locator('link[rel="alternate"][hreflang="x-default"]')
        .first()
        .getAttribute("href");

      expect(huAlt).toBe(pair.huUrl);
      expect(enAlt).toBe(pair.enUrl);
      expect(xDefaultAlt).toBe(pair.huUrl);

      // JSON-LD sémák érvényessége + Zéró Fix Ár
      const ldJsonRaw = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      expect(ldJsonRaw.length).toBeGreaterThan(0);
      for (const raw of ldJsonRaw) {
        expect(() => JSON.parse(raw)).not.toThrow();
        expect(raw).not.toContain('"priceRange"');
      }
    }

    // Képek betöltése az /en/about oldalon
    await page.goto("/en/about", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    const visibleImages = page.locator("img:visible");
    const imgCount = await visibleImages.count();
    expect(imgCount).toBeGreaterThan(0);
    for (let i = 0; i < imgCount; i++) {
      const img = visibleImages.nth(i);
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(
          async () =>
            img.evaluate((el) => (el as HTMLImageElement).naturalWidth),
          { timeout: 10_000 }
        )
        .toBeGreaterThan(0);
    }

    expect(errors).toEqual([]);
  });

  test("2. Magyar <-> Angol visszafelé hreflang a pár-oldalakon (/szia-norbi-vagyok, /adatvedelmi-szabalyzat, /felhasznalasi-feltetelek)", async ({
    page,
  }) => {
    const huRoutes = [
      {
        path: "/szia-norbi-vagyok",
        expectedEn: "https://webdude.hu/en/about",
      },
      {
        path: "/adatvedelmi-szabalyzat",
        expectedEn: "https://webdude.hu/en/privacy-policy",
      },
      {
        path: "/felhasznalasi-feltetelek",
        expectedEn: "https://webdude.hu/en/terms",
      },
    ];

    for (const item of huRoutes) {
      await visit(page, item.path);
      const enAlt = await page
        .locator('link[rel="alternate"][hreflang="en-US"]')
        .first()
        .getAttribute("href");
      expect(enAlt).toBe(item.expectedEn);
    }
  });

  test("3. /en globális link-izoláció: Header, Footer és CookieConsent 0 magyar linkkel", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    // Tiszta kontextusban nyitjuk meg, hogy a CookieConsent banner biztosan megjelenjen
    await page.goto("/en", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");

    // CookieConsent jogi link -> /en/privacy-policy
    const cookieDialog = page.getByRole("dialog");
    await expect(cookieDialog).toBeVisible({ timeout: 5_000 });
    const cookiePrivacyHref = await cookieDialog
      .locator("a")
      .first()
      .getAttribute("href");
    expect(cookiePrivacyHref).toBe("/en/privacy-policy");

    await dismissConsentBanner(page);

    // Footer linkek: Privacy Policy -> /en/privacy-policy, Terms -> /en/terms, About -> /en/about
    const footer = page.locator("footer");
    await expect(
      footer.locator('a[href="/en/privacy-policy"]').first()
    ).toBeAttached();
    await expect(footer.locator('a[href="/en/terms"]').first()).toBeAttached();
    await expect(footer.locator('a[href="/en/about"]').first()).toBeAttached();
    await expect(footer.locator('a[href="/en/contact"]').first()).toBeAttached();

    // Footerben ne maradjon magyar jogi/Rólam/Hírek link
    const footerHrefs = await footer
      .locator("a[href^='/']")
      .evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
    for (const href of footerHrefs) {
      expect(href).not.toMatch(
        /^\/(szia-norbi-vagyok|adatvedelmi-szabalyzat|felhasznalasi-feltetelek|hirek|kapcsolat)$/
      );
    }

    // Header Desktop nav EN linkek (`HeaderNavClient` <nav aria-label="Main navigation"> elemet renderel)
    const headerNav = page.locator('nav[aria-label="Main navigation"]');
    await expect(
      headerNav.locator('a[href="/en/about"]').first()
    ).toBeAttached();
    await expect(
      headerNav.locator('a[href="/en/services"]').first()
    ).toBeAttached();
    await expect(
      headerNav.locator('a[href="/en/portfolio"]').first()
    ).toBeAttached();
    await expect(
      headerNav.locator('a[href="/en/contact"]').first()
    ).toBeAttached();
    await expect(headerNav.locator('a[href="/hirek"]')).toHaveCount(0);

    expect(errors).toEqual([]);
  });

  test("4. LanguageSwitcher kétirányú váltás (/szia-norbi-vagyok <-> /en/about)", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    await visit(page, "/szia-norbi-vagyok");
    const switcherBtn = page
      .locator('button[aria-label="Switch language"]:visible')
      .first();
    await expect(switcherBtn).toBeVisible();
    await switcherBtn.click();

    await page.getByRole("button", { name: /English/i }).first().click();
    await expect(page).toHaveURL(/\/en\/about$/);

    // Visszaváltás magyarra
    const switcherBtnEn = page
      .locator('button[aria-label="Switch language"]:visible')
      .first();
    await expect(switcherBtnEn).toBeVisible();
    await switcherBtnEn.click();
    await page.getByRole("button", { name: /Magyar/i }).first().click();
    await expect(page).toHaveURL(/\/szia-norbi-vagyok$/);

    expect(errors).toEqual([]);
  });
});
