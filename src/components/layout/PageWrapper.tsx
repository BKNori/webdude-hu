"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import WebDudeChat from "../organisms/WebDudeChat";
import CookieConsent from "../organisms/CookieConsent";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();

  // Exclude Header, Footer, Chat, and Cookie Consent on Admin pages only
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <main id="main-content" tabIndex={-1} className="grow">
        {children}
      </main>
    );
  }

  return (
    <div className="relative z-10 flex flex-col min-h-screen max-w-[100vw] overflow-x-hidden">
      <Header />
      <main id="main-content" tabIndex={-1} className="grow pt-20">
        {children}
      </main>
      <Footer />
      <WebDudeChat />
      <CookieConsent />
    </div>
  );
}
