import { test, expect } from "@playwright/test";

test.describe("Hírek oldal (/hirek)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/hirek");
  });

  test("oldal betöltése és megjelenítése", async ({ page }) => {
    await expect(page).toHaveTitle(/Szakmai Hírek/);
    await expect(page.locator("h1")).toContainText("Hírek");
  });

  test("blog bejegyzések megjelenítése", async ({ page }) => {
    const blogGrid = page.locator(".grid");
    await expect(blogGrid).toBeVisible();
    
    const posts = page.locator("article");
    const count = await posts.count();
    expect(count).toBeGreaterThan(0);
  });

  test("blog bejegyzés linkje működik", async ({ page }) => {
    const firstPost = page.locator("article").first();
    await firstPost.click();
    
    await expect(page).toHaveURL(/\/hirek\//);
  });

  test("JSON-LD schema jelen van", async ({ page }) => {
    const schemaScript = page.locator('script[type="application/ld+json"]');
    await expect(schemaScript).toHaveCount(1);
  });
});
