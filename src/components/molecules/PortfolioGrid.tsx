"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Work } from "@/types/work";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client?: string;
  category: string;
  kpiHighlight?: string;
  description: string;
  coverImage: string;
  isFeatured?: boolean;
}

interface PortfolioGridProps {
  projects: Work[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  // Konvertálás ProjectItem típusra
  const projectItems: ProjectItem[] = projects.map((project) => ({
    id: project.id || project.slug,
    slug: project.slug,
    title: project.title,
    client: project.client,
    category: project.category,
    kpiHighlight: project.results?.[0] || project.description,
    description: project.description,
    coverImage: project.image || "/assets/banners/pro-web-design.jpg",
    isFeatured: project.featured || false,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {projectItems.map((project, index) => {
        const isSpanned = project.isFeatured || index === 0;

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className={`group relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between transition-colors hover:border-[#00B5F1]/40 ${
              isSpanned ? "md:col-span-2" : "col-span-1"
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#00B5F1]">
                  {project.category}
                </span>
                {project.kpiHighlight && (
                  <div className="text-right">
                    <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Eredmény
                    </span>
                    <span className="text-sm md:text-base font-bold text-[#00B5F1]">
                      {project.kpiHighlight}
                    </span>
                  </div>
                )}
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-6 bg-slate-950">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes={
                    isSpanned
                      ? "(max-width: 1200px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-[#00B5F1] transition-colors mb-2">
                <Link
                  href={`/munkak/${project.slug}`}
                  className="focus:outline-none"
                >
                  <span className="absolute inset-0 z-10" />
                  {project.title}
                </Link>
              </h3>

              <p className="text-sm text-slate-400 line-clamp-2 mb-6">
                {project.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-xs font-semibold uppercase tracking-wider text-[#00B5F1]">
              <span>Esettanulmány megtekintése</span>
              <span>&rarr;</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
