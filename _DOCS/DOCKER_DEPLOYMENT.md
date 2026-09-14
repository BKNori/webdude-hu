# Docker Deployment — Next.js 16 Standalone Konténerizáció
> **Verzió:** v1.0  
> **Dátum:** 2026-08-13  
> **Leírás:** Docker konténerizáció a WebDude.hu Next.js 16 standalone build-jéhez VPS migrációra

---

## 🎯 MIÉRT DOCKER?

**Előnyök:**
- **Környezetizoláció:** Konzisztens fejlesztői és éles környezet
- **Skálázhatóság:** Horizontal scaling (Kubernetes/Docker Swarm)
- **VPS migráció:** cPanel korlátok megszüntetése
- **Rollback:** Gyors visszaállítás korábbi verziókra
- **CI/CD:** Automatizált deploy pipeline

**Cél:** Hetzner/DigitalOcean VPS migráció a cPanel shared hosting helyett

---

## 🛠️ IMPLEMENTÁCIÓ

### 1. Dockerfile
```dockerfile
# Dockerfile - Next.js 16 Standalone Build
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. docker-compose.yml
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_FIREBASE_API_KEY=${NEXT_PUBLIC_FIREBASE_API_KEY}
      - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
      - NEXT_PUBLIC_FIREBASE_PROJECT_ID=${NEXT_PUBLIC_FIREBASE_PROJECT_ID}
      - GROQ_API_KEY=${GROQ_API_KEY}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - HELICONE_API_KEY=${HELICONE_API_KEY}
      - NEXT_PUBLIC_CLARITY_PROJECT_ID=${NEXT_PUBLIC_CLARITY_PROJECT_ID}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### 3. .dockerignore
```
node_modules
.next
.git
.env.local
.env.development
.env.test
firebase.json
.firebaserc
functions
deploy.bat
deploy.ps1
.DS_Store
```

---

## 🚀 DEPLOY UTASÍTÁSOK

### Lokális Build és Teszt
```bash
# Docker image build
docker build -t webdude-hu:latest .

# Konténer indítása
docker run -p 3000:3000 --env-file .env.local webdude-hu:latest

# Docker Compose build és indítás
docker-compose up --build
```

### VPS Deploy (Hetzner/DigitalOcean)
```bash
# Image push Docker Hub-ra
docker tag webdude-hu:latest username/webdude-hu:latest
docker push username/webdude-hu:latest

# VPS-n pull és indítás
docker pull username/webdude-hu:latest
docker run -d -p 80:3000 --env-file .env username/webdude-hu:latest
```

### Nginx Reverse Proxy (Opcionális)
```nginx
server {
    listen 80;
    server_name webdude.hu www.webdude.hu;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔐 BIZTONSÁG

### Environment Variables
- `.env.local` NEM kerül a Git-be (.gitignore)
- Production környezetben `.env` vagy Docker secrets használata
- API kulcsok titkosítása

### Container Security
- Non-root user (`nextjs`)
- Minimal base image (`node:20-alpine`)
- Security scan: `docker scan webdude-hu:latest`

---

## 📊 ERŐFORRÁSOK

### Ajánlott VPS Konfiguráció
- **CPU:** 2 vCPU
- **RAM:** 4 GB
- **Storage:** 40 GB SSD
- **Provider:** Hetzner CX22 vagy DigitalOcean Droplet

### Költségek
- **Hetzner CX22:** ~5 EUR/hó
- **DigitalOcean:** ~20 USD/hó
- **cPanel shared hosting:** ~10 EUR/hó (korlátozott)

---

## 📝 CHANGELOG

- **v1.0 (2026-08-13):** Docker konténerizáció dokumentáció
