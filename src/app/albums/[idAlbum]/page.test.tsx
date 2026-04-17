jest.mock("@/app/utils/apliClient", () => ({
  getAlbumsById: jest.fn(),
  getArtistById: jest.fn(),
  getTracksByAlbum: jest.fn(),
}));

jest.mock("../../components/albums-table/AlbumsTable", () => ({
  __esModule: true,
  default: () => <div data-testid="albums-table">AlbumsTable</div>,
}));

jest.mock("../../components/albums-top/AlbumsTop", () => ({
  __esModule: true,
  default: () => <div data-testid="albums-top">AlbumsTop</div>,
}));

import { render, screen } from "@testing-library/react";
import AlbumPage from "./page";
import { getAlbumsById, getArtistById, getTracksByAlbum } from "@/app/utils/apliClient";

const mockAlbum = [
  {
    idAlbum: "200",
    idArtist: "100",
    strArtist: "Nirvana",
    strAlbum: "Nevermind",
    strAlbumThumb: "https://example.com/nevermind.jpg",
    intYearReleased: "1991",
    strYear: "1991",
    strReleaseFormat: "Album",
  },
];

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

const mockTracks = [
  {
    idTrack: "1",
    strTrack: "Smells Like Teen Spirit",
    idArtist: "100",
    strArtist: "Nirvana",
    idAlbum: "200",
    strAlbum: "Nevermind",
    intDuration: 301000,
    strTrackThumb: "",
    intTotalPlays: 1000000,
    intTotalListeners: 500000,
  },
];

beforeEach(() => {
  (getAlbumsById as jest.Mock).mockResolvedValue(mockAlbum);
  (getArtistById as jest.Mock).mockResolvedValue(mockArtist);
  (getTracksByAlbum as jest.Mock).mockResolvedValue(mockTracks);
});

describe("AlbumPage", () => {
  test("renders album top and table", async () => {
    const element = await AlbumPage({
      params: Promise.resolve({ idAlbum: "200" }) as any,
    });
    render(element);
    expect(screen.getByTestId("albums-top")).toBeInTheDocument();
    expect(screen.getByTestId("albums-table")).toBeInTheDocument();
  });
});
