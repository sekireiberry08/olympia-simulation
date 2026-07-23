"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Flame, ShieldAlert, Zap, Trophy } from "lucide-react";

import ControllerTitle from "@/components/ui/ControllerTitle";
import ReadyButton from "@/components/ui/ReadyButton";
import ConnectionStatus from "@/components/ui/ConnectionStatus";
import ContestantScore, { Contestant } from "@/components/ui/ContestantScore";
import StageTab from "@/components/ui/StageTab";
import KhoiDongController from "@/components/ui/KhoiDongController";
import VCNVController from "@/components/ui/VCNVController";
import TangTocController from "@/components/ui/TangTocController";
import VeDichController from "@/components/ui/VeDichController";

const STAGES = [
  {
    id: "KHỜI ĐỘNG",
    label: "Khởi Động",
    icon: Flame,
    color: "text-amber-400 border-amber-500 bg-amber-500/10",
  },
  {
    id: "VCNV",
    label: "VCNV",
    icon: ShieldAlert,
    color: "text-cyan-400 border-cyan-500 bg-cyan-500/10",
  },
  {
    id: "TĂNG TỐC",
    label: "Tăng Tốc",
    icon: Zap,
    color: "text-purple-400 border-purple-500 bg-purple-500/10",
  },
  {
    id: "VỀ ĐÍCH",
    label: "Về Đích",
    icon: Trophy,
    color: "text-emerald-400 border-emerald-500 bg-emerald-500/10",
  },
];

export default function ControllerPage() {
  const socketRef = useRef<Socket | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [activeStage, setActiveStage] = useState("KHỜI ĐỘNG");

  const [connections, setConnections] = useState<Record<string, boolean>>({
    "contestant-A": false,
    "contestant-B": false,
    "contestant-C": false,
    "contestant-D": false,
    mc: false,
    viewer: false,
  });

  const [contestants, setContestants] = useState<Contestant[]>([
    { pos: "A", name: "Thí Sinh A", score: 0 },
    { pos: "B", name: "Thí Sinh B", score: 0 },
    { pos: "C", name: "Thí Sinh C", score: 0 },
    { pos: "D", name: "Thí Sinh D", score: 0 },
  ]);

  useEffect(() => {
    const socketClient = io({ query: { role: "controller" } });
    socketRef.current = socketClient;

    socketClient.on("clients-update", (activeRoles: string[]) => {
      setConnections({
        "contestant-A": activeRoles.includes("contestant-A"),
        "contestant-B": activeRoles.includes("contestant-B"),
        "contestant-C": activeRoles.includes("contestant-C"),
        "contestant-D": activeRoles.includes("contestant-D"),
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

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6 flex flex-col gap-6 text-zinc-100">
      <header className="flex items-center justify-between">
        <ControllerTitle />
        <ReadyButton
          isReady={isReady}
          onToggle={() => setIsReady((prev) => !prev)}
        />
      </header>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.keys(connections).map((role) => (
          <ConnectionStatus
            key={role}
            role={role}
            isConnected={connections[role]}
          />
        ))}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contestants.map((c) => (
          <ContestantScore
            key={c.pos}
            contestant={c}
            onUpdateScore={updateScore}
            onUpdateName={updateName}
          />
        ))}
      </section>

      <section className="flex-1 flex flex-col bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-zinc-800">
          {STAGES.map((stage) => (
            <StageTab
              key={stage.id}
              stage={stage}
              isActive={activeStage === stage.id}
              onClick={() => setActiveStage(stage.id)}
            />
          ))}
        </div>

        <div className="flex-1 p-6 overflow-auto">
          {activeStage === "KHỜI ĐỘNG" && <KhoiDongController />}
          {activeStage === "VCNV" && <VCNVController />}
          {activeStage === "TĂNG TỐC" && <TangTocController />}
          {activeStage === "VỀ ĐÍCH" && <VeDichController />}
        </div>
      </section>
    </div>
  );
}
