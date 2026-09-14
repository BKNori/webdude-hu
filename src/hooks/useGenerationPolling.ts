import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type GenerationStatus =
  "pending" | "processing" | "completed" | "failed";

export interface GenerationData {
  status: GenerationStatus;
  outputResult?: Record<string, unknown> | string | null;
  errorMessage?: string;
  tokensUsed: number;
  estimatedCostUsd: number;
  executionTimeMs: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export function useGenerationPolling(generationId: string | null) {
  const [status, setStatus] = useState<GenerationStatus>("pending");
  const [result, setResult] = useState<Record<string, unknown> | string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generationData, setGenerationData] = useState<GenerationData | null>(
    null
  );

  useEffect(() => {
    if (!generationId || !db) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      doc(db, "user_generations", generationId),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const generationData: GenerationData = {
            status: data.status,
            outputResult: data.outputResult,
            errorMessage: data.errorMessage,
            tokensUsed: data.tokensUsed || 0,
            estimatedCostUsd: data.estimatedCostUsd || 0,
            executionTimeMs: data.executionTimeMs || 0,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            completedAt: data.completedAt?.toDate(),
          };

          setStatus(generationData.status);
          setResult(generationData.outputResult ?? null);
          setError(generationData.errorMessage || null);
          setGenerationData(generationData);

          const shouldStopLoading =
            generationData.status === "completed" ||
            generationData.status === "failed";

          if (shouldStopLoading) {
            setLoading(false);
          }
        } else {
          setError("Generálás nem található");
          setLoading(false);
        }
      },
      (error) => {
        setError(error.message || "Ismeretlen hiba történt");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [generationId]);

  return { status, result, error, loading, generationData };
}
