"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import QuoteRequestForm from "@/components/organisms/QuoteRequestForm";
import ContactForm from "@/components/molecules/ContactForm";
import { MessageSquare, ClipboardList } from "lucide-react";

export default function ContactFormWrapper() {
  const [activeForm, setActiveForm] = useState<"quote" | "simple">("quote");

  return (
    <div className="space-y-6">
      {/* Form Selector Tabs */}
      <div className="flex gap-2 p-1 bg-bg-surface/60 backdrop-blur-md border border-bg-elevated/40 rounded-2xl max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setActiveForm("quote")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base ${
            activeForm === "quote"
              ? "bg-sky-500 text-bg-base shadow-[0_4px_12px_rgba(0, 181, 241,0.2)]"
              : "text-slate-400 hover:text-white hover:bg-bg-elevated/30"
          }`}
          aria-label="Részletes ajánlatkérés"
          aria-pressed={activeForm === "quote"}
        >
          <ClipboardList className="w-4 h-4" />
          Részletes ajánlatkérés
        </button>
        <button
          type="button"
          onClick={() => setActiveForm("simple")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base ${
            activeForm === "simple"
              ? "bg-sky-500 text-bg-base shadow-[0_4px_12px_rgba(0, 181, 241,0.2)]"
              : "text-slate-400 hover:text-white hover:bg-bg-elevated/30"
          }`}
          aria-label="Egyszerű üzenet"
          aria-pressed={activeForm === "simple"}
        >
          <MessageSquare className="w-4 h-4" />
          Egyszerű üzenet
        </button>
      </div>

      {/* Render selected form */}
      <div className="min-h-125">
        <AnimatePresence mode="wait">
          {activeForm === "quote" ? (
            <motion.div
              key="quote-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <QuoteRequestForm />
            </motion.div>
          ) : (
            <motion.div
              key="simple-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ContactForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
