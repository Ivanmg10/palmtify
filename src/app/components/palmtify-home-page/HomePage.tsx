import {
  // getAlbumsByArtist,
  getArtist,
  // getTracksByAlbum,
} from "@/app/utils/apliClient";
import Image from "next/image";
import HomePageSliders from "../home-page-sliders/HomePageSliders";

// async function handleSearch(name: string) {
//   const artist = await getArtist(name);
//   if (!artist) return;

//   const albums = await getAlbumsByArtist(artist.idArtist);
//   const tracks =
//     albums.length > 0 ? await getTracksByAlbum(albums[0].idAlbum) : [];

//   console.log(artist);
//   return { artist, albums, tracks };
// }

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

  const bandsData = await Promise.all(
    someBands.map(async (band) => {
      const artist = await getArtist(band);
      return { band, artist };
    })
  );

  return (
    <div className="w-full p-4 pl-12 pr-12 bg-[#181818] rounded-lg flex flex-col items-center">
      <div className="flex flex-row justify-start gap-2 mt-4 w-full h-[3vh]">
        <button className="bg-[#212121] text-white rounded-full pl-5 pr-5 hover:bg-[#282828] transition duration-300">
          All
        </button>

        <button className="bg-[#212121] text-white  rounded-full pl-5 pr-5 hover:bg-[#282828] transition duration-300">
          Music
        </button>

        <button className="bg-[#212121] text-white rounded-full pl-5 pr-5  hover:bg-[#282828] transition duration-300">
          Podcasts
        </button>
      </div>

      <div className="w-full mb-4 grid-cols-4 gap-4 grid justify-items-center mt-8">
        {bandsData.map(({ band, artist }) => (
          <div
            key={band}
            className="rounded overflow-hidden shadow-lg bg-[#212121] text-[#FFFFFF] mb-2 hover:scale-103 transition-transform duration-300 flex w-full h-24"
          >
            <Image
              className="object-cover"
              src={artist?.strArtistThumb || "/placeholder.png"}
              alt={artist?.strArtist || band}
              width={100}
              height={100}
            />
            <div className="px-6 py-4 grow">
              <div className="font-bold text-xl mb-2">{artist?.strArtist}</div>
            </div>
          </div>
        ))}
      </div>

      <HomePageSliders />
    </div>
  );
}
