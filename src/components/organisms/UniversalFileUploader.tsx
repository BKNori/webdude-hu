"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Upload, FileText, X, Loader2, AlertCircle } from "lucide-react";
import { uploadUniversalFileAction } from "@/actions/upload";
import {
  UniversalFileUploaderProps,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "@/types/uploader";

export default function UniversalFileUploader({
  onUploadSuccess,
  onUploadError,
  maxSizeInBytes = MAX_FILE_SIZE,
}: UniversalFileUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    // File type validation
    if (
      !ALLOWED_FILE_TYPES.includes(
        file.type as (typeof ALLOWED_FILE_TYPES)[number]
      )
    ) {
      setError(
        "Nem támogatott fájlformátum! (PDF, DOCX, CSV vagy kép megengedett)"
      );
      return;
    }

    // File size validation
    if (file.size > maxSizeInBytes) {
      setError(
        `A maximális megengedett fájlméret ${maxSizeInBytes / 1024 / 1024}MB!`
      );
      return;
    }

    setError("");
    setUploading(true);
    setProgress(0);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = (e.target?.result as string).split(",")[1];

        // Simulate progress
        setProgress(50);

        // Upload to server
        const res = await uploadUniversalFileAction({
          fileName: file.name,
          fileType: file.type as (typeof ALLOWED_FILE_TYPES)[number],
          fileSize: file.size,
          base64Data,
        });

        setProgress(100);

        if (res.success && res.fileUrl) {
          setPreviewUrl(res.fileUrl);
          setUploadedFileName(res.fileName);
          onUploadSuccess(res.fileUrl, res.fileName);
        } else {
          setError(res.error || "Nem sikerült feltölteni a fájlt.");
          onUploadError(res.error || "Nem sikerült feltölteni a fájlt.");
        }

        setUploading(false);
      };
      reader.onerror = () => {
        setError("Hiba történt a fájl beolvasásakor.");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setError("Hiba történt a feltöltés során.");
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

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
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setPreviewUrl("");
    setUploadedFileName("");
    setError("");
    setProgress(0);
  };

  const getFileIcon = () => {
    return <FileText className="w-5 h-5" />;
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
        <FileText className="w-3.5 h-3.5" />
        Fájl Feltöltése
      </label>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 font-mono"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {previewUrl ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group bg-bg-card border border-bg-elevated/50 rounded-xl p-4 hover:border-sky-500/50 transition-all duration-300 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500">
                {getFileIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {uploadedFileName}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  Sikeresen feltöltve
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-2 hover:bg-bg-elevated/50 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
            dragActive
              ? "border-sky-500 bg-sky-500/5"
              : "border-bg-elevated/50 hover:border-sky-500/50 bg-bg-card hover:bg-bg-elevated/30"
          }`}
        >
          {/* Background glow decorator */}
          <div className="absolute inset-0 bg-linear-to-b from-sky-500/5 via-transparent to-sky-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={ALLOWED_FILE_TYPES.join(",")}
            onChange={handleFileChange}
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center space-y-4 w-full px-4 z-10">
              <div className="relative w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-sky-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-sky-500 animate-spin" />
                <span className="text-xs text-sky-500 font-bold uppercase tracking-wider">
                  Feltöltés: {progress}%
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-3 z-10">
              <motion.div
                className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 mx-auto"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Upload className="w-6 h-6" />
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Húzd ide a fájlt, vagy kattints a feltöltéshez
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-1">
                  PDF, DOCX, CSV, PNG, JPG, WEBP
                </p>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                Maximum méret: {maxSizeInBytes / 1024 / 1024}MB
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
