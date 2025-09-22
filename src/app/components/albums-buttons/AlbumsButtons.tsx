import {
  IconArrowsShuffle,
  IconCircleArrowDown,
  IconCirclePlus,
  IconDots,
  IconList,
  IconPlayerPlayFilled,
  IconSearch,
} from "@tabler/icons-react";

export default function AlbumsButtons() {
  const buttonsClassName =
    "w-8 h-8 cursor-pointer transition duration-300 hover:scale-125";

  return (
    <div className="flex justify-between mt-3 p-5 text-[#b3b3b3]">
      <div className="flex flex-row gap-6 items-center">
        <IconPlayerPlayFilled
          stroke={2}
          className="bg-[#1db954] rounded-full w-13 h-13 p-3 text-black cursor-pointer transition duration-300 hover:scale-110 "
        />
        <IconArrowsShuffle stroke={2} className={buttonsClassName} />
        <IconCirclePlus stroke={2} className={buttonsClassName} />
        <IconCircleArrowDown stroke={2} className={buttonsClassName} />
        <IconDots stroke={2} className={buttonsClassName} />
      </div>

      <div className="flex flex-row gap-2 items-center">
        <IconSearch
          stroke={2}
          className="w-6 h-6 cursor-pointer transition duration-300 hover:scale-125"
        />
        <div className="flex flex-row gap-2 items-center ml-3 hover:text-white cursor-pointer">
          <p className="">Orden personalizado</p>
          <IconList stroke={2} className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
