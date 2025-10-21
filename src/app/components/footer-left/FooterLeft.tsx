import Image from "next/image";
import Link from "next/link";
import pfp from "../../../../public/pfp.jpg";

interface FooterLeftProps {
  track: string;
  artist: string;
  albumCover: string;
  albumLink: string;
  artistLink: string;
}

export default function FooterLeft({
  track,
  artist,
  albumCover,
  albumLink,
  artistLink,
}: FooterLeftProps) {
  return (
    <div className="flex flex-row items-end gap-3 p-2">
      <Image
        src={albumCover}
        alt="spotify"
        className="rounded-lg"
        width={50}
        height={50}
      />
      <div className="flex flex-col justify-end p-1">
        <Link
          href={`/albums/${albumLink}`}
          className="text-semibold text-sm text-white"
        >
          {track}
        </Link>
        <Link href={`/artist/${artistLink}`} className="text-sm w-fit">
          <span className="leading-none w-auto hover:text-white hover:border-b-1 border-b-white transition duration-300">
            {artist}
          </span>
        </Link>
      </div>
    </div>
  );
}
