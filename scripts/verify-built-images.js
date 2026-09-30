/**
 * Build-kimenet ellenőrző (7.11.1 QA).
 *
 * Végigmegy a `.next` alatti statikus HTML-eken, összegyűjti az összes
 * `/assets/...avif|webp` srcset URL-t, és ellenőrzi, hogy mind létezik-e a
 * `public/` alatt. Emellett kimutatja a `type="image/webp"` darabszámot —
 * a 7.11.1 után ennek a hero + kártya képekre kell korlátozódnia (a
 * galéria AVIF-only, tehát ott nem szabad `<source>`-nak megjelennie).
 *
 * Futtatás: `node scripts/verify-built-images.js`
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const NEXT_DIR = path.join(ROOT, ".next");
const PUBLIC_DIR = path.join(ROOT, "public");

/** Rekurzív HTML-gyűjtés. */
function collectHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectHtml(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function main() {
  const htmlFiles = collectHtml(NEXT_DIR);
  if (htmlFiles.length === 0) {
    console.error("[HIBA] Nincs HTML a .next alatt — futtasd le a `npm run build`-et.");
    process.exit(1);
  }

  const urls = new Set();
  let avifSources = 0;
  let webpSources = 0;

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, "utf8");
    for (const match of content.matchAll(
      /\/assets\/[A-Za-z0-9%\-_\/]+\.(?:avif|webp)/g
    )) {
      urls.add(match[0]);
    }
    avifSources += (content.match(/type="image\/avif"/g) || []).length;
    webpSources += (content.match(/type="image\/webp"/g) || []).length;
  }

  const missing = [...urls].filter((url) => {
    const decoded = decodeURI(url).replace(/^\//, "");
    return !fs.existsSync(path.join(PUBLIC_DIR, decoded));
  });

  console.log("=== Build-kimenet ellenőrzés ===");
  console.log(`HTML fájlok        : ${htmlFiles.length}`);
  console.log(`Egyedi srcset URL  : ${urls.size}`);
  console.log(`<source avif>      : ${avifSources}`);
  console.log(`<source webp>      : ${webpSources}  (csak hero + kártya képek, AVIF galéria nélkül)`);
  console.log(`Hiányzó fájl       : ${missing.length}`);

  if (missing.length > 0) {
    console.error("\n[HIBA] Hiányzó fájlok:");
    for (const url of missing.slice(0, 20)) console.error(`  - ${url}`);
    process.exit(1);
  }

  console.log("\n[OK] Minden hivatkozott kép létezik a public/ alatt.");
}

main();