# ARCHITECTURE.md — WebDude Rendszerarchitektúra

**webdude.hu | Next.js 16 · React 19 · TypeScript · Firebase**
**Utolsó frissítés: 2026-09-14 (Portfolio Data Expansion & Electric Cyan Component Refactor)**

> Ez a dokumentum a projekt komponensstruktúrájának és architektúrális döntéseinek egyedüli forrása (SSOT). Minden új komponens létrehozásakor vagy módosításakor az AI ügynök köteles ezt a fájlt frissíteni.

---

## 1. Architektúrális Alapelv: Atomic Design

A projekt szigorúan az **Atomic Design** metodológiát követi (Brad Frost). Az UI egyszerű, újrafelhasználható egységekből épül fel, amelyek hierarchikusan összeállnak teljes oldalakká.

```
atoms  →  molecules  →  organisms  →  pages
```

| Szint         | Leírás                                           | Példák                                                 | Server/Client                    |
| ------------- | ------------------------------------------------ | ------------------------------------------------------ | -------------------------------- |
| **Atoms**     | Legkisebb, tovább nem bontható UI elemek         | Button, Input, Badge, Icon, Label, Spinner             | Többnyire Server                 |
| **Molecules** | 2–5 atom összekapcsolása funkcionális egységgé   | Card, FormField, NavItem, TestimonialItem, PricingCard | Vegyes                           |
| **Organisms** | Teljes oldalszekciókat alkotó, összetett blokkok | Header, Hero, Footer, PricingSection, ContactForm      | Többnyire Client (ha interaktív) |
| **Pages**     | `src/app/*/page.tsx` – organisms összeállítása   | page.tsx fájlok                                        | **Kizárólag Server Component**   |

---

## 2. Komponens Regiszter

> Az összes létező komponens nyilvántartása. Új komponens hozzáadásakor a megfelelő szekciót kell bővíteni.

### 2.1 Atoms

| Komponens        | Fájl                                            | Leírás                                                                    | Direktíva        |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------------------- | ---------------- |
| `Button`         | `src/components/atoms/Button.tsx`               | Soft Premium gombok (primary/secondary/accent variáns, Link/button típus) | `"use client"`   |
| `SectionTitle`   | `src/components/atoms/SectionTitle.tsx`         | Szekciók címsora (eyebrow, title, description)                            | Server Component |
| `Badge`          | `src/components/atoms/Badge.tsx`                | Kiemelő badge/label (uppercase, tracking-wider)                           | Server Component |
| `LoadingSpinner` | `src/components/atoms/LoadingSpinner.tsx`       | Triple spinning circles loading animáció (motion/react)                   | `"use client"`   |
| `CopyButton`     | `src/app/portal/prompt-sablonok/CopyButton.tsx` | Vágólapra másoló gomb (navigator.clipboard.writeText)                     | `"use client"`   |

### 2.2 Molecules

| Komponens               | Fájl                                                       | Leírás                                                                                                                               | Direktíva                     |
| ----------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| `MotionWrapper`         | `src/components/molecules/MotionWrapper.tsx`               | Motion animációk wrapper komponens (bundle size optimalizálás 34kb → 4.6kb)                                                          | `"use client"` (motion/react) |
| `BentoCard`             | `src/components/molecules/BentoCard.tsx`                   | Aszimmetrikus kártya (metric, title, description), soft shadow kerettel, motion animáció                                             | `"use client"` (motion/react) |
| `StatItem`              | `src/components/molecules/StatItem.tsx`                    | Egy KPI statisztikai elem (value + label), Server Component                                                                          | Server Component              |
| `ComparisonCard`        | `src/components/molecules/ComparisonCard.tsx`              | Hagyományos vs Megoldás összehasonlító kártya (problem/solution)                                                                     | Server Component              |
| `AnimatedSystemFlow`    | `src/components/molecules/AnimatedSystemFlow.tsx`          | Animált rendszerfolyam (Audit → AI Tervezés → Next.js Fejlesztés → Élesítés)                                                         | "use client" (motion/react)   |
| `CaseStudyCard`         | `src/components/molecules/CaseStudyCard.tsx`               | KPI-fókuszált esettanulmány kártya (btshop.hu +40% KPI adatokkal)                                                                    | "use client" (motion/react)   |
| `AiChatMockup`          | `src/components/molecules/AiChatMockup.tsx`                | Interaktív AI chat mockup (animated AI response)                                                                                     | "use client" (motion/react)   |
| `HeaderNavClient`       | `src/components/molecules/HeaderNavClient.tsx`             | Interaktív navigációs sáv és mobil menü (scroll, dropdown, mobil overlay)                                                            | `"use client"` (motion/react) |
| `ContactForm`           | `src/components/molecules/ContactForm.tsx`                 | Validált kapcsolatfelvételi űrlap (Zod + React Hook Form)                                                                            | `"use client"`                |
| `Timeline`              | `src/components/molecules/Timeline.tsx`                    | Animált szakmai idővonal                                                                                                             | `"use client"` (motion/react) |
| `ServiceCard`           | `src/components/molecules/ServiceCard.tsx`                 | Szolgáltatás kártya (title, icon, description, tags)                                                                                 | "use client" (motion/react)   |
| `PortfolioGrid`         | `src/components/molecules/PortfolioGrid.tsx`               | Animált referenciarács (Bento Grid, motion/react)                                                                                    | `"use client"`                |
| `BlogGrid`              | `src/components/molecules/BlogGrid.tsx`                    | Animált cikkrács a blogbejegyzésekhez (motion/react)                                                                                 | `"use client"`                |
| `PricingTable`          | `src/components/molecules/PricingTable.tsx`                | Prémium pricing táblázat (több szint, hover effektek, motion animációk)                                                              | `"use client"` (motion/react) |
| `ImageUploader`         | `src/components/molecules/ImageUploader.tsx`               | Drag-and-drop és kattintás alapú képfeltöltő Firebase Storage integrációval, haladási és hibakezeléssel                              | `"use client"`                |
| `LeadKanbanCard`        | `src/components/molecules/LeadKanbanCard.tsx`              | Lead értékesítési kártya státuszváltó gombokkal és glassmorphism stílussal                                                           | `"use client"` (motion/react) |
| `TemplateSelector`      | `src/components/molecules/TemplateSelector.tsx`            | UI template selector dropdown és apply gomb (client component)                                                                       | `"use client"`                |
| `GraphicToolCard`       | `src/components/molecules/GraphicToolCard.tsx`             | Eszköz gomb kártya a grafikai AI eszközökhez (client component)                                                                      | `"use client"`                |
| `LighthouseAuditor`     | `src/components/molecules/LighthouseAuditor.tsx`           | Google PageSpeed API alapú interaktív audit vizualizáció (KPI mutatókkal)                                                            | `"use client"` (motion/react) |
| `OnboardingForm`        | `src/components/molecules/OnboardingForm.tsx`              | Kategória-specifikus dinamikus onboarding kérdőív (Zod + React Hook Form)                                                            | `"use client"`                |
| `PerformanceGauge`      | `src/components/molecules/PerformanceGauge.tsx`            | Lebutított Lighthouse score gauge (statikus, vizuálisan lenyűgöző Performance Target grafikon)                                       | `"use client"` (motion/react) |
| `PromptTemplatesClient` | `src/app/portal/prompt-sablonok/PromptTemplatesClient.tsx` | AI Prompt Sablonok megjelenítése jogosultság ellenőrzéssel (superadmin automatikus hozzáférés, ügyfél csak ha hasPromptAccess: true) | `"use client"`                |

### 2.3 Organisms

| Komponens                       | Fájl                                                         | Leírás                                                                                                                                                                                                                                                                                     | Direktíva                              |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `HeroSectionNew`                | `src/components/organisms/HeroSectionNew.tsx`                | Soft Premium Hero szekció - kétoszlopos layout, nagy tipográfia, üveg dashboard, AI kocka, radial gradiensek                                                                                                                                                                               | `"use client"` (motion/react)          |
| `NavigationNew`                 | `src/components/organisms/NavigationNew.tsx`                 | Apple-style minimal navigáció, sticky, frosted glass                                                                                                                                                                                                                                       | `"use client"` (motion/react)          |
| `ServiceSectionNew`             | `src/components/organisms/ServiceSectionNew.tsx`             | Soft Premium szolgáltatás szekció - aszimmetrikus Bento Grid, 3D clay ikonok                                                                                                                                                                                                               | `"use client"` (motion/react)          |
| `PortfolioSectionNew`           | `src/components/organisms/PortfolioSectionNew.tsx`           | Soft Premium portfolio szekció - nagy case study kártyák, MacBook mockupok                                                                                                                                                                                                                 | `"use client"` (motion/react)          |
| `TrustSectionNew`               | `src/components/organisms/TrustSectionNew.tsx`               | Soft Premium trust szekció - prémium monochrome logo strip                                                                                                                                                                                                                                 | `"use client"` (motion/react)          |
| `HeroSection`                   | `src/components/organisms/HeroSection.tsx`                   | Lead engine forgó hero szekció 3 diával, nagyfelbontású háttérképekkel, nyíl/pötty navigációval (LEGACY - HeroSectionNew váltotta)                                                                                                                                                         | `"use client"`                         |
| `SocialProofStrip`              | `src/components/organisms/SocialProofStrip.tsx`              | Bizalomépítő sáv KPI statisztikákkal, scroll-velocity marquee logószalag (Soft Premium)                                                                                                                                                                                                    | `"use client"` (motion/react)          |
| `ProblemSolution`               | `src/components/organisms/ProblemSolution.tsx`               | Hagyomány vs Megoldás összehasonlító szekció (ComparisonCard molekulák)                                                                                                                                                                                                                    | Server Component                       |
| `ProblemSectionClient`          | `src/components/organisms/ProblemSectionClient.tsx`          | Üvegkártyás (glassmorphism) kihívásokat bemutató szekció CTA gombbal                                                                                                                                                                                                                       | `"use client"`                         |
| `FeaturedServices`              | `src/components/organisms/FeaturedServices.tsx`              | Kiemelt szolgáltatások aszimmetrikus Bento Gridben (LEGACY)                                                                                                                                                                                                                                | Server Component                       |
| `FeaturedServicesNew`           | `src/components/organisms/FeaturedServicesNew.tsx`           | Kiemelt szolgáltatások aszimmetrikus Bento Grid (2+1+1), hover lift effektek, feature listák (Soft Premium)                                                                                                                                                                                | `"use client"` (motion/react)          |
| `SystemShowcase`                | `src/components/organisms/SystemShowcase.tsx`                | Rendszerbemutató szekció — animált 4 lépéses folyamatábra scroll-bound vonallal, hover lift kártyákkal (Soft Premium)                                                                                                                                                                      | `"use client"` (motion/react)          |
| `CaseStudies`                   | `src/components/organisms/CaseStudies.tsx`                   | Esettanulmányok szekció (LEGACY)                                                                                                                                                                                                                                                           | Server Component                       |
| `CaseStudiesBento`              | `src/components/organisms/CaseStudiesBento.tsx`              | 2 kiemelt esettanulmány KPI számokkal, hover lift, DL/DT/DD szemantikával géppel olvasható formátumban (Soft Premium)                                                                                                                                                                      | `"use client"` (motion/react)          |
| `AiAssistantDemo`               | `src/components/organisms/AiAssistantDemo.tsx`               | AI Assistant demo szekció — interaktív chat mockup és CTA                                                                                                                                                                                                                                  | Server Component                       |
| `AboutSection`                  | `src/components/organisms/AboutSection.tsx`                  | Személyes bemutatkozó szekció (portré + történet)                                                                                                                                                                                                                                          | Server Component                       |
| `FaqSection`                    | `src/components/organisms/FaqSection.tsx`                    | GYIK / FAQ szekció natív details/summary harmonikával (LEGACY)                                                                                                                                                                                                                             | Server Component                       |
| `FaqSectionAEO`                 | `src/components/organisms/FaqSectionAEO.tsx`                 | AEO-optimalizált accordion GYIK FAQPage JSON-LD schemával, spring physics animációval (Soft Premium)                                                                                                                                                                                       | `"use client"` (motion/react)          |
| `FinalCta`                      | `src/components/organisms/FinalCta.tsx`                      | Erőteljes záró CTA teljes képernyős szerű blokkal (Soft Premium)                                                                                                                                                                                                                           | Server Component                       |
| `Header`                        | `src/components/organisms/Header.tsx`                        | Navigáció, logo, mobilmenü (LEGACY - NavigationNew váltotta)                                                                                                                                                                                                                               | `"use client"` (mobilmenü toggle)      |
| `Footer`                        | `src/components/organisms/Footer.tsx`                        | Oldallábléc, szerzői jogok, Soft Premium dizájn                                                                                                                                                                                                                                            | Server Component (nincs direktíva)     |
| `WebDudeChat`                   | `src/components/organisms/WebDudeChat.tsx`                   | Intelligens chat asszisztens és lead-minősítő widget                                                                                                                                                                                                                                       | `"use client"` (Vercel AI SDK, motion) |
| `CookieConsent`                 | `src/components/organisms/CookieConsent.tsx`                 | GDPR kompatibilis cookie consent banner (localStorage alapú beleegyezés, dinamikus GA betöltés)                                                                                                                                                                                            | `"use client"` (motion/react)          |
| `AdminSidebar`                  | `src/app/admin/layout.tsx`                                   | Admin felület oldalsó navigáció (Dashboard, Leadek, Portfólió, Email Sablonok, Statisztikák, Beállítások menüpontok, Notification Center Bell ikonnal, dropdown menüvel, unread jelöléssel, kijelentkezés)                                                                                 | `"use client"` (Firebase Auth)         |
| `QuoteRequestForm`              | `src/components/organisms/QuoteRequestForm.tsx`              | Több lépcsős interaktív ajánlatkérő űrlap (Bento grid, Zod validáció)                                                                                                                                                                                                                      | `"use client"`                         |
| `ContactFormWrapper`            | `src/components/organisms/ContactFormWrapper.tsx`            | Hibrid ajánlatkérő és gyors kapcsolatfelvételi űrlap wrapper                                                                                                                                                                                                                               | `"use client"`                         |
| `PortalDashboard`               | `src/components/organisms/PortalDashboard.tsx`               | Zárt ügyféli portal dashboard, workflow-k Bento Grid megjelenítése                                                                                                                                                                                                                         | `"use client"`                         |
| `ClientAITools`                 | `src/components/organisms/ClientAITools.tsx`                 | Kliensoldali interaktív AI Prompt és Tartalom Generátor eszköz a portálon (9 darab marketing és grafikai eszközzel)                                                                                                                                                                        | `"use client"`                         |
| `LeadKanbanBoard`               | `src/components/organisms/LeadKanbanBoard.tsx`               | CRM Kanban tábla tölcsér fázisokkal és optimistic UI frissítésekkel                                                                                                                                                                                                                        | `"use client"`                         |
| `AdminPanel`                    | `src/components/organisms/AdminPanel.tsx`                    | Cyber-Dark stílusú szuperadmin kezelőpanel ügyfél regisztrációs és add-on hozzárendelési funkciókkal                                                                                                                                                                                       | `"use client"`                         |
| `WorkflowChat`                  | `src/components/organisms/WorkflowChat.tsx`                  | Aszinkron direct megbeszélés chat kliens-admin között 30 másodperces anti-drain polling védelemmel                                                                                                                                                                                         | `"use client"`                         |
| `ServicesSection`               | `src/components/organisms/ServicesSection.tsx`               | Szolgáltatás‑szekció – grid + ServiceCard elemek                                                                                                                                                                                                                                           | Server Component                       |
| `AdminDashboard`                | `src/components/organisms/AdminDashboard.tsx`                | Admin KPI Dashboard Bento Grid elrendezéssel, Top Cards Grid ikonokkal (Mail, FolderKanban, Brain, Activity) és trend indikátorokkal (+12%, +5%, +28%), Activity Feed szekcióval AI recentLogs alapján, Friss Tevékenység megjelenítéssel, Recharts grafikonokkal és CSV export funkcióval | `"use client"`                         |
| `ClientVault`                   | `src/components/organisms/ClientVault.tsx`                   | Ügyfélszéf és fájlmegosztó drag-and-drop feltöltéssel, előnézet modállal (PDF/JPG) és letöltéssel                                                                                                                                                                                          | `"use client"`                         |
| `KristofkaWorkflow`             | `src/components/organisms/KristofkaWorkflow.tsx`             | Kristófka Munkafolyamat (Strategist-Pro) - ingatlanbefektetői pitch generálás PDF alaprajzokból és kontextus paraméterekből                                                                                                                                                                | `"use client"`                         |
| `EmailTemplateEditor`           | `src/components/organisms/EmailTemplateEditor.tsx`           | Email sablonok kezelése és szerkesztése (HTML editor, dinamikus változók, előnézet)                                                                                                                                                                                                        | `"use client"`                         |
| `BannerHero`                    | `src/components/organisms/BannerHero.tsx`                    | Konverziófókuszú hero banner (90/8/2 színarány, Motion animációk, E-E-A-T horgonyok)                                                                                                                                                                                                       | `"use client"` (motion/react)          |
| `LighthousePerformanceSection`  | `src/components/organisms/LighthousePerformanceSection.tsx`  | Scroll-trigger-elt Lighthouse score animáció (useScroll, useTransform, 0-95+ score counter)                                                                                                                                                                                                | `"use client"` (motion/react)          |
| `SuperAdminDashboard`           | `src/components/organisms/SuperAdminDashboard.tsx`           | Szuperadmin Dashboard menüstruktúra (Vizuális Motor, Kreatív Motor, Product Optimizer, System Config), Audit & Deploy funkció, Workflow integráció táblázat                                                                                                                                | `"use client"` (motion/react)          |
| `ArchitectViewSection`          | `src/components/organisms/ArchitectViewSection.tsx`          | Fix, minimális méretű sötét tónusú Audit-kártya a 95+ Lighthouse score mérnöki lépéseivel (WebDude Minőségbiztosítási Pecsét)                                                                                                                                                              | `"use client"` (motion/react)          |
| `ProductLeadHero`               | `src/components/organisms/ProductLeadHero.tsx`               | Termékoldal Hero szekció Authority-Driven SEO horgonyokkal (26 év tapasztalat, Next.js/Supabase technológia) és "Ingyenes Weboldal Audit" CTA-val                                                                                                                                          | `"use client"` (motion/react)          |
| `TechnicalSpecSection`          | `src/components/organisms/TechnicalSpecSection.tsx`          | Technikai specifikáció szekció 6 ponttal (Fertőzésmentes Architektúra, Lighthouse 95+, Modern Tech Stack, Firebase Security, Entity-based SEO, GDPR)                                                                                                                                       | `"use client"` (motion/react)          |
| `LeadGenerationForm`            | `src/components/organisms/LeadGenerationForm.tsx`            | Lead-Magnet űrlap "Ingyenes Weboldal Audit" kéréshez (név, email, weboldal, üzenet) validációval és success/error state-ekkel                                                                                                                                                              | `"use client"`                         |
| `SEOAuditHeroBanner`            | `src/components/organisms/SEOAuditHeroBanner.tsx`            | SEO & AEO Audit Pro Hero szekció Midjourney v6 Master prompt alapján, Authority-Driven SEO horgonyokkal (26 év tapasztalat, 16 év CMS szakértelem)                                                                                                                                         | `"use client"` (motion/react)          |
| `ProofBarSection`               | `src/components/organisms/ProofBarSection.tsx`               | Proof-Bar szekció 26 év tapasztalat és 95+ Lighthouse score bemutatásával, statisztikákkal (47+ vélemény, 4.9 értékelés, 24h válaszidő, 100% garancia)                                                                                                                                     | `"use client"` (motion/react)          |
| `AEOImpactSection`              | `src/components/organisms/AEOImpactSection.tsx`              | AEO Impact animáció szekció dinamikus grafikonokkal (Audit Előtt vs Audit Után), Lighthouse score, Organikus Találat, AI Válasz Motor mutatókkal                                                                                                                                           | `"use client"` (motion/react)          |
| `BannerWorkshopGenerator`       | `src/components/organisms/BannerWorkshopGenerator.tsx`       | Banner AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Electric Cyan dizájnnal és copy-to clipboard funkciókkal                                                                                                                                | `"use client"` (motion/react)          |
| `LogoWorkshopGenerator`         | `src/components/organisms/LogoWorkshopGenerator.tsx`         | Logo AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Electric Cyan dizájnnal és copy-to clipboard funkciókkal                                                                                                                                  | `"use client"` (motion/react)          |
| `MidjourneyWorkshopGenerator`   | `src/components/organisms/MidjourneyWorkshopGenerator.tsx`   | Midjourney AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Electric Cyan dizájnnal és copy-to clipboard funkciókkal                                                                                                                            | `"use client"` (motion/react)          |
| `SeoWorkshopGenerator`          | `src/components/organisms/SeoWorkshopGenerator.tsx`          | SEO Audit AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Electric Cyan dizájnnal és copy-to clipboard funkciókkal                                                                                                                             | `"use client"` (motion/react)          |
| `ContentWorkshopGenerator`      | `src/components/organisms/ContentWorkshopGenerator.tsx`      | Tartalomtervező AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Electric Cyan dizájnnal és copy-to clipboard funkciókkal                                                                                                                       | `"use client"` (motion/react)          |
| `UiUxWorkshopGenerator`         | `src/components/organisms/UiUxWorkshopGenerator.tsx`         | UI/UX AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Electric Cyan dizájnnal és copy-to clipboard funkciókkal                                                                                                                                 | `"use client"` (motion/react)          |
| `SeasonalWorkshopGenerator`     | `src/components/organisms/SeasonalWorkshopGenerator.tsx`     | Szezonalis AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Electric Cyan dizájnnal és copy-to clipboard funkciókkal                                                                                                                            | `"use client"` (motion/react)          |
| `PosterWorkshopGenerator`       | `src/components/organisms/PosterWorkshopGenerator.tsx`       | Poster AI Műhely generátor nyomdai kész specifikációkkal, CMYK értékekkel, tipográfiai hierarchiával és bleed/safe zone irányelvekkel                                                                                                                                                      | `"use client"` (motion/react)          |
| `SocialMediaWorkshopGenerator`  | `src/components/organisms/SocialMediaWorkshopGenerator.tsx`  | Social Media AI Műhely generátor multi-platform támogatással (Instagram, Facebook, LinkedIn, TikTok), engagement-fókuszú copywriting és platform-specifikus irányelvekkel                                                                                                                  | `"use client"` (motion/react)          |
| `CipWorkshopGenerator`          | `src/components/organisms/CipWorkshopGenerator.tsx`          | CIP AI Műhely generátor vállalati arculati elemekkel (névjegykártya, levélpapír, arculati kézikönyv), nyomdai kész specifikációkkal és CMYK értékekkel                                                                                                                                     | `"use client"` (motion/react)          |
| `PresentationWorkshopGenerator` | `src/components/organisms/PresentationWorkshopGenerator.tsx` | Presentation AI Műhely generátor pitch deck, sales prezentáció és investor deck narratív struktúrával, dia sablonokkal és vizuális hierarchiával                                                                                                                                           | `"use client"` (motion/react)          |
| `IconWorkshopGenerator`         | `src/components/organisms/IconWorkshopGenerator.tsx`         | Icon Design AI Műhely generátor SVG vektor ikonokkal, icon szettekkel (15 stílus), minimalista szimbólumokkal és optimalizált SVG útvonalakkal                                                                                                                                             | `"use client"` (motion/react)          |
| `DesignSystemWorkshopGenerator` | `src/components/organisms/DesignSystemWorkshopGenerator.tsx` | Design System AI Műhely generátor design tokens, komponens könyvtár, Tailwind CSS v4 integrációval és Zod validációval                                                                                                                                                                     | `"use client"` (motion/react)          |

### 2.4 Pages

| Route                                                     | Fájl                                                                      | Organisms                                                                                                                            | Leírás                                                                                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `/`                                                       | `src/app/page.tsx`                                                        | HeroSectionNew, SocialProofStrip, SystemShowcase, FeaturedServicesNew, CaseStudiesBento, WhyChooseMeSection, FaqSectionAEO, FinalCta | Főoldal (Soft Premium Redesign 2026.09)                                                                                   |
| `/kapcsolat`                                              | `src/app/kapcsolat/page.tsx`                                              | Header, Hero, ContactFormWrapper, Footer                                                                                             | Kapcsolati oldal                                                                                                          |
| `/szia-norbi-vagyok`                                      | `src/app/szia-norbi-vagyok/page.tsx`                                      | Header, Timeline, Footer                                                                                                             | Személyes "Rólam" oldal                                                                                                   |
| `/szolgaltatasok`                                         | `src/app/szolgaltatasok/page.tsx`                                         | Header, Hero, ServiceCard, Footer                                                                                                    | Szolgáltatások                                                                                                            |
| `/szolgaltatasok/weboldal-keszites`                       | `src/app/szolgaltatasok/weboldal-keszites/page.tsx`                       | SectionTitle, BentoCard, AnimatedSystemFlow, CaseStudyCard, AiChatMockup, Button, Badge                                              | Weboldal készítés (React, Next.js, WordPress, Node.js, HTML, JavaScript)                                                  |
| `/szolgaltatasok/ai-prompt-engineering`                   | `src/app/szolgaltatasok/ai-prompt-engineering/page.tsx`                   | SectionTitle, BentoCard, AnimatedSystemFlow, CaseStudyCard, AiChatMockup, Button, Badge                                              | AI Prompt Engineering szolgáltatás                                                                                        |
| `/szolgaltatasok/add-onok`                                | `src/app/szolgaltatasok/add-onok/page.tsx`                                | Hero, Bento Grid, details/summary FAQ, JSON-LD Schemas                                                                               | Publikus Azonnali Kiegészítők (Add-onok) landing page                                                                     |
| `/munkak`                                                 | `src/app/munkak/page.tsx`                                                 | Header, Hero, PortfolioGrid, Footer                                                                                                  | Referenciák (Bento Grid, ISR)                                                                                             |
| `/hirek`                                                  | `src/app/hirek/page.tsx`                                                  | Header, BlogGrid, Footer                                                                                                             | Hírek (MDX előkészítés)                                                                                                   |
| `/felhasznalasi-feltetelek`                               | `src/app/felhasznalasi-feltetelek/page.tsx`                               | Header, Footer                                                                                                                       | Felhasználási feltételek (Jogi nyilatkozat)                                                                               |
| `/adatvedelmi-szabalyzat`                                 | `src/app/adatvedelmi-szabalyzat/page.tsx`                                 | Header, Footer                                                                                                                       | Adatvédelmi szabályzat és GDPR tájékoztató                                                                                |
| `/admin`                                                  | `src/app/admin/page.tsx`                                                  | AdminSidebar, DashboardStats                                                                                                         | Admin dashboard (Firebase Auth védett)                                                                                    |
| `/admin/dashboard`                                        | `src/app/admin/dashboard/page.tsx`                                        | AdminDashboard                                                                                                                       | Admin KPI Dashboard (Firebase Auth védett, admin jogosultság ellenőrzés)                                                  |
| `/admin/login`                                            | `src/app/admin/login/page.tsx`                                            | AdminLoginForm                                                                                                                       | Admin bejelentkezési oldal (Firebase Auth)                                                                                |
| `/admin/leadek`                                           | `src/app/admin/leadek/page.tsx`                                           | AdminSidebar, LeadsTable                                                                                                             | Legacy Admin Leadek oldal (Firebase Auth védett)                                                                          |
| `/admin/leads`                                            | `src/app/admin/leads/page.tsx`                                            | AdminSidebar                                                                                                                         | Új Kanban-board alapú CRM Leads kezelő felület                                                                            |
| `/admin/portfolio`                                        | `src/app/admin/portfolio/page.tsx`                                        | AdminSidebar                                                                                                                         | Admin Portfólió oldal (Firebase Auth védett, Firestore CRUD)                                                              |
| `/admin/portal-kezelo`                                    | `src/app/admin/portal-kezelo/page.tsx`                                    | AdminSidebar                                                                                                                         | Superadmin Workflow- és Felhasználókezelő felület                                                                         |
| `/portal`                                                 | `src/app/portal/page.tsx`                                                 | PortalDashboard                                                                                                                      | Zárt ügyfélportál főoldala                                                                                                |
| `/portal/vault`                                           | `src/app/portal/vault/page.tsx`                                           | ClientVault                                                                                                                          | Ügyfélszéf és dokumentumkezelő oldal (Firebase Auth védett, előnézet modállal)                                            |
| `/portal/ai-muhely/kristofka`                             | `src/app/portal/ai-muhely/kristofka/page.tsx`                             | KristofkaWorkflow                                                                                                                    | Kristófka Munkafolyamat (Strategist-Pro) - ingatlanbefektetői pitch generálás (Firebase Auth védett)                      |
| `/portal/ai-muhely/banner-ai-muhely`                      | `src/app/portal/ai-muhely/banner-ai-muhely/page.tsx`                      | BannerWorkshopGenerator                                                                                                              | Banner AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                                |
| `/portal/ai-muhely/szezonalis-ai-muhely`                  | `src/app/portal/ai-muhely/szezonalis-ai-muhely/page.tsx`                  | SeasonalWorkshopGenerator                                                                                                            | Szezonalis AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                            |
| `/portal/ai-muhely/ui-ux-ai-muhely`                       | `src/app/portal/ai-muhely/ui-ux-ai-muhely/page.tsx`                       | UiUxWorkshopGenerator                                                                                                                | UI/UX AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                                 |
| `/portal/ai-muhely/tartalomtervezo-ai-muhely`             | `src/app/portal/ai-muhely/tartalomtervezo-ai-muhely/page.tsx`             | ContentWorkshopGenerator                                                                                                             | Tartalomtervező AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                       |
| `/portal/ai-muhely/seo-audit-ai-muhely`                   | `src/app/portal/ai-muhely/seo-audit-ai-muhely/page.tsx`                   | SeoWorkshopGenerator                                                                                                                 | SEO Audit AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                             |
| `/portal/ai-muhely/midjourney-ai-muhely`                  | `src/app/portal/ai-muhely/midjourney-ai-muhely/page.tsx`                  | MidjourneyWorkshopGenerator                                                                                                          | Midjourney AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                            |
| `/portal/ai-muhely/logo-ai-muhely`                        | `src/app/portal/ai-muhely/logo-ai-muhely/page.tsx`                        | LogoWorkshopGenerator                                                                                                                | Logo AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                                  |
| `/portal/ai-muhely/poster-ai-muhely`                      | `src/app/portal/ai-muhely/poster-ai-muhely/page.tsx`                      | PosterWorkshopGenerator                                                                                                              | Poster AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                                |
| `/portal/ai-muhely/social-media-ai-muhely`                | `src/app/portal/ai-muhely/social-media-ai-muhely/page.tsx`                | SocialMediaWorkshopGenerator                                                                                                         | Social Media AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                          |
| `/portal/ai-muhely/cip-ai-muhely`                         | `src/app/portal/ai-muhely/cip-ai-muhely/page.tsx`                         | CipWorkshopGenerator                                                                                                                 | CIP AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                                   |
| `/portal/ai-muhely/presentation-ai-muhely`                | `src/app/portal/ai-muhely/presentation-ai-muhely/page.tsx`                | PresentationWorkshopGenerator                                                                                                        | Presentation AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                          |
| `/portal/ai-muhely/icon-design-ai-muhely`                 | `src/app/portal/ai-muhely/icon-design-ai-muhely/page.tsx`                 | IconWorkshopGenerator                                                                                                                | Icon Design AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                           |
| `/portal/ai-muhely/design-system-ai-muhely`               | `src/app/portal/ai-muhely/design-system-ai-muhely/page.tsx`               | DesignSystemWorkshopGenerator                                                                                                        | Design System AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Cyber-Arany dizájn)                         |
| `/munkafolyamatok/strategist-pro/kristofka-munkafolyamat` | `src/app/munkafolyamatok/strategist-pro/kristofka-munkafolyamat/page.tsx` | —                                                                                                                                    | Kristófka Munkafolyamat SEO oldal (Server Component)                                                                      |
| `/api/webhooks/stripe`                                    | `src/app/api/webhooks/stripe/route.ts`                                    | —                                                                                                                                    | Stripe Webhook API végpont (HMAC-SHA256 aláírás-ellenőrzéssel, Firestore `orders`, `users` és `workflows` frissítésekkel) |

---

## 3. Technológiai Stack

### 3.1 Frontend

```
Next.js 16.x       App Router architektúra, src/ könyvtárban strukturálva
React 19           Server Components alapértelmezett, Client Components "use client"-tel
TypeScript         strict mód, zero-error policy (npx tsc --noEmit = 0 hiba)
Tailwind CSS 4     Utility-first, "WebDude Soft Premium v3.0" dizájn rendszer, config CSS-ben (@theme direktíva)
```

### 3.2 Backend és Infrastruktúra

```
Firebase Auth      Felhasználói hitelesítés (aszinkron, loading state kezeléssel)
Firestore          NoSQL adatbázis, optimalizált single-fetch vagy célzott onSnapshot
Server Actions     src/actions/portfolio.ts, src/actions/portal.ts, src/actions/ai.ts, src/actions/vault.ts (portfólió CRUD, zárt portál műveletek, élő AI generálás, ügyfélszéf fájlregisztráció)
Firebase Hosting   Statikus + SSR hosting, firebase.json routing
deploy.bat         Élesítési szkript – kizárólag a fejlesztő futtatja
```

### 3.3 Fejlesztői Eszközök

```
ESLint             eslint.config.mjs – linting szabályok
TypeScript         tsconfig.json – strict konfiguráció
npm                Csomagkezelő
```

---

## 4. Next.js App Router Struktúra

```
src/
├── app/
│   ├── layout.tsx          # Root layout – <html>, <body>, Space Grotesk & Inter font betöltés, globális metadata
│   ├── page.tsx            # Főoldal (/) – Server Component
│   ├── globals.css         # Tailwind base import, globális stílusok
│   └── [route]/
│       └── page.tsx        # Aloldal – Server Component
├── components/
│   ├── atoms/              # Újrafelhasználható, kontextustól független UI elemek
│   ├── molecules/          # Összetett UI blokkok, atom-kombinációk
│   └── organisms/          # Teljes szekciók, komplex logikával
│       └── Header.tsx
├── lib/
│   ├── firebase.ts         # Firebase app inicializáció (.env.local kulcsok)
│   └── utils.ts            # cn() és egyéb utility segédfüggvények
├── hooks/                  # Custom React hookok (pl. useAuth, useFirestore)
├── types/                  # Globális TypeScript típusdefiníciók
└── styles/                 # Kiegészítő CSS, ha szükséges
```

---

## 5. Adatfolyam és Renderelési Stratégia

### 5.1 Server-side (alapértelmezett)

```
Firestore / statikus adat
        ↓
    page.tsx (Server Component – async fetch)
        ↓
    Organism komponensek (props-on keresztül)
        ↓
    Statikus HTML → gyors FCP, SEO-barát
```

### 5.2 Client-side (csak ha szükséges)

```
Firebase Auth / felhasználói interakció
        ↓
    "use client" organism/molecule
        ↓
    useState / useEffect / onAuthStateChanged
        ↓
    Optimistic UI frissítés
```

### 5.3 Döntési fa: mikor melyik?

```
Van onClick / useState / useEffect / böngésző API?
├── IGEN → "use client" + legkisebb lehetséges komponensbe zárva
└── NEM  → Server Component (alapértelmezett)

Kell valós idejű adat (chat, élő státusz)?
├── IGEN → onSnapshot (Client Component)
└── NEM  → egyszeri getDoc / fetch (Server Component)
```

---

## 6. Firebase Adatmodell

### 6.1 Kollekciók

| Kollekció                | Leírás                                                           | Mezők                                                                                                                                                                                                                               |
| ------------------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `portfolio`              | A referenciák gyűjteménye kategóriák szerint csoportosítva.      | `category` (string: saas / wordpress / design / ai), `title` (string), `tag` (string), `description` (string), `slug` (string), `assets` (map), `keywords` (array)                                                                  |
| `leads`                  | Az asszisztens által előszűrt és elmentett érdeklődők adatai.    | `name` (string), `email` (string), `projectType` (string), `summary` (string), `createdAt` (string/timestamp)                                                                                                                       |
| `workflows`              | Az ügyfelekhez rendelt fejlesztési és AI munkafolyamatok adatai. | `title` (string), `description` (string), `clientId` (string), `status` (string), `content` (string), `createdAt` (timestamp), `approvedByClient` (boolean), `clientApprovedAt` (timestamp)                                         |
| `workflows/.../comments` | A workflow kártyákhoz kapcsolódó megbeszélések kommentjei.       | `authorId` (string), `authorName` (string), `text` (string), `createdAt` (timestamp)                                                                                                                                                |
| `users`                  | A rendszerben regisztrált ügyfelek profil adatai.                | `uid` (string), `email` (string), `name` (string), `role` (string)                                                                                                                                                                  |
| `notes`                  | Az ügyfelek által mentett AI generált jegyzetek és szövegek.     | `clientId` (string), `title` (string), `content` (string), `category` (string), `createdAt` (timestamp)                                                                                                                             |
| `vault`                  | Az ügyfélszéfben megosztott fájlok metaadat regisztere.          | `clientId` (string), `name` (string), `url` (string), `size` (integer/number), `uploadedBy` (string: client / admin), `uploadedByName` (string), `storagePath` (string), `createdAt` (timestamp)                                    |
| `ai_generations`         | Az AI segédeszközök használatának előzményei és naplói.          | `clientId` (string), `clientName` (string), `toolId` (string), `toolName` (string), `inputValues` (string/json), `outputText` (string), `createdAt` (string/timestamp)                                                              |
| `seo_audits`             | SEO audit eredmények és metaadatok.                              | `clientId` (string), `url` (string), `overallScore` (number), `clarityScore` (number), `ctaQualityScore` (number), `overallUXScore` (number), `recommendations` (array), `createdAt` (string/timestamp)                             |
| `competitor_analyses`    | Versenytárs-elemzés eredmények és összehasonlítások.             | `clientId` (string), `targetUrl` (string), `competitorUrls` (array), `targetScore` (number), `competitorScores` (array), `upsellOpportunity` (string), `createdAt` (string/timestamp)                                               |
| `content_plans`          | Tartalomtervezés eredmények és 3 hónapos naptárak.               | `clientId` (string), `industry` (string), `targetAudience` (string), `mainProduct` (string), `blogTopics` (array), `linkedinPosts` (array), `newsletterTopics` (array), `suggestedKeywords` (array), `createdAt` (string/timestamp) |
| `projects`               | Projektek és munkafolyamatok státuszai.                          | `clientId` (string), `title` (string), `status` (string: active / completed / onboarding), `description` (string), `createdAt` (timestamp)                                                                                          |
| `transactions`           | Stripe tranzakciók és bevételek naplója.                         | `clientId` (string), `amount` (number), `currency` (string), `status` (string), `stripePaymentIntentId` (string), `createdAt` (timestamp)                                                                                           |
| `email_templates`        | Email sablonok és értesítési template-ek.                        | `templateId` (string), `name` (string), `subject` (string), `htmlContent` (string), `variables` (array), `category` (string: onboarding / milestone / notification), `updatedAt` (timestamp)                                        |

### 6.2 Biztonsági Szabályok (Firestore Security Rules)

```
// Alap szabály – élesítés előtt finomítani kell
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 7. Routing és Navigáció

```
/              → src/app/page.tsx          (Főoldal)
/[aloldal]     → src/app/[aloldal]/page.tsx (Bővítendő)
```

Firebase Hosting átirányítás a `firebase.json`-ban:

```json
{
  "hosting": {
    "source": ".",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

---

## 8. Kritikus Architektúrális Döntések (ADR)

### ADR-001: App Router választása Pages Router helyett

- **Döntés:** Next.js App Router (`src/app/`)
- **Indok:** Jobb SEO (RSC alapú), streaming, beépített layout rendszer, React 19 kompatibilitás
- **Következmény:** Minden `page.tsx` alapértelmezetten Server Component

### ADR-002: Atomic Design bevezetése

- **Döntés:** `atoms/` → `molecules/` → `organisms/` komponens hierarchia
- **Indok:** Skálázható, újrafelhasználható komponens könyvtár, tiszta függőségi irány
- **Következmény:** Spagettikód és duplikált logika kizárva

### ADR-003: Firebase Hosting + Next.js standalone mód

- **Döntés:** Firebase Hosting a deploy célállomás
- **Indok:** Meglévő Firebase backend (Auth, Firestore) mellé egységes infrastruktúra
- **Következmény:** `deploy.bat` szkript kezeli az élesítést, CI/CD pipeline jövőbeni fejlesztés

### ADR-004: Tailwind CSS 4 globális styling réteg

- **Döntés:** Kizárólag Tailwind utility class-ok, sem CSS modul, sem inline style
- **Indok:** Egységes „Cyber-Arany" dizájn rendszer, gyors iteráció, zero CSS drift
- **Következmény:** `_docs/DESIGN_SYSTEM.md` a vizuális igazság egyedüli forrása

### ADR-005: Állapotkezelés – minimális globális state

- **Döntés:** Redux/Zustand/Context tilos indoklás nélkül; lokális state + Server Components
- **Indok:** Felesleges komplexitás elkerülése, Next.js RSC optimális kihasználása
- **Következmény:** Globális state csak akkor vezethető be, ha server-side adatáramlás már nem elegendő

### ADR-006: Next.js 16 Cache Components rollback

- **Döntés:** Next.js 16 Cache Components kikapcsolása (cacheComponents: false)
- **Indok:** cacheLife() csak "use cache" függvényen belül hívható, new Date() hívások Server Component-ekben tiltottak, build hibák
- **Következmény:** 'use cache' direktíva és cacheLife() hívások eltávolítva minden fájlból, build sikeresen lefutott 42/42 oldallal

---

## 10. KPI Dashboard Aggregációk (Cycle 160-162)

### 10.1 Adatforrások és Aggregációs Logika

| KPI Mutató                          | Adatforrás (Kollekció)                                                 | Aggregációs Logika                                                             | Frissítési Frekvencia    |
| ----------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------ |
| **Havi Bevétel**                    | `transactions`                                                         | `amount` mező összegzése hónaponként, `status: 'completed'` szűréssel          | Napi (Server Action)     |
| **Aktív Projektek**                 | `projects`                                                             | `status: 'active'` vagy `status: 'in_progress'` dokumentek száma               | Valós idejű (onSnapshot) |
| **Befejezett Projektek**            | `projects`                                                             | `status: 'completed'` dokumentek száma                                         | Valós idejű (onSnapshot) |
| **AI Eszköz Használat**             | `ai_generations`, `seo_audits`, `competitor_analyses`, `content_plans` | Események száma eszközönként hónaponként                                       | Napi (Server Action)     |
| **Átlagos Projekt Teljesítési Idő** | `projects`                                                             | `createdAt` és `updatedAt` különbség átlaga `status: 'completed'` dokumentokon | Heti (Server Action)     |
| **Lead Konverziós Ráta**            | `leads` → `projects`                                                   | `leads` száma vs. `projects` száma (hány lead lett projekt)                    | Heti (Server Action)     |

### 10.2 Server Action Implementáció

**Fájl:** `src/actions/dashboard.ts`

```typescript
export async function getDashboardStatsAction(idToken: string) {
  // 1. Auth Verification (admin role check)
  // 2. Firestore aggregációk (Firebase Admin SDK szerveroldali)
  // 3. Strukturált válasz:
  //    - revenueTrend: Array<{ month: string, amount: number }>
  //    - activeProjects: number
  //    - completedProjects: number
  //    - aiToolUsage: Map<string, number>
  //    - avgCompletionTime: number (napokban)
  //    - leadConversionRate: number (százalék)
}
```

### 10.3 Vizuális Megjelenítés (Recharts)

**Komponens:** `src/components/organisms/AdminDashboard.tsx` (már létezik, bővíteni kell)

- **Bevételi Trendek:** `LineChart` vagy `AreaChart` - havi lebontású bevételek
- **Projekt Státuszok:** `PieChart` - aktív vs. befejezett projektek aránya
- **AI Eszköz Használat:** `BarChart` - eszközönkénti használati statisztikák
- **Teljesítési Idő:** `BarChart` - átlagos teljesítési idő hónaponként

### 10.4 Export Funkciók

**PDF Jelentések:**

- `src/actions/export-pdf.ts` - Server Action audit eredmények PDF exportjához (jsPDF vagy pdfkit)
- `src/components/molecules/PdfExportButton.tsx` - Export gomb komponens

**CSV Export:**

- `src/actions/export-csv.ts` - Server Action leadek és tranzakciók CSV exportjához
- `src/components/molecules/CsvExportButton.tsx` - Export gomb komponens

---

## 9. Frissítési Kötelezettség

Az ügynök az alábbi esetekben **automatikusan frissíti** ezt a fájlt:

| Esemény                                  | Szükséges frissítés                                |
| ---------------------------------------- | -------------------------------------------------- |
| Új atom / molecule / organism létrehozva | Komponens regiszter (2. szekció) bővítése          |
| Új route / page.tsx létrehozva           | Pages tábla (2.4) és Routing (7. szekció) bővítése |
| Új Firestore kollekció tervezve          | Adatmodell (6. szekció) frissítése                 |
| Új architektúrális döntés                | ADR hozzáadása (8. szekció)                        |
| Stack verzióváltás                       | Technológiai Stack (3. szekció) frissítése         |

---

_ARCHITECTURE.md v1.0 — webdude.hu | Karbantartó: Norbi (WebDude) | Szinkronban tartandó: AGENTS.md, DESIGN_SYSTEM.md, CHANGELOG.md, ROADMAP.md_
