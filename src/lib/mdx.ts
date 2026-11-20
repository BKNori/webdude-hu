import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogFaqItem, BlogPost } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");

/** Tisztítja a Markdown formázásokat a JSON-LD FAQPage szövegéből. */
function stripMarkdownFormatting(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Kinyeri a GYIK (FAQ) tételeket a cikk `faq` frontmatteréből vagy a Markdown
 * `## Gyakori kérdések` / `## GYIK` szekciójából a `### Kérdés` blokkok alapján.
 */
function extractFaqItems(
  rawFaq: unknown,
  content: string
): BlogFaqItem[] | undefined {
  if (Array.isArray(rawFaq)) {
    const parsed = rawFaq
      .filter(
        (item): item is { question: string; answer: string } =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as { question?: unknown }).question === "string" &&
          typeof (item as { answer?: unknown }).answer === "string"
      )
      .map((item) => ({
        question: item.question.trim(),
        answer: item.answer.trim(),
      }))
      .filter((item) => item.question.length > 0 && item.answer.length > 0);
    if (parsed.length > 0) return parsed;
  }

  const lines = content.split(/\r?\n/);
  const items: BlogFaqItem[] = [];
  let inFaqSection = false;
  let currentQuestion = "";
  let currentAnswerLines: string[] = [];

  const flushCurrent = () => {
    if (currentQuestion && currentAnswerLines.length > 0) {
      const answer = stripMarkdownFormatting(currentAnswerLines.join(" "));
      if (answer.length > 0) {
        items.push({
          question: stripMarkdownFormatting(currentQuestion),
          answer,
        });
      }
    }
    currentQuestion = "";
    currentAnswerLines = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^##\s+/.test(trimmed)) {
      if (inFaqSection) {
        flushCurrent();
        break;
      }
      if (/^##\s+.*(?:gyakori\s+kérdések|gyik|faq)/i.test(trimmed)) {
        inFaqSection = true;
      }
      continue;
    }

    if (!inFaqSection) continue;

    if (/^###\s+/.test(trimmed)) {
      flushCurrent();
      currentQuestion = trimmed.replace(/^###\s+/, "");
      continue;
    }

    if (currentQuestion && trimmed.length > 0 && !trimmed.startsWith("---")) {
      currentAnswerLines.push(trimmed.replace(/^[-*]\s+/, ""));
    }
  }

  if (inFaqSection) flushCurrent();
  return items.length > 0 ? items : undefined;
}

function detectCategory(title: string, slug: string): string {
  const text = `${title} ${slug}`.toLowerCase();
  if (
    text.includes("wordpress") ||
    text.includes("wp-") ||
    text.includes("phpmyadmin")
  ) {
    return "WordPress";
  }
  if (
    text.includes("seo") ||
    text.includes("google") ||
    text.includes("cegprofil")
  ) {
    return "SEO & Keresőoptimalizálás";
  }
  if (
    text.includes("ai") ||
    text.includes("promt") ||
    text.includes("prompt") ||
    text.includes("intelligencia")
  ) {
    return "AI Automatizáció";
  }
  if (
    text.includes("marka") ||
    text.includes("grafik") ||
    text.includes("arculat") ||
    text.includes("design") ||
    text.includes("csomagol")
  ) {
    return "Grafikai tervezés";
  }
  if (
    text.includes("woocommerce") ||
    text.includes("webshop") ||
    text.includes("rendeles")
  ) {
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

    const excerpt =
      (data.excerpt as string) || (data.description as string) || "";
    const tldr = (data.tldr as string) || "";
    const category = (data.category as string) || detectCategory(title, slug);
    const readingTime =
      (data.readingTime as string) || calculateReadingTime(content);
    const coverImage =
      (data.coverImage as string) ||
      (data.image as string) ||
      "/assets/banners/webdude-hero.webp";
    const author = (data.author as string) || "Balog Norbert";
    const noindex = Boolean(data.noindex);
    const faq = extractFaqItems(data.faq, content);

    return {
      slug,
      title,
      date: dateStr,
      excerpt,
      tldr,
      content,
      category,
      readingTime,
      coverImage,
      image: coverImage,
      author,
      noindex,
      updatedAt: (data.updatedAt as string) || dateStr,
      faq,
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
    const { getBlogPostsFromFirestore } =
      await import("@/app/actions/blogPosts");
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
          tldr: fp.tldr || "",
          content: fp.content,
          coverImage: fp.coverImage || "/assets/banners/webdude-hero.webp",
          image: fp.coverImage || "/assets/banners/webdude-hero.webp",
          category: fp.category,
          readingTime: fp.readingTime,
          featured: fp.featured,
          noindex: fp.noindex,
          author: fp.author,
          updatedAt: fp.updatedAt || fp.date,
        });
      }
    }
  } catch (err) {
    console.warn(
      "getCombinedBlogPosts: Firestore lekérés sikertelen, lokális MDX cikkek aktívak",
      err
    );
  }

  const all = Array.from(postsMap.values());
  return all.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Egyedi cikk lekérdezése slug alapján: először lokális MDX, majd Firestore fallback.
 */
export async function getPostBySlugCombined(
  slug: string
): Promise<BlogPost | null> {
  // 1. Lokális MDX keresése
  const localPost = getPostBySlug(slug);
  if (localPost) {
    return localPost;
  }

  // 2. Firestore fallback
  try {
    const { getBlogPostsFromFirestore } =
      await import("@/app/actions/blogPosts");
    const firestorePosts = await getBlogPostsFromFirestore();
    const fp = firestorePosts.find((p) => p.slug === slug);
    if (fp) {
      return {
        slug: fp.slug,
        title: fp.title,
        date: fp.date,
        excerpt: fp.excerpt,
        tldr: fp.tldr || "",
        content: fp.content,
        coverImage: fp.coverImage || "/assets/banners/webdude-hero.webp",
        image: fp.coverImage || "/assets/banners/webdude-hero.webp",
        category: fp.category,
        readingTime: fp.readingTime,
        featured: fp.featured,
        noindex: fp.noindex,
        author: fp.author,
        updatedAt: fp.updatedAt || fp.date,
      };
    }
  } catch (err) {
    console.warn(
      `getPostBySlugCombined: Firestore lekérés sikertelen a(z) ${slug} cikkhez`,
      err
    );
  }

  return null;
}

function escapeHtmlAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function formatTableCellInline(cell: string): string {
  return cell
    .trim()
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_m, text, url) => `<a href="${escapeHtmlAttr(url)}">${text}</a>`
    );
}

/**
 * Konvertálja a GFM Markdown pipe táblázatokat (`| ... |`) standard HTML
 * `<table><thead>...</thead><tbody>...</tbody></table>` elemekké, megőrizve
 * a kódblokkok tartalmát (nincs szükség külső remark-gfm pluginra).
 */
export function normalizeMdxTables(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const output: string[] = [];
  let inCodeBlock = false;
  let i = 0;

  const isTableRow = (line: string) => {
    const t = line.trim();
    return t.startsWith("|") && t.endsWith("|") && t.slice(1, -1).includes("|");
  };

  const isSeparatorRow = (line: string) => {
    const t = line.trim();
    if (!t.startsWith("|") || !t.endsWith("|")) return false;
    const cells = t.slice(1, -1).split("|").map((c) => c.trim());
    return cells.length > 0 && cells.every((c) => /^:?-{3,}:?$/.test(c));
  };

  const splitCells = (line: string) =>
    line
      .trim()
      .slice(1, -1)
      .split("|")
      .map((c) => formatTableCellInline(c));

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      output.push(line);
      i++;
      continue;
    }

    if (
      !inCodeBlock &&
      i + 1 < lines.length &&
      isTableRow(lines[i]) &&
      isSeparatorRow(lines[i + 1])
    ) {
      const headers = splitCells(lines[i]);
      i += 2;
      const bodyRows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        bodyRows.push(splitCells(lines[i]));
        i++;
      }

      const theadHtml = `<thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>`;
      const tbodyHtml = `<tbody>${bodyRows
        .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
        .join("")}</tbody>`;
      output.push(`<div className="article-table-wrap"><table>${theadHtml}${tbodyHtml}</table></div>`);
      continue;
    }

    output.push(line);
    i++;
  }

  return output.join("\n");
}
