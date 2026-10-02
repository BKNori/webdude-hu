# 01_CURRENT_TASKS.md — WebDude.hu Projekt

## Aktuális feladatok és állapot (2026-10-02)

### 🟢 Befejezve: Git History Cleanup — Tömeges tárhely felszabadítás

**Dátum:** 2026-09-19  
**Státusz:** ✅ COMPLETED

**Végrehajtott lépések:**
1. `.gitignore` frissítés (deploy_dist/, deploy*.zip kizárva)
2. `git filter-branch` — functions/node_modules törlése a history-ból
3. `git filter-branch` — .firebase/logs törlése a history-ból
4. `git gc --prune=now --aggressive` (refs/original törlés, GC)
5. `git push origin master --force` (GitHub.sync)

**Eredmény:**
- Git pack méret: 566,74 MB → 156,24 MB (**410 MB felszabadulva, 72% reduction**)
- TypeScript validáció: ✅ 0 hiba
- GitHub.remote: ✅ sikeres force push

**Felszabadult hely:** ~410 MB

---

### 🔵 Aktív / Várakozó

**Forrás:** `_docs/ROADMAP.md` — középtávú fejlesztések + technikai adósságok (2026-10-02-i állapot)

#### 🟠 1. Portál funkciók (ügyfél-elégedettség / transzparencia)
- **Valós idejű / polling-alapú értesítések (badge)** — a `src/app/actions/portal-notifications.ts` ma egyszeri lekérést végez;
  késleltetett polling vagy FCM alapú badge szükséges (Anti-Drain Policy: nem `onSnapshot` végtelen ciklusban).
- **Vault dokumentum-előnéző** — PDF- és kép-előnézet a `src/actions/vault.ts` mögötti fájlokhoz.

#### 🟠 2. Admin UI (adat-alapú döntéshozatal)
- **KPI dashboard bővítése** — Revenue, Churn rate, LTV metrikák
  (`src/app/admin/dashboard/`, `src/app/actions/getEnhancedKpiMetrics.ts`).
- **Export funkciók egységesítése** — a `src/app/actions/exportLeads.ts` és `exportProjects.ts`
  különálló akciók; PDF (jspdf) + CSV formátumok egységes felületen, letöltés-dialógussal.

#### 🟡 3. Technikai adósság (stabilitás / hiba-észlelés)
- **Playwright E2E smoke suite** a kritikus útvonalakra:
  - `/kapcsolat` (kapcsolati űrlap → server action)
  - `/munkak` (lista + `/munkak/[slug]` esettanulmány render)
  - `/portal` (auth-guarded felület betöltése)
  - Stripe webhook (`src/app/api/webhooks/stripe/route.ts` — integrációs teszt, szignatúra-ellenőrzéssel)
  - A `test:e2e` script már létezik a `package.json`-ban, lefedett spec még nincs.
- **Sentry monitoring** — production hibák láthatósága (jelenleg csak Firebase Analytics van).

---

### ✅ Lezárva: BTShop hero high-res csere (7.14.4)

- A `btshop-banner-highres.webp` (6675×3758) master a helyére került.
- `src/data/works.ts` (`image` + `bannerImage`) és `src/components/organisms/BtshopCaseStudy.tsx` (hero `src`, 46. sor) frissítve.
- A `gallery[]` tömb és a komponens galéria-blokkja (220. sor) szándékosan változatlan.
- `node scripts/generate-responsive-images.js --clean` → hero 3 kép / 24 fájl, `[CLEAN] nincs elavult`; összesen 78 kép / 434 derivatívum.
- Verifikálva `sharp`-pel: 1600w → 1600×901, 2000w → 2000×1126 px (**valódi downscale**).
- QA: `tsc`=0, `lint --max-warnings 0`=0, `build`=0 (164 oldal).
- **Ezzel a repóban nulla ismert felnagyítás maradt** — a portfólió hero-k vizuális adósságai lezárva.

### ⛔ Megszűnt blokkoló — BTShop hero (2026-10-02)

- A korábbi blokkoló feltétel (**a highres master nem létezett a repóban**) **lezárult**:
  Norbi biztosította a `btshop-banner-highres.webp` (6675×3758) forrást, és a 7.14.4
  sprintben a csere + generálás + mindhárom QA kapu zöld lett.
- A `btshop-banner-2.webp` (1376×768) **a galériában maradt** — ott szándékosan
  a szűk `[320, 640]` AVIF készlet renderelődik, ez nem adósság.
