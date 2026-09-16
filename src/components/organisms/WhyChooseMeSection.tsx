"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Award,
  Users,
  Zap,
  Shield,
  Clock,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Target,
  TrendingUp,
  Rocket,
  Heart,
} from "lucide-react";
import Link from "next/link";

const advantages = [
  {
    icon: Award,
    title: "26 Éves Tapasztalat",
    description:
      "Grafikai és 16 éves webfejlesztői rutinnal, amit csak a gyakorlat adhat.",
    color: "from-[#00B5F1]/20 to-[#5B21B6]/20",
    iconColor: "text-[#00B5F1]",
    stat: "26+",
    statLabel: "Év tapasztalat",
  },
  {
    icon: Users,
    title: "Közvetlen Kommunikáció",
    description: "Nincs projektmenedzser réteg - közvetlenül veled dolgozom.",
    color: "from-[#00B5F1]/20 to-[#5B21B6]/20",
    iconColor: "text-[#00B5F1]",
    stat: "1:1",
    statLabel: "Kommunikáció",
  },
  {
    icon: Zap,
    title: "Modern Tech Stack",
    description: "Next.js 16, React 19, TypeScript - jövőálló technológiák.",
    color: "from-[#00B5F1]/20 to-[#5B21B6]/20",
    iconColor: "text-[#00B5F1]",
    stat: "100%",
    statLabel: "Modern stack",
  },
  {
    icon: Shield,
    title: "30 Napos Garancia",
    description:
      "Átadást követően hibajavítási garancia és folyamatos támogatás.",
    color: "from-[#00B5F1]/20 to-[#5B21B6]/20",
    iconColor: "text-[#00B5F1]",
    stat: "30",
    statLabel: "Nap garancia",
  },
  {
    icon: Clock,
    title: "Gyors Átfutás",
    description:
      "Nincs bürokrácia, azonnali indulás és hatékony munkafolyamat.",
    color: "from-[#00B5F1]/20 to-[#5B21B6]/20",
    iconColor: "text-[#00B5F1]",
    stat: "2x",
    statLabel: "Gyorsabb",
  },
  {
    icon: MessageSquare,
    title: "Transzparens Árazás",
    description:
      "Rejtett költségek nélkül, előre egyeztetett árak és határidők.",
    color: "from-[#00B5F1]/20 to-[#5B21B6]/20",
    iconColor: "text-[#00B5F1]",
    stat: "0",
    statLabel: "Rejtett költség",
  },
];

const benefits = [
  {
    icon: Target,
    title: "Egyetlen Fókusz",
    description:
      "Nincs megosztott figyelem - 100%-ban a te projektedre koncentrálok.",
  },
  {
    icon: TrendingUp,
    title: "ROI Fókusz",
    description:
      "Nem csak szép weboldalt készítek, hanem olyan, ami konvertál és megtérül.",
  },
  {
    icon: Rocket,
    title: "Gyors Indulás",
    description:
      "Nincs hosszú onboarding - azonnal kezdjük a munkát, amint egyeztünk.",
  },
  {
    icon: Heart,
    title: "Szenvedély",
    description:
      "Minden projektben a szívemet-lelkemet belefektetem, nem csak egy munka.",
  },
];

export default function WhyChooseMeSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 md:py-32 bg-transparent relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B5F1]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00B5F1]/10 rounded-full blur-3xl" />

      <div className="px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B5F1]/10 border border-[#00B5F1]/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#00B5F1]" />
            <span className="text-xs font-bold text-[#00B5F1] uppercase tracking-wider">
              Miért engem válassz?
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Egy Ember,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
              Teljes Elkötelezettség
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Nem egy ügynökség vagyok, hanem egy dedikált szakértő, aki a te
            sikeredért dolgozik. Nincs projektmenedzser réteg, nincs rejtett
            költség - csak te és én, egy közös cél érdekében.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {advantages.map((advantage, idx) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href="/szolgaltatasok" className="block h-full">
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group h-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-3xl p-8 hover:border-[#00B5F1]/50 transition-all duration-500 shadow-xl shadow-slate-950/50 hover:shadow-[#00B5F1]/20 relative overflow-hidden"
                >
                  {/* Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-linear-to-br ${advantage.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-linear-to-br ${advantage.color} border border-white/10 flex items-center justify-center ${advantage.iconColor} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <advantage.icon className="w-8 h-8" />
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">
                          {advantage.stat}
                        </div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">
                          {advantage.statLabel}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00B5F1] transition-colors">
                      {advantage.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed grow">
                      {advantage.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-slate-900/60 border border-[#00B5F1]/20 rounded-3xl p-12 backdrop-blur-md relative overflow-hidden mb-12"
        >
          <div className="absolute inset-0 bg-linear-to-r from-[#00B5F1]/5 to-[#5B21B6]/5" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Ami Tényleg{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
                Megkülönböztet
              </span>
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center text-[#00B5F1] mx-auto mb-4">
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/szia-norbi-vagyok"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-slate-950 font-bold hover:shadow-lg hover:shadow-[#00B5F1]/30 transition-all duration-300 shadow-lg shadow-[#00B5F1]/20 hover:scale-105"
          >
            <span>Ismerj Meg Jobban</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
