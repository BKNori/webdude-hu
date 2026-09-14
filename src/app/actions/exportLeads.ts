"use server";

import { adminDb } from "@/lib/firebase-admin";

export interface LeadExportData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  status: string;
  createdAt: string;
}

export async function exportLeadsToCsvAction(): Promise<{
  success: boolean;
  csvData?: string;
  filename?: string;
  error?: string;
}> {
  try {
    if (!adminDb) {
      return { success: false, error: "Adatbázis kapcsolat nem elérhető." };
    }

    const snap = await adminDb.collection("leads").orderBy("createdAt", "desc").get();

    if (snap.empty) {
      return { success: false, error: "Nincsenek leadek az exportáláshoz." };
    }

    const leads: LeadExportData[] = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        company: data.company || "",
        service: data.service || "",
        message: data.message || "",
        status: data.status || "new",
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      };
    });

    // CSV header
    const headers = ["ID", "Név", "Email", "Telefon", "Cég", "Szolgáltatás", "Üzenet", "Státusz", "Létrehozva"];

    // CSV rows
    const rows = leads.map((lead) => [
      lead.id,
      lead.name,
      lead.email,
      lead.phone || "",
      lead.company || "",
      lead.service || "",
      lead.message.replace(/"/g, '""'), // Escape quotes
      lead.status,
      lead.createdAt,
    ]);

    // Combine header and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const filename = `leads-export-${new Date().toISOString().split("T")[0]}.csv`;

    return { success: true, csvData: csvContent, filename };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Hiba a leadek exportálásakor.",
    };
  }
}
