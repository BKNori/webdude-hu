import { test, expect } from "@playwright/test";
import { dismissConsentBanner } from "./smoke-helpers";

/**
 * Mobilmenű a11y-teszt — WCAG 2.4.3 (fókuszsorrend) és 2.1.2 (nincs csapda).
 *
 * **Miért `aria-controls` szelktor és nem `getByRole`?**
 * A `getByRole("button", { name: /menü/i })` a lokalizált `aria-label`-re
 * épül ("Menü megnyitása"), ami nyelvi vagy karakterkódolási
 * eltérésnél elhasal. Az `aria-controls="mobile-nav-menu"` attribútum
 * viszont magát az **ARIA-kapcsolatot** teszteszteli — ez az, amit a
 * WCAG elvár, és nyelvfüggetlen.
 */
test.describe("Mobilmenü (WCAG AA) — 390x844 viewport", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("a hamburger megnyitja a menüt, az ESC bezárja és visszaadja a fókuszt", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));

    await page.goto("/", { waitUntil: "domcontentloaded" });

    // A cookie banner mobilon lefedi a hamburger gombot — el kell
    // távolítani, különben a kattintás nem jut el a gombra.
    await dismissConsentBanner(page);

    // A toggle-t az ARIA-kapcsolat azonosítja (nyelvfüggetlen).
    const toggle = page.locator('button[aria-controls="mobile-nav-menu"]');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    // Nyitás.
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    // A panel rögzített, teljes képernyős, modal jellegű.
    const panel = page.locator("#mobile-nav-menu");
    await expect(panel).toBeVisible();
    await expect(panel).toHaveAttribute("role", "dialog");
    await expect(panel).toHaveAttribute("aria-modal", "true");

    const box = await panel.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box?.width ?? 0)).toBeGreaterThan(350);
    expect(Math.round(box?.height ?? 0)).toBeGreaterThan(700);

    // A bezáró gomb a toggle maga (a felirat ilyenkor bezáróra vált),
    // és továbbra is elérhető.
    await expect(toggle).toHaveAttribute("aria-label", /.+/);
    await expect(toggle).toBeVisible();

    // A fő navigációs menüpontok a képernyőn vannak (href-re szűrve,
    // nem szövegre — ez a nyelvi változástól független).
    for (const href of ["/hirek", "/kapcsolat", "/portal"]) {
      await expect(panel.locator(`a[href="${href}"]`).first()).toBeVisible();
    }

    // ESC bezárja, és a fókusz visszakerül a toggle-ra (WCAG 2.4.3).
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(toggle).toBeFocused();

    // Nincs JS-konzolhiba a teljes folyamat alatt.
    expect(consoleErrors).toEqual([]);
  });
});