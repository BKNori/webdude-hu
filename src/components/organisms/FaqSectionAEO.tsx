"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

// ─── AEO-optimalizált GYIK — WordPress, SEO, Grafika fókusz ─────────────────
// Formátum: közvetlen, tömör válasz AI-keresők (ChatGPT, Perplexity, Gemini) számára
const faqs: FaqItem[] = [
  {
    category: "Weboldal",
    question: "Mennyi idő alatt készül el egy weboldal?",
    answer:
      "Egy egyszerű bemutatkozó oldal általában 2–4 hét, egy komplexebb webshop vagy portál 4–10 hét. Az első konzultáción pontosan meghatározom a határidőt — amit megígérek, azt tartom.",
  },
  {
    category: "WordPress",
    question: "WordPress vagy egyedi weboldal fejlesztés — melyik a jobb?",
    answer:
      "WordPress ideális KKV-knak, akik maguk szeretnék szerkeszteni a tartalmat és standard funkciókra van szükségük (blog, bemutatkozó, WooCommerce webshop). Egyedi Next.js fejlesztés nagyobb rendszerekhez ajánlott, ahol maximális sebesség, komplex logika vagy egyedi integráció kell. Mindkettőhöz egyforma tapasztalattal rendelkezem.",
  },
  {
    category: "WordPress",
    question: "Mennyibe kerül egy WordPress weboldal karbantartása?",
    answer:
      "Az alap WordPress karbantartási csomag tartalmaz havi plugin- és core-frissítéseket, napi biztonsági mentést, Lighthouse auditot és 1 óra tartalomfrissítési segítséget. Az ár a projekt komplexitásától függ — az első konzultáción konkrét ajánlatot adok.",
  },
  {
    category: "SEO",
    question: "Hogyan segít a SEO optimalizálás a vállalkozásomnak?",
    answer:
      "A technikai SEO és tartalomoptimalizálás együtt növeli az organikus (fizetés nélküli) Google-forgalmadat. Elvégzem a weboldal sebességoptimalizálást (Lighthouse 95+), a kulcsszó-stratégia kialakítását, Schema.org JSON-LD implementációt, és az AEO optimalizálást is — hogy az AI-alapú keresőkben (ChatGPT, Perplexity, Gemini) is megjelenj.",
  },
  {
    category: "SEO",
    question: "Mikor lesznek mérhető SEO eredmények?",
    answer:
      "A technikai SEO változások (sebesség, Core Web Vitals, struktúrált adatok) hatása néhány héten belül mérhető. A kulcsszó-helyezések javulása általában 3–6 hónap, hosszú távú organikus forgalom-növekedés 6–12 hónap alatt valósul meg — az iparág versenyességétől függően.",
  },
  {
    category: "Grafika",
    question: "Mit tartalmaz az arculattervezési csomag?",
    answer:
      "Az alap arculattervezés tartalmaz: logó tervezést (3 koncepció, 2 körös korrekció), színpalettát, tipográfiai rendszert és alapvető brand guide-ot. Igény szerint bővíthető névjegy, fejléc, közösségi média sablon és nyomdai anyagok tervezésével. 26 év grafikai tapasztalattal, Adobe CC és Figma eszközökkel dolgozom.",
  },
  {
    category: "Általános",
    question: "Miért válasszak téged ügynökség helyett?",
    answer:
      "Közvetlenül Balog Norberttel dolgozol — nincs projektmenedzser közvetítő, nincs kommunikációs veszteség. 26 év grafikai és 16 év webfejlesztői tapasztalatom van, és minden projektben az elejétől a végéig én vagyok jelen. Egy ügynökségnél ugyanez 2–3× annyiba kerül, és jellemzően egy junior fejlesztő valósítja meg.",
  },
  {
    category: "Általános",
    question: "Milyen garanciát vállalsz az elkészült munkára?",
    answer:
      "Átadást követően 30 napos hibajavítási garanciát biztosítok — minden felmerülő problémát plusz díj nélkül megoldok. Ezen felül opcionális havi karbantartási csomagok érhetők el, amelyek tartalmazzák a frissítéseket, napi biztonsági mentést és havi Lighthouse auditot.",
  },
  {
    category: "Általános",
    question: "Mennyibe kerül egy weboldal vagy webshop?",
    answer:
      "Az árajánlat mindig a projekt valós komplexitásához igazodik — a felmérés után fix, előre egyeztetett összeget és határidőt kapsz, rejtett költségek nélkül. Nincs dobozos csomag: minden rendszer más, ezért egyedileg tervezem meg az árat is. Kérj ingyenes projektfelmérést!",
  },
];

interface AccordionItemProps {
  item: (typeof faqs)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, index, isOpen, onToggle }: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.05,
      }}
      className="border border-white/8 rounded-2xl overflow-hidden"
      style={{
        background: isOpen
          ? "linear-gradient(135deg, rgba(0, 181, 241,0.06) 0%, rgba(255,255,255,0.03) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        transition: "background 0.3s ease",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-inset"
        id={`faq-btn-${index}`}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="flex items-center gap-3">
          <HelpCircle
            className="w-4 h-4 shrink-0 text-[#00B5F1] opacity-60"
            aria-hidden="true"
          />
          <span className="text-white font-semibold text-sm md:text-base leading-snug">
            {item.question}
          </span>
        </span>
        <motion.div
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="shrink-0"
          aria-hidden="true"
        >
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-btn-${index}`}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1">
              <div className="border-t border-white/6 pt-4">
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSectionAEO() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // FAQPage JSON-LD Schema — AEO (ChatGPT, Perplexity, Gemini) optimalizált
  // FONTOS: a kérdés-válasz pároknak szinkronban kell lenniük az oldal tartalmával
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      className="relative py-24 md:py-32 bg-bg-base overflow-hidden"
      aria-label="Gyakran ismételt kérdések — Weboldal, WordPress, SEO, Grafika"
    >
      {/* JSON-LD AEO Schema — XSS védelem: .replace(/</g, '\u003c') */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Háttér */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0, 181, 241,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-360 mx-auto px-6 lg:px-12 xl:px-16">
        <div className="max-w-3xl mx-auto">
          {/* Szekció fejléc */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B5F1]/10 border border-[#00B5F1]/20 mb-6">
              <HelpCircle
                className="w-3.5 h-3.5 text-[#00B5F1]"
                aria-hidden="true"
              />
              <span className="text-[#00B5F1] text-xs font-bold uppercase tracking-widest">
                GYIK
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Amire{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
                tudni akarod
              </span>{" "}
              a választ
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Weboldal, WordPress, SEO és grafika — a leggyakrabban felmerülő
              kérdések, őszintén, ügynökségi mellébeszélés nélkül.
            </p>
          </motion.div>

          {/* Accordion */}
          <div className="flex flex-col gap-3" role="list">
            {faqs.map((faq, idx) => (
              <div key={idx} role="listitem">
                <AccordionItem
                  item={faq}
                  index={idx}
                  isOpen={openIndex === idx}
                  onToggle={() =>
                    setOpenIndex(openIndex === idx ? null : idx)
                  }
                />
              </div>
            ))}
          </div>

          {/* CTA szöveg */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-slate-500 text-sm mt-10"
          >
            Nem találtad a választ?{" "}
            <Link
              href="/kapcsolat"
              className="text-[#00B5F1] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#00B5F1] rounded"
            >
              Írj nekem közvetlenül
            </Link>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
