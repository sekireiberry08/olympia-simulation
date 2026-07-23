"use client";

interface ScoreProps {
  pos: string; // "A" | "B" | "C" | "D"
  name: string; // Tên thí sinh
  score: number; // Điểm số
}

export default function Score({ pos, name, score }: ScoreProps) {
  return (
    <div
      className="w-full aspect-4/3 bg-contain bg-center bg-no-repeat flex flex-col justify-between p-4 md:p-6 text-center select-none relative shadow-xl"
      style={{
        backgroundImage: "url('/assets/image/image23.jpeg')",
      }}
    >
      {/* Tên thí sinh (Phía trên) */}
      <div className="pt-2">
        <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block mb-0.5">
          THÍ SINH {pos}
        </span>
        <h3 className="text-base md:text-xl font-bold text-yellow-100 truncate px-2 drop-shadow-md">
          {name || `Thí sinh ${pos}`}
        </h3>
      </div>

      {/* Điểm số (Chữ màu trắng, cỡ lớn ở phía dưới) */}
      <div className="pb-3 md:pb-5">
        <span className="text-4xl md:text-6xl font-black text-white tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-mono">
          {score}
        </span>
      </div>
    </div>
  );
}
