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
    <div
      style={{
        backgroundImage: `url("/assets/image/image23.jpeg")`,
      }}
      className="w-full aspect-501/282 bg-cover bg-center border-zinc-800 p-1 flex flex-col justify-between shadow-lg overflow-hidden"
    >
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          value={contestant.name}
          onChange={(e) => onUpdateName(contestant.pos, e.target.value)}
          className="bg-transparent text-md font-semibold text-center text-blue-900 focus:outline-none focus:border-b border-amber-500/50 w-full"
        />
      </div>

      <div className="flex items-center justify-between  p-3 border-zinc-800/80">
        <button
          onClick={() => onUpdateScore(contestant.pos, -5)}
          className="p-1.5 cursor-pointer text-zinc-400 hover:text-white transition-colors"
        ></button>
        <span className="text-[60px] font-bold text-white tracking-wider">
          {contestant.score}
        </span>
        <button
          onClick={() => onUpdateScore(contestant.pos, 5)}
          className="p-1.5 cursor-pointer text-zinc-400 hover:text-white transition-colors"
        ></button>
      </div>
    </div>
  );
}
