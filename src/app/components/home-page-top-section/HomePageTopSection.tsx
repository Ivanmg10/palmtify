import { getAlbumsByArtistAndAlbum } from "@/app/utils/apliClient";
import { BandData } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Albums {
  id: number;
  artist: string;
  album: string;
}

interface HomePageTopSectionProps {
  albums?: Albums[];
}

export default async function HomePageTopSection({
  albums,
}: HomePageTopSectionProps) {
  const albumsData = albums
    ? await Promise.all(
        albums.map(async (band) => {
          const album = await getAlbumsByArtistAndAlbum(
            band.artist,
            band.album
          );
          return { album: album[0] };
        })
      )
    : [];

  // Fisher-Yates shuffle + slice a 8
  function shuffleAndPick8<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, 8);
  }

  // Barajamos una sola vez
  const shuffledAlbums = shuffleAndPick8(albumsData);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-start gap-2 mt-4">
        <button className="bg-[#212121] text-white rounded-full pl-5 pr-5 hover:bg-[#282828] transition duration-300 px-x py-1">
          All
        </button>

        <button className="bg-[#212121] text-white  rounded-full pl-5 pr-5 hover:bg-[#282828] transition duration-300">
          Music
        </button>

        <button className="bg-[#212121] text-white rounded-full pl-5 pr-5  hover:bg-[#282828] transition duration-300">
          Podcasts
        </button>
      </div>

      <div className="w-full mb-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 grid justify-items-center mt-8 cursor-pointer">
        {shuffledAlbums.map(({ album }) => (
          <Link
            key={album.idAlbum}
            className="rounded-lg overflow-hidden shadow-lg bg-[#212121] text-[#FFFFFF] mb-2 hover:scale-103 transition-transform duration-300 w-full flex justify-between"
            href={`/albums/${album.idAlbum}`}
          >
            <div className="relative sm:min-w-1/5 min-w-1/5 aspect-square flex-shrink-0">
              <Image
                src={album?.strAlbumThumb || "/placeholder.png"}
                alt="?"
                fill
                className="flex justify-center items-center object-cover"
              />
            </div>
            <div className="pl-6 py-4 grow flex items-center">
              <div className="font-bold text-l">{album?.strAlbum}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
