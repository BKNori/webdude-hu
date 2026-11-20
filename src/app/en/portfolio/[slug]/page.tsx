import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Gauge,
  Layers,
} from "lucide-react";
import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import Surface from "@/components/atoms/Surface";
import { works } from "@/data/works";
import { EN_CASE_STUDIES, getEnCaseStudy } from "@/data/caseStudiesEn";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import {
  CANONICAL_ORGANIZATION_ENTITY,
  CANONICAL_PERSON_ENTITY,
  serializeJsonLd,
} from "@/lib/structuredData";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  const enEntry = getEnCaseStudy(slug);
  if (!work || !enEntry) {
    return { title: "Case Study Not Found | WebDude" };
  }

  const huUrl = `https://webdude.hu/munkak/${slug}`;
  const enUrl = `https://webdude.hu/en/portfolio/${slug}`;
  const coverImage = work.bannerImage || work.image;
  const ogImg = coverImage.startsWith("http")
    ? coverImage
    : `https://webdude.hu${coverImage}`;

  return {
    title: enEntry.seoTitle,
    description: enEntry.seoDescription,
    keywords: work.tags,
    alternates: {
      canonical: enUrl,
      languages: {
        "hu-HU": huUrl,
        "en-US": enUrl,
        "x-default": huUrl,
      },
    },
    openGraph: {
      title: enEntry.seoTitle,
      description: enEntry.seoDescription,
      url: enUrl,
      siteName: "WebDude",
      locale: "en_US",
      type: "article",
      images: [{ url: ogImg, alt: enEntry.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: enEntry.seoTitle,
      description: enEntry.seoDescription,
      images: [ogImg],
    },
  };
}

export default async function EnCaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  const enEntry = getEnCaseStudy(slug);

  if (!work || !enEntry) notFound();

  const coverImage = work.bannerImage || work.image;
  const enUrl = `https://webdude.hu/en/portfolio/${slug}`;
  const absImage = coverImage.startsWith("http")
    ? coverImage
    : `https://webdude.hu${coverImage}`;

  const relatedStudies = works
    .filter((w) => w.slug !== slug && Boolean(EN_CASE_STUDIES[w.slug]))
    .slice(0, 3)
    .map((w) => ({
      slug: w.slug,
      image: w.bannerImage || w.image,
      entry: EN_CASE_STUDIES[w.slug],
    }));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/en" },
    { name: "Portfolio", url: "/en/portfolio" },
    { name: enEntry.title, url: `/en/portfolio/${slug}` },
  ]);

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${enUrl}#case-study`,
    inLanguage: "en-US",
    name: enEntry.title,
    headline: enEntry.title,
    description: enEntry.seoDescription,
    url: enUrl,
    image: absImage,
    datePublished: `${work.year}-01-01`,
    keywords: work.tags.join(", "),
    author: CANONICAL_PERSON_ENTITY,
    creator: CANONICAL_PERSON_ENTITY,
    publisher: CANONICAL_ORGANIZATION_ENTITY,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${enUrl}#faq`,
    mainEntity: enEntry.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      {/* 1. Hero Section with ResponsiveImage + .hero-parallax-img + Dual Theme scrim */}
      <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-white/10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <ResponsiveImage
            src={coverImage}
            alt={enEntry.title}
            sizes="100vw"
            priority
            className="hero-parallax-img w-full h-full object-cover opacity-45 dark:opacity-55"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#F8FAFC]/95 via-[#F8FAFC]/85 to-[#F8FAFC]/65 dark:from-[#0B1120]/95 dark:via-[#0B1120]/82 dark:to-[#0B1120]/60" />
          <div className="absolute inset-0 bg-linear-to-t from-[#F8FAFC] via-transparent to-transparent dark:from-[#0B1120]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-6">
          <Link
            href="/en/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Back to Portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow-badge px-3 py-1 rounded-full bg-white/90 dark:bg-white/10 border border-slate-200 dark:border-white/15 text-[#0369A1] dark:text-[#00B5F1]">
              {enEntry.category}
            </span>
            <span className="font-mono text-xs text-[#475569] dark:text-slate-300">
              {work.client} · {work.year}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading leading-tight text-[#0F172A] dark:text-white max-w-4xl text-balance">
            {enEntry.title}
          </h1>

          <p className="text-lg md:text-xl text-[#334155] dark:text-slate-200 max-w-3xl leading-relaxed">
            {enEntry.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold uppercase tracking-wider text-sm text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] shadow-[0_8px_24px_rgba(7,89,133,0.35)] transition-all"
            >
              Request a custom quote
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            {work.website && (
              <a
                href={work.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-[#0F172A] dark:text-slate-200 bg-white/90 dark:bg-white/5 border border-slate-300 dark:border-white/15 hover:border-[#0369A1] dark:hover:border-[#00B5F1] transition-colors"
              >
                Visit Live Project
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 2. AEO Direct Answer */}
      <Surface tone="night-lift" className="py-10">
        <DirectAnswerBlock
          id={`en-case-study-da-${slug}`}
          badgeLabel="Direct Answer"
          question={`What did I build and achieve for ${work.client}?`}
          answer={enEntry.directAnswer}
        />
      </Surface>

      {/* 3. Metrics + Challenge & Strategy + Deliverables + Tech Stack */}
      <Surface tone="night" aurora className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {enEntry.metrics.map((m) => (
              <div key={m.label} className="luminous-card p-6">
                <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] block mb-2">
                  {m.label}
                </span>
                <p className="text-xl sm:text-2xl font-heading text-[#0F172A] dark:text-white">
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="luminous-card p-8 space-y-4">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white">
                The Challenge
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed">
                {enEntry.challenge}
              </p>
            </div>

            <div className="luminous-card p-8 space-y-4">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white">
                Strategy & Architecture
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed">
                {enEntry.solution}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 luminous-card p-8 space-y-5">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white">
                Key Deliverables & Outcomes
              </h2>
              <ul className="space-y-3">
                {enEntry.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-[#334155] dark:text-slate-200"
                  >
                    <CheckCircle2
                      className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 luminous-card p-8 space-y-5">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white flex items-center gap-2">
                <Layers
                  className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]"
                  aria-hidden="true"
                />
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#F8FAFC] dark:bg-[#0B1120] border border-slate-200 dark:border-white/15 text-[#334155] dark:text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#475569] dark:text-slate-400 pt-2 leading-relaxed">
                Built directly by Balog Norbert (26+ years of graphic design,
                16+ years of web development experience) on a custom-quote basis.
              </p>
            </div>
          </div>
        </div>
      </Surface>

      {/* 4. Project FAQ */}
      <Surface tone="night-lift" className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-heading text-[#0F172A] dark:text-white text-center">
            Project FAQ
          </h2>
          <div className="space-y-4">
            {enEntry.faq.map((item) => (
              <details key={item.question} className="luminous-card p-6">
                <summary className="font-semibold text-[#0F172A] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{item.question}</span>
                  <span className="text-[#0369A1] dark:text-[#00B5F1]">+</span>
                </summary>
                <p className="mt-3 text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Surface>

      {/* 5. CTA + Related Case Studies */}
      <Surface tone="night" aurora className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-14">
          <div className="luminous-card p-8 md:p-10 text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-heading text-[#0F172A] dark:text-white">
              Ready to Build Results Like This for Your Business?
            </h2>
            <p className="text-sm sm:text-base text-[#334155] dark:text-slate-300 max-w-2xl mx-auto">
              Request a tailored project quote directly from me, or benchmark
              your existing website in seconds using my free diagnostic tool.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold uppercase tracking-wider text-sm text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] shadow-[0_8px_24px_rgba(7,89,133,0.35)] transition-all"
              >
                Request a custom quote
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/en/free-seo-aeo-checker"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-[#0369A1] dark:text-[#00B5F1] bg-white dark:bg-[#16223B]/80 border border-slate-300 dark:border-white/15 hover:border-[#0369A1] dark:hover:border-[#00B5F1] transition-colors"
              >
                <Gauge className="w-4 h-4" aria-hidden="true" />
                Free SEO &amp; AI Readiness Checker
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-heading text-[#0F172A] dark:text-white">
                Related Case Studies
              </h2>
              <Link
                href="/en/portfolio"
                className="text-xs font-semibold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1] hover:underline"
              >
                All Case Studies →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedStudies.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/en/portfolio/${rel.slug}`}
                  className="luminous-card p-6 flex flex-col justify-between gap-4 group hover:border-[#0369A1]/50 dark:hover:border-[#00B5F1]/50 transition-colors"
                >
                  <div className="space-y-2">
                    <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] block">
                      {rel.entry.category}
                    </span>
                    <h3 className="text-lg font-heading text-[#0F172A] dark:text-white group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1] transition-colors">
                      {rel.entry.title}
                    </h3>
                    <p className="text-xs text-[#475569] dark:text-slate-300 line-clamp-3">
                      {rel.entry.seoDescription}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#0369A1] dark:text-[#00B5F1] inline-flex items-center gap-1">
                    View Case Study
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Surface>
    </div>
  );
}
