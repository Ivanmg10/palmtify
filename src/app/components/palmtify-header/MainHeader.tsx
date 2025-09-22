import {
  IconDots,
  IconChevronLeft,
  IconChevronRight,
  IconHomeFilled,
  IconSearch,
  IconLibrary,
  IconBell,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import pfp from "../../../../public/pfp.jpg";

export default function PalmtifyHeader() {
  const leftButtonsClassName =
    "p-2 rounded-full cursor-pointer transition duration-300 hover:scale-110";

  return (
    <nav className="flex items-center justify-between w-full px-4 pt-4 bg-[#121212] text-[#b3b3b3]">
      {/* Left section */}
      <div className="flex items-center gap-3 ml-3">
        <button className={leftButtonsClassName}>
          <IconDots stroke={2} size={24} />
        </button>
        <button className={leftButtonsClassName}>
          <IconChevronLeft stroke={2} size={24} />
        </button>
        <button className={leftButtonsClassName}>
          <IconChevronRight stroke={2} size={24} />
        </button>
      </div>

      {/* Center section */}
      <div className="flex items-center gap-3 w-1/4">
        <Link
          className="w-11 aspect-square flex items-center justify-center rounded-full bg-[#212121] transition duration-300 hover:scale-105 hover:bg-[#666666]"
          href="/"
        >
          <IconHomeFilled
            stroke={2}
            size={24}
            className="cursor-pointer text-white"
          />
        </Link>
        <div className="flex items-center w-full px-3 py-2 bg-[#212121] rounded-full">
          <IconSearch stroke={2} size={24} className="" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full ml-2 bg-transparent outline-none placeholder-gray-400 text-sm p-1"
          />
          <IconLibrary stroke={2} size={24} className="" />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 mr-3">
        <IconBell
          stroke={2}
          size={24}
          className="cursor-pointer hover:text-[#ffffff]"
        />
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#535353] cursor-pointer hover:bg-[#ffffff]">
          <Image
            src={pfp}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>
    </nav>
  );
}
