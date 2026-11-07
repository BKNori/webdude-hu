import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");

function detectCategory(title: string, slug: string): string {
  const text = `${title} ${slug}`.toLowerCase();
  if (text.includes("wordpress") || text.includes("wp-") || text.includes("phpmyadmin")) {
    return "WordPress";
  }
  if (text.includes("seo") || text.includes("google") || text.includes("cegprofil")) {
    return "SEO & Keresőoptimalizálás";
  }
  if (text.includes("ai") || text.includes("promt") || text.includes("prompt") || text.includes("intelligencia")) {
    return "AI Automatizáció";
  }
  if (text.includes("marka") || text.includes("grafik") || text.includes("arculat") || text.includes("design") || text.includes("csomagol")) {
    return "Grafikai tervezés";
  }
  if (text.includes("woocommerce") || text.includes("webshop") || text.includes("rendeles")) {
    return "Webshop fejlesztés";
  }
  return "Webfejlesztés";
}

function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} perc`;
}

function parseMdxFile(fileName: string): BlogPost | null {
  try {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContents);

    const title = (data.title as string) || slug;
    const rawDate = data.date;
    let dateStr = new Date().toISOString().split("T")[0];
    if (rawDate instanceof Date) {
      dateStr = rawDate.toISOString().split("T")[0];
    } else if (rawDate) {
      dateStr = String(rawDate).split("T")[0];
    }

    const excerpt = (data.excerpt as string) || (data.description as string) || "";
    const category = (data.category as string) || detectCategory(title, slug);
    const readingTime = (data.readingTime as string) || calculateReadingTime(content);
    const coverImage = (data.coverImage as string) || (data.image as string) || "/assets/banners/webdude-hero.webp";
    const author = (data.author as string) || "Balog Norbert";
    const noindex = Boolean(data.noindex);

    return {
      slug,
      title,
      date: dateStr,
      excerpt,
      content,
      category,
      readingTime,
      coverImage,
      image: coverImage,
      author,
      noindex,
      updatedAt: dateStr,
    };
  } catch (err) {
    console.error(`parseMdxFile hiba a(z) ${fileName} fájlnál:`, err);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`getAllPosts: A mappa nem található: ${postsDirectory}`);
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData: BlogPost[] = [];

    for (const fileName of fileNames) {
      if (!fileName.endsWith(".mdx")) continue;
      const post = parseMdxFile(fileName);
      if (post) {
        allPostsData.push(post);
      }
    }

    return allPostsData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (err) {
    console.error("getAllPosts hiba:", err);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fileName = `${slug}.mdx`;
  return parseMdxFile(fileName);
}

export function getAllPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) return [];
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => fileName.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

/**
 * Kombinált bloglekérdezés (MDX fájlok + Firestore try/catch fúzió).
 * Garantálja, hogy Firestore hiba vagy üresség esetén a 30 db MDX cikk 100%-ban megjelenik!
 */
export async function getCombinedBlogPosts(): Promise<BlogPost[]> {
  const localPosts = getAllPosts();
  const postsMap = new Map<string, BlogPost>();

  // 1. Lokális MDX cikkek betöltése stabil alapként
  for (const post of localPosts) {
    postsMap.set(post.slug, post);
  }

  // 2. Firestore cikkek kiegészítése/felülírása try/catch védelemmel
  try {
    const { getBlogPostsFromFirestore } = await import("@/app/actions/blogPosts");
    const firestorePosts = await getBlogPostsFromFirestore();
    if (firestorePosts && Array.isArray(firestorePosts)) {
      for (const fp of firestorePosts) {
        if (fp.published === false) {
          postsMap.delete(fp.slug);
          continue;
        }
        postsMap.set(fp.slug, {
          slug: fp.slug,
          title: fp.title,
          date: fp.date,
          excerpt: fp.excerpt,
          content: fp.content,
          coverImage: fp.coverImage || "/assets/banners/webdude-hero.webp",
          image: fp.coverImage || "/assets/banners/webdude-hero.webp",
          category: fp.category,
          readingTime: fp.readingTime,
          featured: fp.featured,
          noindex: fp.noindex,
          author: fp.author,
          updatedAt: fp.updatedAt,
        });
      }
    }
  } catch (err) {
    console.warn("getCombinedBlogPosts: Firestore lekérés sikertelen, lokális MDX cikkek aktívak", err);
  }

  const all = Array.from(postsMap.values());
  return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Egyedi cikk lekérdezése slug alapján: először lokális MDX, majd Firestore fallback.
 */
export async function getPostBySlugCombined(slug: string): Promise<BlogPost | null> {
  // 1. Lokális MDX keresése
  const localPost = getPostBySlug(slug);
  if (localPost) {
    return localPost;
  }

  // 2. Firestore fallback
  try {
    const { getBlogPostsFromFirestore } = await import("@/app/actions/blogPosts");
    const firestorePosts = await getBlogPostsFromFirestore();
    const fp = firestorePosts.find((p) => p.slug === slug);
    if (fp) {
      return {
        slug: fp.slug,
        title: fp.title,
        date: fp.date,
        excerpt: fp.excerpt,
        content: fp.content,
        coverImage: fp.coverImage || "/assets/banners/webdude-hero.webp",
        image: fp.coverImage || "/assets/banners/webdude-hero.webp",
        category: fp.category,
        readingTime: fp.readingTime,
        featured: fp.featured,
        noindex: fp.noindex,
        author: fp.author,
        updatedAt: fp.updatedAt,
      };
    }
  } catch (err) {
    console.warn(`getPostBySlugCombined: Firestore lekérés sikertelen a(z) ${slug} cikkhez`, err);
  }

  return null;
}
