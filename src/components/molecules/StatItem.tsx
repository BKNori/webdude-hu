interface StatItemProps {
  value: string;
  label: string;
}

export default function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-start">
      <div className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
        {value}
      </div>
      <div className="mt-2 text-xs md:text-sm uppercase tracking-wider text-slate-400">
        {label}
      </div>
    </div>
  );
}
