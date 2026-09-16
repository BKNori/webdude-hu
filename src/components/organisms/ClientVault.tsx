"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Upload,
  Download,
  Trash2,
  FileText,
  File,
  Image as ImageIcon,
  Archive,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FolderOpen,
  Eye,
} from "lucide-react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, auth } from "@/lib/firebase";
import {
  registerUploadedFileAction,
  getClientFilesAction,
  deleteClientFileAction,
} from "@/actions/vault";
import DocumentPreviewModal from "@/components/molecules/DocumentPreviewModal";

interface VaultFile {
  id: string;
  clientId: string;
  name: string;
  url: string;
  size: number;
  uploadedBy: string;
  uploadedByName: string;
  storagePath: string;
  createdAt: string;
}

export default function ClientVault() {
  const [files, setFiles] = useState<VaultFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadName, setUploadName] = useState("");

  // Preview modal state
  const [previewFile, setPreviewFile] = useState<VaultFile | null>(null);

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Segédfüggvény: fájlnév alapján meghatározza a fájltípust a DocumentPreviewModalhoz
  function getFileType(fileName: string): "pdf" | "image" | "docx" | "other" {
    const ext = fileName.toLowerCase().split(".").pop()?.toLowerCase() || "";
    if (ext === "pdf") return "pdf";
    if (ext === "docx" || ext === "doc") return "docx";
    if (["png", "jpg", "jpeg", "webp", "gif", "svg", "bmp"].includes(ext)) return "image";
    return "other";
  }

  const loadFiles = async (showLoadingSpinner = false) => {
    if (!auth?.currentUser) return;
    if (showLoadingSpinner) {
      setLoading(true);
    }
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const res = await getClientFilesAction(idToken, auth.currentUser.uid);
      if (res.success && res.files) {
        setFiles(res.files as VaultFile[]);
      } else {
        setError(res.error || "Nem sikerült letölteni a fájlokat.");
      }
    } catch {
      setError("Hiba a fájlok betöltése során.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchFiles = async () => {
      if (!auth?.currentUser) {
        if (isMounted) setLoading(false);
        return;
      }
      try {
        const idToken = await auth.currentUser.getIdToken(true);
        const res = await getClientFilesAction(idToken, auth.currentUser.uid);
        if (isMounted) {
          if (res.success && res.files) {
            setFiles(res.files as VaultFile[]);
          } else {
            setError(res.error || "Nem sikerült letölteni a fájlokat.");
          }
        }
      } catch {
        if (isMounted) setError("Hiba a fájlok betöltése során.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void fetchFiles();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      void handleUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      void handleUploadFile(e.target.files[0]);
    }
  };

  const handleUploadFile = async (file: File) => {
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be a feltöltéshez!");
      return;
    }

    if (!storage) {
      setError(
        "A tárhely szolgáltatás jelenleg nem elérhető. Kérlek győződj meg róla, hogy a tárhely aktiválva van a konzolon."
      );
      return;
    }

    // Limit file size to 30MB
    if (file.size > 30 * 1024 * 1024) {
      setError("A maximális fájlméret 30 MB!");
      return;
    }

    setUploading(true);
    setProgress(0);
    setUploadName(file.name);
    setError("");
    setSuccess("");

    try {
      const clientId = auth.currentUser.uid;
      const storagePath = `clients/${clientId}/${Date.now()}_${file.name}`;
      const fileRef = ref(storage, storagePath);

      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(pct);
        },
        () => {
          setError("Hiba történt a feltöltés során.");
          setUploading(false);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const idToken = await auth?.currentUser?.getIdToken(true);
            if (!idToken) {
              setError("A hitelesítés lejárt vagy sikertelen.");
              setUploading(false);
              return;
            }

            // Register in Firestore
            const res = await registerUploadedFileAction(idToken, {
              clientId,
              name: file.name,
              url: downloadUrl,
              size: file.size,
              uploadedBy: "client",
              storagePath,
            });

            if (res.success) {
              setSuccess("Fájl sikeresen feltöltve és mentve a széfbe!");
              void loadFiles(true);
            } else {
              setError(
                res.error || "Nem sikerült regisztrálni a feltöltött fájlt."
              );
            }
          } catch {
            setError("Hiba a fájl metaadatainak mentésekor.");
          } finally {
            setUploading(false);
            setUploadName("");
          }
        }
      );
    } catch {
      setError("Feltöltés megszakadt.");
      setUploading(false);
    }
  };

  const handleDelete = async (file: VaultFile) => {
    if (!auth?.currentUser) return;
    if (window.confirm(`Biztosan törölni szeretnéd a "${file.name}" fájlt?`)) {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const idToken = await auth.currentUser.getIdToken(true);

        // 1. Delete Firestore record
        const res = await deleteClientFileAction(idToken, file.id);
        if (res.success) {
          // 2. Delete from Storage if it's the client's file
          if (storage && file.uploadedBy === "client") {
            try {
              const fileRef = ref(storage, file.storagePath);
              await deleteObject(fileRef);
            } catch {
              // Ignored if file was already missing on Storage
            }
          }
          setSuccess("Fájl sikeresen törölve.");
          void loadFiles(true);
        } else {
          setError(res.error || "Nem sikerült törölni a fájl rekordját.");
        }
      } catch {
        setError("Hiba a törlés során.");
      } finally {
        setLoading(false);
      }
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(ext || "")) {
      return ImageIcon;
    }
    if (["zip", "rar", "tar", "gz", "7z"].includes(ext || "")) {
      return Archive;
    }
    if (
      ["pdf", "doc", "docx", "txt", "md", "xls", "xlsx"].includes(ext || "")
    ) {
      return FileText;
    }
    return File;
  };

  const canPreview = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "svg", "webp", "pdf"].includes(
      ext || ""
    );
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const triggerSelectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-bg-surface/40 backdrop-blur-xl border border-bg-elevated/80 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden space-y-6">
      {/* Background glow decorator */}
      <div className="absolute -left-24 -bottom-24 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-bg-elevated/40 pb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
          <FolderOpen className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-black tracking-widest text-amber-500 block">
            Digitális Széf
          </span>
          <h3 className="text-lg font-bold text-white font-mono -mt-0.5">
            Ügyfélszéf & Fájlmegosztó
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed font-mono border-l-2 border-amber-500/30 pl-3">
        Töltsd fel a logókat, szöveges anyagokat, vagy töltsd le az elkészült
        terveket és mockupokat közvetlenül innen. A fájlok biztonságosan
        titkosítottak.
      </p>

      {/* Global Alerts inside panel */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerSelectFile}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
          dragActive
            ? "border-amber-500 bg-amber-500/5"
            : "border-bg-elevated hover:border-amber-500/40 hover:bg-transparent"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-bg-elevated/40 flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">
              Húzd ide a fájlokat, vagy kattints a tallózáshoz
            </p>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              Maximális fájlméret: 30 MB (PDF, ZIP, PNG, JPG stb.)
            </p>
          </div>
        </div>
      </div>

      {/* Uploading progress bar */}
      {uploading && (
        <div
          className="bg-transparent border border-amber-500/20 p-4 rounded-2xl space-y-2.5 font-mono"
        >
          <div className="flex justify-between items-center text-[10px] text-slate-400">
            <span className="truncate max-w-62.5 font-bold text-amber-500">
              {uploadName}
            </span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* File List Grid */}
      <div className="space-y-3">
        <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
          Megosztott Fájlok ({files.length})
        </h4>

        {loading && files.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
          </div>
        ) : files.length === 0 ? (
          <div className="bg-transparent border border-bg-elevated/40 rounded-2xl p-8 text-center text-slate-500 font-mono text-xs">
            <File className="w-8 h-8 mx-auto opacity-20 mb-2" />
            Nincsenek még feltöltött fájlok ebben a széfben.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.name);
              const isAdminUpload = file.uploadedBy === "admin";

              return (
                <div
                  key={file.id}
                  className="bg-transparent border border-bg-elevated/50 hover:border-amber-500/30 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-bg-elevated/40 flex items-center justify-center text-amber-500/80 shrink-0">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 font-mono">
                      <h5
                        className="text-xs font-bold text-white truncate max-w-50"
                        title={file.name}
                      >
                        {file.name}
                      </h5>
                      <div className="flex flex-wrap items-center gap-x-2 text-[9px] text-slate-500 mt-0.5">
                        <span>{formatBytes(file.size)}</span>
                        <span>•</span>
                        <span>{formatDate(file.createdAt)}</span>
                        <span>•</span>
                        <span
                          className={
                            isAdminUpload
                              ? "text-amber-500/80 font-bold"
                              : "text-slate-400"
                          }
                        >
                          {file.uploadedByName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    {canPreview(file.name) && (
                      <button
                        type="button"
                        onClick={() => setPreviewFile(file)}
                        className="p-2 bg-bg-elevated/50 hover:bg-amber-500/10 text-slate-400 hover:text-amber-500 rounded-lg transition-colors cursor-pointer"
                        title="Előnézet"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-bg-elevated/50 hover:bg-amber-500/10 text-slate-400 hover:text-amber-500 rounded-lg transition-colors cursor-pointer"
                      title="Letöltés"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>

                    {/* Clients cannot delete admin-uploaded files */}
                    {!isAdminUpload && (
                      <button
                        type="button"
                        onClick={() => handleDelete(file)}
                        className="p-2 bg-bg-elevated/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                        title="Törlés"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Preview Modal — delegálva a DocumentPreviewModal molekulára */}
      {previewFile && (
        <DocumentPreviewModal
          isOpen={true}
          onClose={() => setPreviewFile(null)}
          title={previewFile.name}
          fileUrl={previewFile.url}
          fileType={getFileType(previewFile.name)}
        />
      )}
    </div>
  );
}
