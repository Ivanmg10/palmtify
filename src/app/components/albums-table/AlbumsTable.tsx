import { Track } from "@/app/utils/apliClient";

import { IconClockHour2 } from "@tabler/icons-react";
import AlbumTrackRow from "../album-track-row/AlbumTrackRow";
import { Album } from "@/types";

type AlbumsTableProps = {
  tracks: Track[];
  album: Album[];
};

export default async function AlbumsTable({ tracks, album }: AlbumsTableProps) {
  return (
    <div className="p-4">
      <table className="table-auto w-full text-left text-[#b3b3b3]">
        <thead className="">
          <tr className="border-b border-[#535353]">
            <th className="flex flex-row items-center pb-3">
              <p className="pl-6">#</p>
              <p className="pl-2">Tittle</p>
            </th>
            <th className="pl-2">Album</th>
            <th className="pl-2">
              <IconClockHour2 stroke={2} />
            </th>
          </tr>
        </thead>
        <tbody className="pt-3">
          {tracks.map((track, index) => (
            <AlbumTrackRow
              key={track.idTrack}
              track={track}
              index={index}
              album={album}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
