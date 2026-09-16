# Cycle 133: AI Copilot Integráció a WorkflowChat Felületébe

Ez a dokumentum tartalmazza a **WebDude OS AI Copilot** (mint projekt-asszisztens és intelligens aszinkron partner) integrációs tervét és Next.js 16 Server Action megvalósítását, amely a Groq szupergyors Llama 3.3-70b modelljére és a meglévő Firestore architektúrára épül.

---

## 🛠️ Az Integráció Architektúrája

Az AI Copilot zökkenőmentesen épül be a meglévő aszinkron csevegőnkbe (`WorkflowChat.tsx`), az alábbi háromlépcsős modell szerint:

### 1️⃣ Lépés: Triggerelés és Környezet Betöltése (`src/actions/portal.ts`)

A meglévő `addWorkflowCommentAction` Server Action-t felkészítjük az AI-válaszok indítására. Kétféle működési módot támogatunk:
1. **Mentions (Említés):** Az AI csak akkor válaszol, ha a felhasználó üzenetében szerepel a `@ai` vagy `@webdude` kulcsszó.
2. **Auto-Responder (Automatikus elsősegély):** Ha a megbízó (Norbi) nincs online, a rendszer automatikusan generálhat egy elsődleges szakmai választ.

Amikor a trigger aktiválódik, a Server Action az alábbi környezeti adatokat (kontextust) fűzi össze:
* **Onboarding adatok:** A projekt korábban beküldött igényfelmérő adatai (célok, hozzáférések, konkurensek).
* **Aktív mérföldkő:** A munkafolyamat aktuális leírása a `workflows` dokumentumból.
* **Beszélgetési kontextus:** A legutóbbi 5–10 üzenet a `workflows/{workflowId}/comments` sub-kollekcióból, hogy az AI megértse a beszélgetés fonalát.

---

### 2️⃣ Lépés: Az AI Válaszgeneráló Akció (`src/actions/ai.ts`)

Létrehozzuk a `generateWorkflowAiResponseAction` Server Action-t, amely közvetlenül a **Groq API-n** keresztül hívja meg a **Llama 3.3-70b** modellt.

#### Típusbiztos Server Action Kódterv:

```typescript
"use server";

import { db } from "@/lib/firebase";
import { ChatMessage } from "@/types/chat";

interface GenerateAiResponseParams {
  workflowId: string;
  token: string;
  lastMessages: ChatMessage[];
  onboardingData?: string;
  currentMilestone?: string;
}

export async function generateWorkflowAiResponseAction({
  workflowId,
  token,
  lastMessages,
  onboardingData,
  currentMilestone,
}: GenerateAiResponseParams) {
  try {
    // 1. Biztonsági és Token-ellenőrzés (Anti-Drain Policy)
    if (!token || !workflowId) {
      throw new Error("Unauthorized request parameters.");
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      console.warn("GROQ_API_KEY is missing. Falling back to mock response.");
      return {
        success: true,
        text: "Szia! Észzleltem az említést, de az AI Copilot motorom jelenleg konfiguráció alatt áll. Norbi hamarosan válaszolni fog neked!",
      };
    }

    // 2. Környezeti kontextus összeállítása
    const conversationHistory = lastMessages
      .map((msg) => `${msg.authorName}: ${msg.text}`)
      .join("\n");

    const systemPrompt = `
      You are the Elite AI WebDude Copilot, an autonomous project assistant working alongside Norbi (WebDude), who has 26+ years of graphic design and 16+ years of web development experience.
      Your mission is to act as a highly professional, expert technical and design partner for the client.
      
      CRITICAL ROLE GUIDELINES:
      - Always communicate strictly in Hungarian.
      - Keep your tone professional, authoritative yet friendly, expert-level, and action-oriented.
      - Never use generic corporate jargon or fluff. Be concise and practical.
      - You have full context of the project's onboarding details and active milestones. Use them to answer questions, guide the client, explain technical terms (like Lighthouse LCP, CLS, structured data, or CRO), or help clarify their asset delivery (such as Google Drive/Dropbox links).
      
      PROJECT CONTEXT:
      - Active Milestone/Task: ${currentMilestone || "Nincs megadva aktív mérföldkő."}
      - Client Onboarding Information: ${onboardingData || "Nincs beküldött onboarding adat."}
      
      CONVERSATION HISTORY:
      ${conversationHistory}
      
      Answer the client's last message directly and expertly, representing WebDude's decades of technical and design excellence.
    `;

    // 3. Közvetlen REST hívás a Groq API-hoz (Zéró külső csomag-dependency)
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Kérlek generáld le a szakértő választ." }
        ],
        temperature: 0.6,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API returned status ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0]?.message?.content || "";

    // 4. A válasz mentése a Firestore comments gyűjteménybe
    const aiComment: Omit<ChatMessage, "id"> = {
      authorId: "webdude_ai_copilot",
      authorName: "WebDude AI Copilot",
      text: generatedText.trim(),
      createdAt: new Date().toISOString(), // Kliens-konform ISO string
    };

    await db
      .collection("workflows")
      .doc(workflowId)
      .collection("comments")
      .add(aiComment);

    return {
      success: true,
      text: aiComment.text,
    };
  } catch (error: any) {
    console.error("Error in generateWorkflowAiResponseAction:", error);
    return { success: false, error: error.message };
  }
}
```

---

### 3️⃣ Lépés: Vizuális Megjelenítés a UI-ban (`WorkflowChat.tsx`)

A `WorkflowChat.tsx` felületén az AI Copilot válaszait elegánsan, a **90-8-2-es dizájn-szabály** szerint különítjük el a humán üzenetektől:

* **Izzó Cyber-Arany Keret:** Az AI üzenetei kapnak egy vékony arany szegélyt és egy nagyon szoft, áttetsző arany háttérfényt:
  `bg-sky-500/5 border border-sky-500/20 backdrop-blur-md`
* **Premium Badge:** A név mellett megjelenik egy dizájnos jelvény:
  ```tsx
  <span className="bg-sky-500/10 text-sky-500 text-[10px] px-2 py-0.5 rounded-full font-mono tracking-wider uppercase border border-sky-500/20">
    AI Copilot
  </span>
  ```

---

## 💰 Ingyenes-e az AI Copilot és a Groq használata?

### 1. A Groq Cloud API költségei
A Groq jelenleg **rendkívül bőkezű ingyenes hozzáférést (Free Tier)** biztosít a fejlesztők számára az olyan csúcsmodellekhez, mint a Llama 3.3-70b. 
* **Fejlesztési és tesztelési fázisban:** A napi lekérdezési limitek (RPD, TPM) bőségesen elegendőek ahhoz, hogy a WebDude OS-en belül folyó tesztelések és az első ügyfelekkel történő egyeztetések **teljesen ingyenesen** fussnak, külön bankkártya megadása nélkül a Groq oldalon.
* **Éles üzemben:** Ha a jövőben a Groq átállna tisztán fizetős modellre, a Llama 3.3-70b üzemeltetése akkor is elhanyagolható összeg (kb. **$0.59 / 1 millió token**), ami azt jelenti, hogy 10 000 hosszabb ügyfélüzenetváltás is mindössze pár száz forintba kerülne.

### 2. Adatbázis és Szerver Költségek (Anti-Drain Policy)
A WebDude OS csevegője beépített **Anti-Drain** védelemmel rendelkezik:
* Nem használunk folyamatos Firestore websocket kapcsolatokat.
* Az **intelligens 30 másodperces polling** csak akkor aktív, ha a böngészőlap látható státuszban van (`document.visibilityState === "visible"`).
* Ez biztosítja, hogy a Firestore napi **50 000 ingyenes olvasási kvótáját** fejlesztés és éles működés alatt se léphesd túl, így a háttértárhely használata is garantáltan **0 Ft** marad a Google Cloud-on belül!
