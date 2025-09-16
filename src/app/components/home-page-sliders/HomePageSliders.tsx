import { getAlbumsByArtistAndAlbum } from "@/app/utils/apliClient";
import Image from "next/image";
import "./style.css";

interface Albums {
  id: number;
  artist: string;
  album: string;
}

interface HomePageSlidersProps {
  title: string;
  subtitle: string;
  albums?: Albums[];
}

export default async function HomePageSliders({
  title,
  subtitle,
  // bandsData,
  albums,
}: HomePageSlidersProps) {
  const albumsData = albums
    ? await Promise.all(
        albums.map(async (band) => {
          const album = await getAlbumsByArtistAndAlbum(
            band.artist,
            band.album
          );
          return { album };
        })
      )
    : [];

  return (
    <div className="w-full flex flex-col justify-start items-start mt-8 mb-4 relative">
      <p className="text-white">{subtitle}</p>
      <h1 className="text-white text-2xl font-bold">{title}</h1>

      <div className="flex flex-row flex-nowrap overflow-x-auto justify-around albums-scroll">
        {albumsData.map((album) => (
          <div
            className="mt-4 hover:bg-[#282828] transition duration-300 p-3 rounded-lg cursor-pointer flex-shrink-0"
            key={album?.album[0]?.idAlbum}
          >
            <Image
              className="object-cover rounded-lg"
              src={album?.album[0]?.strAlbumThumb || "/placeholder.png"}
              alt={album?.album[0]?.idAlbum}
              width={200}
              height={200}
            />

            <p className="text-[#B3B3B3] mt-3">{album?.album[0]?.strAlbum}</p>
          </div>
        ))}

        {albums && (
          <div className="pointer-events-none absolute mt-7 right-0  w-48 bg-gradient-to-l from-black/80 to-transparent h-[200px]"></div>
        )}
      </div>
    </div>
  );
}
