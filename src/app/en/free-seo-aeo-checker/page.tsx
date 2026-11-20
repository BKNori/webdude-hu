import type { Metadata } from "next";
import SubpageHero from "@/components/organisms/SubpageHero";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import SeoQuickCheckTool from "@/components/organisms/SeoQuickCheckTool";
import Surface from "@/components/atoms/Surface";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import {
  CANONICAL_ORGANIZATION_ENTITY,
  CANONICAL_PERSON_ENTITY,
  serializeJsonLd,
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title:
    "Free Website SEO & AI Readiness (AEO/GEO) Quick Checker | WebDude",
  description:
    "Instant 10-point SEO, Schema.org AEO, and AI search engine readiness (llms.txt, GPTBot, PerplexityBot) audit scored on a 0–100 scale.",
  alternates: {
    canonical: "https://webdude.hu/en/free-seo-aeo-checker",
    languages: {
      "hu-HU": "https://webdude.hu/ingyenes-seo-aeo-elemzes",
      "en-US": "https://webdude.hu/en/free-seo-aeo-checker",
      "x-default": "https://webdude.hu/ingyenes-seo-aeo-elemzes",
    },
  },
  openGraph: {
    title:
      "Free Website SEO & AI Readiness (AEO/GEO) Quick Checker | WebDude",
    description:
      "Check in seconds how well Google, ChatGPT, and Perplexity can crawl, understand, and cite your website.",
    url: "https://webdude.hu/en/free-seo-aeo-checker",
    siteName: "WebDude",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://webdude.hu/og/webdude-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website SEO & AI Readiness (AEO/GEO) Checker | WebDude",
    description:
      "Deterministic 10-point technical SEO, JSON-LD knowledge graph, and AI bot readiness audit.",
    images: ["https://webdude.hu/og/webdude-og.jpg"],
  },
};

const FAQ_ITEMS = [
  {
    q: "What does the Free SEO & AI Readiness (AEO/GEO) Checker inspect?",
    a: "I evaluate 10 high-impact signals: HTTPS and server TTFB speed, title and meta description length, single H1 hierarchy, canonical tag, OpenGraph and mobile viewport tags, JSON-LD structured data, rich AEO entity graphs, AI crawler permissions in robots.txt, and /llms.txt availability.",
  },
  {
    q: "Is this diagnostic tool free and safe to run?",
    a: "Yes — it requires zero registration and reads only publicly accessible HTML headers, robots.txt, and llms.txt with strict timeout and response-size safeguards.",
  },
  {
    q: "Why do llms.txt and AI crawler rules matter for business leads?",
    a: "Answer engines such as ChatGPT, Perplexity, and Claude rely on clean server HTML, structured Schema.org entities, and llms.txt context to recommend trusted specialists — blocking bots or shipping empty shells costs high-intent citations.",
  },
  {
    q: "What happens if I request the free 10-minute video UX & SEO audit?",
    a: "Drawing on 26+ years of graphic design and 16+ years of web development experience, I will personally review your website and send you a focused video breakdown highlighting your highest-leverage fixes — with zero obligation.",
  },
];

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "/en" },
  { name: "Free SEO & AEO Checker", url: "/en/free-seo-aeo-checker" },
]);

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://webdude.hu/en/free-seo-aeo-checker#app",
  name: "WebDude Free SEO & AI Readiness (AEO/GEO) Checker",
  description:
    "Deterministic 10-point website technical SEO, Schema.org AEO, robots.txt AI-bot, and llms.txt quick analyzer scored 0–100.",
  url: "https://webdude.hu/en/free-seo-aeo-checker",
  applicationCategory: "SEO & DeveloperApplication",
  operatingSystem: "Any (Web Browser)",
  inLanguage: "en-US",
  author: CANONICAL_PERSON_ENTITY,
  provider: CANONICAL_ORGANIZATION_ENTITY,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://webdude.hu/en/free-seo-aeo-checker#faq",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function EnFreeSeoAeoCheckerPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <SubpageHero
        badge="Free SEO & AEO / GEO Diagnostic"
        title={
          <>
            How Ready Is Your Website for Google and{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
              AI Answer Engines?
            </span>
          </>
        }
        subtitle="Enter your domain for an instant 10-point score (0–100) evaluating technical SEO, Schema.org knowledge graph depth, AI crawler permissions, and llms.txt."
        backgroundImage="/assets/banners/hero-seo.webp"
        backgroundAlt="Free SEO and AI Readiness Checker tool"
      />

      <Surface tone="night-lift" className="py-10">
        <DirectAnswerBlock
          id="en-seo-quick-check-direct-answer"
          badgeLabel="Direct Answer"
          question="How can you quickly check if a website is optimized for Google SEO and AI answer engines?"
          answer="The WebDude Free Quick Checker inspects 10 objective technical signals from live HTML, robots.txt, and /llms.txt — including HTTPS speed, metadata, H1 structure, canonical URL, OpenGraph, Schema.org entities, and AI bot access — producing an actionable 0–100 score in seconds."
        />
      </Surface>

      <Surface tone="night" aurora className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <SeoQuickCheckTool locale="en" />
        </div>
      </Surface>

      <Surface tone="night-lift" className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-heading text-[#0F172A] dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="luminous-card p-6 group">
                <summary className="font-semibold text-[#0F172A] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-[#0369A1] dark:text-[#00B5F1] text-lg leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Surface>
    </div>
  );
}
