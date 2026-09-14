# DEPLOY_PROTOCOL.md — WebDude.hu Élesítési Mesterterv v1.0
(cPanel / Phusion Passenger Node.js Standalone Környezet)

> Ez a dokumentum a WebDude.hu élesítési és szerveroldali üzemeltetési szabályzata. Biztosítja, hogy a Next.js 16.x alkalmazás stabilan, Out of Memory (OOM) hibáktól mentesen fusson a cPanel korlátozott erőforrású (pl. 512 MB) Passenger Node.js környezetében.

---

## 🛠️ 1. Lépés: Lokális Előkészítés (Next.js Standalone Build)

A cPanel shared tárhelyek memóriakereteinek védelme érdekében a képek menet közbeni átméretezését és optimalizálását ki kell kapcsolni, valamint be kell állítani a minimalizált standalone csomagolást.

### next.config.js ellenőrzése:
A [next.config.js](file:///c:/CLI-PROJECTS/webdude-hu/next.config.js) fájlnak tartalmaznia kell a következő beállításokat:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Létrehozza a minimalizált node_modules/ és server.js mappát
  images: {
    unoptimized: true, // KÖTELEZŐ! Meggátolja az on-the-fly képtömörítést, elkerülve a memóriatúllépést (OOM)
    remotePatterns: [{ protocol: 'https', hostname: 'firebasestorage.googleapis.com' }],
  },
}

module.exports = nextConfig
```

### Standalone Build és Csomagolás indítása:
Futtasd a lokális parancssorban a golyóálló csomagolási folyamatot:
```bash
./deploy.bat
```
Ez a parancs elindítja a `deploy.ps1` PowerShell scriptet, amely:
1. Lefuttatja az `npm run build` parancsot.
2. Automatikusan kompatibilisre foltozza a generált `.next/standalone/server.js` fájlt a Passenger named-pipe socket portjaival.
3. Bemásolja a statikus asseteket (`public` és `.next/static`) a standalone könyvtárba.
4. Létrehozza a `tmp/restart.txt` újraindítási fájlt.
5. Létrehozi a zip állományt (pl. `deploy-v0.1.0.zip`), ami azonnal feltölthető a szerverre.
6. **A node_modules mappa KIZÁRÁSRA kerül a ZIP csomagolásból** - a szerveren telepítjük a függőségeket a `npm install` parancsával az eredeti package.json alapján.

---

## 🔌 2. Lépés: Szerver-oldali server.js (A Passenger Belépési Pont)

A cPanel Phusion Passenger az alkalmazás gyökerében lévő `server.js` fájlt futtatja indítófájlként. Ez a fájl a háttérben betölti és elindítja a Next.js optimalizált standalone kiszolgálóját.

### server.js a projekt gyökerében:
```javascript
// server.js - Phusion Passenger Node.js Entry Point (cPanel/Passenger compatible)
// Ez a fájl irányítja át a kéréseket a Next.js optimalizált standalone szerveréhez.

process.env.NODE_ENV = 'production';

// Betölti a dinamikusan foltozott Next.js standalone szervert
require('./.next/standalone/server.js');
```

---

## 📂 3. Lépés: cPanel Node.js App Beállítási Checklist

Miután a feltöltött ZIP tartalmát kicsomagoltad a szerveren lévő célkönyvtárba (pl. `/home/user/webdude_app`), végezd el az alábbi beállításokat a cPanel felületén:

1. **Setup Node.js App menüpont megnyitása.**
2. **Új alkalmazás létrehozása vagy szerkesztése:**
   - **Application root:** `/home/user/webdude_app`
   - **Application startup file:** `server.js`
   - **Node.js version:** Válaszd a 20.x vagy 22.x verziót (Next.js 16 kompatibilis).
3. **Környezeti Változók (Environment Variables):**
   - `NODE_ENV` = `production`
   - `PORT` = (a cPanel automatikusan átadja, a script a 3000-et használja fallbackként)
   - Add hozzá az összes szükséges **Firebase API kulcsot** és a **Groq API kulcsot** a `.env.local` alapján:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `GROQ_API_KEY` (Szerveroldali)
4. **Indítás / Újraindítás:**
   - Nyomj a **"Restart"** vagy **"Start App"** gombra a cPanel felületén a változások érvényesítéséhez.
