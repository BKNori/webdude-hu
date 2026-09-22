"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

import {
  LayoutDashboard,
  Mail,
  FolderKanban,
  LogOut,
  Users,
  Clock,
  Settings,
  FileText,
  BarChart3,
  Bell,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Új lead érkezett",
      message: "Kovács János weboldal tervezést kér",
      time: "5 perce",
      unread: true,
    },
    {
      id: 2,
      title: "AI generáció kész",
      message: "Midjourney prompt sikeresen generálva",
      time: "15 perce",
      unread: true,
    },
    {
      id: 3,
      title: "Portfólió frissítve",
      message: "3 új projekt hozzáadva",
      time: "1 órája",
      unread: false,
    },
  ];

  useEffect(() => {
    if (!auth) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    if (!auth) return;

    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch {
      // Logout error handled silently
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-[#00B5F1] text-xl">Betöltés...</div>
      </div>
    );
  }

  if (!user && pathname !== "/admin/login") {
    return null;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      name: "Leadek",
      href: "/admin/leads",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      name: "Portfólió",
      href: "/admin/portfolio",
      icon: <FolderKanban className="w-4 h-4" />,
    },
    {
      name: "Munka Log",
      href: "/admin/work-log",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      name: "Portal Kezelő",
      href: "/admin/portal-kezelo",
      icon: <Users className="w-4 h-4" />,
    },
    {
      name: "Email Sablonok",
      href: "/admin/email-templates",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      name: "Statisztikák",
      href: "/admin/dashboard",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      name: "Beállítások",
      href: "/admin/settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <div
      id="admin-layout"
      className="min-h-screen bg-[#0a0a0f] text-gray-100 flex"
    >
      {/* Sidebar — fixed, full height, z-40 (a főoldali Header z-50 alatt) */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0f0f1a] border-r border-gray-800 z-40 flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-[#00B5F1] tracking-wide">
              WebDude
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Admin Panel</p>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#00B5F1]/10 text-[#00B5F1] border border-[#00B5F1]/30"
                      : "text-gray-400 hover:bg-gray-800/60 hover:text-gray-100"
                  }`}
                >
                  <span
                    className={
                      isActive ? "text-[#00B5F1]" : "text-gray-400"
                    }
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User info + logout */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-900/50 flex-1">
              <div className="w-7 h-7 rounded-full bg-[#00B5F1]/20 flex items-center justify-center text-xs text-[#00B5F1] font-bold shrink-0">
                {user?.email?.[0]?.toUpperCase() ?? "A"}
              </div>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800 transition-colors ml-2"
            >
              <Bell className="w-4 h-4 text-gray-400" />
              {notifications.filter((n) => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00B5F1] rounded-full text-[10px] text-bg-base font-bold flex items-center justify-center">
                  {notifications.filter((n) => n.unread).length}
                </span>
              )}
            </button>
          </div>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#0f0f1a] border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-3 border-b border-gray-800">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Értesítések
                </h4>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors cursor-pointer ${
                      notification.unread ? "bg-[#00B5F1]/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notification.unread ? "bg-[#00B5F1]" : "bg-gray-600"}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-100 mb-0.5 truncate">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-400 mb-1 truncate">
                          {notification.message}
                        </p>
                        <p className="text-[10px] text-gray-500 font-mono">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-800">
                <button className="w-full text-xs text-[#00B5F1] hover:text-[#00B5F1]/400 font-semibold py-1.5 transition-colors">
                  Összes megtekintése
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-500 hover:bg-gray-800/60 hover:text-gray-300 transition-colors w-full text-sm"
          >
            <LogOut className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Kijelentkezés</span>
          </button>
        </div>
      </aside>

      {/* Main Content — ml-64 = sidebar szélessége, flex-1 = maradék terület */}
      <div className="ml-64 flex-1 min-h-screen p-8 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
