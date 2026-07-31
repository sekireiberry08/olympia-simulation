"use client";

interface KdContestantSelectorProps {
  contestantsList: string[];
  selectedContestant: string | null;
  onSelectContestant: (pos: string) => void;
}

export default function KdContestantSelector({
  contestantsList,
  selectedContestant,
  onSelectContestant,
}: KdContestantSelectorProps) {
  return (
    <div className="flex items-center justify-between px-3 pb-2 rounded-lg border-slate-800 shrink-0">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5 ml-2">
          {contestantsList.map((pos) => (
            <button
              key={pos}
              onClick={() => onSelectContestant(pos)}
              className={`px-20 py-1 bg-cover bg-no-repeat bg-center text-2xl cursor-pointer ${
                selectedContestant === pos ? " text-white " : " text-blue-300"
              }`}
              style={{
                backgroundImage: `url("${
                  selectedContestant === pos
                    ? "/assets/image/image29.png"
                    : "/assets/image/image25.png"
                }")`,
              }}
            >
              Thí sinh {pos}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
