interface TimerFrameProps {
  time: number;
  gameState: string;
  gameTimer: number;
}

export default function TimerFrame({ time, gameState, gameTimer }: TimerFrameProps) {
  return (
    <div className="w-25 aspect-2048/1879 bg-contain bg-center bg-no-repeat flex items-center justify-center">
      <span
        className={`text-5xl font-bold ${
          gameState === "INTRO"
            ? "text-amber-300"
            : gameTimer <= 10
              ? "text-red-500"
              : "text-white"
        }`}
      >
        {time}
      </span>
    </div>
  );
}
