"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

import ConnectionStatus from "@/components/ui/ConnectionStatus";
import ContestantScore, { Contestant } from "@/components/ui/ContestantScore";
import StageTab from "@/components/ui/StageTab";
import KhoiDongController from "@/components/rounds/khoi-dong/KhoiDongController";
import VCNVController from "@/components/rounds/vcnv/VCNVController";
import TangTocController from "@/components/rounds/tang-toc/TangTocController";
import VeDichController from "@/components/rounds/ve-dich/VeDichController";

const STAGES = [
  { id: "KHỜI ĐỘNG", label: "Khởi Động" },
  { id: "VCNV", label: "VCNV" },
  { id: "TĂNG TỐC", label: "Tăng Tốc" },
  { id: "VỀ ĐÍCH", label: "Về Đích" },
];

export default function ControllerPage() {
  const socketRef = useRef<Socket | null>(null);
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const [connections, setConnections] = useState<Record<string, boolean>>({
    "contestant-1": false,
    "contestant-2": false,
    "contestant-3": false,
    "contestant-4": false,
    mc: false,
    viewer: false,
  });

  const [contestants, setContestants] = useState<Contestant[]>([
    { pos: "1", name: "Thí Sinh A", score: 0 },
    { pos: "2", name: "Thí Sinh B", score: 0 },
    { pos: "3", name: "Thí Sinh C", score: 0 },
    { pos: "4", name: "Thí Sinh D", score: 0 },
  ]);

  useEffect(() => {
    const socketClient = io({ query: { role: "controller" } });
    socketRef.current = socketClient;

    socketClient.on("clients-update", (activeRoles: string[]) => {
      setConnections({
        "contestant-1": activeRoles.includes("contestant-1"),
        "contestant-2": activeRoles.includes("contestant-2"),
        "contestant-3": activeRoles.includes("contestant-3"),
        "contestant-4": activeRoles.includes("contestant-4"),
        mc: activeRoles.includes("mc"),
        viewer: activeRoles.includes("viewer"),
      });
    });

    return () => {
      socketClient.disconnect();
    };
  }, []);

  const updateScore = (pos: string, delta: number) => {
    setContestants((prev) => {
      const next = prev.map((c) =>
        c.pos === pos ? { ...c, score: c.score + delta } : c,
      );
      socketRef.current?.emit("update-scores", next);
      return next;
    });
  };

  const updateName = (pos: string, newName: string) => {
    setContestants((prev) => {
      const next = prev.map((c) =>
        c.pos === pos ? { ...c, name: newName } : c,
      );
      socketRef.current?.emit("update-scores", next);
      return next;
    });
  };

  const handleFinishRound = (roundScores: { [key: string]: number }) => {
    setContestants((prev) => {
      const next = prev.map((c) => ({
        ...c,
        score: c.score + (roundScores[c.pos] || 0),
      }));
      socketRef.current?.emit("update-scores", next);
      return next;
    });
  };

  return (
    <div
      style={{ backgroundImage: `url("/assets/image/image88.png")` }}
      className="h-screen w-full p-2 flex flex-col gap-2 text-zinc-100 overflow-hidden bg-slate-950 font-mono"
    >
      <section className="grid grid-cols-6 gap-1 shrink-0">
        {Object.keys(connections).map((role) => (
          <ConnectionStatus
            key={role}
            role={role}
            isConnected={connections[role]}
          />
        ))}
      </section>

      <section className="grid grid-cols-4 gap-2 shrink-0">
        {contestants.map((c) => (
          <ContestantScore
            key={c.pos}
            contestant={c}
            onUpdateScore={updateScore}
            onUpdateName={updateName}
          />
        ))}
      </section>

      <section className="flex-1 flex flex-row border-slate-800 rounded-lg overflow-hidden min-h-0">
        <div className="w-40 sm:w-48 flex flex-col shrink-0 p-1.5 gap-1">
          {STAGES.map((stage) => (
            <StageTab
              key={stage.id}
              stage={stage}
              isActive={activeStage === stage.id}
              onClick={() => {
                if (stage.id === "KHỜI ĐỘNG") {
                  new Audio("/assets/audio/KĐ_bắt_đầu_left_O9.mp3.mpeg").play();
                }

                setActiveStage(stage.id);
              }}
            />
          ))}
        </div>

        <div className="flex-1 p-3 overflow-hidden h-full">
          {activeStage === "KHỜI ĐỘNG" && (
            <KhoiDongController onFinishRound={handleFinishRound} />
          )}
          {activeStage === "VCNV" && <VCNVController />}
          {activeStage === "TĂNG TỐC" && <TangTocController />}
          {activeStage === "VỀ ĐÍCH" && <VeDichController />}
        </div>
      </section>
    </div>
  );
}
