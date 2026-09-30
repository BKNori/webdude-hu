/**
 * 7.12.0 — dedikált esettanulmány-komponensek `next/image` → `ResponsiveImage`
 * cseréje (BtshopCaseStudy, RimaiCaseStudy, GoBoxCaseStudy,
 * LengyelHelgaCaseStudy, HuMagoCaseStudy, BorGarnelaCaseStudy,
 * AiPromptCaseStudy, DrNagyAlbertCaseStudy, ClassiCoCaseStudy).
 *
 * A csere mechanikus és reverzibilis: a szkript minden `<Image ... />` blokkot
 * `<ResponsiveImage ... />`-re ír át a kövekező szabályokkal:
 *
 *   - `fill` prop → ELHAGYVA (a ResponsiveImage maga tölti ki a szülőt).
 *   - `priority` prop → `priority` (a ResponsiveImage ismeri, LCP-képhez kell).
 *   - `sizes="..."` → `sizes="..."` (ha nincs, `"100vw"` alapértelmezés).
 *   - `src`, `alt`, `className` → változatlanul átvéve.
 *   - `width`/`height` propok → ELHAGYVA (a fill-mód miatt feleslegesek;
 *     a szülő adja a méretet; a fix méretű logó-blokk így is reszponzív
 *     lesz, csak a böngésző választ a srcset-ből).
 *
 * A `import Image from "next/image"` sor helyére a ResponsiveImage import
 * kerül. Ha egy fájlban már van ResponsiveImage import, nem duplikál.
 * A `next/image` import csak akkor marad meg, ha a fájlban `<Image` használat
 * is marad (ilyenkor a szkript hibát jelez — manuális ellenőrzés kell).
 *
 * Használat: `node scripts/migrate-case-study-images.js [--dry-run]`
 * Zéró-törlés garancia: a szkript CSAK a fenti mintákat írja át, a fájl
 * többi részéhez egy karakterrel sem nyúl (sor-alapú, nem AST-s átírás).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "src/components/organisms");
const FILES = [
  "BtshopCaseStudy.tsx",
  "RimaiCaseStudy.tsx",
  "GoBoxCaseStudy.tsx",
  "LengyelHelgaCaseStudy.tsx",
  "HuMagoCaseStudy.tsx",
  "BorGarnelaCaseStudy.tsx",
  "AiPromptCaseStudy.tsx",
  "DrNagyAlbertCaseStudy.tsx",
  "ClassiCoCaseStudy.tsx",
];

const DRY_RUN = process.argv.includes("--dry-run");

/** Egy `<Image ... />` JSX-blokk propjait szedi szét (egyszerű, sor-alapú). */
function parseProps(block) {
  const props = {};
  // prop="..." és prop={...} alakok — a kapcsos zárójelek nem lehetnek egymásba ágyazva.
  for (const match of block.matchAll(/(\w+)\s*=\s*("[^"]*"|\{[^{}]*\})/g)) {
    props[match[1]] = match[2];
  }
  // Érték nélküli boolean propok: fill, priority.
  for (const name of ["fill", "priority"]) {
    const bare = new RegExp(`(^|\\s)${name}(\\s|/?>)`);
    if (bare.test(block)) props[name] = "bare";
  }
  return props;
}

function migrateFile(file) {
  const target = path.join(DIR, file);
  const original = fs.readFileSync(target, "utf8");

  let content = original;
  let converted = 0;
  let skipped = 0;

  // Minden `<Image ... />` blokk cseréje — a blokk NEM tartalmazhat beágyazott
  // JSX-t (az Image self-closing, ezért a `/>` az első zárójel).
  content = content.replace(/<Image\s+([\s\S]*?)\/>/g, (full, inner) => {
    const props = parseProps(inner);

    // Dinamikus src (src={...}): nem literális manifest-kulcs — a
    // ResponsiveImage kezeli (visszaesik a nyers <img>-re), de a `fill`
    // elhagyása itt nem biztonságos — inkább kihagyjuk, kézi döntésre.
    if (!props.src || !props.src.startsWith('"')) {
      skipped++;
      return full;
    }

    const src = props.src;
    const alt = props.alt || '"Esettanulmány kép"';
    const className = props.className || '"object-cover"';
    const sizes = props.sizes || '"100vw"';
    const priority = props.priority ? "\n             priority" : "";

    converted++;
    return `<ResponsiveImage
             src=${src}
             alt=${alt}
             sizes=${sizes}${priority}
             className=${className}
           />`;
  });

  // Import-csere: a next/image importot ResponsiveImage-re cseréljük, ha már
  // nincs <Image használat. (ClassiCoCaseStudy-ben már van import — ott csak
  // a next/image sort távolítjuk el.)
  const hasImageUsage = /<Image[\s>]/.test(content);
  const hasResponsiveImport = content.includes(
    'from "@/components/molecules/ResponsiveImage"'
  );

  if (!hasImageUsage) {
    if (hasResponsiveImport) {
      content = content.replace(
        /^import Image from "next\/image";\r?\n/gm,
        ""
      );
    } else {
      content = content.replace(
        /^import Image from "next\/image";/m,
        'import ResponsiveImage from "@/components/molecules/ResponsiveImage";'
      );
    }
  } else if (!hasResponsiveImport) {
    // Maradt <Image, de nincs ResponsiveImage import — ezt nem hagyjuk
    // szó nélkül: a fájl kézi ellenőrzést igényel.
    console.error(
      `[HIBA] ${file}: maradt <Image használat — kézi ellenőrzés kell!`
    );
    return { file, converted: 0, skipped, failed: true };
  }

  if (converted > 0 && !DRY_RUN) {
    fs.writeFileSync(target, content, "utf8");
  }
  return { file, converted, skipped, failed: false };
}

function main() {
  console.log(
    `=== CaseStudy Image migráció ${DRY_RUN ? "(DRY-RUN)" : ""} ===\n`
  );
  let totalConverted = 0;
  let totalSkipped = 0;
  let failed = 0;

  for (const file of FILES) {
    const result = migrateFile(file);
    totalConverted += result.converted;
    totalSkipped += result.skipped;
    if (result.failed) failed++;
    console.log(
      `${result.failed ? "[HIBA]" : "[OK]  "} ${file}: ` +
        `${result.converted} cserélve, ${result.skipped} dinamikus kihagyva`
    );
  }

  console.log(
    `\nÖsszesen: ${totalConverted} <Image> → <ResponsiveImage>, ` +
      `${totalSkipped} dinamikus kihagyva.`
  );
  if (failed > 0) {
    console.error(`[HIBA] ${failed} fájl kézi ellenőrzést igényel.`);
    process.exit(1);
  }
}

main();
