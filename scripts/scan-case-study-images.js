/**
 * Diagnosztika: a dedikált esettanulmány-komponensekben hardcode-olt
 * `/assets/...` kép-útvonalak listázása (7.12.0 előkészítés).
 *
 * Csak literális `src="..."` attribútumokat gyűjt a `next/image`
 * elemekből — a dinamikus `src={...}` kifejezések nem szerepelnek
 * (azokat csak TypeScript-tudatú AST-elemzéssel lehetne).
 *
 * Futtatás: `node scripts/scan-case-study-images.js`
 */
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "src", "components", "organisms");
const EXCLUDE = new Set(["GeneralCaseStudy.tsx", "ClassiCoCaseStudy.tsx"]);

function main() {
  const files = fs
    .readdirSync(DIR)
    .filter((name) => name.endsWith("CaseStudy.tsx") && !EXCLUDE.has(name))
    .sort();
  const all = new Map();

  for (const file of files) {
    const content = fs.readFileSync(path.join(DIR, file), "utf8");
    const hits = new Set();
    for (const match of content.matchAll(
      /src\s*=\s*["'](\/assets\/[^"']+)["']/g
    )) {
      hits.add(match[1]);
      if (!all.has(match[1])) all.set(match[1], []);
      all.get(match[1]).push(file);
    }
    console.log(`--- ${file} (${hits.size} egyedi) ---`);
    console.log([...hits].join("\n") || "(nincs literális kép)");
  }

  console.log(`\n=== Összesen ${all.size} egyedi kép ===`);
  for (const [src, usedBy] of all) {
    console.log(`${src}  [${usedBy.join(", ")}]`);
  }
}

main();
