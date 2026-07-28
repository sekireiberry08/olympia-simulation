"use client";

interface KdActionControlsProps {
  gameState: "IDLE" | "INTRO" | "PLAYING" | "ENDED";
  onStart: () => void;
  onCorrect: () => void;
  onWrong: () => void;
  onFinish: () => void;
  selectedContestant: string | null;
  isScoreCalculated: boolean;
  isRoundSaved: boolean;
}

export default function KdActionControls({
  gameState,
  onStart,
  onCorrect,
  onWrong,
  onFinish,
  selectedContestant,
  isRoundSaved
}: KdActionControlsProps) {
  return (
    <div className="flex items-center justify-between gap-2 shrink-0">
      <button
        onClick={onStart}
        disabled={gameState !== "IDLE" || selectedContestant === null}
        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-xs font-black rounded-lg transition cursor-pointer text-white"
      >
        BẮT ĐẦU
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={onCorrect}
          disabled={gameState !== "PLAYING"}
          className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-xs font-bold rounded-lg transition cursor-pointer text-white"
        >
          ĐÚNG
        </button>

        <button
          onClick={onWrong}
          disabled={gameState !== "PLAYING"}
          className="flex items-center gap-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-xs font-bold rounded-lg transition cursor-pointer text-white"
        >
          SAI / BỎ QUA
        </button>
      </div>

      <button
        onClick={onFinish}
        disabled={gameState !== "ENDED" || isRoundSaved}
        className="..."
      >
        {isRoundSaved ? "ĐÃ TỔNG KẾT" : "TỔNG KẾT"}
      </button>
    </div>
  );
}
