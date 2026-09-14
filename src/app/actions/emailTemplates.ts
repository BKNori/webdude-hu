"use server";

import { adminDb } from "@/lib/firebase-admin";

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: "welcome" | "lead_notification" | "project_update" | "invoice";
  active: boolean;
  updatedAt: string;
}

export async function getEmailTemplatesAction(): Promise<{
  success: boolean;
  templates?: EmailTemplate[];
  error?: string;
}> {
  try {
    if (!adminDb) {
      return { success: false, error: "Adatbázis kapcsolat nem elérhető." };
    }

    const snap = await adminDb.collection("email_templates").orderBy("name").get();

    const templates: EmailTemplate[] = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "",
        subject: data.subject || "",
        body: data.body || "",
        type: data.type || "welcome",
        active: !!data.active,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : new Date().toISOString(),
      };
    });

    return { success: true, templates };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Hiba az email sablonok lekérésekor.",
    };
  }
}

export async function saveEmailTemplateAction(template: Partial<EmailTemplate>): Promise<{
  success: boolean;
  templateId?: string;
  error?: string;
}> {
  try {
    if (!adminDb) {
      return { success: false, error: "Adatbázis kapcsolat nem elérhető." };
    }

    if (!template.id) {
      // Új sablon létrehozása
      const docRef = await adminDb.collection("email_templates").add({
        ...template,
        active: true,
        updatedAt: new Date(),
      });
      return { success: true, templateId: docRef.id };
    } else {
      // Meglévő sablon frissítése
      await adminDb.collection("email_templates").doc(template.id).update({
        ...template,
        updatedAt: new Date(),
      });
      return { success: true, templateId: template.id };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Hiba az email sablon mentésekor.",
    };
  }
}

export async function deleteEmailTemplateAction(templateId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    if (!adminDb) {
      return { success: false, error: "Adatbázis kapcsolat nem elérhető." };
    }

    await adminDb.collection("email_templates").doc(templateId).delete();
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Hiba az email sablon törlésekor.",
    };
  }
}
