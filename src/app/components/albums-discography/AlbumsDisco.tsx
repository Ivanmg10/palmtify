import { Album } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface AlbumsDiscographyProps {
  albums: Album[];
}

export default function AlbumsDisco({ albums }: AlbumsDiscographyProps) {
  return (
    <div className="">
      <p className="text-2xl text-white pb-5">Discography</p>
      <div className="flex flex-row flex-nowrap overflow-x-auto hide-scrollbar justify-start w-full">
        {albums.map((album) => (
          <Link
            key={album.idAlbum}
            className="mt-4 hover:bg-[#282828] transition duration-300 p-3 rounded-lg cursor-pointer flex-shrink-0"
            href={`/albums/${album.idAlbum}`}
          >
            <Image
              src={album.strAlbumThumb}
              alt="?"
              width={200}
              height={200}
              className="flex justify-center items-center rounded-lg"
            />
            <div className="w-[200px]">
              <p className="text-white pt-1">{album.strAlbum}</p>
              <div className="flex flex-row gap-1">
                <p className="text-[#B3B3B3]">{album.intYearReleased} •</p>
                <p className="text-[#B3B3B3]">{album.strReleaseFormat}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
