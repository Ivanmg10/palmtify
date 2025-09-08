import { IconList, IconSearch, IconPlus } from "@tabler/icons-react";

export default function LateralComponentCards({
  isSmall,
}: {
  isSmall: boolean;
}) {
  return (
    <>
      {!isSmall ? (
        <div className="flex flex-row items-center justify-around ">
          <h1 className="text-lg font-semibold w-[60%]">Your Library</h1>
          <button className="bg-[#212121] text-white px-4 py-2 rounded-full w-[35%] hover:bg-[#282828] transition duration-300">
            Create
          </button>
        </div>
      ) : (
        <h1>
          <button className="bg-[#212121] text-white px-4 py-2 rounded-full w-full hover:bg-[#282828] transition duration-300">
            <IconPlus stroke={2} size={20} className="m-auto" />
          </button>
        </h1>
      )}

      {!isSmall && (
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
      )}

      {!isSmall && (
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
      )}
    </>
  );
}
