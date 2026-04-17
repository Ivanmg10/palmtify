import { render, screen } from "@testing-library/react";
import AlbumsTable from "./AlbumsTable";
import { PlayerProvider } from "../../context/PlayerContext";

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
  {
    idTrack: "2",
    strTrack: "Come as You Are",
    idArtist: "100",
    strArtist: "Nirvana",
    idAlbum: "200",
    strAlbum: "Nevermind",
    intDuration: 219000,
    strTrackThumb: "",
    intTotalPlays: 900000,
    intTotalListeners: 400000,
  },
];

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

describe("AlbumsTable", () => {
  test("renders table with track names", async () => {
    const element = await AlbumsTable({ tracks: mockTracks, album: mockAlbum });
    render(
      <PlayerProvider>{element}</PlayerProvider>
    );
    expect(screen.getByText("Smells Like Teen Spirit")).toBeInTheDocument();
    expect(screen.getByText("Come as You Are")).toBeInTheDocument();
  });

  test("renders table headers", async () => {
    const element = await AlbumsTable({ tracks: mockTracks, album: mockAlbum });
    render(
      <PlayerProvider>{element}</PlayerProvider>
    );
    expect(screen.getByText(/Tittle/)).toBeInTheDocument();
    expect(screen.getByText("Album")).toBeInTheDocument();
  });

  test("renders empty table when no tracks", async () => {
    const element = await AlbumsTable({ tracks: [], album: mockAlbum });
    const { container } = render(
      <PlayerProvider>{element}</PlayerProvider>
    );
    expect(container.querySelector("table")).toBeInTheDocument();
  });
});
