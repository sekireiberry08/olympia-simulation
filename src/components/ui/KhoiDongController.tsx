"use client";

import { useState, useEffect } from "react";
import { KD_QUESTIONS, Question } from "../../../setup-kd";
import { Play, Check, X, Users, RotateCcw, Award } from "lucide-react";

interface KhoiDongControllerProps {
  questions?: Question[];
  onFinishRound?: (results: { [key: string]: number }) => void;
}

export default function KhoiDongController({
  questions = KD_QUESTIONS,
  onFinishRound,
}: KhoiDongControllerProps) {
  const contestantsList = ["1", "2", "3", "4"];
  const [selectedContestant, setSelectedContestant] = useState<string>("1");

  const [scores, setScores] = useState<{ [key: string]: number }>({
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
  });

  const [gameState, setGameState] = useState<
    "IDLE" | "INTRO" | "PLAYING" | "ENDED"
  >("IDLE");
  const [introTimer, setIntroTimer] = useState<number>(6);
  const [gameTimer, setGameTimer] = useState<number>(60);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "INTRO") {
      if (introTimer > 0) {
        timer = setInterval(() => setIntroTimer((prev) => prev - 1), 1000);
      } else {
        setGameState("PLAYING");
      }
    }
    return () => clearInterval(timer);
  }, [gameState, introTimer]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "PLAYING") {
      if (gameTimer > 0) {
        timer = setInterval(() => setGameTimer((prev) => prev - 1), 1000);
      } else {
        setGameState("ENDED");
      }
    }
    return () => clearInterval(timer);
  }, [gameState, gameTimer]);

  const handleStart = () => {
    setGameState("INTRO");
    setIntroTimer(6);
    setGameTimer(60);
    setCurrentQIndex(0);
  };

  const handleCorrect = () => {
    if (gameState !== "PLAYING") return;
    setScores((prev) => ({
      ...prev,
      [selectedContestant]: prev[selectedContestant] + 10,
    }));
    nextQuestion();
  };

  const handleWrong = () => {
    if (gameState !== "PLAYING") return;
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setGameState("ENDED");
    }
  };

  const nextContestant = () => {
    const currentIndex = contestantsList.indexOf(selectedContestant);
    const nextIdx = (currentIndex + 1) % contestantsList.length;
    setSelectedContestant(contestantsList[nextIdx]);
    setGameState("IDLE");
    setGameTimer(60);
    setIntroTimer(6);
    setCurrentQIndex(0);
  };

  const handleFinishAndSave = () => {
    if (onFinishRound) {
      onFinishRound(scores);
    }
  };

  const currentQ = questions[currentQIndex] || {
    question: "Đã hết câu hỏi!",
    answer: "",
  };

  return (
    <div className="h-full flex flex-col justify-between gap-2 text-white font-mono overflow-hidden">
      {/* Thanh chọn thí sinh */}
      <div className="flex items-center justify-between bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <Users className="text-amber-400" size={18} />
          <span className="text-xs font-bold text-slate-300">
            Thí sinh lượt thi:
          </span>
          <div className="flex gap-1.5 ml-2">
            {contestantsList.map((pos) => (
              <button
                key={pos}
                onClick={() => {
                  setSelectedContestant(pos);
                  setGameState("IDLE");
                  setGameTimer(60);
                  setIntroTimer(6);
                  setCurrentQIndex(0);
                }}
                className={`px-2.5 py-1 rounded text-xs font-black transition cursor-pointer ${
                  selectedContestant === pos
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Thí sinh {pos}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={nextContestant}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-bold text-slate-300 transition cursor-pointer"
        >
          <RotateCcw size={13} /> Tiếp theo
        </button>
      </div>

      {/* Grid thông số trạng thái */}
      <div className="grid grid-cols-3 gap-2 shrink-0">
        <div className="bg-slate-900/90 py-2 px-3 rounded-lg border border-slate-800 flex flex-col items-center justify-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase">
            Trạng thái
          </span>
          <span className="text-sm font-black text-cyan-400 truncate">
            {gameState === "IDLE" && "SẴN SÀNG"}
            {gameState === "INTRO" && "NHẠC HIỆU..."}
            {gameState === "PLAYING" && "ĐANG THI ĐẤU"}
            {gameState === "ENDED" && "ĐÃ HẾT GIỜ"}
          </span>
        </div>

        <div className="bg-slate-900/90 py-2 px-3 rounded-lg border border-slate-800 flex flex-col items-center justify-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase">
            {gameState === "INTRO" ? "Nhạc hiệu" : "Thời gian"}
          </span>
          <span
            className={`text-xl font-black ${
              gameState === "INTRO"
                ? "text-amber-400"
                : gameTimer <= 10
                  ? "text-rose-500 animate-pulse"
                  : "text-emerald-400"
            }`}
          >
            {gameState === "INTRO" ? `${introTimer}s` : `${gameTimer}s`}
          </span>
        </div>

        <div className="bg-slate-900/90 py-2 px-3 rounded-lg border border-slate-800 flex flex-col items-center justify-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase">
            Điểm TS {selectedContestant}
          </span>
          <span className="text-xl font-black text-amber-400">
            {scores[selectedContestant]}
          </span>
        </div>
      </div>

      {/* Khung nội dung câu hỏi & đáp án */}
      <div className="flex-1 bg-slate-900/90 border border-slate-800 rounded-lg p-3 flex flex-col justify-between gap-2 overflow-hidden">
        <div className="flex justify-between items-center border-b border-slate-800 pb-1 shrink-0">
          <span className="text-xs font-bold text-slate-400">
            CÂU HỎI {currentQIndex + 1} / {questions.length}
          </span>
          <span className="text-xs text-amber-400 font-bold">
            Thí sinh {selectedContestant}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center overflow-hidden">
          <label className="text-[10px] text-slate-500 font-bold uppercase block mb-0.5">
            Nội dung câu hỏi
          </label>
          <div className="bg-slate-950 border border-slate-800 p-2.5 rounded text-sm md:text-base font-bold text-slate-100 flex-1 flex items-center overflow-y-auto">
            {gameState === "IDLE" &&
              "Ấn nút 'BẮT ĐẦU' để phát nhạc hiệu 6s và bắt đầu tính giờ thi đấu."}
            {gameState === "INTRO" &&
              `Chuẩn bị... Bắt đầu trong ${introTimer}s`}
            {(gameState === "PLAYING" || gameState === "ENDED") &&
              currentQ.question}
          </div>
        </div>

        <div className="shrink-0">
          <label className="text-[10px] text-slate-500 font-bold uppercase block mb-0.5">
            Đáp án chính xác
          </label>
          <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded text-sm font-bold text-emerald-400 truncate">
            {gameState === "PLAYING" || gameState === "ENDED"
              ? currentQ.answer
              : "---"}
          </div>
        </div>
      </div>

      {/* Khung nút bấm điều khiển */}
      <div className="flex items-center justify-between gap-2 shrink-0">
        <button
          onClick={handleStart}
          disabled={gameState !== "IDLE"}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-xs font-black rounded-lg transition cursor-pointer text-white"
        >
          <Play size={15} /> BẮT ĐẦU (60S)
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCorrect}
            disabled={gameState !== "PLAYING"}
            className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-xs font-bold rounded-lg transition cursor-pointer text-white"
          >
            <Check size={15} /> ĐÚNG (+10)
          </button>

          <button
            onClick={handleWrong}
            disabled={gameState !== "PLAYING"}
            className="flex items-center gap-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-xs font-bold rounded-lg transition cursor-pointer text-white"
          >
            <X size={15} /> SAI / BỎ QUA
          </button>
        </div>

        <button
          onClick={handleFinishAndSave}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-lg transition cursor-pointer shadow-md"
        >
          <Award size={15} /> TỔNG KẾT
        </button>
      </div>
    </div>
  );
}