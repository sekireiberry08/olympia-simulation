"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { io } from "socket.io-client";

function ContestantContent() {
  const searchParams = useSearchParams();
  const pos = searchParams.get("pos") || "A";
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io({ query: { role: "contestant", pos } });

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [pos]);

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-black text-cyan-400 mb-4">
          THÍ SINH {pos}
        </h1>
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold ${
            isConnected
              ? "bg-emerald-950 border-emerald-500 text-emerald-400"
              : "bg-rose-950 border-rose-500 text-rose-400"
          }`}
        >
          <span
            className={`w-3 h-3 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-rose-500"}`}
          />
          {isConnected ? "SOCKET CONNECTED" : "DISCONNECTED"}
        </div>
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
