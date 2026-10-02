import PortfolioGrid from "@/components/molecules/PortfolioGrid";
import PortfolioHero from "@/components/molecules/PortfolioHero";
import { works as staticWorks } from "@/data/works";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import { withLocale } from "@/lib/i18n";

export const revalidate = 3600; // 1 hour ISR cache

export default async function EnPortfolioPage() {
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
      url: `https://webdude.hu/en/portfolio/${work.slug}`,
    })),
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
          __html: JSON.stringify(portfolioSchema).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioHero />
      <PortfolioGrid projects={staticWorks} />
    </div>
  );
}
