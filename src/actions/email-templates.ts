"use server";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { z } from "zod";
import { verifyUserToken } from "./portal";

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

export async function getEmailTemplatesAction(idToken?: string) {
  try {
    // Ha van idToken, ellenőrizzük a jogosultságot
    if (idToken) {
      const user = await verifyUserToken(idToken);
      if (!user) {
        return {
          success: false,
          error: "Jogosulatlan hozzáférés.",
          templates: [],
        };
      }
      // Email alapján is ellenőrizzük a superadmin státuszt
      if (!user.isAdmin && user.email !== "hello@webdude.hu") {
        return {
          success: false,
          error: "Missing or insufficient permissions.",
          templates: [],
        };
      }
    }

    if (!db) {
      throw new Error("Firestore nem elérhető");
    }

    const templatesCol = collection(db, "email_templates");
    const templatesSnap = await getDocs(templatesCol);

    const templates = templatesSnap.docs.map((doc) => ({
      id: doc.id,
      templateId: doc.data().templateId || "",
      name: doc.data().name || "",
      subject: doc.data().subject || "",
      htmlContent: doc.data().htmlContent || "",
      variables: doc.data().variables || [],
      category: doc.data().category || "notification",
      updatedAt: doc.data().updatedAt || "",
    }));

    return {
      success: true,
      templates,
    };
  } catch (error) {
    console.error("Email templates fetch error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a sablonok lekérése során.",
      templates: [],
    };
  }
}

export async function saveEmailTemplateAction(
  templateId: string,
  name: string,
  subject: string,
  htmlContent: string,
  variables: string[],
  category: "onboarding" | "milestone" | "notification"
) {
  try {
    if (!db) {
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

    const templateDocRef = doc(db, "email_templates", templateId);
    const templateSnap = await getDoc(templateDocRef);

    if (templateSnap.exists()) {
      await updateDoc(templateDocRef, {
        ...validatedData,
        updatedAt: new Date().toISOString(),
      });
    } else {
      await setDoc(templateDocRef, {
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

export async function deleteEmailTemplateAction(templateId: string) {
  try {
    if (!db) {
      throw new Error("Firestore nem elérhető");
    }

    const templateDocRef = doc(db, "email_templates", templateId);
    await deleteDoc(templateDocRef);

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
