"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function ControllerPage() {
  const [onlineStatus, setOnlineStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    socket = io({ query: { role: "controller" } });

    socket.on("connection:status", (status) => {
      setOnlineStatus(status);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white p-8 font-mono">
      <h1 className="text-2xl font-bold text-amber-400 mb-2">
        🎛️ CONTROLLER PANEL
      </h1>
      <p className="text-slate-400 text-sm mb-8">
        Trang kiểm tra trạng thái kết nối Socket giữa các màn hình
      </p>

      {/* Lưới hiển thị trạng thái 7 thiết bị */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["controller", "mc", "viewer", "A", "B", "C", "D"].map((key) => {
          const isOnline = onlineStatus[key];
          return (
            <div
              key={key}
              className={`p-5 rounded-2xl border transition-all ${
                isOnline
                  ? "bg-emerald-950/60 border-emerald-500 text-emerald-400"
                  : "bg-slate-800/60 border-slate-700 text-slate-500"
              }`}
            >
              <div className="text-xs uppercase text-slate-400 mb-1">
                Màn hình / Vị trí
              </div>
              <div className="text-2xl font-bold">{key}</div>
              <div className="text-xs font-semibold mt-3 flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${isOnline ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`}
                />
                {isOnline ? "ĐÃ KẾT NỐI" : "CHƯA KẾT NỐI"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
