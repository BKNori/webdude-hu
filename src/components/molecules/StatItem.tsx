interface StatItemProps {
  value: string;
  label: string;
}

export default function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-start">
      <div className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600">
        {value}
      </div>
      <div className="mt-2 text-xs md:text-sm uppercase tracking-wider text-slate-600">
        {label}
      </div>
    </div>
  );
}
