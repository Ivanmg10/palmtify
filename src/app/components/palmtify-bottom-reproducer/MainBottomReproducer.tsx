"use client";

import FooterLeft from "../footer-left/FooterLeft";
import FooterCenter from "../footer-center/FooterCenter";
import FooterRight from "../footer-right/FooterRight";
import { usePlayer } from "@/app/context/PlayerContext";

export default function MainBottomReproducer() {
  const { currentTrack, currentAlbum } = usePlayer();

  if (!currentTrack) return null;
  return (
    <div className="flex flex-row justify-between items-center p-3 text-[#b3b3b3]">
      <FooterLeft
        track={currentTrack.strTrack}
        artist={currentTrack.strArtist}
        albumCover={currentAlbum ? currentAlbum[0].strAlbumThumb : ""}
        albumLink={currentAlbum ? currentAlbum[0].idAlbum : ""}
        artistLink={currentTrack.idArtist}
      />

      <FooterCenter duration={currentTrack.intDuration} />

      <FooterRight />
    </div>
  );
}
