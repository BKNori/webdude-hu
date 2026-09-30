import { works } from "@/data/works";
import { CASE_STUDY_SEO } from "@/data/caseStudySeo";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import RimaiCaseStudy from "@/components/organisms/RimaiCaseStudy";
import BorGarnelaCaseStudy from "@/components/organisms/BorGarnelaCaseStudy";
import HuMagoCaseStudy from "@/components/organisms/HuMagoCaseStudy";
import ClassiCoCaseStudy from "@/components/organisms/ClassiCoCaseStudy";
import BtshopCaseStudy from "@/components/organisms/BtshopCaseStudy";
import LengyelHelgaCaseStudy from "@/components/organisms/LengyelHelgaCaseStudy";
import DrNagyAlbertCaseStudy from "@/components/organisms/DrNagyAlbertCaseStudy";
import AiPromptCaseStudy from "@/components/organisms/AiPromptCaseStudy";
import GoBoxCaseStudy from "@/components/organisms/GoBoxCaseStudy";
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

  // 7.12.0: a normalizált route-ok gazdag SEO-adatai (korábban önálló
  // route mappákban éltek) — prioritás a CASE_STUDY_SEO tábla. E nélkül a
  // canonical, a keywords és a JSON-LD sémák elvesznének.
  const seoOverride = CASE_STUDY_SEO[slug];
  if (seoOverride) return seoOverride.metadata;

  return {
    title: `${project.title} – WebDude Portfólió`,
    description: project.description,
    keywords: project.tags,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const p = await getProject(slug);

  if (!p) notFound();

  // 7.12.0: a normalizált route-ok JSON-LD sémái (korábban az önálló
  // route mappák page/layout szintjén éltek). A metadata API nem tud
  // strukturált adatot, ezért a sémákat itt rendereljük, szerveroldalon,
  // XSS-védett formában — Client Componentbe soha nem kerülhetnek.
  const schemas = CASE_STUDY_SEO[slug]?.schemas ?? [];

  // Egy dedikált esettanulmány + az esetleges JSON-LD sémái egyetlen
  // fragmentben. Üres sémalista esetén csak a komponens renderelődik.
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

  // Általános esettanulány layout
  return withSchemas(<GeneralCaseStudy project={p} />);
}
