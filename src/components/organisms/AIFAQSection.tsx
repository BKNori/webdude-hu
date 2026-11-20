"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
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
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <div className="space-y-4">
      {faqData.map((faq, index) => (
        <motion.div
          key={index}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.08,
                }
          }
          className="luminous-card overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
            className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors"
            aria-expanded={openFaq === index}
          >
            <span className="text-lg font-bold text-[#0F172A] dark:text-white">
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openFaq === index ? 180 : 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
            >
              <ChevronLeft
                className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]"
                strokeWidth={1.5}
              />
            </motion.div>
          </button>
          <motion.div
            initial={false}
            animate={openFaq === index ? true : false}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
            className="px-8 pb-6"
          >
            <p className="text-[#334155] dark:text-slate-300 leading-relaxed">{faq.answer}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
