"use client";

import Link from "next/link";
import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";

export interface BlogPostItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  coverImage?: string;
  readingTime?: string;
}

interface BlogGridProps {
  posts: BlogPostItem[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };

  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {posts.map((post) => (
        <motion.article
          key={post.slug}
          variants={cardVariants}
          whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
          className="group luminous-card relative flex flex-col p-6"
        >
          {post.coverImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-5 bg-slate-100 dark:bg-slate-950">
              <ResponsiveImage
                src={post.coverImage}
                alt={post.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-2 mb-3">
            {post.category && (
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
                {post.category}
              </span>
            )}
            <span className="text-xs text-[#475569] dark:text-slate-400">
              {new Date(post.date).toLocaleDateString("hu-HU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-white group-hover:text-[#0369A1] dark:group-hover:text-sky-400 transition-colors line-clamp-2 mb-3">
            <Link href={`/hirek/${post.slug}`} className="focus:outline-none">
              <span className="absolute inset-0 z-10" />
              {post.title}
            </Link>
          </h2>

          <p className="text-sm text-[#334155] dark:text-slate-300 line-clamp-3 mb-6 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1] pt-4 border-t border-slate-200/80 dark:border-slate-800/60">
            <span>Elolvasom</span>
            <span>{post.readingTime || "3 perc"} &rarr;</span>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
