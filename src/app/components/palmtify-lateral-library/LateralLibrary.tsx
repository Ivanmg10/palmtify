import { IconSearch, IconList } from "@tabler/icons-react";
import Image from "next/image";
import Nirvana from "../../../../public/nirvana.jpg";

const playlists = [
  {
    id: 1,
    title: "Nirvana",
    description: "Playlist Ivan",
    image: Nirvana,
  },
  {
    id: 2,
    title: "Nirvana",
    description: "Playlist Ivan",
    image: Nirvana,
  },
  {
    id: 3,
    title: "Nirvana",
    description: "Playlist Ivan",
    image: Nirvana,
  },
  {
    id: 4,
    title: "Nirvana",
    description: "Playlist Ivan",
    image: Nirvana,
  },
];

export default function PalmtifyLateralLibrary() {
  return (
    <div className="w-[15%] bg-[#191919] rounded-lg p-5">
      <div>
        <div className="flex flex-row items-center justify-around ">
          <h1 className="text-lg font-semibold w-[60%]">Your Library</h1>
          <button className="bg-[#212121] text-white px-4 py-2 rounded-full w-[35%] hover:bg-[#282828] transition duration-300">
            Create
          </button>
        </div>

        <div className="flex flex-row justify-start gap-2 mt-4">
          <button className="bg-[#212121] text-white p-1 rounded-full w-[35%] hover:bg-[#282828] transition duration-300">
            Playlists
          </button>

          <button className="bg-[#212121] text-white p-1 rounded-full w-[35%] hover:bg-[#282828] transition duration-300">
            Albums
          </button>

          <button className="bg-[#212121] text-white p-1 rounded-full w-[35%] hover:bg-[#282828] transition duration-300">
            Artists
          </button>
        </div>

        <div className="mt-4 flex justify-between w-full p-1">
          <IconSearch
            stroke={2}
            size={20}
            className="text-[#B3B3B3] cursor-pointer hover:text-white hover:scale-110 transition-transform duration-300"
          />
          <div className="flex gap-3 bg-transparent outline-none placeholder-[#B3B3B3] text-sm text-[#B3B3B3] cursor-pointer hover:text-white hover:scale-105 transition-transform duration-300">
            <p className="">Recents</p>
            <IconList stroke={2} size={20} className="" />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-[#212121] text-white p-4 rounded-lg flex gap-3 cursor-pointer hover:bg-[#282828] transition duration-300 items-center"
            >
              <Image
                key={playlist.id}
                src={playlist.image}
                alt={playlist.title}
                width={50}
                height={50}
              />
              <div>
                <p>{playlist.title}</p>
                <p className="text-sm text-[#B3B3B3]">{playlist.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
