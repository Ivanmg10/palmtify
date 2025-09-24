import { RecentlyPlayedItem } from "@/types";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Playlist = {
  id: string;
  tittle: string;
  description: string;
  image: StaticImageData;
};

export default function LateralComponentCards({
  isSmall,
  recentlyPlayedArray,
}: {
  isSmall: boolean;
  recentlyPlayedArray: RecentlyPlayedItem[];
}) {
  return (
    <div className="p-2 flex flex-col gap-2 scrollbar-none">
      {isSmall
        ? recentlyPlayedArray.map((playlist) => (
            <Link
              key={playlist.album[0].idAlbum}
              className="text-white p-2 rounded-lg flex gap-3 cursor-pointer hover:bg-[#282828] transition duration-300 items-center justify-center"
              href={`/albums/${playlist.album[0].idAlbum}`}
            >
              <Image
                key={playlist.id}
                src={playlist.album[0].strAlbumThumb}
                alt="?"
                width={150}
                height={150}
                className="flex justify-center items-center"
              />
            </Link>
          ))
        : recentlyPlayedArray.map((playlist) => (
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
                <p className="text-sm text-[#B3B3B3]">
                  Album • {playlist.artist}
                </p>
              </div>
            </Link>
          ))}
    </div>
  );
}
