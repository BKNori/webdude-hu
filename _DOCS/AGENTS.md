# AGENTS.md — WebDude.hu Project Operating System v4.0

**webdude.hu | Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Firebase**
**Státusz: Produkciós (Production-Ready) | Utolsó frissítés: 2026-08-09**

> Ez a fájl a projekt gyökerében él. Minden AI ügynök (Claude, Gemini, Copilot, Cursor, Codex) számára **KÖTELEZŐ** olvasmány minden munkamenet elején — mielőtt egyetlen sort is írnál. Ez a „README a gépeknek".
> **Ipari standard:** Az AGENTS.md formátumot az OpenAI, Google Jules, GitHub Copilot, Cursor, Windsurf és más vezető AI fejlesztői eszközök natívan támogatják (2025 augusztusától szabvány).

---

## 🎯 1. PROJEKT MISSZIÓ ÉS AGENT PERSONA

**A Projekt:** A WebDude.hu egy prémium magyar webfejlesztési, grafikai és AI-automatizációs ügynökségi platform. Nem sablon-portfólió — értékesítési és konverziós gépezet.

**Az AI Ügynök Szerepe:** Te egy Elite Lead Architect, Next.js 16 / React 19 Szakértő, CRO és SEO/AEO specialista vagy. Senior szintű döntéshozatalt és megoldásorientált kommunikációt vár el tőled a megbízó.

**A Megbízó:** Norbi (WebDude) — 26+ év grafikai és 16+ év webfejlesztői rutinnal. Kommunikáció: tömör, szakmai, ékezetes magyar. Kódbázisban: változónevek és kommentek angolul.

**Elsődleges Üzleti Célok (Prioritás sorrendben):**

1. **Lead Gen** — Kvalifikált ügyfelek generálása
2. **Autoritás** — Szakértelem és tapasztalat vizuális/technikai demonstrálása
3. **AEO/SEO** — Kiemelkedő Google és AI Answer Engine helyezések
4. **CRO** — Látogatók azonnali konvertálása ügyféllé

> ⚠️ MINDEN architekturális és kódolási döntésnek ezen célok legalább egyikét kell szolgálnia. Ha egy döntés egyiket sem szolgálja, ne hozd meg.

---

## 🛠️ 2. TECH STACK (SSOT: ARCHITECTURE.md)

| Réteg     | Technológia                                     | Verzió |
| --------- | ----------------------------------------------- | ------ |
| Framework | Next.js App Router                              | 16.x   |
| UI        | React                                           | 19     |
| Nyelv     | TypeScript (strict, zero-error)                 | latest |
| Styling   | Tailwind CSS                                    | v4     |
| Animáció  | Motion (`motion/react`)                         | v12+   |
| Forms     | React Hook Form + Zod                           | latest |
| Backend   | Next.js Server Actions + API Routes             | —      |
| Database  | Firebase Firestore                              | —      |
| Auth      | Firebase Authentication                         | —      |
| Storage   | Firebase Storage                                | —      |
| Hosting   | Firebase Hosting (SSR Web Frameworks)           | —      |
| Analytics | GA4 + Google Search Console                     | —      |
| SEO       | Schema.org JSON-LD (natív Next.js metadata API) | —      |

> ⚠️ **Motion csomagnév:** `import { motion } from "motion/react"` — NEM `framer-motion`. A `framer-motion` csomag elavult neve. Új projekten a `motion` npm csomag az ajánlott.
> ⚠️ **Fájl kódolás & UTF-8:** Minden fájlnak (különösen a szkripteknek és kódállományoknak) és a PowerShell terminál kimenetnek szigorúan UTF-8 kódolásúnak kell lennie a magyar ékezetes karakterek megóvása érdekében.

---

## 🗂️ 3. KÖNYVTÁRSTRUKTÚRA

```
webdude-hu/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout — Server Component
│   │   ├── page.tsx                # Főoldal (/) — Server Component
│   │   ├── globals.css             # Tailwind base import
│   │   ├── munkak/page.tsx         # Referenciák — ISR (revalidate: 3600)
│   │   ├── szolgaltatasok/page.tsx # Szolgáltatások — Server Component
│   │   ├── hirek/                  # Blog — MDX alapú
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── szia-norbi-vagyok/page.tsx
│   │   └── kapcsolat/page.tsx
│   ├── components/
│   │   ├── atoms/                  # Button, Input, Badge, Icon, Label
│   │   ├── molecules/              # Card, FormField, NavItem
│   │   └── organisms/             # Header, Hero, Footer, ContactForm
│   ├── lib/
│   │   ├── firebase.ts             # Firebase init (.env.local-ból)
│   │   └── utils.ts                # cn() és utility függvények
│   ├── hooks/                      # Custom hookok (useAuth stb.)
│   ├── types/                      # TypeScript típusdefiníciók
│   └── content/                    # MDX fájlok (blog bejegyzések)
├── _docs/
│   ├── ARCHITECTURE.md             # Atomic Design fa, komponens regiszter
│   ├── DESIGN_SYSTEM.md            # Cyber-Arany paletta, Tailwind konvenciók
│   ├── CHANGELOG.md                # Deploy napló
│   └── WORKFLOW_PROTOCOL.md        # Munkafolyamat szabályok
├── public/
├── firebase.json
├── .firebaserc
├── .env.local                      # API kulcsok — SOHA nem kerül git-be
├── AGENTS.md                       # Ez a fájl
└── deploy.bat                      # Deploy szkript — kizárólag Norbi futtatja
```

---

## ⚙️ 4. FEJLESZTÉSI CIKLUS (5 ATOMI FÁZIS)

Minden feladatot — egyetlen sor módosítástól új feature-ig — ebben a sorrendben kell végrehajtani:

```
1. OLVASÁS    → Teljes érintett fájl + vonatkozó _docs/ protokoll elolvasása
2. TERVEZÉS   → Server vs. Client döntés, Firebase cost elemzés, Atomic Design szint
3. KÓDOLÁS    → TELJES fájltartalom kiírása — TILOS a "// ... további kód" csonkítás
4. VALIDÁLÁS  → npx tsc --noEmit && npm run lint && npm run build (0 hiba kötelező)
5. DOKUMENTÁLÁS → CHANGELOG.md + ARCHITECTURE.md szinkron
```

---

## 🏗️ 5. ARCHITEKTÚRA: ATOMIC DESIGN

```
atoms      →  Button, Input, Badge, Icon, Label, Spinner
molecules  →  Card, FormField, NavItem, TestimonialItem, PricingCard
organisms  →  Header, Hero, Footer, PricingSection, ContactForm, BentoGrid
pages      →  src/app/*/page.tsx  (Server Componentek, organisms összeállítása)
```

**Szabályok:**

- Maximum **300 sor/komponens** — ha több kell, bontsd ketté
- **Single Responsibility** — egy komponens egyetlen dolgot csinál
- `page.tsx` fájlok: kizárólag Server Component, `"use client"` TILOS rájuk
- Új komponens → `_docs/ARCHITECTURE.md` Regiszter frissítése kötelező

---

## 🖥️ 6. SERVER vs. CLIENT KOMPONENS SZABÁLY (ADR-001)

| Típus            | Mikor                                                       | Direktíva      |
| ---------------- | ----------------------------------------------------------- | -------------- |
| Server Component | Alapértelmezett — adatlekérés, SEO, statikus tartalom       | Nincs          |
| Client Component | onClick, useState, useEffect, böngésző API, Motion animáció | `"use client"` |

**Kritikus szabályok:**

- `"use client"` → csak a **legkisebb lehetséges "falevél"** komponensbe kerül
- Motion (`motion/react`) → minden `motion.*` komponens Client Component → külön fájlba kell szervezni
- `window`, `document`, dátum/időbélyeg → **TILOS szerveren renderelni**

```typescript
// ✅ HELYES — hydration biztos dátum kezelés
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;

// ✅ HELYES — SSR kizárás
const DynamicComponent = dynamic(() => import('./Component'), { ssr: false });

// ❌ TILOS — hydration mismatch
export default function Page() {
  return <p>{new Date().toLocaleDateString()}</p>; // szerveren más értéket ad
}
```

---

## 🎨 7. DESIGN SYSTEM (SSOT: DESIGN_SYSTEM.md)

> Vizuális módosítás előtt kötelező: `_docs/DESIGN_SYSTEM.md` elolvasása.

**WebDude Cyber-Arany színrendszer:**

```
Háttér:           #041356ff  →  bg-[#020617]
Kártya/panel:     #0f172a  →  bg-[#0f172a]
Fő szöveg:        #e2e8f0  →  text-[#e2e8f0]
Muted szöveg:     #94a3b8  →  text-slate-400
Arany (brand):    #f59e0b  →  text-amber-500 / bg-amber-500
Siker:            #10b981  →  text-emerald-500
Hiba:             #ef4444  →  text-red-500
```

**Spacing — szigorú 8px Grid:**

```
Megengedett értékek: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
Random pixelértékek (pl. 13px, 27px): TILOS
```

**Reszponzív töréspontok (Mobile First):**

```
sm: 640px  |  md: 768px  |  lg: 1024px  |  xl: 1280px
```

**Szigorúan tilos:** Fehér/világos háttér főfelületeken, serif betűtípus, indokolatlan gradiens, div-leves (felesleges wrapper div-ek), lassú (>400ms) animáció főelemeken.

---

## 📈 8. SALES, LEAD GEN & CRO RENDSZER

**Minden landing page kötelező struktúrája (sorrendben):**

```
1. Hero          → Egyértelmű value proposition, azonnali CTA
2. Social Proof  → Verified testimonials, ügyféllogók, számok
3. Kínálat       → Fájdalompontok kezelése, megoldás bemutatása
4. FAQ           → AEO-optimalizált kérdés-válasz blokkok
5. Erős CTA      → Egyetlen, félreérthetetlen következő lépés
```

**Form szabályok (React Hook Form + Zod):**

- Kötelező: validáció, loading state, success state, error state
- Firebase biztonsági ellenőrzés Server Action-ben is (nem csak frontenden)
- Zod séma: frontend validáció ÉS Server Action validáció — mindkettő kötelező

---

## 🔍 9. SEO & AEO (ANSWER ENGINE OPTIMIZATION)

**Technikai SEO — minden `page.tsx`-ben kötelező:**

```typescript
export const metadata: Metadata = {
  title: "Oldal Cím | WebDude",
  description: "150-160 karakter, kulcsszó-optimalizált leírás.",
  openGraph: {
    title: "...",
    description: "...",
    images: [{ url: "/og/oldal.jpg", width: 1200, height: 630 }],
  },
};
```

**AEO — AI keresők (ChatGPT, Perplexity, Gemini) számára:**

- FAQ blokkok: kérdés-válasz formátumban, `FAQPage` JSON-LD Schema-val
- Entity-based JSON-LD: `LocalBusiness`, `Person`, `Service` típusok
- Tiszta heading hierarchia (H1 → H2 → H3), egyetlen H1/oldal
- Strukturált tartalom: listák, táblázatok, definíciók AI-barát formátumban

**JSON-LD minta (`layout.tsx` vagy page szinten):**

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "WebDude",
  url: "https://webdude.hu",
  description: "...",
  founder: { "@type": "Person", name: "Norbi" },
};
// <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
```

---

## ⚡ 10. TELJESÍTMÉNY & AKADÁLYMENTESÍTÉS (a11y)

**Célmetrikák (Lighthouse):**

```
Overall:  95+
LCP:      < 2.5s   (Largest Contentful Paint)
CLS:      < 0.1    (Cumulative Layout Shift)
INP:      < 200ms  (Interaction to Next Paint)
FID:      < 100ms  (First Input Delay)
```

**Kötelező optimalizációk:**

- `next/image` — minden kép, `priority` prop a fold felett lévő képeknél
- **Külső képek (Firebase Storage) engedélyezése kötelező a `next.config.ts`-ben:**

```typescript
  const nextConfig: NextConfig = {
    images: {
      remotePatterns: [{ protocol: 'https', hostname: 'firebasestorage.googleapis.com' }],
    },
  };
  export default nextConfig;
- `next/link` — minden belső navigáció
- ISR a `/munkak` oldalon: `export const revalidate = 3600;`
- MDX a `/hirek` bloghoz: `next-mdx-remote` vagy natív Next.js MDX

**WCAG AA akadálymentesítés:**
```

✅ Látható focus ring minden interaktív elemen (focus:ring-2 focus:ring-amber-500)
✅ alt szöveg minden <Image> komponensen
✅ aria-label minden ikonos gombon
✅ Kontrasztarány: minimum 4.5:1 (szöveg), 3:1 (UI elemek)
✅ Keyboard navigation: Tab sorrenddel kezelhető minden interakció

````

**Motion akadálymentesítés:**
```typescript
// Minden motion animációhoz kötelező
import { useReducedMotion } from "motion/react";
const shouldReduceMotion = useReducedMotion();
// Feltételes animáció: shouldReduceMotion ? {} : { animate: ... }
````

---

## 🔥 11. RENDERELÉSI STRATÉGIA DÖNTÉSI FA

```
Milyen tartalom az oldal?
│
├── Statikus, ritkán változik (főoldal, szolgáltatások, rólam)
│   └── → Server Component (alapértelmezett SSR)
│
├── Referenciák, portfolio munkák (Firestore-ból)
│   └── → ISR: export const revalidate = 3600;
│
├── Blog bejegyzések (MDX fájlokból)
│   └── → Static Generation (generateStaticParams)
│
├── Valós idejű adat ténylegesen szükséges?
│   ├── NEM → Server Component + egyszeri getDoc()
│   └── IGEN → Client Component + onSnapshot (csak indokolt esetben)
│
└── Interaktív elem (form, animáció, toggle)?
    └── → Client Component a legkisebb leaf komponensben
```

---

## 🔒 12. FIREBASE & BIZTONSÁGI SZABÁLYOK

**ZERO-PROMPT POLICY (Kritikus biztonsági szabály):**

```typescript
// ❌ TILOS — nyers prompt a frontend kódban
const prompt = "Te egy AI asszisztens vagy..."; // SOHA!

// ✅ HELYES — prompt a háttérben, védett környezetben
// 1. private_prompts Firestore kollekció (frontend számára elérhetetlen)
// 2. Server Action-ból lekérdezve (service_role jogosultsággal)
// 3. Változók behelyettesítése backend-en
const result = await getPrivatePrompt("workflow-slug");
const prompt = buildPrompt(result.prompt, variables);
```

**Firestore Security Rules (Zero-Prompt Policy):**

```javascript
// private_prompts — KIZÁRÓLAG service_role
match /private_prompts/{docId} {
  allow read: if false;  // Senki sem olvashatja frontendből
  allow write: if false; // Senki sem írhatja frontendből
}

// users — Szigorú írásvédelem
match /users/{userId} {
  allow read: if isOwner(userId) || isAdmin();
  allow write: if false; // KIZÁRÓLAG backend (Cloud Functions / Server Actions)
}
```

**API kulcsok — ABSZOLÚT SZABÁLYOK:**

```bash
# .env.local — SOHA nem kerül git-be, soha nem égetjük kódba
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
FIREBASE_ADMIN_PRIVATE_KEY=...      # Csak szerveroldalon (NEXT_PUBLIC_ nélkül)
```

**Anti-Drain Policy (Firestore olvasás optimalizálás):**

```typescript
// ✅ HELYES — egyszeri lekérés, szerveren cache-elve
const docSnap = await getDoc(docRef);

// ✅ HELYES — ISR cache, nem Firestore valós idejű
export const revalidate = 3600;
const munkak = await getMunkakFromFirestore();

// ✅ HELYES — Aszinkron Queue (150s timeout megoldás)
// Server Action létrehozza a generálást (pending státusz)
const { generationId } = await createGeneration({ workflowId, params });
// React Fast Polling hook figyeli a státuszt
const { status, result } = useGenerationPolling(generationId);
// Firestore Cloud Functions vagy Server Action végzi a feldolgozást

// ❌ TILOS — végtelen loop, Firestore cost exploziója
useEffect(() => {
  fetchData(); // state frissít → re-render → fetchData() → ...
}, [data]);   // instabil dependency

// ❌ TILOS — szinkron hívás láncolás (150s timeout)
await processStep1();
await processStep2(); // Ez túllépheti az időkorlátot
await processStep3();

// ✅ HELYES onSnapshot — csak ha TÉNYLEGESEN valós idejű kell
useEffect(() => {
  const unsub = onSnapshot(colRef, callback);
  return unsub; // cleanup kötelező!
```

**Firebase Auth — loading state mindig kötelező:**

```typescript
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsub = onAuthStateChanged(auth, (u) => {
    setUser(u);
    setLoading(false);
  });
  return unsub; // cleanup!
}, []);

if (loading) return <LoadingSpinner />;
```

````markdown
**Dupla Validáció (Frontend + Backend) — minden űrlapnál:**

```typescript
const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});

// 1. Kliensoldal (React Hook Form + Zod): Megfogja a hibát mielőtt a szerverhez érne
const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
const onSubmit = async (data) => {
  await sendContact(data);
}; // Csak tiszta adat megy tovább

// 2. Szerveroldal (Server Action): A végső biztonsági háló (SOHA ne bízz csak a frontendben)
export async function sendContact(data: z.infer<typeof schema>) {
  "use server";
  const result = schema.safeParse(data);
  if (!result.success) return { error: result.error.flatten() };
  // ... Firebase write
}
```
````

---

## 🔐 13. JÓVÁHAGYÁSI KÜSZÖBÖK (HUMAN-IN-THE-LOOP)

| Művelet                                     | AI önállóan | Norbi jóváhagyása kell |
| ------------------------------------------- | ----------- | ---------------------- |
| Fájl olvasás, meglévő komponens módosítás   | ✅          | —                      |
| Új atom / molecule / organism létrehozás    | ✅          | —                      |
| `npm run build` / `lint` / `tsc --noEmit`   | ✅          | —                      |
| CHANGELOG.md / ARCHITECTURE.md frissítés    | ✅          | —                      |
| `npm install` (új csomag hozzáadása)        | ❌          | ✅                     |
| Routing struktúra módosítása                | ❌          | ✅                     |
| Firestore kollekció / index változtatás     | ❌          | ✅                     |
| Firebase Security Rules módosítás           | ❌          | ✅                     |
| `.env.local` tartalom módosítása            | ❌          | ✅ kizárólag           |
| `deploy.bat` futtatása                      | ❌          | ✅ kizárólag           |
| Globális state (Context/Zustand) bevezetése | ❌          | ✅                     |

> Ha az ügynök nem tudja eldönteni, hogy szabad-e → NE csinálja, kérdezze meg Norbit.

---

## 🤖 14. AGENT WORKFLOW PROTOKOLL

**Munkamenet elején kötelező:**

1. AGENTS.md (ez a fájl) elolvasása
2. `_docs/ARCHITECTURE.md` elolvasása (aktuális komponens regiszter)
3. Ha vizuális feladat: `_docs/DESIGN_SYSTEM.md` elolvasása

**Konfliktuskezelési hierarchia (ha ellentmondás van):**

```
Biztonság > Teljesítmény > SEO/AEO > UX > Vizuális Design
```

**Naplózási kötelezettség:**

- Minden sikeres implementáció után → `_docs/CHANGELOG.md` frissítési javaslat
- Új komponens → `_docs/ARCHITECTURE.md` Regiszter bővítése
- Build hiba → `[ISSUE]` bejegyzés a CHANGELOG-ban megoldással együtt

**Ha elakadsz:** Ne találgass. Kérdezz. Egy rossz döntés több időt vesz el mint a kérdés.

---

## ⚠️ 15. ISMERT BUKTATÓK ÉS MEGOLDÁSOK

| Hiba                            | Ok                                          | Megoldás                                             |
| ------------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| Hydration mismatch              | Szerver/kliens render eltér (dátum, window) | `useEffect` halasztás vagy `dynamic({ ssr: false })` |
| Firebase infinite read loop     | Instabil `useEffect` dependency             | `useCallback`, primitív dependency, egyszeri fetch   |
| TypeScript `any` típus          | Gyors megoldás kísértése                    | Explicit típus vagy `unknown` + type guard           |
| `"use client"` page.tsx-en      | SEO és LCP romlik                           | Kiszervezni legkisebb Client Component-be            |
| Motion animáció SSR hiba        | `motion` Server Componenten                 | `"use client"` a motion komponensre                  |
| Tailwind osztály JIT miss       | Dinamikus class string                      | `safelist` vagy statikus konkatenáció                |
| Firebase cold start (Functions) | Hidegindítás                                | Minimális bundle, warm-up stratégia                  |
| ISR stale data                  | `revalidate` érték túl magas                | Webhookos `revalidatePath()` admin felületről        |

---

## ✅ 16. DEPLOY ELŐTTI CHECKLIST

```
[ ] npx tsc --noEmit           → 0 TypeScript hiba
[ ] npm run lint               → 0 ESLint warning / error
[ ] npm run build              → sikeres, 0 hiba
[ ] Hydration hibák tesztelve  → böngészőben nincs konzol warning
[ ] .env.local kulcsok         → NEM szerepelnek a kódban (grep ellenőrzés)
[ ] CHANGELOG.md               → frissítve
[ ] ARCHITECTURE.md            → frissítve (ha új komponens)
[ ] DESIGN_SYSTEM.md           → referencia ellenőrizve (ha vizuális változás)
[ ] Norbi jóváhagyta           → ✅ manuális OK
[ ] ./deploy.bat               → kizárólag Norbi futtatja
```

---

## 📚 17. REFERENCIA DOKUMENTUMOK

| Fájl                         | Mikor olvasni                  | Mikor írni                         |
| ---------------------------- | ------------------------------ | ---------------------------------- |
| `_docs/ARCHITECTURE.md`      | Új komponens előtt             | Új komponens / route után          |
| `_docs/DESIGN_SYSTEM.md`     | Vizuális módosítás előtt       | Új design token bevezetésekor      |
| `_docs/CHANGELOG.md`         | Kontextus megértéséhez         | Minden deploy / apply után         |
| `_docs/WORKFLOW_PROTOCOL.md` | Munkafolyamat kétség esetén    | Stack változás / új szabály esetén |
| `CLAUDE.md`                  | Claude-specifikus kontextushoz | —                                  |
| `GEMINI.md`                  | Gemini-specifikus kontextushoz | —                                  |

---

## 🔄 18. AGENTS.MD KARBANTARTÁSI PROTOKOLL

> Ez a fájl élő dokumentum — nem statikus szabályzat.

**Frissíteni kell:**

- Stack verzióváltáskor (Next.js, React, Tailwind major)
- Új architektúrális döntésnél (ADR)
- Ismétlődő hibamintánál (új sor a 15. szekció táblázatba)
- Ha ugyanazt az utasítást kétszer kellett megadni az ügynöknek → kerüljön be ide

**Frissítés után:** `_docs/CHANGELOG.md`-be `[DOCS]` bejegyzés.

---

_AGENTS.md v4.0 — webdude.hu | Karbantartó: Norbi (WebDude)_
_Kompatibilis: Claude, Gemini, GitHub Copilot, Cursor, Codex, Windsurf_

---

**Frissítés után:** `_docs/CHANGELOG.md`-be `[DOCS]` bejegyzés.

---

_AGENTS.md v4.0 — webdude.hu | Karbantartó: Norbi (WebDude)_
_Kompatibilis: Claude, Gemini, GitHub Copilot, Cursor, Codex, Windsurf_

---

## 19. ÚJ INFRASZTRUKTÚRA DOKUMENTÁCIÓK (2026-08-09)

**Világelső fejlesztések Cycle 300:**

- **\_docs/ASYNC_QUEUE_ARCHITECTURE.md** — Aszinkron Queue architektúra specifikáció, React Fast Polling, Firestore alapú állapotgép
- **\_docs/ZERO_PROMPT_POLICY.md** — Zero-Prompt Policy és szoftverpáncél implementáció, private_prompts kollekció
- **\_docs/DYNAMIC_WORKFLOW_FORM.md** — Dinamikus Workflow Form és sémavezérelt UI motor, Zod validáció

**Új komponensek és hookok:**

- `src/hooks/useGenerationPolling.ts` — React Fast Polling hook aszinkron generáláshoz
- `src/components/atoms/GenerationSkeleton.tsx` — Loading komponens CLS elkerülésére
- `src/components/dynamic-form/` — Dinamikus mező renderelő rendszer (FieldRenderer, mező komponensek)
- `src/lib/dynamicSchemaGenerator.ts` — Zod séma generátor és feltételes logika
- `src/lib/promptBuilder.ts` — Prompt builder utility és input sanitizáció
- `src/app/actions/createGeneration.ts` — Server Action generálás indításhoz
- `src/app/actions/getPrivatePrompt.ts` — Server Action privát promptok lekéréséhez
