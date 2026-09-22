"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface AIFAQSectionProps {
  faqData: FAQItem[];
}

export default function AIFAQSection({ faqData }: AIFAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqData.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-slate-950/60 backdrop-blur-xl ring-1 ring-white/5 rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
            className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors"
          >
            <span className="text-lg font-bold text-slate-200">
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openFaq === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft
                className="w-5 h-5 text-[#00B5F1]"
                strokeWidth={1.5}
              />
            </motion.div>
          </button>
          <motion.div
            initial={false}
            animate={openFaq === index ? true : false}
            transition={{ duration: 0.3 }}
            className="px-8 pb-6"
          >
            <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
