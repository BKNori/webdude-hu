import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import { getBlogPostsFromFirestore, FirestoreBlogPostType } from "@/app/actions/blogPosts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPostsFromFirestore();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const allPosts = await getBlogPostsFromFirestore();
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return { title: "A cikk nem található | WebDude" };

  const base: Metadata = {
    title: `${post.title} – WebDude Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://webdude.hu/hirek/${slug}` },
    openGraph: {
      title: `${post.title} – WebDude Blog`,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };

  if (post.noindex === true) {
    return { ...base, robots: { index: false, follow: false } };
  }

  return base;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const allPosts = await getBlogPostsFromFirestore();
  const post: FirestoreBlogPostType | undefined = allPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Hírek", url: "/hirek" },
    { name: post.title, url: `/hirek/${slug}` },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  // BlogPosting JSON-LD séma SEO/AEO-hez (WebDude AEO szabvány)
  const baseUrl = "https://webdude.hu";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}${post.coverImage || "/assets/banners/webdude-hero.webp"}`,
    author: {
      "@type": "Person",
      name: post.author || "Norbi",
      url: "https://webdude.hu/szia-norbi-vagyok",
      jobTitle: "Webfejlesztő & AI Automatizációs Szakértő",
      description:
        "26 év grafikai és 16 év webfejlesztői (WordPress, Next.js) tapasztalattal rendelkező digitális szakember. Kecskemét.",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/logos/webdude-logo.webp`,
      },
    },
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/hirek/${slug}`,
    },
    articleSection: post.category,
  };

  const formattedDate = new Date(post.date).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="min-h-screen bg-[#020617] text-[#e2e8f0]">
        {/* Ambient backgrounds */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00B5F1]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#5B21B6]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link
            href="/hirek"
            className="inline-flex items-center gap-2 text-[#00B5F1] hover:text-sky-400 font-bold mb-10 group transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Vissza a hírekhez
          </Link>

          <article className="space-y-12">
            <header className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00B5F1]">
                  {post.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#00B5F1]" />
                <span className="text-xs text-slate-500">
                  {formattedDate} · {post.readingTime}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight tracking-tight">
                {post.title}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>
            </header>

            {post.coverImage ? (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-full aspect-video rounded-3xl bg-[#0f172a] border border-[#1e293b] flex items-center justify-center text-7xl opacity-30 shadow-inner">
                📰
              </div>
            )}

            {/* Cikk tartalom - prémium tipográfiával */}
            <div className="prose prose-invert prose-a:text-[#00B5F1] prose-h:text-white prose-h:font-bold prose-h:tracking-tight prose-h:mb-6 prose-h:mt-10 prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-slate-300 prose-ul:mb-6 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-[#00B5F1] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-400 max-w-none mx-auto prose-img:rounded-xl prose-img:w-full prose-img:my-6 prose-code:bg-[#0f172a] prose-code:text-[#00B5F1] prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-pre:bg-[#0f172a] prose-pre:p-6 prose-pre:rounded-xl prose-pre:mb-6 prose-pre:border border-[#1e293b]/50">
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />
            </div>
          </article>

          {/* CTA Card */}
          <section className="mt-24 pt-16 border-t border-[#1e293b]/50">
            <div className="bg-[#0f172a] border border-[#1e293b] rounded-3xl p-10 md:p-12 text-center relative overflow-hidden group hover:border-[#00B5F1]/20 transition-all duration-500 shadow-2xl">
              {/* Small card background glow */}
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#00B5F1]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00B5F1]/20 transition-colors" />

              <h2 className="text-3xl font-bold mb-4 text-white">
                Érdekesnek találtad?
              </h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Segítek neked is megvalósítani hasonló digitális megoldásokat,
                legyen szó weboldalról, arculatról vagy automatizációról.
              </p>
              <Link
                href="/kapcsolat"
                className="px-10 py-5 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-white font-bold text-lg rounded-xl inline-block hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,181,241,0.2)]"
              >
                Kérj ajánlatot most!
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
