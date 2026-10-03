import { test, expect } from "@playwright/test";
import { dismissConsentBanner } from "./smoke-helpers";

/**
 * Smoke teszt — közönség/marketing útvonalak.
 *
 * **Miért ez a forma:** a korábbi verzió `page.locator(".grid")` és
 * `page.locator("h1")` szelektorokat használt, ami a main komponens
 * 5 `.grid`-et és 2 `h1`-et renderel → Playwright strict mode violation
 * (12/13 teszt elbukott). A smoke teszt **szemantikus** szelektorokat
 * használ (`getByRole`, szövegre szűrés), így a markup-osztályok
 * átalakítása nem töri el.
 */
test.describe("Közönség / marketing útvonalak", () => {
  /**
   * A hydration-figyelő. A `useEffect` utáni konzolhibák (hydration
   * mismatch, `pageerror`) a legdrágább SEO-hibák egyike, ezért a
   * smoke teszt minden kritikus útvonalon figyeli a konzolt.
   */
  const collectErrors = (page: import("@playwright/test").Page) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
    });
    page.on("pageerror", (err) => errors.push(`pageerror: ${String(err)}`));
    return errors;
  };

  /**
   * A hydration akkor kész, amikor a `load` esemény lefutott.
   *
   * **Miért nem `networkidle`?** A Next.js dev szerver HMR-websocketet
   * tart nyitva, így a hálózat sosem lesz teljesen csendes, és a
   * `networkidle` a 30 s-es teszt-timeouttal elhasal. Ez a megoldás
   * a valódi feltételt (a JS lefutott, a DOM kész) figyeli.
   */
  const waitForHydration = async (page: import("@playwright/test").Page) => {
    await page.waitForLoadState("load");
  };

  test("/ — 200-as válasz, egyetlen H1, hero CTA kattintható, nincs hydration-hiba", async ({
    page,
  }) => {
    const errors = collectErrors(page);

    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await dismissConsentBanner(page);

    // Pontosan EGY H1 — a SEO heading-hierarchia alapja (AGENTS.md 5. §).
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/weboldal/i);

    // Az elsődleges CTA-k léteznek és kattinthatók (nem küldjük el).
    // A CTA-szövegek változhatnak, ezért a href-címre szűrünk, nem a szövegre.
    const primaryCta = page.locator('a[href*="kapcsolat"]').first();
    await expect(primaryCta).toBeVisible();
    const href = await primaryCta.getAttribute("href");
    expect(href).toContain("kapcsolat");

    // Hydration-t jelző és konzoltiszta marad.
    await waitForHydration(page);
    expect(errors).toEqual([]);
  });

  test("/munkak — 200, H1 látható, a portfolio-kártyák renderelődnek", async ({
    page,
  }) => {
    const errors = collectErrors(page);

    const response = await page.goto("/munkak", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await dismissConsentBanner(page);

    const h1 = page.getByRole("heading", { level: 1 }).first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/eredmény/i);

    // A `works.ts` 9 projektje `<article>` elemet renderel.
    const cards = page.locator("article");
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);

    await waitForHydration(page);
    expect(errors).toEqual([]);
  });

  test("/munkak/btshop — a dedikált esettanulmány hero-ja betölt", async ({
    page,
  }) => {
    const errors = collectErrors(page);

    const response = await page.goto("/munkak/btshop", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await dismissConsentBanner(page);

    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    // A hero kép valódi méretű (a 7.14.x retina-javítás regressziós őre).
    const hero = page.locator("img").first();
    await expect(hero).toBeVisible();

    await waitForHydration(page);
    expect(errors).toEqual([]);
  });

  test("/hirek — 200, H1 látható, a blogbejegyzések listázódnak", async ({
    page,
  }) => {
    const errors = collectErrors(page);

    const response = await page.goto("/hirek", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await dismissConsentBanner(page);

    const h1 = page.getByRole("heading", { level: 1 }).first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/hírek/i);

    const posts = page.locator("article");
    await expect(posts.first()).toBeVisible();
    expect(await posts.count()).toBeGreaterThan(0);

    await waitForHydration(page);
    expect(errors).toEqual([]);
  });
});
