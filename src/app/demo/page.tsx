"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import KdQuestionDisplay from "@/components/rounds/khoi-dong/QuestionDisplay";
import ScoreFrame from "@/components/rounds/khoi-dong/ScoreFrame";
import { Question } from "../../../setup-kd";

export default function DemoPage() {
  const [gameState, setGameState] = useState<
    "IDLE" | "INTRO" | "PLAYING" | "ENDED"
  >("IDLE");
  const [selectedContestant, setSelectedContestant] = useState<string | null>(
    null,
  );
  const [introTimer, setIntroTimer] = useState(3);
  const [gameTimer, setGameTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [name, setName] = useState("Thí sinh 1");

  const [currentQ, setCurrentQ] = useState<Question>({
    id: 0,
    question: "",
    answer: "",
  });

  useEffect(() => {
    socket.emit("register", { role: "viewer" });

    const handleKdState = (data: any) => {
      setGameState(data.state);
      setSelectedContestant(data.selectedContestant);
      setIntroTimer(data.introTimer);
      setGameTimer(data.gameTimer);

      if (data.currentQuestion) {
        setCurrentQ(data.currentQuestion);
      }
    };

    const handleScoresUpdated = (scores: any[]) => {
      const currentPos = selectedContestant || "1";
      const contestant = scores.find((c) => c.pos === currentPos);

      if (contestant) {
        setScore(contestant.score);
        setName(contestant.name);
      }
    };

    socket.on("kd-state", handleKdState);
    socket.on("scores-updated", handleScoresUpdated);

    return () => {
      socket.off("kd-state", handleKdState);
      socket.off("scores-updated", handleScoresUpdated);
    };
  }, [selectedContestant]);

  return (
    <div className="min-h-screen w-full flex items-end justify-between px-20 pb-16 gap-10 overflow-hidden">
      <div className="flex-1 min-w-0">
        <KdQuestionDisplay
          currentQIndex={0}
          totalQuestions={1}
          selectedContestant={selectedContestant}
          gameState={gameState}
          introTimer={introTimer}
          gameTimer={gameTimer}
          currentQ={currentQ}
        />
      </div>

      <div className="shrink-0 scale-85 origin-bottom">
        <ScoreFrame score={score} name={name} />
      </div>
    </div>
  );
}
