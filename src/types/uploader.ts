import { z } from "zod";

// Megengedett MIME típusok (Képek + Üzleti dokumentumok)
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "text/csv",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB az audit szerint

// Kliens oldali komponens prop definíciója
export interface UniversalFileUploaderProps {
  onUploadSuccess: (fileUrl: string, fileName: string) => void;
  onUploadError: (errorMessage: string) => void;
  category: "cro" | "tech" | "ai" | "design";
  maxSizeInBytes?: number;
}

// Zod séma a Server Action validációhoz
export const ServerFileValidationSchema = z.object({
  fileName: z.string().min(1, "A fájlnév nem lehet üres"),
  fileType: z.enum(ALLOWED_FILE_TYPES, {
    errorMap: () => ({
      message:
        "Nem támogatott fájlformátum! (PDF, DOCX, CSV vagy kép megengedett)",
    }),
  }),
  fileSize: z
    .number()
    .max(MAX_FILE_SIZE, "A maximális megengedett fájlméret 20MB"),
  base64Data: z.string().min(1, "A fájl tartalom hibás vagy sérült"),
});

export type ServerFileValidationInput = z.infer<
  typeof ServerFileValidationSchema
>;
