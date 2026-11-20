import { DEFAULT_LANGUAGE, Language } from "@/types/dictionary";

/**
 * i18n helper-ek a natív JSON dictionary architektúrához.
 *
 * Szabály (Zéró Visszaesés): a magyar URL prefix nélküli ("/"), az angol
 * kizárólag "/en" prefixet kap. A "/hu" prefix SOHA nem jön létre.
 */

export const SITE_URL = "https://webdude.hu";
export const EN_PREFIX = "/en";
export const LOCALES: readonly Language[] = ["hu", "en"];

export function isLanguage(value: string): value is Language {
  return (LOCALES as readonly string[]).includes(value);
}

/** Nyelv meghatározása pathname alapján (SSR-safe, determinisztikus). */
export function localeFromPathname(
  pathname: string | null | undefined
): Language {
  if (!pathname) return DEFAULT_LANGUAGE;
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`)
    ? "en"
    : "hu";
}

/** Az "/en" prefix eltávolítása egy pathname-ből. */
export function stripLocale(pathname: string): string {
  if (pathname === EN_PREFIX) return "/";
  if (pathname.startsWith(`${EN_PREFIX}/`)) {
    return pathname.slice(EN_PREFIX.length);
  }
  return pathname;
}

/**
 * Locale-korrekt útvonal előállítása egy locale nélküli belső útból.
 * @param lang - célnyelv
 * @param path - locale nélküli belső útvonal (pl. "/", "/kapcsolat")
 */
export function buildPath(lang: Language, path: string = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (lang === "hu") return normalized;
  return normalized === "/" ? EN_PREFIX : `${EN_PREFIX}${normalized}`;
}

/** Abszolút URL (canonical / hreflang / OpenGraph). */
export function absoluteUrl(lang: Language, path: string = "/"): string {
  const built = buildPath(lang, path);
  return built === "/" ? SITE_URL : `${SITE_URL}${built}`;
}

/**
 * Hivatkozás átalakítása a célnyelvre.
 * - Külső URL, mailto, tel, #anchor változatlan marad.
 * - A "/en" prefix biztonságosan cserélődik (nem globális String.replace).
 */
export function withLocale(href: string, lang: Language): string {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (!isInternal) return href;

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const pathPart = hashIndex >= 0 ? href.slice(0, hashIndex) : href;

  return `${buildPath(lang, pathPart || "/")}${hash}`;
}

/** hreflang alternates mátrix (hu-HU, en-US, x-default). */
export function buildLanguageAlternates(
  path: string = "/"
): Record<string, string> {
  return {
    "hu-HU": absoluteUrl("hu", path),
    "en-US": absoluteUrl("en", path),
    "x-default": absoluteUrl("hu", path),
  };
}

/** Kétirányú HU <-> EN útvonal-párok a LanguageSwitcher determinisztikus váltásához. */
export const BILINGUAL_ROUTE_PAIRS: ReadonlyArray<
  readonly [hu: string, en: string]
> = [
  ["/", "/en"],
  ["/szia-norbi-vagyok", "/en/about"],
  ["/szolgaltatasok", "/en/services"],
  ["/szolgaltatasok/weboldal-keszites", "/en/services/web-development"],
  [
    "/szolgaltatasok/woocommerce-webshop-keszites",
    "/en/services/woocommerce-development",
  ],
  ["/szolgaltatasok/seo-optimalizalas", "/en/services/seo-optimization"],
  ["/szolgaltatasok/grafikai-tervezes", "/en/services/graphic-design"],
  ["/munkak", "/en/portfolio"],
  ["/hirek", "/en/insights"],
  ["/kapcsolat", "/en/contact"],
  ["/adatvedelmi-szabalyzat", "/en/privacy-policy"],
  ["/felhasznalasi-feltetelek", "/en/terms"],
  ["/ingyenes-seo-aeo-elemzes", "/en/free-seo-aeo-checker"],
  ["/ingyenes-weboldal-elemzes", "/en/free-website-audit"],
];

const HU_TO_EN_MAP = new Map<string, string>([
  ...BILINGUAL_ROUTE_PAIRS,
  ["/norbi", "/en/about"],
]);

const EN_TO_HU_MAP = new Map<string, string>(
  BILINGUAL_ROUTE_PAIRS.map(([hu, en]) => [en, hu])
);

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

/**
 * Pontos nyelvváltó útvonal feloldása az aktuális pathname alapján.
 * Ha létezik 1:1 kétirányú pár (pl. /szia-norbi-vagyok <-> /en/about), oda vált;
 * egynyelvű oldalnál biztonságosan a célnyelv főoldalára (/ vagy /en) tér vissza.
 */
export function switchLocalePath(
  pathname: string | null | undefined,
  targetLang: Language
): string {
  const normalized = normalizePathname(pathname ?? "/");

  if (targetLang === "en") {
    if (normalized === EN_PREFIX || normalized.startsWith(`${EN_PREFIX}/`)) {
      return normalized;
    }
    if (normalized.startsWith("/munkak/") && normalized.length > "/munkak/".length) {
      const slug = normalized.slice("/munkak/".length);
      return `/en/portfolio/${slug}`;
    }
    return HU_TO_EN_MAP.get(normalized) ?? EN_PREFIX;
  }

  if (normalized === "/" || !normalized.startsWith(`${EN_PREFIX}`)) {
    return normalized;
  }
  if (
    normalized.startsWith("/en/portfolio/") &&
    normalized.length > "/en/portfolio/".length
  ) {
    const slug = normalized.slice("/en/portfolio/".length);
    return `/munkak/${slug}`;
  }
  return EN_TO_HU_MAP.get(normalized) ?? "/";
}
