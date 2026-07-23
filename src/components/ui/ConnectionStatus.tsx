import { UserCheck, Mic, Tv } from "lucide-react";

interface Props {
  role: string;
  isConnected: boolean;
}

const ROLE_MAP: Record<string, { label: string; icon: any }> = {
  "contestant-A": { label: "Thí Sinh A", icon: UserCheck },
  "contestant-B": { label: "Thí Sinh B", icon: UserCheck },
  "contestant-C": { label: "Thí Sinh C", icon: UserCheck },
  "contestant-D": { label: "Thí Sinh D", icon: UserCheck },
  mc: { label: "MC", icon: Mic },
  viewer: { label: "Viewer", icon: Tv },
};

export default function ConnectionStatus({ role, isConnected }: Props) {
  const config = ROLE_MAP[role] || { label: role, icon: UserCheck };
  const Icon = config.icon;

  return (
    <div
      className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
        isConnected
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
          : "bg-zinc-900/50 border-zinc-800 text-zinc-500"
      }`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-semibold truncate">{config.label}</span>
        <span className="text-[10px] uppercase">
          {isConnected ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}
