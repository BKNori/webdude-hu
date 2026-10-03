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
import { dismissConsentBanner } from "./smoke-helpers";

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
          const parsed = JSON.parse(n.textContent ?? "{}");
          const t = parsed["@type"];
          return Array.isArray(t) ? t.join("+") : String(t ?? "");
        } catch {
          return "PARSE_HIBA";
        }
      })
    );

    // Nincs hibásan serializált séma (a 7.17.0/7.18.0 JSON-LD sprintjeinek őre).
    expect(types).not.toContain("PARSE_HIBA");
    // A blogoldal a bejegyzéslistát `ItemList`-ként jelöli.
    expect(types.some((t) => t.includes("ItemList"))).toBe(true);
  });
});
