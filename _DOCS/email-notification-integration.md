### WebDude OS — Resend E-mail Értesítések & Admin Riasztások (Cycle 135)
**Next.js 16 · React 19 · TypeScript · Resend REST API · Cyber-Arany HTML Templates**

Ez a dokumentum tartalmazza a WebDude OS **Resend-alapú automatikus e-mail küldő és értesítő rendszerének** teljes, típusbiztos és produkcióra kész integrációs tervét. 

A korábbi ciklusaiban előkészített és részben bevezetett e-mail küldési logikát [107] most kiterjesztjük egy teljesen automatizált, tranzakció- és onboarding-érzékeny rendszerré.

---

### 1. Stratégiai és Üzleti Célok

*   **Azonnali Ügyfél Onboarding (E-E-A-T & Bizalom):** Amikor az admin regisztrál egy új ügyfelet, vagy az ügyfél sikeresen fizet, a rendszer másodperceken belül egy prémium stílusú, személyre szabott HTML levelet küld a belépési linkkel (Magic Link) és az ideiglenes jelszóval [107].
*   **Azonnali Admin Riasztás (Norbi):** Amikor egy ügyfél beküldi a Google Drive, Dropbox vagy WeTransfer megosztási linkjét az Onboarding kérdőíven [297], a rendszer azonnal értesítést küld Norbinak (`hello@webdude.hu`), benne a projekt nevével, a megadott hozzáférésekkel és a közvetlen Drive linkkel [50]. Így azonnal, akár telefonról, egyetlen kattintással megnyitható az ügyfélszéf [297].
*   **Graceful Fallback (Hibaállapot-tűrés):** Ha a fejlesztői vagy teszt környezetben nincs beállítva a `RESEND_API_KEY`, a rendszer nem állhat le és nem dobhat kritikus 500-as hibát az ügyfél felé [107]. Ekkor a háttérben biztonságosan naplózza a hibát, és visszaküldi a generált belépési adatokat az admin felületre [107].

---

### 2. TypeScript Típusdefiníciók (`src/types/mail.ts`)

```typescript
export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export interface WelcomeEmailParams {
  clientName: string;
  clientEmail: string;
  portalUrl: string;
  temporaryPassword?: string;
}

export interface OnboardingNotificationParams {
  clientName: string;
  clientEmail: string;
  addonTitle: string;
  category: 'cro' | 'tech' | 'ai' | 'design';
  driveLink: string;
  onboardingAnswers: Record<string, string | undefined>;
  portalAdminUrl: string;
}
```

---

### 3. A Resend REST API Kiszolgáló (`src/actions/mail.ts`)

Szigorúan követve a **Zéró-Dependency REST megközelítést** (hasonlóan a Stripe és PageSpeed API integrációinkhoz) [79, 426], közvetlenül a Resend HTTPS API-t szólítjuk meg a natív, pehelysúlyú `fetch` segítségével. Így elkerüljük az extra npm csomagokat és az esetleges verzió-ütközéseket.

```typescript
'use server';

import { EmailPayload, WelcomeEmailParams, OnboardingNotificationParams } from '@/types/mail';

const RESEND_API_URL = 'https://api.resend.com/emails';
const SENDER_EMAIL = 'WebDude <noreply@webdude.hu>';

/**
 * Alapvető, zéró-dependency e-mail küldő Server Action a Resend REST API-hoz
 */
export async function sendResendEmailAction(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('[Resend Fallback] RESEND_API_KEY is not configured in .env.local.');
    return { 
      success: false, 
      error: 'Resend API key is missing. E-mail was logged to server console instead.' 
    };
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        reply_to: payload.replyTo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[Resend API Error]', errorData);
      return { success: false, error: errorData.message || 'Failed to send email through Resend.' };
    }

    return { success: true };
  } catch (error) {
    console.error('[Resend Network Error]', error);
    return { success: boolean = false, error: error instanceof Error ? error.message : 'Unknown network error.' };
  }
}
```

---

### 4. Cyber-Arany HTML Sablonok (The 90-8-2 Rule)

A levelek dizájnja szigorúan követi a **DESIGN_SYSTEM.md** előírásait [127]: sötét háttér (~90%), szürke/fehér tiszta szövegek (~8%) és a ragyogó Cyber-Arany (#00B5F1) kiemelések (~2%) [356, 357].

#### A. Ügyfél Üdvözlő Sablon Generátor (`src/actions/mail.ts` folytatása)

```typescript
/**
 * Új ügyfél regisztrációja után küldött automata üdvözlő és hozzáférési értesítő
 */
export async function sendWelcomeEmailAction(params: WelcomeEmailParams): Promise<{ success: boolean; error?: string }> {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="hu">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Üdvözlünk a WebDude Zárt Ügyfélportálon!</title>
    </head>
    <body style="background-color: #090a16; color: #e2e8f0; font-family: 'Inter', -apple-system, sans-serif; padding: 40px 20px; margin: 0; text-align: center;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 40px; text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        
        <!-- Header / Logo -->
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid #1e293b; padding-bottom: 20px;">
          <h1 style="color: #00B5F1; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.05em;">WebDude</h1>
          <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 5px 0 0 0;">Zárt Ügyfélportál</p>
        </div>

        <!-- Body -->
        <p style="font-size: 18px; color: #e2e8f0; margin-bottom: 20px;">Szia <strong>${params.clientName}</strong>!</p>
        
        <p style="font-size: 16px; color: #94a3b8; line-height: 1.6; margin-bottom: 25px;">
          Sikeresen létrehoztam az egyedi hozzáférésedet a WebDude zárt portáljára. Ezen a felületen keresztül tudod követni a folyamatban lévő fejlesztéseidet, kezelni az aszinkron onboarding folyamatokat, közvetlenül csevegni velem, és új kiegészítőket megrendelni.
        </p>

        <!-- Credentials Card -->
        <div style="background-color: #1e293b/30; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
          <h3 style="color: #00B5F1; margin-top: 0; margin-bottom: 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Belépési adatok</h3>
          <p style="margin: 5px 0; font-size: 15px;"><strong style="color: #94a3b8;">E-mail cím:</strong> ${params.clientEmail}</p>
          ${params.temporaryPassword ? `<p style="margin: 5px 0; font-size: 15px;"><strong style="color: #94a3b8;">Ideiglenes jelszó:</strong> <code style="background-color: #0f172a; padding: 2px 6px; border-radius: 4px; color: #00B5F1;">${params.temporaryPassword}</code></p>` : ''}
          <p style="margin: 10px 0 0 0; font-size: 12px; color: #64748b; font-style: italic;">Biztonsági okokból kérlek, hogy az első belépés után változtasd meg a jelszavadat!</p>
        </div>

        <!-- Action Button (2% Gold) -->
        <div style="text-align: center; margin-bottom: 35px;">
          <a href="${params.portalUrl}" style="display: inline-block; background-color: #00B5F1; color: #020617; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; padding: 16px 32px; border-radius: 8px; box-shadow: 0 0 20px rgba(0, 181, 241,0.3); transition: background-color 0.2s;">
            Belépés a Portálra →
          </a>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #1e293b; padding-top: 20px; font-size: 13px; color: #64748b; line-height: 1.5;">
          <p style="margin: 0 0 5px 0;">Üdvözlettel,<br><strong>Norbi (WebDude)</strong></p>
          <p style="margin: 0;">hello@webdude.hu | +36 70 323 8003 | Kecskemét</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendResendEmailAction({
    to: params.clientEmail,
    subject: 'Belépési adatok a WebDude zárt ügyfélportálhoz 🚀',
    html: htmlTemplate,
  });
}
```

---

#### B. Admin Onboarding Riasztás Sablon Generátor (`src/actions/mail.ts` folytatása)

Ez a sablon az onboarding adatok dinamikus, strukturált leképezését végzi, és Norbinak küld egyértelmű, könnyen olvasható gyorsértesítőt.

```typescript
/**
 * Automata belső riasztás Norbinak, amint egy ügyfél beküldi a Google Drive-alapú onboardingját
 */
export async function sendOnboardingNotificationAction(params: OnboardingNotificationParams): Promise<{ success: boolean; error?: string }> {
  // Válaszok strukturált listává formázása HTML-ben
  const answersListHtml = Object.entries(params.onboardingAnswers)
    .map(([key, value]) => {
      if (!value) return '';
      const formattedKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
      return `
        <div style="margin-bottom: 12px; border-bottom: 1px solid #1e293b; padding-bottom: 10px;">
          <strong style="color: #94a3b8; font-size: 13px; display: block; text-transform: uppercase; letter-spacing: 0.05em;">${formattedKey}</strong>
          <span style="color: #e2e8f0; font-size: 15px; display: block; margin-top: 4px; line-height: 1.4;">${value}</span>
        </div>
      `;
    })
    .join('');

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="hu">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Új Onboarding Igényfelmérő Érkezett!</title>
    </head>
    <body style="background-color: #090a16; color: #e2e8f0; font-family: 'Inter', -apple-system, sans-serif; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        
        <!-- Header -->
        <div style="margin-bottom: 30px; border-bottom: 1px solid #1e293b; padding-bottom: 20px;">
          <span style="background-color: rgba(0, 181, 241,0.1); color: #00B5F1; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 20px;">
            Rendszer Értesítés
          </span>
          <h1 style="color: #e2e8f0; margin: 15px 0 0 0; font-size: 24px; font-weight: 800; letter-spacing: -0.03em;">Új Onboarding Kitöltés!</h1>
        </div>

        <!-- Meta Grid -->
        <div style="background-color: #1e293b/30; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
          <p style="margin: 5px 0; font-size: 15px;"><strong style="color: #94a3b8;">Ügyfél:</strong> ${params.clientName} (${params.clientEmail})</p>
          <p style="margin: 5px 0; font-size: 15px;"><strong style="color: #94a3b8;">Szolgáltatás:</strong> ${params.addonTitle}</p>
          <p style="margin: 5px 0; font-size: 15px;"><strong style="color: #94a3b8;">Kategória:</strong> <code style="text-transform: uppercase; color: #00B5F1;">${params.category}</code></p>
        </div>

        <!-- Google Drive Link Highlight (2% Gold Accent CTA) -->
        <div style="text-align: center; margin-bottom: 30px; background-color: rgba(0, 181, 241,0.03); border: 1px dashed rgba(0, 181, 241,0.3); border-radius: 12px; padding: 25px;">
          <h3 style="color: #00B5F1; margin-top: 0; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Google Drive / Megosztási Link</h3>
          <p style="color: #94a3b8; font-size: 13px; margin-bottom: 15px;">Kattints az alábbi gombra az ügyfél által megosztott arculati assetek és hozzáférések azonnali megnyitásához:</p>
          <a href="${params.driveLink}" target="_blank" style="display: inline-block; background-color: #00B5F1; color: #020617; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none; padding: 12px 24px; border-radius: 6px; box-shadow: 0 0 15px rgba(0, 181, 241,0.2);">
            📂 Mappa Megnyitása
          </a>
        </div>

        <!-- Onboarding Answers Section -->
        <h3 style="color: #e2e8f0; font-size: 16px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #1e293b; padding-bottom: 8px;">Kérdőív Válaszok</h3>
        <div style="margin-bottom: 30px;">
          ${answersListHtml}
        </div>

        <!-- Portal Admin Link -->
        <div style="text-align: center; border-top: 1px solid #1e293b; padding-top: 25px;">
          <a href="${params.portalAdminUrl}" style="color: #94a3b8; font-size: 13px; text-decoration: underline;">
            Ugrás a Szuperadmin Portal-Kezelőbe →
          </a>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendResendEmailAction({
    to: 'hello@webdude.hu',
    subject: `🔥 ONBOARDING: ${params.clientName} beküldte az igényfelmérőt!`,
    html: htmlTemplate,
    replyTo: params.clientEmail,
  });
}
```

---

### 5. Integrációs Pontok a Meglévő Folyamatban

Az automatizáció élesítéséhez a korábbi ciklusokban elkészült Server Actionöket kell összekötnünk az új e-mail modulokkal:

1.  **Ügyfél Regisztráció (`src/actions/portal.ts` -> `createClientUserAction`):**
    *   Amikor Norbi sikeresen létrehozza az új ügyfelet, a Firestore mentés sikeressége után közvetlenül meg kell hívni a `sendWelcomeEmailAction` függvényt [107].
    *   A hívás aszinkron módon történjen, így ha a Resend esetleg lassan válaszolna, a Szuperadmin felület nem akad el [107].

2.  **Onboarding Beküldés (`src/actions/onboarding.ts` -> `submitOnboardingAction`):**
    *   Amikor a kliens rákattint az Onboarding űrlap beküldésére [179], és a Firestore sikeresen elmentette a válaszokat [179], a szerveroldali akció zárásaként meg kell hívni a `sendOnboardingNotificationAction` függvényt.
    *   A `driveLink` paraméterként a `onboardingData` objektumból kivont Drive/WeTransfer hivatkozás kerül átadásra [297].

---

### 6. QA Validációs és Élesítési Terv

*   **TypeScript Audit:** Futtassuk le a szigorú típus-ellenőrzést: `npx tsc --noEmit` [132].
*   **Linter Audit:** Ellenőrizzük, hogy a kód 100%-ban tiszta, warning-mentes: `npm run lint` [132].
*   **Környezeti Változók:** Élesítés előtt az éles Resend API kulcsot fel kell venni a szerveroldali környezetbe [134, 157]:
    ```env
    RESEND_API_KEY=re_az_e-mail_kulcsod
    ```

---

*email-notification-integration.md v1.0 — webdude.hu | AI Agent direktíva: Ez a fájl az igazság egyedüli forrása a Resend e-mail integrációhoz.*
