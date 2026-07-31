"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { socket } from "@/lib/socket";

function ContestantContent() {
  const searchParams = useSearchParams();
  const pos = searchParams.get("pos") || "1";
  const [isConnected, setIsConnected] = useState(false);
  const [stage, setStage] = useState("");
  useEffect(() => {
    socket.emit("register", {
      role: "contestant",
      pos,
    });

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    const handleStageChange = (value: string) => setStage(value);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("stage-change", handleStageChange);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("stage-change", handleStageChange);
    };
  }, [pos]);

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center">
      <div className="text-center">
        {stage === "KHỞI ĐỘNG" ? (
          <h1 className="font-neutra text-[180px] leading-none text-white uppercase">
            KHỞI ĐỘNG
          </h1>
        ) : (
          <></>
        )}
      </div>
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
