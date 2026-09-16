"use client";

import { motion } from "motion/react";
import {
  CheckCircle,
  Shield,
  Zap,
  Activity,
  Code,
  Database,
} from "lucide-react";

interface AuditStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  icon: React.ReactNode;
}

interface ArchitectViewSectionProps {
  productName: string;
  auditSteps?: AuditStep[];
}

const defaultAuditSteps: AuditStep[] = [
  {
    id: "static-html",
    title: "Statikus HTML Architektúra",
    description:
      "Fertőzésmentes, szerveroldali sebezhetőségek nélküli renderelés",
    status: "completed",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: "lighthouse-optimization",
    title: "Lighthouse 95+ Score",
    description: "Scroll-trigger animációk és kéoptimalizáció",
    status: "completed",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: "seo-audit",
    title: "Entity-based SEO",
    description: "JSON-LD Schema és AEO optimalizáció",
    status: "completed",
    icon: <Activity className="w-4 h-4" />,
  },
  {
    id: "code-quality",
    title: "Next.js 16 + React 19",
    description: "Modern stack, TypeScript strict mode",
    status: "in-progress",
    icon: <Code className="w-4 h-4" />,
  },
  {
    id: "database-security",
    title: "Firebase Security",
    description: "Firestore és Authentication integráció",
    status: "pending",
    icon: <Database className="w-4 h-4" />,
  },
];

export default function ArchitectViewSection({
  productName,
  auditSteps = defaultAuditSteps,
}: ArchitectViewSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed right-4 top-24 w-80 bg-bg-elevated/90 backdrop-blur-md border border-brand-primary/20 rounded-xl p-4 shadow-2xl z-50"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brand-primary/20">
        <Shield className="w-5 h-5 text-brand-primary" />
        <div>
          <h3 className="text-sm font-bold text-white">
            WebDude Minőségbiztosítás
          </h3>
          <p className="text-xs text-slate-400">{productName}</p>
        </div>
      </div>

      {/* Audit Steps */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {auditSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-3 p-2 rounded-lg bg-bg-base/50 hover:bg-bg-base/80 transition-colors"
          >
            <div
              className={`mt-0.5 ${
                step.status === "completed"
                  ? "text-emerald-500"
                  : step.status === "in-progress"
                    ? "text-sky-500"
                    : "text-slate-500"
              }`}
            >
              {step.status === "completed" ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                step.icon
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-xs font-bold text-white truncate">
                  {step.title}
                </h4>
                {step.status === "in-progress" && (
                  <span className="px-1.5 py-0.5 bg-sky-500/10 text-sky-500 text-[10px] font-bold rounded">
                    Folyamatban
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-2">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-brand-primary/20">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Audit státusz</span>
          <span className="text-emerald-500 font-bold">
            {auditSteps.filter((s) => s.status === "completed").length}/
            {auditSteps.length}
          </span>
        </div>
        <div className="mt-2 h-1.5 bg-bg-base rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${
                (auditSteps.filter((s) => s.status === "completed").length /
                  auditSteps.length) *
                100
              }%`,
            }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-brand-primary to-emerald-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
