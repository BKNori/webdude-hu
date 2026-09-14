"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Download, FileText, ExternalLink } from "lucide-react";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string;
  fileType: "pdf" | "image" | "docx";
}

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  title,
  fileUrl,
  fileType,
}: DocumentPreviewModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-5xl h-[85vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-amber-500" />
                <h3 className="font-semibold text-white tracking-tight truncate max-w-md">
                  {title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Megnyitás új lapon"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a
                  href={fileUrl}
                  download
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Letöltés"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Viewer Body */}
            <div className="flex-1 bg-slate-950 p-4 overflow-hidden flex items-center justify-center">
              {fileType === "pdf" ? (
                <iframe
                  src={`${fileUrl}#toolbar=0`}
                  className="w-full h-full rounded-xl border border-slate-850"
                  title={title}
                />
              ) : fileType === "image" ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={fileUrl}
                    alt={title}
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                </div>
              ) : (
                <div className="text-center p-8">
                  <p className="text-slate-400 mb-4">
                    Ehhez a fájltípushoz nincs beágyazott előnézet.
                  </p>
                  <a
                    href={fileUrl}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
                  >
                    <Download className="w-4 h-4" /> Letöltés indítása
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
