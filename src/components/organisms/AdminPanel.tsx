"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  registerUserAction,
  assignAddonToUserAction,
  updateUserToolsAction,
} from "@/actions/admin";

// Zod validation schemas
const registerSchema = z.object({
  email: z.string().email("Érvénytelen e-mail cím"),
  name: z.string().min(2, "A név legalább 2 karakter hosszú legyen"),
});

const assignSchema = z.object({
  userId: z.string().min(1, "Válassz ki egy ügyfelet"),
  addonId: z.string().min(1, "Válassz ki egy szolgáltatást"),
});

const toolsSchema = z.object({
  userId: z.string().min(1, "Válassz ki egy ügyfelet"),
  allowedTools: z.array(z.string()),
});

type RegisterInput = z.infer<typeof registerSchema>;
type AssignInput = z.infer<typeof assignSchema>;
type ToolsInput = z.infer<typeof toolsSchema>;

interface ClientUser {
  uid: string;
  email: string;
  name: string;
}

interface AdminPanelProps {
  users?: ClientUser[];
  addons?: Array<{ id: string; name: string }>;
  idToken: string;
  userTools?: Record<string, string[]>; // Map of userId to allowedTools array
}

export default function AdminPanel({
  users = [],
  addons = [],
  idToken,
  userTools = {},
}: AdminPanelProps) {
  const [isPendingRegister, startRegister] = useTransition();
  const [isPendingAssign, startAssign] = useTransition();
  const [isPendingTools, startTools] = useTransition();
  const [registerResult, setRegisterResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [assignResult, setAssignResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [toolsResult, setToolsResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset: resetRegister,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", name: "" },
  });

  const assignForm = useForm<AssignInput>({
    resolver: zodResolver(assignSchema),
    defaultValues: { userId: "", addonId: "" },
  });

  const toolsForm = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    defaultValues: { userId: "", allowedTools: [] },
  });

  const availableTools = [
    { id: "product_desc", name: "Termék Leírás Generátor" },
    { id: "review_assistant", name: "Vélemény Segéd" },
    { id: "social_matrix", name: "Social Media Mátrix" },
    { id: "cart_recovery", name: "Kosár Visszaszerzés" },
    { id: "midjourney_prompt", name: "Midjourney Prompt" },
    { id: "banner_concept", name: "Banner Koncepció" },
    { id: "logo_designer", name: "Logo Tervező" },
    { id: "ui_ux_designer", name: "UI/UX Tervező" },
    { id: "seasonal_campaign_designer", name: "Szezonális Kampány Tervező" },
    { id: "kristofka_workflow", name: "Kristófka Workflow" },
    { id: "prompt_templates", name: "AI Prompt Sablonok" },
  ];

  const onRegisterSubmit = (data: RegisterInput) => {
    setRegisterResult(null);
    startRegister(async () => {
      try {
        const res = await registerUserAction(data, idToken);
        if (res.success) {
          setRegisterResult({
            success: true,
            message: `Ügyfél sikeresen létrehozva! Ideiglenes jelszó: ${res.password || "E-mailben elküldve"}`,
          });
          resetRegister();
        } else {
          setRegisterResult({
            success: false,
            message: res.error || "Hiba történt a regisztráció során",
          });
        }
      } catch {
        setRegisterResult({
          success: false,
          message: "Váratlan hálózati hiba történt",
        });
      }
    });
  };

  const onAssignSubmit = (data: AssignInput) => {
    setAssignResult(null);
    startAssign(async () => {
      try {
        const selectedUser = users.find((u) => u.uid === data.userId);
        if (!selectedUser) {
          setAssignResult({
            success: false,
            message: "Kiválasztott ügyfél nem található",
          });
          return;
        }
        const res = await assignAddonToUserAction(
          {
            email: selectedUser.email,
            addonId: data.addonId,
          },
          idToken
        );
        if (res.success) {
          setAssignResult({
            success: true,
            message: "Szolgáltatás sikeresen hozzárendelve az ügyfélhez!",
          });
          assignForm.reset();
        } else {
          setAssignResult({
            success: false,
            message: res.error || "Hiba történt a hozzárendelés során",
          });
        }
      } catch {
        setAssignResult({
          success: false,
          message: "Váratlan hálózati hiba történt",
        });
      }
    });
  };

  const onToolsSubmit = (data: ToolsInput) => {
    setToolsResult(null);
    startTools(async () => {
      try {
        const selectedUser = users.find((u) => u.uid === data.userId);
        if (!selectedUser) {
          setToolsResult({
            success: false,
            message: "Kiválasztott ügyfél nem található",
          });
          return;
        }
        const res = await updateUserToolsAction(
          {
            email: selectedUser.email,
            allowedTools: data.allowedTools,
          },
          idToken
        );
        if (res.success) {
          setToolsResult({
            success: true,
            message: "Eszközjogosultságok sikeresen frissítve!",
          });
          toolsForm.reset();
        } else {
          setToolsResult({
            success: false,
            message: res.error || "Hiba történt a frissítés során",
          });
        }
      } catch {
        setToolsResult({
          success: false,
          message: "Váratlan hálózati hiba történt",
        });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 py-12">
      {/* 1. Form: Ügyfél Regisztráció */}
      <div className="bg-bg-surface/30 border border-slate-800/50 backdrop-blur-md rounded-2xl p-8 hover:border-amber-500/10 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
          Új Ügyfél Regisztrációja
        </h2>

        <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Ügyfél Teljes Neve
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Pl. Kis Péter"
              className="w-full bg-bg-elevated/30 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-text-primary outline-none transition-all"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              E-mail Cím
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="peter@pelda.hu"
              className="w-full bg-bg-elevated/30 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-text-primary outline-none transition-all"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPendingRegister}
            className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/30 text-bg-base font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isPendingRegister ? "Mentés folyamatban..." : "Ügyfél Létrehozása"}
          </button>
        </form>

        {registerResult && (
          <div
            className={`mt-6 p-4 rounded-xl border text-sm ${registerResult.success ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}
          >
            {registerResult.message}
          </div>
        )}
      </div>

      {/* 2. Form: Addon Hozzárendelés */}
      <div className="bg-bg-surface/30 border border-slate-800/50 backdrop-blur-md rounded-2xl p-8 hover:border-amber-500/10 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
          Szolgáltatás Hozzárendelése
        </h2>

        <form
          onSubmit={assignForm.handleSubmit(onAssignSubmit)}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Válassz Ügyfelet
            </label>
            <select
              {...assignForm.register("userId")}
              className="w-full bg-bg-elevated/50 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-text-primary outline-none transition-all"
            >
              <option value="">-- Válassz az aktív kliensek közül --</option>
              {users.map((u) => (
                <option key={u.uid} value={u.uid}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
            {assignForm.formState.errors.userId && (
              <p className="text-red-500 text-sm mt-1">
                {assignForm.formState.errors.userId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Válassz Add-ont
            </label>
            <select
              {...assignForm.register("addonId")}
              className="w-full bg-bg-elevated/50 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-text-primary outline-none transition-all"
            >
              <option value="">-- Válassz szolgáltatást --</option>
              {addons.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            {assignForm.formState.errors.addonId && (
              <p className="text-red-500 text-sm mt-1">
                {assignForm.formState.errors.addonId.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPendingAssign}
            className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/30 text-bg-base font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isPendingAssign
              ? "Hozzárendelés folyamatban..."
              : "Szolgáltatás Hozzáadása"}
          </button>
        </form>

        {assignResult && (
          <div
            className={`mt-6 p-4 rounded-xl border text-sm ${assignResult.success ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}
          >
            {assignResult.message}
          </div>
        )}
      </div>

      {/* 3. Form: Eszközjogosultság Kezelés */}
      <div className="bg-bg-surface/30 border border-slate-800/50 backdrop-blur-md rounded-2xl p-8 hover:border-amber-500/10 transition-colors duration-300 md:col-span-2 lg:col-span-1">
        <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
          Eszközjogosultság Kezelés
        </h2>

        <form
          onSubmit={toolsForm.handleSubmit(onToolsSubmit)}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Válassz Ügyfelet
            </label>
            <select
              {...toolsForm.register("userId")}
              onChange={(e) => {
                toolsForm.setValue("userId", e.target.value);
                // Load existing tools for selected user
                const existingTools = userTools[e.target.value] || [];
                toolsForm.setValue("allowedTools", existingTools);
              }}
              className="w-full bg-bg-elevated/50 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-text-primary outline-none transition-all"
            >
              <option value="">-- Válassz az aktív kliensek közül --</option>
              {users.map((u) => (
                <option key={u.uid} value={u.uid}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
            {toolsForm.formState.errors.userId && (
              <p className="text-red-500 text-sm mt-1">
                {toolsForm.formState.errors.userId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Engedélyezett Eszközök
            </label>
            <div className="space-y-2 max-h-64 overflow-y-auto bg-bg-elevated/30 rounded-xl p-4 border border-slate-800">
              {availableTools.map((tool) => (
                <label
                  key={tool.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    {...toolsForm.register("allowedTools")}
                    value={tool.id}
                    className="w-4 h-4 rounded border-slate-600 text-amber-500 focus:ring-amber-500 bg-bg-elevated"
                  />
                  <span className="text-sm text-text-primary">{tool.name}</span>
                </label>
              ))}
            </div>
            {toolsForm.formState.errors.allowedTools && (
              <p className="text-red-500 text-sm mt-1">
                {toolsForm.formState.errors.allowedTools.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPendingTools}
            className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/30 text-bg-base font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isPendingTools
              ? "Frissítés folyamatban..."
              : "Jogosultságok Mentése"}
          </button>
        </form>

        {toolsResult && (
          <div
            className={`mt-6 p-4 rounded-xl border text-sm ${toolsResult.success ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}
          >
            {toolsResult.message}
          </div>
        )}
      </div>
    </div>
  );
}
