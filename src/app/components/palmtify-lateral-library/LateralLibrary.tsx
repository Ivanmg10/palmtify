import LateralComponentCards from "../lateral-component-cards/LateralComponentCards";
import LateralComponentTop from "../lateral-component-top/LateralComponentTop";
import { PalmtifyLateralLibraryProps } from "@/types";

export default function PalmtifyLateralLibrary({
  recentlyPlayedArray,
}: PalmtifyLateralLibraryProps) {
  // const isSmall = width < 180;

  return (
    <div className="relative overflow-auto rounded-lg  w-[400px] max-w-[400px] hide-scrollbar">
      <div className="flex flex-col gap-2">
        <LateralComponentTop />
        <LateralComponentCards recentlyPlayedArray={recentlyPlayedArray} />
      </div>
    </div>
  );
}
