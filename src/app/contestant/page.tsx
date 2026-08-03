"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { socket } from "@/lib/socket";
import QuestionFrame from "@/components/rounds/khoi-dong/QuestionFrame";
import ScoreFrame from "@/components/rounds/khoi-dong/ScoreFrame";

function ContestantContent() {
  const searchParams = useSearchParams();
  const pos = searchParams.get("pos") || "1";

  const [stage, setStage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [currentContestant, setCurrentContestant] = useState<string | null>(
    null,
  );

  const [question, setQuestion] = useState("");
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(0);
  const [name, setName] = useState(`Thí sinh ${pos}`);
  const [gameState, setGameState] = useState("IDLE");
  const [gameTimer, setGameTimer] = useState(60);

  useEffect(() => {
    socket.emit("register", {
      role: "contestant",
      pos,
    });

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    const handleStageChange = (value: string) => {
      setStage(value);
    };

    const handleScoresUpdated = (scores: any[]) => {
      const me = scores.find((c) => c.pos === pos);

      if (me) {
        setScore(me.score);
        setName(me.name);
      }
    };

    const handleKdState = (data: any) => {
      setCurrentContestant(data.selectedContestant);
      setGameState(data.state);
      setGameTimer(data.gameTimer);
      const isShowable = data.state === "PLAYING" || data.state === "ENDED";
      setQuestion(isShowable ? (data.currentQuestion?.question ?? "") : "");
      setTime(data.state === "INTRO" ? data.introTimer : data.gameTimer);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("stage-change", handleStageChange);
    socket.on("kd-state", handleKdState);
    socket.on("scores-updated", handleScoresUpdated);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("stage-change", handleStageChange);
      socket.off("kd-state", handleKdState);
      socket.off("scores-updated", handleScoresUpdated);
    };
  }, [pos]);

  const isPlaying = stage === "KHỞI ĐỘNG" && currentContestant === pos;

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isPlaying ? (
        <div className="flex items-end gap-10">
          <QuestionFrame question={question} time={time} gameState={gameState} gameTimer={gameTimer}/>

          <ScoreFrame score={score} name={name} />
        </div>
      ) : (
        <div className="text-center">
          {stage === "KHỞI ĐỘNG" && (
            <h1 className="font-neutra text-[180px] leading-none text-white uppercase">
              KHỞI ĐỘNG
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

export default function ContestantPage() {
  return (
    <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
      <ContestantContent />
    </Suspense>
  );
}
