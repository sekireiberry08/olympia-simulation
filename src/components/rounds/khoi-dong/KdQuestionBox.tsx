"use client";

import { Question } from "../../../../setup-kd";

interface KdQuestionBoxProps {
  currentQIndex: number;
  totalQuestions: number;
  selectedContestant: string | null;
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
  currentQ,
}: KdQuestionBoxProps) {
  return (
    <div
      className="flex-1 bg-cover bg-no-repeat bg-center p-4 flex flex-col gap-3 overflow-hidden"
      style={{
        backgroundImage: `url("/assets/image/image281.gif")`,
      }}
    >
      <div className="flex items-center justify-between border-b border-slate-700 pb-2">
        <div>
          <p className="text-xs font-bold text-slate-400">
            CÂU {currentQIndex + 1} / {totalQuestions}
          </p>
          <p className="text-xs font-bold text-amber-400">
            THÍ SINH {selectedContestant ?? "--"}
          </p>
        </div>

        <div className="w-20 h-12 flex items-center justify-center">
          <span
            className={`text-2xl font-black ${
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

      <div className="flex-1 flex flex-col justify-center gap-5 overflow-hidden">
        <div>
          <p className="text-xs font-bold text-slate-400 mb-2">CÂU HỎI</p>

          <div className="min-h-28 rounded-lg bg-slate-900/60 p-4 flex items-center text-lg font-bold text-white leading-relaxed">
            {gameState === "IDLE" &&
              "Chọn thí sinh và nhấn BẮT ĐẦU để bắt đầu phần thi."}

            {gameState === "INTRO" && `Chuẩn bị... ${introTimer}`}

            {(gameState === "PLAYING" || gameState === "ENDED") &&
              currentQ.question}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-400 mb-2">ĐÁP ÁN</p>

          <div className="rounded-lg bg-slate-900/60 px-4 py-3 text-lg font-bold text-emerald-400">
            {gameState === "PLAYING" ? currentQ.answer : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
