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
  title: "Privacy Policy | WebDude",
  description:
    "WebDude Privacy Policy and GDPR data processing notice. Learn how personal data, contact inquiries, and analytics cookies are handled securely.",
  alternates: {
    canonical: "https://webdude.hu/en/privacy-policy",
    languages: {
      "hu-HU": "https://webdude.hu/adatvedelmi-szabalyzat",
      "en-US": "https://webdude.hu/en/privacy-policy",
      "x-default": "https://webdude.hu/adatvedelmi-szabalyzat",
    },
  },
  openGraph: {
    title: "Privacy Policy | WebDude",
    description:
      "WebDude Privacy Policy and GDPR data processing notice. Transparent data protection for web development, SEO, and AI automation clients.",
    url: "https://webdude.hu/en/privacy-policy",
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
    title: "Privacy Policy | WebDude",
    description: "WebDude Privacy Policy and GDPR data protection notice.",
    images: ["https://webdude.hu/og/webdude-og.jpg"],
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "/en" },
  { name: "Privacy Policy", url: "/en/privacy-policy" },
]);

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://webdude.hu/en/privacy-policy#webpage",
  inLanguage: "en-US",
  name: "Privacy Policy | WebDude",
  description:
    "WebDude Privacy Policy and GDPR data processing notice for personal data and website analytics.",
  url: "https://webdude.hu/en/privacy-policy",
  publisher: CANONICAL_ORGANIZATION_ENTITY,
};

export default function EnPrivacyPolicyPage() {
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
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
              Policy
            </span>
          </>
        }
        subtitle="Last updated: November 20, 2026 · GDPR-compliant data processing notice for webdude.hu."
        backgroundImage="/assets/banners/hero-jogi.webp"
        backgroundAlt="WebDude Privacy Policy legal banner"
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
                WebDude (operated by Balog Norbert, sole proprietor,
                hereinafter &quot;WebDude&quot;, &quot;I&quot;, or
                &quot;Service Provider&quot;) is committed to protecting your
                personal data. This Privacy Policy explains how personal data
                is collected, used, stored, and safeguarded when you browse
                webdude.hu or inquire about my services.
              </p>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed">
                All personal data is processed strictly in accordance with the
                EU General Data Protection Regulation (GDPR — Regulation (EU)
                2016/679) and applicable Hungarian data protection legislation
                (Act CXII of 2011 on the Right of Informational
                Self-Determination and Freedom of Information).
              </p>
            </section>

            <section className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                2. Data Controller Details
              </h2>
              <div className="text-[#334155] dark:text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong className="text-[#0F172A] dark:text-white">
                    Data Controller:
                  </strong>{" "}
                  Balog Norbert (WebDude)
                </p>
                <p>
                  <strong className="text-[#0F172A] dark:text-white">
                    Registered Location:
                  </strong>{" "}
                  Kecskemét, Hungary
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
                <p className="text-[#475569] dark:text-slate-400 text-sm pt-2">
                  <strong className="text-[#0F172A] dark:text-white">
                    Data Protection Inquiries:
                  </strong>{" "}
                  There is no separate designated Data Protection Officer;
                  please direct all privacy-related inquiries directly to
                  hello@webdude.hu.
                </p>
              </div>
            </section>

            <section className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                3. Personal Data Collected
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-6">
                Depending on how you interact with webdude.hu, I may process the
                following categories of personal data:
              </p>
              <ul className="text-[#334155] dark:text-slate-300 space-y-3">
                {[
                  {
                    name: "Name",
                    desc: "Provided voluntarily when submitting a contact or custom quote form.",
                  },
                  {
                    name: "Email address",
                    desc: "Used to reply personally to your project inquiry or deliver requested documentation.",
                  },
                  {
                    name: "Phone number",
                    desc: "Optional detail supplied when requesting a consultation call.",
                  },
                  {
                    name: "Project type & inquiry summary",
                    desc: "Used solely to scope your technical requirements and prepare a tailored custom quote.",
                  },
                  {
                    name: "Technical & browser metadata",
                    desc: "IP address, device/browser headers collected automatically for server security and firewall protection.",
                  },
                  {
                    name: "Cookie & theme preferences",
                    desc: "Consent state and Light/Dark theme selection stored locally in your browser.",
                  },
                ].map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0369A1] dark:bg-[#00B5F1] mt-2.5 shrink-0" />
                    <span>
                      <strong className="text-[#0F172A] dark:text-white">
                        {item.name}:
                      </strong>{" "}
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                4. Cookies & Analytics
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-6">
                WebDude.hu uses strictly necessary browser storage and, only
                after your explicit consent, privacy-conscious analytics tools
                to measure performance and usability:
              </p>
              <ul className="text-[#334155] dark:text-slate-300 space-y-3 mb-6">
                {[
                  {
                    type: "Essential cookies & storage",
                    desc: "Required for core website functionality, security, and remembering your consent choice.",
                  },
                  {
                    type: "Preference storage",
                    desc: "Preserves interface settings such as Luminous Daylight / Luminous Slate theme selection.",
                  },
                  {
                    type: "Analytics cookies (consent-based)",
                    desc: "Aggregated traffic measurement via Google Analytics (GA4) only when accepted in the cookie banner.",
                  },
                ].map((item) => (
                  <li key={item.type} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0369A1] dark:bg-[#00B5F1] mt-2.5 shrink-0" />
                    <span>
                      <strong className="text-[#0F172A] dark:text-white">
                        {item.type}:
                      </strong>{" "}
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[#475569] dark:text-slate-400 text-sm">
                You may accept or decline optional analytics cookies at any time
                via the cookie consent banner or your browser settings.
              </p>
            </section>

            <section className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                5. Your Rights Under GDPR
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-4">
                You have the right to request access to your personal data,
                rectification of inaccurate records, erasure (&quot;right to be
                forgotten&quot;), restriction of processing, data portability,
                and to withdraw consent at any time without affecting prior
                lawful processing.
              </p>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed">
                You also have the right to lodge a complaint with the Hungarian
                National Authority for Data Protection and Freedom of
                Information (NAIH,{" "}
                <span className="font-mono text-xs">naih.hu</span>) or your
                local EU supervisory authority.
              </p>
            </section>

            <section className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h2 className="text-2xl font-heading text-[#0F172A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#0369A1] dark:bg-[#00B5F1] rounded-full" />
                6. Contact & Related Legal Pages
              </h2>
              <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-6">
                If you have questions about this Privacy Policy or wish to
                exercise your data rights, please contact me directly:
              </p>
              <div className="text-[#334155] dark:text-slate-300 space-y-2 leading-relaxed">
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
                    Contact Form:
                  </strong>{" "}
                  <Link
                    href="/en/contact"
                    className="text-[#0369A1] dark:text-[#00B5F1] hover:text-[#6D28D9] dark:hover:text-[#A78BFA] transition-colors underline decoration-dotted"
                  >
                    webdude.hu/en/contact
                  </Link>
                </p>
                <p>
                  <strong className="text-[#0F172A] dark:text-white">
                    Terms of Service:
                  </strong>{" "}
                  <Link
                    href="/en/terms"
                    className="text-[#0369A1] dark:text-[#00B5F1] hover:text-[#6D28D9] dark:hover:text-[#A78BFA] transition-colors underline decoration-dotted"
                  >
                    Read Terms of Service
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
