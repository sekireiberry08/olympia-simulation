"use client";

import { Question } from "../../../../setup-kd";

interface KdQuestionDisplayProps {
  currentQIndex: number;
  totalQuestions: number;
  selectedContestant: string | null;
  gameState: "IDLE" | "INTRO" | "PLAYING" | "ENDED";
  introTimer: number;
  gameTimer: number;
  currentQ: Question;
  score?: number;
}

export default function KdQuestionDisplay({
  gameState,
  currentQ,
}: KdQuestionDisplayProps) {
  return (
    <div className="flex-1 flex flex-col items-start overflow-hidden w-full pt-10">
      <div
        className="w-[99%] h-16 bg-contain bg-center bg-no-repeat -mb-8 z-10"
        style={{
          backgroundImage: 'url("/assets/image/Picture2.png")',
        }}
      />

      <div className="w-full flex flex-row items-stretch justify-center gap-4">
        <div
          className="relative flex-1 h-67 bg-contain bg-top bg-no-repeat px-6 pt-8"
          style={{
            backgroundImage: 'url("/assets/image/image281.gif")',
          }}
        >
          <p className="mt-3 text-2xl font-bold text-white leading-relaxed text-left">
            {gameState === "PLAYING" || gameState === "ENDED"
              ? currentQ?.question
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
