interface StatusCardProps {
  title: string;
  value: React.ReactNode;
}

export default function StatusCard({ title, value }: StatusCardProps) {
  return (
    <div className="bg-slate-900/90 py-2 px-3 rounded-lg border-slate-800 flex flex-col items-center justify-center">
      <span className="text-[10px] text-slate-400 font-bold uppercase">
        {title}
      </span>

      {typeof value === "string" || typeof value === "number" ? (
        <span className="text-xl font-black">{value}</span>
      ) : (
        value
      )}
    </div>
  );
}
