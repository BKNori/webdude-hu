import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beállítások | WebDude Admin",
  description: "Rendszerbeállítások és konfigurációk.",
};

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-bg-base text-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Beállítások</h1>
          <p className="text-slate-400 mt-2">
            Rendszerbeállítások és konfigurációk
          </p>
        </div>

        <div className="glass-card p-6 space-y-6">
          <div className="text-center py-12">
            <p className="text-slate-400">
              A beállítások felület fejlesztés alatt áll.
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Jelenleg a következő admin felületek érhetők el:
            </p>
            <div className="mt-4 space-y-2">
              <Link
                href="/admin/super-control"
                className="block text-[#00B5F1] hover:text-[#00B5F1]/400"
              >
                /admin/super-control - Szuperadmin Dashboard
              </Link>
              <Link
                href="/admin/email-templates"
                className="block text-[#00B5F1] hover:text-[#00B5F1]/400"
              >
                /admin/email-templates - Email Sablonok
              </Link>
              <Link
                href="/admin/work-log"
                className="block text-[#00B5F1] hover:text-[#00B5F1]/400"
              >
                /admin/work-log - Munkanapló
              </Link>
              <Link
                href="/admin/portfolio"
                className="block text-[#00B5F1] hover:text-[#00B5F1]/400"
              >
                /admin/portfolio - Portfólió
              </Link>
              <Link
                href="/admin/leads"
                className="block text-[#00B5F1] hover:text-[#00B5F1]/400"
              >
                /admin/leads - Leadek
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
