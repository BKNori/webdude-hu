# ROADMAP.md — WebDude OS Fejlesztési Terv

**webdude.hu | Next.js 16 · React 19 · TypeScript · Firebase**
**Utolsó frissítés: 2026-07-13**

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

### 2. Admin felület funkciók

- **Jelenlegi állapot:** Alap CRM és workflow kezelő
- **Bővítési lehetőségek:**
  - Részletesebb KPI dashboard (revenue, churn rate, LTV)
  - Export funkciók (leadek CSV, munkafolyamatok PDF)
  - Email template editor (automatikus értesítések)
- **Üzleti érték:** Admin hatékonyság növelése, adat-alapú döntéshozatal

### 3. Portál funkcionalitás

- **Jelenlegi állapot:** Alap ügyfélportál (workflow-k, AI eszközök)
- **Bővítési lehetőségek:**
  - Valós idejű értesítések (WebSocket vagy Firebase Cloud Messaging)
  - Dokumentum előnéző a Vaultban (PDF, képek)
  - Projekt idővonal vizualizáció (Gantt chart)
- **Üzleti érték:** Ügyfél-elégedettség növelése, transzparencia

---

## 📋 WebDude OS - Technikai Adósságok

### 1. E2E és integrációs tesztelés

- **Jelenlegi állapot:** 32 egységteszt fut sikeresen
- **Hiányzó:**
  - E2E tesztek (Playwright) kritikus felhasználói útvonalakra
  - Integrációs tesztek (Firebase interactions, Stripe webhooks)
- **Időzítés:** Élesítés után, amikor stabil a forgalom

### 2. CI/CD pipeline automatizáció

- **Jelenlegi állapot:** Manuális `deploy.bat` alapú élesítés
- **Cél:** GitHub Actions automatizált build és deploy
- **Előnyök:**
  - Automatikus tesztek futtatása minden PR-n
  - Rollback lehetőség hiba esetén
  - Staging environment

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
