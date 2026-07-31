"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { io } from "socket.io-client";
import { socket } from "@/lib/socket";

function ContestantContent() {
  const searchParams = useSearchParams();
  const pos = searchParams.get("pos") || "1";
  const [isConnected, setIsConnected] = useState(false);
  const [stage, setStage] = useState("");
  useEffect(() => {
    const socket = io({ query: { role: "contestant", pos } });

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("stage-change", (value: string) => {
      console.log(value);
      setStage(value);
    });

    return () => {
      socket.disconnect();
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
