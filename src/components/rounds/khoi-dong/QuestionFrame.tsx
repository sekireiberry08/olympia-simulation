import TimerFrame from "./TimerFrame";

interface QuestionFrameProps {
  question: string;
  time: number;
}

export default function QuestionFrame({ question, time }: QuestionFrameProps) {
  return (
    <div
      className="relative w-[700px] aspect-[2048/1879] bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/image/image87.png')",
      }}
    >
      <div className="absolute inset-0 flex items-start justify-start p-12">
        <p className="text-4xl font-bold text-white leading-snug max-w-[75%]">
          {question}
        </p>
      </div>

      <div className="absolute right-4 bottom-4">
        <TimerFrame time={time} />
      </div>
    </div>
  );
}
