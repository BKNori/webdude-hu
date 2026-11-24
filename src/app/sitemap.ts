import { MetadataRoute } from "next";
import { works } from "@/data/works";
import { EN_INSIGHTS } from "@/data/enInsights";
import { CATALOG_PRODUCTS } from "@/data/products-catalog";
import { posts as fallbackPosts } from "@/data/posts";
import { getCombinedBlogPosts } from "@/lib/mdx";

const BASE_URL = "https://webdude.hu";
const BUILD_DATE = new Date();

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    // Főoldal és főkategóriák (kétirányú hreflang + x-default)
    {
      url: BASE_URL,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: buildBilingualAlternates(BASE_URL, `${BASE_URL}/en`),
    },
    // English homepage & main EN routes — /en prefix, hreflang kapcsolat a HU változattal
    {
      url: `${BASE_URL}/en`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: buildBilingualAlternates(BASE_URL, `${BASE_URL}/en`),
    },
    {
      url: `${BASE_URL}/en/portfolio`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/munkak`,
        `${BASE_URL}/en/portfolio`
      ),
    },
    {
      url: `${BASE_URL}/en/services`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/szolgaltatasok`,
        `${BASE_URL}/en/services`
      ),
    },
    {
      url: `${BASE_URL}/en/services/web-development`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/szolgaltatasok/weboldal-keszites`,
        `${BASE_URL}/en/services/web-development`
      ),
    },
    {
      url: `${BASE_URL}/en/services/woocommerce-development`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/szolgaltatasok/woocommerce-webshop-keszites`,
        `${BASE_URL}/en/services/woocommerce-development`
      ),
    },
    {
      url: `${BASE_URL}/en/services/seo-optimization`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/szolgaltatasok/seo-optimalizalas`,
        `${BASE_URL}/en/services/seo-optimization`
      ),
    },
    {
      url: `${BASE_URL}/en/services/graphic-design`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/szolgaltatasok/grafikai-tervezes`,
        `${BASE_URL}/en/services/graphic-design`
      ),
    },
    {
      url: `${BASE_URL}/en/contact`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/kapcsolat`,
        `${BASE_URL}/en/contact`
      ),
    },
    {
      url: `${BASE_URL}/en/about`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/szia-norbi-vagyok`,
        `${BASE_URL}/en/about`
      ),
    },
    {
      url: `${BASE_URL}/en/privacy-policy`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/adatvedelmi-szabalyzat`,
        `${BASE_URL}/en/privacy-policy`
      ),
    },
    {
      url: `${BASE_URL}/en/terms`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/felhasznalasi-feltetelek`,
        `${BASE_URL}/en/terms`
      ),
    },
    {
      url: `${BASE_URL}/ingyenes-seo-aeo-elemzes`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/ingyenes-seo-aeo-elemzes`,
        `${BASE_URL}/en/free-seo-aeo-checker`
      ),
    },
    {
      url: `${BASE_URL}/en/free-seo-aeo-checker`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/ingyenes-seo-aeo-elemzes`,
        `${BASE_URL}/en/free-seo-aeo-checker`
      ),
    },
    {
      url: `${BASE_URL}/ingyenes-weboldal-elemzes`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/ingyenes-weboldal-elemzes`,
        `${BASE_URL}/en/free-website-audit`
      ),
    },
    {
      url: `${BASE_URL}/en/free-website-audit`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/ingyenes-weboldal-elemzes`,
        `${BASE_URL}/en/free-website-audit`
      ),
    },
    {
      url: `${BASE_URL}/munkak`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/munkak`,
        `${BASE_URL}/en/portfolio`
      ),
    },
    {
      url: `${BASE_URL}/szolgaltatasok`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/szolgaltatasok`,
        `${BASE_URL}/en/services`
      ),
    },
    {
      url: `${BASE_URL}/termekek`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: buildHuOnlyAlternates(`${BASE_URL}/termekek`),
    },
    {
      url: `${BASE_URL}/hirek`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/hirek`,
        `${BASE_URL}/en/insights`
      ),
    },
    {
      url: `${BASE_URL}/en/insights`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/hirek`,
        `${BASE_URL}/en/insights`
      ),
    },
    {
      url: `${BASE_URL}/kapcsolat`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/kapcsolat`,
        `${BASE_URL}/en/contact`
      ),
    },
    {
      url: `${BASE_URL}/szia-norbi-vagyok`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/szia-norbi-vagyok`,
        `${BASE_URL}/en/about`
      ),
    },
    // AI Megoldások főoldal és aloldalak
    {
      url: `${BASE_URL}/ai-megoldasok`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: buildHuOnlyAlternates(`${BASE_URL}/ai-megoldasok`),
    },
    {
      url: `${BASE_URL}/ai-megoldasok/ai-muhely`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: buildHuOnlyAlternates(`${BASE_URL}/ai-megoldasok/ai-muhely`),
    },
    {
      url: `${BASE_URL}/ai-megoldasok/ai-prompt-sablonok`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: buildHuOnlyAlternates(
        `${BASE_URL}/ai-megoldasok/ai-prompt-sablonok`
      ),
    },
    {
      url: `${BASE_URL}/munkafolyamatok/strategist-pro/kristofka-munkafolyamat`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: buildHuOnlyAlternates(
        `${BASE_URL}/munkafolyamatok/strategist-pro/kristofka-munkafolyamat`
      ),
    },
    // 1. és 2. prioritású új és megújított szolgáltatás landing oldalak (0.8 - 0.9)
    {
      url: `${BASE_URL}/szolgaltatasok/weboldal-keszites`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/szolgaltatasok/weboldal-keszites`,
        `${BASE_URL}/en/services/web-development`
      ),
    },
    {
      url: `${BASE_URL}/szolgaltatasok/webshop-fejlesztes`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: buildHuOnlyAlternates(
        `${BASE_URL}/szolgaltatasok/webshop-fejlesztes`
      ),
    },
    {
      url: `${BASE_URL}/szolgaltatasok/wordpress-fejlesztes`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: buildHuOnlyAlternates(
        `${BASE_URL}/szolgaltatasok/wordpress-fejlesztes`
      ),
    },
    {
      url: `${BASE_URL}/szolgaltatasok/wordpress-weboldal-keszites`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: buildHuOnlyAlternates(
        `${BASE_URL}/szolgaltatasok/wordpress-weboldal-keszites`
      ),
    },
    {
      url: `${BASE_URL}/szolgaltatasok/seo-optimalizalas`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/szolgaltatasok/seo-optimalizalas`,
        `${BASE_URL}/en/services/seo-optimization`
      ),
    },
    {
      url: `${BASE_URL}/szolgaltatasok/grafikai-tervezes`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/szolgaltatasok/grafikai-tervezes`,
        `${BASE_URL}/en/services/graphic-design`
      ),
    },
    {
      url: `${BASE_URL}/szolgaltatasok/arculattervezes`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: buildHuOnlyAlternates(
        `${BASE_URL}/szolgaltatasok/arculattervezes`
      ),
    },
    {
      url: `${BASE_URL}/weboldal-keszites-kecskemet`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: buildHuOnlyAlternates(`${BASE_URL}/weboldal-keszites-kecskemet`),
    },
    {
      url: `${BASE_URL}/szolgaltatasok/wordpress-karbantartas`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/weboldal-sebessegoptimalizalas`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/technikai-seo-audit`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/wordpress-biztonsag`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/weboldal-felujitas`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/helyi-seo`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },

    // További specifikus szolgáltatások
    {
      url: `${BASE_URL}/szolgaltatasok/woocommerce-webshop-keszites`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/szolgaltatasok/woocommerce-webshop-keszites`,
        `${BASE_URL}/en/services/woocommerce-development`
      ),
    },
    {
      url: `${BASE_URL}/szolgaltatasok/wordpress-webshop-keszites`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/egyedi-arculattervezes-logo`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/marketing-lead-generalas`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/ai-workflow-kialakitas`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/ai-kep-es-videogeneralas`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/ai-prompt-engineering`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/add-onok`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/logo-tervezes`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/csomagolas-tervezes`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/szorolap-tervezes`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },

    // Jogi és szabályzati oldalak
    {
      url: `${BASE_URL}/felhasznalasi-feltetelek`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/felhasznalasi-feltetelek`,
        `${BASE_URL}/en/terms`
      ),
    },
    {
      url: `${BASE_URL}/adatvedelmi-szabalyzat`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: buildBilingualAlternates(
        `${BASE_URL}/adatvedelmi-szabalyzat`,
        `${BASE_URL}/en/privacy-policy`
      ),
    },
  ];

  // 1. Dynamic project pages (combining static works and Firestore portfolio)
  const projectSlugs = new Set<string>(works.map((p) => p.slug));

  try {
    const { collection, getDocs } = await import("firebase/firestore");
    const { db } = await import("@/lib/firebase");
    if (db) {
      const portfolioRef = collection(db, "portfolio");
      const snapshot = await getDocs(portfolioRef);
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.slug) {
          projectSlugs.add(String(data.slug));
        }
      });
    }
  } catch (e) {
    console.error("Error querying Firestore projects for sitemap:", e);
  }

  const staticWorkSlugs = new Set(works.map((w) => w.slug));

  const projectPages = Array.from(projectSlugs).map((slug) => ({
    url: `${BASE_URL}/munkak/${slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    ...(staticWorkSlugs.has(slug)
      ? {
          alternates: buildBilingualAlternates(
            `${BASE_URL}/munkak/${slug}`,
            `${BASE_URL}/en/portfolio/${slug}`
          ),
        }
      : {}),
  }));

  const enProjectPages = works.map((w) => ({
    url: `${BASE_URL}/en/portfolio/${w.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: buildBilingualAlternates(
      `${BASE_URL}/munkak/${w.slug}`,
      `${BASE_URL}/en/portfolio/${w.slug}`
    ),
  }));

  // 2. Dynamic blog pages from local MDX files and Firestore
  let blogPosts: Array<{ slug: string; date: Date }> = [];
  try {
    const allPosts = await getCombinedBlogPosts();
    blogPosts = allPosts
      .filter((p) => p.noindex !== true)
      .map((p) => {
        const rawLastMod = p.updatedAt || p.date;
        const parsedLastMod = rawLastMod ? new Date(rawLastMod) : BUILD_DATE;
        return {
          slug: p.slug,
          date: Number.isNaN(parsedLastMod.getTime())
            ? BUILD_DATE
            : parsedLastMod,
        };
      });
  } catch (e) {
    console.error("Error reading posts for sitemap:", e);
  }

  // Fallback to static posts if filesystem failed
  if (blogPosts.length === 0) {
    blogPosts = fallbackPosts.map((p) => ({
      slug: p.slug,
      date: new Date(p.date),
    }));
  }

  const blogPages = blogPosts.map((post) => ({
    url: `${BASE_URL}/hirek/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 3. Products pages (SSOT: CATALOG_PRODUCTS — mind a 14 /termekek/<slug> aloldal)
  const productPages: MetadataRoute.Sitemap = CATALOG_PRODUCTS.map(
    (product) => ({
      url: `${BASE_URL}${product.href}`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: buildHuOnlyAlternates(`${BASE_URL}${product.href}`),
    })
  );

  const enInsightPages: MetadataRoute.Sitemap = EN_INSIGHTS.map((post) => ({
    url: `${BASE_URL}/en/insights/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...projectPages,
    ...enProjectPages,
    ...blogPages,
    ...enInsightPages,
    ...productPages,
  ];
}
