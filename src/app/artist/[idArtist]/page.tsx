import AlbumsPopular from "@/app/components/albums-popular/AlbumsPopular";
import AlbumsTop from "@/app/components/albums-top/AlbumsTop";
import {
  getAlbumsByArtist,
  getAlbumsByArtistId,
  getAlbumsById,
  getArtistById,
  getTracksByAlbum,
  Track,
} from "@/app/utils/apliClient";
import { TrackShort } from "@/types";

type Props = {
  params: { idArtist: string };
};

export default async function ArtistPage({ params }: Props) {
  const { idArtist } = await params;

  const artist = await getArtistById(idArtist);
  const albums = await getAlbumsByArtistId(artist?.idArtist || "Nirvana");
  const allAlbums = await getAlbumsByArtist(artist?.strArtist || "Nirvana");
  const allTracks = (
    await Promise.all(allAlbums.map((album) => getTracksByAlbum(album.idAlbum)))
  ).flat();

  const topTracks = await shortAllTracksByPlays(allTracks);

  async function getAlbumCover(album: string): Promise<string> {
    const albumData = await getAlbumsById(album);
    return albumData[0].strAlbumThumb;
  }

  function uniqueTracksById(tracks: TrackShort[]): TrackShort[] {
    const trackMap = new Map<string, TrackShort>();

    tracks.forEach((track) => {
      if (!trackMap.has(track.name)) {
        trackMap.set(track.name, track);
      }
    });

    return Array.from(trackMap.values());
  }

  async function shortAllTracksByPlays(tracks: Track[]): Promise<TrackShort[]> {
    const newAllTracks: TrackShort[] = await Promise.all(
      tracks.map(async (track) => ({
        id: track.idTrack,
        artist: track.strArtist,
        name: track.strTrack,
        album: track.strAlbum,
        albumCover: await getAlbumCover(track.idAlbum),
        duration: Number(track.intDuration),
        plays: Number(track.intTotalPlays) || 0,
      }))
    );

    const uniqueTracks = uniqueTracksById(newAllTracks);

    return uniqueTracks.sort((a, b) => b.plays - a.plays).slice(0, 5);
  }

  return (
    <div>
      <AlbumsTop album={albums} artist={artist} />

      <AlbumsPopular
        albums={allAlbums}
        allTracks={allTracks}
        topTracks={topTracks}
      />
    </div>
  );
}
