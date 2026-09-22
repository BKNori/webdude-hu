"use client";

import React from "react";

interface SocialMediaIcon {
  name: string;
  href: string;
  svg: string;
}

interface SocialMediaIconsProps {
  className?: string;
}

const socialMediaIcons: SocialMediaIcon[] = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@WebDude-HU",
    svg: `<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>`,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/webdudehu/",
    svg: `<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583-.07-4.849-.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.281-.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4 4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>`,
  },
  {
    name: "Behance",
    href: "https://www.behance.net/bnorbert",
    svg: `<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-9v2h9V7zm0 8h-7v2h7v-2zM8.33 11.23c-1.39 0-2.52-1.12-2.52-2.52 0-1.4 1.13-2.52 2.52-2.52 1.4 0 2.52 1.12 2.52 2.52 0 1.4-1.12 2.52-2.52 2.52zM5.5 13.5H11v6H5.5v-6zM0 6h4.52v2H0V6zm0 12h4.52v2H0v-2z" /></svg>`,
  },
  {
    name: "Pinterest",
    href: "https://hu.pinterest.com/awebdude/",
    svg: `<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-12-5.373-12-12-12zm0 4.5c-.828 0-1.5-.672-1.5-1.5s-.672-1.5-1.5-1.5.828 0-1.5.672-1.5 1.5.672 0 1.5.672 1.5 1.5.828 0 1.5-.672 1.5-1.5.1.5-.672 1.5-1.5zm0 2.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 1.933 0 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z" /></svg>`,
  },
];

export default function SocialMediaIcons({ className = "" }: SocialMediaIconsProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialMediaIcons.map((icon) => (
        <a
          key={icon.name}
          href={icon.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${icon.name} — megnyitás új ablakban`}
          className="text-slate-400 hover:text-[#00B5F1] transition-colors hover:scale-110 transform duration-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
        >
          <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon.svg }} />
        </a>
      ))}
    </div>
  );
}
