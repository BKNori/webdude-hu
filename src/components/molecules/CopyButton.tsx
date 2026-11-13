import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  copied: boolean;
  onClick: () => void;
}

export function CopyButton({ copied, onClick }: CopyButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          Másolva
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          Másolás
        </>
      )}
    </button>
  );
}
