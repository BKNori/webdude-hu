/**
 * Smoke teszt — konverziós útvonal (`/kapcsolat`).
 *
 * **Anti-Drain Policy:** a spec **NEM küldi el** a lead űrlapot.
 * A `lead.ts` Server Action valós Firebase írást indítana, ami
 * (a) adatbázis-megterhelés és (b) spam-lead szennyezés. Ezért:
 *  - csak a jelenlétet és a kattinthatóságot ellenőrizzük,
 *  - a lépcsős űrlapot nem léptetjük tovább a küldésig,
 *  - a hálózati író kérést **assertáljuk**, hogy nem történt.
 */
import { test, expect } from "@playwright/test";
import { visit } from "./smoke-helpers";

test.describe("Konverziós útvonal (/kapcsolat)", () => {
  test("kapcsolati űrlap megjelenítése", async ({ page }) => {
    await visit(page, "/kapcsolat");

    const form = page.locator("form");
    await expect(form).toBeVisible();

    // A kritikus mezők a látható űrlapon vannak.
    for (const name of ["name", "email"]) {
      await expect(form.locator(`[name="${name}"]`)).toBeVisible();
    }
  });

  test("pontosan egy H1 van az oldalon (SEO heading-hierarchia)", async ({
    page,
  }) => {
    await visit(page, "/kapcsolat");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });

  test("a két űrlapmód CTA-ja látható és kattintható", async ({ page }) => {
    await visit(page, "/kapcsolat");

    // A `ContactFormWrapper` két módot kínál: részletes ajánlatkérés
    // és egyszerű üzenet. Ezek a konverziós útvonal valódi CTA-i.
    for (const label of [/részletes ajánlatkérés/i, /egyszerű üzenet/i]) {
      const cta = page.getByRole("button", { name: label }).first();
      await expect(cta).toBeVisible();
      await expect(cta).toBeEnabled();

      // Csak hover — nem kattintunk, így nem váltunk űrlapot és
      // semmilyen adat nem kerül elküldésre.
      await cta.hover();
      await expect(cta).toBeVisible();
    }

    // Az egyik mód aktív (aria-pressed), tehát nem üres űrlap látszik.
    await expect(
      page.locator('button[aria-pressed="true"]').first()
    ).toBeVisible();
  });

  test("a betöltés önmagában nem ír lead adatot (Anti-Drain)", async ({
    page,
  }) => {
    const writes: string[] = [];
    page.on("request", (req) => {
      // A POST-okat kiszűrjük: a dev overlay / RSC-prefetch is POST-os,
      // csak a `lead` Server Action-hoz tartozó írás számítana.
      if (req.method() !== "GET" && /contact|lead/i.test(req.url())) {
        writes.push(`${req.method()} ${req.url()}`);
      }
    });

    await visit(page, "/kapcsolat");
    expect(writes).toEqual([]);
  });

  test("a fő CTA-k nem üres href-re mutatnak", async ({ page }) => {
    await visit(page, "/");

    // A főoldali elsődleges CTA-k léteznek és érvényes célra mutatnak.
    for (const cta of [
      page.locator('a[href*="kapcsolat"]').first(),
      page.getByRole("link", { name: /projektfelmérés/i }).first(),
    ]) {
      await expect(cta).toBeVisible();
      const href = await cta.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).not.toBe("#");
    }
  });
});