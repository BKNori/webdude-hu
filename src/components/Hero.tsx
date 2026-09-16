"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

interface HeroProps {
  title?: React.ReactNode;
  subtitle?: string;
  label?: string;
  cta1?: string;
  cta1Link?: string;
  cta2?: string;
  cta2Link?: string;
  fullHeight?: boolean;
  backgroundImage?: string;
  videoBackground?: string;
  noOverlay?: boolean;
}

export default function Hero({
  title = "Weboldalak, amelyek eladnak",
  subtitle = "Modern design • Next.js 16 • AI integráció • Digitális arculat",
  label = "Digitális Kiválóság",
  cta1,
  cta1Link,
  cta2,
  cta2Link,
  fullHeight = false,
  backgroundImage,
  noOverlay = false,
  videoBackground,
}: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-transparent pt-32 pb-40 ${fullHeight ? "min-h-screen flex items-center" : ""}`}
    >
      {/* Background video */}
      {videoBackground && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover ${noOverlay ? "opacity-100" : "opacity-50"}`}
            style={noOverlay ? {} : { mixBlendMode: "screen" }}
          >
            <source src={videoBackground} type="video/mp4" />
          </video>
          {!noOverlay && (
            <div className="absolute inset-0 bg-linear-to-r from-bg-base via-bg-base/70 to-bg-base/60" />
          )}
        </div>
      )}

      {/* Background image */}
      {backgroundImage && !videoBackground && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-900/60 to-slate-950/80" />
        </div>
      )}

      {/* Background radial glow elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none z-0">
        <div className="absolute top-20 right-20 w-100 h-100 bg-[#00B5F1]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-40 w-112.5 h-112.5 bg-[#5B21B6]/10 rounded-full blur-[140px] animate-pulse delay-700" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="inline-block relative pl-6">
              <span className="text-xs uppercase font-black tracking-[0.4em] text-[#00B5F1] mb-2 block">
                {label}
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-[#00B5F1]" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans leading-tight tracking-tight text-text-primary">
              {title}
            </h1>

            <div className="relative">
              <p className="text-lg md:text-xl max-w-lg mx-auto leading-relaxed text-slate-400">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 justify-center">
              {cta1 && cta1Link && (
                <Link
                  href={cta1Link}
                  className="px-8 py-4 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-slate-950 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform duration-300 shadow-[0_0_20px_rgba(0, 181, 241,0.3)] min-h-11 min-w-11"
                >
                  {cta1}
                </Link>
              )}
              {cta2 && cta2Link && (
                <Link
                  href={cta2Link}
                  className="px-8 py-4 bg-transparent border-2 border-[#00B5F1] text-[#00B5F1] hover:bg-[#00B5F1]/10 rounded-full font-bold active:scale-95 transition-all duration-300 min-h-11 min-w-11"
                >
                  {cta2}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
