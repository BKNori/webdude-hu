"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ChatContent, Language } from "@/types/dictionary";

const LazyWebDudeChat = dynamic(() => import("./WebDudeChat"), {
  ssr: false,
});

interface WebDudeChatLauncherProps {
  dictionary?: ChatContent;
  locale?: Language;
}

/**
 * Pehelykönnyű (0 AI SDK / 0 Zod / 0 Motion függőséges) lebegő chat-indító gomb.
 *
 * A nehéz `@ai-sdk/react` + `ai` (`WebDudeChat`) csomagot kizárólag akkor tölti le,
 * amikor a látogató ténylegesen rákattint a `#chat-trigger-btn` gombra vagy egy oldal
 * `open-webdude-chat` egyedi eseményt küld (~340 KB kezdeti JS megtakarítás).
 */
export default function WebDudeChatLauncher({
  dictionary,
  locale = "hu",
}: WebDudeChatLauncherProps) {
  const [activated, setActivated] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | undefined>(
    undefined
  );
  const pathname = usePathname();

  useEffect(() => {
    if (activated) return;
    const handleOpenChat = (event: Event) => {
      const customEvent = event as CustomEvent<{ initialMessage?: string }>;
      if (customEvent.detail?.initialMessage) {
        setPendingMessage(customEvent.detail.initialMessage);
      }
      setActivated(true);
    };
    window.addEventListener("open-webdude-chat", handleOpenChat);
    return () =>
      window.removeEventListener("open-webdude-chat", handleOpenChat);
  }, [activated]);

  const isAdminOrPortal =
    pathname?.startsWith("/admin") || pathname?.startsWith("/portal");

  if (isAdminOrPortal) {
    return null;
  }

  if (activated) {
    return (
      <LazyWebDudeChat
        dictionary={dictionary}
        locale={locale}
        defaultOpen
        initialMessage={pendingMessage}
      />
    );
  }

  return (
    <button
      id="chat-trigger-btn"
      type="button"
      onClick={() => setActivated(true)}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-[#075985] to-[#5B21B6] text-white border border-slate-200 dark:border-slate-700 shadow-lg shadow-sky-900/20 dark:shadow-sky-500/20 hover:from-[#0369A1] hover:to-[#6D28D9] hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-sky-500/50 cursor-pointer"
      aria-label={
        dictionary?.triggerAriaLabel ?? "WebDude AI Asszisztens megnyitása"
      }
    >
      <span className="relative block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
          aria-hidden="true"
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
        <span className="absolute -top-1 -right-1 flex h-3 w-3" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-400" />
        </span>
      </span>
    </button>
  );
}
