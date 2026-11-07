import type { Metadata } from "next";
import Hero from "@/components/Hero";
import BlogGrid from "@/components/molecules/BlogGrid";
import { getCombinedBlogPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Szakmai Hírek, SEO és Webfejlesztés Tudásbázis | WebDude",
  description:
    "Gyakorlati esettanulmányok, WordPress fejlesztés, technikai SEO, webshop optimalizálás és AI automatizációs útmutatók Balog Norbert (WebDude) 26 év tapasztalatával.",
  alternates: {
    canonical: "https://webdude.hu/hirek",
  },
  openGraph: {
    title: "Szakmai Hírek, SEO és Webfejlesztés Tudásbázis | WebDude",
    description:
      "Gyakorlati esettanulmányok, WordPress fejlesztés, technikai SEO, webshop optimalizálás és AI automatizációs útmutatók Balog Norbert (WebDude) 26 év tapasztalatával.",
    url: "https://webdude.hu/hirek",
    siteName: "WebDude",
    locale: "hu_HU",
    type: "website",
  },
};

const baseUrl = "https://webdude.hu";

interface BlogPostSchema {
  slug: string;
  title: string;
}

export const revalidate = 3600;

export default async function HirekPage() {
  const posts = await getCombinedBlogPosts();
  const visible = posts.filter((p) => p.noindex !== true);

  const blogPosts = visible.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: post.category || "Webfejlesztés",
    coverImage: post.coverImage || "/assets/banners/webdude-hero.webp",
    readingTime: post.readingTime || "3 perc",
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Főoldal",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hírek",
        item: `${baseUrl}/hirek`,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/hirek#collection`,
    url: `${baseUrl}/hirek`,
    name: "Szakmai Hírek, SEO és Webfejlesztés Tudásbázis | WebDude",
    description:
      "Gyakorlati esettanulmányok, WordPress fejlesztés, technikai SEO, webshop optimalizálás és AI automatizációs útmutatók Balog Norbert (WebDude) 26 év tapasztalatával.",
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "WebDude",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogPosts.map((p: BlogPostSchema, i: number) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${baseUrl}/hirek/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#e2e8f0]">
      {/* Sémák RSC inline scriptként XSS védelemmel */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />

      <Hero
        label="Tudásbázis"
        title={
          <>
            Szakmai{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
              Hírek & Tudásbázis
            </span>
          </>
        }
        subtitle="Gyakorlati esettanulmányok, WordPress fejlesztés, technikai SEO, WooCommerce webshopok és AI automatizáció — valós ügyfélprojektek tapasztalatai alapján."
        fullHeight={false}
        backgroundImage="/assets/banners/banner-webdde-copy-2-1536x857.webp"
      />

      {/* AEO Direct Answer Blokk — a H1 alatt és a cikklista felett */}
      <section className="relative py-12 bg-[#020617] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            WebDude Szakmai Tudásbázis
          </h2>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            <span className="text-[#00B5F1] font-semibold">
              Webfejlesztés, SEO és AI automatizáció:
            </span>{" "}
            Ebben a tudásbázisban Balog Norbert (WebDude) 26 év grafikai és 16
            év webfejlesztői tapasztalatára épülő, gyakorlati útmutatókat,
            WordPress karbantartási megoldásokat, konverzió-fókuszú WooCommerce
            tippeket és AI munkafolyamat-stratégiákat találsz hazai
            vállalkozások számára.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Blog bejegyzések gridje */}
        <BlogGrid posts={blogPosts} />

        {blogPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-sans opacity-50 text-slate-400">
              Jelenleg nincs publikált bejegyzés.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
