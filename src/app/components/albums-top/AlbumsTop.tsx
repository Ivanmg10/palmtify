"use client";

import Image from "next/image";
import AlbumsButtons from "../albums-buttons/AlbumsButtons";
import { Track } from "@/app/utils/apliClient";
import { Album, Artist } from "@/types";
import { formatMilliseconds } from "@/app/utils/timeUtils";
import Link from "next/link";

type AlbumsTableProps = {
  tracks?: Track[];
  album: Album[];
  artist: Artist | null;
};

export default function AlbumsTop({ tracks, album, artist }: AlbumsTableProps) {
  const getAllMilliseconds = () => {
    let total = 0;
    tracks?.forEach((track) => {
      total += Number(track.intDuration);
    });

    const minutes = formatMilliseconds(total);

    return minutes;
  };

  return (
    <div>
      <div className="relative flex flex-row justify-start items-end gap-2 rounded-t-lg overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${
              tracks ? album[0].strAlbumThumb : artist?.strArtistThumb
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px) brightness(0.3)",
            zIndex: 0,
          }}
        />

        <div
          className={`relative z-10 flex flex-row items-end gap-2 p-5 ${
            !tracks && "h-96"
          }`}
        >
          {tracks && (
            <Image
              src={album[0].strAlbumThumb}
              alt="album"
              width={300}
              height={300}
              className="rounded-lg"
            />
          )}

          <div className="flex flex-col justify-center gap-1 pl-7">
            {tracks && <p className="text-[#b3b3b3]">Album</p>}

            <p className={`text-8xl font-bold py-1 ${!tracks && "text-white"}`}>
              {tracks ? album[0].strAlbum : artist?.strArtist}
            </p>
            {tracks && (
              <div className="flex flex-row gap-2 py-1 items-center">
                {artist && (
                  <Link
                    className="flex flex-row items-center gap-1"
                    href={`/artist/${artist.idArtist}`}
                  >
                    <Image
                      src={artist.strArtistThumb}
                      alt="artist"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <p>{album[0].strArtist} •</p>
                  </Link>
                )}
                <p className="text-[#b3b3b3]">{album[0].intYearReleased} •</p>
                <p className="text-[#b3b3b3]">{tracks.length} songs,</p>
                <p className="text-[#b3b3b3]">{getAllMilliseconds()}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AlbumsButtons />
    </div>
  );
}
