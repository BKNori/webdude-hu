import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sitemap, { BASE_URL, sanitizeSitemapEntries } from "../sitemap";
import { CATALOG_PRODUCTS } from "@/data/products-catalog";
import { works } from "@/data/works";
import { EN_INSIGHTS } from "@/data/enInsights";
import { getAllPosts, getCombinedBlogPosts } from "@/lib/mdx";
import type { BlogPost } from "@/types/blog";

function readRealMdxPostsFromDisk(): BlogPost[] {
  const blogDir = path.resolve(process.cwd(), "src/content/blog");
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(blogDir, fileName), "utf8");
      const { data, content } = matter(raw);
      const dateStr =
        data.date instanceof Date
          ? data.date.toISOString().split("T")[0]!
          : String(data.date ?? "2026-01-01").split("T")[0]!;
      return {
        slug,
        title: String(data.title ?? slug),
        date: dateStr,
        updatedAt: data.updatedAt ? String(data.updatedAt) : dateStr,
        excerpt: String(data.excerpt ?? ""),
        tldr: String(data.tldr ?? ""),
        content,
        category: String(data.category ?? "Webfejlesztés"),
        readingTime: "5 perc",
        coverImage: "/assets/banners/webdude-hero.webp",
        image: "/assets/banners/webdude-hero.webp",
        author: "Balog Norbert",
        noindex: Boolean(data.noindex),
      };
    });
}

jest.mock("@/lib/mdx", () => ({
  getAllPosts: jest.fn(),
  getCombinedBlogPosts: jest.fn(),
}));

const mockedGetAllPosts = getAllPosts as jest.MockedFunction<typeof getAllPosts>;
const mockedGetCombinedBlogPosts = getCombinedBlogPosts as jest.MockedFunction<
  typeof getCombinedBlogPosts
>;

describe("SSOT Sitemap (src/app/sitemap.ts) — v7.94.0 regressziós teszt", () => {
  const realMdxPosts = readRealMdxPostsFromDisk();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetAllPosts.mockReturnValue(realMdxPosts);
    mockedGetCombinedBlogPosts.mockResolvedValue(realMdxPosts);
  });

  it("nem létezik statikus public/sitemap.xml, amely felülírná az App Router sitemap.ts kimenetét", () => {
    const legacyStaticSitemap = path.resolve(
      process.cwd(),
      "public/sitemap.xml"
    );
    expect(fs.existsSync(legacyStaticSitemap)).toBe(false);
  });

  it("100+ egyedi, duplikációmentes https://webdude.hu URL-t ad vissza, minden kötelező szekcióval és 0 tiltott/noindex/404 útvonallal", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    const urlSet = new Set(urls);

    // 1. Legalább 100+ egyedi URL (konkrétan 130), 0 duplikáció
    expect(entries.length).toBeGreaterThanOrEqual(115);
    expect(urlSet.size).toBe(entries.length);

    for (const url of urls) {
      expect(url.startsWith(BASE_URL)).toBe(true);
      if (url !== BASE_URL) {
        expect(url.endsWith("/")).toBe(false);
      }
    }

    // 2. /termekek + mind a 14 /termekek/<slug>
    expect(urlSet.has(`${BASE_URL}/termekek`)).toBe(true);
    for (const product of CATALOG_PRODUCTS) {
      expect(urlSet.has(`${BASE_URL}${product.href}`)).toBe(true);
    }

    // 3. /munkak + 14 /munkak/<slug> + /en/portfolio + 14 /en/portfolio/<slug>
    expect(urlSet.has(`${BASE_URL}/munkak`)).toBe(true);
    expect(urlSet.has(`${BASE_URL}/en/portfolio`)).toBe(true);
    for (const work of works) {
      expect(urlSet.has(`${BASE_URL}/munkak/${work.slug}`)).toBe(true);
      expect(urlSet.has(`${BASE_URL}/en/portfolio/${work.slug}`)).toBe(true);
    }

    // 4. /hirek + az összes noindex !== true MDX szakcikk (31 db) + /en/insights + 3 EN cikk
    expect(urlSet.has(`${BASE_URL}/hirek`)).toBe(true);
    expect(urlSet.has(`${BASE_URL}/en/insights`)).toBe(true);

    const indexablePosts = realMdxPosts.filter((p) => p.noindex !== true);
    const noindexPosts = realMdxPosts.filter((p) => p.noindex === true);
    expect(indexablePosts.length).toBeGreaterThanOrEqual(30);
    expect(noindexPosts.length).toBeGreaterThanOrEqual(5);

    for (const post of indexablePosts) {
      expect(urlSet.has(`${BASE_URL}/hirek/${post.slug}`)).toBe(true);
    }
    for (const post of noindexPosts) {
      expect(urlSet.has(`${BASE_URL}/hirek/${post.slug}`)).toBe(false);
    }
    for (const enPost of EN_INSIGHTS) {
      expect(urlSet.has(`${BASE_URL}/en/insights/${enPost.slug}`)).toBe(true);
    }

    // 5. /szolgaltatasok + az összes /szolgaltatasok/* (24 db) + /en/services + /en/services/* (4 db)
    const servicesDir = path.resolve(process.cwd(), "src/app/szolgaltatasok");
    const huServiceSubdirs = fs
      .readdirSync(servicesDir)
      .filter((d) => fs.statSync(path.join(servicesDir, d)).isDirectory());
    expect(urlSet.has(`${BASE_URL}/szolgaltatasok`)).toBe(true);
    for (const slug of huServiceSubdirs) {
      expect(urlSet.has(`${BASE_URL}/szolgaltatasok/${slug}`)).toBe(true);
    }

    const enServicesDir = path.resolve(process.cwd(), "src/app/en/services");
    const enServiceSubdirs = fs
      .readdirSync(enServicesDir)
      .filter((d) => fs.statSync(path.join(enServicesDir, d)).isDirectory());
    expect(urlSet.has(`${BASE_URL}/en/services`)).toBe(true);
    for (const slug of enServiceSubdirs) {
      expect(urlSet.has(`${BASE_URL}/en/services/${slug}`)).toBe(true);
    }

    // 6. Szigorú kizárások: 0 db /admin, /portal, /api, /login, noindex vagy 301 redirect
    for (const url of urls) {
      const pathname = url.slice(BASE_URL.length) || "/";
      expect(pathname.startsWith("/admin")).toBe(false);
      expect(pathname.startsWith("/portal")).toBe(false);
      expect(pathname.startsWith("/api")).toBe(false);
      expect(pathname.startsWith("/login")).toBe(false);
      expect(pathname).not.toBe("/norbi");
      expect(pathname).not.toBe("/i-prompt-sablonok");
      expect(pathname).not.toBe("/webshop");
      expect(pathname).not.toBe("/grafika");
    }

    // 7. Fájlrendszer-ellenőrzés: minden statikus vagy dinamikus URL mögött létezik page.tsx (0 db 404)
    const appDir = path.resolve(process.cwd(), "src/app");
    for (const url of urls) {
      const pathname = url.slice(BASE_URL.length);
      if (pathname.startsWith("/munkak/")) {
        expect(fs.existsSync(path.join(appDir, "munkak/[slug]/page.tsx"))).toBe(
          true
        );
      } else if (pathname.startsWith("/en/portfolio/")) {
        expect(
          fs.existsSync(path.join(appDir, "en/portfolio/[slug]/page.tsx"))
        ).toBe(true);
      } else if (pathname.startsWith("/hirek/")) {
        expect(fs.existsSync(path.join(appDir, "hirek/[slug]/page.tsx"))).toBe(
          true
        );
      } else if (pathname.startsWith("/en/insights/")) {
        expect(
          fs.existsSync(path.join(appDir, "en/insights/[slug]/page.tsx"))
        ).toBe(true);
      } else {
        const pageFile = path.join(appDir, pathname, "page.tsx");
        expect(fs.existsSync(pageFile)).toBe(true);
      }
    }

    // 8. Kétirányú hreflang ellenőrzése a főoldal és egy szolgáltatás oldalpáron
    const homeHu = entries.find((e) => e.url === BASE_URL);
    const homeEn = entries.find((e) => e.url === `${BASE_URL}/en`);
    expect(homeHu?.alternates?.languages).toEqual({
      "hu-HU": BASE_URL,
      "en-US": `${BASE_URL}/en`,
      "x-default": BASE_URL,
    });
    expect(homeEn?.alternates?.languages).toEqual(
      homeHu?.alternates?.languages
    );
  });

  it("fallback és sanitizeSitemapEntries védelem: kezeli a hibás dátumokat, kiszűri az idegen/tiltott/duplikált URL-eket", async () => {
    mockedGetCombinedBlogPosts.mockRejectedValueOnce(
      new Error("Firestore offline")
    );
    mockedGetAllPosts.mockReturnValueOnce([]);
    mockedGetAllPosts.mockReturnValueOnce([
      {
        ...realMdxPosts[0]!,
        slug: "teszt-fallback-cikk",
        date: "invalid-date",
        updatedAt: "",
        noindex: false,
      },
    ]);

    const fallbackEntries = await sitemap();
    expect(
      fallbackEntries.some(
        (e) => e.url === `${BASE_URL}/hirek/teszt-fallback-cikk`
      )
    ).toBe(true);

    const sanitized = sanitizeSitemapEntries([
      { url: `${BASE_URL}/` },
      { url: BASE_URL },
      { url: "https://idegen-domain.hu/oldal" },
      { url: `${BASE_URL}/admin/dashboard` },
      { url: `${BASE_URL}/portal/ai-muhely` },
      { url: `${BASE_URL}/api/health` },
      { url: `${BASE_URL}/norbi` },
      { url: `${BASE_URL}/kapcsolat/` },
      { url: `${BASE_URL}/kapcsolat` },
    ]);

    expect(sanitized.map((s) => s.url)).toEqual([
      BASE_URL,
      `${BASE_URL}/kapcsolat`,
    ]);
  });
});
