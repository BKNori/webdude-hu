import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Gauge, Video } from "lucide-react";
import SubpageHero from "@/components/organisms/SubpageHero";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import Surface from "@/components/atoms/Surface";
import { EN_INSIGHTS } from "@/data/enInsights";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import {
  CANONICAL_ORGANIZATION_ENTITY,
  CANONICAL_PERSON_ENTITY,
  serializeJsonLd,
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Insights: Technical SEO, GEO, Next.js & Conversion UX | WebDude",
  description:
    "In-depth technical guides by Balog Norbert (26+ years graphic design, 16+ years web engineering) on AI Search (GEO/AEO), Next.js architecture, and ROI.",
  alternates: {
    canonical: "https://webdude.hu/en/insights",
    languages: {
      "hu-HU": "https://webdude.hu/hirek",
      "en-US": "https://webdude.hu/en/insights",
      "x-default": "https://webdude.hu/hirek",
    },
  },
  openGraph: {
    title: "Insights: Technical SEO, GEO, Next.js & Conversion UX | WebDude",
    description:
      "Practical engineering and conversion guides on GEO/AEO AI Search visibility, Next.js vs. WordPress architecture, and working directly with a senior specialist.",
    url: "https://webdude.hu/en/insights",
    siteName: "WebDude",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://webdude.hu/og/webdude-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebDude English Technical Insights Knowledge Base",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights: Technical SEO, GEO, Next.js & Conversion UX | WebDude",
    description:
      "Engineering and conversion insights from Balog Norbert (26+ years graphic design, 16+ years web development).",
    images: ["https://webdude.hu/og/webdude-og.jpg"],
  },
};

const BASE_URL = "https://webdude.hu";

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "/en" },
  { name: "Insights", url: "/en/insights" },
]);

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BASE_URL}/en/insights#collection`,
  inLanguage: "en-US",
  url: `${BASE_URL}/en/insights`,
  name: "Insights: Technical SEO, GEO, Next.js & Conversion UX | WebDude",
  description:
    "Curated English knowledge base by Balog Norbert covering AI Search Optimization (GEO/AEO), Next.js vs. WordPress architecture, and senior full-stack execution.",
  author: CANONICAL_PERSON_ENTITY,
  publisher: CANONICAL_ORGANIZATION_ENTITY,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: EN_INSIGHTS.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${BASE_URL}/en/insights/${post.slug}`,
      name: post.title,
    })),
  },
};

export default function EnInsightsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionSchema) }}
      />

      <SubpageHero
        badge="Knowledge Base · English Guides"
        title={
          <>
            Engineering &amp; Growth{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
              Insights
            </span>
          </>
        }
        subtitle="Practical, field-tested playbooks from Balog Norbert — combining 26+ years of graphic design and 16+ years of web development on AI Search (GEO/AEO), architecture choices, and direct-to-builder ROI."
        backgroundImage="/assets/banners/hero-hirek.webp"
        backgroundAlt="WebDude Engineering and Growth Insights"
        cta1Text="Free SEO & AI Check →"
        cta1Href="/en/free-seo-aeo-checker"
        cta2Text="10-Min Video Audit"
        cta2Href="/en/free-website-audit"
      />

      <Surface tone="night-lift" className="py-10">
        <DirectAnswerBlock
          id="en-insights-direct-answer"
          badgeLabel="Direct Answer"
          question="What topics does the WebDude English Insights knowledge base cover?"
          answer="In this knowledge base, I publish deep technical breakdowns backed by 26+ years of graphic design and 16+ years of full-stack engineering experience: how to earn citations in ChatGPT, Perplexity, and Google AI Overviews (GEO/AEO), when to choose Next.js over WordPress, and why partnering directly with a senior specialist outperforms agency handoffs."
        />
      </Surface>

      <Surface tone="night" aurora className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] inline-flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                Featured Guides
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading text-[#0F172A] dark:text-white">
                Actionable Deep Dives for Decision-Makers
              </h2>
            </div>
            <p className="text-sm text-[#475569] dark:text-slate-300 font-sans">
              Written personally by Balog Norbert · Zero filler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EN_INSIGHTS.map((post) => (
              <article
                key={post.slug}
                className="luminous-card overflow-hidden flex flex-col group transition-transform duration-300 hover:-translate-y-1"
              >
                <Link
                  href={`/en/insights/${post.slug}`}
                  className="block relative aspect-1200/630 w-full overflow-hidden bg-slate-200 dark:bg-slate-900"
                >
                  <ResponsiveImage
                    src={post.coverImage}
                    alt={post.coverAlt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="p-6 flex flex-col flex-1 justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-full bg-[#0369A1]/10 dark:bg-[#00B5F1]/15 text-[#0369A1] dark:text-[#00B5F1] font-semibold">
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#475569] dark:text-slate-300">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {post.readingTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-heading text-[#0F172A] dark:text-white leading-snug">
                      <Link
                        href={`/en/insights/${post.slug}`}
                        className="hover:text-[#0369A1] dark:hover:text-[#00B5F1] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                    <time
                      dateTime={post.date}
                      className="text-xs font-mono text-[#475569] dark:text-slate-300"
                    >
                      {post.date}
                    </time>
                    <Link
                      href={`/en/insights/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1] hover:underline"
                    >
                      Read Guide
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Surface>

      <Surface tone="slate-lift" grid className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="luminous-card p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="eyebrow-badge text-[#6D28D9] dark:text-[#A78BFA]">
                Free Diagnostics Before Any Commitment
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading text-[#0F172A] dark:text-white">
                Test Your Website Yourself or Request My Video Review
              </h2>
              <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                Want immediate automated numbers or my human senior perspective on your UX, Core Web Vitals, and AI search setup? Pick your preferred starting point — tailored custom quotes are always scoped after clarity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/en/free-seo-aeo-checker"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold uppercase tracking-wider text-xs text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] shadow-[0_8px_24px_rgba(7,89,133,0.3)] transition-all"
              >
                <Gauge className="w-4 h-4" aria-hidden="true" />
                Free SEO &amp; AI Checker
              </Link>
              <Link
                href="/en/free-website-audit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold uppercase tracking-wider text-xs text-[#0F172A] dark:text-white border border-slate-300 dark:border-white/25 hover:border-[#0369A1] dark:hover:border-[#00B5F1] bg-white/80 dark:bg-white/5 transition-all"
              >
                <Video className="w-4 h-4" aria-hidden="true" />
                10-Min Video Audit
              </Link>
            </div>
          </div>
        </div>
      </Surface>
    </div>
  );
}
