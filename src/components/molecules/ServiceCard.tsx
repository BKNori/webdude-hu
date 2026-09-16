"use client";
import React from "react";
import { motion } from "motion/react";
import LucideIcon from "@/components/atoms/LucideIcon";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  icon?: string;
  description: string;
  tags?: string[];
  index?: number;
  href?: string;
}

export default function ServiceCard({
  title,
  icon,
  description,
  tags = [],
  index = 0,
  href,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: (index || 0) * 0.08 }}
      className="relative group h-full"
    >
      <div className="absolute inset-0 bg-[#00B5F1]/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 -z-10" />

      {href ? (
        <Link href={href} className="block">
          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-8 h-full flex flex-col shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-[#00B5F1]/50 hover:shadow-[0_18px_40px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center group-hover:border-[#00B5F1]/50 transition-colors">
                {icon && (
                  <LucideIcon name={icon} className="w-6 h-6 text-[#00B5F1]" />
                )}
              </div>
              <h3 className="text-text-primary text-lg font-semibold">
                {title}
              </h3>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed flex-1">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-bold text-[#00B5F1] border border-slate-700 bg-slate-800/50 px-3 py-1 rounded-full group-hover:border-[#00B5F1]/50 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ) : (
        <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-8 h-full flex flex-col shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-[#00B5F1]/50 hover:shadow-[0_18px_40px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center group-hover:border-[#00B5F1]/50 transition-colors">
              {icon && (
                <LucideIcon name={icon} className="w-6 h-6 text-[#00B5F1]" />
              )}
            </div>
            <h3 className="text-text-primary text-lg font-semibold">{title}</h3>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed flex-1">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs font-bold text-[#00B5F1] border border-slate-700 bg-slate-800/50 px-3 py-1 rounded-full group-hover:border-[#00B5F1]/50 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
