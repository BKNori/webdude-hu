"use client";

import React from "react";
import Link from "next/link";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterLinksProps {
  title: string;
  links: FooterLink[];
  className?: string;
  listClassName?: string;
}

export default function FooterLinks({
  title,
  links,
  className = "",
  listClassName = "space-y-2",
}: FooterLinksProps) {
  return (
    <div className={className}>
      <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ul className={listClassName}>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-slate-400 hover:text-[#00B5F1] transition-all duration-300 text-sm hover:translate-x-1 transform inline-block focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base rounded-lg"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
