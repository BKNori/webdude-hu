"use client";

import React, { useState, useEffect } from "react";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  getEmailTemplatesAction,
  saveEmailTemplateAction,
  deleteEmailTemplateAction,
} from "@/actions/email-templates";
import EmailTemplateFormAndPreview, {
  type EmailTemplateFormData,
} from "@/components/organisms/email-editor/EmailTemplateFormAndPreview";
import EmailTemplatesList, {
  type EmailTemplateItem,
} from "@/components/organisms/email-editor/EmailTemplatesList";

const EMPTY_FORM_DATA: EmailTemplateFormData = {
  templateId: "",
  name: "",
  subject: "",
  htmlContent: "",
  variables: [],
  category: "notification",
};

export default function EmailTemplateEditor() {
  const [templates, setTemplates] = useState<EmailTemplateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTemplate, setEditingTemplate] =
    useState<EmailTemplateItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [idToken, setIdToken] = useState<string>("");
  const [formData, setFormData] =
    useState<EmailTemplateFormData>(EMPTY_FORM_DATA);

  const loadTemplates = async (tokenOverride?: string) => {
    const activeToken = tokenOverride ?? idToken;
    setLoading(true);
    setError("");
    try {
      const response = await getEmailTemplatesAction(activeToken);
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
        await loadTemplates(token);
      } else {
        setError("Nincs bejelentkezett felhasználó.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewTemplate = () => {
    setEditingTemplate(null);
    setIsCreatingNew(true);
    setFormData(EMPTY_FORM_DATA);
    setPreviewMode(false);
  };

  const handleEditTemplate = (template: EmailTemplateItem) => {
    setEditingTemplate(template);
    setIsCreatingNew(false);
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
        setIsCreatingNew(false);
        setFormData(EMPTY_FORM_DATA);
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

  const handleDuplicateTemplate = async (template: EmailTemplateItem) => {
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
            className="px-6 py-3 bg-sky-500 hover:bg-violet-700 hover:text-white text-bg-base font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
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

        {(editingTemplate || isCreatingNew || formData.templateId) && (
          <EmailTemplateFormAndPreview
            isEditingExisting={!!editingTemplate}
            formData={formData}
            previewMode={previewMode}
            saving={saving}
            onChangeFormData={setFormData}
            onTogglePreview={() => setPreviewMode(!previewMode)}
            onCancel={() => {
              setEditingTemplate(null);
              setIsCreatingNew(false);
              setFormData(EMPTY_FORM_DATA);
            }}
            onSave={handleSave}
            onAddVariable={handleAddVariable}
            onRemoveVariable={handleRemoveVariable}
          />
        )}

        <EmailTemplatesList
          templates={templates}
          deletingId={deleting}
          onNewTemplate={handleNewTemplate}
          onEditTemplate={handleEditTemplate}
          onDuplicateTemplate={handleDuplicateTemplate}
          onDeleteTemplate={handleDelete}
        />
      </div>
    </div>
  );
}
