import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, Clock, Calendar, User, Sparkles } from "lucide-react";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import { getCombinedBlogPosts, getPostBySlugCombined, normalizeMdxTables } from "@/lib/mdx";
import {
  CANONICAL_ORGANIZATION_ENTITY,
  CANONICAL_PERSON_ENTITY,
  serializeJsonLd,
} from "@/lib/structuredData";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MDXComponents";

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
  const description =
    post.excerpt ||
    post.tldr ||
    `${post.title} — Balog Norbert (WebDude) szakmai cikke.`;
  const imageUrl = post.coverImage?.startsWith("http")
    ? post.coverImage
    : `https://webdude.hu${post.coverImage || "/assets/banners/webdude-hero.webp"}`;

  const meta: Metadata = {
    title: `${post.title} | WebDude`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      title: `${post.title} | WebDude`,
      description,
      url: canonicalUrl,
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: ["Balog Norbert"],
      images: [{ url: imageUrl, alt: post.title }],
      siteName: "WebDude",
      locale: "hu_HU",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | WebDude`,
      description,
      images: [imageUrl],
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
  const description =
    post.excerpt ||
    post.tldr ||
    `${post.title} — Balog Norbert (WebDude) szakmai cikke.`;
  const imageUrl = post.coverImage?.startsWith("http")
    ? post.coverImage
    : `https://webdude.hu${post.coverImage || "/assets/banners/webdude-hero.webp"}`;

  const wordCount = post.content
    ? post.content.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const articleCategory = post.category || "Webfejlesztés";
  const articleKeywords = Array.from(
    new Set([articleCategory, "WebDude", "Balog Norbert", "SEO", "Webfejlesztés"])
  );

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Hírek", url: "/hirek" },
    { name: post.title, url: `/hirek/${slug}` },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  // TechArticle séma SEO/AEO/GEO és Tudásgráf integrációhoz (SSOT entitás horgonyokkal)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${canonicalUrl}#article`,
    url: canonicalUrl,
    headline: post.title,
    description,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: CANONICAL_PERSON_ENTITY,
    publisher: CANONICAL_ORGANIZATION_ENTITY,
    articleSection: articleCategory,
    keywords: articleKeywords,
    ...(wordCount > 0 ? { wordCount } : {}),
    inLanguage: "hu-HU",
  };

  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

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
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(articleSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(faqSchema),
          }}
        />
      )}

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#e2e8f0] pt-32 pb-24">
        {/* Háttérfények */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0369A1]/5 dark:bg-[#00B5F1]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#6D28D9]/5 dark:bg-[#5B21B6]/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link
            href="/hirek"
            className="inline-flex items-center gap-2 text-sm text-[#0369A1] dark:text-[#00B5F1] hover:text-[#6D28D9] dark:hover:text-sky-300 font-semibold mb-8 group transition-colors"
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
                <span className="font-bold uppercase tracking-widest text-[#0369A1] dark:text-[#00B5F1] bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 px-3 py-1 rounded-full border border-[#0369A1]/25 dark:border-[#00B5F1]/20">
                  {post.category || "Webfejlesztés"}
                </span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="flex items-center gap-1.5 text-[#475569] dark:text-slate-400">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  {formattedDate}
                </span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="flex items-center gap-1.5 text-[#475569] dark:text-slate-400">
                  <Clock className="w-4 h-4 text-slate-500" />
                  {post.readingTime || "4 perc"}
                </span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="flex items-center gap-1.5 text-[#475569] dark:text-slate-400">
                  <User className="w-4 h-4 text-slate-500" />
                  {post.author || "Balog Norbert"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white leading-tight tracking-tight">
                {post.title}
              </h1>

              {/* GEO / AEO TL;DR Direct Answer doboz a keresőmotorok és AI ágensek számára */}
              {(post.tldr || post.excerpt) && (
                <div className="bg-sky-50/70 dark:bg-[#16223B]/90 border border-sky-200/80 dark:border-[#00B5F1]/25 rounded-2xl p-6 mb-10 shadow-[0_8px_24px_rgba(3,105,161,0.06)] dark:shadow-[0_4px_24px_rgba(0,181,241,0.08)] relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1] mb-3">
                    <Sparkles className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                    Gyors összefoglaló (TL;DR)
                  </div>
                  <p className="text-base sm:text-lg text-[#1E293B] dark:text-slate-200 leading-relaxed font-medium">
                    {post.tldr || post.excerpt}
                  </p>
                </div>
              )}
            </header>

            {/* Kiemelt borítókép */}
            {post.coverImage && (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-slate-900">
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

            {/* Cikk szövegtartalma — prémium editorial tipográfia (70ch) */}
            <div className="article-prose max-w-[70ch] mx-auto">
              {post.content ? (
                <MDXRemote
                  source={normalizeMdxTables(post.content)}
                  components={mdxComponents}
                />
              ) : (
                <p className="text-[#475569] dark:text-slate-400">
                  A tartalom hamarosan frissül.
                </p>
              )}
            </div>
          </article>

          {/* Szerzői E-E-A-T blokk */}
          <section className="mt-16 p-8 rounded-3xl luminous-card flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#0369A1]/40 dark:border-[#00B5F1]/40">
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
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">Balog Norbert</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0369A1]/10 dark:bg-sky-950 border border-[#0369A1]/25 dark:border-sky-500/30 text-[#0369A1] dark:text-[#00B5F1] font-semibold">
                  WebDude
                </span>
              </div>
              <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                26 év grafikai tervezési és 16 év webfejlesztői tapasztalattal
                rendelkező szakember. Modern Next.js rendszereket, stabil
                WordPress weboldalakat és AI automatizációkat építek hazai
                vállalkozásoknak.
              </p>
              <Link
                href="/szia-norbi-vagyok"
                className="inline-flex items-center gap-1.5 text-xs text-[#0369A1] dark:text-[#00B5F1] hover:text-[#6D28D9] dark:hover:text-sky-300 font-semibold"
              >
                Tudj meg többet rólam és a tapasztalatomról →
              </Link>
            </div>
          </section>

          {/* CRO Konverziós CTA kártya (Zéró Fix Ár szabállyal) */}
          <section className="mt-12">
            <div className="luminous-card p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-xl mx-auto space-y-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white">
                  Szeretnél hasonló eredményeket a céged weboldalán?
                </h2>
                <p className="text-[#334155] dark:text-slate-300 text-sm sm:text-base leading-relaxed">
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
