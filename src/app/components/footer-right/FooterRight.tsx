import {
  IconDevicesPc,
  IconDice6,
  IconMenu2,
  IconMicrophone2,
  IconVolume2,
} from "@tabler/icons-react";

export default function FooterRight() {
  const buttonsClassName =
    "m-auto hover:scale-105 hover:text-white transition duration-300";

  return (
    <div className="flex flex-row items-center gap-3 p-3">
      <IconMicrophone2 stroke={2} size={20} className={buttonsClassName} />
      <IconMenu2 stroke={2} size={20} className={buttonsClassName} />
      <IconDevicesPc stroke={2} size={20} className={buttonsClassName} />
      <IconVolume2 stroke={2} size={20} className={buttonsClassName} />
      <div className="border-2 border-[#535353] rounded-full w-30"></div>
      <IconDice6 stroke={2} size={20} className={buttonsClassName} />
    </div>
  );
}
