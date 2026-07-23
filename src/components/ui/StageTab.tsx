import { LucideIcon } from "lucide-react";

interface Stage {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface Props {
  stage: Stage;
  isActive: boolean;
  onClick: () => void;
}

export default function StageTab({ stage, isActive, onClick }: Props) {
  const Icon = stage.icon;

  return (
    <button
      onClick={onClick}
      className={`p-4 border-b-2 flex items-center justify-center gap-2 font-semibold text-sm transition-all ${
        isActive
          ? `${stage.color} border-current`
          : "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
      }`}
    >
      <Icon className="w-4 h-4" />
      {stage.label}
    </button>
  );
}
