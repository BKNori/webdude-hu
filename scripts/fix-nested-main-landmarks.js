/**
 * WCAG 1.3.1 / 4.1.2 – Landmark struktúra javítás.
 *
 * A `PageWrapper` már biztosítja az EGYETLEN `<main id="main-content">` landmarkot
 * (és a skip-link célpontját). A page.tsx / page-szintű komponensek saját `<main>`
 * eleme ezzel beágyazott, duplikált `main` landmarkot hozott létre, ami érvénytelen
 * HTML és akadálymentesítési hiba.
 *
 * Ez a szkript a PageWrapper-en KÍVÜL minden `<main>` elemet `<div>`-re cserél,
 * megőrizve a className-t és a JSX szerkezetet. Minden fájlt előzetesen validál:
 * a `<main` és `</main>` előfordulások számának egyeznie kell.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const SKIP_FILES = [path.join(SRC, "components", "layout", "PageWrapper.tsx")];

function walk(dir, accumulator) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, accumulator);
    } else if (/\.tsx?$/.test(entry.name)) {
      accumulator.push(full);
    }
  }
  return accumulator;
}

const openPattern = /<main(?=[\s>])/g;
const closePattern = /<\/main\s*>/g;

const changed = [];
const skipped = [];
const failed = [];

for (const file of walk(SRC, [])) {
  if (SKIP_FILES.includes(file)) continue;

  const original = fs.readFileSync(file, "utf8");
  const openCount = (original.match(openPattern) || []).length;
  if (openCount === 0) continue;

  const closeCount = (original.match(closePattern) || []).length;
  if (closeCount !== openCount) {
    failed.push({ file, openCount, closeCount });
    continue;
  }

  const updated = original
    .replace(openPattern, "<div")
    .replace(closePattern, "</div>");

  if (updated === original) {
    skipped.push(file);
    continue;
  }

  fs.writeFileSync(file, updated, "utf8");
  changed.push({ file, replaced: openCount });
}

console.log("=== LANDMARK JAVITAS (main -> div) ===");
console.log("Modositott fajlok: " + changed.length);
for (const item of changed) {
  console.log("  [" + item.replaced + "] " + path.relative(ROOT, item.file));
}
if (skipped.length) {
  console.log("Valtozatlan (mar div): " + skipped.length);
}
if (failed.length) {
  console.log("!!! NEM PAROSITHATO (kezzel ellenorzendo):");
  for (const item of failed) {
    console.log(
      "  " +
        path.relative(ROOT, item.file) +
        " open=" +
        item.openCount +
        " close=" +
        item.closeCount
    );
  }
  process.exitCode = 1;
}
