/**
 * generate-blog-covers.js
 *
 * Egyedi, prémium 1200x630 .webp borítóképek generálása a WebDude szakmai blogcikkeihez.
 * Dizájn: Kék-Lila v7.0 / Cyber-Dark (#020617 bázis, kategória akcentus fények, tech-grid,
 * reszponzív tipográfia és WebDude szakértői branding).
 *
 * Használat: node scripts/generate-blog-covers.js
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");
const OUTPUT_DIR = path.join(ROOT, "public", "assets", "blog", "covers");

// Kategória színpaletták (Primary, Secondary, Accent, Background Tint)
const CATEGORY_THEMES = {
  WordPress: {
    badge: "WORDPRESS",
    primary: "#00B5F1",      // Electric Cyan
    secondary: "#5B21B6",    // Deep Violet
    badgeBg: "rgba(0, 181, 241, 0.15)",
    badgeBorder: "rgba(0, 181, 241, 0.4)",
    badgeText: "#38bdf8",
    glowColor: "rgba(0, 181, 241, 0.35)",
  },
  "SEO & Keresőoptimalizálás": {
    badge: "SEO & STRATÉGIA",
    primary: "#7C3AED",      // Vivid Violet
    secondary: "#00B5F1",    // Cyan
    badgeBg: "rgba(124, 58, 237, 0.18)",
    badgeBorder: "rgba(124, 58, 237, 0.45)",
    badgeText: "#c4b5fd",
    glowColor: "rgba(124, 58, 237, 0.4)",
  },
  "AI Automatizáció": {
    badge: "AI AUTOMATIZÁCIÓ",
    primary: "#f59e0b",      // Cyber-Gold / Amber
    secondary: "#7C3AED",    // Violet
    badgeBg: "rgba(245, 158, 11, 0.15)",
    badgeBorder: "rgba(245, 158, 11, 0.4)",
    badgeText: "#fcd34d",
    glowColor: "rgba(245, 158, 11, 0.35)",
  },
  "Webshop fejlesztés": {
    badge: "WEBSHOP FEJLESZTÉS",
    primary: "#10b981",      // Emerald
    secondary: "#00B5F1",    // Cyan
    badgeBg: "rgba(16, 185, 129, 0.15)",
    badgeBorder: "rgba(16, 185, 129, 0.4)",
    badgeText: "#6ee7b7",
    glowColor: "rgba(16, 185, 129, 0.35)",
  },
  "Grafikai tervezés": {
    badge: "GRAFIKAI TERVEZÉS",
    primary: "#ec4899",      // Pink / Magenta
    secondary: "#8b5cf6",    // Purple
    badgeBg: "rgba(236, 72, 153, 0.15)",
    badgeBorder: "rgba(236, 72, 153, 0.4)",
    badgeText: "#f472b6",
    glowColor: "rgba(236, 72, 153, 0.35)",
  },
  Webfejlesztés: {
    badge: "WEBFEJLESZTÉS",
    primary: "#06b6d4",      // Cyan
    secondary: "#3b82f6",    // Blue
    badgeBg: "rgba(6, 182, 212, 0.15)",
    badgeBorder: "rgba(6, 182, 212, 0.4)",
    badgeText: "#67e8f9",
    glowColor: "rgba(6, 182, 212, 0.35)",
  },
};

function escapeXml(unsafe) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Szövegtördelés adott karakterszám alapján szavanként.
 */
function wrapText(text, maxCharsPerLine = 34, maxLines = 3) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
      if (lines.length === maxLines - 1) {
        break;
      }
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  const usedWordsCount = lines.join(" ").split(/\s+/).length;
  if (usedWordsCount < words.length && lines.length > 0) {
    const lastIdx = lines.length - 1;
    if (!lines[lastIdx].endsWith("...")) {
      lines[lastIdx] = lines[lastIdx].replace(/[.,;:!?]?$/, "...");
    }
  }

  return lines;
}

/**
 * SVG template generálása 1200x630 méretben
 */
function buildCoverSvg({ title, category }) {
  const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES["Webfejlesztés"];

  let fontSize = 46;
  let lineHeight = 58;
  let maxChars = 32;

  if (title.length > 95) {
    fontSize = 36;
    lineHeight = 48;
    maxChars = 40;
  } else if (title.length > 70) {
    fontSize = 40;
    lineHeight = 52;
    maxChars = 36;
  }

  const lines = wrapText(title, maxChars, 3);
  const escapedLines = lines.map(escapeXml);
  const startY = 240 + (3 - lines.length) * 16;

  const titleSpans = escapedLines
    .map((line, idx) => {
      const y = startY + idx * lineHeight;
      return `<text x="80" y="${y}" font-family="system-ui, -apple-system, 'Plus Jakarta Sans', Roboto, sans-serif" font-size="${fontSize}" font-weight="800" fill="#ffffff" letter-spacing="-0.02em">${line}</text>`;
    })
    .join("\n    ");

  const escapedBadge = escapeXml(theme.badge);
  const badgeWidth = Math.max(160, theme.badge.length * 11 + 36);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <!-- Sötét alap gradiens -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="50%" stop-color="#090d1e"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>

    <!-- Fő akcentus glow -->
    <radialGradient id="primaryGlow" cx="85%" cy="20%" r="55%">
      <stop offset="0%" stop-color="${theme.primary}" stop-opacity="0.32"/>
      <stop offset="50%" stop-color="${theme.secondary}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
    </radialGradient>

    <!-- Másodlagos bal alsó glow -->
    <radialGradient id="bottomGlow" cx="15%" cy="90%" r="45%">
      <stop offset="0%" stop-color="${theme.secondary}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
    </radialGradient>

    <!-- Finom technikai rács minta -->
    <pattern id="techGrid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#334155" stroke-width="0.75" stroke-opacity="0.22"/>
    </pattern>
  </defs>

  <!-- 1. Háttér rétegek -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#techGrid)"/>
  <rect width="1200" height="630" fill="url(#primaryGlow)"/>
  <rect width="1200" height="630" fill="url(#bottomGlow)"/>

  <!-- 2. Cyber keret és technikai koordináta elemek -->
  <rect x="32" y="32" width="1136" height="566" rx="20" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-opacity="0.6"/>
  <rect x="36" y="36" width="1128" height="558" rx="16" fill="none" stroke="${theme.primary}" stroke-width="1" stroke-opacity="0.15"/>

  <!-- Sarok markerek (Cyberpunk crosshairs) -->
  <g stroke="${theme.primary}" stroke-width="2" stroke-opacity="0.6">
    <line x1="32" y1="48" x2="48" y2="48" />
    <line x1="48" y1="32" x2="48" y2="48" />
    <line x1="1152" y1="48" x2="1168" y2="48" />
    <line x1="1152" y1="32" x2="1152" y2="48" />
    <line x1="32" y1="582" x2="48" y2="582" />
    <line x1="48" y1="582" x2="48" y2="598" />
    <line x1="1152" y1="582" x2="1168" y2="582" />
    <line x1="1152" y1="582" x2="1152" y2="598" />
  </g>

  <!-- Jobb oldali dekoratív tech-kártya sziluett -->
  <g opacity="0.35" transform="translate(860, 160)">
    <rect width="260" height="260" rx="24" fill="#0f172a" stroke="${theme.primary}" stroke-width="1.5" stroke-dasharray="6 6"/>
    <circle cx="130" cy="130" r="70" fill="none" stroke="${theme.primary}" stroke-width="1.5" stroke-opacity="0.4"/>
    <circle cx="130" cy="130" r="45" fill="${theme.primary}" fill-opacity="0.1"/>
    <path d="M 130 40 L 130 220 M 40 130 L 220 130" stroke="${theme.primary}" stroke-width="1" stroke-opacity="0.25"/>
  </g>

  <!-- 3. Kategória Badge (Fent balra) -->
  <g transform="translate(80, 80)">
    <rect width="${badgeWidth}" height="38" rx="19" fill="${theme.badgeBg}" stroke="${theme.badgeBorder}" stroke-width="1.2"/>
    <circle cx="20" cy="19" r="4.5" fill="${theme.primary}"/>
    <text x="34" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="${theme.badgeText}" letter-spacing="0.12em">${escapedBadge}</text>
  </g>

  <!-- 4. Főcím (Középen balra tördelve) -->
  <g>
    ${titleSpans}
  </g>

  <!-- 5. Elválasztó vonal és Szakértői Lábléc -->
  <line x1="80" y1="518" x2="1120" y2="518" stroke="#1e293b" stroke-width="1.2"/>
  <line x1="80" y1="518" x2="240" y2="518" stroke="${theme.primary}" stroke-width="2" stroke-opacity="0.8"/>

  <g transform="translate(80, 555)">
    <!-- Bal oldali Branding -->
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="${theme.primary}" letter-spacing="0.1em">WEBDUDE.HU</text>
    <text x="110" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#94a3b8" letter-spacing="0.08em">// BALOG NORBERT</text>

    <!-- Jobb oldali E-E-A-T Horgony -->
    <text x="1040" y="0" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="0.1em">26 ÉV GRAFIKA · 16 ÉV FEJLESZTÉS</text>
  </g>
</svg>`;
}

/**
 * MDX fájl frontmatterének tiszta frissítése közvetlen cserével,
 * megakadályozva a gray-matter többsoros tördelését.
 */
function updateMdxFrontmatter(filePath, newImagePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  
  // Megkeressük a frontmatter blokkot (--- és --- között)
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return false;

  let fm = match[1];

  // Eltávolítjuk a korábbi image és coverImage definíciókat (beleértve a többsoros >- blokkokat is)
  fm = fm.replace(/^image:\s*(?:>-\s*\r?\n\s+)?.*$/gm, "");
  fm = fm.replace(/^coverImage:\s*(?:>-\s*\r?\n\s+)?.*$/gm, "");

  // Felesleges üres sorok kitisztítása
  fm = fm.split(/\r?\n/).filter((line) => line.trim().length > 0).join("\n");

  // Beillesztjük az egyértelmű image és coverImage sorokat
  fm += `\nimage: "${newImagePath}"`;
  fm += `\ncoverImage: "${newImagePath}"`;

  const newContent = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, `---\n${fm}\n---`);
  fs.writeFileSync(filePath, newContent, "utf-8");
  return true;
}

async function main() {
  console.log("=== WEBDUDE BLOG BORÍTÓKÉP GENERÁTOR (v7.41.0) ===");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`[MKDIR] Kimeneti mappa létrehozva: ${OUTPUT_DIR}`);
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  console.log(`[SCAN] Talált MDX fájlok száma: ${files.length}`);

  let generatedCount = 0;
  let updatedMdxCount = 0;

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const rawText = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter } = matter(rawText);

    if (frontmatter.noindex === true) {
      console.log(`[SKIP] Noindex cikk kihagyva: ${file}`);
      continue;
    }

    const slug = file.replace(/\.mdx$/, "");
    const title = frontmatter.title || slug;
    const category = frontmatter.category || "Webfejlesztés";
    const coverFileName = `${slug}.webp`;
    const coverFilePath = path.join(OUTPUT_DIR, coverFileName);
    const publicUrl = `/assets/blog/covers/${coverFileName}`;

    // 1. Kép generálása SVG-ből Sharp segítségével
    const svgString = buildCoverSvg({ title, category });
    await sharp(Buffer.from(svgString))
      .webp({ quality: 85, effort: 4 })
      .toFile(coverFilePath);

    const stats = fs.statSync(coverFilePath);
    console.log(`[IMAGE] ${coverFileName} (${Math.round(stats.size / 1024)} KB)`);
    generatedCount++;

    // 2. MDX frontmatter frissítése tiszta egy-soros formátumban
    const updated = updateMdxFrontmatter(filePath, publicUrl);
    if (updated) {
      updatedMdxCount++;
      console.log(`[FRONTMATTER] Frissítve: ${file} -> image: "${publicUrl}"`);
    }
  }

  console.log("\n============================================");
  console.log(`[SIKER] Legenerált képek: ${generatedCount} db`);
  console.log(`[SIKER] Frissített MDX fájlok: ${updatedMdxCount} db`);
  console.log("============================================");
}

main().catch((err) => {
  console.error("[HIBA] A generálás meghiúsult:", err);
  process.exit(1);
});
