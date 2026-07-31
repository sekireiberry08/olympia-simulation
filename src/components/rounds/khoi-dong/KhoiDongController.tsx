"use client";

import { useEffect, useRef, useState } from "react";
import { KD_QUESTIONS, Question } from "../../../../setup-kd";
import KdActionControls from "./KdActionControls";
import KdContestantSelector from "./KdContestantSelector";
import KdQuestionBox from "./KdQuestionBox";
import { socket } from "@/lib/socket";

interface KhoiDongControllerProps {
  questions?: Question[];
  onUpdateScore?: (pos: string, delta: number) => void;
}

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

  const introInterval = useRef<NodeJS.Timeout | null>(null);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);

  const currentQ = questions[currentQIndex];

  useEffect(() => {
    socket.emit("kd-state", {
      state: gameState,
      selectedContestant,
      introTimer,
      gameTimer,
      currentQuestion: currentQ,
      countdown,
      isWaitingAnswer,
    });
  }, [
    gameState,
    selectedContestant,
    introTimer,
    gameTimer,
    currentQ,
    countdown,
    isWaitingAnswer,
  ]);

  useEffect(() => {
    if (!isWaitingAnswer) return;

    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown((c) => c - 1);
      } else {
        handleWrong();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isWaitingAnswer]);

  const nextQuestion = () => {
    if (currentQIndex >= questions.length - 1) {
      setGameState("ENDED");

      if (gameInterval.current) {
        clearInterval(gameInterval.current);
      }

      return;
    }

    setCurrentQIndex((i) => i + 1);
  };

  const handleWrong = () => {
    if (gameState !== "PLAYING") return;

    setIsWaitingAnswer(false);
    setCountdown(3);

    new Audio("/assets/audio/KĐ_sai_O7.mp3.mpeg").play();

    nextQuestion();
  };

  const handleCorrect = () => {
    if (gameState !== "PLAYING" || !selectedContestant) return;

    setIsWaitingAnswer(false);
    setCountdown(3);

    new Audio("/assets/audio/KĐ_đúng_O10.mp3.mpeg").play();

    onUpdateScore?.(selectedContestant, 10);

    nextQuestion();
  };

  const handleStart = () => {
    if (!selectedContestant) return;

    setGameState("INTRO");
    setIntroTimer(3);
    setGameTimer(60);
    setCurrentQIndex(0);
    setIsRoundSaved(false);

    new Audio("/assets/audio/KĐ_mở_câu_hỏi_O11.mp3.mpeg").play();

    if (introInterval.current) {
      clearInterval(introInterval.current);
    }

    introInterval.current = setInterval(() => {
      setIntroTimer((prev) => {
        if (prev <= 1) {
          clearInterval(introInterval.current!);

          new Audio("/assets/audio/KĐ_60s_left_O11.mp3.mpeg").play();

          setGameState("PLAYING");

          gameInterval.current = setInterval(() => {
            setGameTimer((time) => {
              if (time <= 1) {
                clearInterval(gameInterval.current!);
                setGameState("ENDED");
                return 0;
              }

              return time - 1;
            });
          }, 1000);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const handleFinish = () => {
    if (isRoundSaved) return;

    new Audio("/assets/audio/KĐ_hoàn_thành.ogg").play();

    introInterval.current && clearInterval(introInterval.current);
    gameInterval.current && clearInterval(gameInterval.current);

    setIsRoundSaved(true);
    setSelectedContestant(null);
    setGameState("IDLE");
    setCurrentQIndex(0);
    setIntroTimer(3);
    setGameTimer(60);
    setCountdown(3);
    setIsWaitingAnswer(false);
  };

  const handleStartAnswerTimer = () => {
    if (gameState !== "PLAYING") return;

    setCountdown(3);
    setIsWaitingAnswer(true);
  };

  const resetStateForContestant = (pos: string) => {
    new Audio("/assets/audio/KĐ_chuẩn_bị_O9.ogg").play();

    introInterval.current && clearInterval(introInterval.current);
    gameInterval.current && clearInterval(gameInterval.current);

    setSelectedContestant(pos);
    setGameState("IDLE");
    setIntroTimer(3);
    setGameTimer(60);
    setCurrentQIndex(0);
    setIsRoundSaved(false);
    setCountdown(3);
    setIsWaitingAnswer(false);
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
