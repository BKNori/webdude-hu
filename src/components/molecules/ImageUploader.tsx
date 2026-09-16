"use client";

import React, { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import Image from "next/image";

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  initialImageUrl?: string;
  label?: string;
}

export default function ImageUploader({
  onUploadSuccess,
  initialImageUrl = "",
  label = "Projekt képe",
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(initialImageUrl);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File) => {
    if (!storage) {
      setError("Firebase Storage nincs inicializálva.");
      return;
    }

    // Limit to images only
    if (!file.type.startsWith("image/")) {
      setError(
        "Csak képfájlok feltöltése engedélyezett (PNG, JPG, WEBP stb.)!"
      );
      return;
    }

    // Max 5MB file size
    if (file.size > 5 * 1024 * 1024) {
      setError("A maximális fájlméret 5 MB!");
      return;
    }

    setError("");
    setUploading(true);
    setProgress(0);

    // Create unique filename
    const fileExtension = file.name.split(".").pop();
    const uniqueFilename = `portfolio_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
    const storageRef = ref(storage, `portfolio-uploads/${uniqueFilename}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pct = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(pct);
      },
      (err) => {
        console.error("Feltöltési hiba:", err);
        setError(`Hiba a feltöltés során: ${err.message}`);
        setUploading(false);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setPreviewUrl(downloadUrl);
          onUploadSuccess(downloadUrl);
        } catch (err: unknown) {
          setError(
            err instanceof Error
              ? err.message
              : "Nem sikerült lekérni a letöltési linket."
          );
        } finally {
          setUploading(false);
        }
      }
    );
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

  const removeImage = () => {
    setPreviewUrl("");
    onUploadSuccess("");
    setError("");
    setProgress(0);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
      </label>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded text-xs">
          {error}
        </div>
      )}

      {previewUrl ? (
        <div className="relative group rounded-lg overflow-hidden border border-gray-800 bg-[#0a0a0f] aspect-video max-w-md flex items-center justify-center">
          <Image
            src={previewUrl}
            alt="Feltöltött kép előnézet"
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-75"
            unoptimized
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
            <button
              type="button"
              onClick={removeImage}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Törlés / Csere
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all aspect-video max-w-md ${
            dragActive
              ? "border-sky-500 bg-sky-500/5"
              : "border-gray-800 hover:border-sky-500/50 bg-[#0a0a0f] hover:bg-[#0f0f1a]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center space-y-3 w-full px-4">
              <div className="relative w-full h-2 bg-gray-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 transition-all duration-150 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-sky-500 font-bold uppercase tracking-wider">
                Feltöltés: {progress}%
              </span>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <svg
                className="w-10 h-10 text-gray-500 mx-auto transition-colors group-hover:text-sky-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div className="text-sm font-semibold text-gray-300">
                Húzd ide a képet, vagy kattints a feltöltéshez
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                Maximum méret: 5MB · PNG, JPG, WEBP, SVG
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
