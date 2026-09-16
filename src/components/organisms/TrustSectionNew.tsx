"use client";

import React from "react";
import { motion } from "motion/react";

const trustLogos = [
  { name: "Next.js", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Firebase", icon: "🔥" },
  { name: "WordPress", icon: "📝" },
  { name: "WooCommerce", icon: "🛒" },
  { name: "OpenAI", icon: "🤖" },
];

export default function TrustSectionNew() {
  return (
    <section className="relative py-24 bg-[#0f172a] border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-5 py-2.5 rounded-full bg-sky-500/10 text-sky-500 text-sm font-bold tracking-[0.2em] uppercase mb-5 leading-none">
            Technológiák
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#e2e8f0] tracking-tight leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Amivel dolgozom
          </h2>
        </motion.div>

        {/* Premium Monochrome Logo Strip - wow hover effektek */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {trustLogos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{
                scale: 1.15,
                y: -5,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              }}
              className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-slate-900/80 border border-slate-700 shadow-[0_4px_12px_rgba(15,23,42,0.3)] hover:shadow-[0_20px_40px_rgba(0, 181, 241,0.2)] hover:border-sky-500/50 transition-all duration-300 cursor-default group"
            >
              <motion.span
                className="text-3xl md:text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-300"
                whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {logo.icon}
              </motion.span>
              <span className="text-base md:text-lg font-semibold text-slate-400 group-hover:text-sky-500 transition-colors duration-300 tracking-wide">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
