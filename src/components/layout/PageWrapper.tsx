"use client";

import React from "react";
import { usePathname } from "next/navigation";
import HeaderNavClient from "../molecules/HeaderNavClient";
import Footer from "../organisms/Footer";
import WebDudeChat from "../organisms/WebDudeChat";
import CookieConsent from "../organisms/CookieConsent";
import { Dictionary } from "@/types/dictionary";
import { getDictionarySync } from "@/lib/dictionary";

interface PageWrapperProps {
  children: React.ReactNode;
  dictionary?: Dictionary;
}

export default function PageWrapper({
  children,
  dictionary: dictionaryProp,
}: PageWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Calculate current language from pathname
  const currentLang = pathname.startsWith("/en") ? "en" : "hu";

  // A szótár forrása MINDIG a pathname alapjú feloldás (a root layout csak a
  // HU szótárat adja át — /en alatt ezért a szinkron felülírja). Így a
  // Header/Footer és a navigáció automatikusan angolul jelenik meg /en alatt.
  const dictionary = getDictionarySync(currentLang) ?? dictionaryProp;

  if (isAdmin) {
    return (
      <main id="main-content" tabIndex={-1} className="grow">
        {children}
      </main>
    );
  }

  return (
    <div className="relative z-10 flex flex-col min-h-screen max-w-[100vw] overflow-x-hidden">
      <HeaderNavClient dictionary={dictionary} currentLang={currentLang} />
      <main id="main-content" tabIndex={-1} className="grow pt-20">
        {children}
      </main>
      <Footer dictionary={dictionary?.footer} />
      <WebDudeChat />
      <CookieConsent />
    </div>
  );
}
