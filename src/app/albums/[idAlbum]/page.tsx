import {
  getAlbumsById,
  getArtistById,
  getTracksByAlbum,
} from "@/app/utils/apliClient";
import { notFound } from "next/navigation";
import AlbumsTable from "../../components/albums-table/AlbumsTable";
import AlbumsTop from "../../components/albums-top/AlbumsTop";

type Props = {
  params: Promise<{ idAlbum: string }>;
};

export default async function AlbumPage({ params }: Props) {
  const { idAlbum } = await params;
  const tracks = await getTracksByAlbum(idAlbum);
  const album = await getAlbumsById(idAlbum);

  if (album.length === 0) notFound();

  const artist = await getArtistById(album[0].idArtist);

  return (
    <div className="text-white bg-[#121212]">
      <AlbumsTop tracks={tracks} album={album} artist={artist} />

      <AlbumsTable tracks={tracks} album={album} />
    </div>
  );
}
