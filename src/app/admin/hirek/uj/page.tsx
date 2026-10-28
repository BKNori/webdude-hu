"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { savePostAction } from "@/app/actions/blogPosts";
import ImageUploader from "@/components/molecules/ImageUploader";
import { ArrowLeft, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const CATEGORIES = [
  "Webfejlesztés",
  "WordPress",
  "SEO & Marketing",
  "Design",
  "AI & Automatizáció",
  "Biztonság",
];

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readingTime: string;
  author: string;
  coverImage: string;
  content: string;
  featured: boolean;
  noindex: boolean;
  published: boolean;
}

const initialState: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  category: "Webfejlesztés",
  readingTime: "5 perc",
  author: "Norbi",
  coverImage: "",
  content: "",
  featured: false,
  noindex: false,
  published: true,
};

export default function NewBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUpload = (url: string) => {
    setForm((prev) => ({ ...prev, coverImage: url }));
  };

  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    if (form.title.length < 3) newErrors.title = "A cím legalább 3 karakter";
    if (form.slug.length < 3) newErrors.slug = "A slug legalább 3 karakter";
    if (form.excerpt.length < 10) newErrors.excerpt = "A rövid leírás legalább 10 karakter";
    if (form.content.length < 50) newErrors.content = "A tartalom legalább 50 karakter";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSaving(true);
    setResult(null);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          if (value) formData.append(key, "on");
        } else {
          formData.append(key, String(value));
        }
      });
      const res = await savePostAction(formData);
      if (res.success) {
        setResult({ success: true, message: "A cikk sikeresen mentve!" });
        setTimeout(() => router.push("/admin/hirek"), 1500);
      } else {
        setResult({ success: false, message: res.error || "Ismeretlen hiba történt." });
      }
    } catch (err) {
      setResult({ success: false, message: err instanceof Error ? err.message : "Hiba történt." });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full bg-[#0a0a0f] border border-gray-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-[#00B5F1] focus:ring-1 focus:ring-[#00B5F1] outline-none transition-colors";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/hirek" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#00B5F1] transition-colors text-sm mb-4">
          <ArrowLeft className="w-4 h-4" /> Vissza a listához
        </Link>
        <h1 className="text-3xl font-extrabold text-[#00B5F1] font-mono tracking-wide uppercase">
          Új cikk létrehozása
        </h1>
        <p className="text-xs text-slate-400 mt-1">A cikk a Firestore blog_posts kollekciójába kerül</p>
      </div>

      {result && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-6 text-sm ${result.success ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border border-red-500/30 text-red-400"}`}>
          {result.success ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {result.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#0f0f1a] border border-gray-800 rounded-3xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelClass} htmlFor="title">Cím *</label>
              <input id="title" name="title" type="text" value={form.title} onChange={handleChange} className={inputClass} placeholder="A cikk címe..." />
              {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="slug">Slug *</label>
              <input id="slug" name="slug" type="text" value={form.slug} onChange={handleChange} className={`${inputClass} font-mono`} placeholder="url-barat-slug" />
              {errors.slug && <p className="text-xs text-red-400 mt-1">{errors.slug}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="category">Kategória</label>
              <select id="category" name="category" value={form.category} onChange={handleChange} className={inputClass}>
                {CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass} htmlFor="excerpt">Rövid leírás *</label>
              <textarea id="excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} className={inputClass} placeholder="A cikk rövid összefoglalója..." />
              {errors.excerpt && <p className="text-xs text-red-400 mt-1">{errors.excerpt}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="author">Szerző</label>
              <input id="author" name="author" type="text" value={form.author} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="readingTime">Olvasási idő</label>
              <input id="readingTime" name="readingTime" type="text" value={form.readingTime} onChange={handleChange} className={inputClass} placeholder="pl. 5 perc" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Borítókép</label>
              <ImageUploader onUploadSuccess={handleImageUpload} initialImageUrl={form.coverImage} label="Cikk borítókép" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass} htmlFor="content">Tartalom (Markdown/HTML) *</label>
              <textarea id="content" name="content" value={form.content} onChange={handleChange} rows={16} className={`${inputClass} font-mono text-sm leading-relaxed`} placeholder="A cikk teljes tartalma HTML vagy Markdown formátumban..." />
              {errors.content && <p className="text-xs text-red-400 mt-1">{errors.content}</p>}
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-800/50">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="w-4 h-4 rounded accent-[#00B5F1]" />
                <span className="text-sm text-slate-300">Közététel</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 rounded accent-[#00B5F1]" />
                <span className="text-sm text-slate-300">Kiemelt</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="noindex" checked={form.noindex} onChange={handleChange} className="w-4 h-4 rounded accent-[#00B5F1]" />
                <span className="text-sm text-slate-300">Noindex</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Link href="/admin/hirek" className="px-6 py-3 text-sm text-slate-400 hover:text-white transition-colors">
            Mégse
          </Link>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-8 py-3 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,181,241,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Mentés..." : "Cikk mentése"}
          </button>
        </div>
      </form>
    </div>
  );
}