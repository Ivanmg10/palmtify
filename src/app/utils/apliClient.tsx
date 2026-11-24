import { Album, Artist, Track } from "@/types";
import {
  DeezerAlbum,
  DeezerAlbumDetail,
  DeezerArtist,
  DeezerListResponse,
  fetchDeezer,
  mapDeezerAlbum,
  mapDeezerArtist,
  mapDeezerTrack,
} from "./deezer";

export type { Track };

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

export async function getArtist(name: string): Promise<Artist | null> {
  const data = await fetchDeezer<DeezerListResponse<DeezerArtist>>(
    `/search/artist?q=${encodeURIComponent(name)}`
  );

  const artist = data?.data?.[0];
  return artist ? mapDeezerArtist(artist) : null;
}

export async function getArtistById(id: string): Promise<Artist | null> {
  const artist = await fetchDeezer<DeezerArtist>(
    `/artist/${encodeURIComponent(id)}`
  );

  return artist ? mapDeezerArtist(artist) : null;
}

export async function getAlbumsByArtist(name: string): Promise<Album[]> {
  const artist = await getArtist(name);
  if (!artist) return [];

  return getAlbumsByArtistId(artist.idArtist);
}

export async function getAlbumsByArtistId(id: string): Promise<Album[]> {
  const [artist, albums] = await Promise.all([
    fetchDeezer<DeezerArtist>(`/artist/${encodeURIComponent(id)}`),
    fetchDeezer<DeezerListResponse<DeezerAlbum>>(
      `/artist/${encodeURIComponent(id)}/albums?limit=100`
    ),
  ]);

  if (!albums?.data) return [];
  return albums.data.map((album) => mapDeezerAlbum(album, artist));
}

export async function getAlbumsById(id: string): Promise<Album[]> {
  const album = await fetchDeezer<DeezerAlbumDetail>(
    `/album/${encodeURIComponent(id)}`
  );

  if (!album || album.id === undefined) return [];
  return [mapDeezerAlbum(album, album.artist)];
}

export async function getAlbumsByArtistAndAlbum(
  artistName: string,
  albumName: string
): Promise<Album[]> {
  const search = await fetchDeezer<DeezerListResponse<DeezerArtist>>(
    `/search/artist?q=${encodeURIComponent(artistName)}`
  );

  const artist = search?.data?.[0];
  if (!artist) return [];

  const albums = await fetchDeezer<DeezerListResponse<DeezerAlbum>>(
    `/artist/${artist.id}/albums?limit=100`
  );
  if (!albums?.data) return [];

  const wanted = normalizeTitle(albumName);
  const match =
    albums.data.find((album) => normalizeTitle(album.title) === wanted) ??
    albums.data.find((album) => normalizeTitle(album.title).includes(wanted));

  if (match) return [mapDeezerAlbum(match, artist)];

  // Fallback: búsqueda libre para álbumes que no están en la lista del
  // artista (recopilatorios, ediciones especiales, etc.)
  const fallback = await fetchDeezer<DeezerListResponse<DeezerAlbum>>(
    `/search/album?q=${encodeURIComponent(`${artistName} ${albumName}`)}`
  );

  const fallbackAlbum = fallback?.data?.[0];
  return fallbackAlbum ? [mapDeezerAlbum(fallbackAlbum, artist)] : [];
}

export async function getTracksByAlbum(id: string): Promise<Track[]> {
  const album = await fetchDeezer<DeezerAlbumDetail>(
    `/album/${encodeURIComponent(id)}`
  );

  if (!album?.tracks?.data) return [];
  return album.tracks.data.map((track) =>
    mapDeezerTrack(track, {
      id: album.id,
      title: album.title,
      cover: album.cover_xl ?? album.cover_big ?? album.cover,
    })
  );
}
