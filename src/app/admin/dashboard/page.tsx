"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import AdminDashboard from "@/components/organisms/AdminDashboard";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }

      // Admin check
      const userEmail = user.email;
      if (
        userEmail !== "hello@webdude.hu" &&
        userEmail !== "admin@webdude.hu"
      ) {
        router.push("/admin");
      }
    });

    return unsubscribe;
  }, [router]);

  return (
    <div className="min-h-screen bg-bg-base">
      <AdminDashboard />
    </div>
  );
}
