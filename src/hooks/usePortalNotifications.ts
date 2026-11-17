"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const POLL_INTERVAL_MS = 60_000;
const QUERY_LIMIT = 10;

export interface NotificationCounts {
  pendingGenerations: number;
  completedGenerations: number;
  failedGenerations: number;
  newVaultFiles: number;
  total: number;
}

export interface PortalNotificationItem {
  key: string;
  kind: "generation" | "vault" | "system";
  tone: "info" | "success" | "error";
  title: string;
  subtitle: string;
  unread: boolean;
}

interface UsePortalNotificationsResult {
  counts: NotificationCounts;
  items: PortalNotificationItem[];
  unreadCount: number;
  loading: boolean;
  refreshing: boolean;
  lastUpdatedAt: string | null;
  refresh: () => Promise<void>;
  markAllAsRead: () => void;
}

function getStorageKey(uid: string): string {
  return `webdude_portal_notif_seen_${uid}`;
}

function loadSeenKeys(uid: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(getStorageKey(uid));
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((v): v is string => typeof v === "string"));
    }
  } catch {
    // Ignore localStorage parse/privacy errors
  }
  return new Set();
}

function saveSeenKeys(uid: string, keys: Set<string>): void {
  if (typeof window === "undefined") return;
  try {
    // Keep bounded history (max 100 keys) so localStorage stays tiny
    const bounded = Array.from(keys).slice(-100);
    window.localStorage.setItem(getStorageKey(uid), JSON.stringify(bounded));
  } catch {
    // Ignore storage quota/privacy errors
  }
}

/**
 * Spark-barát, Anti-Drain portál értesítési hook:
 * - Zéró folyamatos `onSnapshot` stream.
 * - Láthatóság-érzékeny (`document.visibilityState === "visible"`), 60 mp-es polling.
 * - `limit(10)` egyszeri `getDocs` lekérdezések + manuális `refresh()` + `markAllAsRead()`.
 */
export function usePortalNotifications(): UsePortalNotificationsResult {
  const [counts, setCounts] = useState<NotificationCounts>({
    pendingGenerations: 0,
    completedGenerations: 0,
    failedGenerations: 0,
    newVaultFiles: 0,
    total: 0,
  });
  const [rawItems, setRawItems] = useState<Omit<PortalNotificationItem, "unread">[]>([]);
  const [seenKeys, setSeenKeys] = useState<Set<string>>(() => new Set());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);

  const lastFetchTsRef = useRef<number>(0);
  const inFlightRef = useRef<boolean>(false);

  const fetchNotifications = useCallback(async (force = false) => {
    const user = auth?.currentUser;
    if (!user || !db) {
      setLoading(false);
      return;
    }

    if (
      !force &&
      typeof document !== "undefined" &&
      (document.hidden || document.visibilityState !== "visible")
    ) {
      return;
    }

    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setRefreshing(true);

    const uid = user.uid;
    const storedSeen = loadSeenKeys(uid);
    setSeenKeys(storedSeen);

    try {
      const generationsQuery = query(
        collection(db, "user_generations"),
        where("userId", "==", uid),
        orderBy("createdAt", "desc"),
        limit(QUERY_LIMIT)
      );

      const vaultQuery = query(
        collection(db, "vault"),
        where("clientId", "==", uid),
        orderBy("createdAt", "desc"),
        limit(QUERY_LIMIT)
      );

      const notificationsQuery = query(
        collection(db, "notifications"),
        where("userId", "==", uid),
        limit(QUERY_LIMIT)
      );

      const [genResult, vaultResult, notifResult] = await Promise.allSettled([
        getDocs(generationsQuery),
        getDocs(vaultQuery),
        getDocs(notificationsQuery),
      ]);

      let pending = 0;
      let completed = 0;
      let failed = 0;
      let vaultCount = 0;
      const collected: Omit<PortalNotificationItem, "unread">[] = [];

      if (genResult.status === "fulfilled") {
        genResult.value.docs.forEach((docSnap) => {
          const data = docSnap.data();
          const status = typeof data?.status === "string" ? data.status : "";
          const toolName =
            typeof data?.workflowId === "string" && data.workflowId
              ? data.workflowId
              : "AI Generálás";

          if (status === "processing") {
            pending++;
            collected.push({
              key: `gen_${docSnap.id}_processing`,
              kind: "generation",
              tone: "info",
              title: `Folyamatban: ${toolName}`,
              subtitle: "AI generálás feldolgozás alatt",
            });
          } else if (status === "completed") {
            completed++;
            collected.push({
              key: `gen_${docSnap.id}_completed`,
              kind: "generation",
              tone: "success",
              title: `Elkészült: ${toolName}`,
              subtitle: "Generált tartalom megtekinthető",
            });
          } else if (status === "failed") {
            failed++;
            collected.push({
              key: `gen_${docSnap.id}_failed`,
              kind: "generation",
              tone: "error",
              title: `Sikertelen: ${toolName}`,
              subtitle: "A generálás hibával leállt",
            });
          }
        });
      }

      if (vaultResult.status === "fulfilled") {
        vaultCount = vaultResult.value.docs.length;
        vaultResult.value.docs.forEach((docSnap) => {
          const data = docSnap.data();
          const fileName =
            typeof data?.name === "string" && data.name
              ? data.name
              : "Új dokumentum";
          collected.push({
            key: `vault_${docSnap.id}`,
            kind: "vault",
            tone: "info",
            title: fileName,
            subtitle: "Vault dokumentum elérhető",
          });
        });
      }

      if (notifResult.status === "fulfilled") {
        notifResult.value.docs.forEach((docSnap) => {
          const data = docSnap.data();
          if (data?.isRead === true) return;
          const title =
            typeof data?.title === "string" && data.title
              ? data.title
              : "Rendszerértesítés";
          const subtitle =
            typeof data?.message === "string" && data.message
              ? data.message
              : "Új portál esemény";
          collected.push({
            key: `notif_${docSnap.id}`,
            kind: "system",
            tone: "info",
            title,
            subtitle,
          });
        });
      }

      setCounts({
        pendingGenerations: pending,
        completedGenerations: completed,
        failedGenerations: failed,
        newVaultFiles: vaultCount,
        total: pending + completed + failed + vaultCount,
      });
      setRawItems(collected);
      lastFetchTsRef.current = Date.now();
      setLastUpdatedAt(
        new Date().toLocaleTimeString("hu-HU", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } catch (error) {
      console.error("usePortalNotifications: polling hiba", error);
    } finally {
      inFlightRef.current = false;
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      void fetchNotifications(false);
    }, 0);

    const intervalId = setInterval(() => {
      if (
        typeof document !== "undefined" &&
        document.visibilityState === "visible"
      ) {
        void fetchNotifications(false);
      }
    }, POLL_INTERVAL_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const elapsed = Date.now() - lastFetchTsRef.current;
        if (elapsed >= POLL_INTERVAL_MS) {
          void fetchNotifications(false);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchNotifications]);

  const markAllAsRead = useCallback(() => {
    const uid = auth?.currentUser?.uid;
    const next = new Set(seenKeys);
    rawItems.forEach((item) => next.add(item.key));
    setSeenKeys(next);
    if (uid) {
      saveSeenKeys(uid, next);
    }
  }, [rawItems, seenKeys]);

  const refresh = useCallback(async () => {
    await fetchNotifications(true);
  }, [fetchNotifications]);

  const items: PortalNotificationItem[] = rawItems.map((item) => ({
    ...item,
    unread: !seenKeys.has(item.key),
  }));

  const unreadCount = items.filter((item) => item.unread).length;

  return {
    counts,
    items,
    unreadCount,
    loading,
    refreshing,
    lastUpdatedAt,
    refresh,
    markAllAsRead,
  };
}
