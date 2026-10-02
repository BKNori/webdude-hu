import React from "react";
import Link from "next/link";
import { Search, Code, PenTool, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import { withLocale } from "@/lib/i18n";

export const revalidate = 3600;

export default function EnWebDevelopmentPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", url: withLocale("/", "en") },
    { name: "Services", url: withLocale("/szolgaltatasok", "en") },
    { name: "Web Development", url: withLocale("/szolgaltatasok/weboldal-keszites", "en") },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Development",
    description:
      "Fast, modern and search-friendly website development for SMEs.",
    provider: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
  };

  const faqs = [
    {
      question: "How long does it take to build a new website?",
      answer:
        "On average 2-4 weeks depending on project complexity. This includes design, custom branding, development and SEO optimisation.",
    },
    {
      question: "Do you use templates or custom development?",
      answer:
        "I deliver exclusively custom-designed and developed (Next.js or premium WordPress) websites. Instead of templates, I provide clean code solutions tailored to your business goals.",
    },
    {
      question: "Can I edit the content myself later?",
      answer:
        "Yes. If the site is WordPress-based, you get an extremely easy-to-use admin interface. If Next.js / headless CMS (e.g. Sanity) based, I also provide an intuitive editor with training.",
    },
    {
      question: "Will it look good on mobile?",
      answer:
        "Naturally. Every website I develop is responsive ('Mobile-First'), providing a perfect user experience on phones, tablets and desktops.",
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
            label="Web Development"
            title={
              <>
                Web development that{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                  brings clients
                </span>
              </>
            }
            subtitle="I build websites that not only showcase your business but help generate leads, build trust and convert visitors into customers."
            cta1="Request a custom quote"
            cta1Link="/en#contact"
            cta2="View my work"
            cta2Link="/en#cases"
            fullHeight={false}
          />
        </div>

        {/* Direct Answer Block - AEO optimised "Web Development Overview" */}
        <section className="relative py-12 bg-bg-base border-y border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
              <span className="text-[#00B5F1] font-semibold">
                WebDude web development:
              </span>{" "}
              Custom, responsive websites for SMEs — Next.js, WordPress,
              WooCommerce and custom development. 26 years of experience, fast
              loading, SEO-optimised and conversion-focused design delivered as a
              remote partner worldwide.
            </p>
          </div>
        </section>

        {/* ── E-E-A-T Bento Grid ── */}
        <section className="py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Why choose me for development?
              </h2>
              <p className="text-slate-400 text-lg">
                26 years of graphic design and 16 years of web development
                experience (Balog Norbert). Code, design and marketing in one hand.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/50 transition-all duration-300">
                <Code className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Clean, modern code
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  No unnecessary bloatware. I work on Next.js 16 or optimised
                  WordPress foundations, ensuring speed and future-proofing.
                </p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#5B21B6]/80 transition-all duration-300">
                <PenTool className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Custom-designed UI/UX
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  No dozen templates. With 26 years of visual experience, every
                  website gets pixel-perfect, brand-consistent and
                  conversion-optimised design.
                </p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/50 transition-all duration-300">
                <Search className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Built-in SEO (AEO)
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The site is search-friendly from day one. Structured data
                  (JSON-LD), fast loading and technical SEO are part of the base
                  package.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Service Options (No Fixed Prices) ── */}
        <section className="py-24 bg-slate-900/40 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Web Development Options
              </h2>
              <p className="text-slate-400 text-lg">
                Choose the service package that fits your business size and goals.
                Every project is unique, so pricing is custom-tailored.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-8 hover:border-[#00B5F1]/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Introduction / Landing
                </h3>
                <p className="text-slate-400 mb-6">
                  Single-page (One-pager) or smaller intro website for businesses with
                  professional appearance and SEO basics.
                </p>
                <ul className="text-slate-300 mb-8 space-y-2">
                  <li>• Custom, clean design</li>
                  <li>• Mobile-friendly (responsive)</li>
                  <li>• Basic SEO settings (meta, sitemap)</li>
                  <li>• Contact form and GDPR</li>
                  <li>• Extremely fast loading</li>
                  <li>• Image and content optimisation</li>
                </ul>
                <Link
                  href="/en#contact"
                  className="inline-flex items-center gap-2 text-[#00B5F1] font-semibold hover:text-[#5B21B6] transition-colors"
                >
                  Request a custom quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md border border-[#00B5F1]/50 rounded-2xl p-8 hover:border-[#00B5F1]/70 transition-all duration-300 relative">
                <div className="absolute top-0 right-0 bg-[#00B5F1] text-slate-950 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  RECOMMENDED
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Corporate Website
                </h3>
                <p className="text-slate-400 mb-6">
                  Multi-page, extensive corporate website with custom features and
                  complex menu system.
                </p>
                <ul className="text-slate-300 mb-8 space-y-2">
                  <li>• Everything in Introduction package</li>
                  <li>• Multiple custom pages (e.g. Services, About)</li>
                  <li>• Dynamic content (Blog / News module)</li>
                  <li>• Advanced SEO and speed optimisation</li>
                  <li>• Easy-to-use CMS system</li>
                  <li>• Admin training</li>
                </ul>
                <Link
                  href="/en#contact"
                  className="inline-flex items-center gap-2 text-[#00B5F1] font-semibold hover:text-[#5B21B6] transition-colors"
                >
                  Request a custom quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-8 hover:border-[#5B21B6]/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Premium (Next.js / React)
                </h3>
                <p className="text-slate-400 mb-6">
                  The highest level of performance and technology. Lightning-fast
                  loading and unlimited scalability.
                </p>
                <ul className="text-slate-300 mb-8 space-y-2">
                  <li>• Everything in Corporate package</li>
                  <li>• Next.js 16 / React 19 architecture</li>
                  <li>• Perfect Core Web Vitals (99+ points)</li>
                  <li>• Headless CMS integration</li>
                  <li>• Luminous glassmorphism design elements</li>
                  <li>• Maximum conversion and security</li>
                </ul>
                <Link
                  href="/en#contact"
                  className="inline-flex items-center gap-2 text-[#00B5F1] font-semibold hover:text-[#5B21B6] transition-colors"
                >
                  Request a custom quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Micro-FAQ (AEO) ── */}
        <section className="py-24 border-t border-slate-800 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions (Quick Answers)
              </h2>
              <p className="text-slate-400">
                The most common questions I receive about web development.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-[#00B5F1]/30 transition-colors"
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

        {/* ── CTA ── */}
        <section className="py-32 text-center relative z-10">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s start your{" "}
              <span className="text-[#00B5F1] italic">new website!</span>
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              Every project starts with a free, no-obligation consultation where we
              discuss the details.
            </p>
            <Link
              href="/en#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-slate-950 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:shadow-[0_8px_32px_rgba(0,181,241,0.35)] hover:scale-105 transition-all duration-300"
            >
              Request a custom quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
