import PortfolioGrid from "@/components/molecules/PortfolioGrid";
import PortfolioHero from "@/components/molecules/PortfolioHero";
import { works as staticWorks } from "@/data/works";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import { withLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";

export const revalidate = 3600; // 1 hour ISR cache

export default async function EnPortfolioPage() {
  const dictionary = await getDictionary("en");
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", url: withLocale("/", "en") },
    { name: "Portfolio", url: withLocale("/munkak", "en") },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio & Case Studies | WebDude",
    description:
      "Real client results, conversion-optimised Next.js websites and custom digital systems. 26 years of experience, measurable growth.",
    url: "https://webdude.hu/en/portfolio",
    hasPart: staticWorks.map((work) => ({
      "@type": "CreativeWork",
      name: work.title,
      description: work.description,
      image: work.image,
      url: `https://webdude.hu/munkak/${work.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioHero
        badge="Portfolio"
        titlePrefix="Results, Not Just "
        titleHighlight="Design"
        subtitle="Every project is a distinct challenge answered with craft and engineering. Explore the case studies below."
        ctaLabel="Request a custom quote →"
        ctaHref="/en/contact"
      />
      <div className="max-w-6xl mx-auto px-6 py-20">
        <PortfolioGrid
          projects={staticWorks}
          caseStudyLabel={dictionary.portfolio.caseStudyLabel}
        />
      </div>
    </div>
  );
}
