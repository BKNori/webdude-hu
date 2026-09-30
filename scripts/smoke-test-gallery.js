// @ts-nocheck — önálló Node QA szkript; a TypeScript nyelvi szolgáltatás
// ne validáljalja Next/TS projektként (a tsc és lint amúgy sem veszi be).
/**
 * Smoke teszt a futó szerver ellen (7.11.1 QA).
 *
 * Minden megadott galériaoldalt lekér, majd az oldalon szereplő minden
 * reszponzív `srcset` URL-t leképezi a böngésző valós döntésére: a `sizes`
 * alapján kiválasztjuk a mobil (320w) variánst, és megnézzük, hogy az
 * HTTP 200-at ad-e, a helyes `Content-Type`-pal érkezik-e, és mekkora a
 * fájl. A `webp` srcset jelenléte a hero- és kártyaképeknél engedett.
 *
 * Futtatás: `node scripts/smoke-test-gallery.js [port] [oldal ...]`
 */
const http = require("http");

const args = process.argv.slice(2);
const positional = args.filter((arg) => !arg.startsWith("-"));

if (args.includes("--help") || args.includes("-h")) {
  console.log(`Használat: node scripts/smoke-test-gallery.js [port] [oldal ...]

Opciók:
  -h, --help           Megjeleníti ezt a súgót, és kilép.
  [port]               A vizsgált localhost port (alapértelmezés: 3100).
  [oldal ...]          Ellenőrizendő oldalak; nincs megadva, az alapgalériát használja.`);
  process.exit(0);
}

const PORT = positional[0] || "3100";
const PAGES =
  positional.length > 1
    ? positional.slice(1)
    : [
        "/munkak/chamomprex",
        "/munkak/dr-danyi",
        "/munkak/marina-homes",
        "/munkak/classi-co",
        "/munkak/btshop",
        "/munkak",
      ];

/** Letölti egy URL fejléceit és a tartalmát. */
function fetchRaw(url) {
  return new Promise((resolve, reject) => {
    // A slugok tartalmazhatnak ékezeteket — a Node http csak escape-elt
    // útvonalat fogad el, különben "Request path contains unescaped characters".
    const requestPath = url.split("/").map(encodeURIComponent).join("/");
    http
      .get({ host: "localhost", port: Number(PORT), path: requestPath }, (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            type: res.headers["content-type"] || "",
            body: Buffer.concat(chunks),
          })
        );
      })
      .on("error", reject);
  });
}

/** A srcset első URL-jét adja vissza — ez a böngésző mobil választása. */
function firstSrcSetUrl(srcset) {
  if (!srcset) return null;
  return srcset.split(",")[0].trim().split(/\s+/)[0];
}

async function checkPage(page) {
  const result = await fetchRaw(page);
  const html = result.body.toString("utf8");

  // A srcsetek a <source> és <img> elemekből jönnek.
  const avifSrcSets = [...html.matchAll(/type="image\/avif"\s+srcSet="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((s) => s.includes("/assets/"));
  const webpSrcSets = [...html.matchAll(/type="image\/webp"\s+srcSet="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((s) => s.includes("/assets/"));

  // A nem reszponzív (`next/image` + unoptimized) képek nyers forrásmappát
  // kapnak — ezeket is ellenőrizni kell, különben egy törött kép észrevétlen marad.
  const rawImages = [...new Set([...html.matchAll(/<img[^>]+src="(\/assets\/[^"]+)"/g)].map((m) => m[1]))];

  const responsiveUrls = [...new Set(avifSrcSets.map(firstSrcSetUrl).filter(Boolean))];
  let bytes = 0;
  const broken = [];
  const wrongType = [];

  for (const url of responsiveUrls) {
    const asset = await fetchRaw(url);
    if (asset.status !== 200) broken.push(`${url} (HTTP ${asset.status})`);
    else if (!asset.type.includes("avif")) {
      wrongType.push(`${url} (${asset.type})`);
    } else bytes += asset.body.length;
  }

  for (const url of rawImages) {
    const asset = await fetchRaw(url);
    if (asset.status !== 200) broken.push(`${url} (HTTP ${asset.status})`);
  }

  return {
    page,
    status: result.status,
    avifSources: avifSrcSets.length,
    webpSources: webpSrcSets.length,
    rawImages: rawImages.length,
    checkedAssets: responsiveUrls.length,
    totalKb: Math.round(bytes / 1024),
    broken,
    wrongType,
  };
}

async function main() {
  console.log(`=== Smoke teszt — localhost:${PORT} ===\n`);
  let failed = 0;

  for (const page of PAGES) {
    const r = await checkPage(page);
    const ok = r.status === 200 && r.broken.length === 0 && r.wrongType.length === 0;
    if (!ok) failed++;

    console.log(
      `${ok ? "[OK]  " : "[HIBA]"} ${r.page.padEnd(28)} HTTP ${r.status} | ` +
        `avif: ${String(r.avifSources).padStart(3)} | ` +
        `webp: ${String(r.webpSources).padStart(3)} | ` +
        `nyers img: ${String(r.rawImages).padStart(3)} | ` +
        `mobil reszponziv: ${String(r.checkedAssets).padStart(3)} db, ${r.totalKb} KB`
    );
    for (const b of r.broken) console.log(`        HIANYZO: ${b}`);
    for (const w of r.wrongType) console.log(`        NEM AVIF: ${w}`);
  }

  console.log(
    failed === 0
      ? "\n[OK] Minden oldal 200, minden reszponzív asset elérhető és avif."
      : `\n[HIBA] ${failed} oldal hibás.`
  );
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error("[HIBA]", error.message);
  process.exit(1);
});
