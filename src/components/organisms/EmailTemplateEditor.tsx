"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  Loader2,
  AlertCircle,
  Code,
  Copy,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  getEmailTemplatesAction,
  saveEmailTemplateAction,
  deleteEmailTemplateAction,
} from "@/actions/email-templates";

interface EmailTemplate {
  id: string;
  templateId: string;
  name: string;
  subject: string;
  htmlContent: string;
  variables: string[];
  category: "onboarding" | "milestone" | "notification";
  updatedAt: string;
}

export default function EmailTemplateEditor() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [idToken, setIdToken] = useState<string>("");

  const [formData, setFormData] = useState({
    templateId: "",
    name: "",
    subject: "",
    htmlContent: "",
    variables: [] as string[],
    category: "notification" as "onboarding" | "milestone" | "notification",
  });

  const loadTemplates = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getEmailTemplatesAction(idToken);
      if (response.success && response.templates) {
        setTemplates(response.templates);
      } else {
        setError(response.error || "Hiba történt a sablonok lekérése során.");
      }
    } catch {
      setError("Hiba történt a sablonok lekérése során.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        setIdToken(token);
      } else {
        setError("Nincs bejelentkezett felhasználó.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (idToken) {
      const fetchData = async () => {
        await loadTemplates();
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken]);

  const handleNewTemplate = () => {
    setEditingTemplate(null);
    setFormData({
      templateId: "",
      name: "",
      subject: "",
      htmlContent: "",
      variables: [],
      category: "notification",
    });
    setPreviewMode(false);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({
      templateId: template.templateId,
      name: template.name,
      subject: template.subject,
      htmlContent: template.htmlContent,
      variables: template.variables,
      category: template.category,
    });
    setPreviewMode(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const response = await saveEmailTemplateAction(
        formData.templateId,
        formData.name,
        formData.subject,
        formData.htmlContent,
        formData.variables,
        formData.category,
        idToken
      );

      if (response.success) {
        await loadTemplates();
        setEditingTemplate(null);
        setFormData({
          templateId: "",
          name: "",
          subject: "",
          htmlContent: "",
          variables: [],
          category: "notification",
        });
      } else {
        setError(response.error || "Hiba történt a mentés során.");
      }
    } catch {
      setError("Hiba történt a mentés során.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (templateId: string) => {
    setDeleting(templateId);
    setError("");
    try {
      const response = await deleteEmailTemplateAction(templateId, idToken);
      if (response.success) {
        await loadTemplates();
      } else {
        setError(response.error || "Hiba történt a törlés során.");
      }
    } catch {
      setError("Hiba történt a törlés során.");
    } finally {
      setDeleting(null);
    }
  };

  const handleDuplicateTemplate = async (template: EmailTemplate) => {
    const newTemplateId = `${template.templateId}_copy_${Date.now()}`;
    const newName = `${template.name} (Másolat)`;

    try {
      const response = await saveEmailTemplateAction(
        newTemplateId,
        newName,
        template.subject,
        template.htmlContent,
        template.variables,
        template.category,
        idToken
      );

      if (response.success) {
        await loadTemplates();
      } else {
        setError(response.error || "Hiba történt a másolás során.");
      }
    } catch {
      setError("Hiba történt a másolás során.");
    }
  };

  const handleAddVariable = () => {
    const variable = prompt("Add meg a változó nevét (pl. clientName):");
    if (variable) {
      setFormData({
        ...formData,
        variables: [...formData.variables, variable],
      });
    }
  };

  const handleRemoveVariable = (index: number) => {
    setFormData({
      ...formData,
      variables: formData.variables.filter((_, i) => i !== index),
    });
  };

  const availableVariables = [
    { name: "clientName", description: "Ügyfél neve" },
    { name: "projectName", description: "Projekt neve" },
    { name: "magicLink", description: "Portál belépési link" },
    { name: "dueDate", description: "Határidő" },
    { name: "milestone", description: "Mérföldkő neve" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest animate-pulse font-bold">
          Email Template Editor betöltése...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-base text-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Email Template Editor
            </h1>
            <p className="text-slate-400 mt-2">
              Email sablonok kezelése és szerkesztése
            </p>
          </div>
          <button
            onClick={handleNewTemplate}
            className="px-6 py-3 bg-sky-500 hover:bg-violet-700 text-bg-base font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Új Sablon
          </button>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-xl">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Editor Section */}
        {(editingTemplate || formData.templateId) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {editingTemplate ? "Sablon Szerkesztése" : "Új Sablon"}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
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
                  onClick={() => {
                    setEditingTemplate(null);
                    setFormData({
                      templateId: "",
                      name: "",
                      subject: "",
                      htmlContent: "",
                      variables: [],
                      category: "notification",
                    });
                  }}
                  className="px-4 py-2 bg-slate-500/10 hover:bg-slate-500/20 text-slate-400 font-bold rounded-xl transition-all"
                >
                  Mégse
                </button>
              </div>
            </div>

            {!previewMode ? (
              <>
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">
                      Template ID
                    </label>
                    <input
                      type="text"
                      value={formData.templateId}
                      onChange={(e) =>
                        setFormData({ ...formData, templateId: e.target.value })
                      }
                      placeholder="pl. onboarding_welcome"
                      disabled={!!editingTemplate}
                      className="w-full px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">
                      Név
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="pl. Onboarding Üdvözlő"
                      className="w-full px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-300">
                      Tárgy
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
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
                        setFormData({
                          ...formData,
                          category: e.target.value as
                            "onboarding" | "milestone" | "notification",
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
                        onClick={handleAddVariable}
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
                              onClick={() => handleRemoveVariable(index)}
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

                {/* HTML Content Editor */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">
                    HTML Tartalom
                  </label>
                  <textarea
                    value={formData.htmlContent}
                    onChange={(e) =>
                      setFormData({ ...formData, htmlContent: e.target.value })
                    }
                    placeholder="<html>...</html>"
                    rows={12}
                    className="w-full px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm"
                  />
                </div>

                {/* Available Variables Reference */}
                <div className="bg-bg-elevated/50 p-4 rounded-xl space-y-2">
                  <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Elérhető Változók
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availableVariables.map((variable) => (
                      <div
                        key={variable.name}
                        className="text-xs text-slate-400"
                      >
                        <code className="text-sky-500">{`{{${variable.name}}}`}</code>
                        {" - "}
                        {variable.description}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
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
              /* Preview Mode */
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl text-black">
                  <div className="border-b pb-4 mb-4">
                    <div className="text-sm text-slate-500">Tárgy:</div>
                    <div className="font-bold">{formData.subject}</div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: formData.htmlContent }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Templates List */}
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
                onClick={handleNewTemplate}
                className="mt-4 px-6 py-3 bg-sky-500 hover:bg-violet-700 text-bg-base font-bold rounded-xl transition-all flex items-center gap-2 mx-auto"
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
                        onClick={() => handleEditTemplate(template)}
                        className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-lg transition-colors"
                        title="Szerkesztés"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicateTemplate(template)}
                        className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg transition-colors"
                        title="Duplikálás"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(template.id)}
                        disabled={deleting === template.id}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors disabled:opacity-50"
                        title="Törlés"
                      >
                        {deleting === template.id ? (
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
      </div>
    </div>
  );
}
