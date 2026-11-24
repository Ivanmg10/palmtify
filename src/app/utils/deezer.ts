import type { Album, Artist, Track } from "@/types";

export type DeezerArtist = {
  id: number;
  name: string;
  picture_xl?: string;
  picture_big?: string;
  picture?: string;
  nb_album?: number;
  nb_fan?: number;
};

export type DeezerAlbum = {
  id: number;
  title: string;
  cover_xl?: string;
  cover_big?: string;
  cover?: string;
  release_date?: string;
  record_type?: string;
  artist?: DeezerArtist;
};

export type DeezerTrack = {
  id: number;
  title: string;
  duration: number;
  rank?: number;
  artist?: DeezerArtist;
};

export type DeezerListResponse<T> = {
  data?: T[];
  total?: number;
  next?: string | null;
};

export type DeezerAlbumDetail = DeezerAlbum & {
  tracks?: DeezerListResponse<DeezerTrack>;
};

const DEEZER_BASE_URL = "https://api.deezer.com";

export async function fetchDeezer<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${DEEZER_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Error fetching Deezer ${endpoint}: ${res.status}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`Fetch failed for Deezer ${endpoint}:`, error);
    return null;
  }
}

function firstImage(...urls: (string | undefined)[]): string {
  return urls.find((url) => !!url) ?? "";
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function mapDeezerArtist(artist: DeezerArtist): Artist {
  return {
    idArtist: String(artist.id),
    idArtis: String(artist.id),
    strArtist: artist.name,
    strArtistThumb: firstImage(
      artist.picture_xl,
      artist.picture_big,
      artist.picture
    ),
    intBornYear: "",
    strStyle: "",
    strGenre: "",
    strBiographyEN: "",
  };
}

export function mapDeezerAlbum(
  album: DeezerAlbum,
  artist?: DeezerArtist | null
): Album {
  const owner = artist ?? album.artist;
  const year = album.release_date ? album.release_date.slice(0, 4) : null;

  return {
    idAlbum: String(album.id),
    idArtist: String(owner?.id ?? ""),
    strArtist: owner?.name ?? "",
    strAlbum: album.title,
    strAlbumThumb: firstImage(album.cover_xl, album.cover_big, album.cover),
    intYearReleased: year,
    strYear: year ?? "",
    strReleaseFormat: album.record_type
      ? capitalize(album.record_type)
      : "Album",
  };
}

export function mapDeezerTrack(
  track: DeezerTrack,
  album: { id: number | string; title: string; cover?: string }
): Track {
  return {
    idTrack: String(track.id),
    strTrack: track.title,
    idArtist: String(track.artist?.id ?? ""),
    strArtist: track.artist?.name ?? "",
    idAlbum: String(album.id),
    strAlbum: album.title,
    intDuration: track.duration * 1000,
    strTrackThumb: album.cover ?? "",
    intTotalPlays: track.rank ?? 0,
    intTotalListeners: 0,
  };
}
