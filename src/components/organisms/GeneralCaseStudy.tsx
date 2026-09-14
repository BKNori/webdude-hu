"use client";

import Image from "next/image";
import Link from "next/link";
import { Work } from "@/types/work";

interface GeneralCaseStudyProps {
  project: Work;
}

export default function GeneralCaseStudy({ project }: GeneralCaseStudyProps) {
  return (
    <main className="min-h-screen bg-bg-base text-text-primary">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={
              project.bannerImage ||
              project.image ||
              "/assets/banners/pro-web-design.jpg"
            }
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-bg-base" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            {project.description}
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Projekt <span className="text-[#00B5F1]">Galéria</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-2xl overflow-hidden border border-slate-700"
                >
                  <Image
                    src={image}
                    alt={`${project.title} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-12">
            <div className="bg-bg-surface/50 border border-[#00B5F1]/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#00B5F1] mb-4">
                A Kihívás
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div className="bg-bg-surface/50 border border-[#00B5F1]/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#00B5F1] mb-4">
                A Megoldás
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {project.solution}
              </p>
            </div>
            <div className="bg-bg-surface/50 border border-[#00B5F1]/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#00B5F1] mb-4">
                Az Eredmény
              </h3>
              <div className="space-y-2">
                {project.results?.map((result, index) => (
                  <div key={index} className="text-slate-400">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Készen állsz a <span className="text-[#00B5F1]">következő</span>{" "}
            szintre?
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/kapcsolat"
              className="px-8 py-4 bg-[#00B5F1] hover:bg-[#0095C7] text-white font-bold rounded-full transition-all duration-300 hover:scale-105"
            >
              Ajánlatot kérek →
            </Link>
            <Link
              href="/munkak"
              className="px-8 py-4 border border-slate-600 hover:border-[#00B5F1] text-slate-400 hover:text-[#00B5F1] font-bold rounded-full transition-all duration-300"
            >
              Vissza a munkákhoz
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
