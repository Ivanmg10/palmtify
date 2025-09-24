import { formatMilliseconds, formatNumber } from "@/app/utils/timeUtils";
import { TrackShort } from "@/types";
import Image from "next/image";

type AlbumsPopularProps = {
  topTracks: TrackShort[];
};

export default function AlbumsPopular({ topTracks }: AlbumsPopularProps) {
  return (
    <div className="">
      <p className="text-2xl text-white pb-5">Popular songs</p>
      <div className="flex flex-col flex-wrap">
        {topTracks.map((track, index) => (
          <div
            key={track.id}
            className="flex flex-row justify-between hover:bg-[#282828] transition duration-300 h-20"
          >
            <div className="flex flex-row items-center gap-5 p-3 rounded-lg w-1/3">
              <p className="px-2 cursor-pointer">{index + 1}</p>
              <Image
                src={track.albumCover}
                alt="?"
                width={50}
                height={50}
                className="flex justify-center items-center"
              />
              <div>
                <p className="text-white">{track.name}</p>
                <p className="text-[#B3B3B3]">{track.artist}</p>
              </div>
            </div>

            <p className="flex items-center">{formatNumber(track.plays)}</p>

            <div className="flex flex-row items-center gap-4 pr-10">
              <p>{formatMilliseconds(track.duration)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
