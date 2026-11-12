"use server";

import { logger } from "@/lib/logger";
import { z } from "zod";

/**
 * Dinamikus Admin DB lekérés (build-fix minta — lásd `src/lib/notify.ts`):
 * az Admin SDK modul-statikus importja build-időben `app/invalid-credential`
 * hibát dobna (FIREBASE_ADMIN_PRIVATE_KEY nincs build env-ben), ezért
 * minden Server Action függvény CSAK futásidőben, dinamikus importtal éri el.
 */
async function getAdminDbSafely() {
  try {
    const { adminDb } = await import("@/lib/firebase-admin");
    return adminDb ?? null;
  } catch {
    return null;
  }
}

const blogPostSchema = z.object({
  slug: z.string().min(3, "A slug legalább 3 karakter kell legyen").max(100),
  title: z.string().min(3, "A cím legalább 3 karakter kell legyen").max(200),
  excerpt: z.string().min(10, "A rövid leírás legalább 10 karakter kell legyen").max(500),
  tldr: z.string().max(1000).optional(),
  content: z.string().min(50, "A tartalom legalább 50 karakter kell legyen"),
  coverImage: z.string().url("Érvénytelen kép URL").optional().or(z.literal("")),
  category: z.string().min(1, "Kategória megadása kötelező").max(50),
  readingTime: z.string().min(1, "Időtartam megadása kötelező").max(50),
  featured: z.boolean().default(false),
  noindex: z.boolean().default(false),
  published: z.boolean().default(true),
  author: z.string().min(1, "Szerző megadása kötelező").max(100),
});

interface SavePostResult {
  success: boolean;
  error?: string;
  postId?: string;
}

export async function savePostAction(
  formData: FormData
): Promise<SavePostResult> {
  try {
    const adminDb = await getAdminDbSafely();
    if (!adminDb) {
      return { success: false, error: "Firestore Admin SDK nincs inicializálva." };
    }

    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const coverImage = (formData.get("coverImage") as string) || undefined;
    const category = formData.get("category") as string;
    const readingTime = formData.get("readingTime") as string;
    const featured = formData.get("featured") === "on";
    const noindex = formData.get("noindex") === "on";
    const published = formData.get("published") === "on";
    const author = formData.get("author") as string;
    const docId = (formData.get("docId") as string) || undefined;

    const validated = blogPostSchema.safeParse({
      slug,
      title,
      excerpt,
      content,
      coverImage,
      category,
      readingTime,
      featured,
      noindex,
      published,
      author,
    });

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors.map((e) => e.message).join(", "),
      };
    }

    const now = new Date().toISOString();
    const postData = {
      ...validated.data,
      updatedAt: now,
      ...(docId ? {} : { createdAt: now }),
    };

    if (docId) {
      await adminDb.collection("blog_posts").doc(docId).update(postData);
      logger.info("savePostAction: blogbejegyzés frissítve", {
        layer: "Firestore",
        meta: { docId, slug },
      });
      return { success: true, postId: docId };
    } else {
      const docRef = adminDb.collection("blog_posts").doc(slug);
      await docRef.set({ ...postData, createdAt: now });
      logger.info("savePostAction: új blogbejegyzés mentve", {
        layer: "Firestore",
        meta: { docId: slug, slug },
      });
      return { success: true, postId: slug };
    }
  } catch (error) {
    logger.error("savePostAction: hiba a mentés során", error, {
      layer: "Firestore",
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Ismeretlen hiba történt.",
    };
  }
}

interface DeletePostResult {
  success: boolean;
  error?: string;
}

export async function deletePostAction(docId: string): Promise<DeletePostResult> {
  try {
    const adminDb = await getAdminDbSafely();
    if (!adminDb) {
      return { success: false, error: "Firestore Admin SDK nincs inicializálva." };
    }

    await adminDb.collection("blog_posts").doc(docId).delete();
    logger.info("deletePostAction: blogbejegyzés törölve", {
      layer: "Firestore",
      meta: { docId },
    });
    return { success: true };
  } catch (error) {
    logger.error("deletePostAction: hiba a törlés során", error, {
      layer: "Firestore",
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Ismeretlen hiba történt.",
    };
  }
}

export async function getBlogPostsFromFirestore(): Promise<
  Array<FirestoreBlogPostType>
> {
  const adminDb = await getAdminDbSafely();
  if (!adminDb) {
    logger.warn("getBlogPostsFromFirestore: Firestore Admin SDK nincs inicializálva", {
      layer: "Firestore",
    });
    return [];
  }

  try {
    const snapshot = await adminDb
      .collection("blog_posts")
      .where("published", "==", true)
      .orderBy("date", "desc")
      .get();

    const posts: Array<FirestoreBlogPostType> = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        slug: data.slug as string,
        title: data.title as string,
        excerpt: data.excerpt as string,
        content: data.content as string,
        coverImage: (data.coverImage as string) || undefined,
        category: (data.category as string) || "Fejlesztés",
        date: (data.date as string) || new Date().toISOString(),
        updatedAt: (data.updatedAt as string) || new Date().toISOString(),
        author: (data.author as string) || "Norbi",
        readingTime: (data.readingTime as string) || "3 perc",
        featured: (data.featured as boolean) || false,
        noindex: (data.noindex as boolean) || false,
        published: (data.published as boolean) || true,
      });
    });

    return posts;
  } catch (error) {
    logger.error("getBlogPostsFromFirestore: hiba a lekérés során", error, {
      layer: "Firestore",
    });
    return [];
  }
}

export interface FirestoreBlogPostType {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tldr?: string;
  content: string;
  coverImage?: string;
  category: string;
  date: string;
  updatedAt: string;
  author: string;
  readingTime: string;
  featured: boolean;
  noindex: boolean;
  published: boolean;
}