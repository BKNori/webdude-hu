"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  background: string;
}

interface AIHeroSliderProps {
  slides: HeroSlide[];
}

export default function AIHeroSlider({ slides }: AIHeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev: number) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev: number) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            currentSlide === index && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.background}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-slate-900/60" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center py-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center space-y-8"
                  >
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-4xl md:text-6xl font-bold text-white leading-tight"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-lg text-slate-200 max-w-3xl mx-auto"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Link
                        href={slide.ctaLink}
                        target={
                          slide.ctaLink.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          slide.ctaLink.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="inline-flex items-center gap-2 px-10 py-5 bg-[#00B5F1] hover:bg-[#5B21B6] text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-lg shadow-[#00B5F1]/25"
                      >
                        {slide.cta}
                        <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-[#00B5F1]/20 transition-colors border border-[#00B5F1]/30"
      >
        <ChevronLeft className="w-6 h-6 text-white" strokeWidth={1.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-[#00B5F1]/20 transition-colors border border-[#00B5F1]/30"
      >
        <ChevronRight className="w-6 h-6 text-white" strokeWidth={1.5} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-[#00B5F1] w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
