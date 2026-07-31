interface ScoreFrameProps {
  score: number;
  name: string;
}

export default function ScoreFrame({ score, name }: ScoreFrameProps) {
  return (
    <div
      className="w-70 flex-col aspect-423/381 bg-contain bg-center bg-no-repeat flex items-center justify-start gap-10"
      style={{
        backgroundImage: "url('/assets/image/image721.png')",
      }}
    >
      <div className="text-3xl pt-2 font-bold text-white">{name}</div>
      <div className="text-[96px] font-bold text-white">{score}</div>
    </div>
  );
}
