import RSS from "rss";
import { posts as fallbackPosts } from "@/data/posts";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  const feed = new RSS({
    title: "WebDude Blog",
    description:
      "Full-stack webfejlesztés, AI workflow és agent rendszerek — egy kézből. 26 év tapasztalat, Next.js 16, React 19, Tailwind v4, Firebase alapú prémium megoldások.",
    feed_url: "https://webdude.hu/rss",
    site_url: "https://webdude.hu",
    image_url: "https://webdude.hu/og/webdude-og.jpg",
    language: "hu",
    copyright: `© ${new Date().getFullYear()} WebDude. Minden jog fenntartva.`,
    pubDate: new Date(),
    ttl: 60,
  });

  let blogPosts: Array<{
    title: string;
    slug: string;
    excerpt: string;
    date: Date;
  }> = [];

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
          title: data.title || "",
          slug,
          excerpt: data.excerpt || "",
          date: data.date ? new Date(data.date) : new Date(),
        });
      });
    }
  } catch (e) {
    console.error("Error reading MDX posts for RSS:", e);
  }

  // Fallback to static posts if filesystem failed
  if (blogPosts.length === 0) {
    blogPosts = fallbackPosts.map((p) => ({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      date: new Date(p.date),
    }));
  }

  // Sort posts by date descending
  blogPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://webdude.hu/hirek/${post.slug}`,
      date: post.date,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
