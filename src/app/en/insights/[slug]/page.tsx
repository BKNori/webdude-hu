import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  UserCheck,
  Video,
} from "lucide-react";
import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import SeoQuickCheckBanner from "@/components/molecules/SeoQuickCheckBanner";
import Surface from "@/components/atoms/Surface";
import { EN_INSIGHTS, getEnInsightBySlug } from "@/data/enInsights";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import {
  CANONICAL_ORGANIZATION_ENTITY,
  CANONICAL_PERSON_ENTITY,
  serializeJsonLd,
} from "@/lib/structuredData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = "https://webdude.hu";

export async function generateStaticParams() {
  return EN_INSIGHTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getEnInsightBySlug(slug);

  if (!post) {
    return { title: "Guide Not Found | WebDude" };
  }

  const canonicalUrl = `${BASE_URL}/en/insights/${post.slug}`;
  const ogImage = `${BASE_URL}${post.coverImage}`;

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: canonicalUrl,
      siteName: "WebDude",
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: ["Balog Norbert"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [ogImage],
    },
  };
}

export default async function EnInsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getEnInsightBySlug(slug);

  if (!post) notFound();

  const canonicalUrl = `${BASE_URL}/en/insights/${post.slug}`;
  const ogImage = `${BASE_URL}${post.coverImage}`;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/en" },
    { name: "Insights", url: "/en/insights" },
    { name: post.title, url: `/en/insights/${post.slug}` },
  ]);

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${canonicalUrl}#article`,
    inLanguage: "en-US",
    headline: post.title,
    description: post.seoDescription,
    image: ogImage,
    datePublished: post.date,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: CANONICAL_PERSON_ENTITY,
    publisher: CANONICAL_ORGANIZATION_ENTITY,
    keywords: post.keywords.join(", "),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#faq`,
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <Surface tone="night" aurora className="pt-32 pb-12 md:pt-36 md:pb-16 border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <Link
            href="/en/insights"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Back to All Insights
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[#0369A1]/10 dark:bg-[#00B5F1]/15 text-[#0369A1] dark:text-[#00B5F1] font-semibold">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#475569] dark:text-slate-300">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                {post.readingTime}
              </span>
              <span className="text-[#475569] dark:text-slate-300">
                Updated{" "}
                <time dateTime={post.updatedAt}>{post.updatedAt}</time>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading text-[#0F172A] dark:text-white leading-[1.08]">
              {post.title}
            </h1>

            <p className="text-sm text-[#334155] dark:text-slate-300 inline-flex items-center gap-2">
              <UserCheck
                className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1] shrink-0"
                aria-hidden="true"
              />
              <span>
                By{" "}
                <strong className="font-semibold text-[#0F172A] dark:text-white">
                  Balog Norbert
                </strong>{" "}
                (WebDude · 26+ years graphic design, 16+ years web development)
              </span>
            </p>
          </div>

          <div className="relative aspect-1200/630 w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-lg">
            <ResponsiveImage
              src={post.coverImage}
              alt={post.coverAlt}
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>
      </Surface>

      <Surface tone="night-lift" className="py-12 md:py-16">
        <article className="max-w-4xl mx-auto px-6 space-y-12">
          <DirectAnswerBlock
            id={`insight-tldr-${post.slug}`}
            badgeLabel="Quick Summary (TL;DR)"
            question={post.title}
            answer={post.tldr}
          />

          <div className="space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-heading text-[#0F172A] dark:text-white">
                  {section.heading}
                </h2>

                {section.paragraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-base text-[#334155] dark:text-slate-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.table && (
                  <div className="overflow-x-auto my-6 rounded-2xl border border-slate-200 dark:border-white/15 bg-white/80 dark:bg-[#111C33]/80">
                    <table className="w-full text-left border-collapse text-sm">
                      {section.table.caption && (
                        <caption className="sr-only">
                          {section.table.caption}
                        </caption>
                      )}
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-white/15 bg-[#EAF1FA]/80 dark:bg-white/5">
                          {section.table.headers.map((header) => (
                            <th
                              key={header}
                              scope="col"
                              className="px-4 py-3 font-semibold text-[#0F172A] dark:text-white"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rowIdx) => (
                          <tr
                            key={rowIdx}
                            className="border-b last:border-b-0 border-slate-200/80 dark:border-white/10"
                          >
                            {row.map((cell, cellIdx) => (
                              <td
                                key={cellIdx}
                                className={
                                  cellIdx === 0
                                    ? "px-4 py-3 font-semibold text-[#0F172A] dark:text-white align-top"
                                    : "px-4 py-3 text-[#334155] dark:text-slate-300 align-top leading-relaxed"
                                }
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            <section className="luminous-card p-6 sm:p-8 space-y-4">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white">
                {post.checklistTitle}
              </h2>
              <ul className="space-y-3">
                {post.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm sm:text-base text-[#334155] dark:text-slate-300"
                  >
                    <CheckCircle2
                      className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="faq-heading"
              className="space-y-5 pt-4 border-t border-slate-200 dark:border-white/10"
            >
              <div className="flex items-center gap-2">
                <HelpCircle
                  className="w-5 h-5 text-[#6D28D9] dark:text-[#A78BFA]"
                  aria-hidden="true"
                />
                <h2
                  id="faq-heading"
                  className="text-2xl sm:text-3xl font-heading text-[#0F172A] dark:text-white"
                >
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {post.faq.map((item) => (
                  <div key={item.q} className="luminous-card p-5 sm:p-6 space-y-2">
                    <h3 className="text-lg font-heading text-[#0F172A] dark:text-white">
                      {item.q}
                    </h3>
                    <p className="text-sm sm:text-base text-[#334155] dark:text-slate-300 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <SeoQuickCheckBanner locale="en" />

          <div className="luminous-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-[#6D28D9]/25 dark:border-[#A78BFA]/25">
            <div className="space-y-2 max-w-xl">
              <span className="eyebrow-badge text-[#6D28D9] dark:text-[#A78BFA]">
                Want My Personal Eyes on Your Site?
              </span>
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white">
                Request a Free 10-Minute Video UX &amp; SEO Audit
              </h2>
              <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                Send your URL and I will record a private 10-minute video pointing out your top 3 speed, messaging, and AI-search improvements within 48 hours — or request a custom quote directly.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/en/free-website-audit"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold uppercase tracking-wider text-xs sm:text-sm text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] shadow-[0_8px_24px_rgba(7,89,133,0.3)] transition-all"
              >
                <Video className="w-4 h-4" aria-hidden="true" />
                Request Free Video Audit
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
            <h2 className="text-xl font-heading text-[#0F172A] dark:text-white">
              Related Resources &amp; Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {post.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="luminous-card p-5 space-y-2 hover:border-[#0369A1]/40 dark:hover:border-[#00B5F1]/40 transition-colors"
                >
                  <h3 className="text-base font-heading text-[#0369A1] dark:text-[#00B5F1]">
                    {link.label} →
                  </h3>
                  <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        </article>
      </Surface>
    </div>
  );
}
