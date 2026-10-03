import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E konfiguráció — smoke szint.
 *
 * **Szemlélet:** ez NEM teljes funkcionális tesztharness, hanem
 * „leállj, ha az alapok nem működnek" őr. Ezért:
 *  - gyors: egy projekt (Chromium), pár másodperc,
 *  - a smoke tesztek nem írnak adatot (Anti-Drain Policy),
 *  - a dev szerver automatikusan indul el és leáll a futás végén.
 *
 * **Több böngésző futtatása** (nem smoke, hanem cross-browser QA):
 *   `npx playwright test --project=firefox --project=webkit`
 * Ehhez a `npx playwright install firefox webkit` előkészítés szükséges.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // A hálózati érzékeny smoke teszteknél 1 retry sok churnt okoz;
  // a CI-ben 2, ahol a flakiness valódi regressziót takarhat.
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // Smoke: gyors szöveges riport a CI logban, HTML csak helyben.
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  timeout: 30_000,
  expect: { timeout: 7_000 },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    // A smoke teszt a szerveroldali választ ellenőrzi; a hydration-hibák
    // a konzolon jelennek meg, ezért nincs szükség teljes JS-időre.
    actionTimeout: 10_000,
  },
  projects: [
    {
      name: "chromium",
      // A mobil-spec csak a `mobile-chrome` projektben fut értelmesen
      // (a hamburger desktopon nem létezik).
      testIgnore: /mobile-menu\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      // Opcionális: `npx playwright test --project=mobile-chrome`
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
      testMatch: /mobile-menu\.spec\.ts/,
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
