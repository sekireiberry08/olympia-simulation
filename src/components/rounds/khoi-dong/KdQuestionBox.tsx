"use client";

import { Question } from "../../../../setup-kd";

interface KdQuestionBoxProps {
  currentQIndex: number;
  totalQuestions: number;
  selectedContestant: string;
  gameState: "IDLE" | "INTRO" | "PLAYING" | "ENDED";
  introTimer: number;
  gameTimer: number;
  currentQ: Question;
}

export default function KdQuestionBox({
  currentQIndex,
  totalQuestions,
  selectedContestant,
  gameState,
  introTimer,
  gameTimer,
}: KdQuestionBoxProps) {
  return (
    <div
      className="flex-1 bg-cover bg-no-repeat bg-left p-3 flex flex-col justify-between gap-2 overflow-hidden"
      style={{ backgroundImage: `url("assets/image/image281.gif")` }}
    >
      <div className="flex items-center justify-between border-b border-slate-700 pb-2">
        <div>
          <p className="text-xs font-bold text-slate-400">
            CÂU {currentQIndex + 1}/{totalQuestions}
          </p>
          <p className="text-xs font-bold text-amber-400">
            THÍ SINH {selectedContestant}
          </p>
        </div>

        <div
          className="min-w-20 h-12 flex flex-col items-center justify-center bg-contain bg-center bg-no-repeat"
        >
          <span
            className={`text-xl font-black ${
              gameState === "INTRO"
                ? "text-amber-300"
                : gameTimer <= 10
                  ? "text-red-400 animate-pulse"
                  : "text-white"
            }`}
          >
            {gameState === "INTRO" ? introTimer : gameTimer}
          </span>
        </div>
      </div>
    </div>
  );
}
