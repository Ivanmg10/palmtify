import LateralComponentCards from "../lateral-component-cards/LateralComponentCards";
import LateralComponentTop from "../lateral-component-top/LateralComponentTop";
import { PalmtifyLateralLibraryProps } from "@/types";

export default function PalmtifyLateralLibrary({
  recentlyPlayedArray,
}: PalmtifyLateralLibraryProps) {
  // const isSmall = width < 180;

  return (
    <div className="relative overflow-auto rounded-lg bg-[#181818] w-[400px] max-w-[400px] hide-scrollbar">
      <div>
        <LateralComponentTop isSmall={false} />
        <LateralComponentCards
          isSmall={false}
          recentlyPlayedArray={recentlyPlayedArray}
        />
      </div>
    </div>
  );
}
