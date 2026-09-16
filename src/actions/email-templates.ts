"use server";

import { adminDb } from "@/lib/firebase-admin";
import { verifyUserToken } from "./portal";
import { z } from "zod";

const EmailTemplateSchema = z.object({
  templateId: z.string().min(3, { message: "Template ID minimum 3 karakter" }),
  name: z.string().min(3, { message: "Név minimum 3 karakter" }),
  subject: z.string().min(5, { message: "Tárgy minimum 5 karakter" }),
  htmlContent: z
    .string()
    .min(10, { message: "HTML tartalom minimum 10 karakter" }),
  variables: z.array(z.string()).default([]),
  category: z.enum(["onboarding", "milestone", "notification"], {
    errorMap: () => ({ message: "Érvénytelen kategória" }),
  }),
});

interface EmailTemplate {
  id: string;
  templateId: string;
  name: string;
  subject: string;
  htmlContent: string;
  variables: string[];
  category: "onboarding" | "milestone" | "notification";
  updatedAt: string;
}

/**
 * Szuperadmin ellenőrzés Firebase Admin SDK verifyIdToken-nel
 * (hello@webdude.hu — az email_templates kollekció kliensolvasása tiltott,
 * ezért minden művelet Admin SDK bypass-szal fut).
 */
async function requireSuperadmin(idToken: string): Promise<string | null> {
  if (!idToken) return "Hiányzó autentikációs token.";
  try {
    const { getAuth } = await import("firebase-admin/auth");
    const { adminApp } = await import("@/lib/firebase-admin");
    const decoded = await getAuth(adminApp).verifyIdToken(idToken);
    if (decoded.email !== "hello@webdude.hu") {
      return "Missing or insufficient permissions.";
    }
    // REST-alapú verifyUserToken fallback ellenőrzés (custom claim)
    const user = await verifyUserToken(idToken);
    if (user && !user.isAdmin && user.email !== "hello@webdude.hu") {
      return "Missing or insufficient permissions.";
    }
    return null;
  } catch {
    return "Érvénytelen vagy lejárt token.";
  }
}

export async function getEmailTemplatesAction(idToken?: string): Promise<{
  success: boolean;
  templates: EmailTemplate[];
  error?: string;
}> {
  try {
    const authError = await requireSuperadmin(idToken ?? "");
    if (authError) {
      return { success: false, templates: [], error: authError };
    }

    if (!adminDb) {
      throw new Error("Firestore nem elérhető");
    }

    const snap = await adminDb
      .collection("email_templates")
      .orderBy("name")
      .get();

    const templates: EmailTemplate[] = snap.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        templateId: (data.templateId as string) || "",
        name: (data.name as string) || "",
        subject: (data.subject as string) || "",
        htmlContent: (data.htmlContent as string) || "",
        variables: (data.variables as string[]) || [],
        category:
          (data.category as EmailTemplate["category"]) || "notification",
        updatedAt:
          data.updatedAt?.toDate?.()?.toISOString?.() ??
          (typeof data.updatedAt === "string" ? data.updatedAt : ""),
      };
    });

    return {
      success: true,
      templates,
    };
  } catch (error) {
    return {
      success: false,
      templates: [],
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a sablonok lekérése során.",
    };
  }
}

export async function saveEmailTemplateAction(
  templateId: string,
  name: string,
  subject: string,
  htmlContent: string,
  variables: string[],
  category: "onboarding" | "milestone" | "notification",
  idToken?: string
) {
  try {
    const authError = await requireSuperadmin(idToken ?? "");
    if (authError) {
      return { success: false, error: authError };
    }

    if (!adminDb) {
      throw new Error("Firestore nem elérhető");
    }

    const validatedData = EmailTemplateSchema.parse({
      templateId,
      name,
      subject,
      htmlContent,
      variables,
      category,
    });

    const templateDocRef = adminDb
      .collection("email_templates")
      .doc(templateId);
    const templateSnap = await templateDocRef.get();

    if (templateSnap.exists) {
      await templateDocRef.update({
        ...validatedData,
        updatedAt: new Date().toISOString(),
      });
    } else {
      await templateDocRef.set({
        ...validatedData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    return {
      success: true,
      message: "Sablon sikeresen mentve!",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a sablon mentése során.",
    };
  }
}

export async function deleteEmailTemplateAction(
  templateId: string,
  idToken?: string
) {
  try {
    const authError = await requireSuperadmin(idToken ?? "");
    if (authError) {
      return { success: false, error: authError };
    }

    if (!adminDb) {
      throw new Error("Firestore nem elérhető");
    }

    await adminDb.collection("email_templates").doc(templateId).delete();

    return {
      success: true,
      message: "Sablon sikeresen törölve!",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a sablon törlése során.",
    };
  }
}
