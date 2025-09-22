import AlbumsTop from "@/app/components/albums-top/AlbumsTop";
import { getAlbumsByArtistId, getArtistById } from "@/app/utils/apliClient";

type Props = {
  params: { idArtist: string };
};

export default async function ArtistPage({ params }: Props) {
  const { idArtist } = await params;

  const artist = await getArtistById(idArtist);
  const albums = await getAlbumsByArtistId(artist?.idArtist || "Nirvana");

  console.log(albums);
  console.log(artist?.idArtist);

  return (
    <div>
      <AlbumsTop album={albums} artist={artist} />
    </div>
  );
}
