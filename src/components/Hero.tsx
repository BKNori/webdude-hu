"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";

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
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <section
      className={`relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0B1120] pt-32 pb-28 md:pb-36 ${fullHeight ? "min-h-screen flex items-center" : ""}`}
    >
      {/* Background video */}
      {videoBackground && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover ${noOverlay ? "opacity-100" : "opacity-60"}`}
            style={noOverlay ? {} : { mixBlendMode: "screen" }}
          >
            <source src={videoBackground} type="video/mp4" />
          </video>
          {!noOverlay && (
            <div className="absolute inset-0 bg-linear-to-b from-[#F8FAFC]/88 via-[#F8FAFC]/72 to-[#F1F5F9]/92 dark:from-[#0B1120]/85 dark:via-[#0B1120]/65 dark:to-[#0B1120]/90" />
          )}
        </div>
      )}

      {/* Background image — Dual Theme scrim (Luminous Daylight + Luminous Slate) */}
      {backgroundImage && !videoBackground && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover opacity-12 dark:opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#F8FAFC]/92 via-[#F8FAFC]/82 to-[#F1F5F9]/96 dark:from-[#0B1120]/90 dark:via-[#0B1120]/75 dark:to-[#0B1120]/95" />
          <div
            aria-hidden="true"
            className="absolute inset-0 dark:hidden"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(248, 250, 252, 0.88) 0%, transparent 80%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden dark:block"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(11, 17, 32, 0.78) 0%, transparent 80%)",
            }}
          />
        </div>
      )}

      {/* Tiszta CSS mesh grid & Aurora fényfoltok (WebGL nélkül) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-mesh opacity-40 z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-55 dark:opacity-100 z-0"
      >
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#00B5F1]/18 rounded-full blur-[110px]" />
        <div className="absolute -bottom-24 left-1/4 w-104 h-104 bg-[#7C3AED]/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 100, damping: 20 }
            }
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 shadow-2xs dark:shadow-none dark:bg-white/6 dark:border-white/15 dark:border-t-white/25 backdrop-blur-md">
              <span
                className="w-2 h-2 rounded-full bg-[#0369A1] dark:bg-[#00B5F1]"
                aria-hidden="true"
              />
              <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1]">{label}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading leading-tight text-[#0F172A] dark:text-white">
              {title}
            </h1>

            <div className="relative">
              <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-slate-700 dark:text-slate-200 text-balance">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 justify-center">
              {cta1 && cta1Link && (
                <Link
                  href={cta1Link}
                  className="px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white rounded-full font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] active:scale-95 transition-[transform,box-shadow,background-color] duration-300 shadow-[0_8px_28px_rgba(7,89,133,0.4)] min-h-11 min-w-11"
                >
                  {cta1}
                </Link>
              )}
              {cta2 && cta2Link && (
                <Link
                  href={cta2Link}
                  className="px-8 py-4 bg-white/90 border border-slate-300 text-slate-800 hover:border-[#0369A1]/60 hover:text-[#0369A1] hover:bg-sky-500/8 dark:bg-white/5 dark:border-white/15 dark:hover:border-[#00B5F1]/60 dark:text-slate-200 dark:hover:text-[#00B5F1] dark:hover:bg-[#00B5F1]/10 rounded-full font-semibold active:scale-95 transition-[background-color,border-color,color,transform] duration-300 min-h-11 min-w-11"
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
