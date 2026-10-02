import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PenTool, Layers, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import { withLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Graphic Design and Brand Identity Nationwide | WebDude",
  description:
    "Logo, brand identity, marketing materials and digital graphic design in a unified visual system. 26 years of graphic design experience from WebDude.",
  keywords:
    "graphic design, brand identity, logo design, webdesign, UI/UX design, marketing graphics, nationwide",
  alternates: {
    canonical: "https://webdude.hu/en/services/graphic-design",
  },
  openGraph: {
    title: "Graphic Design and Brand Identity Nationwide | WebDude",
    description:
      "Logo, brand identity, marketing materials and digital graphic design in a unified visual system.",
    type: "website",
    locale: "en_US",
    siteName: "WebDude",
  },
};

export const revalidate = 3600;

export default function EnGraphicDesignPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", url: withLocale("/", "en") },
    { name: "Services", url: withLocale("/szolgaltatasok", "en") },
    { name: "Graphic Design", url: withLocale("/szolgaltatasok/grafikai-tervezes", "en") },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Graphic Design and Brand Identity",
    description:
      "Logo, brand identity, marketing materials and digital graphic design in a unified visual system.",
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
      question: "Why is a unified brand identity important for a business?",
      answer:
        "A unified brand identity (colors, typography, logo) builds trust and projects professionalism. If your website, business card and Facebook posts are visually coherent, customers recognise and trust you more easily.",
    },
    {
      question: "Do I get vector source files for the logo?",
      answer:
        "Yes. When delivering the logo, you get not just JPG or PNG formats, but a complete vector file package (AI, EPS, SVG, PDF), so you can scale up in the future without quality loss.",
    },
    {
      question: "Do you handle print preparation?",
      answer:
        "With 26 years of graphic and print experience, I know exactly what bleeds, CMYK colors and PDF settings are needed. I prepare any flyer, business card or brochure for print.",
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

      <div className="min-h-screen bg-slate-950 text-text-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#5B21B6]/5" />
        <div className="relative z-10">
          <Hero
            label="Service"
            title="Graphic Design & Brand Identity"
            subtitle="26 years of graphic design experience: logo, brand identity, marketing materials and digital graphic design in a unified visual system. Pixel-perfect quality produced in Adobe CC and Figma."
            cta1="Request a custom quote"
            cta1Link="/en#contact"
            cta2="View portfolio"
            cta2Link="/en#cases"
            fullHeight={true}
          />

          {/* Direct Answer Block */}
          <section className="relative py-12 bg-bg-base border-y border-white/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                <span className="text-[#00B5F1] font-semibold">
                  WebDude graphic design:
                </span>{" "}
                26 years of design experience: logo design, complete brand
                identity, print collateral and UI/UX design produced in Adobe CC and
                Figma. Because identity and code come from the same hand, nothing
                is lost between concept and shipped interface.
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="py-24 relative z-10">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Why Choose WebDude for Design?
                </h2>
                <p className="text-lg text-slate-400">
                  26 years of graphic design and 16 years of web development
                  experience. Code and design from the same hand.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-800 hover:border-[#00B5F1]/40 transition-all duration-300">
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
                <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-800 hover:border-[#5B21B6]/80 transition-all duration-300">
                  <Layers className="w-10 h-10 text-[#00B5F1] mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">
                    Complete Brand Identity
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Logo, color palette, typography, brand guidelines and applied
                    graphics – everything you need for a consistent presence.
                  </p>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-800 hover:border-[#00B5F1]/40 transition-all duration-300">
                  <ArrowRight className="w-10 h-10 text-[#00B5F1] mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">
                    Print-Ready Materials
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Flyers, business cards, brochures and promotional materials
                    ready for print with professional quality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-24 border-t border-slate-800 relative z-10">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-400">
                  Direct answers to the most important graphic design questions.
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

          {/* CTA */}
          <section className="py-32 text-center relative z-10">
            <div className="max-w-2xl mx-auto px-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Let&apos;s create your{" "}
                <span className="text-[#00B5F1] italic">brand identity</span>
              </h2>
              <p className="text-slate-400 mb-10 text-lg">
                Request a free consultation and let&apos;s discuss your visual identity
                needs.
              </p>
              <Link
                href="/en#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-slate-950 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:shadow-[0_8px_32px_rgba(0,181,241,0.35)] transition-all duration-300"
              >
                Request a custom quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
