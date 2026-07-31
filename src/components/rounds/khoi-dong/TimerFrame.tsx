interface TimerFrameProps {
  time: number;
}

export default function TimerFrame({ time }: TimerFrameProps) {
  return (
    <div className="w-25 aspect-2048/1879 bg-contain bg-center bg-no-repeat flex items-center justify-center">
      <span className="text-5xl font-bold text-white">{time}</span>
    </div>
  );
}
