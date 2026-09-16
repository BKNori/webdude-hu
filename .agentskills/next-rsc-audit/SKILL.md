---
name: next-rsc-audit
version: 1.0.0
description: Audits Next.js 16 App Router pages for illegal "use client" directives and forces Server Component compliance.
allowed_tools:
  - readFile
  - listFiles
---

# WebDude React Server Component (RSC) Standards

### Objective
Ensure all route entries (`src/app/**/page.tsx`) remain pure React Server Components.

### Execution Rules
1. **Scan:** Always check the targeted page or component before editing.
2. **Strict Boundary:** If `'use client'` is at the top of a `page.tsx` or `layout.tsx`, flag it as a critical error immediately.
3. **Refactoring:** Extract interactive hooks (`useState`, `useEffect`, `motion/*`, browser APIs) into leaf molecules under `src/components/molecules/` or `organisms/`.
4. **Hydration Protection:** `window`, `document`, and raw `Date` formatting must NEVER be rendered on the server. Wrap them in `useEffect` or use `next/dynamic` with `ssr: false`.
5. **Validation:** Run `npx tsc --noEmit` to verify type safety after any extraction.