"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import {
  getClientWorkflowsAction,
  createWorkflowAction,
  updateWorkflowAction,
  deleteWorkflowAction,
  listUsersAction,
  createClientUserAction,
  getWorkflowCommentsAction,
  addWorkflowCommentAction,
} from "@/actions/portal";
import {
  getClientFilesAction,
  registerUploadedFileAction,
  deleteClientFileAction,
} from "@/actions/vault";
import { storage } from "@/lib/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  Users,
  Layers,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Copy,
  ShieldAlert,
  MessageSquare,
  Send,
  FolderOpen,
  Upload,
  Download,
  FileText,
  Image as ImageIcon,
  Archive,
} from "lucide-react";

interface UserProfile {
  id: string;
  uid: string;
  email: string;
  name: string;
  role: string;
}

interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  text: string;
  createdAt: string;
}

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

interface Workflow {
  id: string;
  title: string;
  description: string;
  clientId: string;
  status:
    "planning" | "development" | "testing" | "ai_integration" | "completed";
  content: string;
  createdAt: string;
  approvedByClient?: boolean;
  clientApprovedAt?: string;

  // Pricing & payment fields
  planningPrice?: number;
  planningPaid?: boolean;
  developmentPrice?: number;
  developmentPaid?: boolean;
  testingPrice?: number;
  testingPaid?: boolean;
  ai_integrationPrice?: number;
  ai_integrationPaid?: boolean;
  completedPrice?: number;
  completedPaid?: boolean;
}

export default function PortalKezeloPage() {
  const [activeTab, setActiveTab] = useState<"workflows" | "users">(
    "workflows"
  );
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Comment & Chat states for Admin
  const [expandedComments, setExpandedComments] = useState<
    Record<string, boolean>
  >({});
  const [commentsData, setCommentsData] = useState<Record<string, Comment[]>>(
    {}
  );
  const [commentsLoading, setCommentsLoading] = useState<
    Record<string, boolean>
  >({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {}
  );

  // Lists
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  // User form
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [createdCredentials, setCreatedCredentials] = useState<{
    email: string;
    pass: string;
    uid: string;
  } | null>(null);

  // Workflow form
  const [wfTitle, setWfTitle] = useState("");
  const [wfDescription, setWfDescription] = useState("");
  const [wfClientId, setWfClientId] = useState("");
  const [wfStatus, setWfStatus] = useState<
    "planning" | "development" | "testing" | "ai_integration" | "completed"
  >("planning");
  const [wfContent, setWfContent] = useState("");

  // Phase prices for creation
  const [planningPrice, setPlanningPrice] = useState(0);
  const [developmentPrice, setDevelopmentPrice] = useState(0);
  const [testingPrice, setTestingPrice] = useState(0);
  const [aiIntegrationPrice, setAiIntegrationPrice] = useState(0);
  const [completedPrice, setCompletedPrice] = useState(0);

  // Editing workflow ID & fields
  const [editingWfId, setEditingWfId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<
    "planning" | "development" | "testing" | "ai_integration" | "completed"
  >("planning");
  const [editContent, setEditContent] = useState("");

  // Phase prices & paid states for editing
  const [editPlanningPrice, setEditPlanningPrice] = useState(0);
  const [editPlanningPaid, setEditPlanningPaid] = useState(false);
  const [editDevelopmentPrice, setEditDevelopmentPrice] = useState(0);
  const [editDevelopmentPaid, setEditDevelopmentPaid] = useState(false);
  const [editTestingPrice, setEditTestingPrice] = useState(0);
  const [editTestingPaid, setEditTestingPaid] = useState(false);
  const [editAiIntegrationPrice, setEditAiIntegrationPrice] = useState(0);
  const [editAiIntegrationPaid, setEditAiIntegrationPaid] = useState(false);
  const [editCompletedPrice, setEditCompletedPrice] = useState(0);
  const [editCompletedPaid, setEditCompletedPaid] = useState(false);

  // Vault states for Admin
  const [activeVaultClientId, setActiveVaultClientId] = useState<string | null>(
    null
  );
  const [vaultFiles, setVaultFiles] = useState<VaultFile[]>([]);
  const [vaultLoading, setVaultLoading] = useState(false);
  const [adminUploading, setAdminUploading] = useState(false);
  const [adminUploadProgress, setAdminUploadProgress] = useState(0);
  const [adminUploadName, setAdminUploadName] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!auth?.currentUser) {
      setError("Nem vagy bejelentkezve.");
      setLoading(false);
      return;
    }

    try {
      const idToken = await auth.currentUser.getIdToken(true);

      const [usersRes, workflowsRes] = await Promise.all([
        listUsersAction(idToken),
        getClientWorkflowsAction(idToken),
      ]);

      if (usersRes.success && usersRes.users) {
        setUsers(usersRes.users as UserProfile[]);
      } else {
        setError(usersRes.error || "Hiba a felhasználók betöltésekor.");
      }

      if (workflowsRes.success && workflowsRes.workflows) {
        setWorkflows(workflowsRes.workflows as Workflow[]);
      } else {
        setError(
          (prev) =>
            prev || workflowsRes.error || "Hiba a workflow-k betöltésekor."
        );
      }
    } catch {
      setError("Hiba történt az adatok lekérésekor.");
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (workflowId: string) => {
    if (!auth?.currentUser) return;
    setCommentsLoading((prev) => ({ ...prev, [workflowId]: true }));
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const res = await getWorkflowCommentsAction(idToken, workflowId);
      if (res.success && res.comments) {
        setCommentsData((prev) => ({ ...prev, [workflowId]: res.comments }));
      }
    } catch {
      // Ignored
    } finally {
      setCommentsLoading((prev) => ({ ...prev, [workflowId]: false }));
    }
  };

  const toggleComments = async (workflowId: string) => {
    const isExpanded = !expandedComments[workflowId];
    setExpandedComments((prev) => ({ ...prev, [workflowId]: isExpanded }));

    if (isExpanded) {
      await loadComments(workflowId);
    }
  };

  const handleSubmitComment = async (
    e: React.FormEvent,
    workflowId: string
  ) => {
    e.preventDefault();
    const text = commentInputs[workflowId] || "";
    if (!text.trim() || !auth?.currentUser) return;

    setCommentInputs((prev) => ({ ...prev, [workflowId]: "" }));

    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const res = await addWorkflowCommentAction(idToken, workflowId, text);
      if (res.success) {
        await loadComments(workflowId);
      } else {
        setError(res.error || "Nem sikerült elküldeni a kommentet.");
      }
    } catch {
      setError("Kapcsolódási hiba a komment elküldésekor.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadData();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setCreatedCredentials(null);

    if (!newClientName || !newClientEmail) {
      setError("Kérlek, töltsd ki az összes mezőt!");
      return;
    }

    setActionLoading("create_client");
    try {
      const idToken = await auth?.currentUser?.getIdToken(true);
      if (!idToken) throw new Error("Nem vagy hitelesítve.");

      const result = await createClientUserAction(
        { email: newClientEmail, name: newClientName },
        idToken
      );

      if (result.success && result.uid && result.password) {
        setSuccess("Ügyfél sikeresen regisztrálva a rendszerbe!");
        setCreatedCredentials({
          email: newClientEmail,
          pass: result.password,
          uid: result.uid,
        });
        setNewClientName("");
        setNewClientEmail("");
        // Reload users list
        const updatedUsers = await listUsersAction(idToken);
        if (updatedUsers.success && updatedUsers.users) {
          setUsers(updatedUsers.users as UserProfile[]);
        }
      } else {
        setError(result.error || "Nem sikerült létrehozni a felhasználót.");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Ismeretlen hiba a regisztráció során."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleCreateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!wfTitle || !wfDescription || !wfClientId || !wfContent) {
      setError(
        "Kérlek, töltsd ki az összes kötelező mezőt, és válassz ki egy ügyfelet!"
      );
      return;
    }

    setActionLoading("create_workflow");
    try {
      const idToken = await auth?.currentUser?.getIdToken(true);
      if (!idToken) throw new Error("Nem vagy hitelesítve.");

      const result = await createWorkflowAction(
        {
          title: wfTitle,
          description: wfDescription,
          clientId: wfClientId,
          status: wfStatus,
          content: wfContent,
          planningPrice,
          developmentPrice,
          testingPrice,
          ai_integrationPrice: aiIntegrationPrice,
          completedPrice,
        },
        idToken
      );

      if (result.success) {
        setSuccess("Workflow sikeresen hozzárendelve a felhasználóhoz!");
        setWfTitle("");
        setWfDescription("");
        setWfContent("");
        setWfStatus("planning");
        setPlanningPrice(0);
        setDevelopmentPrice(0);
        setTestingPrice(0);
        setAiIntegrationPrice(0);
        setCompletedPrice(0);
        // Reload workflows list
        const updatedWfs = await getClientWorkflowsAction(idToken);
        if (updatedWfs.success && updatedWfs.workflows) {
          setWorkflows(updatedWfs.workflows as Workflow[]);
        }
      } else {
        setError(result.error || "Hiba a workflow mentése során.");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Ismeretlen hiba a workflow mentése során."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteWorkflow = async (id: string) => {
    if (
      !window.confirm(
        "Biztosan törölni szeretnéd ezt a workflow-t? Ez a művelet nem vonható vissza."
      )
    ) {
      return;
    }

    setError("");
    setSuccess("");
    setActionLoading(`delete_${id}`);

    try {
      const idToken = await auth?.currentUser?.getIdToken(true);
      if (!idToken) throw new Error("Nem vagy hitelesítve.");

      const result = await deleteWorkflowAction(id, idToken);

      if (result.success) {
        setSuccess("Workflow sikeresen törölve.");
        setWorkflows((prev) => prev.filter((wf) => wf.id !== id));
      } else {
        setError(result.error || "Nem sikerült törölni a workflow-t.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ismeretlen hiba.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleStartEdit = (wf: Workflow) => {
    setEditingWfId(wf.id);
    setEditTitle(wf.title);
    setEditDescription(wf.description);
    setEditStatus(wf.status);
    setEditContent(wf.content);
    setEditPlanningPrice(wf.planningPrice || 0);
    setEditPlanningPaid(wf.planningPaid || false);
    setEditDevelopmentPrice(wf.developmentPrice || 0);
    setEditDevelopmentPaid(wf.developmentPaid || false);
    setEditTestingPrice(wf.testingPrice || 0);
    setEditTestingPaid(wf.testingPaid || false);
    setEditAiIntegrationPrice(wf.ai_integrationPrice || 0);
    setEditAiIntegrationPaid(wf.ai_integrationPaid || false);
    setEditCompletedPrice(wf.completedPrice || 0);
    setEditCompletedPaid(wf.completedPaid || false);
  };

  const handleCancelEdit = () => {
    setEditingWfId(null);
  };

  const handleUpdateWorkflow = async (id: string) => {
    setError("");
    setSuccess("");
    setActionLoading(`edit_${id}`);

    try {
      const idToken = await auth?.currentUser?.getIdToken(true);
      if (!idToken) throw new Error("Nem vagy hitelesítve.");

      const result = await updateWorkflowAction(
        id,
        {
          title: editTitle,
          description: editDescription,
          status: editStatus,
          content: editContent,
          planningPrice: editPlanningPrice,
          planningPaid: editPlanningPaid,
          developmentPrice: editDevelopmentPrice,
          developmentPaid: editDevelopmentPaid,
          testingPrice: editTestingPrice,
          testingPaid: editTestingPaid,
          ai_integrationPrice: editAiIntegrationPrice,
          ai_integrationPaid: editAiIntegrationPaid,
          completedPrice: editCompletedPrice,
          completedPaid: editCompletedPaid,
        },
        idToken
      );

      if (result.success) {
        setSuccess("Workflow módosításai sikeresen elmentve!");
        setEditingWfId(null);
        // Refresh locally
        setWorkflows((prev) =>
          prev.map((wf) =>
            wf.id === id
              ? {
                  ...wf,
                  title: editTitle,
                  description: editDescription,
                  status: editStatus,
                  content: editContent,
                }
              : wf
          )
        );
      } else {
        setError(result.error || "Sikertelen mentés.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Hiba mentés közben.");
    } finally {
      setActionLoading(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Vágólapra másolva: " + text);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const loadVaultFiles = async (clientId: string) => {
    if (!auth?.currentUser) return;
    setVaultLoading(true);
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const res = await getClientFilesAction(idToken, clientId);
      if (res.success && res.files) {
        setVaultFiles(res.files);
      } else {
        setError(res.error || "Nem sikerült letölteni a széf fájljait.");
      }
    } catch (err: unknown) {
      setError(
        "Hiba a széf betöltésekor: " +
          (err instanceof Error ? err.message : "Ismeretlen hiba")
      );
    } finally {
      setVaultLoading(false);
    }
  };

  const handleAdminUploadFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    clientId: string
  ) => {
    if (!auth?.currentUser || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    if (!storage) {
      setError("A tárhely szolgáltatás jelenleg nem elérhető.");
      return;
    }

    if (file.size > 30 * 1024 * 1024) {
      setError("A maximális fájlméret 30 MB!");
      return;
    }

    setAdminUploading(true);
    setAdminUploadProgress(0);
    setAdminUploadName(file.name);
    setError("");
    setSuccess("");

    try {
      const storagePath = `clients/${clientId}/${Date.now()}_${file.name}`;
      const fileRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setAdminUploadProgress(pct);
        },
        (err) => {
          setError("Admin feltöltési hiba: " + err.message);
          setAdminUploading(false);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const idToken = await auth?.currentUser?.getIdToken(true);
            if (!idToken) {
              setError("A hitelesítés lejárt vagy sikertelen.");
              setAdminUploading(false);
              return;
            }

            // Register in Firestore as 'admin' upload
            const res = await registerUploadedFileAction(idToken, {
              clientId,
              name: file.name,
              url: downloadUrl,
              size: file.size,
              uploadedBy: "admin",
              storagePath,
            });

            if (res.success) {
              setSuccess("Fájl sikeresen feltöltve az ügyfél széfjébe!");
              void loadVaultFiles(clientId);
            } else {
              setError(res.error || "Regisztrációs hiba.");
            }
          } catch (err: unknown) {
            setError(
              "Adatbázis mentési hiba: " +
                (err instanceof Error ? err.message : "Ismeretlen hiba")
            );
          } finally {
            setAdminUploading(false);
            setAdminUploadName("");
          }
        }
      );
    } catch (err: unknown) {
      setError(
        "Feltöltés megszakadt: " +
          (err instanceof Error ? err.message : "Ismeretlen hiba")
      );
      setAdminUploading(false);
    }
  };

  const handleAdminDeleteFile = async (file: VaultFile) => {
    if (!auth?.currentUser) return;
    if (
      window.confirm(
        `Biztosan törölni szeretnéd a "${file.name}" fájlt az ügyfél széfjéből?`
      )
    ) {
      setVaultLoading(true);
      setError("");
      setSuccess("");

      try {
        const idToken = await auth.currentUser.getIdToken(true);
        // 1. Delete Firestore record
        const res = await deleteClientFileAction(idToken, file.id);
        if (res.success) {
          // 2. Delete from Storage (Admins can delete any file)
          if (storage) {
            try {
              const fileRef = ref(storage, file.storagePath);
              await deleteObject(fileRef);
            } catch {
              // Ignore storage missing errors
            }
          }
          setSuccess("Fájl sikeresen törölve a széfből.");
          void loadVaultFiles(file.clientId);
        } else {
          setError(res.error || "Sikertelen törlés.");
        }
      } catch (err: unknown) {
        setError(
          "Hiba a törlés során: " +
            (err instanceof Error ? err.message : "Ismeretlen hiba")
        );
      } finally {
        setVaultLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#00B5F1]" />
        <p className="text-sm text-slate-400 font-mono">
          Adatok betöltése a rendszerből...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#00B5F1] font-mono tracking-wide uppercase">
          Portal Kezelő
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Zárt ügyfélportál, jogosultságok és munkafolyamatok (workflows)
          adminisztrációja
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab("workflows")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-bold uppercase tracking-wider transition-all ${
            activeTab === "workflows"
              ? "border-[#00B5F1] text-[#00B5F1] bg-[#00B5F1]/5"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          Workflow-k kezelése
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-bold uppercase tracking-wider transition-all ${
            activeTab === "users"
              ? "border-[#00B5F1] text-[#00B5F1] bg-[#00B5F1]/5"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Users className="w-4 h-4" />
          Ügyfelek kezelése
        </button>
      </div>

      {/* Global Alerts */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {success}
        </div>
      )}

      {/* TAB 1: WORKFLOWS */}
      {activeTab === "workflows" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Create form */}
          <div className="lg:col-span-1 bg-bg-surface/40 border border-gray-800 rounded-2xl p-6 space-y-5">
            <div className="border-b border-gray-800 pb-3">
              <h3 className="font-bold text-white text-base font-mono uppercase tracking-wider">
                Új Workflow
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Rendelj hozzá egy új fejlesztési workflow-t egy ügyfélhez
              </p>
            </div>

            <form onSubmit={handleCreateWorkflow} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">
                  Ügyfél kiválasztása *
                </label>
                <select
                  value={wfClientId}
                  onChange={(e) => setWfClientId(e.target.value)}
                  className="w-full bg-[#0a0f26]/80 border border-gray-800 focus:border-[#00B5F1]/50 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none transition-colors"
                  required
                >
                  <option value="">-- Válassz ügyfelet --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.uid}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">
                  Workflow Címe *
                </label>
                <input
                  type="text"
                  placeholder="pl. Weboldal Audit & Tervezés"
                  value={wfTitle}
                  onChange={(e) => setWfTitle(e.target.value)}
                  className="w-full bg-[#0a0f26]/80 border border-gray-800 focus:border-[#00B5F1]/50 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">
                  Rövid Leírás *
                </label>
                <input
                  type="text"
                  placeholder="pl. A WebDude 2026-os tervező fázisa..."
                  value={wfDescription}
                  onChange={(e) => setWfDescription(e.target.value)}
                  className="w-full bg-[#0a0f26]/80 border border-gray-800 focus:border-[#00B5F1]/50 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">
                  Aktuális fázis *
                </label>
                <select
                  value={wfStatus}
                  onChange={(e) =>
                    setWfStatus(
                      e.target.value as
                        | "planning"
                        | "development"
                        | "testing"
                        | "ai_integration"
                        | "completed"
                    )
                  }
                  className="w-full bg-[#0a0f26]/80 border border-gray-800 focus:border-[#00B5F1]/50 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none transition-colors"
                  required
                >
                  <option value="planning">Tervezés / Audit</option>
                  <option value="development">Fejlesztés</option>
                  <option value="testing">Tesztelés / QA</option>
                  <option value="ai_integration">
                    🚀 AI Integráció & AEO Optimalizálás
                  </option>
                  <option value="completed">Átadva / Kész</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">
                  Jegyzetek / Tartalom *
                </label>
                <textarea
                  rows={4}
                  placeholder="Lépések, mérföldkövek és aktuális teendők..."
                  value={wfContent}
                  onChange={(e) => setWfContent(e.target.value)}
                  className="w-full bg-[#0a0f26]/80 border border-gray-800 focus:border-[#00B5F1]/50 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <div className="space-y-3 border-t border-gray-800/60 pt-3">
                <span className="text-[10px] uppercase font-bold text-[#00B5F1] font-mono tracking-wider block">
                  Mérföldkő Árak (HUF)
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-500 block">
                      Tervezés / Audit
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={planningPrice || ""}
                      onChange={(e) =>
                        setPlanningPrice(parseInt(e.target.value) || 0)
                      }
                      className="w-full bg-[#0a0f26]/80 border border-gray-800 focus:border-[#00B5F1]/50 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-500 block">
                      Fejlesztés
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={developmentPrice || ""}
                      onChange={(e) =>
                        setDevelopmentPrice(parseInt(e.target.value) || 0)
                      }
                      className="w-full bg-[#0a0f26]/80 border border-gray-800 focus:border-[#00B5F1]/50 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-500 block">
                      QA / Tesztelés
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={testingPrice || ""}
                      onChange={(e) =>
                        setTestingPrice(parseInt(e.target.value) || 0)
                      }
                      className="w-full bg-[#0a0f26]/80 border border-gray-800 focus:border-[#00B5F1]/50 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-500 block">
                      AI Integráció
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={aiIntegrationPrice || ""}
                      onChange={(e) =>
                        setAiIntegrationPrice(parseInt(e.target.value) || 0)
                      }
                      className="w-full bg-[#0a0f26]/80 border border-gray-800 focus:border-[#00B5F1]/50 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[9px] uppercase font-bold text-slate-500 block">
                      Átadva / Kész
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={completedPrice || ""}
                      onChange={(e) =>
                        setCompletedPrice(parseInt(e.target.value) || 0)
                      }
                      className="w-full bg-[#0a0f26]/80 border border-gray-800 focus:border-[#00B5F1]/50 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={actionLoading === "create_workflow"}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#00B5F1] hover:bg-[#5B21B6] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
              >
                {actionLoading === "create_workflow" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Workflow Hozzáadása
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Workflows List */}
          <div className="lg:col-span-2 space-y-6">
            {workflows.length === 0 ? (
              <div className="bg-bg-surface/20 border border-dashed border-gray-800 rounded-2xl p-12 text-center text-slate-500">
                <Layers className="w-8 h-8 mx-auto opacity-30 mb-2" />
                <p className="text-xs uppercase font-bold tracking-wider">
                  Nincsenek létrehozott workflow-k
                </p>
              </div>
            ) : (
              workflows.map((wf) => {
                const isEditing = editingWfId === wf.id;
                const client = users.find((u) => u.uid === wf.clientId);

                return (
                  <div
                    key={wf.id}
                    className="bg-bg-surface/40 border border-gray-800 rounded-2xl p-6 space-y-4 hover:border-gray-700/60 transition-all"
                  >
                    {isEditing ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-500">
                              Cím
                            </label>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full bg-[#0a0f26] border border-gray-800 rounded-xl px-4 py-2 text-slate-200 text-xs focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-500">
                              Státusz
                            </label>
                            <select
                              value={editStatus}
                              onChange={(e) =>
                                setEditStatus(
                                  e.target.value as
                                    | "planning"
                                    | "development"
                                    | "testing"
                                    | "ai_integration"
                                    | "completed"
                                )
                              }
                              className="w-full bg-[#0a0f26] border border-gray-800 rounded-xl px-4 py-2 text-slate-200 text-xs focus:outline-none"
                            >
                              <option value="planning">Tervezés / Audit</option>
                              <option value="development">Fejlesztés</option>
                              <option value="testing">Tesztelés / QA</option>
                              <option value="ai_integration">
                                🚀 AI Integráció & AEO Optimalizálás
                              </option>
                              <option value="completed">Átadva / Kész</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-slate-500">
                            Rövid Leírás
                          </label>
                          <input
                            type="text"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full bg-[#0a0f26] border border-gray-800 rounded-xl px-4 py-2 text-slate-200 text-xs focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-slate-500">
                            Részletes jegyzetek
                          </label>
                          <textarea
                            rows={3}
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full bg-[#0a0f26] border border-gray-800 rounded-xl px-4 py-2 text-slate-200 text-xs focus:outline-none resize-none"
                          />
                        </div>

                        <div className="space-y-3 border-t border-gray-800/60 pt-3">
                          <span className="text-[10px] uppercase font-bold text-[#00B5F1] font-mono tracking-wider block">
                            Mérföldkő árazás és fizetési státusz
                          </span>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Tervezés */}
                            <div className="flex gap-2 items-end">
                              <div className="flex-1 space-y-1">
                                <label className="text-[9px] uppercase font-bold text-slate-500 block">
                                  Tervezés / Audit (HUF)
                                </label>
                                <input
                                  type="number"
                                  value={editPlanningPrice || ""}
                                  onChange={(e) =>
                                    setEditPlanningPrice(
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-full bg-[#0a0f26] border border-gray-800 rounded-xl px-3 py-1.5 text-slate-200 text-xs focus:outline-none"
                                />
                              </div>
                              <label className="flex items-center gap-1.5 text-xs text-slate-400 pb-2.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={editPlanningPaid}
                                  onChange={(e) =>
                                    setEditPlanningPaid(e.target.checked)
                                  }
                                  className="accent-[#00B5F1] rounded border-gray-800"
                                />
                                Fizetve
                              </label>
                            </div>

                            {/* Fejlesztés */}
                            <div className="flex gap-2 items-end">
                              <div className="flex-1 space-y-1">
                                <label className="text-[9px] uppercase font-bold text-slate-500 block">
                                  Fejlesztés (HUF)
                                </label>
                                <input
                                  type="number"
                                  value={editDevelopmentPrice || ""}
                                  onChange={(e) =>
                                    setEditDevelopmentPrice(
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-full bg-[#0a0f26] border border-gray-800 rounded-xl px-3 py-1.5 text-slate-200 text-xs focus:outline-none"
                                />
                              </div>
                              <label className="flex items-center gap-1.5 text-xs text-slate-400 pb-2.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={editDevelopmentPaid}
                                  onChange={(e) =>
                                    setEditDevelopmentPaid(e.target.checked)
                                  }
                                  className="accent-[#00B5F1] rounded border-gray-800"
                                />
                                Fizetve
                              </label>
                            </div>

                            {/* QA */}
                            <div className="flex gap-2 items-end">
                              <div className="flex-1 space-y-1">
                                <label className="text-[9px] uppercase font-bold text-slate-500 block">
                                  QA / Tesztelés (HUF)
                                </label>
                                <input
                                  type="number"
                                  value={editTestingPrice || ""}
                                  onChange={(e) =>
                                    setEditTestingPrice(
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-full bg-[#0a0f26] border border-gray-800 rounded-xl px-3 py-1.5 text-slate-200 text-xs focus:outline-none"
                                />
                              </div>
                              <label className="flex items-center gap-1.5 text-xs text-slate-400 pb-2.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={editTestingPaid}
                                  onChange={(e) =>
                                    setEditTestingPaid(e.target.checked)
                                  }
                                  className="accent-[#00B5F1] rounded border-gray-800"
                                />
                                Fizetve
                              </label>
                            </div>

                            {/* AI */}
                            <div className="flex gap-2 items-end">
                              <div className="flex-1 space-y-1">
                                <label className="text-[9px] uppercase font-bold text-slate-500 block">
                                  AI Integráció (HUF)
                                </label>
                                <input
                                  type="number"
                                  value={editAiIntegrationPrice || ""}
                                  onChange={(e) =>
                                    setEditAiIntegrationPrice(
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-full bg-[#0a0f26] border border-gray-800 rounded-xl px-3 py-1.5 text-slate-200 text-xs focus:outline-none"
                                />
                              </div>
                              <label className="flex items-center gap-1.5 text-xs text-slate-400 pb-2.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={editAiIntegrationPaid}
                                  onChange={(e) =>
                                    setEditAiIntegrationPaid(e.target.checked)
                                  }
                                  className="accent-[#00B5F1] rounded border-gray-800"
                                />
                                Fizetve
                              </label>
                            </div>

                            {/* Kész */}
                            <div className="flex gap-2 items-end col-span-1 md:col-span-2">
                              <div className="flex-1 space-y-1">
                                <label className="text-[9px] uppercase font-bold text-slate-500 block">
                                  Átadva / Kész (HUF)
                                </label>
                                <input
                                  type="number"
                                  value={editCompletedPrice || ""}
                                  onChange={(e) =>
                                    setEditCompletedPrice(
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-full bg-[#0a0f26] border border-gray-800 rounded-xl px-3 py-1.5 text-slate-200 text-xs focus:outline-none"
                                />
                              </div>
                              <label className="flex items-center gap-1.5 text-xs text-slate-400 pb-2.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={editCompletedPaid}
                                  onChange={(e) =>
                                    setEditCompletedPaid(e.target.checked)
                                  }
                                  className="accent-[#00B5F1] rounded border-gray-800"
                                />
                                Fizetve
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-800 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
                          >
                            <X className="w-3.5 h-3.5" />
                            Mégse
                          </button>
                          <button
                            type="button"
                            disabled={actionLoading === `edit_${wf.id}`}
                            onClick={() => handleUpdateWorkflow(wf.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00B5F1] text-gray-900 transition-colors text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                          >
                            {actionLoading === `edit_${wf.id}` ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                Mentés
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-gray-800 border border-gray-700 text-slate-400 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                                {wf.status}
                              </span>
                              {wf.approvedByClient ? (
                                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                  Ügyfél jóváhagyta
                                </span>
                              ) : (
                                <span className="text-[10px] bg-[#00B5F1]/10 border border-[#00B5F1]/30 text-[#00B5F1]/400 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                                  Jóváhagyásra vár
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-white text-lg font-mono mt-1.5">
                              {wf.title}
                            </h4>
                            <p className="text-slate-400 text-xs mt-0.5">
                              {wf.description}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleStartEdit(wf)}
                              className="p-2 border border-gray-800 hover:border-[#00B5F1]/40 text-slate-400 hover:text-[#00B5F1] rounded-lg transition-colors"
                              title="Szerkesztés"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              disabled={actionLoading === `delete_${wf.id}`}
                              onClick={() => handleDeleteWorkflow(wf.id)}
                              className="p-2 border border-gray-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                              title="Törlés"
                            >
                              {actionLoading === `delete_${wf.id}` ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Workflow stats */}
                        <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-slate-400 bg-transparent p-3 rounded-xl border border-gray-800/80">
                          <div>
                            <span className="text-slate-500">Ügyfél: </span>
                            <span className="text-[#00B5F1]/90 font-bold">
                              {client ? client.name : "Nem található ügyfél"}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-500">Ügyfél ID: </span>
                            <span
                              className="cursor-pointer hover:text-white"
                              onClick={() => copyToClipboard(wf.clientId)}
                              title="Másolás vágólapra"
                            >
                              {wf.clientId.substring(0, 10)}...
                            </span>
                          </div>
                        </div>

                        {/* Content text */}
                        <div className="text-xs text-slate-300 leading-relaxed bg-[#0a0f26]/30 border border-gray-800/40 p-4 rounded-xl whitespace-pre-wrap">
                          {wf.content}
                        </div>

                        {/* Collapsible Chat feed for Admin */}
                        <div className="border-t border-gray-800/60 pt-3 mt-3">
                          <button
                            type="button"
                            onClick={() => toggleComments(wf.id)}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-[#00B5F1] transition-colors cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Vélemények / Megbeszélés (
                            {commentsData[wf.id]?.length || 0})
                          </button>

                          <AnimatePresence>
                            {expandedComments[wf.id] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden mt-3 space-y-3"
                              >
                                {/* Messages view */}
                                <div className="space-y-2 max-h-45 overflow-y-auto pr-1 bg-transparent rounded-xl p-3 border border-gray-800/80">
                                  {commentsLoading[wf.id] &&
                                  !commentsData[wf.id] ? (
                                    <div className="flex justify-center py-4">
                                      <Loader2 className="w-4 h-4 animate-spin text-[#00B5F1]" />
                                    </div>
                                  ) : !commentsData[wf.id] ||
                                    commentsData[wf.id].length === 0 ? (
                                    <p className="text-[10px] text-slate-500 italic text-center py-2 font-mono">
                                      Nincsenek még üzenetek.
                                    </p>
                                  ) : (
                                    commentsData[wf.id].map((comm) => {
                                      const isSelf =
                                        comm.authorName.includes("Norbi") ||
                                        comm.authorId ===
                                          auth?.currentUser?.uid;
                                      return (
                                        <div
                                          key={comm.id}
                                          className={`flex flex-col max-w-[85%] ${
                                            isSelf
                                              ? "ml-auto items-end"
                                              : "items-start"
                                          }`}
                                        >
                                          <span className="text-[8px] text-slate-500 font-mono mb-0.5">
                                            {comm.authorName} •{" "}
                                            {new Date(
                                              comm.createdAt
                                            ).toLocaleTimeString("hu-HU", {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            })}
                                          </span>
                                          <div
                                            className={`rounded-xl px-3 py-1.5 text-xs leading-relaxed ${
                                              isSelf
                                                ? "bg-[#00B5F1] text-gray-950 font-medium rounded-tr-none"
                                                : "bg-gray-800 border border-gray-700 text-slate-200 rounded-tl-none"
                                            }`}
                                          >
                                            {comm.text}
                                          </div>
                                        </div>
                                      );
                                    })
                                  )}
                                </div>

                                {/* Submit comment */}
                                <form
                                  onSubmit={(e) =>
                                    handleSubmitComment(e, wf.id)
                                  }
                                  className="flex gap-2"
                                >
                                  <input
                                    type="text"
                                    placeholder="Válaszolj az ügyfélnek..."
                                    value={commentInputs[wf.id] || ""}
                                    onChange={(e) =>
                                      setCommentInputs((prev) => ({
                                        ...prev,
                                        [wf.id]: e.target.value,
                                      }))
                                    }
                                    className="flex-1 bg-[#0a0f26]/80 border border-gray-800 rounded-xl px-3 py-1.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#00B5F1] transition-colors text-xs font-mono"
                                    required
                                  />
                                  <button
                                    type="submit"
                                    className="w-8 h-8 rounded-lg bg-[#00B5F1] flex items-center justify-center text-gray-950 hover:scale-102 transition-all cursor-pointer shrink-0"
                                    aria-label="Küldés"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                  </button>
                                </form>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CLIENT USERS */}
      {activeTab === "users" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Create client user */}
          <div className="lg:col-span-1 bg-bg-surface/40 border border-gray-800 rounded-2xl p-6 space-y-5">
            <div className="border-b border-gray-800 pb-3">
              <h3 className="font-bold text-white text-base font-mono uppercase tracking-wider">
                Új Ügyfél Regisztráció
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Hozz létre egy új ügyféli fiókot. A rendszer generál egy
                biztonságos jelszót.
              </p>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">
                  Ügyfél Neve *
                </label>
                <input
                  type="text"
                  placeholder="pl. Kis Péter"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-[#0a0f26]/80 border border-gray-800 focus:border-[#00B5F1]/50 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">
                  E-mail Cím *
                </label>
                <input
                  type="email"
                  placeholder="pl. hello@cegnev.hu"
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  className="w-full bg-[#0a0f26]/80 border border-gray-800 focus:border-[#00B5F1]/50 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={actionLoading === "create_client"}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#00B5F1] hover:bg-[#5B21B6] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
              >
                {actionLoading === "create_client" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Ügyfél Regisztrálása
                  </>
                )}
              </button>
            </form>

            {createdCredentials && (
              <div className="p-4 bg-[#00B5F1]/10 border border-[#00B5F1]/30 rounded-xl space-y-3">
                <span className="text-[10px] uppercase font-black text-[#00B5F1] flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#00B5F1]" />
                  Másold le a hitelesítő adatokat!
                </span>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-[#0a0f26] p-2 rounded-lg">
                    <span className="font-mono text-[10px] text-slate-400 truncate w-36">
                      Email: {createdCredentials.email}
                    </span>
                    <button
                      onClick={() => copyToClipboard(createdCredentials.email)}
                      className="p-1 text-slate-500 hover:text-[#00B5F1] transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-[#0a0f26] p-2 rounded-lg">
                    <span className="font-mono text-[10px] text-slate-400">
                      Jelszó: {createdCredentials.pass}
                    </span>
                    <button
                      onClick={() => copyToClipboard(createdCredentials.pass)}
                      className="p-1 text-slate-500 hover:text-[#00B5F1] transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-[#0a0f26] p-2 rounded-lg">
                    <span className="font-mono text-[10px] text-slate-400 truncate w-36">
                      UID: {createdCredentials.uid}
                    </span>
                    <button
                      onClick={() => copyToClipboard(createdCredentials.uid)}
                      className="p-1 text-slate-500 hover:text-[#00B5F1] transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Users List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-bg-surface/30 border border-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="px-6 py-4 border-b border-gray-800 bg-[#070e27]/20">
                <h3 className="font-bold text-white text-base font-mono uppercase tracking-wider">
                  Regisztrált Kliensek
                </h3>
              </div>

              <div className="divide-y divide-gray-800/60 max-h-125 overflow-y-auto">
                {users.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs uppercase tracking-wider font-bold">
                    Nincs még regisztrált ügyfél a Firestore-ban.
                  </div>
                ) : (
                  users.map((u) => (
                    <div
                      key={u.id}
                      className="border-b border-gray-800/40 last:border-0"
                    >
                      <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-[#070e27]/20 transition-all">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-sm font-mono">
                              {u.name}
                            </h4>
                            <span className="text-[9px] bg-[#00B5F1]/10 border border-[#00B5F1]/20 text-[#00B5F1] px-1.5 py-0.5 rounded font-black uppercase tracking-wider">
                              {u.role}
                            </span>
                          </div>
                          <p className="text-slate-400 text-xs font-mono">
                            {u.email}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              if (activeVaultClientId === u.uid) {
                                setActiveVaultClientId(null);
                              } else {
                                setActiveVaultClientId(u.uid);
                                void loadVaultFiles(u.uid);
                              }
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold font-mono transition-all cursor-pointer ${
                              activeVaultClientId === u.uid
                                ? "bg-[#00B5F1]/10 border-[#00B5F1]/50 text-[#00B5F1]"
                                : "border-gray-800 text-slate-400 hover:text-white hover:border-gray-700"
                            }`}
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                            {activeVaultClientId === u.uid
                              ? "Széf Bezárása"
                              : "Ügyfélszéf"}
                          </button>

                          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 bg-[#0a0f26] px-3 py-1.5 rounded-lg border border-gray-800">
                            <span>UID: {u.uid.substring(0, 12)}...</span>
                            <button
                              onClick={() => copyToClipboard(u.uid)}
                              className="p-1 hover:text-[#00B5F1] transition-colors"
                              title="Másolás"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expandable Vault Panel */}
                      <AnimatePresence>
                        {activeVaultClientId === u.uid && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-[#070e27]/40 border-t border-gray-800/80 px-6 py-5 space-y-4 overflow-hidden"
                          >
                            {/* File Upload Input & Title */}
                            <div className="flex justify-between items-center">
                              <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#00B5F1]/80 font-mono">
                                Fájlok a széfben
                              </h5>

                              <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00B5F1] hover:bg-[#5B21B6] text-gray-900 font-bold text-[10px] uppercase tracking-wider font-mono cursor-pointer transition-all">
                                <Upload className="w-3 h-3" />
                                Új fájl feltöltése
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleAdminUploadFile(e, u.uid)
                                  }
                                  disabled={adminUploading}
                                />
                              </label>
                            </div>

                            {/* Upload progress */}
                            {adminUploading && adminUploadName && (
                              <div className="bg-[bg-transparent]/80 border border-[#00B5F1]/20 p-3 rounded-xl space-y-1.5 font-mono text-[10px]">
                                <div className="flex justify-between text-slate-400">
                                  <span className="truncate max-w-50 text-[#00B5F1] font-bold">
                                    {adminUploadName}
                                  </span>
                                  <span className="text-white font-bold">
                                    {adminUploadProgress}%
                                  </span>
                                </div>
                                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#00B5F1] rounded-full"
                                    style={{ width: `${adminUploadProgress}%` }}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Files List */}
                            {vaultLoading ? (
                              <div className="flex items-center justify-center py-4">
                                <Loader2 className="w-5 h-5 animate-spin text-[#00B5F1]" />
                              </div>
                            ) : vaultFiles.length === 0 ? (
                              <p className="text-[10px] text-slate-500 font-mono italic">
                                A széf még üres.
                              </p>
                            ) : (
                              <div className="space-y-2">
                                {vaultFiles.map((file) => {
                                  // Determine type icon
                                  const ext = file.name
                                    .split(".")
                                    .pop()
                                    ?.toLowerCase();
                                  let FileIconComp = FileText;
                                  if (
                                    [
                                      "jpg",
                                      "jpeg",
                                      "png",
                                      "gif",
                                      "svg",
                                      "webp",
                                    ].includes(ext || "")
                                  )
                                    FileIconComp = ImageIcon;
                                  else if (
                                    ["zip", "rar", "tar", "gz", "7z"].includes(
                                      ext || ""
                                    )
                                  )
                                    FileIconComp = Archive;

                                  return (
                                    <div
                                      key={file.id}
                                      className="flex items-center justify-between bg-[#0a0f26]/60 border border-gray-800/40 rounded-xl p-3 text-xs font-mono"
                                    >
                                      <div className="flex items-center gap-2.5 truncate max-w-[320px]">
                                        <FileIconComp className="w-4 h-4 text-[#00B5F1]/80 shrink-0" />
                                        <div className="truncate">
                                          <p className="text-white font-bold truncate">
                                            {file.name}
                                          </p>
                                          <p className="text-[9px] text-slate-500 mt-0.5">
                                            {formatBytes(file.size)} •{" "}
                                            {new Date(
                                              file.createdAt
                                            ).toLocaleDateString("hu-HU")}{" "}
                                            • {file.uploadedByName}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="flex gap-1.5">
                                        <a
                                          href={file.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-1.5 bg-gray-800/30 hover:bg-[#00B5F1]/10 text-slate-400 hover:text-[#00B5F1] rounded-lg transition-colors cursor-pointer"
                                          title="Letöltés"
                                        >
                                          <Download className="w-3.5 h-3.5" />
                                        </a>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleAdminDeleteFile(file)
                                          }
                                          className="p-1.5 bg-gray-800/30 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                                          title="Törlés"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
