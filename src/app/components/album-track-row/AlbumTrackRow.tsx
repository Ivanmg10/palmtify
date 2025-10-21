"use client";

import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { usePlayer } from "../../context/PlayerContext";
import { formatMilliseconds } from "@/app/utils/timeUtils";
import { Track } from "@/app/utils/apliClient";
import { Album } from "@/types";

interface Props {
  track: Track;
  album: Album[];
  index: number;
}

export default function AlbumTrackRow({ track, album, index }: Props) {
  const { setCurrentTrack, currentTrack } = usePlayer();

  return (
    <tr
      key={track.idTrack}
      onClick={() => setCurrentTrack(track, album)}
      className="group hover:bg-[#282828] transition duration-300 cursor-pointer"
    >
      <td className="flex items-center">
        <p
          className={`cursor-pointer text-xl text-${
            currentTrack?.idTrack === track.idTrack ? "[#1ed760]" : "white"
          } group p-5`}
        >
          <span className="inline-block w-[1em] h-[1em] text-center group-hover:hidden">
            {index + 1}
          </span>
          <span className="hidden group-hover:inline-flex items-center justify-center w-[1em] h-[1em]">
            {currentTrack?.idTrack === track.idTrack ? (
              <IconPlayerPauseFilled className="w-[1em] h-[1em]" stroke={2} />
            ) : (
              <IconPlayerPlayFilled className="w-[1em] h-[1em]" stroke={2} />
            )}
          </span>
        </p>

        <div className="p-2">
          <p
            className={`text-${
              currentTrack?.idTrack === track.idTrack ? "[#1ed760]" : "white"
            }`}
          >
            {track.strTrack}
          </p>
          <p className="">{track.strArtist}</p>
        </div>
      </td>

      <td className="p-2">{track.strAlbum}</td>
      <td className="p-2">{formatMilliseconds(track.intDuration)}</td>
    </tr>
  );
}
