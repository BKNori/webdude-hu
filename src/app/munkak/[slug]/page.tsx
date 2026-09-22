import { works } from "@/data/works";
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

  // Rimai Útépítő Kft. dedikált esettanulmány
  if (p.id === "rimai-utepito") {
    return <RimaiCaseStudy project={p} />;
  }

  // Bor és Garnéla dedikált esettanulmány
  if (p.id === "bor-es-garnela") {
    return <BorGarnelaCaseStudy project={p} />;
  }

  // HU-MÁGÓ Kft. dedikált esettanulmány
  if (p.id === "hu-mago-kft") {
    return <HuMagoCaseStudy project={p} />;
  }

  // Classi-Co Kft. dedikált esettanulmány
  if (p.id === "classi-co") {
    return <ClassiCoCaseStudy project={p} />;
  }

  // BTShop dedikált esettanulmány
  if (p.id === "btshop") {
    return <BtshopCaseStudy project={p} />;
  }

  // Lengyel Helga dedikált esettanulmány
  if (p.id === "lengyel-helga") {
    return <LengyelHelgaCaseStudy />;
  }

  // Dr. Nagy Albert dedikált esettanulmány
  if (p.id === "dr-nagy-albert") {
    return <DrNagyAlbertCaseStudy />;
  }

  // AI-Prompt.hu dedikált esettanulmány
  if (p.id === "ai-prompt-hu") {
    return <AiPromptCaseStudy />;
  }

  // Go-Box Kft. dedikált esettanulmány
  if (p.id === "go-box-kft") {
    return <GoBoxCaseStudy />;
  }

  // Általános esettanulány layout
  return <GeneralCaseStudy project={p} />;
}
