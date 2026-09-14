import { works } from "@/data/works";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import RimaiCaseStudy from "@/components/organisms/RimaiCaseStudy";
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

  // Általános esettanulány layout
  return <GeneralCaseStudy project={p} />;
}
