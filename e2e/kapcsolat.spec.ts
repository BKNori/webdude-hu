import { test, expect } from "@playwright/test";

test.describe("Kapcsolat oldal (/kapcsolat)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/kapcsolat");
  });

  test("oldal betöltése és megjelenítése", async ({ page }) => {
    await expect(page).toHaveTitle(/Kapcsolat/);
    await expect(page.locator("h1")).toContainText("Kapcsolat");
  });

  test("kapcsolati űrlap megjelenítése", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toBeVisible();
    
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');
    
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
  });

  test("űrlap validáció - kötelező mezők", async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Ellenőrizzük, hogy a validációs hibaüzenet megjelenik
    const errorMessage = page.locator("text=/kötelező/i");
    await expect(errorMessage).toBeVisible();
  });

  test("űrlap kitöltése és küldése", async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');
    
    await nameInput.fill("Teszt Felhasználó");
    await emailInput.fill("teszt@example.com");
    await messageInput.fill("Ez egy teszt üzenet.");
    
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Ellenőrizzük, hogy a küldés sikeres vagy hibaüzenet jelenik
    const successMessage = page.locator("text=/siker/i");
    const errorMessage = page.locator("text=/hiba/i");
    
    await expect(successMessage.or(errorMessage)).toBeVisible();
  });
});
