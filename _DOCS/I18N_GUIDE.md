# i18n Karbantartási Útmutató (`webdude.hu`)

**Architektúra:** Natív JSON Dictionary (`src/dictionaries/hu.json`, `src/dictionaries/en.json`, `src/types/dictionary.ts`) — `next-intl` NÉLKÜL.  
**Útvonalak:** Magyar oldalak prefix nélkül (`/`), angol oldalak `/en/` alatt.

---

## Új szöveg vagy oldal felvétele két nyelven (3 lépés)

### 1. Típus és szótár bővítése
1. Vedd fel az új kulcsot a megfelelő interfészbe a [src/types/dictionary.ts](file:///c:/CLI-PROJECTS/webdude-hu/src/types/dictionary.ts) fájlban (szigorú TypeScript, `any` tilos).
2. Add hozzá ugyanazt a kulcsot **mindkét** fájlhoz:
   - [src/dictionaries/hu.json](file:///c:/CLI-PROJECTS/webdude-hu/src/dictionaries/hu.json) (magyarul, egyes szám első személyben: *"én csinálom"*, Zéró Fix Ár)
   - [src/dictionaries/en.json](file:///c:/CLI-PROJECTS/webdude-hu/src/dictionaries/en.json) (angolul, egyes szám első személyben: *"I / my"*, Zéró Fix Ár, látható szövegben nincs `"Kecskemét"`).

### 2. Komponens vagy oldal bekötése
- **Oldal szinten (Server Component):** Hívd meg a `await getDictionary("hu")` / `await getDictionary("en")` függvényt, és add át a szükséges szótár-szeletet propként a kliens komponenseknek.
- **Globális layout elemek (`HeaderNavClient`, `Footer`, `CookieConsent`, `WebDudeChat`):** A `RootLayout` a `pickGlobalDictionary()` segítségével kizárólag a könnyűsúlyú `common`, `nav`, `footer`, `cookie`, `chat` szeleteket adja át a `PageWrapper`-nek `{ hu, en }` formában.

### 3. Automatizált ellenőrzés futtatása
Minden módosítás után futtasd le a szótár-őrt és a teszteket:
```bash
npm run check:i18n
npx jest --no-coverage
```
Mit ellenőriz a `npm run check:i18n` (`scripts/check-i18n.js`)?
- 100%-os kulcs- és tömbhossz-egyezést `hu.json` és `en.json` között.
- Üres stringek kiszűrését (kivéve az opcionális `suffix` / `titleSuffix` / `titleHighlight` mezőket).
- Magyar ékezetes karakterek (`áéíóöőúüű`) szivárgását az `en.json`-ban (a whitelistelt tulajdonnevek, pl. `Balog Norbert`, `Kecskemét` kivételével).
