import { RecentlyPlayedItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconLayoutGridFilled,
  IconPlus,
} from "@tabler/icons-react";

export default function LateralComponentCards({
  recentlyPlayedArray,
}: {
  recentlyPlayedArray: RecentlyPlayedItem[];
}) {
  return (
    <div className="p-2 flex flex-col gap-2 scrollbar-none flex-1 bg-[#121212]">
      <div className="p-2 text-lg font-semibold flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-3 cursor-default">
          <IconLayoutGridFilled stroke={2} size={24} className="m-auto" />
          <p>Your library</p>
        </div>

        <div className="flex flex-row items-center gap-5">
          <IconPlus
            stroke={2}
            size={24}
            className="m-auto cursor-default hover:scale-110 transition duration-300"
          />
          <IconArrowRight
            stroke={2}
            size={24}
            className="m-auto cursor-default hover:scale-110 transition duration-300"
          />
        </div>
      </div>

      {recentlyPlayedArray.map((playlist) => (
        <Link
          key={playlist.album[0].idAlbum}
          className="text-white p-2 rounded-lg flex gap-3 cursor-pointer hover:bg-[#282828] transition duration-300 items-center"
          href={`/albums/${playlist.album[0].idAlbum}`}
        >
          <Image
            key={playlist.id}
            src={playlist.album[0].strAlbumThumb}
            alt="?"
            width={75}
            height={75}
            className="flex justify-center items-center rounded-lg"
          />
          <div>
            <p>{playlist.album[0].strAlbum}</p>
            <p className="text-sm text-[#B3B3B3]">Album • {playlist.artist}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
