import React from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/molecules/ServiceCard";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import { getDictionary } from "@/lib/dictionary";
import { withLocale } from "@/lib/i18n";

export const revalidate = 3600;

export default async function EnServicesPage() {
  const dictionary = await getDictionary("en");

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", url: withLocale("/", "en") },
    { name: "Services", url: withLocale("/szolgaltatasok", "en") },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const services = [
    {
      title: "Web Development",
      icon: "Globe",
      description:
        "Custom websites designed for SMEs and solo entrepreneurs. WordPress, React, Next.js, Node.js, static HTML and landing page development. Mobile-friendly, SEO-optimized and fast solutions.",
      tags: [
        "WordPress",
        "React",
        "Next.js",
        "Node.js",
        "HTML",
        "Landing Page",
      ],
      link: "/en#contact",
    },
    {
      title: "WooCommerce Development",
      icon: "ShoppingCart",
      description:
        "WooCommerce-based online stores that increase online sales and simplify the buying experience. Secure payment systems and inventory management.",
      tags: ["E-commerce", "Sales", "WooCommerce"],
      link: "/en#contact",
    },
    {
      title: "E-commerce Development",
      icon: "ShoppingBag",
      description:
        "E-commerce platforms (WooCommerce, Shopify, custom) that increase online sales. Modern UX, fast loading and conversion-focused design.",
      tags: ["E-commerce", "Sales", "UX"],
      link: "/en#contact",
    },
    {
      title: "SEO Optimisation",
      icon: "Target",
      description:
        "Search engine optimisation and content strategy that increases Google rankings and organic traffic. Technical SEO, on-page SEO and content marketing.",
      tags: ["SEO", "Organic", "Rankings"],
      link: "/en#contact",
    },
    {
      title: "Marketing Lead Generation",
      icon: "TrendingUp",
      description:
        "Strategic marketing tools and landing pages that automate client acquisition and increase leads. CRO optimisation and conversion increase.",
      tags: ["Lead Gen", "Landing Page", "Automation"],
      link: "/en#contact",
    },
    {
      title: "Graphic Design",
      icon: "Palette",
      description:
        "Professional graphic design for websites, marketing materials and social media. Vector logos, brochures and complete brand identity.",
      tags: ["Design", "Branding", "Marketing"],
      link: "/en#contact",
    },
    {
      title: "Brand Identity",
      icon: "PenTool",
      description:
        "Custom brand identity and logo design that strengthen brand identity and increase recognisability. Brand guideline documents and visual identity.",
      tags: ["Branding", "Logo", "Identity"],
      link: "/en#contact",
    },
    {
      title: "AI Workflow Setup",
      icon: "Bot",
      description:
        "AI-based automation systems and workflow setup that save time and money for SMEs. ChatGPT and Claude integration.",
      tags: ["AI", "Automation", "Workflow"],
      link: "/en#contact",
    },
    {
      title: "AI Image & Video Generation",
      icon: "Video",
      description:
        "AI-based image and video generation for marketing materials, social media content and websites. Midjourney, DALL-E and Runway ML.",
      tags: ["AI Art", "Generation", "Marketing"],
      link: "/en#contact",
    },
    {
      title: "AI Prompt Engineering",
      icon: "Sparkles",
      description:
        "Professional prompt engineering service that optimises AI model performance and ensures consistent outputs.",
      tags: ["AI", "Prompt", "Optimisation"],
      link: "/en#contact",
    },
    {
      title: "Virus Removal & Security",
      icon: "ShieldAlert",
      description:
        "WordPress virus removal, security backups and monthly maintenance to keep the website secure and fast. SSL certificate and security audit.",
      tags: ["Security", "Backup", "Support"],
      link: "/en#contact",
    },
    {
      title: "System Development",
      icon: "Code",
      description:
        "Custom software development and application development that solve business problems and automate processes. Backend, frontend and API integrations.",
      tags: ["Software", "Backend", "Frontend"],
      link: "/en#contact",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WebDude Digital Services",
    description:
      "Premium digital services: custom web development, professional graphic design, AI prompt engineering and SEO optimisation.",
    provider: {
      "@type": "Person",
      name: "Norbi (WebDude)",
      url: "https://webdude.hu",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a website cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Custom pricing based on project requirements. Free consultation for accurate pricing.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simple website: 1-2 weeks. E-commerce: 2-4 weeks. Custom project: custom timeline. Every project is unique, but always on deadline.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to pay a monthly fee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Completed project is a one-time payment. Maintenance and support is optional with a monthly fee. No hidden costs.",
        },
      },
      {
        "@type": "Question",
        name: "Why choose me?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "26 years of experience, direct communication (no project manager), custom pricing, projects delivered on deadline, 95+ Lighthouse score.",
        },
      },
      {
        "@type": "Question",
        name: "What technologies do I use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WordPress, WooCommerce, Next.js, React, Node.js, Firebase. Technology adapts to the project. Every project is modern and secure.",
        },
      },
    ],
  };

  return (
    <div className="bg-bg-base text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Hero
        label={dictionary.services.page.heroLabel}
        title={
          <>
            Increase{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-brand-primary to-cta-to italic">
              Client Acquisition
            </span>{" "}
            <br /> with Website and AI
          </>
        }
        subtitle={dictionary.services.page.heroSubtitle}
        cta1={dictionary.services.page.cta1}
        cta1Link="/en#contact"
        cta2={dictionary.services.page.cta2}
        cta2Link="/en#cases"
        fullHeight={true}
        backgroundImage="/assets/banners/szeged-terkozeves.webp"
      />

      {/* Direct Answer Block - AEO optimised "Services Overview" */}
      <section className="relative py-12 bg-bg-base border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            <span className="text-[#00B5F1] font-semibold">
              WebDude digital services:
            </span>{" "}
            {dictionary.services.page.directAnswer}
          </p>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-bg-surface border-y border-slate-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-bg-elevated border border-slate-600 rounded-2xl p-8 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 group">
              <span className="text-5xl font-black font-serif block mb-3 text-text-primary group-hover:text-brand-primary tracking-tight">
                26+
              </span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                Years Experience
              </p>
            </div>
            <div className="bg-bg-elevated border border-slate-600 rounded-2xl p-8 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 group">
              <span className="text-5xl font-black font-serif block mb-3 text-text-primary group-hover:text-brand-primary tracking-tight">
                200+
              </span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                Projects Delivered
              </p>
            </div>
            <div className="bg-bg-elevated border border-slate-600 rounded-2xl p-8 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 group">
              <span className="text-5xl font-black font-serif block mb-3 text-text-primary group-hover:text-brand-primary tracking-tight">
                500+
              </span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                Leads Generated
              </p>
            </div>
            <div className="bg-bg-elevated border border-slate-600 rounded-2xl p-8 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 group">
              <span className="text-5xl font-black font-serif block mb-3 text-text-primary group-hover:text-brand-primary tracking-tight">
                95+
              </span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                Lighthouse Score
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 bg-bg-surface relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-32">
            <div className="inline-block relative pl-6 mb-8">
              <span className="text-xs uppercase font-black tracking-[0.3em] text-brand-primary mb-2 block">
                {dictionary.services.page.sectionTitle}
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-brand-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              {dictionary.services.page.sectionSubtitle}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mx-auto tracking-wide font-medium">
              {dictionary.services.page.sectionDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
            {services.map((s, i) =>
              s.link ? (
                <Link key={i} href={s.link}>
                  <ServiceCard {...s} index={i} />
                </Link>
              ) : (
                <ServiceCard key={i} {...s} index={i} />
              )
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-40 bg-bg-surface border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block relative pl-6 mb-8">
              <span className="text-xs uppercase font-black tracking-[0.3em] text-brand-primary mb-2 block">
                {dictionary.services.page.processTitle}
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-brand-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              {dictionary.services.page.processTitle}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mx-auto tracking-wide font-medium">
              {dictionary.services.page.processDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Free Consultation",
                description:
                  "We get to know each other, discuss goals and opportunities.",
              },
              {
                step: "02",
                title: "Planning & Strategy",
                description: "I prepare a detailed plan, pricing and timeline.",
              },
              {
                step: "03",
                title: "Development & Implementation",
                description: "I start the work with regular updates.",
              },
              {
                step: "04",
                title: "Delivery & Support",
                description:
                  "I deliver the completed project and ensure support.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-bg-elevated border border-slate-600 rounded-2xl p-8 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <span className="text-6xl font-black font-serif block mb-4 text-brand-primary/30 group-hover:text-brand-primary/50 transition-colors tracking-tight">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed tracking-wide font-medium">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-40 bg-bg-surface border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block relative pl-6 mb-8">
              <span className="text-xs uppercase font-black tracking-[0.3em] text-brand-primary mb-2 block">
                FAQ
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-brand-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              How much does a{" "}
              <span className="text-brand-primary italic">website cost</span>?
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How much does a website cost?",
                answer:
                  "Custom pricing based on project requirements. Free consultation for accurate pricing.",
              },
              {
                question: "How long does it take?",
                answer:
                  "Simple website: 1-2 weeks. E-commerce: 2-4 weeks. Custom project: custom timeline. Every project is unique, but always on deadline.",
              },
              {
                question: "Do I need to pay a monthly fee?",
                answer:
                  "No. Completed project is a one-time payment. Maintenance and support is optional with a monthly fee. No hidden costs.",
              },
              {
                question: "Why choose me?",
                answer:
                  "26 years of experience, direct communication (no project manager), custom pricing, projects delivered on deadline, 95+ Lighthouse score.",
              },
              {
                question: "What technologies do I use?",
                answer:
                  "WordPress, WooCommerce, Next.js, React, Node.js, Firebase. Technology adapts to the project. Every project is modern and secure.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-bg-elevated border border-slate-600 rounded-2xl p-6 hover:border-brand-primary/50 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-text-primary mb-2 tracking-tight">
                  {faq.question}
                </h3>
                <p className="text-slate-400 leading-relaxed tracking-wide font-medium">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
