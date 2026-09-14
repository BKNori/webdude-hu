"use server";

/**
 * Send onboarding welcome email to new client using Resend API.
 */
export async function sendWelcomeEmailAction(
  email: string,
  name: string,
  pass: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not configured. Onboarding email skipped.");
    return {
      success: true,
      warning:
        "A Resend API kulcs (RESEND_API_KEY) nincs konfigurálva. Az e-mail küldés elmaradt.",
    };
  }

  // Create Cyber-Arany HTML template
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      background-color: bg-transparent;
      color: #e2e8f0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #0f172a;
      border: 1px solid #1e293b;
      border-top: 4px solid #f59e0b;
      border-radius: 16px;
      padding: 32px;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #1e293b;
    }
    .logo-text {
      color: #f59e0b;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin: 0;
    }
    .title {
      font-size: 20px;
      color: #ffffff;
      margin-top: 24px;
      margin-bottom: 8px;
      font-weight: 700;
    }
    .text {
      font-size: 14px;
      color: #94a3b8;
      line-height: 1.6;
    }
    .credentials-box {
      background-color: bg-transparent;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 20px;
      margin: 24px 0;
    }
    .credential-row {
      margin-bottom: 12px;
      font-family: monospace;
      font-size: 13px;
    }
    .credential-row:last-child {
      margin-bottom: 0;
    }
    .label {
      color: #64748b;
      font-weight: bold;
    }
    .value {
      color: #f59e0b;
      font-weight: bold;
    }
    .btn-container {
      text-align: center;
      margin-top: 32px;
    }
    .btn {
      background-color: #f59e0b;
      color: bg-transparent !important;
      text-decoration: none;
      padding: 12px 32px;
      border-radius: 8px;
      font-weight: bold;
      font-size: 14px;
      display: inline-block;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 11px;
      color: #475569;
      border-top: 1px solid #1e293b;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo-text">WebDude 2026</h1>
    </div>
    
    <h2 class="title">Üdvözlünk a Zárt Ügyfélportálodon, ${name}!</h2>
    
    <p class="text">
      Norbi létrehozta a személyre szabott fejlesztői és AI vezérlőpultodat. Itt valós időben követheted a projekted fázisait, közvetlenül cseveghetsz Norbival a mérföldkövekről, és hozzáférhetsz az egyedi, vállalkozásodra szabott AI eszközökhöz.
    </p>
    
    <div class="credentials-box">
      <div class="credential-row">
        <span class="label">Belépési URL:</span>
        <span class="value">https://webdude.hu/portal</span>
      </div>
      <div class="credential-row">
        <span class="label">Felhasználónév (Email):</span>
        <span class="value">${email}</span>
      </div>
      <div class="credential-row">
        <span class="label">Ideiglenes jelszó:</span>
        <span class="value">${pass}</span>
      </div>
    </div>
    
    <p class="text" style="font-style: italic;">
      Biztonsági okokból kérjük, hogy az első bejelentkezés után módosítsd a jelszavadat a portál beállítások menüjében.
    </p>
    
    <div class="btn-container">
      <a href="https://webdude.hu/portal" class="btn">Belépés az Ügyfélportálra</a>
    </div>
    
    <div class="footer">
      <p>Ez egy automatikus üzenet a WebDude platformról. Kérjük, ne válaszolj rá.</p>
      <p>&copy; 2026 WebDude.hu. Minden jog fenntartva.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "WebDude <onboarding@webdude.hu>",
        to: [email],
        subject: "Sikeres regisztráció | WebDude Zárt Ügyfélportál",
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const err = (await res.json()) as { error?: { message?: string } };
      return {
        success: false,
        error: err.error?.message || "A Resend API hibát jelzett vissza.",
      };
    }

    return {
      success: true,
      message: "Az onboarding értesítő e-mail sikeresen kiküldve az ügyfélnek!",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba az e-mail küldés során.",
    };
  }
}
