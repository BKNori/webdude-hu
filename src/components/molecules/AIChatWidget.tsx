"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Bot, X } from "lucide-react";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Szia! Én vagyok a WebDude AI asszisztens. Miben segíthetek?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", text: input }]);
    setInput("");

    // Simulált válasz
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Köszönöm az üzenetedet! Hamarosan válaszolok rá. Addig is böngészhetsz a szolgáltatásainkat vagy vedd fel velem a kapcsolatot!",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat gomb */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 sm:bottom-24 sm:right-6 w-14 h-14 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] rounded-full shadow-[0_0_20px_rgba(0,181,241,0.4)] flex items-center justify-center z-40 hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6 text-white" aria-hidden="true" />
      </motion.button>

      {/* Chat ablak */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 sm:bottom-40 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] bg-white/95 dark:bg-bg-surface/95 backdrop-blur-xl border border-slate-200 dark:border-[#00B5F1]/30 rounded-2xl shadow-[0_12px_36px_rgba(15,23,42,0.14)] dark:shadow-[0_8px_32px_rgba(0,181,241,0.15)] z-50"
          >
            <div className="p-4 border-b border-slate-200 dark:border-bg-elevated">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot
                    className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]"
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-[#0F172A] dark:text-white">
                    WebDude AI
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Chat bezárása"
                  className="text-[#475569] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-3">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-[#0369A1] dark:bg-[#00B5F1] text-white dark:text-slate-950"
                        : "bg-slate-100 dark:bg-bg-elevated text-[#0F172A] dark:text-text-primary"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-bg-elevated">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Írj üzenetet..."
                  className="flex-1 bg-white dark:bg-transparent border border-slate-300 dark:border-bg-elevated rounded-lg px-3 py-2 text-[#0F172A] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-[#0369A1] dark:focus:border-[#00B5F1]"
                />
                <button
                  onClick={handleSend}
                  className="bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Küldés
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
