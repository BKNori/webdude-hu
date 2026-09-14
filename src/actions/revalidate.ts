"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePortfolio() {
  try {
    revalidatePath("/munkak");
    revalidatePath("/munkak/[slug]");
    return { success: true };
  } catch (error) {
    console.error("Revalidation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
