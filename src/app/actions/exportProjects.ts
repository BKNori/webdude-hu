"use server";

import { adminDb } from "@/lib/firebase-admin";

export interface ProjectExportData {
  id: string;
  title: string;
  client?: string;
  category: string;
  status: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  description: string;
}

export async function exportProjectsToCsvAction(): Promise<{
  success: boolean;
  csvData?: string;
  filename?: string;
  error?: string;
}> {
  try {
    if (!adminDb) {
      return { success: false, error: "Adatbázis kapcsolat nem elérhető." };
    }

    const snap = await adminDb
      .collection("projects")
      .orderBy("createdAt", "desc")
      .get();

    if (snap.empty) {
      return { success: false, error: "Nincsenek projektek az exportáláshoz." };
    }

    const projects: ProjectExportData[] = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        client: data.client || "",
        category: data.category || "",
        status: data.status || "pending",
        startDate: data.startDate?.toDate
          ? data.startDate.toDate().toISOString()
          : "",
        endDate: data.endDate?.toDate
          ? data.endDate.toDate().toISOString()
          : "",
        budget: data.budget || 0,
        description: data.description || "",
      };
    });

    // CSV header
    const headers = [
      "ID",
      "Cím",
      "Ügyfél",
      "Kategória",
      "Státusz",
      "Kezdés",
      "Befejezés",
      "Költségvetés",
      "Leírás",
    ];

    // CSV rows
    const rows = projects.map((project) => [
      project.id,
      project.title,
      project.client || "",
      project.category,
      project.status,
      project.startDate || "",
      project.endDate || "",
      (project.budget || 0).toString(),
      project.description.replace(/"/g, '""'),
    ]);

    // Combine header and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const filename = `projects-export-${new Date().toISOString().split("T")[0]}.csv`;

    return { success: true, csvData: csvContent, filename };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba a projektek exportálásakor.",
    };
  }
}
