"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Mennyi idő alatt készül el egy weboldal?",
    answer:
      "Egy egyszerű bemutatkozó oldal általában 1–3 hét, egy komplexebb webshop vagy portál 4–12 hét. Az első konzultáción pontosan meghatározzuk a határidőt — amit megígérek, azt tartom.",
  },
  {
    question: "Mennyibe kerül egy weboldal vagy webshop?",
    answer:
      "Az árak a projekt komplexitásától függenek. Egy bemutatkozó oldal 300.000–600.000 Ft, egy e-commerce webshop 800.000–2.000.000 Ft között indul. A munkakezdéshez 30% előleget kérek, a fennmaradó összeg átadáskor esedékes. Kérj személyre szabott ajánlatot!",
  },
  {
    question: "Miért válasszak téged ügynökség helyett?",
    answer:
      "Közvetlenül velem dolgozol — nincs projektmenedzser közvetítő, nincs kommunikációs veszteség. Grafikai és webfejlesztési tapasztalatom 26+, ill. 16+ év, és minden projektben az elejétől a végéig én vagyok jelen. Az ügynökségeknél ugyanez 2-3x annyiba kerül, és egy junior fejlesztő valósítja meg.",
  },
  {
    question: "Segítesz az AI automatizáció bevezetésében is?",
    answer:
      "Igen — OpenAI GPT-4, Groq API és egyedi LLM integrációkat készítek. Legyen szó AI chatbotról, automatizált e-mail marketing-ről, CRM integrációról vagy tartalom-generálásról, megvalósítom és betanítom a rendszert.",
  },
  {
    question: "Milyen garanciát vállalsz az elkészült munkára?",
    answer:
      "Átadást követően 30 napos hibajavítási garanciát biztosítok. Ezen felül opcionális havi karbantartási csomagokat kínálok, amelyek tartalmazzák a szoftverfrissítéseket, napi biztonsági mentést és havi Lighthouse auditot.",
  },
  {
    question: "Milyen technológiákat használsz?",
    answer:
      "Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4, Firebase Firestore/Auth/Storage, és motion/react animációk. Minden oldal Server-Side Rendering vagy ISR stratégiával épül, ami garantálja a gyorsaságot és az SEO-t.",
  },
  {
    question: "Hogyan optimalizálod a weboldalt SEO és AEO szempontból?",
    answer:
      "Technikai SEO audit, Lighthouse 95+ optimalizálás, Schema.org JSON-LD implementáció (LocalBusiness, FAQPage, Person), strukturált tartalom AI keresőknek (ChatGPT, Perplexity, Gemini), és Core Web Vitals optimalizálás (LCP < 2.5s, CLS < 0.1).",
  },
  {
    question: "Van-e referenciád hasonló projektekre?",
    answer:
      "Igen, a /munkak oldalon megtekintheted a legfrissebb projekteket. Például a btshop.hu webshop +40% konverziónövekedést ért el a migrációt követően, az AI-Prompt.hu platform pedig 3 hónap alatt stabil bevételt termel.",
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
          ? "linear-gradient(135deg, rgba(0,181,241,0.06) 0%, rgba(255,255,255,0.03) 100%)"
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
      aria-label="Gyakran ismételt kérdések"
    >
      {/* JSON-LD AEO Schema */}
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
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,181,241,0.04) 0%, transparent 70%)",
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#0095C7]">
                tudni akarod
              </span>{" "}
              a választ
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              A leggyakrabban felmerülő kérdések — őszintén, ügynökségi
              mellébeszélés nélkül.
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
                  onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
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
            <a
              href="/kapcsolat"
              className="text-[#00B5F1] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#00B5F1] rounded"
            >
              Írj nekem közvetlenül
            </a>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
