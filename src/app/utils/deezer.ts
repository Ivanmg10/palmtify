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
const DEEZER_REVALIDATE_SECONDS = 3600;
const RETRYABLE_STATUS = 429;
const MAX_ATTEMPTS = 3;
const CACHE_TTL_MS = 60 * 60 * 1000;
const MAX_CONCURRENT_REQUESTS = 5;

type CacheEntry = { data: unknown; expiresAt: number };

const responseCache = new Map<string, CacheEntry>();
const inflightRequests = new Map<string, Promise<unknown>>();
const waitQueue: Array<() => void> = [];
let activeRequests = 0;

export function clearDeezerCache(): void {
  responseCache.clear();
}

async function acquireSlot(): Promise<void> {
  if (activeRequests < MAX_CONCURRENT_REQUESTS) {
    activeRequests += 1;
    return;
  }
  await new Promise<void>((resolve) => waitQueue.push(resolve));
  activeRequests += 1;
}

function releaseSlot(): void {
  activeRequests -= 1;
  const next = waitQueue.shift();
  if (next) next();
}

export async function fetchDeezer<T>(
  endpoint: string,
  attempt = 1
): Promise<T | null> {
  if (attempt === 1) {
    const cached = responseCache.get(endpoint);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data as T;
    }
    const inflight = inflightRequests.get(endpoint);
    if (inflight) {
      return inflight as Promise<T | null>;
    }
  }

  const request = performFetch<T>(endpoint, attempt);

  if (attempt === 1) {
    inflightRequests.set(endpoint, request);
    request.then(
      () => inflightRequests.delete(endpoint),
      () => inflightRequests.delete(endpoint)
    );
  }

  return request;
}

async function performFetch<T>(
  endpoint: string,
  attempt: number
): Promise<T | null> {
  await acquireSlot();
  try {
    const options =
      attempt === 1
        ? { next: { revalidate: DEEZER_REVALIDATE_SECONDS } }
        : { cache: "no-store" as const };

    const res = await fetch(`${DEEZER_BASE_URL}${endpoint}`, options);

    if (res.ok) {
      const data = (await res.json()) as T & { error?: unknown };

      // Deezer reports some failures (unknown id, quota) with HTTP 200 and an
      // in-band `error` object instead of a non-OK status.
      if (data !== null && typeof data === "object" && "error" in data) {
        console.error(
          `Error fetching Deezer ${endpoint}: ${JSON.stringify(data.error)}`
        );
        return null;
      }

      responseCache.set(endpoint, {
        data,
        expiresAt: Date.now() + CACHE_TTL_MS,
      });
      return data;
    }

    const isRetryable = res.status === RETRYABLE_STATUS && attempt < MAX_ATTEMPTS;
    if (!isRetryable) {
      console.error(`Error fetching Deezer ${endpoint}: ${res.status}`);
      return null;
    }

    await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
    return performFetch<T>(endpoint, attempt + 1);
  } catch (error) {
    console.error(`Fetch failed for Deezer ${endpoint}:`, error);
    return null;
  } finally {
    releaseSlot();
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
