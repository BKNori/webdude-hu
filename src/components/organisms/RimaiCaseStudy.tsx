"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Work } from "@/types/work";

interface RimaiCaseStudyProps {
  project: Work;
}

export default function RimaiCaseStudy({ project }: RimaiCaseStudyProps) {
  return (
    <main className="min-h-screen bg-[#020617] text-[#e2e8f0]">
      {/* Hero Szekció - 100vh */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/portfolio/Rimai/rimai-3d-glass-window-logo-mockup-copy.webp"
            alt="Rimai Útépítő Kft. 3D Logo Mockup"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#020617]" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full">
              <span className="text-sky-400 text-xs font-bold uppercase tracking-wider">
                {project.year} – {project.category}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              {project.title}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              {project.description}
            </p>

            {/* Statisztikák */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-sky-500/20 rounded-2xl p-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-sky-400 mb-2">100%</div>
                <div className="text-sm text-slate-400">Autonómia</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-sky-500/20 rounded-2xl p-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-sky-400 mb-2">0-ról</div>
                <div className="text-sm text-slate-400">Felépítve</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-sky-500/20 rounded-2xl p-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-sky-400 mb-2">360°</div>
                <div className="text-sm text-slate-400">Arculattervezés</div>
              </motion.div>
            </div>

            {project.website && (
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-black font-bold rounded-full transition-all duration-300 hover:scale-105"
              >
                Megtekintés →
              </motion.a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Branding / Arculat Szekció - Bento Box Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-sky-400">Arculat</span> és Branding
            </h2>
            <p className="text-slate-400 text-lg">
              A fizikai és digitális arculat egységes megjelenítése
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 relative aspect-[2/1] rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              <Image
                src="/assets/portfolio/Rimai/Rimai-Arculat-1.webp"
                alt="Rimai Névjegykártyák"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold text-lg">Névjegykártyák</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative aspect-square rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              <Image
                src="/assets/portfolio/Rimai/rimai-fal-1-scaled.webp"
                alt="Rimai Irodai Logó"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold text-lg">Irodai Logó</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-[2/1] rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              <Image
                src="/assets/portfolio/Rimai/Rimai-poszter-copy-scaled.webp"
                alt="Rimai Autó Dekoráció"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold text-lg">Autó Dekoráció</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fejlesztés és Tartalom Szekció */}
      <section className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-sky-400">Fejlesztés</span> és Tartalom
            </h2>
            <p className="text-slate-400 text-lg">
              Modern WordPress rendszer és marketing-fókuszú szövegírás
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-slate-900/50 border border-sky-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-sky-400 mb-4">A Kihívás</h3>
                <p className="text-slate-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div className="bg-slate-900/50 border border-sky-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-sky-400 mb-4">A Megoldás</h3>
                <p className="text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden group">
                <Image
                  src="/assets/portfolio/Rimai/Rimai-aszfaltra-irva-copy copy.webp"
                  alt="Rimai Aszfaltra Írt"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden group">
                <Image
                  src="/assets/portfolio/Rimai/Rimai-utepites-csatornazas.webp"
                  alt="Rimai Útépítés Csatornázás"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Galéria / Hangulat Szekció */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-sky-400">Galéria</span> és Hangulat
            </h2>
            <p className="text-slate-400 text-lg">
              Építőipari gépek és munkagépek grafikái
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-2xl overflow-hidden group"
            >
              <Image
                src="/assets/portfolio/Rimai/Rimai-poszter-rgb.webp"
                alt="Rimai Poszter RGB"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative aspect-square rounded-2xl overflow-hidden group"
            >
              <Image
                src="/assets/portfolio/Rimai/excavator-utepites-rimai-kecskemet-copy.webp"
                alt="Excavator Útépítés"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square rounded-2xl overflow-hidden group"
            >
              <Image
                src="/assets/portfolio/Rimai/Rimai-melyepites-copy (1).webp"
                alt="Rimai Mélyépítés"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eredmények Szekció */}
      <section className="py-24 px-6 bg-gradient-to-br from-sky-500/10 to-orange-500/10 border-y border-sky-500/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-12">
              <span className="text-sky-400">Az Eredmény</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {project.results?.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-sm border border-sky-500/20 rounded-2xl p-6"
                >
                  <div className="text-sky-400 font-bold text-lg mb-2">
                    {result}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Ez a projekt tökéletes példája annak, amikor a műszaki precizitás (fejlesztés, szerver) és a kreatív vízió (grafika, arculat, szövegírás) egy kézben összpontosul, kompromisszummentes minőséget eredményezve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Szekció */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold">
              Készen állsz a{" "}
              <span className="text-sky-400">következő</span> szintre?
            </h2>
            <p className="text-slate-400 text-lg">
              Hogyan tudnám a te vállalkozásodat is a digitális élvonalba repíteni?
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/kapcsolat"
                className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-black font-bold rounded-full transition-all duration-300 hover:scale-105"
              >
                Ajánlatot kérek →
              </Link>
              <Link
                href="/munkak"
                className="px-8 py-4 border border-slate-600 hover:border-sky-500 text-slate-300 hover:text-sky-400 font-bold rounded-full transition-all duration-300"
              >
                Vissza a munkákhoz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
