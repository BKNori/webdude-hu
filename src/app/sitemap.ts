import { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { posts as fallbackPosts } from "@/data/posts";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BASE_URL = "https://webdude.hu";
const BUILD_DATE = new Date("2026-06-28");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/munkak`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hirek`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/szolgaltatasok`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/termekek`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/add-onok`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/weboldal-keszites`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/webshop-fejlesztes`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/wordpress-weboldal-keszites-kecskemet`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/wordpress-webshop-keszites`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/woocommerce-webshop-keszites`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/wordpress-virusirtas-es-biztonsag`,
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
      url: `${BASE_URL}/szolgaltatasok/grafikai-tervezes`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szolgaltatasok/seo-optimalizalas`,
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
      url: `${BASE_URL}/szolgaltatasok/ai-workflow-kialakitas`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kapcsolat`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/szia-norbi-vagyok`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/felhasznalasi-feltetelek`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/adatvedelmi-szabalyzat`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // 1. Dynamic project pages (combining static projects and Firestore portfolio)
  const projectSlugs = new Set<string>(projects.map((p) => p.slug));

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

  const projectPages = Array.from(projectSlugs).map((slug) => ({
    url: `${BASE_URL}/munkak/${slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 2. Dynamic blog pages from local MDX files
  let blogPosts: Array<{ slug: string; date: Date }> = [];
  try {
    const postsDirectory = path.join(process.cwd(), "src", "content", "blog");
    if (fs.existsSync(postsDirectory)) {
      const fileNames = fs.readdirSync(postsDirectory);
      fileNames.forEach((fileName) => {
        if (!fileName.endsWith(".mdx")) return;
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const { data } = matter(fileContent);

        // Skip noindex posts
        if (data.noindex === true) return;

        blogPosts.push({
          slug,
          date: data.date ? new Date(data.date) : BUILD_DATE,
        });
      });
    }
  } catch (e) {
    console.error("Error reading MDX posts for sitemap:", e);
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

  // 3. Products pages
  const products = [
    "ai-workflow-starter-pack",
    "seo-audit-pro",
    "ai-chatbot-starter",
    "cro-booster-kit",
    "kristofka-munkafolyamat",
    "ai-muhely",
    "banner-ai-muhely",
    "logo-ai-muhely",
    "midjourney-ai-muhely",
    "seo-audit-ai-muhely",
    "szezonalis-ai-muhely",
    "tartalomtervezo-ai-muhely",
    "ui-ux-ai-muhely",
    "versenytars-elemzo-ai-muhely",
  ];

  const productPages = products.map((slug) => ({
    url: `${BASE_URL}/termekek/${slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 4. AI Workshop pages
  const aiWorkshops = [
    "banner",
    "logo",
    "midjourney",
    "ui-ux",
    "seo-audit",
    "szezonalis",
    "tartalomtervezo",
    "kristofka",
    "banner-ai-muhely",
    "logo-ai-muhely",
    "midjourney-ai-muhely",
    "seo-audit-ai-muhely",
    "szezonalis-ai-muhely",
    "tartalomtervezo-ai-muhely",
    "ui-ux-ai-muhely",
    "versenytars-elemzo-ai-muhely",
  ];

  const aiWorkshopPages = aiWorkshops.map((slug) => ({
    url: `${BASE_URL}/portal/ai-muhely/${slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...projectPages,
    ...blogPages,
    ...productPages,
    ...aiWorkshopPages,
  ];
}
