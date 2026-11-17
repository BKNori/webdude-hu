# ROADMAP.md — WebDude OS Fejlesztési Terv

**webdude.hu | Next.js 16 · React 19 · TypeScript · Firebase**
**Utolsó frissítés: 2026-11-17 (v7.67.0)**

> Ez a dokumentum a WebDude.hu projekt stratégiai fejlesztési ütemterve. A feladatok üzleti és technikai prioritás alapján vannak csoportosítva.
> A jelenlegi projekt állapota: **Production Ready** (Cycle 132)

---

## 🎯 WebDude OS - Azonnali Feladatok

### 1. Blog (/hirek) MDX integráció befejezése ✅

- **Prioritás:** Kritikus - 29 megírt cikk kiaknázatlan potenciál
- **Státusz:** BEFEJEZVE (Cycle 157)
- **Technológia:** `next-mdx-remote` - működőképes
- **Cél:** Tartalmak azonnali indexelhetősége, bejövő forgalom generálása, entitásépítés
- **Mérföldkövek:**
  - ✅ MDX renderelő komponens létrehozva (MDXComponents.tsx)
  - ✅ `/hirek/[slug]/page.tsx` dinamikus útvonal befejezve
  - ✅ BlogGrid MDX adatokkal összekötve
  - ✅ JSON-LD BlogPosting schema integrálva
  - ✅ 30 MDX fájl elérhető és működőképes

### 2. SEO/AEO finomhangolás ✅

- **Prioritás:** Magas - nagy forgalom előtti kötelező lépés
- **Státusz:** BEFEJEZVE (Cycle 158)
- **Cél:** Lighthouse zöld metrikák, AI kereső (AEO) optimalizálás
- **Feladatok:**
  - ✅ Hiányzó JSON-LD Schema.org struktúrák pótlása minden oldalon
  - ✅ AEO-optimalizált FAQ blokkok bővítése (5 új AI kérdés)
  - ✅ OpenGraph képek dinamikus generálásának ellenőrzése (15 fájl)
  - ✅ Meta description és title optimalizáció (Metadata típusosítás)

### 3. Performance optimalizáció ✅

- **Prioritás:** Magas - felhasználói élmény és SEO ranking
- **Státusz:** BEFEJEZVE (Cycle 158)
- **Célmetrikák:** LCP < 2.5s, CLS < 0.1, INP < 200ms
- **Feladatok:**
  - ✅ `next/image` priority propok ellenőrzése fold feletti képeken (HeroSection, szia-norbi-vagyok, szolgaltatasok)
  - ✅ ISR revalidate időzítők finomhangolása (munkak: 3600s, revalidate.ts action)
  - ✅ JavaScript bundle size optimalizáció (webpack fallback, compress: true, turbopack)
  - ✅ Kép tömörítés és WebP konverzió (AVIF/WebP formats, optimalizált imageSizes)

---

## 🔮 WebDude OS - Középtávú Fejlesztések

### 1. AI eszközök bővítése ✅

- **Jelenlegi állapot:** 12 eszköz (marketing + grafikai + SEO Audit + Tartalomtervező + Versenytárs-elemző)
- **Státusz:** BEFEJEZVE (Cycle 159)
- **Elvégzett bővítések:**
  - ✅ SEO audit eszköz (on-page elemzés + JSON-LD schema elemzés + AEO fókusz)
  - ✅ Tartalomtervező (blog outline generátor + LinkedIn posztok + hírlevél témák)
  - ✅ Versenytárs-elemző (keyword gap analysis + CRO benchmarking + Problem->Solution blokkok)
  - ✅ Dinamikus upsell logikák (AEO Audit vs UX Roast Audit vs AI+Emberi Blogcikk Csomag)
- **Üzleti érték:** Portál konverzió növelése, ügyfél-retenció, E-E-A-T építés

### 2. Admin felület funkciók ✅

- **Jelenlegi állapot:** Teljes Kék-Lila v7.0 KPI dashboard és egységesített export központ (`v7.64.0`)
- **Elvégzett bővítések:**
  - ✅ Részletesebb KPI dashboard (MRR, összes bevétel, churn rate, LTV, CAC, `revenueByService`)
  - ✅ Egységesített export funkciók (`AdminExportToolbar`: Leadek/Projektek/Tranzakciók CSV + dinamikus jsPDF KPI Riport PDF)
  - ✅ Email template editor (`EmailTemplateEditor` sandboxolt `<iframe srcDoc="..." sandbox="" />` előnézettel)
- **Üzleti érték:** Admin hatékonyság növelése, adat-alapú döntéshozatal

### 3. Portál funkcionalitás ✅

- **Jelenlegi állapot:** Teljes Kék-Lila v7.0 ügyfélportál (`v7.64.0`)
- **Elvégzett bővítések:**
  - ✅ Valós idejű értesítések (`PortalNotificationBell` + `usePortalNotifications` 3× `onSnapshot`)
  - ✅ Dokumentum előnéző a Vaultban (`ClientVault` + akadálymentes `DocumentPreviewModal` PDF/kép előnézettel)
  - ✅ Projekt idővonal vizualizáció (`ProjectTimelineGantt` chart)
- **Üzleti érték:** Ügyfél-elégedettség növelése, transzparencia

---

## 📋 WebDude OS - Technikai Adósságok

### 1. E2E és integrációs tesztelés ✅

- **Jelenlegi állapot:** 51 Jest egységteszt + Playwright E2E Smoke Suite (`e2e/smoke.spec.ts`, `stripe-webhook.spec.ts`, `munkak-slug.spec.ts`, `pricing-zero-fixed.spec.ts`)
- **Elvégzett bővítések:**
  - ✅ E2E tesztek (Playwright) kritikus felhasználói útvonalakra (`/`, `/szolgaltatasok`, `/munkak/[slug]`, `/kapcsolat`, `/portal`)
  - ✅ Integrációs / biztonsági tesztek (`stripe-webhook.spec.ts` Anti-Drain HMAC őr)
- **Időzítés:** BEFEJEZVE (`v7.65.0`)

### 2. CI/CD pipeline automatizáció ✅ (Verify Gate)

- **Jelenlegi állapot:** `.github/workflows/ci.yml` aktív a `master` ágon (`tsc --noEmit`, `eslint --max-warnings 0`, `jest --no-coverage`, `audit-contrast.js`, `npm run build`); a cPanel élesítés manuális `deploy.bat`/`deploy.ps1` marad
- **Elvégzett bővítések (`v7.66.0`):**
  - ✅ Automatikus TypeScript, ESLint, Jest, WCAG kontraszt-audit és production build minden push/PR-en
  - ⏳ Opcionális: automatikus staging/remote deploy kulcsok beállítása után

### 3. Monitoring és logging bevezetése

- **Jelenlegi állapot:** Firebase Analytics integrálva
- **Hiányzó:**
  - Hiba-követő rendszer (pl. Sentry)
  - Részletes log aggregáció
  - Uptime monitoring
- **Időzítés:** Skálázódás fázisban

---

## 📊 Prioritási Mátrix

| Feladat                   | Üzleti hatás                 | Technikai bonyolultság | Időzítés  |
| ------------------------- | ---------------------------- | ---------------------- | --------- |
| Blog MDX integráció       | Magas (bejövő forgalom)      | Közepes                | Azonnal   |
| SEO/AEO finomhangolás     | Magas (konverzió)            | Alacsony               | Azonnal   |
| Performance optimalizáció | Magas (UX + SEO)             | Közepes                | Azonnal   |
| AI eszközök bővítése      | Közepes (portál érték)       | Közepes                | Középtávú |
| Admin funkciók            | Közepes (hatékonyság)        | Magas                  | Középtávú |
| Portál funkcionalitás     | Magas (ügyfél-elégedettség)  | Magas                  | Középtávú |
| E2E tesztelés             | Alacsony (stabilitás)        | Magas                  | Később    |
| CI/CD pipeline            | Alacsonó (fejlesztői élmény) | Közepes                | Később    |
| Monitoring/logging        | Alacsony (hibaelhárítás)     | Alacsony               | Később    |

---

_ROADMAP.md v1.0 — webdude.hu | Karbantartó: Norbi (WebDude) | Szinkronban tartandó: AGENTS.md, ARCHITECTURE.md, CHANGELOG.md_
