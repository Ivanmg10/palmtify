import { BandData } from "@/types";
import Image from "next/image";

interface HomePageTopSectionProps {
  bandsData: BandData[];
}

export default function HomePageTopSection({
  bandsData,
}: HomePageTopSectionProps) {
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

      <div className="w-full mb-4  grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 grid justify-items-center mt-8">
        {bandsData.slice(0, 8).map(({ band, artist }) => (
          <div
            key={band}
            className="rounded-lg overflow-hidden shadow-lg bg-[#212121] text-[#FFFFFF] mb-2 hover:scale-103 transition-transform duration-300 w-full flex justify-between"
          >
            <div className="relative sm:min-w-1/5 min-w-1/5 aspect-square flex-shrink-0">
              <Image
                src={artist?.strArtistThumb || "/placeholder.png"}
                alt={artist?.strArtist || band}
                fill
                className="object-cover"
              />
            </div>
            <div className="pl-6 py-4 grow flex items-center">
              <div className="font-bold text-l">{artist?.strArtist}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
