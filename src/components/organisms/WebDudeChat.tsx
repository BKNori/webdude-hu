"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage as Message } from "ai";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

// Spacings and physics matching DESIGN_SYSTEM.md cinematic spring style
const cinematicTransition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.9,
} as const;

const quickReplies = [
  { text: "🚀 SaaS / Webapp fejlesztés", category: "saas" },
  { text: "🛒 WordPress / Webshop", category: "wordpress" },
  { text: "🎨 Prémium arculattervezés", category: "design" },
  { text: "🤖 Vállalati AI automatizáció", category: "ai" },
];

export default function WebDudeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { messages, status, sendMessage, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const isWordPressPage = pathname?.includes(
    "wordpress-karbantartas-webhely-karbantartas-13-kotelezo-feladat-2023-ban"
  );

  const currentQuickReplies = isWordPressPage
    ? [
        {
          text: "🛡️ WordPress biztonsági ellenőrzést szeretnék",
          category: "wordpress",
        },
        {
          text: "⚡ Szeretném gyorsabbá tenni a weboldalam",
          category: "wordpress",
        },
        {
          text: "💾 Érdekel a napi automatizált mentés",
          category: "wordpress",
        },
        {
          text: "🔧 Kérnék egy egyedi karbantartási tervet",
          category: "wordpress",
        },
      ]
    : quickReplies;

  // Refs to prevent event listener stale closure issues
  const messagesRef = useRef(messages);
  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    messagesRef.current = messages;
    isLoadingRef.current = isLoading;
  }, [messages, isLoading]);

  // Handle custom window event to open chat and trigger custom initial text/message
  useEffect(() => {
    const handleOpenChat = (event: Event) => {
      setIsOpen(true);
      const customEvent = event as CustomEvent<{ initialMessage?: string }>;
      const text = customEvent.detail?.initialMessage;
      if (text && messagesRef.current.length === 0 && !isLoadingRef.current) {
        // Send the message after a tiny delay so the UI transition finishes smoothly
        setTimeout(() => {
          sendMessage({ text }).catch(() => {
            // Error handled by useChat error state
          });
        }, 300);
      }
    };
    window.addEventListener("open-webdude-chat", handleOpenChat);
    return () =>
      window.removeEventListener("open-webdude-chat", handleOpenChat);
  }, [sendMessage]);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Click outside listener to close widget optionally on desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target as Node)
      ) {
        // Keep open on clicking the trigger button
        const trigger = document.getElementById("chat-trigger-btn");
        if (trigger && trigger.contains(event.target as Node)) return;
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleQuickReply = async (text: string) => {
    if (isLoading) return;
    try {
      await sendMessage({ text });
    } catch {
      // Error handled by useChat error state
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const currentInput = input;
    setInput("");
    try {
      await sendMessage({ text: currentInput });
    } catch {
      // Error handled by useChat error state
    }
  };

  const isAdminOrPortal =
    pathname?.startsWith("/admin") || pathname?.startsWith("/portal");

  if (isAdminOrPortal) {
    return null;
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        id="chat-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-bg-base border border-bg-elevated shadow-lg shadow-amber-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="WebDude AI Asszisztens megnyitása"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </motion.svg>
          ) : (
            <div key="chat" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.625.625 0 11-1.25 0 .625.625 0 011.25 0zm.008 4.55a.007.007 0 01-.008-.008v-.002a.007.007 0 01.008-.008h.006a.007.007 0 01.008.008v.002a.007.007 0 01-.008.008h-.006zm5.625-4.55a.625.625 0 11-1.25 0 .625.625 0 011.25 0zm.008 4.55a.007.007 0 01-.008-.008v-.002a.007.007 0 01.008-.008h.006a.007.007 0 01.008.008v.002a.007.007 0 01-.008.008h-.006z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75a9.747 9.747 0 01-5.334-1.577l-5.228 1.743 1.743-5.228A9.745 9.745 0 012.25 12z"
                />
              </svg>
              {/* Pulse notification dot */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500"></span>
              </span>
            </div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={cinematicTransition}
            className="fixed bottom-24 right-6 z-50 flex h-150 w-[92vw] max-w-110 flex-col overflow-hidden rounded-3xl bg-bg-surface border border-bg-elevated shadow-2xl shadow-amber-500/5 focus:outline-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-bg-elevated/60 bg-transparent px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-bg-surface text-amber-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                    />
                  </svg>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-bg-base" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-primary">
                    WebDude Asszisztens
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Projekt Előkészítés
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-bg-elevated hover:text-text-primary transition-colors"
                aria-label="Bezárás"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Message History Container */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-bg-elevated scrollbar-track-transparent">
              {messages.length === 0 && (
                <div className="flex flex-col h-full justify-between py-4">
                  <div className="text-center space-y-3 px-2">
                    <p className="text-slate-400 text-sm leading-relaxed mt-4">
                      {isWordPressPage
                        ? "Szia! Látom, a WordPress karbantartás érdekel. Szeretnéd, ha átnézném a weboldalad biztonságát?"
                        : "Szia! Én vagyok Norbi mesterséges projekt-előkészítő asszisztense. Segíthetek megismerni a korábbi munkáinkat és rögzíteni a projekttervedet."}
                    </p>
                    <p className="text-xs text-amber-500/80 font-medium">
                      {isWordPressPage
                        ? "Miben segíthetek a WordPress oldalad kapcsán?"
                        : "Milyen terület iránt érdeklődsz leginkább?"}
                    </p>
                  </div>

                  {/* Quick replies list */}
                  <div className="grid grid-cols-1 gap-2 mt-6">
                    {currentQuickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply.text)}
                        className="w-full text-left bg-transparent border border-bg-elevated hover:border-amber-500/50 hover:text-amber-500 rounded-2xl px-4 py-3 text-xs text-slate-300 font-medium transition-all duration-300"
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Streams */}
              {messages.map((message: Message) => {
                const isUser = message.role === "user";
                return (
                  <div
                    key={message.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
                  >
                    {/* Bubble */}
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        isUser
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-tr-none"
                          : "bg-bg-elevated/50 text-text-primary border border-bg-elevated/40 rounded-tl-none"
                      } max-w-[88%]`}
                    >
                      {message.parts.map(
                        (part: Message["parts"][number], partIdx: number) => {
                          if (part.type === "text") {
                            return <span key={partIdx}>{part.text}</span>;
                          }

                          if (part.type === "tool-getPortfolio") {
                            const toolPart = part as unknown as {
                              state:
                                | "input-streaming"
                                | "input-available"
                                | "approval-requested"
                                | "approval-responded"
                                | "output-available"
                                | "output-error"
                                | "output-denied";
                              output?: {
                                items?: Array<{
                                  title: string;
                                  tag: string;
                                  description: string;
                                  slug?: string;
                                }>;
                              };
                            };

                            return (
                              <div
                                key={partIdx}
                                className="mt-3 pt-3 border-t border-bg-elevated/60"
                              >
                                {toolPart.state !== "output-available" ? (
                                  <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <svg
                                      className="animate-spin h-3.5 w-3.5 text-amber-500"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      />
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      />
                                    </svg>
                                    <span>Referenciák lekérése...</span>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <span className="text-[11px] uppercase tracking-wider font-bold text-amber-500/80 block">
                                      Kiemelt Referenciák:
                                    </span>
                                    {toolPart.output?.items &&
                                    toolPart.output.items.length > 0 ? (
                                      <div className="grid grid-cols-1 gap-2">
                                        {toolPart.output.items
                                          .slice(0, 3)
                                          .map(
                                            (
                                              item: {
                                                title: string;
                                                tag: string;
                                                description: string;
                                                slug?: string;
                                              },
                                              idx: number
                                            ) => (
                                              <div
                                                key={idx}
                                                className="bg-transparent border border-bg-elevated rounded-xl p-3 hover:border-amber-500/40 transition-colors"
                                              >
                                                <div className="flex justify-between items-start">
                                                  <h4 className="text-amber-500 font-bold text-xs">
                                                    {item.title}
                                                  </h4>
                                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-bg-elevated text-slate-400">
                                                    {item.tag}
                                                  </span>
                                                </div>
                                                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                                                  {item.description}
                                                </p>
                                                {item.slug && (
                                                  <a
                                                    href={`/munkak#${item.slug}`}
                                                    className="inline-flex items-center gap-1 text-[10px] text-amber-500 font-semibold mt-2 hover:underline"
                                                  >
                                                    Megtekintés
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      strokeWidth={2.5}
                                                      stroke="currentColor"
                                                      className="h-2.5 w-2.5"
                                                    >
                                                      <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                                      />
                                                    </svg>
                                                  </a>
                                                )}
                                              </div>
                                            )
                                          )}
                                      </div>
                                    ) : (
                                      <span className="text-xs text-slate-500 italic">
                                        Nem találtunk az adott kategóriában
                                        referenciát.
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          }

                          if (part.type === "tool-saveLead") {
                            const toolPart = part as unknown as {
                              state:
                                | "input-streaming"
                                | "input-available"
                                | "approval-requested"
                                | "approval-responded"
                                | "output-available"
                                | "output-error"
                                | "output-denied";
                              output?: { success?: boolean };
                            };

                            return (
                              <div
                                key={partIdx}
                                className="mt-3 pt-3 border-t border-bg-elevated/60"
                              >
                                {toolPart.state !== "output-available" ? (
                                  <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <svg
                                      className="animate-spin h-3.5 w-3.5 text-amber-500"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      />
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      />
                                    </svg>
                                    <span>Projektterv elmentése...</span>
                                  </div>
                                ) : (
                                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-center">
                                    <span className="text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={3}
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M4.5 12.75l6 6 9-13.5"
                                        />
                                      </svg>
                                      Lead elmentve!
                                    </span>
                                    <span className="text-[10px] text-slate-400 mt-1 block">
                                      Norbi 24 órán belül felveszi a
                                      kapcsolatot.
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          }

                          return null;
                        }
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Streaming loading bubble */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-none bg-bg-elevated/50 border border-bg-elevated/40 px-4 py-3 max-w-[88%]">
                    <div className="flex gap-1.5 py-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-amber-500/80 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-amber-500/80 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-amber-500/80" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center text-xs text-red-400">
                  Valami hiba történt a csatlakozás során. Kérlek próbáld meg
                  újra!
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar Form */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-bg-elevated/60 bg-transparent px-4 py-3"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder={
                    isLoading ? "Válasz küldése..." : "Írj egy üzenetet..."
                  }
                  disabled={isLoading}
                  className="w-full rounded-xl bg-transparent border border-bg-elevated text-text-primary px-4 py-3 pr-12 text-sm focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all disabled:opacity-55"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-bg-base font-bold uppercase transition-all duration-300 hover:bg-amber-600 disabled:bg-bg-elevated disabled:text-slate-500"
                  aria-label="Küldés"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
