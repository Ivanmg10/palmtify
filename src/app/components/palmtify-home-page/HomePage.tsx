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
    <div className="p-4 pl-12 pr-12 bg-[#181818] rounded-lg flex flex-col items-center overflow-x-hidden">
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
