"use client";

import { motion } from "motion/react";
import {
  Shield,
  Zap,
  Code,
  Database,
  Globe,
  Lock,
  CheckCircle,
} from "lucide-react";

interface TechnicalSpec {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefit: string;
}

interface TechnicalSpecSectionProps {
  productName: string;
  specs?: TechnicalSpec[];
}

const defaultSpecs: TechnicalSpec[] = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Fertőzésmentes Architektúra",
    description:
      "Statikus HTML alapú renderelés, amely kiküszöböli a szerveroldali sebezhetőségeket",
    benefit: "Biztonságos és gyors weboldal",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Lighthouse 95+ Score",
    description:
      "Scroll-trigger animációk, kéoptimalizáció és Next.js 16 App Router",
    benefit: "Kiváló teljesítmény és SEO",
  },
  {
    icon: <Code className="w-5 h-5" />,
    title: "Modern Tech Stack",
    description:
      "Next.js 16, React 19, TypeScript strict mode, Tailwind CSS v4",
    benefit: "Jövőálló és karbantartható kód",
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: "Firebase Security",
    description:
      "Firestore adatbázis és Authentication integráció biztonsági szabályokkal",
    benefit: "Skálázható és biztonságos backend",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Entity-based SEO",
    description: "JSON-LD Schema, AEO optimalizáció és strukturált adatok",
    benefit: "AI keresőmotorokban is látható",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "GDPR Kompatibilis",
    description:
      "Adatvédelmi szabályok betartása és cookie consent menedzsment",
    benefit: "Jogi megfelelés biztosítása",
  },
];

export default function TechnicalSpecSection({
  productName,
  specs = defaultSpecs,
}: TechnicalSpecSectionProps) {
  return (
    <section className="py-16 bg-bg-elevated/30 border-t border-brand-primary/10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Miért választják a WebDude-ot?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {productName} a 26 év design tapasztalat és a Next.js/Supabase
            technológia erejével kombinálva a legmagasabb szintű technikai
            biztonságot és teljesítményt nyújtja.
          </p>
        </motion.div>

        {/* Specs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bg-base/50 border border-brand-primary/10 rounded-xl p-6 hover:border-brand-primary/30 transition-all hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                  {spec.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {spec.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    {spec.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-emerald-500">
                    <CheckCircle className="w-3 h-3" />
                    <span className="font-medium">{spec.benefit}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Authority Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 bg-gradient-to-r from-brand-primary/10 to-transparent border border-brand-primary/20 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <Shield className="w-8 h-8 text-brand-primary" />
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                26 év tapasztalat a háttérben
              </h4>
              <p className="text-sm text-slate-400">
                Nem csak terméket adunk el, hanem technikai biztonságot. A
                WebDude.hu minden megoldása a gyakorlati tapasztalatunkon
                alapul, nem sablon-megoldások.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
