# 6-Ágensű Multi-Agent Orchestration Architektúra
> **Verzió:** v1.0  
> **Dátum:** 2026-08-12  
> **Leírás:** Multi-Agent AI Orchestration rendszer a WebDude.hu platformon

---

## 🤖 ÁGENS ARCHITEKTÚRA

### Ágensek és Szerepkörök

**1. B2B Client Persona Simulator (Gemini 1.5 Pro)**
- **Szerep:** Ügyfél személyiség szimuláció
- **Feladat:** B2B ügyfelek igényeinek, fájdalompontjainak és motivációinak elemzése
- **API:** Google Gemini 1.5 Pro
- **Output:** Ügyfél profil, motivációs tényezők, döntési mechanizmusok

**2. SaaS/B2B Copywriter Agent (Claude 3.5 Sonnet)**
- **Szerep:** B2B szövegírás
- **Feladat:** Marketing szövegek, landing page tartalmak, email kampányok
- **API:** Anthropic Claude 3.5 Sonnet
- **Output:** SEO-optimalizált, konverzió-fókuszú szövegek

**3. Creative Director Agent (Claude 3.5 Sonnet)**
- **Szerep:** Kreatív irányítás
- **Feladat:** Design irányelvek, vizuális identitás, UX/UI irányítás
- **API:** Anthropic Claude 3.5 Sonnet
- **Output:** Design guidelines, vizuális stratégia

**4. Programmer Agent (Claude 3.5 Sonnet)**
- **Szerep:** Kód generálás
- **Feladat:** Next.js, React, TypeScript kód generálás, refaktorálás
- **API:** Anthropic Claude 3.5 Sonnet
- **Output:** Production-ready kód, komponensek, logika

**5. SEO/AEO Optimizer Agent (GPT-4o)**
- **Szerep:** SEO és AEO optimalizálás
- **Feladat:** Kulcsszó kutatás, meta adatok, JSON-LD sémák, tartalomstratégia
- **API:** OpenAI GPT-4o
- **Output:** SEO stratégia, meta adatok, sémák

**6. Auditor Agent (GPT-4o)**
- **Szerep:** Minőségellenőrzés
- **Feladat:** Kód audit, tartalom validáció, SEO audit, teljesítmény ellenőrzés
- **API:** OpenAI GPT-4o
- **Output:** Audit jelentések, javaslatok, validációs eredmények

---

## 🔄 ORCHESTRÁCIÓ FOLYAM

### 1. Input Fázis
- Felhasználó input (workflow paraméterek)
- B2B Client Persona Simulator elemzés
- Ügyfél profil generálás

### 2. Kreatív Fázis
- Creative Director Agent design irányelvek
- SaaS/B2B Copywriter Agent szövegírás
- SEO/AEO Optimizer Agent stratégia

### 3. Fejlesztési Fázis
- Programmer Agent kód generálás
- Komponensek és logika implementálása

### 4. Validációs Fázis
- Auditor Agent minőségellenőrzés
- SEO audit, teljesítmény ellenőrzés
- Javaslatok és korrekciók

### 5. Output Fázis
- Finalizált tartalom és kód
- Audit jelentés
- Deploy előkészítés

---

## 🛠️ IMPLEMENTÁCIÓ

### API Kulcsok
```bash
# .env.local
GEMINI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### TypeScript Típusok
```typescript
// src/types/multiAgent.ts
export type AgentType = 
  | 'persona-simulator'
  | 'copywriter'
  | 'creative-director'
  | 'programmer'
  | 'seo-optimizer'
  | 'auditor';

export interface AgentOutput {
  agent: AgentType;
  status: 'success' | 'error';
  data: unknown;
  executionTimeMs: number;
  tokensUsed: number;
}

export interface MultiAgentResult {
  outputs: AgentOutput[];
  finalResult: unknown;
  totalExecutionTimeMs: number;
  totalTokensUsed: number;
  estimatedCostUsd: number;
}
```

### Server Action Implementáció
```typescript
// src/app/actions/multiAgentWorkflow.ts
export async function executeMultiAgentWorkflow(
  input: WorkflowInput
): Promise<MultiAgentResult> {
  // 1. Persona Simulator
  const personaResult = await executePersonaAgent(input);
  
  // 2. Creative Director
  const creativeResult = await executeCreativeDirectorAgent(personaResult);
  
  // 3. Copywriter
  const copywriterResult = await executeCopywriterAgent(creativeResult);
  
  // 4. SEO Optimizer
  const seoResult = await executeSeoOptimizerAgent(copywriterResult);
  
  // 5. Programmer
  const programmerResult = await executeProgrammerAgent(seoResult);
  
  // 6. Auditor
  const auditorResult = await executeAuditorAgent(programmerResult);
  
  return {
    outputs: [personaResult, creativeResult, copywriterResult, seoResult, programmerResult, auditorResult],
    finalResult: auditorResult.data,
    totalExecutionTimeMs: /* összesítés */,
    totalTokensUsed: /* összesítés */,
    estimatedCostUsd: /* összesítés */,
  };
}
```

---

## 📊 KÖLTSÉG OPTIMALIZÁLÁS

### Token Becslések
- Gemini 1.5 Pro: $0.001 / 1K tokens (input), $0.002 / 1K tokens (output)
- Claude 3.5 Sonnet: $0.003 / 1K tokens (input), $0.015 / 1K tokens (output)
- GPT-4o: $0.005 / 1K tokens (input), $0.015 / 1K tokens (output)

### Költségvetés
- Átlagos workflow: ~10,000 tokens
- Becsült költség: ~$0.10 - $0.20 / workflow
- Havi 100 workflow: ~$10 - $20

---

## 🚀 DEPLOY UTASÍTÁSOK

1. **API Kulcsok Beállítása**
   ```bash
   # .env.local
   GEMINI_API_KEY=xxxxxxxx
   ANTHROPIC_API_KEY=xxxxxxxx
   OPENAI_API_KEY=xxxxxxxx
   ```

2. **Build Ellenőrzés**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

---

## 📝 CHANGELOG

- **v1.0 (2026-08-12):** Multi-Agent architektúra dokumentáció
