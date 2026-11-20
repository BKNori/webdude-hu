/**
 * i18n Szótár-paritás & Magyar-maradvány Ellenőrző Szkript
 *
 * Használat: npm run check:i18n
 * - Ellenőrzi a 100%-os kulcs-paritást src/dictionaries/hu.json és en.json között.
 * - Ellenőrzi, hogy nincs-e üres string vagy tömb-hossz eltérés.
 * - Figyelmeztet/hibát jelez, ha az en.json értékek magyar ékezetes karaktert tartalmaznak
 *   (kivéve a whitelistelt tulajdonneveket).
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const HU_PATH = path.join(ROOT, "src/dictionaries/hu.json");
const EN_PATH = path.join(ROOT, "src/dictionaries/en.json");

const ACCENT_WHITELIST = ["Balog Norbert", "Kecskemét", "Balog Norbi", "WebDude"];
const HU_ACCENT_REGEX = /[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/;

function flattenEntries(obj, prefix = "") {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) {
      result[fullKey] = `[Array(${value.length})]`;
      value.forEach((item, idx) => {
        if (item !== null && typeof item === "object") {
          Object.assign(result, flattenEntries(item, `${fullKey}[${idx}]`));
        } else {
          result[`${fullKey}[${idx}]`] = item;
        }
      });
    } else if (value !== null && typeof value === "object") {
      Object.assign(result, flattenEntries(value, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

function stripWhitelist(str) {
  let cleaned = str;
  for (const term of ACCENT_WHITELIST) {
    cleaned = cleaned.split(term).join("");
  }
  return cleaned;
}

function main() {
  const hu = JSON.parse(fs.readFileSync(HU_PATH, "utf8"));
  const en = JSON.parse(fs.readFileSync(EN_PATH, "utf8"));

  const huFlat = flattenEntries(hu);
  const enFlat = flattenEntries(en);

  const missingInEn = Object.keys(huFlat).filter((k) => !(k in enFlat));
  const missingInHu = Object.keys(enFlat).filter((k) => !(k in huFlat));

  const isIntentionalEmptySlot = (k) =>
    /(?:^|\.)(suffix|titleSuffix|titleHighlight)$/.test(k);

  const emptyInHu = Object.entries(huFlat)
    .filter(
      ([k, v]) =>
        typeof v === "string" && v.trim() === "" && !isIntentionalEmptySlot(k)
    )
    .map(([k]) => k);
  const emptyInEn = Object.entries(enFlat)
    .filter(
      ([k, v]) =>
        typeof v === "string" && v.trim() === "" && !isIntentionalEmptySlot(k)
    )
    .map(([k]) => k);

  const accentLeaksInEn = Object.entries(enFlat)
    .filter(([, v]) => {
      if (typeof v !== "string") return false;
      return HU_ACCENT_REGEX.test(stripWhitelist(v));
    })
    .map(([k, v]) => `${k}: "${v}"`);

  let hasError = false;

  if (missingInEn.length > 0) {
    console.error("[ERROR] Hiányzó kulcsok az en.json-ból:", missingInEn);
    hasError = true;
  }
  if (missingInHu.length > 0) {
    console.error("[ERROR] Extra / hu.json-ból hiányzó kulcsok:", missingInHu);
    hasError = true;
  }
  if (emptyInHu.length > 0) {
    console.error("[ERROR] Üres string értékek a hu.json-ban:", emptyInHu);
    hasError = true;
  }
  if (emptyInEn.length > 0) {
    console.error("[ERROR] Üres string értékek az en.json-ban:", emptyInEn);
    hasError = true;
  }
  if (accentLeaksInEn.length > 0) {
    console.error(
      "[ERROR] Magyar ékezetes karakter az en.json-ban:",
      accentLeaksInEn
    );
    hasError = true;
  }

  if (hasError) {
    process.exit(1);
  }

  console.log(
    `[OK] i18n paritás rendben! (${Object.keys(huFlat).length} kulcs ellenőrizve, 0 hiányzó, 0 üres, 0 ékezet-szivárgás)`
  );
}

main();
