import { test, expect } from "@playwright/test";

test.describe("Munkák oldal (/munkak)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/munkak");
  });

  test("oldal betöltése és megjelenítése", async ({ page }) => {
    await expect(page).toHaveTitle(/Referenciák/);
    await expect(page.locator("h1")).toContainText("Eredmények");
  });

  test("projektek grid megjelenítése", async ({ page }) => {
    const portfolioGrid = page.locator(".grid");
    await expect(portfolioGrid).toBeVisible();
    
    const projects = page.locator("article");
    const count = await projects.count();
    expect(count).toBeGreaterThan(0);
  });

  test("projekt kártya hover effekt", async ({ page }) => {
    const firstProject = page.locator("article").first();
    await firstProject.hover();
    
    // Ellenőrizzük, hogy a hover effekt működik (scale vagy border változás)
    const transform = await firstProject.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    expect(transform).not.toBe("none");
  });

  test("statisztikai kártyák megjelenítése", async ({ page }) => {
    const stats = page.locator("section:has-text('Projekt Készítve')");
    await expect(stats).toBeVisible();
  });
});
