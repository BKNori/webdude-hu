import Hero from "@/components/Hero";
import { Metadata } from "next";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import { withLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WooCommerce Development & E-commerce | WebDude",
    description:
      "16 years of experience in WooCommerce development and optimisation. Conversion-focused e-commerce systems, payment integrations and full support.",
    keywords:
      "WooCommerce webshop, WooCommerce development, e-commerce system, web development, WooCommerce optimisation, WordPress webshop",
    alternates: {
      canonical: "https://webdude.hu/en/services/woocommerce-development",
    },
    openGraph: {
      title: "WooCommerce Development & E-commerce | WebDude",
      description:
        "16 years of experience in WooCommerce webshop development and optimisation.",
      url: "https://webdude.hu/en/services/woocommerce-development",
      siteName: "WebDude",
    },
  };
}

const FAQ = [
  {
    q: "How long does a WooCommerce webshop take?",
    a: "Simple webshop 2-3 weeks, complex e-commerce system 4-8 weeks depending on how many products and features there are.",
  },
  {
    q: "What payment methods do you integrate?",
    a: "Barion, SimplePay, Stripe, PayPal, credit card, cash on delivery and SZÉP card. Every payment provider integrated with full compliance.",
  },
  {
    q: "Do you ensure webshop security?",
    a: "Yes, SSL certificate, GDPR-compliant systems, security updates and continuous monitoring guarantee webshop security.",
  },
  {
    q: "How much does a WooCommerce webshop cost?",
    a: "Custom quote based on project requirements. Free consultation for accurate pricing.",
  },
];

export const revalidate = 3600;

export default function EnWooCommercePage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", url: withLocale("/", "en") },
    { name: "Services", url: withLocale("/szolgaltatasok", "en") },
    {
      name: "WooCommerce Development",
      url: withLocale("/szolgaltatasok/woocommerce-webshop-keszites", "en"),
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WooCommerce Development and E-commerce",
    description:
      "16 years of experience in WooCommerce webshop development and optimisation. Conversion-focused e-commerce systems, payment integrations and full support.",
    provider: {
      "@type": "LocalBusiness",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
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
      <div className="min-h-screen bg-transparent text-text-primary relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />
        <div className="relative z-10">
          <Hero
            label="Service"
            title="WooCommerce Development"
            subtitle="16 years of experience in WooCommerce webshop development and optimisation. Conversion-focused e-commerce systems, payment integrations and full support for online value."
            cta1="Request a free consultation"
            cta1Link="/en#contact"
            cta2="View portfolio"
            cta2Link="/en#cases"
            fullHeight={true}
          />

          {/* Direct Answer Block - AEO optimised "WooCommerce Webshop Overview" */}
          <section className="relative py-12 bg-bg-base border-y border-white/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                <span className="text-[#00B5F1] font-semibold">
                  WebDude WooCommerce development:
                </span>{" "}
                16 years of experience in WooCommerce webshop development and
                optimisation. Conversion-focused e-commerce systems, payment
                integrations and full support delivered as a remote partner worldwide.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24 border-t border-slate-800 relative z-10">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-400">
                  Direct answers to the most important WooCommerce questions.
                </p>
              </div>

              <div className="space-y-6">
                {FAQ.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-slate-900/80 border border-white/5 rounded-2xl p-6 hover:border-[#00B5F1]/20 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {faq.a}
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
                Start your{" "}
                <span className="text-[#00B5F1] italic">e-commerce</span>{" "}
                journey
              </h2>
              <p className="text-slate-400 mb-10 text-lg">
                Request a free consultation and let&apos;s discuss your online store
                needs.
              </p>
              <a
                href="/en#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-slate-950 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:shadow-[0_8px_32px_rgba(0,181,241,0.35)] transition-all duration-300"
              >
                Request a custom quote
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
