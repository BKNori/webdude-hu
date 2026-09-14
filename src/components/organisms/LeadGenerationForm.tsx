"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface LeadGenerationFormProps {
  productName?: string;
  onSuccess?: () => void;
}

export default function LeadGenerationForm({
  productName = "WebDude Audit",
  onSuccess,
}: LeadGenerationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.website) {
      setStatus("error");
      setError("Minden mező kitöltése kötelező");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setError("Érvénytelen email cím");
      return;
    }

    // URL validation
    try {
      new URL(formData.website);
    } catch {
      setStatus("error");
      setError("Érvénytelen weboldal cím (http:// vagy https:// szükséges)");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", website: "", message: "" });
      onSuccess?.();
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-bg-elevated/50 border border-gold-primary/20 rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ingyenes Weboldal Audit
          </h2>
          <p className="text-slate-400">
            Kérj egy technikai elemzést, és 24 órán belül megkapod az oldalad
            Lighthouse-tervét.
          </p>
        </div>

        {/* Success State */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Audit kérés elküldve!
            </h3>
            <p className="text-slate-400">
              24 órán belül megkapod a Lighthouse-tervet az email címeden.
            </p>
          </motion.div>
        )}

        {/* Form */}
        {status !== "success" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-slate-300 mb-2"
              >
                Név *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full px-4 py-3 bg-bg-base border border-gold-primary/20 rounded-xl text-white placeholder-slate-500 focus:border-gold-primary focus:outline-none transition-colors disabled:opacity-50"
                placeholder="Teljes név"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-300 mb-2"
              >
                Email cím *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full px-4 py-3 bg-bg-base border border-gold-primary/20 rounded-xl text-white placeholder-slate-500 focus:border-gold-primary focus:outline-none transition-colors disabled:opacity-50"
                placeholder="email@pelda.hu"
              />
            </div>

            {/* Website */}
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-bold text-slate-300 mb-2"
              >
                Weboldal cím *
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full px-4 py-3 bg-bg-base border border-gold-primary/20 rounded-xl text-white placeholder-slate-500 focus:border-gold-primary focus:outline-none transition-colors disabled:opacity-50"
                placeholder="https://weboldalad.hu"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-bold text-slate-300 mb-2"
              >
                Üzenet (opcionális)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={status === "loading"}
                rows={4}
                className="w-full px-4 py-3 bg-bg-base border border-gold-primary/20 rounded-xl text-white placeholder-slate-500 focus:border-gold-primary focus:outline-none transition-colors disabled:opacity-50 resize-none"
                placeholder="Milyen konkrét problémát szeretnél megoldani?"
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-gold-primary text-bg-base font-bold rounded-xl hover:bg-gold-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Küldés folyamatban...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Audit kérése</span>
                </>
              )}
            </button>

            {/* Privacy Note */}
            <p className="text-xs text-slate-500 text-center">
              Az adataidat kizárólag az audit elvégzéséhez használjuk fel. A
              WebDude.hu GDPR kompatibilis.
            </p>
          </form>
        )}
      </div>
    </motion.div>
  );
}
