"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
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
  kind:
    | "generation"
    | "vault"
    | "payment"
    | "delivery"
    | "approval"
    | "message";
  /** Szemantikus státusz-szín (v7.0: success = emerald, error = red, info = brand). */
  tone: "success" | "error" | "info";
  title: string;
  detail: string;
  createdAtMs: number;
  /** Az `all` memo számolja: igaz, ha az értesítés az utolsó megtekintés után érkezett. */
  unseen: boolean;
}

const LAST_SEEN_KEY = "wd_portal_last_seen_ms";

/**
 * Valós idejű portál értesítések (Spark-kompatibilis — Cloud Function nélkül).
 * Három onSnapshot figyeli a bejelentkezett ügyfél SAJÁT dokumentumait:
 *  - user_generations: AI generálás státuszváltásai (processing → completed/failed)
 *  - vault: új dokumentum a Széfbe (admin feltöltés vagy saját feltöltés)
 *  - users/{uid}/notifications: dedikált, szerveroldalon (Admin SDK) írott
 *    értesítések (fizetés / kézbesítés / fázis-jóváhagyás)
 * A badge a localStorage-ban tárolt "utolsó megtekintés" időbélyeghez képest számol.
 */
export function usePortalNotifications() {
  const [generations, setGenerations] = useState<PortalNotification[]>([]);
  const [files, setFiles] = useState<PortalNotification[]>([]);
  const [direct, setDirect] = useState<PortalNotification[]>([]);
  const [lastSeenMs, setLastSeenMs] = useState<number>(0);
  const [ready, setReady] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(LAST_SEEN_KEY) ?? 0);
    setLastSeenMs(Number.isFinite(stored) ? stored : 0);
  }, []);

  // Auth-készség: onAuthStateChanged figyelő tiszta leiratkozással.
  useEffect(() => {
    if (!auth) return;
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setAuthUser(u);
    });
    return () => unsubAuth();
  }, []);

  // user_generations — csak a saját dokumentumok (rules: userId == auth.uid)
  useEffect(() => {
    if (!authUser || !db) return;
    const uid = authUser.uid;
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
            tone:
              status === "completed"
                ? ("success" as const)
                : status === "failed"
                  ? ("error" as const)
                  : ("info" as const),
            title:
              status === "completed"
                ? "AI generálás kész"
                : status === "failed"
                  ? "AI generálás sikertelen"
                  : "AI generálás folyamatban",
            detail: String(data.workflowId ?? ""),
            createdAtMs: data.createdAt?.toMillis?.() ?? 0,
            unseen: false,
          };
        })
        .filter((n) => n.createdAtMs > 0);
      setGenerations(items);
      setReady(true);
    },
    (err) => {
      // A hallgatás hibája (pl. hiányzó kompozit index → failed-precondition)
      // NE némán haljon el: naplózzuk, és feloldjuk a betöltést.
      console.error(
        "[usePortalNotifications] user_generations onSnapshot hiba:",
        err
      );
      setReady(true);
    });
    return () => unsub();
  }, [authUser]);

  // vault — csak a saját dokumentumok (rules: clientId == auth.uid)
  useEffect(() => {
    if (!authUser || !db) return;
    const uid = authUser.uid;
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
          tone: "info" as const,
          title: "Új dokumentum a Széfbe",
          detail: String(data.name ?? "Névtelen fájl"),
          createdAtMs: data.createdAt?.toMillis?.() ?? 0,
          unseen: false,
        };
      });
      setFiles(items);
      setReady(true);
    },
    (err) => {
      // Lásd: a user_generations error callback — a hiba ne némán haljon el.
      console.error(
        "[usePortalNotifications] vault onSnapshot hiba:",
        err
      );
      setReady(true);
    });
    return () => unsub();
  }, [authUser]);

  // users/{uid}/notifications — dedikált, szerveroldalon (Admin SDK) írott
  // értesítések (fizetés / kézbesítés / fázis-jóváhagyás).
  useEffect(() => {
    if (!authUser || !db) return;
    const uid = authUser.uid;
    const q = query(
      collection(db, "users", uid, "notifications"),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const items: PortalNotification[] = snap.docs
          .map((d) => {
            const data = d.data();
            const rawKind = String(data.kind ?? "message");
            const kind =
              rawKind === "payment" ||
              rawKind === "delivery" ||
              rawKind === "approval" ||
              rawKind === "generation" ||
              rawKind === "vault"
                ? rawKind
                : "message";
            const rawTone = String(data.tone ?? "info");
            const tone =
              rawTone === "success" || rawTone === "error" ? rawTone : "info";
            return {
              id: d.id,
              kind,
              tone,
              title: String(data.title ?? "Értesítés"),
              detail: String(data.message ?? ""),
              createdAtMs: data.createdAt?.toMillis?.() ?? 0,
              unseen: false,
            } as PortalNotification;
          })
          .filter((n) => n.createdAtMs > 0);
        setDirect(items);
        setReady(true);
      },
      (err) => {
        // Lásd a többi error callback — a hiba ne némán haljon el.
        console.error(
          "[usePortalNotifications] notifications onSnapshot hiba:",
          err
        );
        setReady(true);
      }
    );
    return () => unsub();
  }, [authUser]);

  const all = useMemo(
    () =>
      [...generations, ...files, ...direct]
        .sort((a, b) => b.createdAtMs - a.createdAtMs)
        .map((n) => ({ ...n, unseen: n.createdAtMs > lastSeenMs })),
    [generations, files, direct, lastSeenMs]
  );

  const unseen = useMemo(() => all.filter((n) => n.unseen), [all]);

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
