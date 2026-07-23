import Link from "next/link";

interface ContestantItem {
  pos: string;
  bgImage?: string;
}

interface ContestantSelectorProps {
  items?: ContestantItem[];
}

const DEFAULT_ITEMS: ContestantItem[] = [
  { pos: "1", bgImage: "/assets/image/image87.png" },
  { pos: "2", bgImage: "/assets/image/image87.png" },
  { pos: "3", bgImage: "/assets/image/image87.png" },
  { pos: "4", bgImage: "/assets/image/image87.png" },
];

export default function ContestantSelector({
  items = DEFAULT_ITEMS,
}: ContestantSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {items.map((item) => (
        <Link
          key={item.pos}
          href={`/contestant?pos=${item.pos}`}
          style={{
            backgroundImage: `url("${item.bgImage || "/assets/image/image87.png"}")`,
          }}
          className="group w-full aspect-2048/1879 bg-cover bg-center bg-no-repeat transition-all duration-300 hover:scale-[1.03] flex items-center justify-center shadow-lg overflow-hidden "
        >
          <div
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300  bg-cover bg-center bg-no-repeat [--bg-icon:url('/assets/image/image46.png')] group-hover:[--bg-icon:url('/assets/image/image47.png')]"
            style={{
              backgroundImage: "var(--bg-icon)",
            }}
          >
            <span className="text-2xl md:text-3xl font-black text-white drop-shadow-md group-hover:text-blue-900 transition-all duration-300 ">
              {item.pos}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
