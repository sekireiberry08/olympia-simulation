
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
      className={`p-4 flex items-center justify-center gap-2 font-semibold text-xl bg-no-repeat bg-center bg-contain ${
        isActive
          ? "bg-[url('/assets/image/image82.png')] text-white"
          : "bg-[url('/assets/image/image75.png')] text-zinc-500 hover:bg-[url('/assets/image/image74.png')] hover:text-zinc-300"
      }`}
    >
      {stage.label}
    </button>
  );
}
