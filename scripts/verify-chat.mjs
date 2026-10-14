/**
 * Célzott böngészős validáció a WebDudeChat kliensoldali összeomlásához.
 *
 * Ellenőrzi:
 *  1. nincs saját (localhost-os) konzolhiba / pageerror a betöltés során,
 *  2. a chat trigger gomb renderelődik (nincs React-összeomlás),
 *  3. a chat panel megnyílik és megjeleníti az üdvözlő üzenetet,
 *  4. a gyorsválasz beküldése után a `sendMessage` → `/api/chat`
 *     útvonal lefut klienshiba nélkül,
 *  5. a `postMessage` hívások száma nem száll el (végtelen ciklus jel).
 *
 * A külső analitikai scriptek (Clarity, GTM, GA4) hibáit kiszűri — lásd
 * `e2e/smoke-helpers.ts` EXTERNAL_ERROR_PATTERNS és a CHANGELOG [7.20.0].
 *
 * Futtatás: node scripts/verify-chat.mjs
 */
import { chromium } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";

/** A saját kódunk hibái az érdekesek, a külső analitikáé nem. */
const EXTERNAL_ERROR_PATTERNS = [
  /clarity\.ms/i,
  /googletagmanager\.com/i,
  /google-analytics\.com/i,
  /doubleclick\.net/i,
  /hotjar\.com/i,
  /facebook\.net/i,
  /connect\.facebook\.net/i,
];

const isOwnError = (text) =>
  !EXTERNAL_ERROR_PATTERNS.some((re) => re.test(text));

const results = {
  ownConsoleErrors: [],
  ownPageErrors: [],
  externalErrors: [],
  triggerExists: false,
  panelOpened: false,
  greetingVisible: false,
  messageSent: false,
  replyReceived: false,
  errorAlertShown: false,
  postMessageCount: 0,
  crash: false,
};

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

// postMessage számláló — a végtelen ciklus detektálásához.
await page.addInitScript(() => {
  window.__postMsgCount = 0;
  const orig = window.postMessage.bind(window);
  window.postMessage = function patchedPostMessage(...args) {
    window.__postMsgCount = (window.__postMsgCount || 0) + 1;
    return orig(...args);
  };
});

page.on("console", (msg) => {
  if (msg.type() !== "error") return;
  const text = msg.text();
  if (isOwnError(text)) results.ownConsoleErrors.push(text);
  else results.externalErrors.push(text);
});

page.on("pageerror", (err) => {
  const text = `${err.message} ${err.stack || ""}`;
  if (isOwnError(text)) results.ownPageErrors.push(String(err.message));
  else results.externalErrors.push(String(err.message));
});

try {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });

  // 1. Chat trigger jelenléte (React nem omlik össze).
  const trigger = page.locator("#chat-trigger-btn");
  results.triggerExists = (await trigger.count()) > 0;

  if (results.triggerExists) {
    await trigger.click();
    await page.waitForTimeout(800);

    // 2. Panel + üdvözlő szöveg.
    const panel = page.locator("div.fixed.bottom-24");
    results.panelOpened = (await panel.count()) > 0;
    results.greetingVisible = results.panelOpened
      ? (await panel.textContent()).includes("WebDude Asszisztens")
      : false;

    // 3. Gyorsválasz küldése (sendMessage → /api/chat).
    // Polling: megvárjuk, amíg a stream VALÓDI választ ad (a betöltés-
    // buborék eltűnik + a user buborékon kívül van hosszú assistant szöveg),
    // vagy hibajelzés jön (role="alert" / AI SDK hibaüzenet).
    const quickReply = panel
      .locator("button")
      .filter({ hasText: "SaaS / Webapp fejlesztés" })
      .first();
    if ((await quickReply.count()) > 0) {
      await quickReply.click();
      results.messageSent = true;

      const deadline = Date.now() + 45000;
      while (Date.now() < deadline) {
        await page.waitForTimeout(1000);
        const panelText = (await panel.textContent()) || "";
        results.errorAlertShown =
          (await panel.locator('[role="alert"]').count()) > 0 ||
          panelText.includes("An error occurred") ||
          panelText.includes("Valami hiba történt") ||
          panelText.includes("nem tudott válaszolni") ||
          panelText.includes("nem elérhető");
        if (results.errorAlertShown) break;

        const loading = await panel
          .locator("span.h-2.w-2.animate-bounce")
          .count();
        const bubbleTexts = await panel
          .locator(".rounded-2xl")
          .allTextContents();
        const hasAssistantReply = bubbleTexts.some(
          (t) =>
            t.trim().length > 30 && !t.includes("SaaS / Webapp fejlesztés")
        );
        if (loading === 0 && bubbleTexts.length >= 2 && hasAssistantReply) {
          results.replyReceived = true;
          break;
        }
      }
    }

    results.postMessageCount = await page.evaluate(
      () => window.__postMsgCount || 0
    );
  }

  // 4. Összeomlás-jel: a trigger eltűnt vagy a React root kiürült.
  results.crash = !(await page.locator("#chat-trigger-btn").count());
} catch (err) {
  results.ownPageErrors.push(`verify-chat futtatási hiba: ${err.message}`);
  results.crash = true;
} finally {
  await browser.close();
}

const PASS =
  results.triggerExists &&
  results.panelOpened &&
  results.greetingVisible &&
  results.messageSent &&
  results.replyReceived &&
  !results.errorAlertShown &&
  !results.crash &&
  results.ownPageErrors.length === 0 &&
  // A postMessage számláló alsó korlátja: egészséges oldal 100 alatt marad,
  // a végtelen ciklus több ezret produkálna.
  results.postMessageCount < 100;

console.log(JSON.stringify({ ...results, PASS }, null, 2));
process.exit(PASS ? 0 : 1);
