interface Props {
  role: string;
  isConnected: boolean;
}

const ROLE_MAP: Record<string, { label: string }> = {
  "contestant-1": { label: "Thí Sinh A" },
  "contestant-2": { label: "Thí Sinh B" },
  "contestant-3": { label: "Thí Sinh C" },
  "contestant-4": { label: "Thí Sinh D" },
  mc: { label: "MC" },
  viewer: { label: "Màn hình" },
};

export default function ConnectionStatus({ role, isConnected }: Props) {
  const config = ROLE_MAP[role] || { label: role };

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
        <span className="text-sm font-semibold truncate">{config.label}</span>
      </div>
    </div>
  );
}
