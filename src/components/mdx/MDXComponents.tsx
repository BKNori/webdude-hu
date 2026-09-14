import Image from "next/image";
import Link from "next/link";

export const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-8 mt-12">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold text-text-primary leading-snug mb-6 mt-10">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold text-text-primary leading-snug mb-4 mt-8">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-xl font-bold text-text-primary leading-snug mb-3 mt-6">
      {children}
    </h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-base leading-relaxed text-text-secondary mb-6">
      {children}
    </p>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <Link
      href={href || "#"}
      className="text-amber-500 hover:text-amber-400 underline underline-offset-4 hover:underline-offset-2 transition-all duration-300"
    >
      {children}
    </Link>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-2 mb-6 text-text-secondary ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-2 mb-6 text-text-secondary ml-4">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-base leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-amber-500/50 pl-6 py-4 my-6 bg-bg-surface/50 rounded-r-xl">
      <p className="text-lg italic text-text-primary">{children}</p>
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-bg-surface text-amber-500 px-2 py-1 rounded font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-bg-surface border border-bg-elevated rounded-xl p-6 overflow-x-auto mb-6">
      <code className="text-text-primary font-mono text-sm">{children}</code>
    </pre>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-text-primary">{children}</strong>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <div className="relative w-full h-auto my-8 rounded-xl overflow-hidden border border-bg-elevated">
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
