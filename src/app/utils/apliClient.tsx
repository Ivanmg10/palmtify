import { Album, Artist } from "@/types";

export type Track = {
  idTrack: string;
  strTrack: string;
};

// Función genérica de fetch para la API
async function fetchFromAPI<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(endpoint, { next: { revalidate: 60 } });

    if (!res.ok) {
      console.error(`Error fetching ${endpoint}: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data as T;
  } catch (error) {
    console.error(`Fetch failed for ${endpoint}:`, error);
    return null;
  }
}

// Funciones específicas usando la genérica

export async function getArtist(name: string): Promise<Artist | null> {
  const data = await fetchFromAPI<{ artists?: Artist[] }>(
    `https://theaudiodb.com/api/v1/json/123/search.php?s=${encodeURIComponent(
      name
    )}`
  );

  return data?.artists?.[0] ?? null;
}

export async function getAlbumsByArtist(id: string): Promise<Album[]> {
  const data = await fetchFromAPI<{ album?: Album[] }>(
    `https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${encodeURIComponent(
      id
    )}`
  );

  return Array.isArray(data?.album) ? data.album : [];
}

export async function getAlbumsByArtistAndAlbum(
  id: string,
  album: string
): Promise<Album[]> {
  const data = await fetchFromAPI<{ album?: Album[] }>(
    `https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${encodeURIComponent(
      id
    )}&a=${encodeURIComponent(album)}`
  );

  return Array.isArray(data?.album) ? data.album : [];
}

export async function getTracksByAlbum(id: string): Promise<Track[]> {
  const data = await fetchFromAPI<{ track?: Track[] }>(
    `https://theaudiodb.com/api/v1/json/123/track.php?m=${encodeURIComponent(
      id
    )}`
  );

  return Array.isArray(data?.track) ? data.track : [];
}
