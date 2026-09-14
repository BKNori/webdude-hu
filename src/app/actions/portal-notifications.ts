"use server";

import { adminDb } from "@/lib/firebase-admin";

export interface PortalNotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  createdAt: string;
  read: boolean;
}

export async function getClientNotificationsAction(clientId: string): Promise<{
  success: boolean;
  notifications: PortalNotification[];
  error?: string;
}> {
  try {
    if (!clientId) {
      return { success: false, notifications: [], error: "Hiányzó ügyfél azonosító." };
    }

    if (!adminDb) {
      return { success: false, notifications: [], error: "Adatbázis kapcsolat nem elérhető." };
    }

    const snap = await adminDb
      .collection("users")
      .doc(clientId)
      .collection("notifications")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();

    const notifications: PortalNotification[] = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "Értesítés",
        message: data.message || "",
        type: data.type || "info",
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        read: !!data.read,
      };
    });

    return { success: true, notifications };
  } catch (error) {
    return {
      success: false,
      notifications: [],
      error: error instanceof Error ? error.message : "Hiba az értesítések lekérésekor.",
    };
  }
}
