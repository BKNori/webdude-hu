"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import GeometricIcon from "@/components/atoms/GeometricIcon";
import { useMotionPreset } from "@/hooks/useMotionPreset";

export default function AboutSection() {
  const motionPreset = useMotionPreset();

  return (
    <section className="py-24 md:py-32 bg-bg-surface border-t border-slate-800">
      <div className="px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={motionPreset}
        >
          <GeometricIcon type="circle" size={32} color="text-amber-500" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left column — quote + details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              ...motionPreset,
              delay: motionPreset.duration === 0 ? 0 : 0.4,
            }}
            className="space-y-8"
          >
            {/* Stílusos idézetblokk */}
            <blockquote className="relative pl-6 py-4">
              {/* Arany bal szegély */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-linear-to-b from-amber-400 to-amber-600"
              />
              <p className="text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold tracking-tight text-text-primary leading-tight">
                Nem egy ügynökség vagyok.{" "}
                <span className="text-amber-500">Én vagyok a WebDude.</span>
              </p>
            </blockquote>

            <p className="text-slate-400 text-base leading-relaxed">
              26 évvel ezelőtt szerettem bele a digitális alkotásba. Azóta a
              technológia rengeteget változott, de a célom ugyanaz maradt:
              maradandót alkotni.
            </p>

            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <span
                  className="text-amber-500 font-bold mt-0.5"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>
                  Kecskemétről dolgozom, de az egész országból vannak elégedett
                  ügyfeleim.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="text-amber-500 font-bold mt-0.5"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>
                  Személyes kapcsolat és közvetlen kommunikáció a sikeres
                  projekt alapja.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="text-amber-500 font-bold mt-0.5"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>
                  Amikor velem dolgozol, nem egy projektmenedzserrel beszélsz,
                  hanem közvetlenül velem.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="text-amber-500 font-bold mt-0.5"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>
                  Én tervezem, kódolom és valósítom meg az elképzelésedet –
                  hatékonyan, sallangok nélkül.
                </span>
              </li>
            </ul>

            <div>
              <Button variant="primary" href="/szia-norbi-vagyok">
                Ismerj meg jobban
              </Button>
            </div>
          </motion.div>

          {/* Right column — photo with premium glass frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              ...motionPreset,
              delay: motionPreset.duration === 0 ? 0 : 0.6,
            }}
            className="relative"
          >
            {/* Glow háttér */}
            <div className="absolute -inset-4 bg-amber-500/5 rounded-[3rem] blur-2xl z-0" />
            {/* Glassmorphism keret */}
            <div className="relative z-10 rounded-[2.5rem] border border-amber-500/20 bg-slate-900/80 backdrop-blur-md p-5 shadow-[0_40px_120px_rgba(0,0,0,0.5)] w-full max-w-md mx-auto">
              <div className="aspect-square overflow-hidden rounded-4xl border border-slate-700 bg-transparent relative">
                <Image
                  src="/assets/personal/Webdude_old_fashion.webp"
                  alt="Norbi - WebDude"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  priority
                />
              </div>
              {/* Felirat a kép alatt */}
              <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.3em] text-amber-500/70">
                Norbi • WebDude • Kecskemét
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
