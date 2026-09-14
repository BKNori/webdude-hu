# CHANGELOG Entry Írási Guideline

## Cél

Ez a dokumentum segít a CHANGELOG.md entry-k írásában, hogy a naplózás konzisztens, strukturált és könnyen olvasható legyen.

## Entry Formátum

Minden CHANGELOG entry a következő formátumot követi:

```markdown
- **YYYY-MM-DD — Rövid Cím (Cycle X):** Rövid leírás a fejlesztésről. Érintettség: fájl útvonalak. Validáció: parancs és eredmény.
```

### Példa

```markdown
- **2026-06-22 — Next.js 16 Cache Components Rollback (Cycle 85):** Next.js 16 Cache Components kikapcsolása a build hibák miatt (cacheLife() csak "use cache" függvényen belül hívható, new Date() hívások Server Component-ekben tiltottak). 'use cache' direktíva és cacheLife() hívások eltávolítása minden fájlból (munkak/page.tsx, hirek/page.tsx, hirek/[slug]/page.tsx, 13 szolgáltatás aloldal, szolgaltatasok/page.tsx). next.config.js cacheComponents: false beállítás. Motion LazyMotion implementálás (bundle size optimalizálás 34kb → 4.6kb). Érintettség: next.config.js, src/app/munkak/page.tsx, src/app/hirek/page.tsx, src/app/hirek/[slug]/page.tsx, src/app/szolgaltatasok/*/page.tsx. Validáció: npm run build - sikeres (42 oldal generálva, 0 hiba).
```

## Entry Komponensek

### 1. Dátum (YYYY-MM-DD)

- Formátum: `YYYY-MM-DD`
- Példa: `2026-06-22`

### 2. Rövid Cím

- Rövid, tömör cím (max 10-15 szó)
- A címnek le kell írnia a fejlesztés lényegét
- Példa: `Next.js 16 Cache Components Rollback`

### 3. Cycle Szám

- Minden entry-hez tartozik egy Cycle szám
- A Cycle számok folyamatosan növekednek
- Példa: `(Cycle 85)`

### 4. Rövid Leírás

- Rövid leírás a fejlesztésről (max 2-3 mondat)
- A leírásnak tartalmaznia kell:
  - A fejlesztés célját
  - A fejlesztés lényegét
  - A fejlesztés eredményét
- Példa: `Next.js 16 Cache Components kikapcsolása a build hibák miatt (cacheLife() csak "use cache" függvényen belül hívható, new Date() hívások Server Component-ekben tiltottak). 'use cache' direktíva és cacheLife() hívások eltávolítása minden fájlból.`

### 5. Érintettség

- Az összes érintett fájl útvonalát felsorolni
- Ha sok fájl érintett, akkor helyettesítő karaktereket használhatunk (pl. `src/app/szolgaltatasok/*/page.tsx`)
- Példa: `Érintettség: next.config.js, src/app/munkak/page.tsx, src/app/hirek/page.tsx, src/app/hirek/[slug]/page.tsx, src/app/szolgaltatasok/*/page.tsx.`

### 6. Validáció

- A validációs parancs és az eredmény
- Ha a validáció sikeres, akkor `sikeres` szót használni
- Ha a validáció sikertelen, akkor a hibaüzenetet leírni
- Példa: `Validáció: npm run build - sikeres (42 oldal generálva, 0 hiba).`

## Best Practices

### 1. Rövidség

- Az entry-k legyenek rövidek és tömörek
- Kerüljük a felesleges részleteket
- A lényegre koncentráljunk

### 2. Konzisztencia

- Minden entry-nek ugyanazt a formátumot kell követnie
- A dátumok, címek és leírások konzisztensek legyenek
- A Cycle számok folyamatosan növekedjenek

### 3. Struktúra

- Az entry-k legyenek strukturáltak és könnyen olvashatóak
- A komponensek legyenek egyértelműen elkülönítve
- A pontok és vesszők helyes használata

### 4. Pontosság

- Az entry-k legyenek pontosak és tényeken alapuljanak
- Kerüljük a spekulációkat
- A validációs eredmények legyenek pontosak

## Példa Entry-k

### Példa 1: Build Hiba Javítás

```markdown
- **2026-06-21 — Build Hiba Javítás - Inline Style MDX Compatibility (Cycle 75):** Kritikus build hiba javítása WordPress karbantartás blog MDX fájlon. Inline CSS style attribútumok cserélve Tailwind osztályokra (style="text-align: justify;" → className="text-justify"). Érintettség: src/content/blog/wordpress-karbantartas-webhely-karbantartas-13-kotelezo-feladat-2023-ban.mdx. Validáció: npm run build - sikeres.
```

### Példa 2: Új Komponens Létrehozása

```markdown
- **2026-06-21 — WOW Hatású Animációk Implementálása (Cycle 74):** Motion/react alapú prémium animációk HeroSection komponensben. Progress Circle, CTA Button, Slide indikátorok és Kép animációk implementálása (scale, rotateY 3D effektek, spring bounce). Érintettség: src/components/organisms/HeroSection.tsx. Validáció: npx tsc --noEmit - 0 hiba.
```

### Példa 3: Refactoring

```markdown
- **2026-06-21 — React 19 Server Components Optimalizálás (Cycle 76):** MotionWrapper pattern implementálása bundle méret csökkentésre. 5 organizmus komponens átalakítva Server Component-re (SocialProofStrip, ProblemSolution, FeaturedServices, FaqSection, FinalCta). Érintettség: src/components/molecules/MotionWrapper.tsx, src/components/organisms/*.tsx. Validáció: npx tsc --noEmit - 0 hiba, npm run build - sikeres (38 oldal generálva).
```

## Összefoglalás

A CHANGELOG entry-k írásának célja, hogy a fejlesztési történet konzisztens, strukturált és könnyen olvasható legyen. A fenti guideline segít a konzisztencia fenntartásában és a minőségi naplózás biztosításában.
