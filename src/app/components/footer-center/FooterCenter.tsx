import {
  IconArrowBigLeftLineFilled,
  IconArrowBigRightLineFilled,
  IconArrowsShuffle,
  IconPlayerPlayFilled,
  IconRepeat,
} from "@tabler/icons-react";

export default function FooterCenter() {
  const buttonsClassName =
    "m-auto hover:scale-105 hover:text-white transition duration-300";

  return (
    <div className="min-w-1/5 flex flex-col items-center gap-3">
      <div className="flex flex-row items-between gap-6">
        <IconArrowsShuffle stroke={2} size={24} className={buttonsClassName} />
        <div className="flex flex-row items-center gap-6">
          <IconArrowBigLeftLineFilled
            stroke={2}
            size={24}
            className={buttonsClassName}
          />
          <IconPlayerPlayFilled
            stroke={2}
            size={33}
            className="m-auto bg-white text-black rounded-full p-2 hover:scale-110 transition duration-200"
          />
          <IconArrowBigRightLineFilled
            stroke={2}
            size={24}
            className={buttonsClassName}
          />
        </div>
        <IconRepeat stroke={2} size={24} className={buttonsClassName} />
      </div>

      <div className="w-full">
        <div className="border-2 border-[#535353] rounded-full w-full"></div>
      </div>
    </div>
  );
}
