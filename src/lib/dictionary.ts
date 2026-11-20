import {
  DEFAULT_LANGUAGE,
  Dictionary,
  GlobalDictionary,
  Language,
} from "@/types/dictionary";
import { localeFromPathname } from "@/lib/i18n";
import huDictionary from "@/dictionaries/hu.json";
import enDictionary from "@/dictionaries/en.json";

/**
 * Statikus szótár regiszter (natív JSON i18n, next-intl NÉLKÜL).
 *
 * Statikus importot használunk a dinamikus `import()` helyett: a Next.js
 * build így determinisztikusan bundle-öli mindkét szótárt, futásidejű
 * modulfeloldási hiba nem fordulhat elő.
 */
const DICTIONARIES: Record<Language, Dictionary> = {
  hu: huDictionary as Dictionary,
  en: enDictionary as Dictionary,
};

/**
 * Aszinkron dictionary betöltés Server Component-ekhez (RSC)
 * @param lang - Nyelv kód ("hu" vagy "en")
 * @returns Dictionary objektum
 */
export async function getDictionary(
  lang: Language = DEFAULT_LANGUAGE
): Promise<Dictionary> {
  return DICTIONARIES[lang] ?? DICTIONARIES[DEFAULT_LANGUAGE];
}

/** Szinkron szótár betöltés kliens komponensekhez (PageWrapper, nav). */
export function getDictionarySync(
  lang: Language = DEFAULT_LANGUAGE
): Dictionary {
  return DICTIONARIES[lang] ?? DICTIONARIES[DEFAULT_LANGUAGE];
}

/**
 * Könnyűsúlyú globális szótár-szelet (csak nav, footer, cookie, chat, common),
 * hogy a RootLayout ne küldje át a teljes főoldali tartalmat a kliens bundle-be.
 */
export function pickGlobalDictionary(dict: Dictionary): GlobalDictionary {
  return {
    common: dict.common,
    nav: dict.nav,
    footer: dict.footer,
    cookie: dict.cookie,
    chat: dict.chat,
  };
}

/**
 * Nyelv detektálás a pathname alapján
 * @param pathname - Current pathname
 * @returns Language kód
 */
export function getLanguageFromPathname(pathname: string): Language {
  return localeFromPathname(pathname);
}