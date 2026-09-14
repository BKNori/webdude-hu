"use server";

import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";

interface IncomingTask {
  id: string;
  task_description: string;
  email_url?: string;
  status: "pending" | "in_progress" | "done";
  created_at: Timestamp;
  due_date?: Timestamp | null;
  is_critical?: boolean;
}

export async function getPendingTasksAction() {
  if (!db) {
    return { success: false, error: "Firebase nincs konfigurálva." };
  }

  try {
    const q = query(
      collection(db, "incoming_tasks"),
      where("status", "==", "pending"),
      orderBy("created_at", "desc"),
      limit(10)
    );

    const snapshot = await getDocs(q);
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IncomingTask[];

    return { success: true, tasks };
  } catch (error) {
    console.error("hiba a feladatok lekérésekor:", error);
    return { success: false, error: "Feladatok lekérése sikertelen." };
  }
}
