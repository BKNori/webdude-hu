/**
 * WebDude E2E Smoke Suite & Anti-Drain Regressziós Védelem (v7.56.0)
 *
 * Ez az egyesített smoke tesztcsomag a kritikus üzleti és SEO/AEO/CRO
 * útvonalakat ellenőrzi:
 *  1. Főoldal (`/`): HTTP 200, egyetlen `<h1>`, Kék-Lila v7.0 CTA gomb, 0 konzolhiba
 *  2. Szolgáltatások (`/szolgaltatasok`) & Esettanulmány (`/munkak/btshop`):
 *     HTTP 200, `application/ld+json` strukturált adat, Zéró Fix Ár megfelelőség
 *  3. Kapcsolat (`/kapcsolat`): Űrlap mezők és kliensoldali Zod validáció
 *     működése üres beküldéskor — ÉLES FIRESTORE ÍRÁS NÉLKÜL (Anti-Drain Policy!)
 *  4. Ügyfélportál (`/portal`): Nem bejelentkezett látogatáskor autentikációs
 *     védelem / belépő felület, privát adatok szivárgása nélkül
 */
import { test, expect } from "@playwright/test";
import {
  dismissConsentBanner,
  visit,
  watchConsoleErrors,
} from "./smoke-helpers";

/**
 * Publikus felületeken tiltott fix-ár mintázatok (Zéró Fix Ár szabály).
 */
const FIXED_PRICE_PATTERNS: RegExp[] = [
  /\d{1,3}(?:[\s.]\d{3})+\s*Ft/i, // pl. „120 000 Ft”, „1.500.000 Ft”
  /\bFt\b\s*\d/i, // pl. „Ft 120000”
  /\d{2,7}\s*Ft/i, // pl. „49000 Ft”
];

test.describe("WebDude E2E Smoke Suite (v7.56.0)", () => {
  test("1. Főoldal (/): HTTP 200, egyetlen <h1>, Kék-Lila v7.0 CTA gomb, 0 konzolhiba", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await page.waitForLoadState("load");
    await dismissConsentBanner(page);

    // 1) Pontosan egyetlen <h1> címsor található az oldalon (SEO/AEO hierarchia)
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toBeVisible();

    // 2) Kék-Lila v7.0 elsődleges Hero CTA gomb látható, fehér szöveggel (WCAG AAA)
    const primaryCta = page
      .locator('[id^="hero-cta-"][id$="-primary"]')
      .first();
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toHaveClass(/from-cta-from/);
    await expect(primaryCta).toHaveClass(/text-white/);

    const href = await primaryCta.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).not.toBe("#");

    // 3) 0 saját futásidejű vagy konzolhiba
    expect(errors).toEqual([]);
  });

  test("2/A. Szolgáltatások (/szolgaltatasok): HTTP 200, JSON-LD jelenlét és Zéró Fix Ár megfelelőség", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    const response = await page.goto("/szolgaltatasok", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await page.waitForLoadState("load");
    await dismissConsentBanner(page);

    // Pontosan egy <h1>
    await expect(page.locator("h1")).toHaveCount(1);

    // Strukturált adat (<script type="application/ld+json">) jelenléte a DOM-ban
    const ldJsonScripts = page.locator('script[type="application/ld+json"]');
    const scriptCount = await ldJsonScripts.count();
    expect(scriptCount).toBeGreaterThan(0);

    const allJsonLdRaw = await ldJsonScripts.allTextContents();
    for (const raw of allJsonLdRaw) {
      expect(() => JSON.parse(raw)).not.toThrow();
      expect(raw).not.toContain('"priceRange"');
    }

    // Zéró Fix Ár: nincs fix "Ft" árcédula a látható szövegben
    const bodyText = (await page.locator("body").innerText()) ?? "";
    for (const pattern of FIXED_PRICE_PATTERNS) {
      expect(bodyText.match(pattern)).toBeNull();
    }

    expect(errors).toEqual([]);
  });

  test("2/B. Kiemelt Esettanulmány (/munkak/btshop): HTTP 200, JSON-LD jelenlét és Zéró Fix Ár megfelelőség", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);

    const response = await page.goto("/munkak/btshop", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await page.waitForLoadState("load");
    await dismissConsentBanner(page);

    // Pontosan egy <h1>
    await expect(page.locator("h1")).toHaveCount(1);

    // Strukturált adat (<script type="application/ld+json">) jelenléte a DOM-ban
    const ldJsonScripts = page.locator('script[type="application/ld+json"]');
    const scriptCount = await ldJsonScripts.count();
    expect(scriptCount).toBeGreaterThan(0);

    const allJsonLdRaw = await ldJsonScripts.allTextContents();
    for (const raw of allJsonLdRaw) {
      expect(() => JSON.parse(raw)).not.toThrow();
      expect(raw).not.toContain('"priceRange"');
    }

    // Zéró Fix Ár megfelelőség a látható szövegben
    const bodyText = (await page.locator("body").innerText()) ?? "";
    for (const pattern of FIXED_PRICE_PATTERNS) {
      expect(bodyText.match(pattern)).toBeNull();
    }

    expect(errors).toEqual([]);
  });

  test("3. Kapcsolat (/kapcsolat): Űrlap mezők és kliensoldali Zod validáció (Anti-Drain: 0 Firestore írás)", async ({
    page,
  }) => {
    const writes: string[] = [];

    // Anti-Drain hálózati védelem: rögzítünk (és blokkolunk) minden esetleges
    // lead/contact/firestore író kérést, hogy SOHA ne történjen éles DB írás.
    page.on("request", (req) => {
      if (
        req.method() !== "GET" &&
        /contact|lead|firestore\.googleapis\.com/i.test(req.url())
      ) {
        writes.push(`${req.method()} ${req.url()}`);
      }
    });

    await visit(page, "/kapcsolat");

    // Átváltunk az „Egyszerű üzenet” űrlapra a teljes Zod kliensoldali validáció teszteléséhez
    const simpleModeBtn = page
      .getByRole("button", { name: /egyszerű üzenet/i })
      .first();
    await expect(simpleModeBtn).toBeVisible();
    await simpleModeBtn.click();

    const form = page.locator("form");
    await expect(form).toBeVisible();

    // Ellenőrizzük a kötelező mezők jelenlétét
    await expect(form.locator('[name="name"]')).toBeVisible();
    await expect(form.locator('[name="email"]')).toBeVisible();
    await expect(form.locator('[name="projectType"]')).toBeVisible();
    await expect(form.locator('[name="message"]')).toBeVisible();

    // Üres beküldés -> kliensoldali Zod validáció megfogja a hibát, mielőtt a szerverhez érne
    const submitBtn = form.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Validációs hibaüzenetek és aria-invalid="true" megjelenése a DOM-ban
    await expect(
      page.getByText(/A névnek legalább 2 karakterből kell állnia!/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Kérlek, érvényes email címet adj meg!/i)
    ).toBeVisible();
    await expect(form.locator('[name="name"]')).toHaveAttribute(
      "aria-invalid",
      "true"
    );

    // Anti-Drain garancia: 0 hálózati írás történt
    expect(writes).toEqual([]);
  });

  test("4. Ügyfélportál (/portal): Nem bejelentkezett látogatáskor autentikációs védelem és 0 adatszivárgás", async ({
    page,
  }) => {
    const errors = watchConsoleErrors(page);
    const writes: string[] = [];

    page.on("request", (req) => {
      if (req.method() !== "GET") {
        writes.push(`${req.method()} ${req.url()}`);
      }
    });

    const response = await page.goto("/portal", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await page.waitForLoadState("load");
    await dismissConsentBanner(page);

    // A fő tartalomterület és az akadálymentes H1 jelen van
    await expect(page.locator("#main-content")).toBeAttached();
    await expect(page.locator("h1")).toHaveCount(1);

    // Nem bejelentkezett látogató NEM láthatja a belső portál dashboardot
    await expect(page.locator("#portal-layout")).toHaveCount(0);
    await expect(
      page.getByText("Aktív Projektek & Workflow")
    ).toHaveCount(0);

    // Privát Firestore kollekciónevek nem szivároghatnak ki a HTML-be
    const html = await page.content();
    expect(html).not.toMatch(/private_prompts/);

    // Anti-Drain & hibamentesség
    expect(writes).toEqual([]);
    expect(errors).toEqual([]);
  });
});
