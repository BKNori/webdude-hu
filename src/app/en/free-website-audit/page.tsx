import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Gauge,
  ListChecks,
  MousePointerClick,
  Video,
} from "lucide-react";
import SubpageHero from "@/components/organisms/SubpageHero";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import Surface from "@/components/atoms/Surface";
import ContactForm from "@/components/molecules/ContactForm";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import { getDictionary } from "@/lib/dictionary";
import {
  CANONICAL_ORGANIZATION_ENTITY,
  CANONICAL_PERSON_ENTITY,
  serializeJsonLd,
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Free 10-Minute Video UX & SEO Website Audit | WebDude",
  description:
    "Instead of a generic PDF report, receive a personalized 10-minute screen-recorded video reviewing your website's top 3 UX, speed, and SEO/AI issues.",
  alternates: {
    canonical: "https://webdude.hu/en/free-website-audit",
    languages: {
      "hu-HU": "https://webdude.hu/ingyenes-weboldal-elemzes",
      "en-US": "https://webdude.hu/en/free-website-audit",
      "x-default": "https://webdude.hu/ingyenes-weboldal-elemzes",
    },
  },
  openGraph: {
    title: "Free 10-Minute Video UX & SEO Website Audit | WebDude",
    description:
      "Personalized 10-minute UX, Core Web Vitals, and SEO/AEO screen-recorded review by Balog Norbert (26+ years design, 16+ years dev) — zero obligation.",
    url: "https://webdude.hu/en/free-website-audit",
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
    title: "Free 10-Minute Video UX & SEO Website Audit | WebDude",
    description:
      "Personalized 10-minute video review covering your website's 3 highest-leverage conversion and SEO/AI improvements.",
    images: ["https://webdude.hu/og/webdude-og.jpg"],
  },
};

const VIDEO_TOPICS = [
  {
    icon: Gauge,
    title: "Speed & Core Web Vitals",
    desc: "I pinpoint the real bottlenecks behind slow TTFB, oversized images, render-blocking scripts, and layout shift (CLS/LCP).",
  },
  {
    icon: Bot,
    title: "Google SEO & AI Search (AEO/GEO)",
    desc: "See how Google, ChatGPT, and Perplexity actually read your site — from Schema.org entities to robots.txt and llms.txt.",
  },
  {
    icon: MousePointerClick,
    title: "UX & Conversion Friction",
    desc: "I walk through your homepage and key funnels as a cold prospect to spot why visitors hesitate instead of requesting a quote.",
  },
  {
    icon: ListChecks,
    title: "Prioritized 3-Step Action Plan",
    desc: "Receive a clear, prioritized punch list your team can execute immediately to lift conversion and search visibility.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Share your URL below",
    desc: "Submit your website address and a one-sentence summary of your primary business goal.",
  },
  {
    step: "02",
    title: "I record your video within 48h",
    desc: "Applying 26+ years of graphic design and 16+ years of web engineering experience, I record a private 10-minute walkthrough.",
  },
  {
    step: "03",
    title: "You decide the next step",
    desc: "Zero pushy sales calls: implement my recommendations internally or ask me for a tailored custom quote.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Why do I offer a free 10-minute personalized video audit?",
    a: "I prefer proving value upfront rather than pitching abstract promises. Watching me review your live site lets you judge my UX, SEO, and engineering clarity firsthand with zero commitment.",
  },
  {
    q: "How fast will I receive the video walkthrough?",
    a: "On business days, I typically send the private video link directly to your inbox within 48 hours.",
  },
  {
    q: "How is this different from automated SEO PDF tools?",
    a: "Automated tools cannot evaluate visual hierarchy, messaging clarity, offer positioning, or buyer friction. I review design, conversion copy, mobile ergonomics, and technical SEO together.",
  },
  {
    q: "Am I obligated to hire you afterward?",
    a: "Not at all. You are free to share the video with your in-house team or request a custom quote from me if you would like hands-on implementation.",
  },
];

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "/en" },
  { name: "Free 10-Minute Video Audit", url: "/en/free-website-audit" },
]);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://webdude.hu/en/free-website-audit#service",
  inLanguage: "en-US",
  name: "Free 10-Minute Personalized Video UX & SEO Website Audit",
  description:
    "Personalized 10-minute screen-recorded UX, Core Web Vitals, technical SEO, and AI readiness (AEO/GEO) audit by Balog Norbert (WebDude).",
  url: "https://webdude.hu/en/free-website-audit",
  provider: CANONICAL_ORGANIZATION_ENTITY,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://webdude.hu/en/free-website-audit#faq",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default async function EnFreeWebsiteAuditPage() {
  const dictionary = await getDictionary("en");

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <SubpageHero
        badge="Free · Personalized · Within 48 Hours"
        title={
          <>
            10-Minute Video{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
              UX &amp; SEO Audit
            </span>
          </>
        }
        subtitle="Instead of a generic automated PDF, receive a personalized 10-minute screen-recorded video covering your website's top 3 conversion, speed, and SEO/AI issues — zero obligation."
        backgroundImage="/assets/banners/hero-seo.webp"
        backgroundAlt="Free 10-minute personalized video UX and SEO audit"
        cta1Text="Request Video Audit ↓"
        cta1Href="#en-video-audit-form"
        cta2Text="10-Sec Automated Check →"
        cta2Href="/en/free-seo-aeo-checker"
      />

      <Surface tone="night-lift" className="py-10">
        <DirectAnswerBlock
          id="en-video-audit-direct-answer"
          badgeLabel="Direct Answer"
          question="What is included in WebDude's free 10-minute video UX & SEO audit?"
          answer="Balog Norbert (WebDude), backed by 26+ years of graphic design and 16+ years of web development experience, personally reviews your Core Web Vitals speed, technical SEO and AI answer-engine (AEO/GEO) setup, and conversion UX — delivering a private 10-minute video within 48 hours with 3 prioritized fixes."
        />
      </Surface>

      <Surface tone="night" aurora className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] inline-flex items-center gap-2">
              <Video className="w-3.5 h-3.5" aria-hidden="true" />
              Practical, Actionable Review
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-[#0F172A] dark:text-white">
              What You Get in the 10-Minute Video
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VIDEO_TOPICS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="luminous-card p-6 space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/12 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 flex items-center justify-center text-[#0369A1] dark:text-[#00B5F1]">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-heading text-[#0F172A] dark:text-white">
                  {title}
                </h3>
                <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Surface>

      <Surface tone="slate-lift" grid className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl sm:text-4xl font-heading text-[#0F172A] dark:text-white text-center">
            How It Works in 3 Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.step} className="luminous-card p-6 space-y-3">
                <span className="font-mono text-sm font-bold text-[#0369A1] dark:text-[#00B5F1] block">
                  {s.step}
                </span>
                <h3 className="text-xl font-heading text-[#0F172A] dark:text-white">
                  {s.title}
                </h3>
                <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Surface>

      <Surface tone="night" aurora className="py-16 md:py-24">
        <div
          id="en-video-audit-form"
          className="max-w-5xl mx-auto px-6 grid lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-5 space-y-6">
            <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] block">
              Request Video Audit
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading text-[#0F172A] dark:text-white">
              Submit Your Website URL
            </h2>
            <p className="text-sm sm:text-base text-[#334155] dark:text-slate-300 leading-relaxed">
              I ({CANONICAL_PERSON_ENTITY.name}, WebDude) personally inspect your
              site and send your private 10-minute video link within 48 hours —
              no strings attached.
            </p>
            <div className="luminous-card p-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
                Want an instant automated score right now?
              </p>
              <Link
                href="/en/free-seo-aeo-checker"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F172A] dark:text-white hover:text-[#0369A1] dark:hover:text-[#00B5F1] transition-colors"
              >
                Run the 10-Point SEO &amp; AI Checker
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm
              dictionary={dictionary.contact}
              initialProjectType="webfejlesztes"
              initialMessage="I would like to request my free 10-minute video UX & SEO audit for my website: https://"
            />
          </div>
        </div>
      </Surface>

      <Surface tone="night-lift" className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-heading text-[#0F172A] dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="luminous-card p-6">
                <summary className="font-semibold text-[#0F172A] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-[#0369A1] dark:text-[#00B5F1]">+</span>
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
