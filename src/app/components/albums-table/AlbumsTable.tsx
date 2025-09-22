import { Track } from "@/app/utils/apliClient";
import { formatMilliseconds } from "@/app/utils/timeUtils";
import { IconClockHour2, IconPlayerPlayFilled } from "@tabler/icons-react";

type AlbumsTableProps = {
  tracks: Track[];
};

export default async function AlbumsTable({ tracks }: AlbumsTableProps) {
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
            <tr
              key={track.idTrack}
              className="group hover:bg-[#282828] transition duration-300 "
            >
              <td className="flex items-center">
                <p className="cursor-pointer text-white text-xl group p-5">
                  <span className="inline-block w-[1em] h-[1em] text-center group-hover:hidden">
                    {index + 1}
                  </span>
                  <span className="hidden group-hover:inline-flex items-center justify-center w-[1em] h-[1em]">
                    <IconPlayerPlayFilled
                      className="w-[1em] h-[1em]"
                      stroke={2}
                    />
                  </span>
                </p>

                <div className="p-2">
                  <p className="text-white">{track.strTrack}</p>
                  <p>{track.strArtist}</p>
                </div>
              </td>

              <td className="p-2">{track.strAlbum}</td>
              <td className="p-2">{formatMilliseconds(track.intDuration)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
