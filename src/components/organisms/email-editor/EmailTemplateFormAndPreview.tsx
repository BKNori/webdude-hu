"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  Loader2,
  Code,
} from "lucide-react";

export interface EmailTemplateFormData {
  templateId: string;
  name: string;
  subject: string;
  htmlContent: string;
  variables: string[];
  category: "onboarding" | "milestone" | "notification";
}

const AVAILABLE_VARIABLES = [
  { name: "clientName", description: "Ügyfél neve" },
  { name: "projectName", description: "Projekt neve" },
  { name: "magicLink", description: "Portál belépési link" },
  { name: "dueDate", description: "Határidő" },
  { name: "milestone", description: "Mérföldkő neve" },
];

interface EmailTemplateFormAndPreviewProps {
  isEditingExisting: boolean;
  formData: EmailTemplateFormData;
  previewMode: boolean;
  saving: boolean;
  onChangeFormData: (next: EmailTemplateFormData) => void;
  onTogglePreview: () => void;
  onCancel: () => void;
  onSave: () => void;
  onAddVariable: () => void;
  onRemoveVariable: (index: number) => void;
}

export default function EmailTemplateFormAndPreview({
  isEditingExisting,
  formData,
  previewMode,
  saving,
  onChangeFormData,
  onTogglePreview,
  onCancel,
  onSave,
  onAddVariable,
  onRemoveVariable,
}: EmailTemplateFormAndPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {isEditingExisting ? "Sablon Szerkesztése" : "Új Sablon"}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onTogglePreview}
            className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 font-bold rounded-xl transition-all flex items-center gap-2"
          >
            {previewMode ? (
              <>
                <Edit className="w-4 h-4" />
                Szerkesztés
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Előnézet
              </>
            )}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-500/10 hover:bg-slate-500/20 text-slate-400 font-bold rounded-xl transition-all"
          >
            Mégse
          </button>
        </div>
      </div>

      {!previewMode ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">
                Template ID
              </label>
              <input
                type="text"
                value={formData.templateId}
                onChange={(e) =>
                  onChangeFormData({ ...formData, templateId: e.target.value })
                }
                placeholder="pl. onboarding_welcome"
                disabled={isEditingExisting}
                className="w-full px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">Név</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  onChangeFormData({ ...formData, name: e.target.value })
                }
                placeholder="pl. Onboarding Üdvözlő"
                className="w-full px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-300">Tárgy</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  onChangeFormData({ ...formData, subject: e.target.value })
                }
                placeholder="pl. Üdvözöljük a WebDude portálon!"
                className="w-full px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">
                Kategória
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  onChangeFormData({
                    ...formData,
                    category: e.target.value as
                      | "onboarding"
                      | "milestone"
                      | "notification",
                  })
                }
                className="w-full px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="notification">Értesítés</option>
                <option value="onboarding">Onboarding</option>
                <option value="milestone">Mérföldkő</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">
                Változók
              </label>
              <div className="flex gap-2">
                <button
                  onClick={onAddVariable}
                  className="px-4 py-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Változó Hozzáadása
                </button>
              </div>
              {formData.variables.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.variables.map((variable, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-sky-500/10 text-sky-500 rounded-full text-sm flex items-center gap-2"
                    >
                      {`{{${variable}}}`}
                      <button
                        onClick={() => onRemoveVariable(index)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">
              HTML Tartalom
            </label>
            <textarea
              value={formData.htmlContent}
              onChange={(e) =>
                onChangeFormData({ ...formData, htmlContent: e.target.value })
              }
              placeholder="<html>...</html>"
              rows={12}
              className="w-full px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm"
            />
          </div>

          <div className="bg-bg-elevated/50 p-4 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Elérhető Változók
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {AVAILABLE_VARIABLES.map((variable) => (
                <div key={variable.name} className="text-xs text-slate-400">
                  <code className="text-sky-500">{`{{${variable.name}}}`}</code>
                  {" - "}
                  {variable.description}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onSave}
            disabled={saving}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-bg-base font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Mentés...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Sablon Mentése
              </>
            )}
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl text-black">
            <div className="border-b pb-4 mb-4">
              <div className="text-sm text-slate-500">Tárgy:</div>
              <div className="font-bold">{formData.subject}</div>
            </div>
            <iframe
              srcDoc={formData.htmlContent}
              sandbox=""
              title="Email sablon előnézet"
              className="w-full min-h-[420px] rounded-lg border border-slate-200 bg-white"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
