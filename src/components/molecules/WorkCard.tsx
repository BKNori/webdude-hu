"use client";

import Link from "next/link";
import Image from "next/image";
import { Work } from "@/types/work";
import { motion } from "motion/react";

interface WorkCardProps {
  work: Work;
}

export default function WorkCard({ work }: WorkCardProps) {
  const categoryColors = {
    weboldal: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    webshop: "bg-green-500/10 text-green-500 border-green-500/20",
    arculat: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    grafika: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    branding: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/munkak/${work.slug}`} className="block h-full">
        <div className="glass-card glass-card-hover border border-white/5 overflow-hidden h-full flex flex-col">
          {/* Image placeholder */}
          <div className="aspect-video bg-linear-to-br from-bg-elevated to-bg-base relative overflow-hidden">
            {work.image ? (
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl font-black text-bg-elevated/30">
                  {work.title.charAt(0)}
                </span>
              </div>
            )}
            {work.featured && (
              <div className="absolute top-4 right-4 bg-amber-500 text-bg-base px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Kiemelt
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${categoryColors[work.category]}`}
              >
                {work.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-2">
              {work.title}
            </h3>

            <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
              {work.description}
            </p>

            {work.tags && work.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto">
                {work.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-400 bg-transparent border border-white/5 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
