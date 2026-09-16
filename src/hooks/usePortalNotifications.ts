"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

/* eslint-disable react-hooks/set-state-in-effect */

export interface PortalNotification {
  id: string;
  kind: "generation" | "vault";
  title: string;
  detail: string;
  createdAtMs: number;
}

const LAST_SEEN_KEY = "wd_portal_last_seen_ms";

/**
 * Valós idejű portál értesítések (Spark-kompatibilis — Cloud Function nélkül).
 * Két onSnapshot figyeli a bejelentkezett ügyfél SAJÁT dokumentumait:
 *  - user_generations: AI generálás státuszváltásai (processing → completed/failed)
 *  - vault: új dokumentum a Széfbe (admin feltöltés vagy saját feltöltés)
 * A badge a localStorage-ban tárolt "utolsó megtekintés" időbélyeghez képest számol.
 */
export function usePortalNotifications() {
  const [generations, setGenerations] = useState<PortalNotification[]>([]);
  const [files, setFiles] = useState<PortalNotification[]>([]);
  const [lastSeenMs, setLastSeenMs] = useState<number>(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(LAST_SEEN_KEY) ?? 0);
    setLastSeenMs(Number.isFinite(stored) ? stored : 0);
  }, []);

  // user_generations — csak a saját dokumentumok (rules: userId == auth.uid)
  useEffect(() => {
    if (!auth?.currentUser || !db) return;
    const uid = auth.currentUser.uid;
    const q = query(
      collection(db, "user_generations"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const unsub = onSnapshot(q, (snap) => {
      const items: PortalNotification[] = snap.docs
        .map((d) => {
          const data = d.data();
          const status = String(data.status ?? "pending");
          return {
            id: d.id,
            kind: "generation" as const,
            title:
              status === "completed"
                ? "AI generálás kész"
                : status === "failed"
                  ? "AI generálás sikertelen"
                  : "AI generálás folyamatban",
            detail: String(data.workflowId ?? ""),
            createdAtMs: data.createdAt?.toMillis?.() ?? 0,
          };
        })
        .filter((n) => n.createdAtMs > 0);
      setGenerations(items);
      setReady(true);
    });
    return () => unsub();
  }, []);

  // vault — csak a saját dokumentumok (rules: clientId == auth.uid)
  useEffect(() => {
    if (!auth?.currentUser || !db) return;
    const uid = auth.currentUser.uid;
    const q = query(
      collection(db, "vault"),
      where("clientId", "==", uid),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const unsub = onSnapshot(q, (snap) => {
      const items: PortalNotification[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          kind: "vault" as const,
          title: "Új dokumentum a Széfbe",
          detail: String(data.name ?? "Névtelen fájl"),
          createdAtMs: data.createdAt?.toMillis?.() ?? 0,
        };
      });
      setFiles(items);
      setReady(true);
    });
    return () => unsub();
  }, []);

  const all = useMemo(
    () =>
      [...generations, ...files].sort((a, b) => b.createdAtMs - a.createdAtMs),
    [generations, files]
  );

  const unseen = useMemo(
    () => all.filter((n) => n.createdAtMs > lastSeenMs),
    [all, lastSeenMs]
  );

  const markAllSeen = () => {
    const now = Date.now();
    window.localStorage.setItem(LAST_SEEN_KEY, String(now));
    setLastSeenMs(now);
  };

  return {
    notifications: all,
    unseenCount: unseen.length,
    ready,
    markAllSeen,
  };
}
