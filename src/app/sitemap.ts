import type { MetadataRoute } from "next";
import { works } from "@/data/works";
import { EN_INSIGHTS } from "@/data/enInsights";
import { CATALOG_PRODUCTS } from "@/data/products-catalog";
import { getAllPosts, getCombinedBlogPosts } from "@/lib/mdx";

export const BASE_URL = "https://webdude.hu";

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

interface BilingualRouteConfig {
  huPath: string;
  enPath: string;
  changeFrequency: ChangeFreq;
  huPriority: number;
  enPriority: number;
}

interface StaticRouteConfig {
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
}

const DISALLOWED_PATH_PREFIXES = [
  "/admin",
  "/portal",
  "/api",
  "/login",
  "/_next",
] as const;

/**
 * Szigorúan kizárt útvonalak: 301-es átirányítások (`next.config.js`),
 * szerveroldali `redirect()` oldalak, valamint `noindex: true` duplikátumok.
 */
const EXCLUDED_EXACT_PATHS = new Set<string>([
  "/norbi",
  "/i-prompt-sablonok",
  "/ai-automatizacio",
  "/grafika",
  "/karbantartas",
  "/seo-audit",
  "/ux-audit",
  "/webfejlesztes",
  "/webshop",
  "/adatvedelmi-nyilatkozat",
  "/wordpress-karbantartas",
  "/seo",
  "/seo-optimalizalas",
  "/woocommerce-webshop",
  "/wordpress-fejlesztes",
  "/wordpress-weboldal-keszites",
  "/szolgaltatasok/weboldal-keszites-kecskemet",
  "/szolgaltatasok/wordpress-weboldal-keszites-kecskemet",
  "/szolgaltatasok/wordpress-virusirtas-es-biztonsag",
  "/termekek/versenytares-elemzo-ai-muhely",
]);

/** 14 kétnyelvű (HU ↔ EN) statikus oldalpár (28 URL, garantáltan szimmetrikus hreflang). */
const BILINGUAL_STATIC_ROUTES: readonly BilingualRouteConfig[] = [
  {
    huPath: "",
    enPath: "/en",
    changeFrequency: "weekly",
    huPriority: 1.0,
    enPriority: 1.0,
  },
  {
    huPath: "/munkak",
    enPath: "/en/portfolio",
    changeFrequency: "weekly",
    huPriority: 0.9,
    enPriority: 0.85,
  },
  {
    huPath: "/szolgaltatasok",
    enPath: "/en/services",
    changeFrequency: "monthly",
    huPriority: 0.9,
    enPriority: 0.85,
  },
  {
    huPath: "/szolgaltatasok/weboldal-keszites",
    enPath: "/en/services/web-development",
    changeFrequency: "weekly",
    huPriority: 0.9,
    enPriority: 0.8,
  },
  {
    huPath: "/szolgaltatasok/woocommerce-webshop-keszites",
    enPath: "/en/services/woocommerce-development",
    changeFrequency: "weekly",
    huPriority: 0.9,
    enPriority: 0.8,
  },
  {
    huPath: "/szolgaltatasok/seo-optimalizalas",
    enPath: "/en/services/seo-optimization",
    changeFrequency: "weekly",
    huPriority: 0.9,
    enPriority: 0.8,
  },
  {
    huPath: "/szolgaltatasok/grafikai-tervezes",
    enPath: "/en/services/graphic-design",
    changeFrequency: "weekly",
    huPriority: 0.9,
    enPriority: 0.8,
  },
  {
    huPath: "/hirek",
    enPath: "/en/insights",
    changeFrequency: "weekly",
    huPriority: 0.8,
    enPriority: 0.85,
  },
  {
    huPath: "/kapcsolat",
    enPath: "/en/contact",
    changeFrequency: "monthly",
    huPriority: 0.8,
    enPriority: 0.8,
  },
  {
    huPath: "/szia-norbi-vagyok",
    enPath: "/en/about",
    changeFrequency: "monthly",
    huPriority: 0.8,
    enPriority: 0.8,
  },
  {
    huPath: "/ingyenes-seo-aeo-elemzes",
    enPath: "/en/free-seo-aeo-checker",
    changeFrequency: "monthly",
    huPriority: 0.85,
    enPriority: 0.85,
  },
  {
    huPath: "/ingyenes-weboldal-elemzes",
    enPath: "/en/free-website-audit",
    changeFrequency: "monthly",
    huPriority: 0.85,
    enPriority: 0.85,
  },
  {
    huPath: "/adatvedelmi-szabalyzat",
    enPath: "/en/privacy-policy",
    changeFrequency: "yearly",
    huPriority: 0.3,
    enPriority: 0.3,
  },
  {
    huPath: "/felhasznalasi-feltetelek",
    enPath: "/en/terms",
    changeFrequency: "yearly",
    huPriority: 0.3,
    enPriority: 0.3,
  },
];

/** 26 magyar nyelvű önálló indexelhető statikus landing & gyűjtőoldal. */
const HU_ONLY_STATIC_ROUTES: readonly StaticRouteConfig[] = [
  { path: "/termekek", changeFrequency: "weekly", priority: 0.85 },
  { path: "/ai-megoldasok", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ai-megoldasok/ai-muhely", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/ai-megoldasok/ai-prompt-sablonok",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/munkafolyamatok/strategist-pro/kristofka-munkafolyamat",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/weboldal-keszites-kecskemet",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  { path: "/szolgaltatasok/webshop-fejlesztes", changeFrequency: "weekly", priority: 0.9 },
  { path: "/szolgaltatasok/wordpress-fejlesztes", changeFrequency: "weekly", priority: 0.9 },
  {
    path: "/szolgaltatasok/wordpress-weboldal-keszites",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  { path: "/szolgaltatasok/arculattervezes", changeFrequency: "weekly", priority: 0.9 },
  { path: "/szolgaltatasok/wordpress-karbantartas", changeFrequency: "weekly", priority: 0.9 },
  {
    path: "/szolgaltatasok/weboldal-sebessegoptimalizalas",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  { path: "/szolgaltatasok/technikai-seo-audit", changeFrequency: "weekly", priority: 0.8 },
  { path: "/szolgaltatasok/wordpress-biztonsag", changeFrequency: "weekly", priority: 0.8 },
  { path: "/szolgaltatasok/weboldal-felujitas", changeFrequency: "weekly", priority: 0.8 },
  { path: "/szolgaltatasok/helyi-seo", changeFrequency: "weekly", priority: 0.8 },
  {
    path: "/szolgaltatasok/wordpress-webshop-keszites",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/szolgaltatasok/egyedi-arculattervezes-logo",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/szolgaltatasok/marketing-lead-generalas",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { path: "/szolgaltatasok/ai-workflow-kialakitas", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/szolgaltatasok/ai-kep-es-videogeneralas",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { path: "/szolgaltatasok/ai-prompt-engineering", changeFrequency: "monthly", priority: 0.7 },
  { path: "/szolgaltatasok/add-onok", changeFrequency: "monthly", priority: 0.7 },
  { path: "/szolgaltatasok/logo-tervezes", changeFrequency: "monthly", priority: 0.7 },
  { path: "/szolgaltatasok/csomagolas-tervezes", changeFrequency: "monthly", priority: 0.7 },
  { path: "/szolgaltatasok/szorolap-tervezes", changeFrequency: "monthly", priority: 0.7 },
];

function buildBilingualAlternates(huUrl: string, enUrl: string) {
  return {
    languages: {
      "hu-HU": huUrl,
      "en-US": enUrl,
      "x-default": huUrl,
    },
  };
}

function buildHuOnlyAlternates(huUrl: string) {
  return {
    languages: {
      "hu-HU": huUrl,
      "x-default": huUrl,
    },
  };
}

function buildEnOnlyAlternates(enUrl: string) {
  return {
    languages: {
      "en-US": enUrl,
      "x-default": enUrl,
    },
  };
}

function parseSafeDate(rawDate: string | undefined, fallback: Date): Date {
  if (!rawDate) return fallback;
  const parsed = new Date(rawDate);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

/**
 * Normalizálja, szűri (privát / redirect / noindex kizárás) és deduplikálja
 * a sitemap bejegyzéseket, garantálva a 100%-ban kanonikus kimenetet.
 */
export function sanitizeSitemapEntries(
  entries: MetadataRoute.Sitemap
): MetadataRoute.Sitemap {
  const uniqueByUrl = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const entry of entries) {
    const normalizedUrl =
      entry.url === `${BASE_URL}/`
        ? BASE_URL
        : entry.url.replace(/\/+$/, "");

    if (!normalizedUrl.startsWith(BASE_URL)) continue;

    const pathname = normalizedUrl.slice(BASE_URL.length) || "/";
    const isDisallowedPrefix = DISALLOWED_PATH_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );
    if (isDisallowedPrefix || EXCLUDED_EXACT_PATHS.has(pathname)) continue;

    if (!uniqueByUrl.has(normalizedUrl)) {
      uniqueByUrl.set(normalizedUrl, { ...entry, url: normalizedUrl });
    }
  }

  return Array.from(uniqueByUrl.values());
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date();

  // 1. Kétnyelvű (HU ↔ EN) statikus oldalpárok (14 pár = 28 URL)
  const bilingualStaticPages: MetadataRoute.Sitemap =
    BILINGUAL_STATIC_ROUTES.flatMap((route) => {
      const huUrl = `${BASE_URL}${route.huPath}`;
      const enUrl = `${BASE_URL}${route.enPath}`;
      const alternates = buildBilingualAlternates(huUrl, enUrl);

      return [
        {
          url: huUrl,
          lastModified: buildDate,
          changeFrequency: route.changeFrequency,
          priority: route.huPriority,
          alternates,
        },
        {
          url: enUrl,
          lastModified: buildDate,
          changeFrequency: route.changeFrequency,
          priority: route.enPriority,
          alternates,
        },
      ];
    });

  // 2. Magyar nyelvű önálló statikus oldalak (26 URL)
  const huStaticPages: MetadataRoute.Sitemap = HU_ONLY_STATIC_ROUTES.map(
    (route) => {
      const url = `${BASE_URL}${route.path}`;
      return {
        url,
        lastModified: buildDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: buildHuOnlyAlternates(url),
      };
    }
  );

  // 3. Termék aloldalak SSOT-ból (`CATALOG_PRODUCTS` — 14 URL)
  const productPages: MetadataRoute.Sitemap = CATALOG_PRODUCTS.map(
    (product) => {
      const url = `${BASE_URL}${product.href}`;
      return {
        url,
        lastModified: buildDate,
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: buildHuOnlyAlternates(url),
      };
    }
  );

  // 4. Portfólió esettanulmányok SSOT-ból (`works.ts` — 14 HU + 14 EN = 28 URL)
  const portfolioPages: MetadataRoute.Sitemap = works.flatMap((work) => {
    const huUrl = `${BASE_URL}/munkak/${work.slug}`;
    const enUrl = `${BASE_URL}/en/portfolio/${work.slug}`;
    const alternates = buildBilingualAlternates(huUrl, enUrl);

    return [
      {
        url: huUrl,
        lastModified: buildDate,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates,
      },
      {
        url: enUrl,
        lastModified: buildDate,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates,
      },
    ];
  });

  // 5. Magyar szakcikkek (`noindex !== true`, pontos updatedAt || date dátummal)
  let rawPosts = await getCombinedBlogPosts().catch(() => getAllPosts());
  if (rawPosts.length === 0) {
    rawPosts = getAllPosts();
  }

  const blogPages: MetadataRoute.Sitemap = rawPosts
    .filter((post) => post.noindex !== true && Boolean(post.slug))
    .map((post) => {
      const url = `${BASE_URL}/hirek/${post.slug}`;
      return {
        url,
        lastModified: parseSafeDate(post.updatedAt || post.date, buildDate),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: buildHuOnlyAlternates(url),
      };
    });

  // 6. Angol szakmai útmutatók (`EN_INSIGHTS` — 3 URL)
  const enInsightPages: MetadataRoute.Sitemap = EN_INSIGHTS.map((post) => {
    const url = `${BASE_URL}/en/insights/${post.slug}`;
    return {
      url,
      lastModified: parseSafeDate(post.updatedAt || post.date, buildDate),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: buildEnOnlyAlternates(url),
    };
  });

  return sanitizeSitemapEntries([
    ...bilingualStaticPages,
    ...huStaticPages,
    ...productPages,
    ...portfolioPages,
    ...blogPages,
    ...enInsightPages,
  ]);
}
