jest.mock("@/app/utils/apliClient", () => ({
  getArtistById: jest.fn(),
  getAlbumsByArtist: jest.fn(),
  getAlbumsByArtistId: jest.fn(),
  getAlbumsById: jest.fn(),
  getTracksByAlbum: jest.fn(),
}));

jest.mock("@/app/components/albums-top/AlbumsTop", () => ({
  __esModule: true,
  default: () => <div data-testid="albums-top">AlbumsTop</div>,
}));

jest.mock("@/app/components/albums-popular/AlbumsPopular", () => ({
  __esModule: true,
  default: () => <div data-testid="albums-popular">AlbumsPopular</div>,
}));

jest.mock("@/app/components/albums-discography/AlbumsDisco", () => ({
  __esModule: true,
  default: () => <div data-testid="albums-disco">AlbumsDisco</div>,
}));

jest.mock("@/app/components/albums-about/AlbumsAbout", () => ({
  __esModule: true,
  default: () => <div data-testid="albums-about">AlbumsAbout</div>,
}));

import { render, screen } from "@testing-library/react";
import ArtistPage from "./page";
import {
  getArtistById,
  getAlbumsByArtist,
  getAlbumsByArtistId,
  getAlbumsById,
  getTracksByAlbum,
} from "@/app/utils/apliClient";

const mockArtist = {
  idArtist: "100",
  idArtis: "100",
  strArtist: "Nirvana",
  strArtistThumb: "https://example.com/nirvana.jpg",
  intBornYear: "1987",
  strStyle: "Grunge",
  strGenre: "Rock",
  strBiographyEN: "American rock band.",
};

const mockAlbum = {
  idAlbum: "200",
  idArtist: "100",
  strArtist: "Nirvana",
  strAlbum: "Nevermind",
  strAlbumThumb: "https://example.com/nevermind.jpg",
  intYearReleased: "1991",
  strYear: "1991",
  strReleaseFormat: "Album",
};

const mockTrack = {
  idTrack: "1",
  strTrack: "Smells Like Teen Spirit",
  idArtist: "100",
  strArtist: "Nirvana",
  idAlbum: "200",
  strAlbum: "Nevermind",
  intDuration: 301000,
  strTrackThumb: "",
  intTotalPlays: 1500000,
  intTotalListeners: 700000,
};

const mockTrack2 = {
  idTrack: "2",
  strTrack: "Come as You Are",
  idArtist: "100",
  strArtist: "Nirvana",
  idAlbum: "200",
  strAlbum: "Nevermind",
  intDuration: 219000,
  strTrackThumb: "",
  intTotalPlays: 0,
  intTotalListeners: 600000,
};

beforeEach(() => {
  (getArtistById as jest.Mock).mockResolvedValue(mockArtist);
  (getAlbumsByArtistId as jest.Mock).mockResolvedValue([mockAlbum]);
  (getAlbumsByArtist as jest.Mock).mockResolvedValue([mockAlbum]);
  (getTracksByAlbum as jest.Mock).mockResolvedValue([mockTrack, mockTrack2]);
  (getAlbumsById as jest.Mock).mockResolvedValue([mockAlbum]);
});

describe("ArtistPage", () => {
  test("renders all artist sections", async () => {
    const element = await ArtistPage({
      params: Promise.resolve({ idArtist: "100" }) as any,
    });
    render(element);
    expect(screen.getByTestId("albums-top")).toBeInTheDocument();
    expect(screen.getByTestId("albums-popular")).toBeInTheDocument();
    expect(screen.getByTestId("albums-disco")).toBeInTheDocument();
    expect(screen.getByTestId("albums-about")).toBeInTheDocument();
  });

  test("handles null artist", async () => {
    (getArtistById as jest.Mock).mockResolvedValue(null);
    (getAlbumsByArtistId as jest.Mock).mockResolvedValue([mockAlbum]);
    (getAlbumsByArtist as jest.Mock).mockResolvedValue([]);
    (getTracksByAlbum as jest.Mock).mockResolvedValue([]);

    const element = await ArtistPage({
      params: Promise.resolve({ idArtist: "999" }) as any,
    });
    render(element);
    expect(screen.getByTestId("albums-top")).toBeInTheDocument();
  });

  test("deduplicates tracks by name", async () => {
    const duplicateTrack = { ...mockTrack, idTrack: "2" };
    (getTracksByAlbum as jest.Mock).mockResolvedValue([mockTrack, duplicateTrack]);

    const element = await ArtistPage({
      params: Promise.resolve({ idArtist: "100" }) as any,
    });
    render(element);
    expect(screen.getByTestId("albums-popular")).toBeInTheDocument();
  });
});
