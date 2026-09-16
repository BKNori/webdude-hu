"use client";

import { useCallback, useState } from "react";
import { auth } from "@/lib/firebase";
import { createGeneration } from "@/app/actions/createGeneration";
import { useGenerationPolling } from "@/hooks/useGenerationPolling";

/**
 * Kliensoldali bekötés a createGeneration Server Actionhez (Cycle 3154 szignatúra).
 * Folyamat: getIdToken(true) → createGeneration(input, idToken) → useGenerationPolling
 * (onSnapshot követi a user_generations dokumentumot: processing → completed/failed).
 */
export function useCreateGeneration() {
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);

  const polling = useGenerationPolling(generationId);

  const start = useCallback(
    async (workflowId: string, params: Record<string, unknown>) => {
      setStartError(null);

      if (!auth?.currentUser) {
        setStartError("Nincs bejelentkezve felhasználó");
        return false;
      }

      setStarting(true);
      try {
        // ID token átadás — a szerver verifyIdToken-nel hitelesít (Admin SDK)
        const idToken = await auth.currentUser.getIdToken(true);
        const res = await createGeneration({ workflowId, params }, idToken);

        if (!res.success || !res.generationId) {
          setStartError(res.error ?? "Ismeretlen hiba a generálás indításakor");
          setStarting(false);
          return false;
        }

        setGenerationId(res.generationId);
        return true;
      } catch (err) {
        setStartError(
          err instanceof Error ? err.message : "Hálózati hiba a hívás során"
        );
        setStarting(false);
        return false;
      }
    },
    []
  );

  const busy =
    starting || (generationId !== null && !startError && polling.loading);

  return {
    start,
    generationId,
    busy,
    status: polling.status,
    result: polling.result,
    error: startError ?? polling.error,
    reset: () => {
      setGenerationId(null);
      setStartError(null);
      setStarting(false);
    },
  };
}
