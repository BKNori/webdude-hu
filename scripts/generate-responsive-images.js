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

/**
 * Formátum-készletek. A galéria AVIF-only (a látogatók túl 95%-a támogatja,
 * és a 3 oszlopos rács miatt a WebP másolat csak duplikálná a tárhelyet), a
 * hero és a kártyák viszont megtartják a WebP-et is — ott a böngészők
 * visszaesési hálója (régi Safari) miatt nem érdemes kockáztatni.
 */
const FORMAT_PRESETS = {
  avif: [{ id: "avif", options: { quality: 55, effort: 4 } }],
  both: [
    { id: "avif", options: { quality: 55, effort: 4 } },
    { id: "webp", options: { quality: 78, effort: 4 } },
  ],
};

/** A gyökérkimeneti könyvtárak — a `--clean` ezeket takarítja. */
const OUTPUT_ROOTS = [
  path.join(PUBLIC_DIR, "assets/responsive"),
  path.join(PUBLIC_DIR, "assets/banners/responsive"),
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
    // A card csoport a works.ts bannerImage/image mezőit és a kártyák képeit
    // fedi le. A GeneralCaseStudy hero bannerei is innen jönnek, így
    // szükséges a 1600w és 2000w variáns a tűéles asztali megjelenéshez.
    // A script automatikusan kihagyja a túl nagy méreteket (felnagyítás
    // védelem), így a kisebb képek nem nőnek feleslegesen.
    widths: [320, 640, 960, 1600, 2000],
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
  {
    // Az essettanulmány-oldali „Projekt Galéria" képei (works.ts gallery[]).
    // Ezek a legnagyobb fájlok a repóban (átlag 621 KB), így itt a legnagyobb
    // a nyereség. A már kész képeket a `processed` halmaz kihagyja, a 50 KB
    // alatti forrásokat pedig nem éri meg derivatívumozni.
    name: "gallery",
    // 7.11.1: a galéria egy 3 oszlopos rács, a kártyák fizikailag sosem
    // szélesebbek ~640 px-nél, így a 960w-as variáns és a WebP másolat
    // feleslegesen terhelt (a 7.11.0-s 16,3 MB-ból a java nagy része ez volt).
    widths: [320, 640],
    formats: "avif",
    minBytes: 50 * 1024,
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
    sources: collectGalleryImages,
  },
  {
    // A 8 dedikált esettanulmány-komponens (`BtshopCaseStudy`,
    // `RimaiCaseStudy`, `GoBoxCaseStudy`, `LengyelHelgaCaseStudy`,
    // `HuMagoCaseStudy`, `BorGarnelaCaseStudy`, `AiPromptCaseStudy`,
    // `DrNagyAlbertCaseStudy`) hardcode-olt `next/image` hivatkozásai
    // (7.12.0). A `src/components/organisms/*CaseStudy.tsx` fájlok
    // literális `src="/assets/..."` attribútumaiból automatikusan gyűjtve —
    // a dinamikus `src={...}` kifejezések nincsenek benne, mert azok nem
    // statikusan kibonthatók. MEGJEGYZÉS: a `ClassiCoCaseStudy` galériája
    // már a galéria-csoportban benne van (lásd `collectGalleryImages`),
    // így itt nem szerepel újra.
    name: "casestudy",
    // A dedikált komponensekben hero (teljes viewport) ÉS kisebb
    // galériakártyák is vannak — a hero bannereknek elengedhetetlen
    // a 1600w és 2000w variáns a tűéles asztali megjelenítéshez.
    // A script automatikusan kihagyja a túl nagy méreteket (felnagyítás
    // védelem), így a kisebb képek nem nőnek feleslegesen.
    widths: [320, 640, 960, 1600, 2000],
    formats: "both",
    minBytes: 20 * 1024,
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
    sources: collectCaseStudyImages,
  },
];

/**
 * A csoportok FUTÁSI SORRENDJE (a GROUPS tömb deklarációs sorrendjétől függetlenül).
 *
 * MIÉRT: a generátor `processed` halmaza deduplikálja a forrásokat — az első
 * csoport nyer. A `gallery` (works.ts `gallery[]`) szűk, AVIF-only
 * `[320, 640]` készletet gyárt, mert az a `GeneralCaseStudy` 3 oszlopos
 * rácsára van kalibrálva. A 9 dedikált esettanulmány-komponens viszont
 * UGYANEZEKET a képeket nagy méretben (akár `lg:col-span-2` = 66vw, ill.
 * 50vw) rendereli. Ha a `gallery` futna előbb, ezek a képek csak 640w-ig
 * lennének elérhetők → retina (DPR 2) kijelzőn életlen megjelenés.
 * Ezért a `casestudy` csoport fut ELŐBB: így a közös képek a bővebb
 * `[320, 640, 960, 1600, 2000]` készletet kapják, a rács-specifikus
 * (csak a `gallery[]`-ban szereplő) képek pedig maradnak a szűk,
 * tárhely-optimalizált készletnél.
 */
const GROUP_ORDER = ["hero", "card", "casestudy", "gallery"];
GROUPS.sort(
  (a, b) => GROUP_ORDER.indexOf(a.name) - GROUP_ORDER.indexOf(b.name)
);


/** A 8 dedikált esettanulmány-komponensben hardcode-olt képek. */
function collectCaseStudyImages() {
  // A ClassiCoCaseStudy galériája már a galéria-csoport része —
  // a hero-ja viszont nincs benne, ezért külön szerepel.
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
  const found = new Set();
  for (const file of FILES) {
    const target = path.join(ROOT, "src/components/organisms", file);
    if (!fs.existsSync(target)) {
      console.warn(`[WARN] Esettanulmány-komponens nem található: ${file}`);
      continue;
    }
    const content = fs.readFileSync(target, "utf8");
    for (const match of content.matchAll(
      /src\s*=\s*["'](\/assets\/[^"']+)["']/g
    )) {
      found.add(match[1]);
    }
  }
  return [...found];
}

/** A `works.ts` `gallery: [...]` tömbjeiben hivatkozott képek. */
function collectGalleryImages() {
  const found = new Set();
  const works = fs.readFileSync(path.join(ROOT, "src/data/works.ts"), "utf8");
  for (const block of works.matchAll(/gallery:\s*\[([\s\S]*?)\]/g)) {
    for (const match of block[1].matchAll(
      new RegExp("[\"'](/assets/[^\"']+)[\"']", "g")
    )) {
      found.add(match[1]);
    }
  }
  return [...found];
}

/** A portfĂłliĂł-, essettanulmĂˇny- Ă©s blogkĂˇrtyĂˇk kĂ©pei a kĂłdban vannak hivatkozva. */
function collectCardImages() {
  const found = new Set();

  // 1) src/data/works.ts â€” a PortfolioGrid a `bannerImage || image` Ă©rtĂ©ket hasznĂˇlja
  const works = fs.readFileSync(path.join(ROOT, "src/data/works.ts"), "utf8");
  for (const match of works.matchAll(
    new RegExp("(?:image|bannerImage):\\s*[\"'](/assets/[^\"']+)[\"']", "g")
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
        new RegExp(
          "^\\s*(?:image|coverImage|thumbnail):\\s*[\"']?(/[^\\s\"']+)",
          "gm"
        )
      )) {
        if (match[1].startsWith("/assets/")) found.add(match[1]);
      }
    }
  }

  return [...found];
}

const kb = (bytes) => Math.round(bytes / 1024);

/** A már feldolgozott kép-útvonalak — a forráscsoportok közötti deduplikációhoz. */
const processed = new Set();

/** `--clean` kapcsoló: a generált, de már feleslegessé vált fájlok takarítása. */
const CLEAN = process.argv.includes("--clean");

/**
 * Eltávolítja a kimeneti könyvtárakból azokat a fájlokat, amelyeket az új
 * manifestum már nem hivatkozik (pl. egy leszűkített szélességkészlet vagy
 * az elhagyott WebP-variánsok). Csak generált derivatívumokat érint — az
 * eredeti `public/assets/...` képek sosem kerülnek ide.
 */
function cleanStaleDerivatives(manifest) {
  const referenced = new Set();
  for (const entry of Object.values(manifest)) {
    for (const format of ["avif", "webp"]) {
      for (const candidate of (entry[format] || "").split(",")) {
        const url = candidate.trim().split(/\s+/)[0];
        if (!url) continue;
        referenced.add(
          path.normalize(
            path.join(PUBLIC_DIR, decodeURI(url).replace(/^\//, ""))
          )
        );
      }
    }
  }

  let removed = 0;
  for (const root of OUTPUT_ROOTS) {
    if (!fs.existsSync(root)) continue;
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const target = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(target);
          // Az üresre maradt könyvtárakat is összessük (a git nem tartja
          // nyilván az üres mappákat, de a tisztaság kedvéért).
          if (fs.readdirSync(target).length === 0) fs.rmdirSync(target);
        } else if (!referenced.has(path.normalize(target))) {
          fs.unlinkSync(target);
          removed++;
        }
      }
    };
    walk(root);
  }
  return removed;
}

async function generateGroup(group) {
  const manifest = {};
  const stats = {
    original: 0,
    avif: 0,
    webp: 0,
    files: 0,
    missing: 0,
    skipDup: 0,
    skipSmall: 0,
    unsupported: 0,
  };

  for (const publicKey of group.sources()) {
    // Egy kép több forráscsoportban is szerepelhet (pl. egy banner a kártyán ÉS
    // a galériában) — a második előfordulást nem dolgozzuk fel újra.
    if (processed.has(publicKey)) {
      stats.skipDup++;
      continue;
    }

    const inputPath = path.join(PUBLIC_DIR, publicKey.replace(/^\//, ""));
    if (!fs.existsSync(inputPath)) {
      console.warn(`[WARN] Nem található, kihagyva: ${publicKey}`);
      stats.missing++;
      continue;
    }

    const originalSize = fs.statSync(inputPath).size;
    if (group.minBytes && originalSize < group.minBytes) {
      // Már eleve kicsi kép — a derivatívum nem hozna érdemi megtakarítást.
      stats.skipSmall++;
      continue;
    }

    stats.original += originalSize;

    // Nem minden, amit a works.ts hivatkozik, kép: a classi-co galériában
    // 2 db .webm (videó) fájl is van, amit a sharp nem tud feldolgozni.
    // Ez nem bukhat fel a teljes generálást — kihagyjuk és szólunk.
    let metadata;
    try {
      metadata = await sharp(inputPath).metadata();
    } catch {
      console.warn(`[WARN] Nem kép (sharp nem olvassa): ${publicKey}`);
      stats.unsupported++;
      continue;
    }
    if (!metadata.width || !metadata.height) {
      console.warn(`[WARN] Érvénytelen kép méretekkel: ${publicKey}`);
      stats.unsupported++;
      continue;
    }

    // A manifestum KULCSA nyers marad (így hivatkozik rá a kód), csak a
    // kibocsátott URL-ek URL-kódoltak: a srcset szintaxisban a URL nem
    // tartalmazhat szóközt, különben a böngésző srcset-elemzése elhasal.
    const entry = { fallback: encodeURI(publicKey), avif: "", webp: "" };

    // A csoport dönti el a formátumokat (a galéria AVIF-only).
    const formats = FORMAT_PRESETS[group.formats || "both"];
    for (const format of formats) {
      const parts = [];
      for (const width of group.widths) {
        // A hero és card csoportokban engedélyezzük a felnagyítást,
        // mert a tűéles asztali megjelenés fontosabb, és a sharp
        // minőségi felnagyítást végez. A gallery csoportban (AVIF-only)
        // továbbra is tiltjuk, mert ott a tárhelyoptimalizáció a prioritás.
        const allowEnlargement = group.name === "hero" || group.name === "card";
        if (!allowEnlargement && width > metadata.width) continue;
        const target = group.out(publicKey, width, format.id);
        fs.mkdirSync(path.dirname(target.file), { recursive: true });
        await sharp(inputPath)
          .resize({ width, withoutEnlargement: !allowEnlargement })
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
    if (entry.avif) {
      manifest[publicKey] = entry;
      processed.add(publicKey);
    }
  }

  return { manifest, stats };
}

async function main() {
  const manifest = {};
  const totals = {
    original: 0,
    avif: 0,
    webp: 0,
    files: 0,
    missing: 0,
    skipDup: 0,
    skipSmall: 0,
    unsupported: 0,
  };

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

  if (CLEAN) {
    const removed = cleanStaleDerivatives(manifest);
    console.log(
      removed > 0
        ? `[CLEAN] ${removed} elavult derivatívum eltávolítva.`
        : "[CLEAN] Nincs elavult derivatívum."
    );
  }

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, tsContent, "utf8");

  console.log("");
  console.log("=== Összegzés ===");
  console.log(`Képek a manifestumban: ${Object.keys(manifest).length}`);
  console.log(`Generált fájlok: ${totals.files}`);
  console.log(
    `Kihagyva: ${totals.skipDup} duplikált (már kész), ${totals.skipSmall} 50 KB alatti forrás`
  );
  if (totals.missing) console.log(`Nem található források: ${totals.missing}`);
  if (totals.unsupported) {
    console.log(
      "Nem kép formátumú források (kihagyva): " +
        totals.unsupported +
        " — ezek a galériában képként soha nem működtek"
    );
  }
  console.log(
    `Eredeti méret összesen: ${kb(totals.original)} KB → AVIF ${kb(
      totals.avif
    )} KB + WebP ${kb(totals.webp)} KB (a böngésző egyet tölt le a képből)`
  );
  console.log(`Manifestum: ${path.relative(process.cwd(), MANIFEST_PATH)}`);
}

main().catch((error) => {
  console.error("[HIBA] A generálás sikertelen volt:", error);
  process.exit(1);
});
