"use client";

import React from "react";

interface FooterContactProps {
  className?: string;
}

export default function FooterContact({ className = "" }: FooterContactProps) {
  return (
    <div className={className}>
      <h3 className="text-text-primary font-bold mb-4 uppercase tracking-wider text-sm">
        Elérhetőség
      </h3>
      <ul className="space-y-3">
        <li className="text-slate-400 text-sm">
          <a
            href="tel:+36703238003"
            className="hover:text-[#00B5F1] transition-colors hover:translate-x-1 transform duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base rounded-lg"
          >
            +36 70 323 8003
          </a>
        </li>
        <li className="text-slate-400 text-sm">
          <a
            href="mailto:hello@webdude.hu"
            className="hover:text-[#00B5F1] transition-colors hover:translate-x-1 transform duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base rounded-lg"
          >
            hello@webdude.hu
          </a>
        </li>
        <li className="text-slate-400 text-sm">
          Kecskemét, Magyarország
        </li>
      </ul>
    </div>
  );
}
