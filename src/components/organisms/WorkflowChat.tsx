"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Send,
  Loader2,
  Clock,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import {
  addWorkflowCommentAction,
  getWorkflowCommentsAction,
} from "@/actions/portal";
import { generateAICopilotResponseAction } from "@/actions/ai-copilot";
import { ChatMessage } from "@/types/chat";

interface WorkflowChatProps {
  workflowId: string;
  idToken: string;
  currentUserUid: string;
}

const chatSchema = z.object({
  text: z
    .string()
    .min(2, "A kommentnek legalább 2 karakterből kell állnia!")
    .max(1000, "A komment hossza maximum 1000 karakter lehet!"),
});

type ChatFormValues = z.infer<typeof chatSchema>;

export default function WorkflowChat({
  workflowId,
  idToken,
  currentUserUid,
}: WorkflowChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
  });

  const fetchMessages = useCallback(
    async (showLoading = false) => {
      if (showLoading) setLoading(true);
      setError(null);
      try {
        const res = await getWorkflowCommentsAction(idToken, workflowId);
        if (res.success && res.comments) {
          setMessages(res.comments);
        } else {
          setError(res.error || "Nem sikerült betölteni az üzeneteket.");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Hiba lépett fel a betöltéskor."
        );
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [idToken, workflowId]
  );

  // Polling with Anti-Drain Visiblity Protection
  useEffect(() => {
    if (!isOpen) return;

    // Call asynchronously to satisfy react-hooks/set-state-in-effect
    const timer = setTimeout(() => {
      void fetchMessages(messages.length === 0);
    }, 0);

    const interval = setInterval(() => {
      // Anti-Drain check: skip fetch if the tab is inactive/backgrounded
      if (document.hidden || document.visibilityState === "hidden") {
        return;
      }
      void fetchMessages(false);
    }, 30000); // 30 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isOpen, fetchMessages, messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const onSubmit = async (data: ChatFormValues) => {
    setSending(true);
    setError(null);
    try {
      const res = await addWorkflowCommentAction(
        idToken,
        workflowId,
        data.text
      );
      if (res.success) {
        reset();
        await fetchMessages(false);

        // Generate AI Copilot response
        const aiRes = await generateAICopilotResponseAction(
          workflowId,
          data.text
        );
        if (aiRes.success && aiRes.response) {
          const aiCommentRes = await addWorkflowCommentAction(
            idToken,
            workflowId,
            aiRes.response
          );
          if (aiCommentRes.success) {
            await fetchMessages(false);
          }
        }
      } else {
        setError(res.error || "Nem sikerült elküldeni az üzenetet.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hálózati hiba történt.");
    } finally {
      setSending(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("hu-HU", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="border-t border-bg-elevated/40 pt-4 mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-2 px-3 rounded-xl border border-bg-elevated/80 bg-transparent hover:bg-bg-elevated/25 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all flex items-center justify-between cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <MessageSquare
            className="w-3.5 h-3.5 text-amber-500"
            strokeWidth={1.5}
          />
          Megbeszélés / Chat (
          {isOpen ? messages.length : "Kattints a megtekintéshez"})
        </span>
        <Clock className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-4 space-y-4"
          >
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-xs text-red-500">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Chat Box container */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1 bg-transparent rounded-2xl p-4 border border-bg-elevated/40 flex flex-col">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                </div>
              ) : messages.length === 0 ? (
                <p className="text-[10px] text-slate-500 italic text-center py-6 font-mono">
                  Nincsenek még üzenetek. Küldd el az első üzenetet Norbinak!
                </p>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => {
                    const isSelf = msg.authorId === currentUserUid;
                    const isSystem =
                      msg.authorName.includes("WebDude") ||
                      msg.authorName.includes("Norbi");

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col max-w-[85%] ${
                          isSelf ? "ml-auto items-end" : "items-start"
                        }`}
                      >
                        <span className="text-[9px] text-slate-500 font-mono mb-0.5 flex items-center gap-1">
                          {isSystem && (
                            <UserCheck className="w-2.5 h-2.5 text-amber-500" />
                          )}
                          {msg.authorName} • {formatDate(msg.createdAt)}
                        </span>
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed wrap-break-word ${
                            isSelf
                              ? "bg-amber-500 text-bg-base font-medium rounded-tr-none"
                              : isSystem
                                ? "bg-bg-surface border-2 border-amber-500/50 text-slate-200 rounded-tl-none shadow-lg shadow-amber-500/10"
                                : "bg-bg-surface border border-bg-elevated/80 text-slate-200 rounded-tl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Írj egy üzenetet..."
                  disabled={sending}
                  {...register("text")}
                  className="flex-1 bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-bg-base hover:scale-[1.02] transition-all cursor-pointer shrink-0 shadow-lg shadow-amber-500/10 disabled:opacity-50"
                  aria-label="Üzenet küldése"
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin text-bg-base" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.text && (
                <p className="text-red-500 text-[10px] font-semibold pl-1">
                  {errors.text.message}
                </p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
