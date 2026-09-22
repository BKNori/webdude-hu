"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getClientUserProfileAction } from "@/actions/portal";
import {
  Shield,
  Settings,
  Activity,
  Lock,
  Unlock,
  CheckCircle,
  Rocket,
  FileText,
  Layers,
  Zap,
  Palette,
  Camera,
  Snowflake,
  AlertTriangle,
  Loader2,
} from "lucide-react";

interface ModuleItem {
  name: string;
  mod: string;
  status: "Active" | "Locked";
  category: string;
  workflowPhase: string;
  goal: string;
}

const SuperAdminMenu: Record<string, ModuleItem[]> = {
  "Vizuális Motor": [
    {
      name: "Konverziós Banner",
      mod: "BannerAdDesigner",
      status: "Active",
      category: "Konverzió",
      workflowPhase: "Tailwind v4 Deployment",
      goal: "90/8/2 színarány betartása",
    },
    {
      name: "UI/UX Wireframe",
      mod: "WireframeMockup",
      status: "Active",
      category: "Struktúra",
      workflowPhase: "Scroll-trigger logikai réteg",
      goal: "UX Roast konverzió",
    },
    {
      name: "Logó & Arculat",
      mod: "BrandLogoMaster",
      status: "Active",
      category: "Identitás",
      workflowPhase: "Vektor-irányelvek",
      goal: "8px rácsrendszer-kompatibilitás",
    },
  ],
  "Kreatív Motor": [
    {
      name: "Midjourney v6 Master",
      mod: "MJMaster",
      status: "Active",
      category: "Kreatív",
      workflowPhase: "Prompt Engineering",
      goal: "Fizikai optikai pontosság",
    },
    {
      name: "Szezonális Kampány",
      mod: "SeasonalVisuals",
      status: "Active",
      category: "Retenció",
      workflowPhase: "Mood & Vibe Mapping",
      goal: '"Scarcity of Gold" pszichológia',
    },
  ],
  "Product Optimizer": [
    {
      name: "AI Workflow Starter Pack",
      mod: "AIWorkflowStarterPack",
      status: "Active",
      category: "AI Automatizáció",
      workflowPhase: "Product Page Generation",
      goal: "10+ kész AI workflow sablon + GPT-4/Claude integráció",
    },
    {
      name: "SEO & AEO Audit Pro",
      mod: "SEOAuditPro",
      status: "Active",
      category: "SEO Optimalizálás",
      workflowPhase: "Product Page Generation",
      goal: "95+ Lighthouse score + AEO optimalizáció",
    },
    {
      name: "CRO Booster Kit",
      mod: "CROBoosterKit",
      status: "Active",
      category: "Konverzió Optimalizálás",
      workflowPhase: "Product Page Generation",
      goal: "A/B tesztelés + Heatmap elemzés",
    },
    {
      name: "AI Chatbot Starter",
      mod: "AIChatbotStarter",
      status: "Active",
      category: "AI Megoldások",
      workflowPhase: "Product Page Generation",
      goal: "Magyar nyelvű AI chatbot + 24/7 ügyfélszolgálat",
    },
    {
      name: "Kristófka Munkafolyamat",
      mod: "KristofkaWorkflow",
      status: "Active",
      category: "AI Műhely",
      workflowPhase: "Product Page Generation",
      goal: "Ingatlanbefektetői pitch generálás + PDF alaprajz elemzés",
    },
    {
      name: "Banner AI Műhely",
      mod: "BannerAIMuhely",
      status: "Active",
      category: "AI Műhely",
      workflowPhase: "Product Page Generation",
      goal: "Midjourney v6 Master promptok + 90/8/2 színarány",
    },
    {
      name: "Logo AI Műhely",
      mod: "LogoAIMuhely",
      status: "Active",
      category: "AI Műhely",
      workflowPhase: "Product Page Generation",
      goal: "Egyedi arculattervezés + Logo generálás",
    },
    {
      name: "Midjourney AI Műhely",
      mod: "MidjourneyAIMuhely",
      status: "Active",
      category: "AI Műhely",
      workflowPhase: "Product Page Generation",
      goal: "Midjourney v6 integráció + 85mm G-Master optika",
    },
    {
      name: "SEO Audit AI Műhely",
      mod: "SEOAuditAIMuhely",
      status: "Active",
      category: "AI Műhely",
      workflowPhase: "Product Page Generation",
      goal: "SEO audit vizualizáció + Lighthouse score tracking",
    },
    {
      name: "Szezonalis AI Műhely",
      mod: "SzezonalisAIMuhely",
      status: "Active",
      category: "AI Műhely",
      workflowPhase: "Product Page Generation",
      goal: "Szezonalis kampányok + Ünnepi vizuálok",
    },
    {
      name: "Tartalomtervező AI Műhely",
      mod: "TartalomtervezoAIMuhely",
      status: "Active",
      category: "AI Műhely",
      workflowPhase: "Product Page Generation",
      goal: "Tartalom generálás + Vizuális tervezés",
    },
    {
      name: "UI/UX AI Műhely",
      mod: "UIUXAIMuhely",
      status: "Active",
      category: "AI Műhely",
      workflowPhase: "Product Page Generation",
      goal: "UI/UX design generálás + Wireframe tervezés",
    },
    {
      name: "Versenytárs Elemző AI Műhely",
      mod: "VersenytarsElemzoAIMuhely",
      status: "Active",
      category: "AI Műhely",
      workflowPhase: "Product Page Generation",
      goal: "Versenytárs vizuális elemzés + Design audit",
    },
  ],
  "System Config": [
    {
      name: "Audit & Compliance",
      mod: "AuditEngine",
      status: "Locked",
      category: "System",
      workflowPhase: "Compliance Check",
      goal: "WebDude szabványok",
    },
    {
      name: "Deployment Logs",
      mod: "CycleLogs",
      status: "Active",
      category: "System",
      workflowPhase: "Cycle Tracking",
      goal: "Deploy naplózás",
    },
  ],
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Vizuális Motor": <Layers className="w-5 h-5" />,
  "Kreatív Motor": <Zap className="w-5 h-5" />,
  "Product Optimizer": <Rocket className="w-5 h-5" />,
  "System Config": <Settings className="w-5 h-5" />,
};

const workflowIcons: Record<string, React.ReactNode> = {
  Konverzió: <Rocket className="w-4 h-4" />,
  Struktúra: <Layers className="w-4 h-4" />,
  Identitás: <Palette className="w-4 h-4" />,
  Kreatív: <Camera className="w-4 h-4" />,
  Retenció: <Snowflake className="w-4 h-4" />,
  Product: <Rocket className="w-4 h-4" />,
  System: <Activity className="w-4 h-4" />,
};

export default function SuperAdminDashboard() {
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
    email: string | null;
    isAdmin: boolean;
  } | null>(null);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken(true);
          const res = await getClientUserProfileAction(token);
          const isAdmin =
            res.success &&
            (res.profile?.role === "admin" ||
              res.profile?.email === "hello@webdude.hu");
          setUser({ email: currentUser.email, isAdmin });
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser({ email: currentUser.email, isAdmin: false });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 animate-spin text-sky-500 mx-auto" />
          <p className="text-slate-400">Betöltés...</p>
        </div>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold text-white">
            Hozzáférés megtagadva
          </h1>
          <p className="text-slate-400">
            Ez a felület csak adminisztrátori jogosultsággal érhető el.
          </p>
          <p className="text-sm text-slate-500">
            Kérlek jelentkezz be admin fiókkal (role: admin vagy
            hello@webdude.hu).
          </p>
        </div>
      </div>
    );
  }

  const handleDeploy = async () => {
    if (!selectedModule) return;
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      alert(`Deployed ${selectedModule.name} to WebDude.hu`);
    }, 2000);
  };

  const handleGenerateLeadPage = async (module: ModuleItem) => {
    if (!module) return;
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      alert(`Generated Optimized Lead-Page for ${module.name}`);
      alert(
        `Components created:\n- product-lead-hero.tsx\n- technical-spec-section.tsx\n- lead-generation-form.tsx`
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-bg-base text-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-brand-primary" />
              Szuperadmin Dashboard
            </h1>
            <p className="text-slate-400 mt-2">
              WebDude AI Vizuális Motor Rendszer - Parancsnoki Híd
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Activity className="w-4 h-4" />
            <span>System Status: Online</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(SuperAdminMenu).map(([category, modules]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 space-y-4"
            >
              <div className="flex items-center gap-3 text-brand-primary font-bold text-lg">
                {categoryIcons[category]}
                <h2>{category}</h2>
              </div>
              <div className="space-y-2">
                {modules.map((module) => (
                  <button
                    key={module.mod}
                    onClick={() => setSelectedModule(module)}
                    disabled={module.status === "Locked"}
                    className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between ${
                      selectedModule?.mod === module.mod
                        ? "bg-brand-primary/20 border-2 border-brand-primary"
                        : "bg-bg-elevated/50 hover:bg-bg-elevated border-2 border-transparent"
                    } ${module.status === "Locked" ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      {module.status === "Active" ? (
                        <Unlock className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Lock className="w-4 h-4 text-red-500" />
                      )}
                      <span className="font-medium">{module.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {module.status === "Active" ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Lock className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {selectedModule && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {selectedModule.name}
              </h2>
              <div className="flex items-center gap-2">
                {selectedModule.status === "Active" ? (
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-bold">
                    Active
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm font-bold">
                    Locked
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-bg-elevated/50 p-4 rounded-xl">
                <div className="text-sm text-slate-400 mb-1">Kategória</div>
                <div className="flex items-center gap-2 text-white font-bold">
                  {workflowIcons[selectedModule.category]}
                  {selectedModule.category}
                </div>
              </div>
              <div className="bg-bg-elevated/50 p-4 rounded-xl">
                <div className="text-sm text-slate-400 mb-1">
                  Workflow Fázis
                </div>
                <div className="text-white font-bold">
                  {selectedModule.workflowPhase}
                </div>
              </div>
              <div className="bg-bg-elevated/50 p-4 rounded-xl">
                <div className="text-sm text-slate-400 mb-1">Cél</div>
                <div className="text-white font-bold">
                  {selectedModule.goal}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {selectedModule.status === "Active" ? (
                <>
                  <button
                    onClick={handleDeploy}
                    disabled={deploying}
                    className="px-6 py-3 bg-brand-primary text-bg-base font-bold rounded-xl transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {deploying ? (
                      <>
                        <Activity className="w-4 h-4 animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4" />
                        Audit & Deploy to WebDude.hu
                      </>
                    )}
                  </button>
                  {selectedModule.category === "Product" && (
                    <button
                      onClick={() => handleGenerateLeadPage(selectedModule)}
                      disabled={deploying}
                      className="px-6 py-3 bg-emerald-500 text-slate-950 hover:text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
                    >
                      {deploying ? (
                        <>
                          <Activity className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Rocket className="w-4 h-4" />
                          Generate Optimized Lead-Page
                        </>
                      )}
                    </button>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2 text-red-500">
                  <Lock className="w-4 h-4" />
                  <span>
                    Modul zárolva - Adminisztrátori jogosultság szükséges
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-brand-primary" />
            Workflow Integráció
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-bg-elevated">
                  <th className="text-left py-3 px-4 text-slate-400 font-bold">
                    Kategória
                  </th>
                  <th className="text-left py-3 px-4 text-slate-400 font-bold">
                    Eszköz
                  </th>
                  <th className="text-left py-3 px-4 text-slate-400 font-bold">
                    Workflow Fázis
                  </th>
                  <th className="text-left py-3 px-4 text-slate-400 font-bold">
                    Cél
                  </th>
                  <th className="text-left py-3 px-4 text-slate-400 font-bold">
                    Státusz
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.values(SuperAdminMenu)
                  .flat()
                  .map((module) => (
                    <tr
                      key={module.mod}
                      className="border-b border-bg-elevated/50 hover:bg-bg-elevated/30 transition-colors"
                    >
                      <td className="py-3 px-4 text-white">
                        {module.category}
                      </td>
                      <td className="py-3 px-4 text-white font-bold">
                        {module.name}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {module.workflowPhase}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {module.goal}
                      </td>
                      <td className="py-3 px-4">
                        {module.status === "Active" ? (
                          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-bold">
                            Locked
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
