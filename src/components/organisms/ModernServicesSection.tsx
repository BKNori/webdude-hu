"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Globe,
  ShoppingBag,
  Bot,
  Search,
  Palette,
  Layout,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    title: "Weboldal Készítés",
    description:
      "Next.js 16 és React 19 alapú ultragyors, SEO-optimalizált weboldalak, amelyek konvertálnak és skálázhatóak.",
    icon: Globe,
    href: "/szolgaltatasok/weboldal-keszites",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    benefits: ["LCP < 2.5s", "SEO optimalizált", "Mobil-barát"],
  },
  {
    title: "Webshop Fejlesztés",
    description:
      "Skálázható e-kereskedelmi megoldások WooCommerce és Shopify integrációval, modern fizetési rendszerekkel.",
    icon: ShoppingBag,
    href: "/szolgaltatasok/webshop-fejlesztes",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    benefits: ["Konverzió-optimalizált", "Biztonságos fizetés", "Automatizált"],
  },
  {
    title: "AI Workflow Kialakítás",
    description:
      "AI automatizált munkafolyamatok, amelyek csökkentik a manuális munkát és növelik a hatékonyságot.",
    icon: Bot,
    href: "/szolgaltatasok/ai-workflow-kialakitas",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    benefits: ["300% hatékonyság", "24/7 működés", "Költségcsökkentés"],
  },
  {
    title: "SEO Optimalizálás",
    description:
      "Technikai SEO audit, Lighthouse optimalizálás, Schema.org JSON-LD implementáció és kulcsszó stratégia.",
    icon: Search,
    href: "/szolgaltatasok/seo-optimalizalas",
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
    benefits: ["95+ Lighthouse", "Google rangsor", "Organikus forgalom"],
  },
  {
    title: "Grafikai Tervezés",
    description:
      "Professzionális arculattervezés, logo design és vizuális identitás kialakítása a WebDude 26 éves tapasztalatával.",
    icon: Palette,
    href: "/szolgaltatasok/grafikai-tervezes",
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
    benefits: ["26 év tapasztalat", "Korlátlan revízió", "Brand identitás"],
  },
  {
    title: "Egyedi Arculattervezés",
    description:
      "Stratégiai márkaépítés, vizuális identitás és teljes körű design rendszer kialakítása.",
    icon: Layout,
    href: "/szolgaltatasok/egyedi-arculattervezes-logo",
    color: "from-[#00B5F1]/20 to-yellow-500/20",
    iconColor: "text-amber-400",
    benefits: ["Stratégiai tervezés", "Design rendszer", "Márkaépítés"],
  },
];

const stats = [
  { value: "300%", label: "Hatékonyság növekedés", icon: TrendingUp },
  { value: "95+", label: "Lighthouse pontszám", icon: Shield },
  { value: "24/7", label: "AI működés", icon: Clock },
  { value: "26", label: "Év tapasztalat", icon: CheckCircle },
];

export default function ModernServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 md:py-32 bg-transparent relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 via-transparent to-yellow-400/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

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
              Prémium Szolgáltatások
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            Modern Megoldások,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-[#0095C7]">
              Valós Eredmények
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Next.js 16, React 19 és AI automatizáció alapú megoldások, amelyek
            nem csak szépek, hanem konvertálnak. 26 év tapasztalat, egyetlen
            fókusszal: az üzleti eredményeid növelése.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-bg-surface/90 backdrop-blur-md border border-white/40 rounded-2xl p-6 text-center hover:border-[#00B5F1]/50 transition-all duration-300 shadow-xl shadow-slate-200/50"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#00B5F1]" />
              <div className="text-3xl font-bold text-text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredService(idx)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <Link href={service.href} className="block h-full">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group h-full bg-bg-surface/90 backdrop-blur-md border border-white/40 rounded-3xl p-8 hover:border-[#00B5F1]/50 transition-all duration-500 shadow-xl shadow-slate-200/50 hover:shadow-[#00B5F1]/20 relative overflow-hidden"
                >
                  {/* Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-linear-to-br ${service.color} border border-white/10 flex items-center justify-center ${service.iconColor} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <service.icon className="w-8 h-8" />
                      </div>
                      <motion.div
                        animate={{
                          x: hoveredService === idx ? 0 : -10,
                          opacity: hoveredService === idx ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-6 h-6 text-[#00B5F1]" />
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-[#00B5F1] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6 grow">
                      {service.description}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-2 mb-6">
                      {service.benefits.map((benefit) => (
                        <div
                          key={benefit}
                          className="flex items-center gap-2 text-xs text-slate-400"
                        >
                          <CheckCircle className="w-3 h-3 text-[#00B5F1]" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400/10 to-[#00B5F1]/10 border border-[#00B5F1]/20 text-[#00B5F1] text-sm font-bold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-[#0095C7] hover:text-white transition-all duration-300"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Részletek</span>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-bg-surface/90 backdrop-blur-xl border border-[#00B5F1]/20 rounded-3xl p-12 relative overflow-hidden shadow-xl shadow-slate-200/50">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-[#00B5F1]/5 to-yellow-400/5" />
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B5F1]/20 border border-[#00B5F1]/30 mb-6"
              >
                <Target className="w-4 h-4 text-[#00B5F1]" />
                <span className="text-xs font-bold text-[#00B5F1] uppercase tracking-wider">
                  Ingyenes Konzultáció
                </span>
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Készítsünk Együtt Valami
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-[#0095C7]">
                  {" "}
                  Hatalmasat
                </span>
              </h3>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
                Ingyenes 30 perces konzultáció, ahol feltérképezzük az
                igényeidet és kidolgozzuk a stratégiát. Nincs kötelezettség,
                csak érték.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/szolgaltatasok"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-[#0095C7] text-white font-bold hover:shadow-lg hover:shadow-[#00B5F1]/30 transition-all duration-300 shadow-lg shadow-[#00B5F1]/20 hover:scale-105"
                >
                  <span>Összes Szolgáltatás</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/kapcsolat"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-transparent border-2 border-[#00B5F1] text-[#00B5F1] font-bold hover:bg-[#00B5F1]/10 transition-all duration-300 hover:scale-105"
                >
                  <span>Ingyenes Konzultáció</span>
                  <Zap className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
