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

  return (
    <div
      style={{
        backgroundImage: `url(${isConnected ? "/assets/image/image44.png" : "/assets/image/image77.png"})`,
      }}
      className={`p-3 bg-cover bg-center flex items-center gap-3 ${
        isConnected
          ? " text-white"
          : " text-slate-500"
      }`}
    >
      <div className="flex flex-col min-w-0">
        <span className="text-s font-semibold truncate">{config.label}</span>
      </div>
    </div>
  );
}
