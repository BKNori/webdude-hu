# Microsoft Clarity Integráció — Hőtérképek és Session Felvételek
> **Verzió:** v1.0  
> **Dátum:** 2026-08-12  
> **Leírás:** Microsoft Clarity heatmap és session recording integráció a WebDude.hu platformon

---

## 🎯 MIÉRT MICROSOFT CLARITY?

**Előnyök:**
- **Ingyenes:** Korlátlan session felvételek és hőtérképek
- **GDPR kompatibilis:** Adatvédelmi beállítások
- **Real-time insights:** Élő felhasználói viselkedés
- **CRO optimalizálás:** Konverziós tölcsér elemzés
- **Add-on szolgáltatás:** Ügyfeleknek is eladható

**Funkciók:**
- **Heatmaps:** Kattintási hőtérképek
- **Scroll maps:** Görgetési hőtérképek
- **Session recordings:** Session felvételek
- **Rage clicks:** Dühös kattintások detektálása
- **Dead clicks:** Holt kattintások elemzése

---

## 🛠️ IMPLEMENTÁCIÓ

### 1. Clarity Projekt Létrehozása
1. Regisztráció: https://clarity.microsoft.com
2. Projekt létrehozása
3. Project ID beszerzése (pl: `abc123xyz`)

### 2. Script Hozzáadása
```typescript
// src/lib/clarity.ts
declare global {
  interface Window {
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

export function initClarity(projectId: string) {
  if (typeof window === "undefined") return;

  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", projectId);
}
```

### 3. Layout Integráció
```typescript
// src/app/layout.tsx
import { initClarity } from "@/lib/clarity";

export default function RootLayout({ children }) {
  useEffect(() => {
    initClarity(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "");
  }, []);

  return <html>{children}</html>;
}
```

---

## 🔐 BIZTONSÁG

### GDPR Compliance
- Cookie consent beállítás
- Anonymizált IP címek
- Adatvédelmi nyilatkozat frissítése

### Cookie Consent
```typescript
// Clarity csak consent után inicializál
if (cookieConsent) {
  initClarity(projectId);
}
```

---

## 📊 METRIKÁK

### KPI-k
- **Bounce Rate:** Visszafordulási arány
- **Session Duration:** Átlagos session hossz
- **Scroll Depth:** Görgetési mélység
- **Rage Click Rate:** Dühös kattintások aránya
- **Conversion Rate:** Konverziós arány

### Dashboard Widget-ek
- **Real-time Users:** Élő felhasználók száma
- **Top Pages:** Leglátogatottabb oldalak
- **Conversion Funnel:** Konverziós tölcsér
- **Heatmap Overlay:** Hőtérkép overlay

---

## 💼 ADD-ON SZOLGÁLTATÁS

### Ügyfélnek Eladható Csomagok
- **Basic Clarity Audit:** 1 hét session felvétel elemzés
- **CRO Audit:** 1 hónap heatmap és session elemzés
- **Continuous Monitoring:** Havi Clarity riportok

### Árazás
- **Basic Audit:** 50.000 Ft
- **CRO Audit:** 150.000 Ft
- **Continuous Monitoring:** 25.000 Ft/hó

---

## 🚀 DEPLOY UTASÍTÁSOK

1. **Clarity Projekt Létrehozása**
   - Regisztráció: https://clarity.microsoft.com
   - Project ID beszerzése

2. **Környezeti Változó Beállítása**
   ```bash
   # .env.local
   NEXT_PUBLIC_CLARITY_PROJECT_ID=abc123xyz
   ```

3. **Build Ellenőrzés**
   ```bash
   npm run build
   ```

4. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

---

## 📝 CHANGELOG

- **v1.0 (2026-08-12):** Microsoft Clarity integráció dokumentáció
