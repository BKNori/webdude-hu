import {
  isLanguage,
  localeFromPathname,
  stripLocale,
  buildPath,
  absoluteUrl,
  withLocale,
  buildLanguageAlternates,
  switchLocalePath,
} from "../i18n";
import { DEFAULT_LANGUAGE } from "@/types/dictionary";

describe("i18n helpers", () => {
  it("isLanguage", () => {
    expect(isLanguage("hu")).toBe(true);
    expect(isLanguage("en")).toBe(true);
    expect(isLanguage("de")).toBe(false);
  });

  it("localeFromPathname", () => {
    expect(localeFromPathname(null)).toBe(DEFAULT_LANGUAGE);
    expect(localeFromPathname(undefined)).toBe("hu");
    expect(localeFromPathname("")).toBe("hu");
    expect(localeFromPathname("/en")).toBe("en");
    expect(localeFromPathname("/en/about")).toBe("en");
    expect(localeFromPathname("/english")).toBe("hu");
    expect(localeFromPathname("/kapcsolat")).toBe("hu");
  });

  it("stripLocale", () => {
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/en/about")).toBe("/about");
    expect(stripLocale("/kapcsolat")).toBe("/kapcsolat");
  });

  it("buildPath", () => {
    expect(buildPath("hu")).toBe("/");
    expect(buildPath("hu", "kapcsolat")).toBe("/kapcsolat");
    expect(buildPath("en")).toBe("/en");
    expect(buildPath("en", "/")).toBe("/en");
    expect(buildPath("en", "about")).toBe("/en/about");
    expect(buildPath("en", "/about")).toBe("/en/about");
  });

  it("absoluteUrl", () => {
    expect(absoluteUrl("hu")).toBe("https://webdude.hu");
    expect(absoluteUrl("hu", "/munkak")).toBe("https://webdude.hu/munkak");
    expect(absoluteUrl("en")).toBe("https://webdude.hu/en");
  });

  it("withLocale", () => {
    expect(withLocale("https://example.com", "en")).toBe("https://example.com");
    expect(withLocale("//cdn.example.com/x", "en")).toBe("//cdn.example.com/x");
    expect(withLocale("mailto:a@b.hu", "en")).toBe("mailto:a@b.hu");
    expect(withLocale("#top", "en")).toBe("#top");
    expect(withLocale("/kapcsolat", "en")).toBe("/en/kapcsolat");
    expect(withLocale("/kapcsolat#form", "en")).toBe("/en/kapcsolat#form");
    expect(withLocale("/#form", "hu")).toBe("/#form");
    expect(withLocale("/kapcsolat", "hu")).toBe("/kapcsolat");
  });

  it("buildLanguageAlternates", () => {
    expect(buildLanguageAlternates()).toEqual({
      "hu-HU": "https://webdude.hu",
      "en-US": "https://webdude.hu/en",
      "x-default": "https://webdude.hu",
    });
    expect(buildLanguageAlternates("/munkak")["en-US"]).toBe(
      "https://webdude.hu/en/munkak"
    );
  });

  describe("switchLocalePath", () => {
    it("switches HU -> EN", () => {
      expect(switchLocalePath(null, "en")).toBe("/en");
      expect(switchLocalePath("/", "en")).toBe("/en");
      expect(switchLocalePath("/en/about", "en")).toBe("/en/about");
      expect(switchLocalePath("/en", "en")).toBe("/en");
      expect(switchLocalePath("/munkak/valami", "en")).toBe(
        "/en/portfolio/valami"
      );
      expect(switchLocalePath("/munkak/", "en")).toBe("/en/portfolio");
      expect(switchLocalePath("/szia-norbi-vagyok/", "en")).toBe("/en/about");
      expect(switchLocalePath("/norbi", "en")).toBe("/en/about");
      expect(switchLocalePath("/ismeretlen", "en")).toBe("/en");
    });

    it("switches EN -> HU", () => {
      expect(switchLocalePath("/", "hu")).toBe("/");
      expect(switchLocalePath(undefined, "hu")).toBe("/");
      expect(switchLocalePath("/kapcsolat", "hu")).toBe("/kapcsolat");
      expect(switchLocalePath("/en/portfolio/valami", "hu")).toBe(
        "/munkak/valami"
      );
      expect(switchLocalePath("/en/portfolio", "hu")).toBe("/munkak");
      expect(switchLocalePath("/en/about", "hu")).toBe("/szia-norbi-vagyok");
      expect(switchLocalePath("/en/unknown-page", "hu")).toBe("/");
    });
  });
});
