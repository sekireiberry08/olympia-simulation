import Link from "next/link";

interface RoleCardProps {
  href: string;
  title: string;
  bgImage?: string;
}

export default function RoleCard({ href, title }: RoleCardProps) {
  return (
    <Link
      href={href}
      style={{
        backgroundImage: `url("/assets/image/image87.png")`,
      }}
      className="w-full aspect-2048/1879 bg-cover bg-center bg-no-repeat p-6 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center text-center shadow-lg overflow-hidden group"
    >
      <div className=" px-4 py-2 transition-colors">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}
