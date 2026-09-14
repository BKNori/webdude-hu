"use client";

import React from "react";
import { motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";

interface BentoCardProps {
  title: string;
  description: string;
  metric?: string;
  highlight?: string;
  className?: string;
  children?: React.ReactNode;
  image?: StaticImageData | string;
  imageAlt?: string;
}

export default function BentoCard({
  title,
  description,
  metric,
  highlight,
  className = "",
  children,
  image,
  imageAlt,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-8 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-[#00B5F1]/50 hover:shadow-[0_18px_40px_rgba(0,181,241,0.2)] hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-[#00B5F1]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {image ? (
        <div className="absolute right-6 top-6 h-20 w-32 overflow-hidden rounded-lg opacity-90 group-hover:scale-110 transition-transform duration-300">
          {typeof image === "string" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={imageAlt || title}
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={image}
              alt={imageAlt || title}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      ) : null}

      <div className="relative z-10 space-y-5">
        {metric ? (
          <p className="text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#00B5F1] to-[#0095C7] group-hover:scale-110 transition-transform duration-300 tracking-tight">
            {metric}
          </p>
        ) : null}
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary group-hover:text-[#00B5F1] transition-colors duration-300 tracking-tight leading-tight">
          {title}
        </h3>
        <p className="text-base md:text-lg leading-relaxed text-slate-400 tracking-wide font-medium">
          {description}
        </p>
        {highlight ? (
          <p className="text-sm md:text-base font-semibold bg-clip-text text-transparent bg-linear-to-r from-[#00B5F1] to-[#0095C7] group-hover:from-[#0095C7] group-hover:to-[#007BA3] transition-colors duration-300 tracking-wide">
            {highlight}
          </p>
        ) : null}
        {children}
      </div>
    </motion.div>
  );
}
