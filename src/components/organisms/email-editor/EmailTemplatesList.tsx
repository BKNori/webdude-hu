"use client";

import React from "react";
import { motion } from "motion/react";
import { Mail, Plus, Edit, Trash2, Loader2, Copy } from "lucide-react";

export interface EmailTemplateItem {
  id: string;
  templateId: string;
  name: string;
  subject: string;
  htmlContent: string;
  variables: string[];
  category: "onboarding" | "milestone" | "notification";
  updatedAt: string;
}

interface EmailTemplatesListProps {
  templates: EmailTemplateItem[];
  deletingId: string | null;
  onNewTemplate: () => void;
  onEditTemplate: (template: EmailTemplateItem) => void;
  onDuplicateTemplate: (template: EmailTemplateItem) => void;
  onDeleteTemplate: (templateId: string) => void;
}

export default function EmailTemplatesList({
  templates,
  deletingId,
  onNewTemplate,
  onEditTemplate,
  onDuplicateTemplate,
  onDeleteTemplate,
}: EmailTemplatesListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Mail className="w-6 h-6 text-sky-500" />
        Sablonok
      </h2>

      {templates.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Mail className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400">Még nincsenek email sablonok.</p>
          <button
            onClick={onNewTemplate}
            className="mt-4 px-6 py-3 bg-sky-500 hover:bg-violet-700 hover:text-white text-bg-base font-bold rounded-xl transition-all flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            Első Sablon Létrehozása
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-xs font-mono text-sky-500 uppercase mb-1">
                    {template.category}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {template.name}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {template.subject}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditTemplate(template)}
                    className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-lg transition-colors"
                    title="Szerkesztés"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDuplicateTemplate(template)}
                    className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg transition-colors"
                    title="Duplikálás"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTemplate(template.id)}
                    disabled={deletingId === template.id}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors disabled:opacity-50"
                    title="Törlés"
                  >
                    {deletingId === template.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {template.variables.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {template.variables.map((variable, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-sky-500/10 text-sky-500 rounded text-xs"
                    >
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-xs text-slate-500">
                Utolsó frissítés:{" "}
                {new Date(template.updatedAt).toLocaleDateString("hu-HU")}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
