"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { adminDb } from "@/lib/firebase-admin";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getClientUserProfileAction } from "@/actions/portal";
import { CaseStudy } from "@/types/case-study";

const caseStudyInputSchema = z.object({
  title: z.string().trim().min(3, "A cím minimum 3 karakter").max(200),
  clientName: z
    .string()
    .trim()
    .min(2, "Az ügyfélnév minimum 2 karakter")
    .max(120),
  workflowType: z.enum(["Kristófka", "GeneralAI", "StrategistPro"]),
  impactMetrics: z.object({
    efficiencyGain: z.string().trim().min(1).max(60),
    timeSaved: z.string().trim().min(1).max(60),
  }),
  summary: z.string().trim().min(5, "Az összefoglaló túl rövid").max(2000),
  status: z.enum(["published", "draft"]).optional(),
});

async function resolveAndVerifyCaseStudyCaller(
  explicitIdToken?: string
): Promise<{ uid: string; isAdmin: boolean }> {
  let token = explicitIdToken?.trim() || null;

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }

  if (!token) {
    const headersList = await headers();
    const authHeader = headersList.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7).trim();
    }
  }

  if (!token) {
    throw new Error("Hitelesítés szükséges a Case Study mentéséhez.");
  }

  const userProfile = await getClientUserProfileAction(token);
  if (!userProfile.success || !userProfile.profile) {
    throw new Error("Érvénytelen felhasználói munkamenet.");
  }

  const profile = userProfile.profile;
  const isAdmin =
    profile.role === "admin" ||
    profile.email === "hello@webdude.hu" ||
    profile.email === "admin@webdude.hu";
  const allowedTools: string[] = Array.isArray(profile.allowedTools)
    ? profile.allowedTools
    : [];
  const hasKristofkaAccess =
    isAdmin || allowedTools.includes("kristofka_workflow");

  if (!hasKristofkaAccess) {
    throw new Error("Nincs jogosultságod Case Study mentéséhez.");
  }

  return { uid: profile.uid, isAdmin };
}

/**
 * Save a generated workflow as a case study in Firestore (requires valid auth + Zod validation).
 */
export async function saveToCaseStudyAction(
  data: Omit<CaseStudy, "id" | "createdAt">,
  idToken?: string
) {
  try {
    await resolveAndVerifyCaseStudyCaller(idToken);

    const parsed = caseStudyInputSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: "Érvénytelen Case Study adatok.",
      };
    }

    const payload = {
      ...parsed.data,
      createdAt: new Date().toISOString(),
      status: parsed.data.status ?? "published",
    };

    if (adminDb) {
      const docRef = await adminDb.collection("case-studies").add(payload);
      return { success: true, id: docRef.id };
    }

    if (db) {
      const docRef = await addDoc(collection(db, "case-studies"), payload);
      return { success: true, id: docRef.id };
    }

    return { success: false, error: "Adatbázis nem elérhető." };
  } catch (error) {
    console.error("Hiba a Case Study mentésekor:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Mentés sikertelen",
    };
  }
}

/**
 * Get published case studies from Firestore using Admin SDK.
 */
export async function getPublishedCaseStudiesAction() {
  try {
    if (!adminDb) {
      console.error("AdminDb not initialized");
      return {
        success: false,
        error: "Firestore admin nem elérhető",
        caseStudies: [],
      };
    }

    const snapshot = await adminDb
      .collection("case-studies")
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .limit(4)
      .get();

    const caseStudies = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<CaseStudy, "id">),
      createdAt: new Date(doc.data().createdAt),
    }));

    return { success: true, caseStudies };
  } catch (error) {
    console.error("Case studies fetch error:", error);
    return {
      success: false,
      error: "Hiba történt a lekérés során.",
      caseStudies: [],
    };
  }
}
