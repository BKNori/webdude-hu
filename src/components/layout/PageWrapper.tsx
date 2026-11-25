"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import HeaderNavClient from "../molecules/HeaderNavClient";
import Footer from "../organisms/Footer";
import WebDudeChatLauncher from "../organisms/WebDudeChatLauncher";
import type { GlobalDictionary, Language } from "@/types/dictionary";

const CookieConsent = dynamic(() => import("../organisms/CookieConsent"), {
  ssr: false,
});

interface PageWrapperProps {
  children: React.ReactNode;
  dictionaries: Record<Language, GlobalDictionary>;
}

export default function PageWrapper({
  children,
  dictionaries,
}: PageWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const currentLang: Language = pathname.startsWith("/en") ? "en" : "hu";
  const globalDict = dictionaries[currentLang];

  if (isAdmin) {
    return (
      <main id="main-content" tabIndex={-1} className="grow">
        {children}
      </main>
    );
  }

  return (
    <div className="relative z-10 flex flex-col min-h-screen max-w-[100vw] overflow-x-hidden">
      <HeaderNavClient dictionary={globalDict} currentLang={currentLang} />
      <main id="main-content" tabIndex={-1} className="grow pt-20">
        {children}
      </main>
      <Footer dictionary={globalDict.footer} />
      <WebDudeChatLauncher dictionary={globalDict.chat} locale={currentLang} />
      <CookieConsent dictionary={globalDict.cookie} />
    </div>
  );
}
