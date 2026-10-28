import type { Metadata } from "next";
import Hero from "@/components/Hero";
import BlogGrid from "@/components/molecules/BlogGrid";
import { getBlogPostsFromFirestore } from "@/app/actions/blogPosts";

export const metadata: Metadata = {
  title: "Szakmai Hírek & Insightok – WebDude Blog",
  description:
    "Régi WordPress-gyökerektől a modern React, HTML és AI megoldásokig — a munkáimhoz kapcsolódó ai-promt.hu ötletek is megtalálhatók.",
  alternates: {
    canonical: "https://webdude.hu/hirek",
  },
};

const baseUrl = "https://webdude.hu";

interface BlogPostSchema {
  slug: string;
  title: string;
}

function buildItemList(posts: BlogPostSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p: BlogPostSchema, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseUrl}/hirek/${p.slug}`,
      name: p.title,
    })),
  };
}

export default async function HirekPage() {
  const posts = await getBlogPostsFromFirestore();
  const visible = posts.filter((p) => p.noindex !== true);

  // Konvertálás BlogGrid kompatibilis típusra
  const blogPosts = visible.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: post.category,
    coverImage: post.coverImage,
    readingTime: post.readingTime,
  }));

  return (
    <div className="min-h-screen bg-[#020617] text-[#e2e8f0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildItemList(blogPosts)).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <Hero
        label="Tudásbázis"
        title={
          <>
            Szakmai{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
              Hírek & Insightok
            </span>
          </>
        }
        subtitle="Régi WordPress-gyökerektől a modern React, HTML és AI megoldásokig — a munkáimhoz kapcsolódó ai-promt.hu ötletek is megtalálhatók."
        fullHeight={true}
        backgroundImage="/assets/banners/banner-webdde-copy-2-1536x857.webp"
      />

      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Blog bejegyzések gridje - Kliens molekula */}
        <BlogGrid posts={blogPosts} />

        {blogPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-sans opacity-50 text-slate-400">
              Jelenleg nincs bejegyzés.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
