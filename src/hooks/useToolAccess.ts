"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getClientUserProfileAction } from "@/actions/portal";
import { hasToolAccess } from "@/lib/tool-access-policy";

export type ToolAccessStatus = "loading" | "guest" | "denied" | "granted";

/**
 * Kliensoldali AI generátor jogosultság (UI-zár).
 * Mindig `"loading"`-gal indul (SSR/prerender biztos, nincs hydration mismatch),
 * majd a Firebase Auth állapota és a Firestore profil alapján dönt.
 * A végső biztonsági háló a Server Action (`authorizeToolAccess`).
 */
export function useToolAccess(toolIds: string | readonly string[]): ToolAccessStatus {
  const [status, setStatus] = useState<ToolAccessStatus>("loading");
  const key = typeof toolIds === "string" ? toolIds : toolIds.join("|");

  useEffect(() => {
    const required = key.split("|");
    let cancelled = false;

    if (!auth) {
      // Firebase Auth nem inicializált → vendégként kezeljük (fail-closed).
      const timer = setTimeout(() => {
        if (!cancelled) setStatus("guest");
      }, 0);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }

    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        if (!cancelled) setStatus("guest");
        return;
      }
      try {
        const token = await user.getIdToken();
        const res = await getClientUserProfileAction(token);
        const profile = res.success ? res.profile : undefined;
        const granted = hasToolAccess(
          {
            email: user.email,
            role: profile?.role ?? null,
            allowedTools: profile?.allowedTools ?? [],
          },
          required
        );
        if (!cancelled) setStatus(granted ? "granted" : "denied");
      } catch {
        if (!cancelled) setStatus("denied");
      }
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, [key]);

  return status;
}
