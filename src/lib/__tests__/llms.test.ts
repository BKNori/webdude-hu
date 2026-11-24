import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CATALOG_PRODUCTS } from "@/data/products-catalog";
import { works } from "@/data/works";
import { EN_INSIGHTS } from "@/data/enInsights";

const MOJIBAKE_PATTERNS = [
  "Ă©",
  "Ăˇ",
  "Ă­",
  "Ăł",
  "Ă¶",
  "Ĺ‘",
  "Ăş",
  "ĂĽ",
  "Ĺ±",
  "Ă‰",
  "Ă“",
  "Ă–",
  "Ĺ ",
  "Ăš",
  "Ăś",
  "Ĺ°",
  "â€“",
  "â€”",
  "â€ž",
  "â€ť",
];

describe("AI Discovery SSOT fájlok (public/llms.txt & public/llms-full.txt) — v7.95.0", () => {
  const llmsPath = path.resolve(process.cwd(), "public/llms.txt");
  const llmsFullPath = path.resolve(process.cwd(), "public/llms-full.txt");

  const blogDir = path.resolve(process.cwd(), "src/content/blog");
  const mdxFiles = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  const indexableSlugs: string[] = [];
  const noindexSlugs: string[] = [];

  for (const file of mdxFiles) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
    const { data } = matter(raw);
    if (data.noindex === true) {
      noindexSlugs.push(slug);
    } else {
      indexableSlugs.push(slug);
    }
  }

  it("mindkét fájl létezik, BOM-mentes UTF-8, LF sortörésű és 0 mojibake hibát tartalmaz", () => {
    expect(fs.existsSync(llmsPath)).toBe(true);
    expect(fs.existsSync(llmsFullPath)).toBe(true);

    for (const filePath of [llmsPath, llmsFullPath]) {
      const buf = fs.readFileSync(filePath);
      // UTF-8 BOM (EF BB BF) szigorúan tilos
      expect(
        buf.length >= 3 &&
          buf[0] === 0xef &&
          buf[1] === 0xbb &&
          buf[2] === 0xbf
      ).toBe(false);

      const content = buf.toString("utf8");
      expect(content.includes("\r")).toBe(false);
      for (const bad of MOJIBAKE_PATTERNS) {
        expect(content.includes(bad)).toBe(false);
      }
    }
  });

  it("mindkét fájl tartalmazza a 14 terméket, a 14 HU + 14 EN esettanulmányt, a 31 HU + 3 EN cikket, valamint a sitemap.xml és feed.xml hivatkozásokat", () => {
    const llms = fs.readFileSync(llmsPath, "utf8");
    const llmsFull = fs.readFileSync(llmsFullPath, "utf8");

    expect(llms.startsWith("# WebDude — Balog Norbert\n")).toBe(true);

    for (const content of [llms, llmsFull]) {
      expect(content).toContain("https://webdude.hu/sitemap.xml");
      expect(content).toContain("https://webdude.hu/feed.xml");

      // Mind a 14 /termekek/<slug>
      expect(CATALOG_PRODUCTS).toHaveLength(14);
      for (const product of CATALOG_PRODUCTS) {
        expect(content).toContain(`https://webdude.hu${product.href}`);
      }

      // Mind a 14 HU és 14 EN esettanulmány
      expect(works).toHaveLength(14);
      for (const work of works) {
        expect(content).toContain(`https://webdude.hu/munkak/${work.slug}`);
        expect(content).toContain(
          `https://webdude.hu/en/portfolio/${work.slug}`
        );
      }

      // Mind a 31 indexelhető magyar cikk és 3 angol cikk
      expect(indexableSlugs.length).toBeGreaterThanOrEqual(31);
      for (const slug of indexableSlugs) {
        expect(content).toContain(`https://webdude.hu/hirek/${slug}`);
      }
      expect(EN_INSIGHTS).toHaveLength(3);
      for (const guide of EN_INSIGHTS) {
        expect(content).toContain(
          `https://webdude.hu/en/insights/${guide.slug}`
        );
      }
    }
  });

  it("0 db tiltott útvonal (/admin/, /portal/, /api/, /login, noindex cikk) és 0 db fix ár / pénznem (Ft, HUF, EUR, €, $) szerepel bennük", () => {
    const llms = fs.readFileSync(llmsPath, "utf8");
    const llmsFull = fs.readFileSync(llmsFullPath, "utf8");

    expect(noindexSlugs.length).toBeGreaterThanOrEqual(5);

    for (const content of [llms, llmsFull]) {
      expect(content).not.toContain("/admin/");
      expect(content).not.toContain("/portal/");
      expect(content).not.toContain("/api/");
      expect(content).not.toMatch(
        /(?:https?:\/\/webdude\.hu|(?:^|[\s(["'`]))\/(?:admin|portal|api|login|norbi|i-prompt-sablonok)(?:\/|\b)/im
      );

      for (const excludedSlug of noindexSlugs) {
        expect(content).not.toContain(excludedSlug);
      }

      expect(content).not.toMatch(/\b(?:Ft|HUF|EUR|USD|priceRange)\b|€|\$/i);
    }
  });
});
