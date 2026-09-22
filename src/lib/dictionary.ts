import { Dictionary, Language } from "@/types/dictionary";

/**
 * Aszinkron dictionary betöltés Server Component-ekhez (RSC)
 * @param lang - Nyelv kód ("hu" vagy "en")
 * @returns Dictionary objektum
 */
export async function getDictionary(lang: Language = "hu"): Promise<Dictionary> {
  try {
    const dictionary = await import(`@/dictionaries/${lang}.json`);
    return dictionary.default as Dictionary;
  } catch (error) {
    console.error(`Failed to load dictionary for language: ${lang}`, error);
    // Fallback to Hungarian if requested language fails
    const fallback = await import(`@/dictionaries/hu.json`);
    return fallback.default as Dictionary;
  }
}

/**
 * Nyelv detektálás a pathname alapján
 * @param pathname - Current pathname
 * @returns Language kód
 */
export function getLanguageFromPathname(pathname: string): Language {
  if (pathname.startsWith("/en")) {
    return "en";
  }
  return "hu";
}