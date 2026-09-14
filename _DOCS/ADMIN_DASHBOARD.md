# Adminisztrátori Usage & Cost Dashboard
> **Verzió:** v1.0  
> **Dátum:** 2026-08-12  
> **Leírás:** Admin dashboard a WebDude.hu platform használati statisztikáinak és költségeinek követésére

---

## 📊 DASHBOARD FUNKCIÓK

### 1. Használati Statisztikák
- **Generálások száma:** Napi, heti, havi bontásban
- **Felhasználók száma:** Aktív felhasználók, új regisztrációk
- **Token felhasználás:** Összesített token használat ágensenként
- **Workflow típusok:** Mely workflow-okat használják leginkább

### 2. Költségkövetés
- **API költségek:** Groq, Gemini, Anthropic, OpenAI API költségek
- **Költség előrejelzés:** Havi költség becslés
- **Költség per felhasználó:** Átlagos költség per felhasználó
- **Költség trendek:** Költség változások időben

### 3. Rendszer Státusz
- **API kapcsolatok:** API provider státuszok
- **Firestore használat:** Olvasások/írások száma
- **Server Actions:** Végrehajtott Server Actions száma
- **Hiba ráták:** Hibás végrehajtások aránya

---

## 🛠️ IMPLEMENTÁCIÓ

### Firestore Kollekciók

**admin_stats**
```typescript
{
  date: string; // ISO dátum (YYYY-MM-DD)
  totalGenerations: number;
  totalUsers: number;
  totalTokensUsed: number;
  totalCostUsd: number;
  agentStats: {
    [agentType: string]: {
      executions: number;
      tokensUsed: number;
      costUsd: number;
    };
  };
}
```

**user_generations** (meglévő)
```typescript
{
  userId: string;
  workflowId: string;
  status: "pending" | "processing" | "completed" | "error";
  tokensUsed: number;
  costUsd: number;
  createdAt: Timestamp;
  completedAt?: Timestamp;
}
```

### TypeScript Típusok
```typescript
// src/types/adminDashboard.ts
export interface AdminStats {
  date: string;
  totalGenerations: number;
  totalUsers: number;
  totalTokensUsed: number;
  totalCostUsd: number;
  agentStats: Record<string, AgentStat>;
}

export interface AgentStat {
  executions: number;
  tokensUsed: number;
  costUsd: number;
}

export interface DashboardData {
  dailyStats: AdminStats[];
  monthlyStats: AdminStats[];
  totalStats: {
    totalGenerations: number;
    totalUsers: number;
    totalTokensUsed: number;
    totalCostUsd: number;
  };
  agentBreakdown: Record<string, AgentStat>;
  costTrend: Array<{ date: string; cost: number }>;
}
```

### Server Action
```typescript
// src/app/actions/getAdminDashboard.ts
export async function getAdminDashboard(
  startDate: string,
  endDate: string
): Promise<DashboardData> {
  // Firestore lekérdezések
  // Statisztikák aggregálása
  // Költség számítás
}
```

### Komponensek
```typescript
// src/components/organisms/AdminDashboard.tsx
- UsageStatsCard
- CostStatsCard
- AgentBreakdownChart
- CostTrendChart
- SystemStatusCard
```

---

## 🔐 BIZTONSÁG

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /admin_stats/{date} {
      allow read, write: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).role == 'admin';
    }
  }
}
```

### Admin Role Check
```typescript
// src/lib/auth.ts
export async function isAdmin(userId: string): Promise<boolean> {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.data()?.role === "admin";
}
```

---

## 📈 METRIKÁK

### KPI-k
- **Cost per Generation:** Átlagos költség generálásonként
- **Cost per User:** Átlagos költség felhasználónként
- **Token Efficiency:** Token hatékonyság (eredmény / token)
- **Success Rate:** Sikeres generálások aránya

### Alertek
- **Költség alert:** Ha a havi költség meghaladja a $50-ot
- **Token alert:** Ha a napi token használat meghaladja a 100,000-et
- **Hiba alert:** Ha a hiba ráta meghaladja a 10%-ot

---

## 🚀 DEPLOY UTASÍTÁSOK

1. **Firestore Rules Frissítés**
   ```bash
   firebase deploy --only firestore:rules
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

- **v1.0 (2026-08-12):** Admin dashboard dokumentáció
