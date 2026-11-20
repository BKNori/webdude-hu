/**
 * Egyszer futtatható Photoshop-kompatibilis Hero Placeholder generátor (1920x1080 RGB WebP).
 *
 * Alapértelmezésben SOHA nem ír felül már létező fájlt (`fs.existsSync` védelem),
 * így a később Photoshopban elkészített valódi grafikákat nem bántja.
 * Felülíráshoz add meg a `--force` paramétert:
 *   node scripts/generate-hero-placeholders.js --force
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const BANNERS_DIR = path.join(__dirname, "..", "public", "assets", "banners");
const FORCE = process.argv.includes("--force");

const HERO_PLACEHOLDERS = [
  {
    file: "hero-szolgaltatasok.webp",
    title: "SZOLGALTATASOK",
    subtitle: "/szolgaltatasok • /en/services • /szolgaltatasok/add-onok",
  },
  {
    file: "hero-kapcsolat.webp",
    title: "KAPCSOLAT",
    subtitle: "/kapcsolat • /en/contact",
  },
  {
    file: "hero-hirek.webp",
    title: "HIREK & BLOG",
    subtitle: "/hirek",
  },
  {
    file: "hero-rolam.webp",
    title: "ROLAM — BALOG NORBERT",
    subtitle: "/szia-norbi-vagyok • /norbi",
  },
  {
    file: "hero-webfejlesztes.webp",
    title: "WEBFEJLESZTES & NEXT.JS",
    subtitle: "/szolgaltatasok/weboldal-keszites • felujitas • sebesseg",
  },
  {
    file: "hero-webshop.webp",
    title: "WEBSHOP & WOOCOMMERCE",
    subtitle: "/szolgaltatasok/webshop-fejlesztes • woocommerce",
  },
  {
    file: "hero-wordpress.webp",
    title: "WORDPRESS RENDSZEREK",
    subtitle: "/szolgaltatasok/wordpress-fejlesztes • biztonsag • karbantartas",
  },
  {
    file: "hero-seo.webp",
    title: "SEO & AEO OPTIMALIZALAS",
    subtitle: "/szolgaltatasok/seo-optimalizalas • helyi-seo • technikai-seo-audit",
  },
  {
    file: "hero-grafika.webp",
    title: "GRAFIKA & ARCULATTERVEZES",
    subtitle: "/szolgaltatasok/grafikai-tervezes • arculat • logo • csomagolas",
  },
  {
    file: "hero-marketing.webp",
    title: "MARKETING & LEAD GENERALAS",
    subtitle: "/szolgaltatasok/marketing-lead-generalas",
  },
  {
    file: "hero-ai-megoldasok.webp",
    title: "AI MEGOLDASOK & WORKFLOW",
    subtitle: "/ai-megoldasok • ai-muhely • prompt-engineering",
  },
  {
    file: "hero-termekek.webp",
    title: "TERMEKEK & AI MUHELYEK",
    subtitle: "/termekek • /termekek/*",
  },
  {
    file: "hero-kecskemet.webp",
    title: "WEBOLDAL KESZITES KECSKEMET",
    subtitle: "/weboldal-keszites-kecskemet",
  },
  {
    file: "hero-jogi.webp",
    title: "JOGI DOKUMENTUMOK",
    subtitle: "/adatvedelmi-szabalyzat • /felhasznalasi-feltetelek",
  },
];

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPlaceholderSvg({ title, subtitle, file }) {
  return `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1120"/>
      <stop offset="55%" stop-color="#111C33"/>
      <stop offset="100%" stop-color="#1E1B4B"/>
    </linearGradient>
    <radialGradient id="cyanGlow" cx="78%" cy="32%" r="48%">
      <stop offset="0%" stop-color="#00B5F1" stop-opacity="0.34"/>
      <stop offset="55%" stop-color="#0369A1" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0B1120" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="violetGlow" cx="64%" cy="76%" r="46%">
      <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.32"/>
      <stop offset="60%" stop-color="#5B21B6" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#0B1120" stop-opacity="0"/>
    </radialGradient>
    <pattern id="techGrid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38BDF8" stroke-opacity="0.10" stroke-width="1"/>
    </pattern>
    <pattern id="subGrid" width="12" height="12" patternUnits="userSpaceOnUse">
      <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#A78BFA" stroke-opacity="0.04" stroke-width="0.5"/>
    </pattern>
  </defs>

  <!-- Alap rétegek -->
  <rect width="1920" height="1080" fill="url(#bgGrad)"/>
  <rect width="1920" height="1080" fill="url(#subGrid)"/>
  <rect width="1920" height="1080" fill="url(#techGrid)"/>
  <rect width="1920" height="1080" fill="url(#cyanGlow)"/>
  <rect width="1920" height="1080" fill="url(#violetGlow)"/>

  <!-- Dekoratív tech vonalak -->
  <circle cx="1440" cy="480" r="320" fill="none" stroke="#00B5F1" stroke-opacity="0.22" stroke-width="1.5" stroke-dasharray="8 8"/>
  <circle cx="1440" cy="480" r="220" fill="none" stroke="#7C3AED" stroke-opacity="0.28" stroke-width="1.5"/>
  <line x1="960" y1="0" x2="960" y2="1080" stroke="#94A3B8" stroke-opacity="0.14" stroke-width="1" stroke-dasharray="6 10"/>

  <!-- Bal oldali SZÖVEG ZÓNA segédkeret -->
  <rect x="80" y="140" width="800" height="800" rx="24" fill="#0B1120" fill-opacity="0.28" stroke="#00B5F1" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="14 10"/>
  <text x="120" y="200" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#38BDF8" fill-opacity="0.65" letter-spacing="4">
    BAL OLDAL: SZOVEG ZONA (H1 + CTA)
  </text>
  <text x="120" y="242" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#CBD5E1" fill-opacity="0.55">
    Iranyitott scrim vedi az olvashatosagot — itt hagyd szelloesebbre a grafikat
  </text>

  <!-- Jobb oldali FÓKUSZ ZÓNA segédkeret -->
  <rect x="1040" y="140" width="800" height="800" rx="24" fill="#00B5F1" fill-opacity="0.04" stroke="#A78BFA" stroke-opacity="0.45" stroke-width="2" stroke-dasharray="14 10"/>
  <text x="1080" y="200" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#C4B5FD" fill-opacity="0.80" letter-spacing="4">
    JOBB OLDAL: FOKUSZ ZONA (1920 x 1080 PX)
  </text>
  <text x="1080" y="242" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#E2E8F0" fill-opacity="0.65">
    Ide komponald a fo grafikat / 3D elemet / fotot Photoshopban
  </text>

  <!-- Központi sablon azonosító -->
  <text x="1080" y="520" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="700" fill="#F8FAFC" fill-opacity="0.52" letter-spacing="3">
    ${escapeXml(title)}
  </text>
  <text x="1080" y="570" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#38BDF8" fill-opacity="0.65">
    ${escapeXml(subtitle)}
  </text>
  <text x="1080" y="616" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#94A3B8" fill-opacity="0.65">
    Fajl: ${escapeXml(file)} • 1920x1080 px RGB WebP
  </text>
</svg>`.trim();
}

async function main() {
  if (!fs.existsSync(BANNERS_DIR)) {
    fs.mkdirSync(BANNERS_DIR, { recursive: true });
  }

  let created = 0;
  let skipped = 0;

  for (const item of HERO_PLACEHOLDERS) {
    const outPath = path.join(BANNERS_DIR, item.file);

    if (fs.existsSync(outPath) && !FORCE) {
      console.log(`[SKIP] Már létezik (védett): ${item.file}`);
      skipped++;
      continue;
    }

    const svg = buildPlaceholderSvg(item);
    await sharp(Buffer.from(svg))
      .resize(1920, 1080)
      .toColorspace("srgb")
      .webp({ quality: 90 })
      .toFile(outPath);

    console.log(`[OK] Legenerálva (1920x1080 RGB WebP): ${item.file}`);
    created++;
  }

  console.log(`\nKész! Létrehozva: ${created}, Megőrizve/kihagyva: ${skipped}`);
}

main().catch((err) => {
  console.error("Hiba a placeholder generálás során:", err);
  process.exit(1);
});
