"use server";

import { adminStorage } from "@/lib/firebase-admin";
import {
  ServerFileValidationSchema,
  ServerFileValidationInput,
} from "@/types/uploader";

export async function uploadUniversalFileAction(
  input: ServerFileValidationInput
) {
  try {
    // 1. Szigorú szerveroldali Zod validáció (Anti-Tampering)
    const validatedFields = ServerFileValidationSchema.safeParse(input);

    if (!validatedFields.success) {
      return {
        success: false,
        error:
          validatedFields.error.flatten().formErrors[0] ||
          "Validációs hiba a szerveren.",
      };
    }

    const { fileName, fileType, base64Data } = validatedFields.data;

    // 2. Biztonsági tisztítás: Base64 string dekódolása pufferbe
    const fileBuffer = Buffer.from(base64Data, "base64");

    // 3. Egyedi, biztonságos fájlnév generálása (Path Traversal és felülírás elleni védelem)
    const fileExtension = fileName.split(".").pop() || "bin";
    const secureFileName = `${crypto.randomUUID()}.${fileExtension}`;
    const storagePath = `portal-uploads/${secureFileName}`;

    const bucket = adminStorage.bucket();
    const fileFile = bucket.file(storagePath);

    // 4. Mentés Firebase Storage-ba megfelelő metaadatokkal
    await fileFile.save(fileBuffer, {
      metadata: {
        contentType: fileType,
        metadata: {
          originalName: fileName,
        },
      },
    });

    // Nyilvános letöltési link generálása (vagy szigorúbb esetben lejáró signed URL)
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(storagePath)}?alt=media`;

    return {
      success: true,
      fileUrl: publicUrl,
      fileName: fileName,
    };
  } catch (error) {
    console.error("Szerveroldali hiba a fájlfeltöltés feldolgozásakor:", error);
    return {
      success: false,
      error: "Szerverhiba történt a fájl mentése közben.",
    };
  }
}
