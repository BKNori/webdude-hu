/**
 * Saját kód hibáinak kiszűrése a konzolfogyasztásból.
 *
 * **Miért kell ez?** A smoke suite `pageerror` + `console.error`
 * figyelést használ a hydration- és regressziós hibákra. Az oldal
 * azonban **külső, harmadik fél analitikai scripteket** is tölt be
 * (Microsoft Clarity, Google Tag Manager, GA4). Ezek a szolgáltatóik
 * saját, minifikált kódját futtatják, és **nem a WebDude regressziói** —
 * a Clarity ráadásul productionben `TypeError`-t dob (`a[c] is not a
 * function` a `clarity.ms/tag/*` bundle-jében), amit semmi nem tud
 * javítani a mi oldalunkon.
 *
 * **Amit ez NEM takar el:** minden `pageerror`, aminek nincs külső
 * domainje (vagy a saját originre mutat), így a valódi kódhibák
 * változatlanul buknak.
 *
 * A 7.19.0-ban ez a szűrő nélkül a suite 3 tesztet buktatott hamis
 * pozitívval — ahol a hiba egyik esetben sem a mi kódunkban volt.
 */
export const EXTERNAL_ERROR_PATTERNS: RegExp[] = [
  /clarity\.ms/i,
  /googletagmanager\.com/i,
  /google-analytics\.com/i,
  /gtag\/js/i,
  /hotjar/i,
  /connect\.facebook\.net/i,
];

/**
 * Igaz, ha a hiba a saját kódunkból származik (vagy ismeretlen
 * forrásból — azokat is átengedjük, hogy ne maszkoljuk a hibákat).
 */
export function isOwnError(text: string): boolean {
  return !EXTERNAL_ERROR_PATTERNS.some((re) => re.test(text));
}

/**
 * Konzol-figyelőt építő helper a smoke tesztekhez.
 *
 * Használat:
 * ```ts
 * const errors = watchConsoleErrors(page);
 * // ... teszt ...
 * expect(errors).toEqual([]);
 * ```
 */
export function watchConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = `console: ${msg.text()}`;
    if (isOwnError(text)) errors.push(text);
  });
  page.on("pageerror", (err) => {
    const text = `pageerror: ${err.stack ?? String(err)}`;
    if (isOwnError(text)) errors.push(text);
  });
  return errors;
}

/**
 * Közös smoke-segédek.
 */
import { Page } from "@playwright/test";

/**
 * Smoke-oldal megnyitása: betöltés → `load` → cookie-banner döntés.
 *
 * **Miért kell a `waitForLoadState("load")`?** A `ContactFormWrapper`
 * és a `HeaderNavClient` klienskomponensek. A `domcontentloaded`
 * esemény a RSC-klienskomponensek befuttatása *előtt* fires, így a
 * `form` és `button` elemek még nincsenek a DOM-ban → a
 * `toBeVisible()` "element(s) not found"-dal bukik.
 *
 * **Miért oldjuk fel a bannert itt, ha már nem takar semmit?**
 * A 7.19.0 javítás előtt a banner a hamburger fölött volt (`z-50`),
 * és fedte a gombot. A javítás óta (`z-30`) nem takar, de a smoke
 * suite **determinista környezetet** igényel: egy megjelenő banner
 * egy extra, fókuszolható réteget hozna a DOM-ba, ami a
 * `getByRole(...).first()` szelektorokat (és a hover-teszteket)
 * elmozdíthatná. A banner feloldása ezért **tesztizoláció**, nem
 * kerülőút — a `mobile-menu.spec.ts` viszont szándékosan NEM
 * oldja fel, és kifejezetten a banner jelenlétében kattint.
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