import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  copied: boolean;
  onClick: () => void;
}

export function CopyButton({ copied, onClick }: CopyButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 text-[#0369A1] dark:text-[#00B5F1] text-xs font-mono font-semibold hover:bg-[#0369A1]/20 dark:hover:bg-[#00B5F1]/20 transition-colors cursor-pointer"
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
