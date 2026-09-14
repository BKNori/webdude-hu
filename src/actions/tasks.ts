"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function createIncomingTaskAction(data: {
  client_id?: string;
  description: string;
  email_url?: string;
  due_date?: string;
  is_critical?: boolean;
}) {
  try {
    if (!db) {
      return { success: false, error: "Firebase nincs konfigurálva." };
    }

    const taskRef = await addDoc(collection(db, "incoming_tasks"), {
      client_id: data.client_id || null,
      task_description: data.description,
      email_url: data.email_url || null,
      status: "pending",
      created_at: serverTimestamp(),
      due_date: data.due_date ? new Date(data.due_date) : null,
      is_critical: data.is_critical || false,
    });

    return { success: true, id: taskRef.id };
  } catch (error) {
    console.error("hiba a feladat létrehozásakor:", error);
    return { success: false, error: "Feladat létrehozása sikertelen." };
  }
}
