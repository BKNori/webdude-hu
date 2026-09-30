/**
 * ReszponzĂ­v kĂ©p-derivatĂ­vumok generĂˇlĂˇsa (7.9.0 / 7.10.0)
 *
 * A `next.config.js` `unoptimized: true` beĂˇllĂ­tĂˇsa a cPanel shared hosting
 * (Phusion Passenger) memĂłriakorlĂˇtja miatt GLOBĂLISAN megmarad. Emiatt a
 * `next/image` nem generĂˇl reszponzĂ­v srcset-et, Ă©s a bĂ¶ngĂ©szĹ‘ nyersen kapja
 * a teljes mĂ©retĹ± kĂ©pet (a portfĂłliĂł bannerjei pl. 300-900 KB-ok).
 *
 * Ez a szkript a megoldĂˇs: build-time legenerĂˇlja a szĂĽksĂ©ges kĂ©pek AVIF Ă©s
 * WebP variĂˇnsait, a `<ResponsiveImage>` komponens pedig ezeket `srcSet`-tel
 * szolgĂˇlja ki. Nulla szerveroldali CPU/memĂłriaigĂ©ny, nulla Ăşj dependency.
 *
 * HasznĂˇlat:  node scripts/generate-responsive-images.js
 * A `sharp` a `next` transitĂ­v fĂĽggĹ‘sĂ©ge (node_modules/sharp).
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const MANIFEST_PATH = path.join(ROOT, "src/data/responsiveImages.ts");

const FORMATS = [
  { id: "avif", options: { quality: 55, effort: 4 } },
  { id: "webp", options: { quality: 78, effort: 4 } },
];

/**
 * KĂ©pcsoportok. A szĂ©lessĂ©gek a tĂ©nyleges kijelzĹ‘mĂ©thez igazĂ­tottak:
 * a hero a teljes viewport, a kĂˇrtyĂˇk viszont max ~1/3-1/2 szĂ©lessĂ©gĹ±ek,
 * Ă­gy a 1600w-as variĂˇnsuk feleslegesen nĂ¶velnĂ© a repĂłt.
 */
const GROUPS = [
  {
    name: "hero",
    widths: [640, 1024, 1600, 2000],
    // A bannerek derivatĂ­vumai eddig is itt vannak â€” a cĂ©lĂşt vĂˇltozatlan.
    out: (publicKey, width, ext) => {
      const base = path.basename(publicKey, path.extname(publicKey));
      const fileName = `${base}-${width}w.${ext}`;
      return {
        file: path.join(PUBLIC_DIR, "assets/banners/responsive", fileName),
        url: `/assets/banners/responsive/${fileName}`,
      };
    },
    sources: () => [
      "/assets/banners/webdude-hero.webp",
      "/assets/banners/ronch caffe adris nagybanner 20221005c copy 2.webp",
      "/assets/banners/webdude banner 2000x1000.webp",
    ],
  },
  {
    name: "card",
    widths: [320, 640, 960],
    // /assets/portfolio/btshop/x.webp
    //   -> public/assets/responsive/portfolio/btshop/x-640w.avif
    //   -> URL: /assets/responsive/portfolio/btshop/x-640w.avif
    out: (publicKey, width, ext) => {
      const dir = path
        .dirname(publicKey.replace(/^\//, ""))
        .replace(/^assets\//, "");
      const base = path.basename(publicKey, path.extname(publicKey));
      const fileName = `${base}-${width}w.${ext}`;
      return {
        file: path.join(PUBLIC_DIR, "assets/responsive", dir, fileName),
        url: `/assets/responsive/${dir}/${fileName}`,
      };
    },
    sources: collectCardImages,
  },
];

/** A portfĂłliĂł-, essettanulmĂˇny- Ă©s blogkĂˇrtyĂˇk kĂ©pei a kĂłdban vannak hivatkozva. */
function collectCardImages() {
  const found = new Set();

  // 1) src/data/works.ts â€” a PortfolioGrid a `bannerImage || image` Ă©rtĂ©ket hasznĂˇlja
  const works = fs.readFileSync(path.join(ROOT, "src/data/works.ts"), "utf8");
  for (const match of works.matchAll(
    new RegExp('(?:image|bannerImage):\\s*["\'](/assets/[^"\']+)["\']', "g")
  )) {
    found.add(match[1]);
  }

  // 2) szĂłtĂˇrak â€” a CaseStudiesBento esettanulmĂˇny kĂ©pei
  for (const dict of ["hu", "en"]) {
    const file = path.join(ROOT, `src/dictionaries/${dict}.json`);
    if (!fs.existsSync(file)) continue;
    const json = fs.readFileSync(file, "utf8");
    for (const match of json.matchAll(
      new RegExp('"image":\\s*"(/assets/[^"]+)"', "g")
    )) {
      found.add(match[1]);
    }
  }

  // 3) blog frontmatter (src/content/blog/*.{md,mdx}) â€” a BlogGrid a `post.image`-t hasznĂˇlja
  const blogDir = path.join(ROOT, "src/content/blog");
  if (fs.existsSync(blogDir)) {
    for (const entry of fs.readdirSync(blogDir, { withFileTypes: true })) {
      if (!/\.(md|mdx)$/.test(entry.name)) continue;
      const text = fs.readFileSync(path.join(blogDir, entry.name), "utf8");
      for (const match of text.matchAll(
        new RegExp('^\\s*(?:image|coverImage|thumbnail):\\s*["\']?(/[^\\s"\']+)', "gm")
      )) {
        if (match[1].startsWith("/assets/")) found.add(match[1]);
      }
    }
  }

  return [...found];
}


const kb = (bytes) => Math.round(bytes / 1024);

async function generateGroup(group) {
  const manifest = {};
  const stats = { original: 0, avif: 0, webp: 0, files: 0, missing: 0 };

  for (const publicKey of group.sources()) {
    const inputPath = path.join(PUBLIC_DIR, publicKey.replace(/^\//, ""));
    if (!fs.existsSync(inputPath)) {
      console.warn(`[WARN] Nem található, kihagyva: ${publicKey}`);
      stats.missing++;
      continue;
    }

    const originalSize = fs.statSync(inputPath).size;
    stats.original += originalSize;
    const metadata = await sharp(inputPath).metadata();

    // A manifestum KULCSA nyers marad (így hivatkozik rá a kód), csak a
    // kibocsátott URL-ek URL-kódoltak: a srcset szintaxisban a URL nem
    // tartalmazhat szóközt, különben a böngésző srcset-elemzése elhasal.
    const entry = { fallback: encodeURI(publicKey), avif: "", webp: "" };

    for (const format of FORMATS) {
      const parts = [];
      for (const width of group.widths) {
        // Felnagyítani nem érdemes: a forrás a legnagyobb rendelkezésre álló.
        if (width > metadata.width) continue;
        const target = group.out(publicKey, width, format.id);
        fs.mkdirSync(path.dirname(target.file), { recursive: true });
        await sharp(inputPath)
          .resize({ width, withoutEnlargement: true })
          .toFormat(format.id, format.options)
          .toFile(target.file);
        stats[format.id] += fs.statSync(target.file).size;
        stats.files++;
        parts.push(`${encodeURI(target.url)} ${width}w`);
      }
      entry[format.id] = parts.join(", ");
    }

    // Ha egyik töréspont sem volt használható, nem kerül a manifestumba —
    // a komponens így nyers <img>-re esik vissza.
    if (entry.avif) manifest[publicKey] = entry;
  }

  return { manifest, stats };
}

async function main() {
  const manifest = {};
  const totals = { original: 0, avif: 0, webp: 0, files: 0, missing: 0 };

  for (const group of GROUPS) {
    const result = await generateGroup(group);
    Object.assign(manifest, result.manifest);
    for (const key of Object.keys(totals)) totals[key] += result.stats[key];
    console.log(
      `[OK] ${group.name}: ${Object.keys(result.manifest).length} kép → ${result.stats.files} fájl`
    );
  }

  const tsContent = `// AUTO-GENERATED FILE — NE SORKÖZZÖL KÉZZEL!
// Forrás: scripts/generate-responsive-images.js
// A cPanel memóriakorlát miatt a next.config.js unoptimized: true marad,
// ezért a reszponzív srcset-ek build-time generált statikus fájlokból jönnek.

export interface ResponsiveImageVariants {
  /** AVIF srcSet: "url 320w, url 640w, ..." */
  avif: string;
  /** WebP srcSet AVIF-et nem támogató böngészőknek. */
  webp: string;
  /** Az eredeti, teljes méretű kép (régi böngésző / nem generált kép). */
  fallback: string;
}

/** Kulcs: a kép eredeti /assets/... útvonala (nyers, nem URL-kódolt). */
export const responsiveImageManifest: Record<string, ResponsiveImageVariants> = ${JSON.stringify(
    manifest,
    null,
    2
  )};

/** Egy kép reszponzív variánsai, vagy undefined ha nincs generált derivatívum. */
export function getResponsiveImageVariants(
  src: string
): ResponsiveImageVariants | undefined {
  return responsiveImageManifest[src];
}
`;

  // VÉDŐHÁLÓ: minden kibocsátott srcset URL-nek tényleg léteznie kell a
  // public/ alatt. E nélkül a böngésző 404-et kapna, de a build zöld maradna.
  let missingUrls = 0;
  for (const entry of Object.values(manifest)) {
    for (const format of ["avif", "webp"]) {
      for (const candidate of entry[format].split(",")) {
        const url = candidate.trim().split(/\s+/)[0];
        if (!url) continue;
        const disk = path.join(PUBLIC_DIR, decodeURI(url).replace(/^\//, ""));
        if (!fs.existsSync(disk)) {
          missingUrls++;
          console.error(`[HIBA] A srcset URL nem található a lemezen: ${url}`);
        }
      }
    }
  }
  if (missingUrls > 0) {
    console.error(
      `[HIBA] ${missingUrls} hibás URL — a manifestum szándékosan NEM lett kiírva.`
    );
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, tsContent, "utf8");

  console.log("");
  console.log("=== Összegzés ===");
  console.log(`Képek a manifestumban: ${Object.keys(manifest).length}`);
  console.log(`Generált fájlok: ${totals.files}`);
  if (totals.missing) console.log(`Nem található források: ${totals.missing}`);
  console.log(
    `Eredeti méret összesen: ${kb(totals.original)} KB → AVIF ${kb(
      totals.avif
    )} KB + WebP ${kb(totals.webp)} KB (a böngésző egyet tölt le a képből)`
  );
  console.log(
    `Manifestum: ${path.relative(process.cwd(), MANIFEST_PATH)}`
  );
}

main().catch((error) => {
  console.error("[HIBA] A generálás sikertelen volt:", error);
  process.exit(1);
});

