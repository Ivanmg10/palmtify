import {
  getAlbumsByArtist,
  getArtist,
  getTracksByAlbum,
} from "@/app/utils/apliClient";
import Image from "next/image";

async function handleSearch(name: string) {
  const artist = await getArtist(name);
  if (!artist) return;

  const albums = await getAlbumsByArtist(artist.idArtist);
  const tracks =
    albums.length > 0 ? await getTracksByAlbum(albums[0].idAlbum) : [];

  console.log(artist);
  return { artist, albums, tracks };
}

export default async function HomePage() {
  const someBands = [
    "Nirvana",
    "Metallica",
    "Pink Floyd",
    "Judas Priest",
    "Queen",
    "The Beatles",
    "Led Zeppelin",
    "The Rolling Stones",
  ];

  // Espera a que todas las búsquedas terminen
  const bandsData = await Promise.all(
    someBands.map(async (band) => {
      const artist = await getArtist(band);
      return { band, artist };
    })
  );

  return (
    <div className="w-full p-4 bg-[#181818] rounded-lg flex flex-wrap gap-4">
      <div className="w-full mb-4 flex justify-start items-center flex-wrap gap-5">
        {bandsData.map(({ band, artist }) => (
          <div
            key={band}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-[#212121] text-[#FFFFFF] mb-4 hover:scale-103 transition-transform duration-300"
          >
            <Image
              className="w-full"
              src={artist?.strArtistThumb || "/placeholder.png"}
              alt={artist?.strArtist || band}
              width={400}
              height={225}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{artist?.strArtist}</div>
              <p className="text-base">
                {artist?.strGenre} - Formed in {artist?.intFormedYear}
              </p>
            </div>
            {artist?.strGenre && (
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {`#${artist.strGenre.replace(/\s+/g, "").toLowerCase()}`}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
