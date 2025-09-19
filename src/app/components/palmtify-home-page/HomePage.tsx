import { getArtist } from "@/app/utils/apliClient";
import Image from "next/image";
import HomePageSliders from "../home-page-sliders/HomePageSliders";
import {
  hipHop90s,
  jumpBackIn,
  madeForYou,
  recentlyPlayed,
  someBands,
} from "@/app/constants/albums";
import HomePageTopSection from "../home-page-top-section/HomePageTopSection";

export default async function HomePage() {
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

      <HomePageTopSection bandsData={bandsData} />

      <HomePageSliders
        title={"You"}
        subtitle={"Made for"}
        albums={madeForYou}
      />

      <HomePageSliders
        title={"Recently played"}
        subtitle={""}
        albums={recentlyPlayed}
      />

      <HomePageSliders
        title={"Jump back in"}
        subtitle={""}
        albums={jumpBackIn}
      />

      <HomePageSliders
        title={"Your favorite artist"}
        subtitle={""}
        albums={jumpBackIn}
        bandsData={bandsData}
      />

      <HomePageSliders
        title={"Hip Hop 90's"}
        subtitle={""}
        albums={hipHop90s}
      />
    </div>
  );
}
