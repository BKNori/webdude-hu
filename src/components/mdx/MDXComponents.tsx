import Image from "next/image";
import Link from "next/link";
import React from "react";

export const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal text-[#0F172A] dark:text-white leading-tight tracking-[0.03em] mb-8 mt-12">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-14 mb-5 pt-6 border-t border-slate-200/80 dark:border-white/10 font-heading font-normal text-2xl md:text-3xl text-slate-900 dark:text-white tracking-[0.03em] leading-snug">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="mt-9 mb-3 font-heading font-normal text-xl md:text-2xl text-[#0369A1] dark:text-[#00B5F1] tracking-[0.05em] leading-snug">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-lg md:text-xl font-bold text-[#0F172A] dark:text-white leading-snug mb-3 mt-6">
      {children}
    </h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-[17px] leading-[1.85] text-slate-700 dark:text-slate-300 mb-6">
      {children}
    </p>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <Link
      href={href || "#"}
      className="font-semibold text-[#0369A1] dark:text-[#00B5F1] hover:text-[#6D28D9] dark:hover:text-sky-300 underline decoration-[#0369A1]/40 dark:decoration-[#00B5F1]/40 underline-offset-4 hover:underline-offset-2 transition-all duration-200"
    >
      {children}
    </Link>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-6 space-y-3 pl-6 list-disc marker:text-[#0369A1] dark:marker:text-[#00B5F1] text-[17px] text-slate-700 dark:text-slate-300">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-6 space-y-3 pl-6 list-decimal marker:text-[#0369A1] dark:marker:text-[#00B5F1] marker:font-bold text-[17px] text-slate-700 dark:text-slate-300">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-[1.75] pl-1">{children}</li>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-slate-900 dark:text-white">
      {children}
    </strong>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-8 p-6 rounded-2xl bg-sky-50/80 dark:bg-[#16223B]/80 border-l-4 border-[#0369A1] dark:border-[#00B5F1] text-slate-800 dark:text-slate-200 [&>p]:mb-0 [&>p]:text-slate-800 dark:[&>p]:text-slate-200 [&>p]:leading-relaxed">
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-12 border-0 h-px bg-slate-200/90 dark:bg-white/10" />
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-slate-100 dark:bg-[#16223B] text-[#0369A1] dark:text-[#38BDF8] border border-slate-200/80 dark:border-white/10 px-1.5 py-0.5 rounded-md font-mono text-[0.875em]">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="my-8 bg-slate-900 dark:bg-[#070C1A] border border-slate-800 dark:border-white/10 rounded-2xl p-6 overflow-x-auto text-sm text-slate-100 [&>code]:bg-transparent [&>code]:border-0 [&>code]:p-0 [&>code]:text-slate-100">
      {children}
    </pre>
  ),
  table: ({
    children,
    className = "",
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => (
    <div className="article-table-wrap overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm bg-white dark:bg-slate-900/75">
      <table className={`w-full text-left border-collapse text-sm ${className}`}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-slate-100/90 dark:bg-[#16223B] text-slate-900 dark:text-white font-semibold text-left">
      {children}
    </thead>
  ),
  tbody: ({ children }: { children?: React.ReactNode }) => (
    <tbody className="divide-y divide-slate-200/80 dark:divide-white/10">
      {children}
    </tbody>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <tr className="even:bg-slate-50/60 dark:even:bg-white/2 transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-5 py-4 text-sm font-semibold leading-relaxed border-b border-slate-200/80 dark:border-white/10 align-top text-slate-900 dark:text-white">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-5 py-4 text-sm leading-relaxed border-b border-slate-200/80 dark:border-white/10 align-top text-slate-700 dark:text-slate-300">
      {children}
    </td>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <div className="relative w-full h-auto my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-md">
      <Image
        src={src || ""}
        alt={alt || ""}
        width={1200}
        height={630}
        className="object-cover w-full h-auto"
      />
    </div>
  ),
};
