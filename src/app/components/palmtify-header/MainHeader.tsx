import {
  IconDots,
  IconChevronLeft,
  IconChevronRight,
  IconHomeFilled,
  IconSearch,
  IconLibrary,
  IconBell,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";

export default function PalmtifyHeader() {
  return (
    <nav className="flex items-center justify-between w-full px-4 pt-4 bg-[#121212] text-white">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full bg-[#212121] hover:bg-[#2a2a2a]">
          <IconDots stroke={2} size={20} />
        </button>
        <button className="p-2 rounded-full bg-[#212121] hover:bg-[#2a2a2a]">
          <IconChevronLeft stroke={2} size={20} />
        </button>
        <button className="p-2 rounded-full bg-[#212121] hover:bg-[#2a2a2a]">
          <IconChevronRight stroke={2} size={20} />
        </button>
      </div>

      {/* Center section */}
      <div className="flex items-center gap-3 w-1/4">
        <Link
          className="w-11 aspect-square flex items-center justify-center rounded-full bg-[#212121]"
          href="/"
        >
          <IconHomeFilled
            stroke={2}
            size={20}
            className="cursor-pointer hover:text-[#1DB954] "
          />
        </Link>
        <div className="flex items-center w-full px-3 py-2 bg-[#212121] rounded-full">
          <IconSearch stroke={2} size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full ml-2 bg-transparent outline-none placeholder-gray-400 text-sm p-1"
          />
          <IconLibrary stroke={2} size={20} className="text-gray-400" />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <IconBell
          stroke={2}
          size={22}
          className="cursor-pointer hover:text-[#1DB954]"
        />
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#535353] cursor-pointer hover:bg-[#1DB954]">
          <IconUser stroke={2} size={20} />
        </div>
      </div>
    </nav>
  );
}
