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
import { useCallback, useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string;
  fileType: "pdf" | "image" | "docx" | "other";
}

/** Egységes Electric Cyan fókuszgyűrű (WCAG 2.4.7 – látható fókusz). */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]";

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  title,
  fileUrl,
  fileType,
}: DocumentPreviewModalProps) {
  const [isCopying, setIsCopying] = useState(false);
  const reducedMotion = useReducedMotion();

  const requestClose = useCallback(() => onClose(), [onClose]);

  // Fókuszcsapda + ESC zárás + fókusz-visszaállítás (WCAG 2.1.2, 2.4.3).
  const dialogRef = useFocusTrap<HTMLDivElement>(isOpen, requestClose);

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
          onClick={requestClose}
        >
          {/* Background overlay with premium glassmorphism */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl"
            transition={{ duration: 0.3 }}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="document-preview-title"
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
                <FileText
                  aria-hidden="true"
                  className="w-5 h-5 text-[#00B5F1]"
                />
                <h3
                  id="document-preview-title"
                  className="font-semibold text-white tracking-tight truncate max-w-md"
                >
                  {title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} — megnyitás új lapon`}
                  className={`p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors ${FOCUS_RING}`}
                >
                  <ExternalLink aria-hidden="true" className="w-5 h-5" />
                </a>
                <a
                  href={fileUrl}
                  download
                  aria-label={`${title} — letöltés`}
                  className={`p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors ${FOCUS_RING}`}
                >
                  <Download aria-hidden="true" className="w-5 h-5" />
                </a>
                {/* Copy link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label={`${title} — link másolása a vágólapra`}
                  className={`p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#00B5F1]/20 transition-colors ${FOCUS_RING}`}
                  disabled={isCopying}
                >
                  {isCopying ? (
                    <RefreshCw
                      aria-hidden="true"
                      className="w-3.5 h-3.5 animate-spin"
                    />
                  ) : (
                    <Copy aria-hidden="true" className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={requestClose}
                  aria-label="Előnézet bezárása"
                  className={`p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors ${FOCUS_RING}`}
                >
                  <X aria-hidden="true" className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Viewer Body */}
            <div className="flex-1 bg-slate-950 p-4 overflow-hidden flex items-center justify-center">
              {fileType === "pdf" ? (
                <iframe
                  src={`${fileUrl}#toolbar=0`}
                  className="w-full h-full rounded-xl border border-slate-800"
                  title={`${title} — PDF előnézet`}
                />
              ) : fileType === "image" ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={fileUrl}
                    alt={`${title} — dokumentum előnézet`}
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
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00B5F1] text-white font-bold hover:bg-[#0ea5e9] transition-colors ${FOCUS_RING}`}
                  >
                    <Download aria-hidden="true" className="w-4 h-4" />
                    Letöltés indítása
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
