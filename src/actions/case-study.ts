"use server";

import { adminDb } from "@/lib/firebase-admin";
import { CaseStudy } from "@/types/case-study";

/**
 * Save a generated workflow as a case study in Firestore using Admin SDK.
 */
export async function saveToCaseStudyAction(
  data: Omit<CaseStudy, "id" | "createdAt">
) {
  try {
    const docRef = await adminDb.collection("case-studies").add({
      ...data,
      createdAt: new Date().toISOString(),
      status: "published",
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Hiba a Case Study mentésekor:", error);
    return { success: false, error: "Mentés sikertelen" };
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
