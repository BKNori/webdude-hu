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
  /**
   * Timeout-ok.
   *
   * **Miért 60 s?** A `webServer` a `npm run dev`-et indítja, és a
   * Next.js 16 a dev induláskor újra-fordítja az útvonalak
   * on-demand konfigurációját. Az első kérés egy nehéz útvonalra
   * (pl. `/munkak/btshop` 12 MB hero-képpel) 30 s fölé is
   * emelkedhet — ez **nem valódi hiba**, csak hideg-indítás.
   * Production build (`npm run start`) esetén felesleges nagy
   * érték, és a `PLAYWRIGHT_BASE_URL` env-felülírással egy
   * production szerver is tesztelhető.
   */
  timeout: 60_000,
  expect: { timeout: 15_000 },
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
  /**
 * **Miért production (`npm run start`) és nem `npm run dev`?**
 *
 * A dev szerverrel három probléma volt, mind a smoke suite hibáját
 * okozta:
 *  1. a Turbopack dev az **első kérésre** fordít, így a
 *     `webServer.url` health-check vagy 120 s, vagy 180 s alatt
 *     timeoutolt → „Timed out waiting from config.webServer";
 *  2. a nyitott **HMR-websocket** miatt a `networkidle` sosem jön el;
 *  3. a dev-szerver warningjai (`middleware` deprecation) a teszt
 *     kimenetébe szóródnak.
 *
 * A production build (`npm run build` → `npm run start`) ezeket
 * megszünteti, **és valósabb**: azt teszteli, amit a látogató kap.
 * A buildnek már léteznie kell (`reuseExistingServer`), ha kézi
 * indításról van szó:
 *
 *   npm run build && npm run start        # terminál 1
 *   npx playwright test                   # terminál 2
 *
 * Vagy egy parancssorban, ha nincs nyitott szerver:
 *
 *   npm run build && npm run start &  npx playwright test
 */
webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        stdout: "pipe",
        stderr: "pipe",
      },
});
