import React from "react";
import Link from "next/link";
import {
  FileText,
  Settings,
  Search,
  BarChart3,
  Link2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Hero from "@/components/Hero";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import { withLocale } from "@/lib/i18n";

export const revalidate = 3600;

export default function EnSeoOptimizationPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", url: withLocale("/", "en") },
    { name: "Services", url: withLocale("/szolgaltatasok", "en") },
    { name: "SEO Optimisation", url: withLocale("/szolgaltatasok/seo-optimalizalas", "en") },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO Optimisation",
    description:
      "Technical SEO audit, keyword research, content strategy and local SEO for businesses.",
    provider: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
  };

  const features = [
    {
      title: "On-page SEO",
      description:
        "Meta data, heading structure, URL and content optimisation.",
      icon: FileText,
    },
    {
      title: "Technical SEO",
      description:
        "Speed optimisation, mobile-friendly design and Core Web Vitals improvement.",
      icon: Settings,
    },
    {
      title: "Keyword Research",
      description:
        "Relevant search intent analysis and strategic keyword planning.",
      icon: Search,
    },
    {
      title: "Content Strategy",
      description: "SEO-friendly content design for search engines and visitors.",
      icon: BarChart3,
    },
    {
      title: "Local SEO",
      description:
        "Google Business Profile (GMB) optimisation so locals can find you.",
      icon: Link2,
    },
    {
      title: "Analytics and Reporting",
      description: "Detailed SEO analytics and transparent performance measurement.",
      icon: TrendingUp,
    },
  ];

  const faqs = [
    {
      question: "Why is no one coming to my website?",
      answer:
        "Most websites are not built for user search intent, or have serious technical SEO issues (e.g. poor speed, indexing problems). During the audit, I identify the exact causes.",
    },
    {
      question: "What does the SEO audit include?",
      answer:
        "A more than 40-point technical inspection, keyword and competitor analysis, and content quality assessment. The result is a transparent, prioritised task list that improves your ranking step by step.",
    },
    {
      question: "How long until SEO shows results?",
      answer:
        "Fixing technical issues (e.g. speed, indexing) can show immediate jumps. Content optimisation and building stable new organic traffic typically requires 3-6 months of consistent, deliberate work.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

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
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="bg-slate-950 text-text-primary relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#5B21B6]/5" />

        <div className="relative z-10">
          <Hero
            label="SEO Optimisation"
            title={
              <>
                SEO that brings not just visitors, but{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                  relevant leads
                </span>
              </>
            }
            subtitle="SEO is not just placing a few keywords. I examine your website&apos;s technical state, content structure, search intent and conversion paths, then create a prioritised improvement plan."
            cta1="Free SEO consultation"
            cta1Link="/en#contact"
            cta2="View my work"
            cta2Link="/en#cases"
            fullHeight={false}
          />
        </div>

        {/* Direct Answer Block - AEO optimised "SEO Optimisation Overview" */}
        <section className="relative py-12 bg-bg-base border-y border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
              <span className="text-[#00B5F1] font-semibold">
                WebDude SEO optimisation:
              </span>{" "}
              Technical SEO audit, keyword strategy, content optimisation and
              local SEO for SMEs. 26 years of experience, Google Search Console
              integration, Core Web Vitals improvement and organic traffic growth
              delivered as a remote partner worldwide.
            </p>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                SEO Services for SMEs
              </h2>
              <p className="text-lg text-slate-400">
                Everything in one hand: from technical settings to content strategy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-800 hover:border-[#00B5F1]/40 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-[#00B5F1]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#00B5F1]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Micro-FAQ (AEO) ── */}
        <section className="py-24 bg-slate-900/40 border-t border-slate-800 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions (AEO)
              </h2>
              <p className="text-slate-400">
                Direct answers to the most important SEO questions.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-slate-900/80 border border-white/5 rounded-2xl p-6 hover:border-[#00B5F1]/20 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-[#00B5F1] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 text-center relative z-10">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s examine{" "}
              <span className="text-[#00B5F1] italic">your</span> website too?
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              Request an SEO audit and find out why your website isn&apos;t bringing
              enough leads.
            </p>
            <Link
              href="/en#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-slate-950 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:shadow-[0_8px_32px_rgba(0,181,241,0.35)] transition-all duration-300"
            >
              Contact <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
