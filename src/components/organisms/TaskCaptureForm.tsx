"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createIncomingTaskAction } from "@/actions/tasks";
import { Plus, Mail, Calendar, AlertCircle, CheckCircle } from "lucide-react";

interface TaskFormData {
  description: string;
  email_url: string;
  due_date: string;
  is_critical: boolean;
}

export default function TaskCaptureForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();

  // URL paraméterek kezelése bookmarkletből
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const url = params.get("url");
    const text = params.get("text");

    if (url) {
      reset({
        description: text || "",
        email_url: url,
        due_date: "",
        is_critical: false,
      });
    }
  }, [reset]);

  const onSubmit = async (data: TaskFormData) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = await createIncomingTaskAction({
        description: data.description,
        email_url: data.email_url,
        due_date: data.due_date,
        is_critical: data.is_critical,
      });

      if (result.success) {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "Hiba történt a feladat létrehozásakor.");
      }
    } catch (err) {
      setError("Váratlan hiba történt.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f0f1a] border border-gray-800 rounded-2xl p-6 hover:border-amber-500/20 transition-all">
      <div className="flex items-center gap-2 mb-6">
        <Plus className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-bold text-white">Gyors-rögzítő</h2>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2 mb-4">
          <CheckCircle className="w-4 h-4" />
          <span>Feladat sikeresen létrehozva!</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2 mb-4">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Feladat leírása
          </label>
          <textarea
            {...register("description", { required: "Kötelező mező" })}
            className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none resize-none"
            rows={3}
            placeholder="Írd be a feladat leírását..."
          />
          {errors.description && (
            <p className="text-red-400 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            E-mail URL (opcionális)
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              {...register("email_url")}
              type="url"
              className="w-full pl-10 px-4 py-3 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
              placeholder="https://mail.google.com/mail/u/0/#inbox/..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Határidő (opcionális)
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              {...register("due_date")}
              type="date"
              className="w-full pl-10 px-4 py-3 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            {...register("is_critical")}
            type="checkbox"
            id="is_critical"
            className="w-4 h-4 bg-[#0a0a0f] border-gray-700 rounded focus:border-amber-500"
          />
          <label
            htmlFor="is_critical"
            className="text-sm text-gray-400 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-red-500" />
            Sürgős feladat
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black font-bold rounded-lg transition-colors"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Mentés...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Feladat Mentése
            </>
          )}
        </button>
      </form>
    </div>
  );
}
