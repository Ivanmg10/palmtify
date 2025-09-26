import { IconSearch, IconHome } from "@tabler/icons-react";
import Link from "next/link";

export default function LateralComponentCards() {
  return (
    <div className="p-2 bg-[#181818] rounded-lg">
      <Link
        className="flex flex-row justify-start items-center gap-3 p-4 hover:scale-101 transition duration-300"
        href="/"
      >
        <div>
          <IconHome stroke={2} size={24} className="m-auto" />
        </div>

        <h1 className="text-lg font-semibold">Home</h1>
      </Link>

      <div className="flex flex-row justify-start items-center gap-3 p-4  hover:scale-101 transition duration-300">
        <div>
          <IconSearch stroke={2} size={24} className="m-auto cursor-default" />
        </div>

        <h1 className="text-lg font-semibold">Search</h1>
      </div>
    </div>
  );
}
