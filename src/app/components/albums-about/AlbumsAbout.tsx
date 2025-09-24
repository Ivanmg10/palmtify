import { Artist } from "@/types";
import Image from "next/image";

interface AlbumsAboutProps {
  artist: Artist | null;
}

export default function AlbumsAbout({ artist }: AlbumsAboutProps) {
  return (
    <div className="relative">
      <p className="text-2xl text-white pb-5">About</p>

      <div className="flex flex-row gap-5">
        <div className="relative hover:scale-101 transition duration-300 w-1/3 aspect-square">
          <Image
            src={artist?.strArtistThumb || "/placeholder.png"}
            alt="?"
            fill
            style={{ objectFit: "initial" }}
            className="rounded-lg flex justify-center items-center"
          />

          <div className="absolute inset-0 flex items-end  justify-left">
            <h1 className="text-white text-3xl font-bold p-5 cursor-default">
              {artist?.strArtist}
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-5 w-2/3">
          <p className="text-white cursor-default">{artist?.strBiographyEN}</p>
        </div>
      </div>
    </div>
  );
}
