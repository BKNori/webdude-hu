import React from "react";
import { Lock } from "lucide-react";
import type { ToolConfig } from "@/components/organisms/ClientAITools";

interface Props {
  /** Tool key identifier */
  toolKey: string;
  /** Configuration for the tool */
  config: ToolConfig;
  /** Whether this tool is currently selected */
  isSelected: boolean;
  /** Loading state to disable interaction */
  loading: boolean;
  /** Click handler */
  onClick: () => void;
  /** Lock state if not allowed */
  isLocked?: boolean;
}

/**
 * Reusable card/button for a graphic or marketing tool in the selector grid.
 * Mirrors the existing button markup but extracts it as a component for
 * consistency and easier styling updates.
 */
const GraphicToolCard: React.FC<Props> = ({
  toolKey,
  config,
  isSelected,
  loading,
  onClick,
  isLocked,
}) => {
  const IconComponent = config.icon as React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  const baseClasses =
    "flex items-center gap-2 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer disabled:opacity-50";
  const selectedClasses =
    "border-sky-500 bg-sky-500/5 text-sky-500 shadow-[0_0_15px_rgba(0, 181, 241,0.05)]";
  const unselectedClasses =
    "border-bg-elevated/60 bg-transparent text-slate-400 hover:border-sky-500/30 hover:text-slate-300";

  return (
    <button
      key={toolKey}
      type="button"
      disabled={loading}
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      {isLocked ? (
        <Lock
          className="w-3.5 h-3.5 text-slate-500 shrink-0"
          strokeWidth={1.5}
        />
      ) : (
        <IconComponent className="w-4 h-4 shrink-0" strokeWidth={1.5} />
      )}
      <span className="text-[10px] font-bold uppercase tracking-wider block leading-none">
        {config.name}
      </span>
    </button>
  );
};

export default GraphicToolCard;
