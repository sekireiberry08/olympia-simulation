"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { KD_QUESTIONS, Question } from "../../../../setup-kd";
import KdActionControls from "./KdActionControls";
import KdContestantSelector from "./KdContestantSelector";
import KdQuestionBox from "./KdQuestionBox";

interface KhoiDongControllerProps {
  questions?: Question[];
  onUpdateScore?: (pos: string, delta: number) => void;
}

const socket = io();

export default function KhoiDongController({
  questions = KD_QUESTIONS,
  onUpdateScore,
}: KhoiDongControllerProps) {
  const contestantsList = ["1", "2", "3", "4"];

  const [selectedContestant, setSelectedContestant] = useState<string | null>(
    null,
  );

  const [gameState, setGameState] = useState<
    "IDLE" | "INTRO" | "PLAYING" | "ENDED"
  >("IDLE");

  const [introTimer, setIntroTimer] = useState(3);
  const [gameTimer, setGameTimer] = useState(60);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isRoundSaved, setIsRoundSaved] = useState(false);

  const [countdown, setCountdown] = useState(3);
  const [isWaitingAnswer, setIsWaitingAnswer] = useState(false);

  const currentQ = questions[currentQIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameState === "INTRO") {
      if (introTimer > 0) {
        timer = setInterval(() => {
          setIntroTimer((prev) => prev - 1);
        }, 1000);
      } else {
        new Audio("/assets/audio/KĐ_60s_left_O11.mp3.mpeg").play();

        socket.emit("kd-state", {
          state: "PLAYING",
          introTimer: 0,
          gameTimer: 60,
          currentQuestion: currentQ,
        });

        setGameState("PLAYING");
      }
    }

    return () => clearInterval(timer);
  }, [gameState, introTimer, currentQ]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameState === "PLAYING") {
      if (gameTimer > 0) {
        timer = setInterval(() => {
          setGameTimer((prev) => prev - 1);
        }, 1000);
      } else {
        setGameState("ENDED");
      }
    }

    return () => clearInterval(timer);
  }, [gameState, gameTimer]);

  useEffect(() => {
    if (gameState !== "PLAYING") return;

    socket.emit("kd-state", {
      state: "PLAYING",
      introTimer: 0,
      gameTimer,
      currentQuestion: currentQ,
    });
  }, [gameTimer, currentQ, gameState]);

  useEffect(() => {
    if (!isWaitingAnswer) return;

    if (countdown === 0) {
      setIsWaitingAnswer(false);
      handleWrong();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isWaitingAnswer]);

  const handleStart = () => {
    if (!selectedContestant) return;

    setGameState("INTRO");
    setIntroTimer(3);
    setGameTimer(60);
    setCurrentQIndex(0);
    setIsRoundSaved(false);

    socket.emit("kd-state", {
      state: "INTRO",
      introTimer: 3,
      gameTimer: 60,
      currentQuestion: null,
    });

    new Audio("/assets/audio/KĐ_mở_câu_hỏi_O11.mp3.mpeg").play();
  };

  const resetStateForContestant = (pos: string) => {
    new Audio("/assets/audio/KĐ_chuẩn_bị_O9.ogg").play();

    setSelectedContestant(pos);
    setGameState("IDLE");
    setIntroTimer(3);
    setGameTimer(60);
    setCurrentQIndex(0);
    setIsRoundSaved(false);
    setCountdown(3);
    setIsWaitingAnswer(false);
  };

  const nextQuestion = () => {
    if (currentQIndex >= questions.length - 1) {
      setGameState("ENDED");

      socket.emit("kd-state", {
        state: "ENDED",
      });

      return;
    }

    const nextIndex = currentQIndex + 1;

    setCurrentQIndex(nextIndex);

    socket.emit("kd-state", {
      state: "PLAYING",
      introTimer: 0,
      gameTimer,
      currentQuestion: questions[nextIndex],
    });
  };

  const handleCorrect = () => {
    if (gameState !== "PLAYING" || !selectedContestant) return;

    setIsWaitingAnswer(false);
    setCountdown(3);

    new Audio("/assets/audio/KĐ_đúng_O10.mp3.mpeg").play();

    onUpdateScore?.(selectedContestant, 10);

    nextQuestion();
  };

  const handleWrong = () => {
    if (gameState !== "PLAYING") return;

    setIsWaitingAnswer(false);
    setCountdown(3);

    new Audio("/assets/audio/KĐ_sai_O7.mp3.mpeg").play();

    nextQuestion();
  };

  const handleFinish = () => {
    if (isRoundSaved) return;

    new Audio("/assets/audio/KĐ_hoàn_thành.ogg").play();

    setIsRoundSaved(true);
    setSelectedContestant(null);
    setGameState("IDLE");
    setCurrentQIndex(0);
    setIntroTimer(3);
    setGameTimer(60);
    setCountdown(3);
    setIsWaitingAnswer(false);

    socket.emit("kd-state", {
      state: "ENDED",
    });
  };

  const handleStartAnswerTimer = () => {
    if (gameState !== "PLAYING") return;

    setCountdown(3);
    setIsWaitingAnswer(true);
  };

  return (
    <div className="h-full flex flex-col justify-between gap-2 overflow-hidden text-white font-mono">
      <KdContestantSelector
        contestantsList={contestantsList}
        selectedContestant={selectedContestant}
        onSelectContestant={resetStateForContestant}
      />

      <div className="flex-1 flex gap-2 min-h-0">
        <div className="flex-1 min-w-0">
          <KdQuestionBox
            currentQIndex={currentQIndex}
            totalQuestions={questions.length}
            selectedContestant={selectedContestant}
            gameState={gameState}
            introTimer={introTimer}
            gameTimer={gameTimer}
            currentQ={currentQ}
          />
        </div>

        <div className="w-20 shrink-0">
          <KdActionControls
            gameState={gameState}
            selectedContestant={selectedContestant}
            isScoreCalculated={false}
            isRoundSaved={isRoundSaved}
            countdown={countdown}
            isWaitingAnswer={isWaitingAnswer}
            onStart={handleStart}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            onFinish={handleFinish}
            onStartAnswerTimer={handleStartAnswerTimer}
          />
        </div>
      </div>
    </div>
  );
}
