import Link from "next/link";
import { Gamepad2, UserCheck, Tv, Mic } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen text-white p-6 font-mono flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full text-center mb-10 bg-black/50 p-6 rounded-2xl border border-slate-800/80 shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-black text-amber-400 tracking-wider mb-3">
          OLYMPIA SIMULATION
        </h1>
        <p className="text-slate-300 text-sm md:text-base">
          Hệ thống mô phỏng Đường Lên Đỉnh Olympia — Chọn màn hình để tham gia
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Link
          href="/controller"
          className="p-6 bg-slate-900/80 hover:bg-slate-900 border border-amber-500/40 hover:border-amber-400 rounded-2xl transition group flex items-start gap-4 shadow-lg"
        >
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl group-hover:scale-110 transition">
            <Gamepad2 size={32} />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-amber-400">
              Bảng Điều Khiển (Controller)
            </h2>
            <p className="text-slate-300 text-xs mt-1">
              Quản lý trạng thái kết nối, theo dõi thiết bị online/offline.
            </p>
          </div>
        </Link>

        <Link
          href="/mc?role=mc"
          className="p-6 bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-cyan-500 rounded-2xl transition group flex items-start gap-4 shadow-lg"
        >
          <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl group-hover:scale-110 transition">
            <Mic size={32} />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-cyan-400">
              Màn Hình MC (Host)
            </h2>
            <p className="text-slate-300 text-xs mt-1">
              Giao diện câu hỏi và điều phối cho dẫn chương trình.
            </p>
          </div>
        </Link>

        <Link
          href="/viewer?role=viewer"
          className="p-6 bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-purple-500 rounded-2xl transition group flex items-start gap-4 shadow-lg"
        >
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl group-hover:scale-110 transition">
            <Tv size={32} />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-purple-400">
              Khán Giả / Trường Quay (Main)
            </h2>
            <p className="text-slate-300 text-xs mt-1">
              Màn hình chính trình chiếu câu hỏi, điểm số và hiệu ứng.
            </p>
          </div>
        </Link>

        <div className="p-6 bg-slate-900/80 border border-slate-700 rounded-2xl flex flex-col justify-between shadow-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <UserCheck size={32} />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-emerald-400">
                4 Thí Sinh (A, B, C, D)
              </h2>
              <p className="text-slate-300 text-xs mt-1">
                Chọn vị trí thi đấu tương ứng:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {["A", "B", "C", "D"].map((pos) => (
              <Link
                key={pos}
                href={`/contestant?pos=${pos}`}
                className="py-2.5 bg-slate-800/90 hover:bg-emerald-600 font-bold text-center rounded-lg transition text-slate-200 hover:text-white border border-slate-700"
              >
                Vị trí {pos}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
