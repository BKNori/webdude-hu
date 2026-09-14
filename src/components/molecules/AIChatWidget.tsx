"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
        className="fixed bottom-6 right-6 sm:bottom-24 sm:right-6 w-14 h-14 bg-linear-to-r from-amber-500 to-amber-600 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center justify-center z-40 hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl">💬</span>
      </motion.button>

      {/* Chat ablak */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 sm:bottom-40 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] bg-bg-surface/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-[0_8px_32px_rgba(255,215,0,0.2)] z-50"
          >
            <div className="p-4 border-b border-bg-elevated">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🤖</span>
                  <span className="font-semibold text-white">WebDude AI</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-text-secondary hover:text-white transition-colors"
                >
                  ✕
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
                        ? "bg-amber-500 text-bg-base"
                        : "bg-bg-elevated text-text-primary"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-bg-elevated">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Írj üzenetet..."
                  className="flex-1 bg-transparent border border-bg-elevated rounded-lg px-3 py-2 text-white placeholder-text-secondary focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-amber-500 hover:bg-amber-600 text-bg-base px-4 py-2 rounded-lg transition-colors"
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
