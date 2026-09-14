# AI CONTEXT ENGINE — WebDude OS Knowledge Base

**webdude.hu | Next.js 16 · React 19 · TypeScript · Firebase**
**Utolsó frissítés: 2026-07-13**

> Ez a dokumentum a NotebookLM-alapú AI Copilot 24/7-es támogatásának központi tudásbázisa. Tartalmazza a WebDude OS konkrét sztenderdjeit, architekturális döntéseit és munkafolyamatait, amelyek alapján az AI pontos, projektspecifikus szakmai válaszokat tud adni.

---

## 1. WebDude OS Alapelvek

### 1.1 90-8-2 Szabály
- **90%** automatizáció (AI, workflow, CI/CD)
- **8%** emberi felügyelet (review, stratégia)
- **2%** manuális beavatkozás (kritikus hibák)

### 1.2 Atomic Design Metodológia
```
atoms → molecules → organisms → pages
```
- **Atoms**: Button, Input, Badge, Icon, Label, Spinner (többnyire Server)
- **Molecules**: Card, FormField, NavItem, TestimonialItem, PricingCard (vegyes)
- **Organisms**: Header, Hero, Footer, PricingSection, ContactForm (többnyire Client)
- **Pages**: `src/app/*/page.tsx` (kizárólag Server Component)

### 1.3 Server vs. Client Komponens Szabály
- **Server Component**: Alapértelmezett — adatlekérés, SEO, statikus tartalom
- **Client Component**: onClick, useState, useEffect, böngésző API, Motion animáció
- `"use client"` → csak a legkisebb lehetséges "falevél" komponensbe

---

## 2. Tech Stack (SSOT)

| Réteg | Technológia | Verzió |
|---|---|---|
| Framework | Next.js App Router | 16.x |
| UI | React | 19 |
| Nyelv | TypeScript (strict, zero-error) | latest |
| Styling | Tailwind CSS | v4 |
| Animáció | Motion (`motion/react`) | v12+ |
| Forms | React Hook Form + Zod | latest |
| Backend | Next.js Server Actions + API Routes | — |
| Database | Firebase Firestore | — |
| Auth | Firebase Authentication | — |
| Storage | Firebase Storage | — |
| Hosting | Firebase Hosting (SSR Web Frameworks) | — |

---

## 3. Design System (Cyber-Arany)

### 3.1 Színrendszer
```
Háttér:           #020617  →  bg-[#020617]
Kártya/panel:     #0f172a  →  bg-[#0f172a]
Fő szöveg:        #e2e8f0  →  text-[#e2e8f0]
Muted szöveg:     #94a3b8  →  text-slate-400
Arany (brand):    #f59e0b  →  text-amber-500 / bg-amber-500
Siker:            #10b981  →  text-emerald-500
Hiba:             #ef4444  →  text-red-500
```

### 3.2 Spacing (8px Grid)
```
Megengedett értékek: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
Random pixelértékek (pl. 13px, 27px): TILOS
```

### 3.3 Reszponzív töréspontok
```
sm: 640px  |  md: 768px  |  lg: 1024px  |  xl: 1280px
```

---

## 4. Munkafolyamat Protokoll

### 4.1 Fejlesztési Ciklus (5 Atomi Fázis)
```
1. OLVASÁS    → Teljes érintett fájl + vonatkozó _docs/ protokoll elolvasása
2. TERVEZÉS   → Server vs. Client döntés, Firebase cost elemzés, Atomic Design szint
3. KÓDOLÁS    → TELJES fájltartalom kiírása — TILOS a "// ... további kód" csonkítás
4. VALIDÁLÁS  → npx tsc --noEmit && npm run lint && npm run build (0 hiba kötelező)
5. DOKUMENTÁLÁS → CHANGELOG.md + ARCHITECTURE.md szinkron
```

### 4.2 Komponens Szabályok
- Maximum **300 sor/komponens** — ha több kell, bontsd ketté
- **Single Responsibility** — egy komponens egyetlen dolgot csinál
- `page.tsx` fájlok: kizárólag Server Component, `"use client"` TILOS rájuk
- Új komponens → `_docs/ARCHITECTURE.md` Regiszter frissítése kötelező

---

## 5. SEO & AEO (Answer Engine Optimization)

### 5.1 Technikai SEO (minden `page.tsx`-ben kötelező)
```typescript
export const metadata: Metadata = {
  title: 'Oldal Cím | WebDude',
  description: '150-160 karakter, kulcsszó-optimalizált leírás.',
  openGraph: {
    title: '...',
    description: '...',
    images: [{ url: '/og/oldal.jpg', width: 1200, height: 630 }],
  },
};
```

### 5.2 AEO — AI keresők számára
- FAQ blokkok: kérdés-válasz formátumban, `FAQPage` JSON-LD Schema-val
- Entity-based JSON-LD: `LocalBusiness`, `Person`, `Service` típusok
- Tiszta heading hierarchia (H1 → H2 → H3), egyetlen H1/oldal

---

## 6. Teljesítmény & Akadálymentesítés

### 6.1 Célmetrikák (Lighthouse)
```
Overall:  95+
LCP:      < 2.5s   (Largest Contentful Paint)
CLS:      < 0.1    (Cumulative Layout Shift)
INP:      < 200ms  (Interaction to Next Paint)
FID:      < 100ms  (First Input Delay)
```

### 6.2 Kötelező optimalizációk
- `next/image` — minden kép, `priority` prop a fold felett lévő képeknél
- Külső képek (Firebase Storage) engedélyezése kötelező a `next.config.ts`-ben
- `next/link` — minden belső navigáció
- ISR a `/munkak` oldalon: `export const revalidate = 3600;`

### 6.3 WCAG AA akadálymentesítés
```
✅ Látható focus ring minden interaktív elemen (focus:ring-2 focus:ring-amber-500)
✅ alt szöveg minden <Image> komponensen
✅ aria-label minden ikonos gombon
✅ Kontrasztarány: minimum 4.5:1 (szöveg), 3:1 (UI elemek)
✅ Keyboard navigation: Tab sorrenddel kezelhető minden interakció
```

---

## 7. AI Műhely (AI Workshop)

### 7.1 Kristófka Workflow (Strategist Pro)
- **Cél**: Ingatlanbefektetői pitch generálás PDF alaprajzokból
- **Input**: PDF fájl, célcsoport, narratíva, hangvétel, energetikai besorolás
- **Output**: JSON formátumú pitch (legacy, vision, financial, ROI szekciók)
- **Export**: PDF export (jsPDF), NotebookLM Markdown export
- **Rate Limiting**: 5 pitch/óra

### 7.2 Social Proof Automatizálás
- **Cél**: Automatikus case study generálás workflow végrehajtása után
- **Adatstruktúra**: title, clientName, workflowType, impactMetrics, summary, status, createdAt
- **Megjelenítés**: CaseStudyCarousel komponens (Server Component, Bento Grid)
- **Vizuális**: hover:border-amber-500, shadow-xl, line-clamp-3

---

## 8. Portál Funkciók

### 8.1 Client Vault
- **Cél**: Dokumentumkezelő és előnézet rendszer
- **Fájltípusok**: PDF (iframe preview), JPG (img preview)
- **Biztonság**: clientId alapú hozzáférés, admin jogosultság
- **UI**: Drag & drop feltöltés, fájl ikonok, Cyber-Arany dizájn

### 8.2 Workflow Chat
- **Cél**: 24/7-es AI Copilot támogatás
- **Context Injection**: Projektspecifikus metaadatok (onboarding, projektfázis)
- **Persona**: 26 éves tapasztalat hangvétel (professzionális, határozott, szakmailag elmélyült)
- **Proaktív státuszfrissítés**: Projekt státusz ellenőrzés, CTA beszúrás

---

## 9. Üzleti Célok (Prioritás sorrendben)

1. **Lead Gen** — Kvalifikált ügyfelek generálása
2. **Autoritás** — Szakértelem és tapasztalat vizuális/technikai demonstrálása
3. **AEO/SEO** — Kiemelkedő Google és AI Answer Engine helyezések
4. **CRO** — Látogatók azonnali konvertálása ügyféllé

---

## 10. Biztonsági Protokollok

### 10.1 Firebase Auth
- **Client SDK**: Felhasználói autentikáció (signInWithEmailAndPassword, signInWithGoogle)
- **Admin SDK**: Server-side műveletek (Firestore, Storage)
- **Token Management**: getIdToken(true) frissítések

### 10.2 Server Actions
- **verifyUserToken**: Minden Server Action kötelező ellenőrzése
- **Rate Limiting**: AI generálásnál (pl. Kristófka: 5 pitch/óra)
- **Input Validation**: Zod séma validáció frontend és backend

---

## 11. Deploy Protokoll

### 11.1 Build Fázis
- `npm run build` — 0 error kötelező
- `npx tsc --noEmit` — TypeScript validáció
- `npm run lint` — ESLint validáció

### 11.2 Firebase Hosting
- **SSR Web Frameworks**: Next.js 16 támogatása
- **Rewrite Rules**: SPA routing támogatás
- **Environment Variables**: .env.local nem kerül git-be

---

## 12. Support & Karbantartás

### 12.1 Havi Karbantartás
- Automatizált frissítések (Next.js, React, TypeScript)
- Napi biztonsági mentések (Firestore, Storage)
- Havi audit jelentés (Lighthouse, SEO)

### 12.2 Opcionális SLA
- Hibajavítási garancia: 30 nap átadás után
- Havi támogatási csomagok
- Priority support (24/7)

---

## 13. Gyakori Kérdések (FAQ)

### 13.1 Fejlesztés
- **Mennyi idő alatt készül el egy oldal?** Egy egyszerű bemutatkozó oldal 1–3 hét, egy komplexebb webshop 4–12 hét.
- **Mennyibe kerül egy weboldal vagy webshop?** Bemutatkozó oldal 300.000–600.000 Ft, webshop 800.000–2.000.000 Ft között indul.
- **Milyen technológiákat használsz?** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Firebase és AI automatizáció.

### 13.2 SEO
- **Milyen SEO szolgáltatásokat nyújtasz?** Technikai SEO audit, Lighthouse optimalizálás, Schema.org JSON-LD implementáció, kulcsszó kutatás és tartalomstratégia tervezés.
- **Segít a WebDude a szövegírásban is?** Igen — AI-asszisztensünk képes előszűrni és javaslatot tenni SEO-barát szövegekre.

### 13.3 Karbantartás
- **Hogyan működik a havi karbantartás?** Automatizált frissítések, napi biztonsági mentések és havi audit jelentés.
- **Milyen garanciát vállaltok?** Átadást követően 30 napos hibajavítási garanciát biztosítunk.

---

## 14. Persona: Norbi (WebDude)

### 14.1 Szakmai Háttér
- **26 év** grafikai és **16 év** webfejlesztői rutin
- **Szakterület**: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Firebase, AI automatizáció
- **Pozicionálás**: Elite Lead Architect, Next.js 16 / React 19 Szakértő, CRO és SEO/AEO specialista

### 14.2 Kommunikációs Stílus
- **Tömör**: Rövid, lényegretörő válaszok
- **Szakmai**: Ipari terminológia, technikai precizitás
- **Ékezetes Magyar**: Kódolásban angol változónevek, kommunikációban magyar
- **Döntéshozó**: Senior szintű döntéshozatal, megoldásorientált

---

## 15. Jövőbeli Fejlesztések

### 15.1 Rövid Táv (2026 Q3-Q4)
- NotebookLM-alapú tudásbázis bővítése
- AI Copilot 24/7 integráció
- Social Proof automatizálás kiterjesztése

### 15.2 Közép Táv (2027 Q1-Q2)
- Multi-language support (EN, DE)
- Advanced AI workflow automatizáció
- Enterprise SLA csomagok

### 15.3 Hosszú Táv (2027 Q3-Q4)
- AI-first platform
- Global expansion
- White-label solution

---

> **Megjegyzés**: Ez a dokumentum folyamatosan frissül a WebDude OS fejlődésével. Minden új funkció vagy protokoll implementálásakor az AI ügynök köteles ezt a fájlt frissíteni.
