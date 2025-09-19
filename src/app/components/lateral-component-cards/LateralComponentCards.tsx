import { RecentlyPlayedItem } from "@/types";
import Image, { StaticImageData } from "next/image";

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
    <div className="p-2 flex flex-col gap-2">
      {isSmall
        ? recentlyPlayedArray.map((playlist) => (
            <div
              key={playlist.album[0].idAlbum}
              className="text-white p-2 rounded-lg flex gap-3 cursor-pointer hover:bg-[#282828] transition duration-300 items-center justify-center"
            >
              <Image
                key={playlist.id}
                src={playlist.album[0].strAlbumThumb}
                alt={playlist.album[0].idAlbum}
                width={150}
                height={150}
              />
            </div>
          ))
        : recentlyPlayedArray.map((playlist) => (
            <div
              key={playlist.album[0].idAlbum}
              className="text-white p-2 rounded-lg flex gap-3 cursor-pointer hover:bg-[#282828] transition duration-300 items-center"
            >
              <Image
                key={playlist.id}
                src={playlist.album[0].strAlbumThumb}
                alt={playlist.album[0].idAlbum}
                width={75}
                height={75}
                className="rounded-lg"
              />
              <div>
                <p>{playlist.album[0].strAlbum}</p>
                <p className="text-sm text-[#B3B3B3]">
                  Album • {playlist.artist}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
}
