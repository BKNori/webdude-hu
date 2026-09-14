# Helicone Integráció — LLM Monitoring és Ágens Management
> **Verzió:** v1.0  
> **Dátum:** 2026-08-12  
> **Leírás:** Helicone OpenTelemetry alapú LLM monitoring integráció a WebDude.hu platformon

---

## 🎯 MIÉRT HELICONE?

**Előnyök:**
- **Nyílt forráskódú:** Self-hosted verzió elérhető (ingyenes)
- **OpenTelemetry alapú:** Standard observability protokoll
- **Multi-provider támogatás:** Groq, Anthropic, OpenAI, Gemini
- **Költséghatékony:** Ingyenes tier (1M request/hó)
- **Real-time monitoring:** Latency, token usage, cost tracking

**Alternatíva:** PromptLayer (SaaS, de kevesebb self-hosting opció)

---

## 🛠️ IMPLEMENTÁCIÓ

### 1. Környezeti Változók
```bash
# .env.local
HELICONE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
HELICONE_BASE_URL=https://api.helicone.ai/v1
```

### 2. OpenTelemetry Middleware
```typescript
// src/lib/helicone.ts
import { HeliconeProxy } from "helicone";

const helicone = new HeliconeProxy({
  apiKey: process.env.HELICONE_API_KEY,
  baseUrl: process.env.HELICONE_BASE_URL,
});

export default helicone;
```

### 3. API Hívás Wrapper
```typescript
// src/lib/llmClient.ts
import helicone from "@/lib/helicone";

export async function callLLM(provider: string, model: string, prompt: string) {
  const response = await helicone.proxy({
    provider,
    model,
    messages: [{ role: "user", content: prompt }],
  });
  return response;
}
```

### 4. Integráció Multi-Agent Workflow-ba
```typescript
// src/app/actions/multiAgentWorkflow.ts
import { callLLM } from "@/lib/llmClient";

async function executePersonaAgent(input: MultiAgentInput) {
  return callLLM("gemini", "gemini-1.5-pro", prompt);
}
```

---

## 📊 METRIKÁK

### KPI-k
- **Latency:** Átlagos válaszidő ágensenként
- **Token Usage:** Input/Output token használat
- **Cost:** Becsült költség ágensenként
- **Success Rate:** Sikeres vs. sikertelen hívások
- **Prompt Quality:** Prompt hatékonyság

### Dashboard Widget-ek
- **Real-time Activity:** Élő ágens aktivitás
- **Cost Breakdown:** Költség bontás ágensenként
- **Latency Heatmap:** Válaszidő hőtérkép
- **Token Efficiency:** Token hatékonyság

---

## 🔐 BIZTONSÁG

### API Key Protection
- Server-side only (nem NEXT_PUBLIC_)
- Environment variable
- Git-ből kizárva (.gitignore)

### Data Privacy
- Helicone nem tárolja a promptokat (opcionális)
- PII filtering beállítható
- GDPR kompatibilis

---

## 🚀 DEPLOY UTASÍTÁSOK

1. **Helicone Account Létrehozása**
   - Regisztráció: https://www.helicone.ai
   - API key beszerzése

2. **Környezeti Változók Beállítása**
   ```bash
   # .env.local
   HELICONE_API_KEY=xxxxxxxx
   HELICONE_BASE_URL=https://api.helicone.ai/v1
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

- **v1.0 (2026-08-12):** Helicone integráció dokumentáció
