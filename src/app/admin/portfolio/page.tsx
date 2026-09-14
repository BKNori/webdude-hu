"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Work } from "@/types/work";
import {
  importStaticWorksToFirestore,
  importWordPressWorksToFirestore,
} from "@/actions/portfolio";
import { revalidatePortfolio } from "@/actions/revalidate";
import ImageUploader from "@/components/molecules/ImageUploader";

interface WorkFormState {
  title: string;
  slug: string;
  category: "weboldal" | "webshop" | "arculat" | "grafika" | "branding";
  description: string;
  tags: string;
  image: string;
  challenge: string;
  solution: string;
  results: string;
  featured: boolean;
  year: number;
  client: string;
}

const initialFormState: WorkFormState = {
  title: "",
  slug: "",
  category: "weboldal",
  description: "",
  tags: "",
  image: "",
  challenge: "",
  solution: "",
  results: "",
  featured: false,
  year: new Date().getFullYear(),
  client: "",
};

export default function AdminPortfolio() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(!db);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentWorkId, setCurrentWorkId] = useState<string | null>(null);
  const [formState, setFormState] = useState<WorkFormState>(initialFormState);

  // Delete confirm states
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Static import states
  const [importing, setImporting] = useState(false);
  const [importMessage, setImportMessage] = useState("");

  // Slug auto-generation state flag
  const [autoSlug, setAutoSlug] = useState(true);

  // Batch operations
  const [selectedWorks, setSelectedWorks] = useState<Set<string>>(new Set());
  const [batchMode, setBatchMode] = useState(false);

  const fetchWorks = async (showLoading = false) => {
    if (!db) return;
    if (showLoading) setLoading(true);
    try {
      const portfolioRef = collection(db, "portfolio");
      const q = query(portfolioRef, orderBy("title", "asc"));
      const querySnapshot = await getDocs(q);

      const worksData: Work[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        worksData.push({
          id: docSnap.id,
          slug: data.slug || "",
          title: data.title || "",
          description: data.description || "",
          category: data.category || "weboldal",
          tags: Array.isArray(data.tags)
            ? data.tags
            : Array.isArray(data.keywords)
              ? data.keywords
              : [],
          image:
            data.image ||
            (data.assets &&
            typeof data.assets === "object" &&
            "image" in data.assets
              ? ((data.assets as Record<string, unknown>).image as string)
              : ""),
          challenge: data.challenge || "",
          solution: data.solution || "",
          results: Array.isArray(data.results) ? data.results : [],
          featured: !!data.featured,
          year: typeof data.year === "number" ? data.year : undefined,
          client: data.client || "",
        });
      });
      setWorks(worksData);
      setError("");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Hiba történt a portfólió elemek lekérésekor."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchWorks(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove Hungarian accents
      .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphen
      .replace(/-+/g, "-"); // Replace multiple hyphens
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState((prev) => {
      const updated = { ...prev, title: value };
      if (autoSlug) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAutoSlug(value === "");
    setFormState((prev) => ({ ...prev, slug: value }));
  };

  const openCreateModal = () => {
    setFormState(initialFormState);
    setModalMode("create");
    setCurrentWorkId(null);
    setAutoSlug(true);
    setIsModalOpen(true);
  };

  const openEditModal = (work: Work) => {
    setFormState({
      title: work.title,
      slug: work.slug,
      category: work.category,
      description: work.description,
      tags: work.tags.join(", "),
      image: work.image || "",
      challenge: work.challenge || "",
      solution: work.solution || "",
      results: work.results ? work.results.join("\n") : "",
      featured: !!work.featured,
      year: work.year || new Date().getFullYear(),
      client: work.client || "",
    });
    setModalMode("edit");
    setCurrentWorkId(work.id);
    setAutoSlug(false);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;

    const tagsArray = formState.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const resultsArray = formState.results
      .split("\n")
      .map((res) => res.trim())
      .filter((res) => res !== "");

    const workData = {
      title: formState.title,
      slug: formState.slug || generateSlug(formState.title),
      category: formState.category,
      description: formState.description,
      tags: tagsArray,
      keywords: tagsArray, // mapping tags to keywords array
      image: formState.image,
      assets: {
        image: formState.image, // mapping image to assets map
      },
      challenge: formState.challenge,
      solution: formState.solution,
      results: resultsArray,
      featured: formState.featured,
      year: Number(formState.year),
      client: formState.client,
    };

    try {
      if (modalMode === "create") {
        await addDoc(collection(db, "portfolio"), workData);
      } else if (modalMode === "edit" && currentWorkId) {
        const docRef = doc(db, "portfolio", currentWorkId);
        await updateDoc(docRef, workData);
      }
      setIsModalOpen(false);
      fetchWorks(true);
      await revalidatePortfolio();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Hiba történt a mentés során."
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!db) return;
    try {
      const docRef = doc(db, "portfolio", id);
      await deleteDoc(docRef);
      setDeleteConfirmId(null);
      fetchWorks(true);
      await revalidatePortfolio();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Hiba történt a törlés során."
      );
    }
  };

  const handleBatchDelete = async () => {
    if (!db || selectedWorks.size === 0) return;

    if (
      confirm(
        `Biztosan törölni szeretnéd ${selectedWorks.size} projektet? Ez a művelet nem vonható vissza.`
      )
    ) {
      try {
        const { doc, deleteDoc } = await import("firebase/firestore");
        const deletePromises = Array.from(selectedWorks).map((id) =>
          deleteDoc(doc(db!, "portfolio", id))
        );
        await Promise.all(deletePromises);

        setSelectedWorks(new Set());
        setBatchMode(false);
        fetchWorks(true);
        await revalidatePortfolio();
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Hiba történt a törlés során."
        );
      }
    }
  };

  const handleBatchFeatured = async (featured: boolean) => {
    if (!db || selectedWorks.size === 0) return;

    try {
      const { doc, updateDoc } = await import("firebase/firestore");
      const updatePromises = Array.from(selectedWorks).map((id) =>
        updateDoc(doc(db!, "portfolio", id), { featured })
      );
      await Promise.all(updatePromises);

      setSelectedWorks(new Set());
      setBatchMode(false);
      fetchWorks(true);
      await revalidatePortfolio();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Hiba történt a módosítás során."
      );
    }
  };

  const toggleWorkSelection = (workId: string) => {
    setSelectedWorks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(workId)) {
        newSet.delete(workId);
      } else {
        newSet.add(workId);
      }
      return newSet;
    });
  };

  const handleImport = async () => {
    if (
      confirm(
        "Biztosan be szeretnéd tölteni a statikus munkákat a Firestore-ba? Az azonos slug-gal rendelkező munkák ki lesznek hagyva."
      )
    ) {
      setImporting(true);
      setImportMessage("");
      try {
        const result = await importStaticWorksToFirestore();
        if (result.success) {
          setImportMessage(
            `Sikeres importálás! Hozzáadva: ${result.importedCount} db, Kihagyva (már létezett): ${result.skippedCount} db.`
          );
          fetchWorks(true);
          await revalidatePortfolio();
        } else {
          setError(result.error || "Hiba történt az importálás során.");
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Hiba történt az importálás során."
        );
      } finally {
        setImporting(false);
      }
    }
  };

  const handleWpImport = async () => {
    if (
      confirm(
        "Biztosan be szeretnéd tölteni a WordPress portfólió munkákat a Firestore-ba? Az azonos slug-gal rendelkező munkák ki lesznek hagyva."
      )
    ) {
      setImporting(true);
      setImportMessage("");
      try {
        const result = await importWordPressWorksToFirestore();
        if (result.success) {
          setImportMessage(
            `Sikeres WordPress importálás! Hozzáadva: ${result.importedCount} db, Kihagyva (már létezett): ${result.skippedCount} db.`
          );
          fetchWorks(true);
          await revalidatePortfolio();
        } else {
          setError(
            result.error || "Hiba történt a WordPress importálás során."
          );
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Hiba történt a WordPress importálás során."
        );
      } finally {
        setImporting(false);
      }
    }
  };

  const filteredWorks = works.filter((work) => {
    const matchesSearch =
      work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || work.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading && works.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#00B5F1] text-xl">Betöltés...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#00B5F1]">
          Portfólió Kezelő
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setBatchMode(!batchMode)}
            className={`px-4 py-2.5 font-semibold rounded-lg border transition-colors text-sm uppercase tracking-wider ${
              batchMode
                ? "bg-[#00B5F1]/10 text-[#00B5F1] border-[#00B5F1]/30"
                : "bg-[#0f0f1a] text-gray-300 border-gray-800 hover:bg-gray-800"
            }`}
          >
            {batchMode ? "Batch Mód Kikapcsolása" : "Batch Mód"}
          </button>
          <button
            onClick={handleImport}
            disabled={importing}
            className="px-4 py-2.5 bg-[#0f0f1a] hover:bg-gray-800 text-gray-300 font-semibold rounded-lg border border-gray-800 hover:border-gray-700 transition-colors text-sm uppercase tracking-wider disabled:opacity-50"
          >
            {importing ? "Betöltés..." : "Statikus adatok importálása"}
          </button>
          <button
            onClick={handleWpImport}
            disabled={importing}
            className="px-4 py-2.5 bg-[#0f0f1a] hover:bg-gray-800 text-[#00B5F1] font-semibold rounded-lg border border-[#00B5F1]/20 hover:border-[#00B5F1]/40 transition-colors text-sm uppercase tracking-wider disabled:opacity-50"
          >
            {importing ? "Betöltés..." : "WordPress importálása"}
          </button>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-[#00B5F1] hover:bg-[#0095C7] text-bg-base font-bold rounded-lg transition-colors text-sm uppercase tracking-wider"
          >
            + Új Projekt
          </button>
        </div>
      </div>

      {batchMode && selectedWorks.size > 0 && (
        <div className="mb-6 bg-[#00B5F1]/10 border border-[#00B5F1]/30 rounded-lg p-4 flex items-center justify-between sticky top-0 z-30 backdrop-blur-xl">
          <span className="text-[#00B5F1] font-semibold">
            {selectedWorks.size} projekt kiválasztva
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleBatchFeatured(true)}
              className="px-3 py-1.5 bg-[#00B5F1]/20 hover:bg-[#00B5F1]/30 text-[#00B5F1] rounded border border-[#00B5F1]/30 transition-colors text-xs font-semibold"
            >
              Kiemelés
            </button>
            <button
              onClick={() => handleBatchFeatured(false)}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded border border-gray-700 transition-colors text-xs font-semibold"
            >
              Kiemelés visszavonása
            </button>
            <button
              onClick={handleBatchDelete}
              className="px-3 py-1.5 bg-red-950/20 hover:bg-red-900/30 text-red-400 rounded border border-red-900/30 transition-colors text-xs font-semibold"
            >
              Törlés
            </button>
            <button
              onClick={() => setSelectedWorks(new Set())}
              className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded border border-gray-800 transition-colors text-xs font-semibold"
            >
              Kijelölés törlése
            </button>
          </div>
        </div>
      )}

      {importMessage && (
        <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg flex justify-between items-center">
          <span>{importMessage}</span>
          <button
            onClick={() => setImportMessage("")}
            className="text-emerald-400 font-bold hover:text-emerald-300"
          >
            ×
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={() => setError("")}
            className="text-red-400 font-bold hover:text-red-300"
          >
            ×
          </button>
        </div>
      )}

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Keresés cím vagy leírás alapján..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:col-span-2 bg-[#0f0f1a] border border-gray-800 focus:border-[#00B5F1]/50 focus:ring-1 focus:ring-[#00B5F1]/50 text-gray-100 placeholder:text-gray-500 px-4 py-2.5 rounded-lg outline-none transition-all text-sm"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-[#0f0f1a] border border-gray-800 focus:border-[#00B5F1]/50 focus:ring-1 focus:ring-[#00B5F1]/50 text-gray-100 px-4 py-2.5 rounded-lg outline-none transition-all text-sm"
        >
          <option value="all">Minden kategória</option>
          <option value="weboldal">Weboldal</option>
          <option value="webshop">Webshop</option>
          <option value="arculat">Arculat</option>
          <option value="grafika">Grafika</option>
          <option value="branding">Branding</option>
        </select>
      </div>

      {/* Grid view of works */}
      {filteredWorks.length === 0 ? (
        <div className="bg-[#0f0f1a] border border-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400">
            Nem található a keresési feltételeknek megfelelő projekt.
          </p>
        </div>
      ) : (
        <div className="bg-[#0f0f1a] border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a0a0f] border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {batchMode && (
                    <th className="px-6 py-4 w-12">
                      <input
                        type="checkbox"
                        checked={
                          selectedWorks.size === filteredWorks.length &&
                          filteredWorks.length > 0
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedWorks(
                              new Set(filteredWorks.map((w) => w.id))
                            );
                          } else {
                            setSelectedWorks(new Set());
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-700 bg-[#0a0a0f] text-[#00B5F1] focus:ring-[#00B5F1]/50"
                      />
                    </th>
                  )}
                  <th className="px-6 py-4">Projekt</th>
                  <th className="px-6 py-4">Kategória</th>
                  <th className="px-6 py-4">Év</th>
                  <th className="px-6 py-4">Kliens</th>
                  <th className="px-6 py-4">Kiemelt</th>
                  <th className="px-6 py-4 text-right">Műveletek</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {filteredWorks.map((work) => (
                  <tr
                    key={work.id}
                    className="hover:bg-gray-800/30 transition-colors"
                  >
                    {batchMode && (
                      <td className="px-6 py-4 w-12">
                        <input
                          type="checkbox"
                          checked={selectedWorks.has(work.id)}
                          onChange={() => toggleWorkSelection(work.id)}
                          className="w-4 h-4 rounded border-gray-700 bg-[#0a0a0f] text-[#00B5F1] focus:ring-[#00B5F1]/50"
                        />
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded bg-gray-900 border border-gray-800 overflow-hidden flex items-center justify-center shrink-0">
                          {work.image ? (
                            <Image
                              src={work.image}
                              alt={work.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                              unoptimized
                            />
                          ) : (
                            <span className="text-[#00B5F1]/50 font-bold">
                              {work.title.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-100">
                            {work.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {work.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#00B5F1]/10 text-[#00B5F1] border border-[#00B5F1]/20 uppercase tracking-wider">
                        {work.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {work.year || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {work.client || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {work.featured ? (
                        <span className="text-emerald-500 flex items-center gap-1 font-semibold text-xs">
                          ● KIEMELT
                        </span>
                      ) : (
                        <span className="text-gray-600 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(work)}
                          className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded border border-gray-800 hover:border-gray-700 transition-colors text-xs font-semibold"
                        >
                          Szerkesztés
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(work.id)}
                          className="px-3 py-1.5 bg-red-950/20 hover:bg-red-900/30 text-red-400 rounded border border-red-900/30 hover:border-red-900/50 transition-colors text-xs font-semibold"
                        >
                          Törlés
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f1a] border border-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#00B5F1]">
                {modalMode === "create"
                  ? "Új Projekt Hozzáadása"
                  : "Projekt Szerkesztése"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-200 text-2xl font-semibold outline-none"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Projekt Címe *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.title}
                    onChange={handleTitleChange}
                    placeholder="Pl. WebDude Új Platform"
                    className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00B5F1]/50 text-gray-100 px-4 py-2.5 rounded-lg outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Slug (URL azonosító) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.slug}
                    onChange={handleSlugChange}
                    placeholder="pl-webdude-uj-platform"
                    className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00B5F1]/50 text-gray-100 px-4 py-2.5 rounded-lg outline-none text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Kategória *
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        category: e.target.value as WorkFormState["category"],
                      }))
                    }
                    className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00B5F1]/50 text-gray-100 px-4 py-2.5 rounded-lg outline-none text-sm"
                  >
                    <option value="weboldal">Weboldal</option>
                    <option value="webshop">Webshop</option>
                    <option value="arculat">Arculat</option>
                    <option value="grafika">Grafika</option>
                    <option value="branding">Branding</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <ImageUploader
                    key={currentWorkId || "new"}
                    initialImageUrl={formState.image}
                    onUploadSuccess={(url) =>
                      setFormState((prev) => ({ ...prev, image: url }))
                    }
                    label="Projekt képe (Storage feltöltés)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Kliens / Ügyfél
                  </label>
                  <input
                    type="text"
                    value={formState.client}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        client: e.target.value,
                      }))
                    }
                    placeholder="Pl. Bt Shop"
                    className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00B5F1]/50 text-gray-100 px-4 py-2.5 rounded-lg outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Év
                    </label>
                    <input
                      type="number"
                      value={formState.year}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          year: Number(e.target.value),
                        }))
                      }
                      className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00B5F1]/50 text-gray-100 px-4 py-2.5 rounded-lg outline-none text-sm"
                    />
                  </div>
                  <div className="flex items-center pt-8">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formState.featured}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            featured: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 rounded border-gray-800 bg-[#0a0a0f] text-[#00B5F1] focus:ring-[#00B5F1]/50"
                      />
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                        Kiemelt projekt
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Rövid Leírás *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="A projekt rövid összefoglalása..."
                  className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00B5F1]/50 text-gray-100 px-4 py-2.5 rounded-lg outline-none text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Címkék / Tag-ek (vesszővel elválasztva)
                </label>
                <input
                  type="text"
                  value={formState.tags}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, tags: e.target.value }))
                  }
                  placeholder="WooCommerce, Webshop, XML import"
                  className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00B5F1]/50 text-gray-100 px-4 py-2.5 rounded-lg outline-none text-sm"
                />
              </div>

              <div className="border-t border-gray-850 pt-4">
                <h3 className="text-sm font-semibold text-gray-300 mb-4">
                  Projekt Esettanulmány Részletek (Opcionális)
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Kihívás (Challenge)
                    </label>
                    <textarea
                      rows={2}
                      value={formState.challenge}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          challenge: e.target.value,
                        }))
                      }
                      placeholder="Milyen kihívással szembesült az ügyfél?"
                      className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00B5F1]/50 text-gray-100 px-4 py-2.5 rounded-lg outline-none text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Megoldás (Solution)
                    </label>
                    <textarea
                      rows={2}
                      value={formState.solution}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          solution: e.target.value,
                        }))
                      }
                      placeholder="Hogyan oldottad meg a problémát?"
                      className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00B5F1]/50 text-gray-100 px-4 py-2.5 rounded-lg outline-none text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Eredmények (Results - Soronként egy eredmény)
                    </label>
                    <textarea
                      rows={3}
                      value={formState.results}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          results: e.target.value,
                        }))
                      }
                      placeholder="Pl.&#10;+45% konverzió növekedés&#10;30%-kal gyorsabb betöltés&#10;Automatikus készletkezelés"
                      className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00B5F1]/50 text-gray-100 px-4 py-2.5 rounded-lg outline-none text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 rounded-lg transition-colors text-sm font-semibold"
                >
                  Mégse
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00B5F1] hover:bg-[#0095C7] text-bg-base font-bold rounded-lg transition-colors text-sm uppercase tracking-wider"
                >
                  Mentés
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f1a] border border-gray-800 rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-100 mb-2">
              Projekt Törlése
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Biztosan törölni szeretnéd ezt a projektet? Ez a művelet nem
              vonható vissza.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 rounded-lg transition-colors text-sm font-semibold"
              >
                Mégse
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-650 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-sm uppercase tracking-wider"
              >
                Igen, törlöm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
