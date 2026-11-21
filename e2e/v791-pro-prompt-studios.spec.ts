import { test, expect } from "@playwright/test";
import { dismissConsentBanner, watchConsoleErrors } from "./smoke-helpers";

const PRO_PROMPT_STUDIO_ROUTES = [
  "/portal/ai-muhely/online-grafika-prompt-studio",
  "/portal/ai-muhely/nyomda-prepress-prompt-studio",
  "/portal/ai-muhely/ruha-ai-muhely",
  "/portal/ai-muhely/szoftver-architektura-ai-muhely",
  "/portal/ai-muhely/elemzes-prompt-studio",
] as const;

test.describe("v7.91.0 — 5-Pilléres Pro Prompt Stúdiók E2E füstteszt", () => {
  for (const route of PRO_PROMPT_STUDIO_ROUTES) {
    test(`${route} HTTP 200, noindex meta és 0 pageerror mellett betölt`, async ({
      page,
    }) => {
      const errors = watchConsoleErrors(page);

      const response = await page.goto(route, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status()).toBe(200);
      await page.waitForLoadState("load");
      await dismissConsentBanner(page);

      const robotsContent = await page
        .locator('meta[name="robots"]')
        .first()
        .getAttribute("content");
      expect(robotsContent ?? "").toContain("noindex");

      const bodyText = (await page.locator("body").innerText()).trim();
      expect(bodyText.length).toBeGreaterThan(20);
      expect(errors).toEqual([]);
    });
  }
});
