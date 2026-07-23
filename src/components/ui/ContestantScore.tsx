import { Plus, Minus } from "lucide-react";

export interface Contestant {
  pos: string;
  name: string;
  score: number;
}

interface Props {
  contestant: Contestant;
  onUpdateScore: (pos: string, delta: number) => void;
  onUpdateName: (pos: string, newName: string) => void;
}

export default function ContestantScore({
  contestant,
  onUpdateScore,
  onUpdateName,
}: Props) {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-400">
          VỊ TRÍ {contestant.pos}
        </span>
        <input
          type="text"
          value={contestant.name}
          onChange={(e) => onUpdateName(contestant.pos, e.target.value)}
          className="bg-transparent text-sm font-semibold text-right text-zinc-200 focus:outline-none focus:border-b border-amber-500/50 w-full"
        />
      </div>

      <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-zinc-800/80">
        <button
          onClick={() => onUpdateScore(contestant.pos, -10)}
          className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-3xl font-bold font-mono text-white tracking-wider">
          {contestant.score}
        </span>
        <button
          onClick={() => onUpdateScore(contestant.pos, 10)}
          className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
