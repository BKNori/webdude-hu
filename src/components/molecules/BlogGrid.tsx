"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function BlogGrid({ posts }: BlogGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {posts.map((post) => (
        <motion.article
          key={post.slug}
          variants={cardVariants}
          whileHover={{ y: -4, scale: 1.01 }}
          className="group relative flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-xl transition-colors hover:border-amber-500/40"
        >
          {post.coverImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-5 bg-slate-950">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-2 mb-3">
            {post.category && (
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                {post.category}
              </span>
            )}
            <span className="text-xs text-slate-400">
              {new Date(post.date).toLocaleDateString("hu-HU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-3">
            <Link href={`/hirek/${post.slug}`} className="focus:outline-none">
              <span className="absolute inset-0 z-10" />
              {post.title}
            </Link>
          </h2>

          <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-amber-500 pt-4 border-t border-slate-800/60">
            <span>Elolvasom</span>
            <span>{post.readingTime || "3 perc"} &rarr;</span>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
