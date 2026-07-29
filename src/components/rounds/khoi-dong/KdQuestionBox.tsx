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
  gameState,
  introTimer,
  gameTimer,
  currentQ,
}: KdQuestionBoxProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col gap-0">
        <div
          className="relative w-full h-67 bg-contain bg-top bg-no-repeat px-6 pt-3"
          style={{
            backgroundImage: 'url("/assets/image/image281.gif")',
          }}
        >
          <p className="text-sm font-bold text-white">
            {currentQIndex + 1} / {totalQuestions}
          </p>

          <p className="mt-3 text-2xl font-bold text-white leading-relaxed text-left">
            {gameState === "PLAYING" || gameState === "ENDED"
              ? currentQ.question
              : ""}
          </p>

          <span
            className={`absolute right-10 bottom-10 text-4xl pb-15 font-black ${
              gameState === "INTRO"
                ? "text-amber-300"
                : gameTimer <= 10
                  ? "text-red-500"
                  : "text-white"
            }`}
          >
            {gameState === "INTRO" ? introTimer : gameTimer}
          </span>
        </div>

        <div
          className="-mt-3 w-full h-30 bg-contain bg-center bg-no-repeat mx-auto"
          style={{
            backgroundImage: 'url("/assets/image/image81.png")',
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-3xl font-bold text-white uppercase text-center">
              {gameState === "PLAYING" ? currentQ.answer : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
