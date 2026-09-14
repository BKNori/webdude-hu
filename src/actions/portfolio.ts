"use server";

import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { works } from "@/data/works";
import fs from "fs";
import path from "path";

export async function importStaticWorksToFirestore() {
  if (!db) {
    return { success: false, error: "Firebase adatbázis nem érhető el" };
  }

  try {
    const portfolioRef = collection(db, "portfolio");
    let importedCount = 0;
    let skippedCount = 0;

    for (const work of works) {
      // Check if project already exists in Firestore by its slug
      const q = query(portfolioRef, where("slug", "==", work.slug));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Project not in DB, let's insert it matching ARCHITECTURE.md 6.1 schema
        const workData = {
          title: work.title,
          slug: work.slug,
          category: work.category,
          description: work.description,
          tags: work.tags || [],
          keywords: work.tags || [],
          image: work.image || "",
          assets: {
            image: work.image || "",
          },
          challenge: work.challenge || "",
          solution: work.solution || "",
          results: work.results || [],
          featured: !!work.featured,
          year: work.year || new Date().getFullYear(),
          client: work.client || "",
        };

        await addDoc(portfolioRef, workData);
        importedCount++;
      } else {
        skippedCount++;
      }
    }

    return { success: true, importedCount, skippedCount };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba történt a migráció során.",
    };
  }
}

export async function importWordPressWorksToFirestore() {
  if (!db) {
    return { success: false, error: "Firebase adatbázis nem érhető el" };
  }

  try {
    const jsonPath = path.join(
      process.cwd(),
      "wp-content",
      "extracted_portfolio.json"
    );
    if (!fs.existsSync(jsonPath)) {
      return {
        success: false,
        error: "A kinyert portfólió fájl nem található a wp-content mappában.",
      };
    }

    const fileContent = fs.readFileSync(jsonPath, "utf8");
    const data = JSON.parse(fileContent);
    const wpItems = data.portfolio || [];

    const portfolioRef = collection(db, "portfolio");
    let importedCount = 0;
    let skippedCount = 0;

    for (const item of wpItems) {
      // Check if project already exists in Firestore by its slug
      const q = query(portfolioRef, where("slug", "==", item.slug));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Map category
        let category:
          "weboldal" | "webshop" | "arculat" | "grafika" | "branding" =
          "weboldal";
        const titleLower = item.title.toLowerCase();
        const contentLower = (item.content || "").toLowerCase();
        const catsLower = item.categories.map((c: string) => c.toLowerCase());

        if (
          catsLower.includes("arculattervezés") ||
          catsLower.includes("arculattervezes")
        ) {
          category = "arculat";
        } else if (
          titleLower.includes("webáruház") ||
          titleLower.includes("webshop") ||
          titleLower.includes("woocommerce") ||
          titleLower.includes("webaruhaz") ||
          contentLower.includes("webáruház") ||
          contentLower.includes("webshop") ||
          contentLower.includes("woocommerce") ||
          contentLower.includes("webaruhaz")
        ) {
          category = "webshop";
        } else if (
          catsLower.includes("offline grafikák") ||
          catsLower.includes("offline grafikak") ||
          catsLower.includes("online grafikák") ||
          catsLower.includes("online grafikak") ||
          catsLower.includes("videók") ||
          catsLower.includes("videok")
        ) {
          category = "grafika";
        } else if (
          catsLower.includes("weboldalak") ||
          catsLower.includes("weboldal")
        ) {
          category = "weboldal";
        }

        // Clean up content to use as description (first 250 characters of stripped text)
        let cleanDesc = item.excerpt || "";
        if (!cleanDesc) {
          const text = item.content
            ? item.content
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim()
            : "";
          cleanDesc = text.length > 250 ? text.substring(0, 247) + "..." : text;
        }

        const tags =
          item.tags && item.tags.length > 0 ? item.tags : item.categories || [];

        const imgUrl =
          item.featuredImageUrl || "/assets/banners/pro-web-design.jpg";

        let year = new Date().getFullYear();
        if (item.date) {
          const d = new Date(item.date);
          if (!isNaN(d.getTime())) {
            year = d.getFullYear();
          }
        }

        const workData = {
          title: item.title,
          slug: item.slug,
          category: category,
          description: cleanDesc,
          tags: tags,
          keywords: tags,
          image: imgUrl,
          assets: {
            image: imgUrl,
          },
          challenge: "",
          solution: "",
          results: [],
          featured: false,
          year: year,
          client: item.rawMeta["client"] || item.rawMeta["_client"] || "",
        };

        await addDoc(portfolioRef, workData);
        importedCount++;
      } else {
        skippedCount++;
      }
    }

    return { success: true, importedCount, skippedCount };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba történt a WordPress importálás során.",
    };
  }
}
