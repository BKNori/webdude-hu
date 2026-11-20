import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Bot,
  Code2,
  Cpu,
  HeartHandshake,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SubpageHero from "@/components/organisms/SubpageHero";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import Surface from "@/components/atoms/Surface";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import {
  CANONICAL_ORGANIZATION_ENTITY,
  CANONICAL_PERSON_ENTITY,
  serializeJsonLd,
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "About Balog Norbert – WebDude | 26+ Years Experience",
  description:
    "Started in graphic design 26+ years ago, now building fast Next.js 16 systems and AI workflow automation with 16+ years of web development experience.",
  alternates: {
    canonical: "https://webdude.hu/en/about",
    languages: {
      "hu-HU": "https://webdude.hu/szia-norbi-vagyok",
      "en-US": "https://webdude.hu/en/about",
      "x-default": "https://webdude.hu/szia-norbi-vagyok",
    },
  },
  openGraph: {
    title: "About Balog Norbert – WebDude | 26+ Years Experience",
    description:
      "Started in graphic design 26+ years ago, now building fast Next.js 16 systems and AI workflow automation with 16+ years of web development experience.",
    url: "https://webdude.hu/en/about",
    siteName: "WebDude",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/assets/personal/webdude-kep.webp",
        width: 1000,
        height: 1250,
        alt: "Balog Norbert - WebDude",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Balog Norbert – WebDude | 26+ Years Experience",
    description:
      "Solo Next.js 16 developer, art director & AI automation specialist with 26+ years graphic design and 16+ years web development experience.",
    images: ["/assets/personal/webdude-kep.webp"],
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "/en" },
  { name: "About", url: "/en/about" },
]);

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://webdude.hu/en/about#profile",
  inLanguage: "en-US",
  name: "About Balog Norbert – WebDude | 26+ Years Experience",
  description:
    "Balog Norbert (WebDude) is a solo full-stack web developer, art director, and AI automation specialist with 26+ years of graphic design and 16+ years of web development experience.",
  url: "https://webdude.hu/en/about",
  mainEntity: {
    ...CANONICAL_PERSON_ENTITY,
    jobTitle:
      "Full-Stack Web Developer, Art Director & AI Automation Specialist",
    description:
      "Balog Norbert (WebDude) — solo web developer and designer with 26+ years of graphic design and 16+ years of web development experience, building Next.js 16, React 19, TypeScript, WordPress/WooCommerce and AI workflow systems remotely for clients worldwide.",
    image: "https://webdude.hu/assets/personal/webdude-kep.webp",
    url: "https://webdude.hu/en/about",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kecskemét",
      addressCountry: "HU",
    },
    worksFor: CANONICAL_ORGANIZATION_ENTITY,
  },
};

const KpiHighlights = [
  { value: "26+ Years", label: "Graphic Design & Print Precision" },
  { value: "16+ Years", label: "Full-Stack Web Development" },
  { value: "47+ Clients", label: "Delivered Digital Systems" },
];

const Milestones = [
  {
    year: "1997 – 2001",
    title: "Typography, Print Craft & Business Informatics",
    desc: "Formal training in classical typography, prepress precision, and early software fundamentals — still the foundation of my pixel-accurate digital craftsmanship.",
  },
  {
    year: "2002 – 2007",
    title: "Computer Engineering & Systems Architecture",
    desc: "University engineering studies focused on software architecture, databases, and structured problem solving for scalable web applications.",
  },
  {
    year: "2008 – Present",
    title: "Full-Stack Web Development & UI/UX",
    desc: "Building conversion-focused websites, WooCommerce platforms, and bespoke web applications with direct client collaboration from concept to launch.",
  },
  {
    year: "2020",
    title: "WebDude Brand Evolution",
    desc: "Consolidating decades of design and engineering work into a focused solo studio delivering technical SEO, brand identity, and measurable business growth.",
  },
  {
    year: "2025 – 2026",
    title: "Next.js 16, React 19 & AI Workflow Engineering",
    desc: "Architecting ultra-fast Next.js 16 applications, Answer Engine Optimization (AEO/GEO), and custom OpenAI / Anthropic / Gemini automation pipelines.",
  },
];

const TechStack = [
  {
    icon: Code2,
    title: "Next.js 16 & React 19",
    desc: "Server Components, strict TypeScript, Core Web Vitals 95+ performance, and technical SEO built into the architecture.",
  },
  {
    icon: Layers,
    title: "WordPress & WooCommerce",
    desc: "Custom high-speed stores, ERP integrations, security hardening, and clean maintainability without bloated templates.",
  },
  {
    icon: Bot,
    title: "AI Workflow Automation",
    desc: "Deterministic OpenAI, Claude, and Gemini workflows for lead qualification, content pipelines, and internal operations.",
  },
  {
    icon: Cpu,
    title: "Tailwind CSS v4 & Firebase",
    desc: "Accessible Dual Theme interfaces backed by secure server actions, Firestore, and structured schema graphs.",
  },
];

const ProcessSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    desc: "Direct conversation with me to align on business objectives, audience, and technical scope.",
  },
  {
    step: "02",
    title: "Design & Prototype",
    desc: "Bespoke UI/UX, typography, and brand-aligned visual direction built for conversion.",
  },
  {
    step: "03",
    title: "Engineering & SEO",
    desc: "Clean Next.js 16 or WordPress implementation with structured data and AEO readiness.",
  },
  {
    step: "04",
    title: "Integrations & QA",
    desc: "Forms, payments, analytics, automated checks, and multi-device verification.",
  },
  {
    step: "05",
    title: "Long-Term Support",
    desc: "You continue working directly with me for updates, security, and future iterations.",
  },
];

export default function EnAboutPage() {
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
          __html: serializeJsonLd(profilePageSchema),
        }}
      />

      {/* 1. Hero */}
      <SubpageHero
        badge="26+ Years Experience & Digital Craftsmanship"
        title={
          <>
            You Don&apos;t Work With an Agency —{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
              You Work With Me
            </span>
          </>
        }
        subtitle="I am Balog Norbert, founder and solo developer behind WebDude. With 26+ years in graphic design and 16+ years in web development, I build fast digital systems directly for your business."
        backgroundImage="/assets/banners/hero-rolam.webp"
        backgroundAlt="Balog Norbert — WebDude 26+ years of design and development experience"
        cta1Text="Request a custom quote"
        cta1Href="/en/contact"
        cta2Text="View Portfolio"
        cta2Href="/en/portfolio"
      />

      {/* 2. AEO Direct Answer */}
      <Surface tone="night-lift" className="py-12">
        <DirectAnswerBlock
          id="en-about-direct-answer"
          badgeLabel="Direct Answer"
          question="Who is behind WebDude and what experience do I bring to your project?"
          answer="I am Balog Norbert (WebDude), a solo full-stack web developer and art director with 26+ years of graphic design and 16+ years of web development experience. I build Next.js 16, React 19, TypeScript, WordPress/WooCommerce, and AI workflow systems with direct personal communication — no agency layers, tailored to a custom quote."
        />
      </Surface>

      {/* 3. Portrait + Core Values */}
      <Surface tone="night" aurora className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-5 flex justify-center">
              <div className="luminous-card relative w-full max-w-sm aspect-4/5 overflow-hidden p-3">
                <div className="w-full h-full relative overflow-hidden rounded-2xl">
                  <Image
                    src="/assets/personal/webdude-kep.webp"
                    alt="Balog Norbert - WebDude"
                    width={500}
                    height={625}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block relative pl-6">
                <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] block">
                  Philosophy & Partnership
                </span>
                <div className="absolute left-0 top-0 w-1 h-5 bg-linear-to-b from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#5B21B6]" />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-[#0F172A] dark:text-white leading-tight">
                The Power of Direct Senior Execution
              </h2>

              <p className="text-lg text-[#334155] dark:text-slate-300 leading-relaxed">
                There are no account managers, no handoff bottlenecks, and no
                lost context between design and engineering. I personally unite
                visual design, frontend architecture, technical SEO, and AI
                automation under one roof as your remote partner worldwide.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {KpiHighlights.map((kpi) => (
                  <div key={kpi.label} className="luminous-card p-5">
                    <p className="text-2xl font-heading text-[#0369A1] dark:text-[#00B5F1]">
                      {kpi.value}
                    </p>
                    <p className="text-xs text-[#475569] dark:text-slate-300 mt-1">
                      {kpi.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="luminous-card p-8">
              <div className="w-12 h-12 rounded-xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/12 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 flex items-center justify-center text-[#0369A1] dark:text-[#00B5F1] mb-6">
                <HeartHandshake className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-heading text-[#0F172A] dark:text-white mb-3">
                Direct Communication
              </h3>
              <p className="text-[#334155] dark:text-slate-300 text-sm leading-relaxed">
                You talk directly with me from the very first discovery call
                through launch and ongoing improvements.
              </p>
            </div>

            <div className="luminous-card p-8">
              <div className="w-12 h-12 rounded-xl bg-[#6D28D9]/10 dark:bg-[#7C3AED]/15 border border-[#6D28D9]/25 dark:border-[#A78BFA]/30 flex items-center justify-center text-[#6D28D9] dark:text-[#A78BFA] mb-6">
                <Award className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-heading text-[#0F172A] dark:text-white mb-3">
                26+ Years Design Craft
              </h3>
              <p className="text-[#334155] dark:text-slate-300 text-sm leading-relaxed">
                Print-grade typographic discipline combined with modern UX
                clarity built to turn visitors into qualified leads.
              </p>
            </div>

            <div className="luminous-card p-8">
              <div className="w-12 h-12 rounded-xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/12 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 flex items-center justify-center text-[#0369A1] dark:text-[#00B5F1] mb-6">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-heading text-[#0F172A] dark:text-white mb-3">
                Production Reliability
              </h3>
              <p className="text-[#334155] dark:text-slate-300 text-sm leading-relaxed">
                Strict TypeScript, automated checks, Core Web Vitals speed, and
                transparent custom quotes with zero hidden fees.
              </p>
            </div>
          </div>
        </div>
      </Surface>

      {/* 4. Experience Timeline */}
      <Surface tone="night-lift" aurora className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14 space-y-4">
            <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Career Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-[#0F172A] dark:text-white">
              My Journey & Experience
            </h2>
          </div>

          <ol className="space-y-6">
            {Milestones.map((item) => (
              <li
                key={item.year}
                className="luminous-card p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
              >
                <span className="font-mono text-sm font-semibold text-[#0369A1] dark:text-[#00B5F1] shrink-0 md:w-36">
                  {item.year}
                </span>
                <div>
                  <h3 className="text-xl font-heading text-[#0F172A] dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Surface>

      {/* 5. Tech Stack */}
      <Surface tone="night" className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 space-y-3">
            <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] block">
              Technology Stack
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-[#0F172A] dark:text-white">
              Tools Built For Speed & Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TechStack.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="luminous-card p-6">
                <div className="w-10 h-10 rounded-xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/12 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 flex items-center justify-center text-[#0369A1] dark:text-[#00B5F1] mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-heading text-[#0F172A] dark:text-white mb-2">
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

      {/* 6. Working Method */}
      <Surface tone="slate-lift" aurora grid className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-[#0F172A] dark:text-white mb-4">
              How I Work With You
            </h2>
            <p className="text-[#334155] dark:text-slate-300">
              A transparent 5-step process without unnecessary meetings or
              delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {ProcessSteps.map((step) => (
              <div key={step.step} className="luminous-card p-6">
                <span className="text-xs font-mono font-bold text-[#0369A1] dark:text-[#00B5F1] block mb-3">
                  {step.step}
                </span>
                <h3 className="text-lg font-heading text-[#0F172A] dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Surface>

      {/* 7. Bottom CTA */}
      <Surface tone="night-lift" aurora className="py-20 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-[#0F172A] dark:text-white leading-tight">
            Let&apos;s Discuss Your Project
          </h2>
          <p className="text-lg text-[#334155] dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Share your goals and request a custom quote — I respond personally
            within 24 hours.
          </p>
          <div className="pt-2">
            <Link
              href="/en/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white rounded-full font-semibold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_8px_28px_rgba(7,89,133,0.4)] hover:scale-[1.03] active:scale-95"
            >
              Request a custom quote
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Surface>
    </div>
  );
}
