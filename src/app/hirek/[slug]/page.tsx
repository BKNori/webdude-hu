import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import { getPostBySlug, getAllPostSlugs } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "A cikk nem található | WebDude" };

  const base: Metadata = {
    title: `${post.title} – WebDude Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://webdude.hu/hirek/${slug}` },
    openGraph: {
      title: `${post.title} – WebDude Blog`,
      description: post.excerpt,
      images: post.image ? [{ url: post.image }] : [],
    },
  };

  if (post.noindex === true) {
    return { ...base, robots: { index: false, follow: false } };
  }

  return base;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Hírek", url: "/hirek" },
    { name: post.title, url: `/hirek/${slug}` },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  // Generate structured data — TechArticle séma minden cikknek (WebDude AEO szabvány)
  const baseUrl = "https://webdude.hu";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}${post.image || "/assets/banners/webdude-hero.webp"}`,
    author: {
      "@type": "Person",
      name: "Balog Norbert",
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
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/hirek/${slug}`,
    },
    about: {
      "@type": "Thing",
      articleSection: "Webfejlesztés",
    },
  };

  // Use MDX content from file system
  let processedContent = post.content || "";

  // Add loading/decoding attributes to images inside the content
  processedContent = processedContent.replace(
    /<img /g,
    '<img loading="lazy" decoding="async" '
  );

  if (
    slug ===
    "wordpress-karbantartas-webhely-karbantartas-13-kotelezo-feladat-2023-ban"
  ) {
    // 1. Keywords optimization in headings
    processedContent = processedContent.replaceAll(
      "<h2>Miért olyan fontos a WordPress webhely karbantartása?</h2>",
      "<h2>Miért elengedhetetlen a rendszeres WordPress karbantartás és a weboldal biztonság?</h2>"
    );
    processedContent = processedContent.replaceAll(
      "<h2>WordPress webhely-karbantartási ellenőrzőlista: 13 pont, amelyet követnie kell</h2>",
      "<h2>WordPress karbantartás: 13+1 kritikus feladat az automatizált mentés és biztonság érdekében</h2>"
    );

    // 2. Belső linkelés (Automation points)
    // Point 1 backup
    const backupTarget = "zökkenőmentesen működjön a webhely.";
    const backupReplacement =
      "zökkenőmentesen működjön a webhely. Ha szeretnéd ezt teljesen automatizálni, tekintsd meg a WebDude professzionális <a href='/szolgaltatasok' class='text-[#00B5F1] hover:underline font-bold'>WordPress karbantartási szolgáltatásait</a>.";
    processedContent = processedContent.replace(
      backupTarget,
      backupReplacement
    );

    // Point 2 software updates
    const updateTarget = "webhely jobb biztonságát is biztosítja.";
    const updateReplacement =
      "webhely jobb biztonságát is biztosítja. Ha nem szeretnél manuális frissítésekkel bajlódni, bízd a feladatot a WebDude <a href='/szolgaltatasok' class='text-[#00B5F1] hover:underline font-bold'>automatizált webhely-üzemeltetési és biztonsági audit szolgáltatására</a>.";
    processedContent = processedContent.replace(
      updateTarget,
      updateReplacement
    );

    // 3. AI Chat CTA - Middle (after point 6)
    const targetMiddle =
      "Mindig hosszú és véletlenszerű jelszavakat készítsen.</p>";
    const ctaMiddle = `
<div class="my-10 p-8 rounded-3xl bg-bg-surface border border-[#00B5F1]/20 shadow-2xl relative overflow-hidden group">
  <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#00B5F1]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#00B5F1]/10 transition-colors" />
  <h4 class="text-xl font-bold text-white mb-2">Túl sok a technikai feladat?</h4>
  <p class="text-slate-400 mb-6 text-sm">A weboldal biztonsága és frissítése folyamatos odafigyelést igényel. Ne pazarold az időd bonyolult beállításokra!</p>
  <button 
    onclick="window.dispatchEvent(new CustomEvent('open-webdude-chat', { detail: { initialMessage: 'Szeretnék egy egyedi WordPress karbantartási ütemtervet kérni' } }))"
    class="px-6 py-3 bg-[#00B5F1] hover:bg-[#5B21B6] text-bg-base font-bold rounded-xl transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0, 181, 241,0.2)] hover:scale-102"
  >
    Kérd meg a WebDude AI asszisztensét, hogy készítsen neked egy egyedi karbantartási ütemtervet!
  </button>
</div>`;

    if (processedContent.includes(targetMiddle)) {
      processedContent = processedContent.replace(
        targetMiddle,
        targetMiddle + ctaMiddle
      );
    }

    // 4. AI Chat CTA - End
    const ctaEnd = `
<div class="my-12 p-8 rounded-3xl bg-linear-to-br from-bg-surface to-[#041356]/20 border border-blue-500/30 text-center relative overflow-hidden group">
  <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00B5F1]/5 rounded-full blur-3xl pointer-events-none" />
  <h4 class="text-2xl font-bold text-white mb-3">Szeretnéd teljesen automatizálni a WordPress karbantartást?</h4>
  <p class="text-slate-300 mb-6 max-w-lg mx-auto text-sm">Bízd a biztonsági mentéseket, a WordPress vírusirtást és a rendszeres frissítéseket egy megbízható szakértőre.</p>
  <button 
    onclick="window.dispatchEvent(new CustomEvent('open-webdude-chat', { detail: { initialMessage: 'Szeretnék egy egyedi WordPress karbantartási ütemtervet kérni' } }))"
    class="px-8 py-4 bg-[#00B5F1] hover:bg-[#5B21B6] text-bg-base font-bold rounded-xl transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0, 181, 241,0.3)] hover:scale-105"
  >
    Egyedi karbantartási ütemterv kérése az AI asszisztenstől →
  </button>
</div>`;

    processedContent = processedContent + ctaEnd;
  }

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
      <main className="min-h-screen py-32 bg-bg-base text-text-primary">
        {/* Ambient backgrounds */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00B5F1]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#5B21B6]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link
            href="/hirek"
            className="inline-flex items-center gap-2 text-[#00B5F1] hover:text-cta-hover font-bold mb-10 group transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Vissza a hírekhez
          </Link>

          <article className="space-y-12">
            <header className="space-y-6">
              <div className="inline-block pl-4 relative">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00B5F1]">
                  {new Date(post.date).toLocaleDateString("hu-HU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <div className="absolute left-0 top-0.5 bottom-0.5 w-0.5 bg-[#00B5F1]" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans text-white leading-tight tracking-tight">
                {post.title}
              </h1>
            </header>

            {post.image ? (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-full aspect-video rounded-3xl bg-bg-surface border border-bg-elevated flex items-center justify-center text-7xl opacity-30 shadow-inner">
                📰
              </div>
            )}

            {/* Render MDX content */}
            <div className="prose prose-invert prose-a:text-[#00B5F1] max-w-none mx-auto prose-img:rounded-xl prose-img:w-full prose-img:my-6">
              <MDXRemote source={processedContent} components={mdxComponents} />
            </div>
          </article>

          {/* CTA Card */}
          <section className="mt-24 pt-16 border-t border-bg-elevated/50">
            <div className="bg-bg-surface border border-bg-elevated rounded-3xl p-10 md:p-12 text-center relative overflow-hidden group hover:border-[#00B5F1]/20 transition-all duration-500 shadow-2xl">
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
                className="px-10 py-5 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-bg-base font-bold text-lg rounded-xl inline-block hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0, 181, 241,0.2)]"
              >
                Kérj ajánlatot most!
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
