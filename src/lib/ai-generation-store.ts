import { adminDb } from "@/lib/firebase-admin";

interface SaveAiGenerationParams {
  /** A hívó felhasználó Firebase ID tokenje (REST fallback hitelesítéshez). */
  idToken: string;
  userId: string;
  userEmail?: string | null;
  /** Pl. "banner_ai_muhely", "signage_ai_muhely" — a kérés kategóriája. */
  category: string;
  input: unknown;
  output: unknown;
}

/**
 * Megosztott mentő az összes AI Műhely workshop generálásához
 * (ai_generations kollekció).
 *
 * Próbálkozási sorrend:
 *  1) Firebase Admin SDK (adminDb) — ha a Service Account env be van állítva.
 *     A korábbi `getFirestore()` + `addDoc()` kliens SDK hívás szerveren
 *     mindig elszállt (nincs inicializált kliens app), így a generálás
 *     "sikeres" válasz után is hibára futott.
 *  2) Firestore REST API a felhasználó idToken-jével — a firestore.rules
 *     `clientId == request.auth.uid` szabályt betartva.
 *
 * SOHA nem dob kivételt: sikertelenség esetén `false`-t ad vissza, hogy a
 * generált tartalom a felhasználóhoz eljusson (a mentés nem kritikus útvonal).
 */
export async function saveAiGeneration({
  idToken,
  userId,
  userEmail,
  category,
  input,
  output,
}: SaveAiGenerationParams): Promise<boolean> {
  const doc = {
    clientId: userId,
    userId,
    userEmail: userEmail ?? "",
    clientName: userEmail ?? "",
    category,
    input: JSON.stringify(input ?? null),
    output: JSON.stringify(output ?? null),
    createdAt: new Date().toISOString(),
  };

  // 1. Próbálkozás: Admin SDK (bízható szerveroldali útvonal)
  try {
    // adminDb futásidőben null lehet, ha a Service Account env hiányzik.
    if (adminDb) {
      await adminDb.collection("ai_generations").add(doc);
      return true;
    }
  } catch (error) {
    console.warn(
      "[ai-generation-store] Admin SDK mentés sikertelen, REST fallback következik:",
      error instanceof Error ? error.message : error
    );
  }

  // 2. Próbálkozás: Firestore REST API a felhasználó tokenjével
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId || !idToken) return false;

    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/ai_generations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          fields: Object.fromEntries(
            Object.entries(doc).map(([key, value]) => [
              key,
              { stringValue: value },
            ])
          ),
        }),
      }
    );

    if (!res.ok) {
      console.warn(
        `[ai-generation-store] REST mentés sikertelen (${res.status}) — a generálás ettől még sikeres.`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn(
      "[ai-generation-store] REST mentés kivételt dobott:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}
