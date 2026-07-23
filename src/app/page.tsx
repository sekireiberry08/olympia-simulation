import RoleCard from "@/components/ui/RoleCard";
import ContestantSelector from "@/components/ui/ContestantSelector";

export default function HomePage() {
  return (
    <div className="min-h-screen text-white p-6 flex flex-col items-center justify-center">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 max-w-4xl w-full">
        <RoleCard href="/controller" title="Bảng Điều Khiển" />

        <RoleCard href="/mc?role=mc" title="MC" />

        <RoleCard
          href="/viewer?role=viewer"
          title="Màn hình"
        />

        <ContestantSelector />
      </div>
    </div>
  );
}
