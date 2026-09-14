# WebDude.hu Deployment Guide — Manuális Szerver Telepítés

Ez a dokumentum lépésről lépésre bemutatja a Next.js 16 (React 19 + Tailwind v4) alkalmazás manuális telepítését egy saját, egyedi Node.js produkciós szerverre (pl. Ubuntu VPS, PM2 processzkezelő és Nginx reverse proxy használatával).

---

## 🏗️ 1. Választás a Renderelési Stratégiák Között

A Next.js alkalmazások kétféle módon futtathatók saját szerveren:

### A. Dinamikus Szerver Mód (Ajánlott - SSR & ISR Támogatás)
*   **Előnyök:** Működik az Incremental Static Regeneration (ISR - pl. a `/munkak` oldal óránkénti frissülése), a dinamikus útvonalak, a middleware-ek és a dinamikus API útvonalak.
*   **Futtatás:** Egy állandóan futó Node.js szerver processzként (pl. PM2 alatt).

### B. Statikus Mód (Static Export)
*   **Előnyök:** Nagyon alacsony erőforrás-igény, közvetlenül kiszolgálható Nginx/Apache által vagy egy minimális Node.js statikus szerverrel.
*   **Futtatás:** A `next build` által legenerált `out/` mappa másolása és kiszolgálása.
*   **Korlátok:** Nem támogatja az ISR-t, a dinamikus szerveroldali átirányításokat és a middleware-eket.

---

## 🛠️ 2. Dinamikus Szerver Telepítése (SSR / ISR)

### 1. Lépés: A Standalone Output Bekapcsolása (Lokálisan)
A Next.js képes egy optimalizált, minimális méretű produkciós csomagot (standalone build) generálni, ami csak a futáshoz szükséges fájlokat és a `node_modules` szűrt részét tartalmazza.

Módosítsd a [next.config.js](file:///c:/CLI-PROJECTS/webdude-hu/next.config.js) fájlt az alábbiak szerint (távolítsd el az `output: 'export'` sort, ha dynamic szervert akarsz):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Standalone mód bekapcsolása static export helyett
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
}

module.exports = nextConfig
```

### 2. Lépés: Produkciós Build Futtatása (Lokálisan vagy CI/CD-n)
Futtasd le a build parancsot a projekt gyökerében:
```bash
npm run build
```
Ez létrehozza az `.next/standalone/` könyvtárat.

### 3. Lépés: Fájlok Másolása a Szerverre
Másold át a szerver kiválasztott könyvtárába (pl. `/var/www/webdude-hu/`) az alábbi állományokat és könyvtárakat:
1.  Az `.next/standalone/` mappa teljes tartalmát (ez magában foglalja a minimális `node_modules`-t és a `server.js` futtatható állományt).
2.  A `public/` mappa tartalmát (másold be a szerveren lévő `/var/www/webdude-hu/public/` alá).
3.  Az `.next/static/` mappa tartalmát (másold be a szerveren lévő `/var/www/webdude-hu/.next/static/` alá).

*Megjegyzés: A `public/` és a `.next/static/` mappákat a Next.js standalone alapértelmezetten nem tartalmazza, ezeket manuálisan kell átmásolnod a szerverre a helyes statikus asset kiszolgáláshoz.*

### 4. Lépés: Indítás és Folyamatkezelés (Szerver)
A szerveren a PM2 segítségével tudod háttérben futtatni a Node.js processzt, ami automatikusan újraindul hiba vagy szerver-reboot esetén:

```bash
# Lépj be a projekt könyvtárába a szerveren
cd /var/www/webdude-hu

# Indítsd el a Next.js standalone szervert PM2-vel
pm2 start server.js --name "webdude-hu" --env PORT=3000

# Mentsd el a PM2 állapotot, hogy reboot esetén is elinduljon
pm2 save
pm2 startup
```

---

## 🌐 3. Nginx Reverse Proxy Konfiguráció

A szerverre érkező HTTP/HTTPS kérések (80-as és 443-as port) továbbításához a 3000-es porton futó Node.js alkalmazáshoz egy reverse proxy szükséges.

Hozd létre az Nginx konfigurációt (pl. `/etc/nginx/sites-available/webdude.hu`):

```nginx
server {
    listen 80;
    server_name webdude.hu www.webdude.hu;

    # Statikus fájlok közvetlen kiszolgálása Nginx által (teljesítményoptimalizálás)
    location /_next/static {
        alias /var/www/webdude-hu/.next/static;
        expires 365d;
        access_log off;
    }

    location /public {
        alias /var/www/webdude-hu/public;
        expires 365d;
        access_log off;
    }

    # Reverse Proxy a futó Node.js (Next.js) alkalmazáshoz
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Engedélyezd a konfigurációt és indítsd újra az Nginx-et:
```bash
sudo ln -s /etc/nginx/sites-available/webdude.hu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 4. SSL (Let's Encrypt) Beállítás
Biztosítsd a biztonságos HTTPS elérést a Certbot segítségével:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d webdude.hu -d www.webdude.hu
```

A Certbot automatikusan módosítja az Nginx fájlodat a biztonságos SSL tanúsítványok kezeléséhez és beállítja a HTTP -> HTTPS átirányítást.

---

## 📂 5. Statikus Szerver Telepítése (Static Export)

Ha megmarad az `output: 'export'` beállítás a [next.config.js](file:///c:/CLI-PROJECTS/webdude-hu/next.config.js) fájlban:

1.  Futtasd le helyben: `npm run build`
2.  Másold át a generált `out/` mappa tartalmát a szervered `/var/www/webdude-hu/` mappájába.
3.  Konfiguráld az Nginx-et közvetlen statikus kiszolgálásra (Nginx config proxy_pass nélkül):

```nginx
server {
    listen 80;
    server_name webdude.hu www.webdude.hu;
    root /var/www/webdude-hu;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }
}
```
