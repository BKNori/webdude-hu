# WEBDUDE OS KNOWLEDGE BASE — Source of Truth for NotebookLM

**webdude.hu | Next.js 16 · React 19 · TypeScript · Firebase**
**Utolsó frissítés: 2026-07-13**
**Célközönség:** NotebookLM AI Copilot 24/7 Támogatás

> Ez a dokumentum a WebDude OS központi tudásbázisa, amely a NotebookLM számára az "alapigazságokat" (Source of Truth) tartalmazza. A WebDude 26 éves vizuális és 16 éves szakmai DNS-ét tükrözi, és biztosítja, hogy az AI Copilot pontos, projektspecifikus szakmai válaszokat tud adni.

---

## 1. Brand Identitás & Cyber-Arany Szabályok

### 1.1 90-8-2 Szabály (WebDude Alapfilozófia)
- **90%** automatizáció (AI, workflow, CI/CD)
- **8%** emberi felügyelet (review, stratégia)
- **2%** manuális beavatkozás (kritikus hibák)

### 1.2 Cyber-Arany Színrendszer
```
Háttér:           #020617  →  bg-[#020617]
Kártya/panel:     #0f172a  →  bg-[#0f172a]
Fő szöveg:        #e2e8f0  →  text-[#e2e8f0]
Muted szöveg:     #94a3b8  →  text-slate-400
Arany (brand GOLD): #00B5F1  →  text-sky-500 / bg-sky-500
Siker (SUCCESS):  #10b981  →  text-emerald-500
Hiba (ERROR):     #ef4444  →  text-red-500
```

### 1.3 Tipográfia & Spacing
- **Betűtípus:** Font-mono (kódok, UI elemek), sans-serif (tartalom)
- **Spacing Grid:** 8px rendszer (4, 8, 12, 16, 24, 32, 48, 64, 96, 128px)
- **Random pixelértékek TILOS** (pl. 13px, 27px)

### 1.4 Bento Grid Elrendezés
- **Aszimmetrikus kártyák:** Metric, title, description
- **Opacity-alapú keretek:** border-bg-elevated/40
- **Motion animációk:** motion/react csomag (nem framer-motion)
- **Reszponzív töréspontok:** sm:640px, md:768px, lg:1024px, xl:1280px

### 1.5 Vizuális WOW Elemek
- **hover:border-sky-500:** Arany csillogás hover állapotban
- **shadow-xl:** Térbeli hatás a sötét háttérből való kiemelkedéshez
- **line-clamp-3:** Egyforma szöveghossz a grid rácsának stabilitásához
- **Cyber-Arany szegély:** border-2 border-sky-500/50 shadow-lg shadow-sky-500/10 (AI válaszokhoz)

---

## 2. Technológiai Sztenderdek

### 2.1 Tech Stack (SSOT)
| Réteg | Technológia | Verzió | Rationale |
|---|---|---|---|
| Framework | Next.js App Router | 16.x | Modern SSR/ISR, SEO-optimalizált |
| UI | React | 19 | Latest features, Server Components |
| Nyelv | TypeScript | strict, zero-error | Type safety, developer experience |
| Styling | Tailwind CSS | v4 | Utility-first, modern CSS |
| Animáció | Motion | motion/react v12+ | Bundle size optimalizálás (34kb → 4.6kb) |
| Forms | React Hook Form + Zod | latest | Type-safe form validation |
| Backend | Next.js Server Actions + API Routes | — | Server-side logic, security |
| Database | Firebase Firestore | — | NoSQL, real-time sync |
| Auth | Firebase Authentication | — | OAuth, email/password |
| Storage | Firebase Storage | — | File hosting, CDN |
| Hosting | Firebase Hosting (SSR Web Frameworks) | — | Global CDN, auto-scaling |

### 2.2 Atomic Design Metodológia
```
atoms → molecules → organisms → pages
```
- **Atoms:** Button, Input, Badge, Icon, Label, Spinner (többnyire Server)
- **Molecules:** Card, FormField, NavItem, TestimonialItem, PricingCard (vegyes)
- **Organisms:** Header, Hero, Footer, PricingSection, ContactForm (többnyire Client)
- **Pages:** `src/app/*/page.tsx` (kizárólag Server Component)

### 2.3 Server vs. Client Komponens Szabály
- **Server Component:** Alapértelmezett — adatlekérés, SEO, statikus tartalom
- **Client Component:** onClick, useState, useEffect, böngésző API, Motion animáció
- `"use client"` → csak a legkisebb lehetséges "falevél" komponensbe

### 2.4 Komponens Szabályok
- Maximum **300 sor/komponens** — ha több kell, bontsd ketté
- **Single Responsibility** — egy komponens egyetlen dolgot csinál
- `page.tsx` fájlok: kizárólag Server Component, `"use client"` TILOS rájuk
- Új komponens → `_docs/ARCHITECTURE.md` Regiszter frissítése kötelező

---

## 3. Üzleti Folyamatok & Workflow-k

### 3.1 Stripe Add-on Áruház
- **Cél:** Moduláris szolgáltatás-bővítés
- **Implementáció:** Server Actions (createStripeCheckoutSessionAction, verifyStripePaymentAction)
- **Biztonság:** Webhook validáció, Firestore tranzakció naplózás
- **UI:** AddonStore komponens, pricing cards, CTA gombok

### 3.2 Aszinkron Onboarding
- **Cél:** Ügyfél adatok gyűjtése workflow előtt
- **Implementáció:** OnboardingForm komponens, Zod validáció
- **Adatok:** Cégnév, iparág, célközönség, marketing célok
- **Storage:** Firestore `onboardingResponses` collection

### 3.3 Közvetlen Chat-Protokollok
- **WorkflowChat:** 24/7 AI Copilot támogatás
- **Context Injection:** Projektspecifikus metaadatok (onboarding, projektfázis)
- **Persona:** Norbi (WebDude) 26 éves tapasztalat hangvétele
- **Proaktív státuszfrissítés:** Projekt státusz ellenőrzés, CTA beszúrás

### 3.4 Social Proof Automatizálás
- **Cél:** Automatikus case study generálás workflow végrehajtása után
- **Adatstruktúra:** title, clientName, workflowType, impactMetrics, summary, status, createdAt
- **Megjelenítés:** CaseStudyCarousel komponens (Server Component, Bento Grid)
- **Vizuális:** hover:border-sky-500, shadow-xl, line-clamp-3

### 3.5 Kristófka Workflow (Strategist Pro)
- **Cél:** Ingatlanbefektetői pitch generálás PDF alaprajzokból
- **Input:** PDF fájl, célcsoport, narratíva, hangvétel, energetikai besorolás
- **Output:** JSON formátumú pitch (legacy, vision, financial, ROI szekciók)
- **Export:** PDF export (jsPDF), NotebookLM Markdown export
- **Rate Limiting:** 5 pitch/óra

### 3.6 Client Vault
- **Cél:** Dokumentumkezelő és előnézet rendszer
- **Fájltípusok:** PDF (iframe preview), JPG (img preview)
- **Biztonság:** clientId alapú hozzáférés, admin jogosultság
- **UI:** Drag & drop feltöltés, fájl ikonok, Cyber-Arany dizájn

---

## 4. Szakmai Hitvallás (E-E-A-T)

### 4.1 Experience (Tapasztalat)
- **26 év** grafikai és **16 év** webfejlesztői rutin
- **Szakterület:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Firebase, AI automatizáció
- **Projektek:** B2B logisztika, webshopok, arculattervezés, AI workflow-k

### 4.2 Expertise (Szakértelem)
- **Tech Stack:** Modern, skálázható és jövőálló technológiák
- **Architektúra:** Atomic Design, Server Components, ISR, SEO-optimalizálás
- **AI Integráció:** Groq API, Llama 3.3-70b, NotebookLM, Context Engine
- **Performance:** Lighthouse 95+, LCP < 2.5s, CLS < 0.1, INP < 200ms

### 4.3 Authoritativeness (Szerzői Hitelesség)
- **Dokumentáció:** ARCHITECTURE.md, WORKFLOW_PROTOCOL.md, DESIGN_SYSTEM.md
- **Validáció:** npx tsc --noEmit && npm run lint && npm run build (0 hiba kötelező)
- **CHANGELOG:** Minden változás dokumentálása, ciklusok szerint
- **Code Review:** Senior szintű döntéshozatal, megoldásorientált

### 4.4 Trustworthiness (Megbízhatóság)
- **Biztonság:** Firebase Auth, Admin SDK, rate limiting, input validation
- **Transzparencia:** Nyílt forráskód (amennyire lehetséges), dokumentáció
- **Garancia:** 30 napos hibajavítási garancia átadás után
- **Support:** 24/7 AI Copilot, havi karbantartási csomagok

### 4.5 Kommunikációs Stílus
- **Tömör:** Rövid, lényegretörő válaszok
- **Szakmai:** Ipari terminológia, technikai precizitás
- **Ékezetes Magyar:** Kódolásban angol változónevek, kommunikációban magyar
- **Döntéshozó:** Senior szintű döntéshozatal, megoldásorientált

### 4.6 Audit Kezelés
- **Technikai SEO Audit:** Lighthouse optimalizálás, Schema.org JSON-LD implementáció
- **Performance Audit:** Core Web Vitals optimalizálás, bundle size optimalizálás
- **Security Audit:** OWASP top 10, dependency audit, penetration testing
- **Accessibility Audit:** WCAG AA compliance, screen reader support, keyboard navigation

### 4.7 Modern vs. Monolitikus (WordPress vs. Next.js)
- **WordPress:** Monolitikus, plugin-függőség, lassú, SEO-korlátozott
- **Next.js:** Modern, skálázható, SEO-optimalizált, AI-kompatibilis
- **Döntés:** Minden új projekt Next.js 16-al indul (kivéve specifikus kérés)

---

## 5. AEO/SEO Irányelvek

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

### 5.2 AEO — AI keresők (Perplexity, ChatGPT, Gemini)
- **FAQ blokkok:** Kérdés-válasz formátumban, `FAQPage` JSON-LD Schema-val
- **Entity-based JSON-LD:** `LocalBusiness`, `Person`, `Service` típusok
- **Tiszta heading hierarchia:** H1 → H2 → H3, egyetlen H1/oldal
- **Strukturált tartalom:** Listák, táblázatok, definíciók AI-barát formátumban

### 5.3 JSON-LD Minták
```typescript
// LocalBusiness
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'WebDude.hu',
  url: 'https://webdude.hu',
  description: 'Prémium webfejlesztési és AI automatizációs ügynökség',
  founder: { '@type': 'Person', name: 'Norbi (WebDude)' },
};

// FAQPage
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kérdés?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Válasz',
      },
    },
  ],
};
```

### 5.4 Kulcsszó Stratégia
- **Primary:** "webfejlesztés", "Next.js", "React", "TypeScript", "AI automatizáció"
- **Secondary:** "webshop fejlesztés", "SEO optimalizálás", "Firebase", "Tailwind CSS"
- **Long-tail:** "Next.js 16 webfejlesztés Kecskemét", "React 19 TypeScript projekt", "AI workflow automatizáció"

### 5.5 Tartalomstratégia
- **E-E-A-T fókusz:** Tapasztalat, szakértelem, szerzői hitelesség, megbízhatóság
- **Strukturált adatok:** Táblázatok, listák, definíciók AI-barát formátumban
- **Probléma-megoldás:** Fájdalompontok kezelése, megoldás bemutatása
- **Social proof:** Esettanulmányok, ügyfélvélemények, KPI adatok

### 5.6 Link Stratégia
- **Internal:** `next/link` minden belső navigációhoz
- **External:** Nofollow csak spam linkekhez
- **Anchor:** Descriptive anchor text, kulcsszó-optimalizált
- **Canonical:** Egyedi canonical URL minden oldalon

---

## 6. Fejlesztési Ciklus (5 Atomi Fázis)

### 6.1 Fázis 1: OLVASÁS
- Teljes érintett fájl elolvasása
- Vonatkozó `_docs/` protokoll elolvasása
- ARCHITECTURE.md regiszter ellenőrzése

### 6.2 Fázis 2: TERVEZÉS
- Server vs. Client döntés
- Firebase cost elemzés
- Atomic Design szint meghatározása

### 6.3 Fázis 3: KÓDOLÁS
- TELJES fájltartalom kiírása
- TILOS a "// ... további kód" csonkítás
- Importok a fájl elejére

### 6.4 Fázis 4: VALIDÁLÁS
- npx tsc --noEmit (TypeScript validáció)
- npm run lint (ESLint validáció)
- npm run build (build validáció)
- **0 hiba kötelező**

### 6.5 Fázis 5: DOKUMENTÁLÁS
- CHANGELOG.md frissítése
- ARCHITECTURE.md regiszter frissítése
- Commit message: "Cycle X: Leírás"

---

## 7. Teljesítmény & Akadálymentesítés

### 7.1 Célmetrikák (Lighthouse)
```
Overall:  95+
LCP:      < 2.5s   (Largest Contentful Paint)
CLS:      < 0.1    (Cumulative Layout Shift)
INP:      < 200ms  (Interaction to Next Paint)
FID:      < 100ms  (First Input Delay)
```

### 7.2 Kötelező optimalizációk
- `next/image` — minden kép, `priority` prop a fold felett lévő képeknél
- Külső képek (Firebase Storage) engedélyezése kötelező a `next.config.ts`-ben
- `next/link` — minden belső navigáció
- ISR a `/munkak` oldalon: `export const revalidate = 3600;`

### 7.3 WCAG AA akadálymentesítés
```
✅ Látható focus ring minden interaktív elemen (focus:ring-2 focus:ring-sky-500)
✅ alt szöveg minden <Image> komponensen
✅ aria-label minden ikonos gombon
✅ Kontrasztarány: minimum 4.5:1 (szöveg), 3:1 (UI elemek)
✅ Keyboard navigation: Tab sorrenddel kezelhető minden interakció
```

### 7.4 Motion akadálymentesítés
```typescript
// Minden motion animációhoz kötelező
import { useReducedMotion } from "motion/react";
const shouldReduceMotion = useReducedMotion();
// Feltételes animáció: shouldReduceMotion ? {} : { animate: ... }
```

---

## 8. Üzleti Célok (Prioritás sorrendben)

### 8.1 Lead Gen — Kvalifikált ügyfelek generálása
- **Stratégia:** AI workflow automatizáció, social proof, CTA optimalizálás
- **Metrikák:** Konverziós ráta, lead quality, cost per lead

### 8.2 Autoritás — Szakértelem és tapasztalat demonstrálása
- **Stratégia:** E-E-A-T tartalom, case study-k, technikai blog
- **Metrikák:** Domain authority, backlink profil, brand mentions

### 8.3 AEO/SEO — Kiemelkedő Google és AI Answer Engine helyezések
- **Stratégia:** JSON-LD schema, strukturált tartalom, AI-barát formátum
- **Metrikák:** Organic traffic, featured snippets, AI answer citations

### 8.4 CRO — Látogatók azonnali konvertálása ügyféllé
- **Stratégia:** A/B tesztelés, UX optimalizálás, trust signals
- **Metrikák:** Konverziós ráta, bounce rate, time on site

---

## 9. Biztonsági Protokollok

### 9.1 Firebase Auth
- **Client SDK:** Felhasználói autentikáció (signInWithEmailAndPassword, signInWithGoogle)
- **Admin SDK:** Server-side műveletek (Firestore, Storage)
- **Token Management:** getIdToken(true) frissítések

### 9.2 Server Actions
- **verifyUserToken:** Minden Server Action kötelező ellenőrzése
- **Rate Limiting:** AI generálásnál (pl. Kristófka: 5 pitch/óra)
- **Input Validation:** Zod séma validáció frontend és backend

### 9.3 Environment Variables
- **.env.local:** API kulcsok, Firebase config — SOHA nem kerül git-be
- **.env.example:** Sablonok a fejlesztők számára
- **Production:** Firebase Hosting environment variables

### 9.4 Data Protection
- **GDPR Compliance:** Adatkezelési nyilatkozat, cookie consent
- **Data Minimization:** Csak szükséges adatok gyűjtése
- **Data Retention:** Automatikus törlés policy (pl. 365 nap)

---

## 10. Deploy Protokoll

### 10.1 Build Fázis
- `npm run build` — 0 error kötelező
- `npx tsc --noEmit` — TypeScript validáció
- `npm run lint` — ESLint validáció

### 10.2 Firebase Hosting
- **SSR Web Frameworks:** Next.js 16 támogatása
- **Rewrite Rules:** SPA routing támogatás
- **Environment Variables:** .env.local nem kerül git-be

### 10.3 CI/CD
- **GitHub Actions:** Automatikus build és deploy
- **Pre-commit hooks:** ESLint és TypeScript validáció
- **Rollback:** Automatikus rollback hiba esetén

---

## 11. Support & Karbantartás

### 11.1 Havi Karbantartás
- Automatizált frissítések (Next.js, React, TypeScript)
- Napi biztonsági mentések (Firestore, Storage)
- Havi audit jelentés (Lighthouse, SEO)

### 11.2 Opcionális SLA
- Hibajavítási garancia: 30 nap átadás után
- Havi támogatási csomagok
- Priority support (24/7)

### 11.3 Ügyfél Kommunikáció
- **Chat:** 24/7 AI Copilot (WorkflowChat)
- **Email:** hello@webdude.hu
- **Telefon:** +36-XX-XXX-XXXX
- **Response Time:** 24 óra (normál), 4 óra (priority)

---

## 12. Gyakori Kérdések (FAQ)

### 12.1 Fejlesztés
- **Mennyi idő alatt készül el egy oldal?** Egy egyszerű bemutatkozó oldal 1–3 hét, egy komplexebb webshop 4–12 hét.
- **Mennyibe kerül egy weboldal vagy webshop?** Bemutatkozó oldal 300.000–600.000 Ft, webshop 800.000–2.000.000 Ft között indul.
- **Milyen technológiákat használsz?** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Firebase és AI automatizáció.

### 12.2 SEO
- **Milyen SEO szolgáltatásokat nyújtasz?** Technikai SEO audit, Lighthouse optimalizálás, Schema.org JSON-LD implementáció, kulcsszó kutatás és tartalomstratégia tervezés.
- **Segít a WebDude a szövegírásban is?** Igen — AI-asszisztensünk képes előszűrni és javaslatot tenni SEO-barát szövegekre.

### 12.3 Karbantartás
- **Hogyan működik a havi karbantartás?** Automatizált frissítések, napi biztonsági mentések és havi audit jelentés.
- **Milyen garanciát vállaltok?** Átadást követően 30 napos hibajavítási garanciát biztosítunk.

### 12.4 AI Műhely
- **Mi az a Kristófka Workflow?** Ingatlanbefektetői pitch generálás PDF alaprajzokból AI segítségével.
- **Hogyan működik a Social Proof Automatizálás?** Automatikus case study generálás workflow végrehajtása után.

---

## 13. Persona: Norbi (WebDude)

### 13.1 Szakmai Háttér
- **26 év** grafikai és **16 év** webfejlesztői rutin
- **Szakterület:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Firebase, AI automatizáció
- **Pozicionálás:** Elite Lead Architect, Next.js 16 / React 19 Szakértő, CRO és SEO/AEO specialista

### 13.2 Kommunikációs Stílus
- **Tömör:** Rövid, lényegretörő válaszok
- **Szakmai:** Ipari terminológia, technikai precizitás
- **Ékezetes Magyar:** Kódolásban angol változónevek, kommunikációban magyar
- **Döntéshozó:** Senior szintű döntéshozatal, megoldásorientált

### 13.3 Értékek
- **Minőség:** 0 error, zero-error TypeScript, strict mode
- **Innováció:** Modern technológiák, AI automatizáció
- **Transzparencia:** Nyílt dokumentáció, CHANGELOG
- **Megbízhatóság:** Garancia, support, SLA

---

## 14. Jövőbeli Fejlesztések

### 14.1 Rövid Táv (2026 Q3-Q4)
- NotebookLM-alapú tudásbázis bővítése
- AI Copilot 24/7 integráció
- Social Proof automatizálás kiterjesztése

### 14.2 Közép Táv (2027 Q1-Q2)
- Multi-language support (EN, DE)
- Advanced AI workflow automatizáció
- Enterprise SLA csomagok

### 14.3 Hosszú Táv (2027 Q3-Q4)
- AI-first platform
- Global expansion
- White-label solution

---

## 15. NotebookLM Import Instrukciók

### 15.1 Fájl Formátum
- **Fájl név:** WEBDUDE_OS_KNOWLEDGE_BASE.md
- **Formátum:** Markdown (.md)
- **Kódolás:** UTF-8

### 15.2 Importálás NotebookLM-be
1. Nyisd meg a NotebookLM-t (https://notebooklm.google.com/)
2. Kattints a "Create new notebook" gombra
3. Kattints a "Add source" gombra
4. Válaszd a "Upload file" opciót
5. Töltsd fel a WEBDUDE_OS_KNOWLEDGE_BASE.md fájlt
6. Várj a feldolgozásra (általában 1-2 perc)
7. A tudásbázis készen áll a használatra

### 15.3 Használati Tippek
- **Kontextus:** A NotebookLM automatikusan felismeri a fejezeteket és alfejezeteket
- **Keresés:** Használj specifikus kulcsszavakat a gyors kereséshez (pl. "SEO", "Next.js", "Workflow")
- **Citations:** A NotebookLM automatikusan hivatkozik a forrásokra
- **Update:** Frissítéskor töltsd fel újra a fájlt a NotebookLM-be

---

> **Megjegyzés:** Ez a dokumentum folyamatosan frissül a WebDude OS fejlődésével. Minden új funkció vagy protokoll implementálásakor az AI ügynök köteles ezt a fájlt frissíteni. Ez a WebDude OS "Source of Truth"-ja a NotebookLM számára.
