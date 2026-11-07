import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, Clock, Calendar, User, Sparkles } from "lucide-react";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import { getCombinedBlogPosts, getPostBySlugCombined } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getCombinedBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugCombined(slug);
  if (!post) return { title: "A cikk nem található | WebDude" };

  const canonicalUrl = `https://webdude.hu/hirek/${slug}`;
  const imageUrl = post.coverImage?.startsWith("http")
    ? post.coverImage
    : `https://webdude.hu${post.coverImage || "/assets/banners/webdude-hero.webp"}`;

  const meta: Metadata = {
    title: `${post.title} | WebDude`,
    description: post.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      title: `${post.title} | WebDude`,
      description: post.excerpt,
      url: canonicalUrl,
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: ["Balog Norbert"],
      images: [{ url: imageUrl, alt: post.title }],
      siteName: "WebDude",
      locale: "hu_HU",
    },
  };

  if (post.noindex === true) {
    return {
      ...meta,
      robots: { index: false, follow: true },
    };
  }

  return meta;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlugCombined(slug);

  if (!post) notFound();

  const canonicalUrl = `https://webdude.hu/hirek/${slug}`;
  const imageUrl = post.coverImage?.startsWith("http")
    ? post.coverImage
    : `https://webdude.hu${post.coverImage || "/assets/banners/webdude-hero.webp"}`;

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Hírek", url: "/hirek" },
    { name: post.title, url: `/hirek/${slug}` },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  // TechArticle séma SEO/AEO/GEO és Tudásgráf integrációhoz
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${canonicalUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: {
      "@type": "Person",
      "@id": "https://webdude.hu/#person",
      name: "Balog Norbert",
      alternateName: ["Balog Norbi", "WebDude"],
      jobTitle: "Full-Stack Webfejlesztő & AI Automatizációs Szakértő",
      url: "https://webdude.hu/szia-norbi-vagyok",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
      logo: {
        "@type": "ImageObject",
        url: "https://webdude.hu/assets/logos/webdude-logo.webp",
      },
    },
    articleSection: post.category || "Webfejlesztés",
    inLanguage: "hu-HU",
  };

  const formattedDate = new Date(post.date).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
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
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="min-h-screen bg-[#020617] text-[#e2e8f0] pt-32 pb-24">
        {/* Háttérfények */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00B5F1]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#5B21B6]/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link
            href="/hirek"
            className="inline-flex items-center gap-2 text-sm text-[#00B5F1] hover:text-sky-300 font-semibold mb-8 group transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Vissza a tudásbázishoz
          </Link>

          <article className="space-y-10">
            {/* Fejléc */}
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                <span className="font-bold uppercase tracking-widest text-[#00B5F1] bg-[#00B5F1]/10 px-3 py-1 rounded-full border border-[#00B5F1]/20">
                  {post.category || "Webfejlesztés"}
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  {formattedDate}
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-4 h-4 text-slate-500" />
                  {post.readingTime || "4 perc"}
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <User className="w-4 h-4 text-slate-500" />
                  {post.author || "Balog Norbert"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                {post.title}
              </h1>

              {/* GEO / AEO TL;DR Direct Answer doboz a keresőmotorok és AI ágensek számára */}
              {post.excerpt && (
                <div className="bg-[#0f172a] border border-[#00B5F1]/30 rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,181,241,0.08)] relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00B5F1] mb-3">
                    <Sparkles className="w-4 h-4 text-[#00B5F1]" />
                    Gyors összefoglaló (TL;DR)
                  </div>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                </div>
              )}
            </header>

            {/* Kiemelt borítókép */}
            {post.coverImage && (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Cikk szövegtartalma */}
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-[#00B5F1] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-ul:text-slate-300 prose-ul:mb-6 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-[#00B5F1] prose-blockquote:bg-slate-900/40 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-slate-300 prose-img:rounded-2xl prose-img:border prose-img:border-slate-800 prose-code:bg-slate-900 prose-code:text-[#00B5F1] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-2xl prose-table:border prose-table:border-slate-800 prose-th:bg-slate-900 prose-th:p-3 prose-td:p-3 prose-td:border-t prose-td:border-slate-800">
              {post.content ? (
                <MDXRemote source={post.content} />
              ) : (
                <p className="text-slate-400">A tartalom hamarosan frissül.</p>
              )}
            </div>
          </article>

          {/* Szerzői E-E-A-T blokk */}
          <section className="mt-16 p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#00B5F1]/40">
              <Image
                src="/assets/personal/webdude-kep.webp"
                alt="Balog Norbert - WebDude"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg font-bold text-white">Balog Norbert</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-950 border border-sky-500/30 text-[#00B5F1] font-semibold">
                  WebDude
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                26 év grafikai tervezési és 16 év webfejlesztői tapasztalattal
                rendelkező szakember. Modern Next.js rendszereket, stabil
                WordPress weboldalakat és AI automatizációkat építek hazai
                vállalkozásoknak.
              </p>
              <Link
                href="/szia-norbi-vagyok"
                className="inline-flex items-center gap-1.5 text-xs text-[#00B5F1] hover:text-sky-300 font-semibold"
              >
                Tudj meg többet rólam és a tapasztalatomról →
              </Link>
            </div>
          </section>

          {/* CRO Konverziós CTA kártya (Zéró Fix Ár szabállyal) */}
          <section className="mt-12">
            <div className="bg-linear-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-[#00B5F1]/40 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden transition-all duration-300 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B5F1]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-xl mx-auto space-y-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Szeretnél hasonló eredményeket a céged weboldalán?
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Legyen szó meglévő oldal gyorsításáról, WordPress
                  karbantartásról, SEO helyezés javításról vagy új weboldalról,
                  közvetlenül velem egyeztetsz, közvetítők nélkül.
                </p>
                <div>
                  <Link
                    href="/kapcsolat"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-cta-from to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-lg shadow-sky-950/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
                  >
                    Egyedi árajánlat kérése
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
