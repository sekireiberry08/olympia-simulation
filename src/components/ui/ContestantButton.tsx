interface ContestantButtonProps {
  contestant: string;
  selected: boolean;
  onClick: () => void;
}

export default function ContestantButton({
  contestant,
  selected,
  onClick,
}: ContestantButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded text-xs font-black transition cursor-pointer ${
        selected
          ? "bg-amber-500 text-slate-950 shadow-md"
          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
      }`}
    >
      Thí sinh {contestant}
    </button>
  );
}
