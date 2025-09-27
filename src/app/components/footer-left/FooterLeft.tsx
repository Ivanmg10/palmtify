import Image from "next/image";
import Link from "next/link";
import pfp from "../../../../public/pfp.jpg";

export default function FooterLeft() {
  return (
    <div className="flex flex-row items-end gap-3 p-2">
      <Image
        src={pfp}
        alt="spotify"
        className="rounded-lg"
        width={50}
        height={50}
      />
      <div className="flex flex-col justify-end p-1">
        <Link href="/" className="text-semibold text-sm text-white">
          Cancion
        </Link>
        <Link href="/" className="text-sm w-fit">
          <span className="leading-none w-auto hover:text-white hover:border-b-1 border-b-white transition duration-300">
            Artista
          </span>
        </Link>
      </div>
    </div>
  );
}
