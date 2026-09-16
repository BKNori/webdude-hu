"use client";

import { motion } from "motion/react";
import ScrollVideoHero from "@/components/organisms/ScrollVideoHero";

export default function PortfolioHero() {
  return (
    <ScrollVideoHero
      videoSrc="/webdude-websites-promo.mp4"
      scrollHeight={120}
    >
      {/* Content overlay - WoW effect with dramatic entrance */}
      <div className="text-center space-y-8 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/80 backdrop-blur-xl border border-[#00B5F1]/30 shadow-[0_0_40px_rgba(0, 181, 241,0.3)]"
        >
          <span className="text-sm font-bold text-[#00B5F1] uppercase tracking-widest">
            Referenciák
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black font-sans text-white leading-tight tracking-tight"
        >
          Eredmények, nem csak{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic pr-4">
            Dizájn
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed"
        >
          Minden projekt egy egyedi kihívás, amire kreatív és technológiai
          választ adtam. Nézd meg a sikertörténeteket!
        </motion.p>

        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/kapcsolat"
          className="inline-block px-10 py-5 bg-[#00B5F1] hover:bg-[#5B21B6] text-slate-950 rounded-full font-bold text-lg shadow-[0_8px_24px_rgba(0, 181, 241,0.2)] hover:shadow-[0_18px_40px_rgba(0, 181, 241,0.3)] transition-all duration-300"
        >
          Kapcsolat →
        </motion.a>
      </div>
    </ScrollVideoHero>
  );
}
