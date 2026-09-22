import { test, expect } from "@playwright/test";

test.describe("Mobilmenü (WCAG AA) — 390x844 iPhone viewport", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger megnyitja a menüt, tételek láthatók, ESC bezárja", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));

    await page.goto("/", { waitUntil: "domcontentloaded" });

    // A hamburger toggle csak mobilon látható.
    const toggle = page.getByRole("button", { name: /menü/i });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    // Megnyitás kattintással.
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    // A panel rögzített, teljes képernyős, görgethető.
    const panel = page.locator("#mobile-nav-menu");
    await expect(panel).toBeVisible();
    const box = await panel.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box?.width ?? 0)).toBeGreaterThan(350);
    expect(Math.round(box?.height ?? 0)).toBeGreaterThan(700);

    // Az X bezáró ikon elérhető és kattintható.
    await expect(
      page.getByRole("button", { name: /menü bezárása/i })
    ).toBeVisible();

    // Kötelező menüpontok a képernyőn.
    for (const label of [
      "Norbi",
      "AI Megoldások",
      "Szolgáltatások",
      "Termékek",
      "Munkáim",
      "Hírek",
      "Ügyfélportál",
      "Kapcsolat",
    ]) {
      await expect(panel.getByText(label, { exact: true }).first()).toBeVisible();
    }

    // Screenshot a kinyitott menüről.
    await page.screenshot({ path: "mobile-menu-open.png", fullPage: false });

    // ESC bezárja, a fókusz pedig visszakerül a toggle gombra.
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(toggle).toBeFocused();

    // Nincs JS-konzolhiba a teljes folyamat alatt.
    expect(consoleErrors).toEqual([]);
  });
});
