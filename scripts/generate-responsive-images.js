/**
 * Reszponzív hero kép-derivatívumok generálása (7.9.0)
 *
 * A `next.config.js` `unoptimized: true` beállítása a cPanel shared hosting
 * memóriakorlátja miatt GLOBÁLISAN megmarad (a futás közbeni Next.js
 * képoptimalizálás OOM-ot okozna). Emiatt a `sizes`/`quality` attribútumok
 * hatástalanok, és a böngésző nyersen kapja a teljes méretű bannert
 * (pl. 368 KB egy 1920x1200-es WebP), mobilon is feleslegesen.
 *
 * Ez a szkript a megoldás: build-time egyszer legenerálja a banner AVIF és
 * WebP variánsait 4 töréspontban, a `<picture>` komponens pedig ezeket
 * `srcSet`-tel szolgálja ki. Nulla szerveroldali CPU/memóriaigény.
 *
 * Használat:  node scripts/generate-responsive-images.js
 * A `sharp` a `next` transitív függősége (node_modules/sharp), ezért nincs
 * új package dependency.
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const INPUT_DIR = path.join(__dirname, "../public/assets/banners");
const OUTPUT_DIR = path.join(INPUT_DIR, "responsive");
const MANIFEST_PATH = path.join(
  __dirname,
  "../src/data/heroImages.ts"
);

// Töréspontok: a Next.js deviceSizes konfigjához igazítva.
const TARGET_WIDTHS = [640, 1024, 1600, 2000];

const FORMATS = [
  { id: "avif", options: { quality: 55, effort: 4 } },
  { id: "webp", options: { quality: 78, effort: 4 } },
];

// A HeroSectionNew SLIDE_DEFAULTS bgImage értékei.
const SOURCE_IMAGES = [
  "webdude-hero.webp",
  "ronch caffe adris nagybanner 20221005c copy 2.webp",
  "webdude banner 2000x1000.webp",
];

const kb = (bytes) => Math.round(bytes / 1024);

async function generateImages() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const manifest = {};
  let originalTotal = 0;
  const generatedTotal = { avif: 0, webp: 0 };

  for (const filename of SOURCE_IMAGES) {
    const inputPath = path.join(INPUT_DIR, filename);
    if (!fs.existsSync(inputPath)) {
      console.warn(`[WARN] Forrásfájl nem található, kihagyva: ${filename}`);
      continue;
    }

    const nameWithoutExt = path.parse(filename).name;
    const publicKey = `/assets/banners/${filename}`;
    const originalSize = fs.statSync(inputPath).size;
    originalTotal += originalSize;

    const metadata = await sharp(inputPath).metadata();
    // A manifestum KULCSA nyers marad (ezzel kell keresni a slide.bgImage
    // alapján), csak a kibocsátott URL-ek URL-kódoltak.
    const entry = { fallback: encodeURI(publicKey), avif: "", webp: "" };

    for (const format of FORMATS) {
      const srcSetParts = [];

      for (const width of TARGET_WIDTHS) {
        // Felnagyítani nem érdemes: a forrás a legnagyobb rendelkezésre álló.
        if (width > metadata.width) continue;

        const outputFilename = `${nameWithoutExt}-${width}w.${format.id}`;
        const outputPath = path.join(OUTPUT_DIR, outputFilename);
        // FONTOS: a srcset szintaxisban a URL nem tartalmazhat szóközt (a
        // "ronch caffe adris…" és "webdude banner…" fájlnevekben van), különben
        // a böngésző srcset-elemzése elhasal és a kép le sem töltődik.
        // A lemezen lévő fájlnevek változatlanok; csak a kibocsátott URL kódolt.
        const publicPath = encodeURI(
          `/assets/banners/responsive/${outputFilename}`
        );

        await sharp(inputPath)
          .resize({ width, withoutEnlargement: true })
          .toFormat(format.id, format.options)
          .toFile(outputPath);

        generatedTotal[format.id] += fs.statSync(outputPath).size;
        srcSetParts.push(`${publicPath} ${width}w`);
      }

      entry[format.id] = srcSetParts.join(", ");
    }

    manifest[publicKey] = entry;
    const variantCount = entry.avif.split(",").filter(Boolean).length;
    console.log(
      `[OK] ${filename} (${metadata.width}x${metadata.height}, ${kb(
        originalSize
      )} KB) → ${variantCount} töréspont (AVIF + WebP)`
    );
  }

  const tsContent = `// AUTO-GENERATED FILE — NE SORKÖZZÖL KÉZZEL!
// Forrás: scripts/generate-responsive-images.js
// A cPanel memóriakorlát miatt a next.config.js unoptimized: true marad,
// ezért a reszponzív srcset-ek build-time generált statikus fájlokból jönnek.

export interface HeroImageVariants {
  /** AVIF srcSet: "url 640w, url 1024w, ..." */
  avif: string;
  /** WebP srcSet AVIF-et nem támogató böngészőknek. */
  webp: string;
  /** Az eredeti, teljes méretű kép (régi böngésző / nem-generált slide). */
  fallback: string;
}

/** Kulcs: a hero slide eredeti /assets/banners/... útvonala. */
export const heroImageManifest: Record<string, HeroImageVariants> = ${JSON.stringify(
    manifest,
    null,
    2
  )};

/** Egy slide háttérképének variánsai, vagy undefined ha nincs generált derivatívum. */
export function getHeroImageVariants(
  src: string
): HeroImageVariants | undefined {
  return heroImageManifest[src];
}
`;

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, tsContent, "utf8");

  console.log("");
  console.log("=== Összegzés ===");
  console.log(`Eredeti (nyers, ahogy ma megy ki): ${kb(originalTotal)} KB`);
  console.log(
    `Generált AVIF összesen: ${kb(generatedTotal.avif)} KB (${
      TARGET_WIDTHS.length
    } töréspont, a böngésző csak EGYET tölt le belőle)`
  );
  console.log(
    `Generált WebP összesen: ${kb(generatedTotal.webp)} KB (AVIF-et nem támogató böngészőknek)`
  );
  console.log(`Manifestum: ${path.relative(process.cwd(), MANIFEST_PATH)}`);
}

generateImages().catch((error) => {
  console.error("[HIBA] A generálás sikertelen volt:", error);
  process.exit(1);
});
