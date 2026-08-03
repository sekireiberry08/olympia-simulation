"use client";

interface KdActionControlsProps {
  gameState: "IDLE" | "INTRO" | "PLAYING" | "ENDED";
  onStart: () => void;
  onCorrect: () => void;
  onWrong: () => void;
  onFinish: () => void;
  selectedContestant: string | null;
  isRoundSaved: boolean;
  countdown: number;
  isWaitingAnswer: boolean;
  onStartAnswerTimer: () => void;
}
export default function KdActionControls({
  gameState,
  onStart,
  onCorrect,
  onWrong,
  onFinish,
  selectedContestant,
  isRoundSaved,
  countdown,
  isWaitingAnswer,
  onStartAnswerTimer,
}: KdActionControlsProps) {
  return (
    <div className="h-full flex flex-col justify-center gap-2">
      <button
        onClick={onStart}
        disabled={gameState !== "IDLE" || selectedContestant === null}
        className="
w-full
aspect-[2048/1879]
bg-contain
bg-center
bg-no-repeat
cursor-pointer
disabled:opacity-40
transition
"
        style={{
          backgroundImage: 'url("/assets/image/image87.png")',
        }}
      >
        BẮT ĐẦU
      </button>
      <button
        onClick={onCorrect}
        className="
w-full
aspect-[2048/1879]
bg-contain
bg-center
bg-no-repeat
cursor-pointer
disabled:opacity-40
transition
"
        style={{
          backgroundImage: 'url("/assets/image/image87.png")',
        }}
      >
        ĐÚNG
      </button>

      <button
        onClick={onWrong}
        className="
w-full
aspect-[2048/1879]
bg-contain
bg-center
bg-no-repeat
cursor-pointer
disabled:opacity-40
transition
"
        style={{
          backgroundImage: 'url("/assets/image/image87.png")',
        }}
      >
        SAI / BỎ QUA
      </button>
      <button
        onClick={onFinish}
        disabled={gameState !== "ENDED" || isRoundSaved}
        className="
w-full
aspect-[2048/1879]
bg-contain
bg-center
bg-no-repeat
disabled:opacity-40
transition cursor-pointer 
"
        style={{
          backgroundImage: 'url("/assets/image/image87.png")',
        }}
      >
        {isRoundSaved ? "ĐÃ TỔNG KẾT" : "TỔNG KẾT"}
      </button>
      <button
        onClick={() => new Audio("/assets/audio/Ô_trống_O9.ogg").play()}
        className="w-full h-7 bg-contain bg-center cursor-pointer bg-no-repeat"
        style={{
          backgroundImage: 'url("/assets/image/image87.png")',
        }}
      >
        ...
      </button>

      <button
        onClick={onStartAnswerTimer}
        disabled={gameState !== "PLAYING" || isWaitingAnswer}
        className="w-full h-7 cursor-pointer bg-contain bg-center bg-no-repeat disabled:opacity-40"
        style={{
          backgroundImage: 'url("/assets/image/image87.png")',
        }}
      >
        {isWaitingAnswer ? countdown : "3"}
      </button>
    </div>
  );
}
