
interface Stage {
  id: string;
  label: string;
}

interface Props {
  stage: Stage;
  isActive: boolean;
  onClick: () => void;
}

export default function StageTab({ stage, isActive, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`p-4 border-b-2 flex items-center justify-center gap-2 font-semibold text-sm transition-all ${
        isActive
          ? "text-white border-current"
          : "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
      }`}
    >
      {stage.label}
    </button>
  );
}
