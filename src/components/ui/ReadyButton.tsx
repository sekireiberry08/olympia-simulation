import { Play } from "lucide-react";

interface Props {
  isReady: boolean;
  onToggle: () => void;
}

export default function ReadyButton({ isReady, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-md ${
        isReady
          ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
          : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700"
      }`}
    >
      <Play className={` ${isReady ? "fill-white" : ""}`} />
      {isReady ? "ĐÃ SẴN SÀNG" : "SẴN SÀNG"}
    </button>
  );
}
