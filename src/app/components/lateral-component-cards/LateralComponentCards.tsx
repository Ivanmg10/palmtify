import Image, { StaticImageData } from "next/image";

type Playlist = {
  id: string;
  tittle: string;
  description: string;
  image: StaticImageData;
};

export default function LateralComponentCards({
  playlists,
  isSmall,
}: {
  playlists: Array<Playlist>;
  isSmall: boolean;
}) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {isSmall
        ? playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-[#212121] text-white p-2 rounded-lg flex gap-3 cursor-pointer hover:bg-[#282828] transition duration-300 items-center justify-center"
            >
              <Image
                key={playlist.id}
                src={playlist.image}
                alt={playlist.tittle}
                width={150}
                height={150}
              />
            </div>
          ))
        : playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-[#212121] text-white p-4 rounded-lg flex gap-3 cursor-pointer hover:bg-[#282828] transition duration-300 items-center"
            >
              <Image
                key={playlist.id}
                src={playlist.image}
                alt={playlist.tittle}
                width={50}
                height={50}
              />
              <div>
                <p>{playlist.tittle}</p>
                <p className="text-sm text-[#B3B3B3]">{playlist.description}</p>
              </div>
            </div>
          ))}
    </div>
  );
}
