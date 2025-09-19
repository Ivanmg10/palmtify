import { BandData } from "@/types";
import Image from "next/image";

interface HomePageTopSectionProps {
  bandsData: BandData[];
}

export default function HomePageTopSection({
  bandsData,
}: HomePageTopSectionProps) {
  return (
    <div className="w-full mb-4 grid-cols-4 gap-4 grid justify-items-center mt-8">
      {bandsData.slice(0, 8).map(({ band, artist }) => (
        <div
          key={band}
          className="rounded-lg overflow-hidden shadow-lg bg-[#212121] text-[#FFFFFF] mb-2 hover:scale-103 transition-transform duration-300 flex w-full h-24"
        >
          <Image
            className="object-cover"
            src={artist?.strArtistThumb || "/placeholder.png"}
            alt={artist?.strArtist || band}
            width={100}
            height={100}
          />
          <div className="px-6 py-4 grow flex items-center">
            <div className="font-bold text-l">{artist?.strArtist}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
