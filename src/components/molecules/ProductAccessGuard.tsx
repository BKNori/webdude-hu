"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ProductAccessGuardProps {
  children: React.ReactNode;
}

export default function ProductAccessGuard({
  children,
}: ProductAccessGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setHasAccess(false);
        setLoading(false);
        return;
      }
      setUser(currentUser);

      // Check if user is admin (hello@webdude.hu) or has product access
      const isAdminUser = currentUser.email === "hello@webdude.hu";

      if (isAdminUser) {
        setHasAccess(true);
        setLoading(false);
        return;
      }

      // Check if user has product access in Firestore
      try {
        if (!db) {
          setHasAccess(false);
          setLoading(false);
          return;
        }
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const hasProductAccess = userData.hasProductAccess === true;
          setHasAccess(hasProductAccess);
        } else {
          setHasAccess(false);
        }
      } catch (error) {
        console.error("Error checking user permissions:", error);
        setHasAccess(false);
      }

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#00B5F1]" />
        <p className="text-xs font-mono text-[#4B5563] uppercase tracking-widest animate-pulse font-bold">
          Betöltés...
        </p>
      </div>
    );
  }

  if (!user || !hasAccess) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-6 px-6">
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-2xl text-sm flex items-center gap-3 font-mono max-w-md text-center">
          <AlertCircle className="w-5 h-5" />
          Hozzáférés megtagadva. A termékekhez csak a Superadmin vagy
          jogosultsággal rendelkező ügyfelek férhetnek hozzá!
        </div>
        <Link
          href="/admin/login"
          className="px-6 py-3 rounded-xl bg-[#00B5F1] text-slate-950 font-bold hover:bg-[#5B21B6] transition-colors"
        >
          Bejelentkezés
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
