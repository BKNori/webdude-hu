/**
 * Smoke teszt — ügyfélportál (/portal) autentikációs fala.
 *
 * **Anti-Drain Policy:** a spec NEM jelentkezik be, nem hívja a
 * Firestore-t és nem ír adatot. Csak azt ellenőrzi, hogy a
 * nem-authenticated látogató **védett felületet** kap (a Zero-Prompt
 * Policy egyik alapköve: a privát kollekciók nem szivároghatnak ki).
 *
 * **Mit jelent a "jól betöltött fal":**
 *  1. 200-as válasz (nem 500, nem üres oldal),
 *  2. a fő tartalomterület nem üres,
 *  3. **nincs hálózati író kérés** a betöltés során.
 */
import { test, expect } from "@playwright/test";
import { dismissConsentBanner, watchConsoleErrors } from "./smoke-helpers";

test.describe("Ügyfélportál (/portal) — auth-fal", () => {
  test("200-as válasz és a portál váz betölt", async ({ page }) => {
    const errors = watchConsoleErrors(page);

    const response = await page.goto("/portal", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await page.waitForLoadState("load");
    await dismissConsentBanner(page);

    // A `PageWrapper` `#main-content` területe a DOM-ban van.
    await expect(page.locator("#main-content")).toBeAttached();

    // A portálnak van látható tartalma (nem üres oldal).
    const text = (await page.locator("body").innerText()).trim();
    expect(text.length).toBeGreaterThan(20);

    // Nincs futásidejű (pageerror) hiba.
    expect(errors).toEqual([]);
  });

  test("nem küld író hálózati kérést a betöltés során (Anti-Drain)", async ({
    page,
  }) => {
    const writes: string[] = [];
    page.on("request", (req) => {
      if (req.method() !== "GET") writes.push(`${req.method()} ${req.url()}`);
    });

    await page.goto("/portal", { waitUntil: "domcontentloaded" });
    await dismissConsentBanner(page);

    // **Anti-Drain garancia:** a betöltés önmagában nem indít írást.
    // (`networkidle` helyett `load` — a dev HMR-websocket miatt a hálózat
    // sosem csendes, de a betöltés itt már befejeződött.)
    await page.waitForLoadState("load");

    // A portal betöltő oldal sem írhat — a leképezés csak olvas.
    expect(writes).toEqual([]);
  });

  test("a portál nem szivárogtat privát kollekciónevet a DOM-ba", async ({
    page,
  }) => {
    await page.goto("/portal", { waitUntil: "domcontentloaded" });
    await dismissConsentBanner(page);

    // A privát Firestore kollekciók nevei nem kerülhetnek a markupba
    // (Zero-Prompt Policy: kizárólag Server Action-ből olvashatók).
    const html = await page.content();
    expect(html).not.toMatch(/private_prompts/);
  });
});
