/**
 * Közös smoke-segédek.
 */
import { Page } from "@playwright/test";

/**
 * Smoke-oldal megnyitása: betöltés → `load` → cookie-banner eltávolítása.
 *
 * **Miért kell a `waitForLoadState("load")`?**
 * A `ContactFormWrapper` és a `HeaderNavClient` klienskomponens. A
 * `domcontentloaded` esemény a RSC-klienskomponensek befuttatása
 * *előtt* fires, így a `form` és a `button` elemek még nincsenek a
 * DOM-ban → a `toBeVisible()` "element(s) not found"-dal bukik. A
 * `load` állapotra várva a hydration már lefutott.
 *
 * **Miért kell a banner-eltávolítás?**
 * A `CookieConsent` minden oldalon megjelenik az első látogatáskor
 * (localStorage nélkül), és **mobilon lefedi a hamburger gombot** —
 * emiatt a `click()` nem találja el. Termékoldali javításként
 * javasolt, hogy a banner ne fedje a header elemeit.
 */
export async function visit(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load");
  await dismissConsentBanner(page);
}

/** A cookie consent banner elutasítása, ha látható. */
export async function dismissConsentBanner(page: Page): Promise<void> {
  const bannerButton = page
    .getByRole("button", { name: /elutasítom|elfogadom/i })
    .first();

  try {
    await bannerButton.waitFor({ state: "visible", timeout: 2_500 });
    await bannerButton.click();
    // Megvárjuk, hogy eltűnjön, különben a következő kattintás
    // még mindig blokkolt lenne.
    await bannerButton.waitFor({ state: "hidden", timeout: 3_000 });
  } catch {
    // Nincs banner (már eldöntött, vagy nincs localStorage) → nincs teendő.
  }
}