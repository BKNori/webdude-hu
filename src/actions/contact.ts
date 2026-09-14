"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { headers } from "next/headers";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

// Zod séma a kapcsolatfelvételi űrlap validálásához (Server Action-ben is)
const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "A névnek legalább 2 karakterből kell állnia!" }),
  email: z.string().email({ message: "Kérlek, érvényes email címet adj meg!" }),
  projectType: z
    .string()
    .min(1, { message: "Kérlek, válassz projekt típust!" }),
  message: z
    .string()
    .min(10, { message: "Az üzenetnek legalább 10 karakterből kell állnia!" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContactForm(data: ContactFormData) {
  // Rate limiting check (max 5 requests per hour per client)
  const headersList = await headers();
  const req = { headers: headersList } as Request;
  const identifier = getClientIdentifier(req);
  const rateLimitResult = checkRateLimit(identifier, 5, 3600000); // 5 requests per hour

  if (!rateLimitResult.success) {
    return {
      success: false,
      error: "Túl sok üzenet. Kérlek, várj egy kicsit.",
    };
  }

  // Kettős Zod validáció - Server Action-ben is
  const validationResult = contactSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: "Validációs hiba történt",
      details: validationResult.error.errors,
    };
  }

  const validatedData = validationResult.data;

  try {
    // Firestore mentés a leads kollekcióba
    if (!db) {
      return {
        success: false,
        error: "Firestore nem inicializálva",
      };
    }

    const leadsRef = collection(db, "leads");
    await addDoc(leadsRef, {
      name: validatedData.name,
      email: validatedData.email,
      projectType: validatedData.projectType,
      summary: validatedData.message, // message mező átalakítása summary-ra
      status: "pending", // Alapértelmezett státusz
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Sikeres üzenetküldés!",
    };
  } catch {
    return {
      success: false,
      error:
        "Hiba történt az üzenet küldése közben. Kérlek, próbáld újra később.",
    };
  }
}
