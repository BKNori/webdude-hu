"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  X,
  Download,
  FileText,
  ExternalLink,
  Copy,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string;
  fileType: "pdf" | "image" | "docx" | "other";
}

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  title,
  fileUrl,
  fileType,
}: DocumentPreviewModalProps) {
  const [isCopying, setIsCopying] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleCopyLink = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(fileUrl);
    } finally {
      setIsCopying(false);
    }
  };

  // Animation variants based on reduced motion preference
  const wrapperVariants = reducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
      };

  const cardVariants = reducedMotion
    ? { initial: { scale: 1 }, animate: { scale: 1 }, exit: { scale: 0.95 } }
    : {
        initial: { scale: 0.95, opacity: 0, y: 15 },
        animate: { scale: 1, opacity: 1, y: 0 },
        exit: { scale: 0.95, opacity: 0, y: 15 },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={wrapperVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
        >
          {/* Background overlay with premium glassmorphism */}
          <motion.div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl"
            transition={{ duration: 0.3 }}
          />

          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full max-w-5xl h-[85vh] mx-auto flex flex-col rounded-3xl bg-slate-900 border border-slate-800/50 shadow-2xl overflow-hidden z-10"
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/40 bg-slate-900/90">
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
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
                  title="Megnyitás új lapon"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a
                  href={fileUrl}
                  download
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
                  title="Letöltés"
                >
                  <Download className="w-5 h-5" />
                </a>
                {/* Copy link */}
                <button
                  onClick={handleCopyLink}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-amber-500/20 transition-colors"
                  title="Link másolása"
                  disabled={isCopying}
                >
                  {isCopying ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
