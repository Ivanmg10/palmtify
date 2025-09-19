import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Artist {
  idArtist: string;
  strArtist: string;
  strArtistThumb: string | StaticImport;
}

export interface Album {
  idAlbum: string;
  idArtist: string;
  strArtist: string;
  strAlbum: string;
  strAlbumThumb: string;
  intYearReleased: string | null;
}

// export interface Track {
//   idTrack: string;
//   strTrack: string;
// }

export interface RecentlyPlayedItem {
  id: number;
  artist: string;
  albumName: string;
  album: Album[];
}

export interface PalmtifyLateralLibraryProps {
  recentlyPlayedArray: RecentlyPlayedItem[];
}

export interface BandData {
  band: string;
  artist: Artist | null;
}
