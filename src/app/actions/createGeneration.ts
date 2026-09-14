"use server";

import { logger } from "@/lib/logger";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { GenerationInput, CreateGenerationResponse } from "@/types/generation";

// Groq API hívás
async function callGroqAPI(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY környezeti változó hiányzik");
  }

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content:
              "Te egy profi B2B webfejlesztési és AI automatizációs szakértő vagy, aki a WebDude.hu platformon dolgozik. Segíts az ügyfeleknek konkrét, gyakorlatias megoldásokkal.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Groq API hiba: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function createGeneration(
  input: GenerationInput
): Promise<CreateGenerationResponse> {
  try {
    logger.info('createGeneration: indítás', {
      layer: 'ServerActions',
      meta: { workflowId: input.workflowId },
    });

    // Firebase ellenőrzés
    if (!auth || !db) {
      logger.error('createGeneration: Firebase nincs inicializálva', undefined, { layer: 'ServerActions' });
      return { success: false, error: "Firebase nincs inicializálva" };
    }

    // Felhasználó ellenőrzése
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return { success: false, error: "Nincs bejelentkezve felhasználó" };
    }

    // Felhasználói jogosultság ellenőrzése
    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
    if (!userDoc.exists()) {
      return { success: false, error: "Felhasználó nem található" };
    }

    const userData = userDoc.data();
    const hasProductAccess = userData.hasProductAccess === true;

    if (!hasProductAccess && currentUser.email !== "hello@webdude.hu") {
      return { success: false, error: "Nincs jogosultságod a generáláshoz" };
    }

    // Generálás létrehozása Firestore-ban (pending státusszal)
    const generationRef = await addDoc(collection(db, "user_generations"), {
      userId: currentUser.uid,
      workflowId: input.workflowId,
      status: "processing",
      inputParams: input.params,
      tokensUsed: 0,
      estimatedCostUsd: 0,
      executionTimeMs: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Közvetlen Groq API hívás
    const startTime = Date.now();
    const prompt = `Workflow ID: ${input.workflowId}\nParaméterek: ${JSON.stringify(input.params)}\n\nKérlek, generálj egy profi B2B választ a fenti paraméterek alapján.`;

    const result = await callGroqAPI(prompt);
    const executionTimeMs = Date.now() - startTime;

    logger.info('createGeneration: Groq API sikeres válasz', {
      layer: 'ServerActions',
      meta: { generationId: generationRef.id, executionTimeMs, workflowId: input.workflowId },
    });

    // Generálás frissítése Firestore-ban (completed státusszal)
    await updateDoc(doc(db, "user_generations", generationRef.id), {
      status: "completed",
      outputResult: result,
      tokensUsed: 1000, // Becsült token szám
      estimatedCostUsd: 0.0001, // Becsült költség (Groq ingyenes)
      executionTimeMs,
      completedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { success: true, generationId: generationRef.id };
  } catch (error) {
    logger.error('createGeneration: kivétel a generálás során', error, { layer: 'ServerActions', meta: { workflowId: input.workflowId } });
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a generálás indításakor",
    };
  }
}
