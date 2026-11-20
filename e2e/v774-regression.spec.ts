import { expect, test } from "@playwright/test";
import { visit, watchConsoleErrors } from "./smoke-helpers";

/**
 * v7.75.0 Regressziós E2E csomag (v7.72.0 – v7.74.1 fejlesztések lefedettsége).
 *
 * Lefedett területek:
 *  a) GET /llms.txt (AI crawler discovery fájl)
 *  b) Kétirányú hreflang (hu-HU <-> en-US <-> x-default)
 *  c) Egyetlen H1 garancia a felújított szolgáltatásoldalakon
 *  d) EN i18n szivárgásmentesség, Dual Theme váltás és törött kép ellenőrzés
 */
test.describe("v7.74.x Regressziós E2E ellenőrzések", () => {
  test("a) /llms.txt válasz 200 OK és tartalmazza a kötelező entitásokat", async ({
    request,
  }) => {
    const response = await request.get("/llms.txt");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("WebDude");
    expect(body).toContain("Balog Norbert");
    expect(body).toContain("https://webdude.hu");
  });

  test("b) Kétirányú hreflang kapcsolatok (/szolgaltatasok <-> /en/services, /kapcsolat <-> /en/contact)", async ({
    page,
  }) => {
    const pairs = [
      {
        path: "/szolgaltatasok",
        expectedHu: "https://webdude.hu/szolgaltatasok",
        expectedEn: "https://webdude.hu/en/services",
      },
      {
        path: "/en/services",
        expectedHu: "https://webdude.hu/szolgaltatasok",
        expectedEn: "https://webdude.hu/en/services",
      },
      {
        path: "/kapcsolat",
        expectedHu: "https://webdude.hu/kapcsolat",
        expectedEn: "https://webdude.hu/en/contact",
      },
      {
        path: "/en/contact",
        expectedHu: "https://webdude.hu/kapcsolat",
        expectedEn: "https://webdude.hu/en/contact",
      },
    ];

    for (const pair of pairs) {
      await visit(page, pair.path);

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

      expect(huAlt).toBe(pair.expectedHu);
      expect(enAlt).toBe(pair.expectedEn);
      expect(xDefaultAlt).toBe(pair.expectedHu);
    }
  });

  test("c) Pontosan 1 db látható <h1> van a pótolt szolgáltatásoldalakon", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    for (const route of [
      "/szolgaltatasok/ai-kep-es-videogeneralas",
      "/szolgaltatasok/egyedi-arculattervezes-logo",
    ]) {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      await page.waitForLoadState("load");

      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1.first()).toBeVisible();
    }

    expect(errors).toEqual([]);
  });

  test("d1) /en főoldal: Dual Theme váltás (light -> dark), 0 magyar szivárgás a Dashboardon és Footerben", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    await visit(page, "/en");

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "light");

    const themeToggleBtn = page
      .locator('button[aria-label="Switch to dark mode"]:visible')
      .first();
    await expect(themeToggleBtn).toBeVisible();
    await themeToggleBtn.click();

    await expect(html).toHaveAttribute("data-theme", "dark");

    // Hero Dashboard kártya és főoldal magyar maradványok nélkül
    const mainText = (await page.locator("main, #main-content").first().innerText()) ?? "";
    expect(mainText).not.toMatch(
      /Organikus forgalom|Konverzió növekedés|6 hónap alatt|A\/B tesztelés után|Grafika/i
    );

    // Footer magyar szivárgás nélkül
    const footerText = (await page.locator("footer").innerText()) ?? "";
    expect(footerText.length).toBeGreaterThan(20);
    expect(footerText).not.toMatch(
      /Szolgáltatások|Kapcsolatfelvétel|Minden jog fenntartva|Adatvédelmi|Impresszum|Főoldal/i
    );

    expect(errors).toEqual([]);
  });

  test("d2) /en/contact: Dual Theme (light alapértelmezett), lokalizált ContactForm, 0 magyar szöveg", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);
    const writes: string[] = [];

    page.on("request", (req) => {
      if (
        req.method() !== "GET" &&
        /contact|lead|firestore\.googleapis\.com/i.test(req.url())
      ) {
        writes.push(`${req.method()} ${req.url()}`);
      }
    });

    await visit(page, "/en/contact");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("h1")).toHaveCount(1);

    const formSectionText =
      (await page.locator("form").locator("..").innerText()) ?? "";
    expect(formSectionText).not.toMatch(
      /Részletes ajánlatkérés|Egyszerű üzenet|Üzenet küldése|Telefonszám|Teljes név/i
    );

    const footerText = (await page.locator("footer").innerText()) ?? "";
    expect(footerText).not.toMatch(
      /Szolgáltatások|Kapcsolatfelvétel|Minden jog fenntartva/i
    );

    expect(writes).toEqual([]);
    expect(errors).toEqual([]);
  });

  test("d3) Képek betöltése (naturalWidth > 0) a főoldalon, az AI Workflow és a SEO Audit Pro oldalakon", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    for (const route of [
      "/",
      "/szolgaltatasok/ai-workflow-kialakitas",
      "/termekek/seo-audit-pro",
    ]) {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      await page.waitForLoadState("load");

      // Görgessük végig az oldalt a lazy-loaded képek betöltéséhez
      await page.evaluate(async () => {
        const step = Math.max(window.innerHeight, 600);
        for (let y = 0; y <= document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });

      const images = page.locator("img:visible");
      const count = await images.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(
            async () =>
              img.evaluate((el) => {
                const imageEl = el as HTMLImageElement;
                return {
                  complete: imageEl.complete,
                  naturalWidth: imageEl.naturalWidth,
                  src: imageEl.currentSrc || imageEl.getAttribute("src") || "",
                };
              }),
            { timeout: 10_000 }
          )
          .toMatchObject({ complete: true });

        const info = await img.evaluate((el) => {
          const imageEl = el as HTMLImageElement;
          return {
            naturalWidth: imageEl.naturalWidth,
            src: imageEl.currentSrc || imageEl.getAttribute("src") || "",
          };
        });
        expect(
          info.naturalWidth,
          `Broken image on ${route}: ${info.src}`
        ).toBeGreaterThan(0);
      }
    }

    expect(errors).toEqual([]);
  });
});
