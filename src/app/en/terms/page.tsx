import type { Metadata } from "next";
import Link from "next/link";
import SubpageHero from "@/components/organisms/SubpageHero";
import Surface from "@/components/atoms/Surface";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import {
  CANONICAL_ORGANIZATION_ENTITY,
  serializeJsonLd,
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Terms of Service | WebDude",
  description:
    "WebDude Terms of Service and legal disclosures for bespoke Next.js web development, WooCommerce, graphic design, and AI automation services.",
  alternates: {
    canonical: "https://webdude.hu/en/terms",
    languages: {
      "hu-HU": "https://webdude.hu/felhasznalasi-feltetelek",
      "en-US": "https://webdude.hu/en/terms",
      "x-default": "https://webdude.hu/felhasznalasi-feltetelek",
    },
  },
  openGraph: {
    title: "Terms of Service | WebDude",
    description:
      "WebDude Terms of Service covering intellectual property, custom project quotes, contractual agreements, and governing law.",
    url: "https://webdude.hu/en/terms",
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
    title: "Terms of Service | WebDude",
    description:
      "WebDude Terms of Service and legal disclosures for digital services.",
    images: ["https://webdude.hu/og/webdude-og.jpg"],
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "/en" },
  { name: "Terms of Service", url: "/en/terms" },
]);

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://webdude.hu/en/terms#webpage",
  inLanguage: "en-US",
  name: "Terms of Service | WebDude",
  description:
    "WebDude Terms of Service and legal disclosures for web development, graphic design, SEO, and AI workflow services.",
  url: "https://webdude.hu/en/terms",
  publisher: CANONICAL_ORGANIZATION_ENTITY,
};

export default function EnTermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(webPageSchema),
        }}
      />

      <SubpageHero
        compact
        badge="Legal Document"
        title={
          <>
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
              Service
            </span>
          </>
        }
        subtitle="Last updated: November 20, 2026 · Legal terms governing use of webdude.hu and custom digital engagements."
        backgroundImage="/assets/banners/hero-jogi.webp"
        backgroundAlt="WebDude Terms of Service legal banner"
      />

      <Surface tone="night-lift" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="luminous-card p-8 md:p-12 space-y-10">
            <section>
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                1. Introduction
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-4">
                Welcome to webdude.hu. These Terms of Service
                (&quot;Terms&quot;) govern your access to and use of the
                webdude.hu website and the services provided by Balog Norbert
                operating as WebDude (&quot;WebDude&quot;, &quot;I&quot;, or
                &quot;Service Provider&quot;). By accessing this website, you
                agree to be bound by these Terms.
              </p>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed">
                WebDude is an independent digital studio with 26+ years of
                graphic design and 16+ years of web development experience,
                delivering bespoke web applications, UI/UX design, brand
                identity, technical SEO/AEO, and AI workflow automation remotely
                to clients worldwide.
              </p>
            </section>

            <section className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                2. Scope of Services
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-6">
                Services presented on webdude.hu include, without limitation:
              </p>
              <ul className="text-[#334155] dark:text-slate-300 space-y-3 mb-6">
                {[
                  "Bespoke website and web application development (Next.js 16, React 19, TypeScript, WordPress, WooCommerce)",
                  "UI/UX engineering and conversion rate optimization (CRO)",
                  "Graphic design and full brand identity systems (logo, print prepress, design guidelines)",
                  "AI workflow engineering, prompt systems, and business process automation",
                  "Technical SEO, Answer Engine Optimization (AEO/GEO), and Core Web Vitals optimization",
                  "WordPress security hardening, malware cleanup, and ongoing maintenance",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0369A1] dark:bg-[#00B5F1] mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed">
                Every engagement is scoped individually and initiated based on a
                written custom quote approved by both parties. I reserve the
                right to update service descriptions on the website at any time
                without prior notice.
              </p>
            </section>

            <section className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                3. Intellectual Property & Copyright
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-4">
                All materials published on webdude.hu — including copy, graphics,
                logos, case studies, software code, and media assets — are the
                intellectual property of WebDude or its respective licensors and
                are protected by copyright law.
              </p>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed">
                For commissioned client projects, deliverables created
                specifically for the client transfer according to the signed
                project agreement upon full invoice settlement, excluding
                underlying open-source libraries and third-party licensed
                components, which remain subject to their respective licenses.
              </p>
            </section>

            <section className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                4. Limitation of Liability
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-4">
                WebDude.hu is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis. While I maintain strict technical
                standards, I do not accept liability for indirect damages,
                interruptions caused by third-party hosting or network
                providers, or third-party integrations outside my direct
                control.
              </p>
            </section>

            <section className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                5. Personal Data Protection
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed">
                Processing of personal data submitted through webdude.hu is
                governed by the GDPR-compliant{" "}
                <Link
                  href="/en/privacy-policy"
                  className="text-[#0369A1] dark:text-[#00B5F1] hover:text-[#6D28D9] dark:hover:text-[#A78BFA] underline decoration-dotted"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                6. Contractual Terms, Payment & Warranty
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-4">
                A binding contractual relationship is established only when a
                custom written proposal and project specification are mutually
                accepted. Payment schedules, milestones, and warranty periods
                are defined explicitly inside each bespoke client agreement
                (typically settled via bank transfer or agreed payment methods).
              </p>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed">
                General refunds do not apply to completed custom digital work
                unless mandated by applicable statutory consumer protection
                law or specified in the signed project agreement.
              </p>
            </section>

            <section className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                7. Governing Law & Changes
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-4">
                Any dispute arising from these Terms shall first be addressed
                through direct good-faith negotiation. These Terms are governed
                by Hungarian law (including Act V of 2013 on the Civil Code),
                with the competent courts of Hungary having jurisdiction where
                permitted by law.
              </p>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed">
                I reserve the right to amend these Terms at any time; updated
                versions take effect immediately upon publication on this page.
              </p>
            </section>

            <section className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                8. Contact
              </h2>
              <div className="text-[#334155] dark:text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong className="text-[#0F172A] dark:text-white">
                    Provider:
                  </strong>{" "}
                  Balog Norbert (WebDude) · Kecskemét, Hungary
                </p>
                <p>
                  <strong className="text-[#0F172A] dark:text-white">
                    Email:
                  </strong>{" "}
                  <a
                    href="mailto:hello@webdude.hu"
                    className="text-[#0369A1] dark:text-[#00B5F1] hover:text-[#6D28D9] dark:hover:text-[#A78BFA] transition-colors underline decoration-dotted"
                  >
                    hello@webdude.hu
                  </a>
                </p>
                <p>
                  <strong className="text-[#0F172A] dark:text-white">
                    Phone:
                  </strong>{" "}
                  +36 70 323 8003
                </p>
                <p>
                  <strong className="text-[#0F172A] dark:text-white">
                    Contact Page:
                  </strong>{" "}
                  <Link
                    href="/en/contact"
                    className="text-[#0369A1] dark:text-[#00B5F1] hover:text-[#6D28D9] dark:hover:text-[#A78BFA] transition-colors underline decoration-dotted"
                  >
                    Request a custom quote
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </Surface>
    </div>
  );
}
