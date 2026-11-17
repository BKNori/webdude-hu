/**
 * A blog útvonal **a `munkak.spec.ts` „Közönség / marketing" csoportjában**
 * fut (`/hirek` teszt) — ez a fájl a 7.19.0 sprintben a duplikáció
 * megszüntetése után csak a tartalmi mélységet ellenőrzi, ami a
 * `/hirek` listát megkülönbözteti a többi marketing oldaltól.
 *
 * **Történet:** a korábbi `hirek.spec.ts` a `munkak.spec.ts`-hez
 * szinte azonos teszteket tartalmazott (`.grid`, `article`,
 * `application/ld+json` szelektorok), és mind elbukott strict mode
 * violation miatt. A `/hirek` alap-útvonaltesztje a közös spec-ben
 * van; itt a **bejegyzés-navigáció** és a **JSON-LD** maradt.
 */
import { test, expect } from "@playwright/test";
import { dismissConsentBanner, watchConsoleErrors } from "./smoke-helpers";

test.describe("Hírek oldal (/hirek) — tartalmi ellenőrzések", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/hirek", { waitUntil: "domcontentloaded" });
    await dismissConsentBanner(page);
  });

  test("blogbejegyzés linkje a részletoldalra navigál", async ({ page }) => {
    const firstPost = page.locator("article").first();
    await expect(firstPost).toBeVisible();

    // A kártyán belüli link — nem a fejléc vagy a CTA.
    const postLink = firstPost.getByRole("link").first();
    await expect(postLink).toBeVisible();

    const href = await postLink.getAttribute("href");
    expect(href).toMatch(/^\/hirek\/.+/);
  });

  test("JSON-LD sémák érvényesek és a blog-lista jelölt", async ({
    page,
  }) => {
    const schemas = page.locator('script[type="application/ld+json"]');
    expect(await schemas.count()).toBeGreaterThan(0);

    const types = await schemas.evaluateAll((nodes) =>
      nodes.map((n) => {
        try {
          const parsed = JSON.parse(n.textContent ?? "{}") as {
            "@type"?: unknown;
            mainEntity?: { "@type"?: unknown };
          };
          const t = parsed["@type"];
          const nested = parsed?.mainEntity?.["@type"];
          return [
            Array.isArray(t) ? t.join("+") : String(t ?? ""),
            Array.isArray(nested) ? nested.join("+") : String(nested ?? ""),
          ]
            .filter(Boolean)
            .join("+");
        } catch {
          return "PARSE_HIBA";
        }
      })
    );

    // Nincs hibásan serializált séma (a 7.17.0/7.18.0 JSON-LD sprintjeinek őre).
    expect(types).not.toContain("PARSE_HIBA");
    // A blogoldal a bejegyzéslistát `CollectionPage` -> `ItemList`-ként jelöli.
    expect(types.some((t) => t.includes("ItemList"))).toBe(true);
  });

  test("2026-os GEO/AEO szakcikk részletoldal: TechArticle + FAQPage JSON-LD és egyetlen <h1>", async ({
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

    expect(await page.locator("h1").count()).toBe(1);
    await expect(page.getByText("Gyors összefoglaló (TL;DR)")).toBeVisible();
    await expect(page.locator("article table").first()).toBeVisible();

    const parsedSchemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) =>
        nodes.map((n) => JSON.parse(n.textContent ?? "{}"))
      );

    const schemaTypes = parsedSchemas.map((s) => s["@type"]);
    expect(schemaTypes).toContain("BreadcrumbList");
    expect(schemaTypes).toContain("TechArticle");
    expect(schemaTypes).toContain("FAQPage");

    const techArticle = parsedSchemas.find((s) => s["@type"] === "TechArticle");
    expect(techArticle?.author?.name).toBe("Balog Norbert");
    expect(techArticle?.publisher?.foundingDate).toBe("2009");

    const faqPage = parsedSchemas.find((s) => s["@type"] === "FAQPage");
    expect(Array.isArray(faqPage?.mainEntity)).toBe(true);
    expect(faqPage.mainEntity.length).toBe(4);
    expect(errors).toEqual([]);
  });
});
