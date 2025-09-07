export type Artist = {
  idArtist: string;
  strArtist: string;
  strGenre: string;
  intFormedYear: string;
  strArtistThumb: string;
};

export type Album = {
  idAlbum: string;
  strAlbum: string;
  intYearReleased: string;
};

export type Track = {
  idTrack: string;
  strTrack: string;
};

// Función para buscar artista por nombre
export async function getArtist(name: string): Promise<Artist | null> {
  const res = await fetch(
    `https://theaudiodb.com/api/v1/json/123/search.php?s=${encodeURIComponent(
      name
    )}`
  );
  const data = await res.json();
  return data.artists ? data.artists[0] : null;
}

// Función para obtener álbumes por ID de artista
export async function getAlbumsByArtist(id: string): Promise<Album[]> {
  const res = await fetch(
    `https://theaudiodb.com/api/v1/json/123/album.php?i=${encodeURIComponent(
      id
    )}`
  );
  const data = await res.json();
  return data.album ?? [];
}

// Función para obtener canciones por ID de álbum
export async function getTracksByAlbum(id: string): Promise<Track[]> {
  const res = await fetch(
    `https://theaudiodb.com/api/v1/json/123/track.php?m=${encodeURIComponent(
      id
    )}`
  );
  const data = await res.json();
  return data.track ?? [];
}
