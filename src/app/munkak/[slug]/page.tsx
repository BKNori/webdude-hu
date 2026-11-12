import { works } from "@/data/works";
import { CASE_STUDY_SEO } from "@/data/caseStudySeo";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import RimaiCaseStudy from "@/components/organisms/RimaiCaseStudy";
import BorGarnelaCaseStudy from "@/components/organisms/BorGarnelaCaseStudy";
import HuMagoCaseStudy from "@/components/organisms/HuMagoCaseStudy";
import ClassiCoCaseStudy from "@/components/organisms/ClassiCoCaseStudy";
import BtshopCaseStudy from "@/components/organisms/BtshopCaseStudy";
import LengyelHelgaCaseStudy from "@/components/organisms/LengyelHelgaCaseStudy";
import DrNagyAlbertCaseStudy from "@/components/organisms/DrNagyAlbertCaseStudy";
import AiPromptCaseStudy from "@/components/organisms/AiPromptCaseStudy";
import GoBoxCaseStudy from "@/components/organisms/GoBoxCaseStudy";
import LeanperialCaseStudy from "@/components/organisms/LeanperialCaseStudy";
import NedelMarketCaseStudy from "@/components/organisms/NedelMarketCaseStudy";
import GeneralCaseStudy from "@/components/organisms/GeneralCaseStudy";

// ISR: Revalidate pages every 1 hour (Anti-Drain Policy)
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Fetch project from works array
async function getProject(slug: string) {
  const work = works.find((p) => p.slug === slug);
  return work || null;
}

export async function generateStaticParams() {
  const paths = works.map((p) => ({
    slug: p.slug,
  }));
  return paths;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Projekt nem található | WebDude" };

  // Prioritás a CASE_STUDY_SEO tábla (slug vagy id alapján)
  const seoOverride = CASE_STUDY_SEO[slug] || CASE_STUDY_SEO[project.id];
  if (seoOverride) return seoOverride.metadata;

  return {
    title: `${project.title} – WebDude Portfólió`,
    description: project.description,
    keywords: project.tags,
    alternates: {
      canonical: `https://webdude.hu/munkak/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | WebDude`,
      description: project.description,
      url: `https://webdude.hu/munkak/${project.slug}`,
      siteName: "WebDude",
      images: [
        {
          url: "https://webdude.hu/assets/banners/webdude-hero.webp",
          width: 1200,
          height: 630,
        },
      ],
      locale: "hu_HU",
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const p = await getProject(slug);

  if (!p) notFound();

  // CASE_STUDY_SEO bejegyzés feloldása (slug vagy id alapján)
  const seoData = CASE_STUDY_SEO[slug] || CASE_STUDY_SEO[p.id];
  const schemas = seoData?.schemas ?? [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
        { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
        { "@type": "ListItem", position: 3, name: p.title, item: `https://webdude.hu/munkak/${p.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      url: `https://webdude.hu/munkak/${p.slug}`,
      creator: {
        "@type": "Person",
        "@id": "https://webdude.hu/#person",
        name: "Balog Norbert",
      },
    },
  ];

  const directAnswer = seoData?.directAnswer;

  // Egy dedikált esettanulmány + JSON-LD sémák + Direct Answer sáv
  const withSchemas = (content: React.ReactNode) => (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      {directAnswer && (
        <aside
          aria-label="Projekt áttekintés"
          className="relative z-20 border-b border-slate-800/80 bg-slate-950/90 py-8 backdrop-blur-md"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <DirectAnswerBlock
              id={`direct-answer-${p.id}`}
              question={directAnswer.question}
              answer={directAnswer.answer}
              facts={directAnswer.facts}
            />
          </div>
        </aside>
      )}
      {content}
    </>
  );

  // Rimai Útépítő Kft. dedikált esettanulmány
  if (p.id === "rimai-utepito") {
    return withSchemas(<RimaiCaseStudy project={p} />);
  }

  // Bor és Garnéla dedikált esettanulmány
  if (p.id === "bor-es-garnela") {
    return withSchemas(<BorGarnelaCaseStudy project={p} />);
  }

  // HU-MÁGÓ Kft. dedikált esettanulmány
  if (p.id === "hu-mago-kft") {
    return withSchemas(<HuMagoCaseStudy project={p} />);
  }

  // Classi-Co Kft. dedikált esettanulmány
  if (p.id === "classi-co") {
    return withSchemas(<ClassiCoCaseStudy project={p} />);
  }

  // BTShop dedikált esettanulmány
  if (p.id === "btshop") {
    return withSchemas(<BtshopCaseStudy project={p} />);
  }

  // Lengyel Helga dedikált esettanulmány
  if (p.id === "lengyel-helga") {
    return withSchemas(<LengyelHelgaCaseStudy />);
  }

  // Dr. Nagy Albert dedikált esettanulmány
  if (p.id === "dr-nagy-albert") {
    return withSchemas(<DrNagyAlbertCaseStudy />);
  }

  // AI-Prompt.hu dedikált esettanulmány
  if (p.id === "ai-prompt-hu") {
    return withSchemas(<AiPromptCaseStudy />);
  }

  // Go-Box Kft. dedikált esettanulmány
  if (p.id === "go-box-kft") {
    return withSchemas(<GoBoxCaseStudy />);
  }

  // Leanperial — Quiet Luxury dedikált esettanulmány
  if (p.id === "leanperial") {
    return withSchemas(<LeanperialCaseStudy />);
  }

  // Nedel Market — WooCommerce & irodai szerver dedikált esettanulmány
  if (p.id === "nedelmarket") {
    return withSchemas(<NedelMarketCaseStudy />);
  }

  // Általános esettanulány layout
  return withSchemas(<GeneralCaseStudy project={p} />);
}
