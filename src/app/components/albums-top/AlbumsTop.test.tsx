import { render, screen } from "@testing-library/react";
import AlbumsTop from "./AlbumsTop";

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

const mockTracks = [
  {
    idTrack: "1",
    strTrack: "Song 1",
    idArtist: "100",
    strArtist: "Nirvana",
    idAlbum: "200",
    strAlbum: "Nevermind",
    intDuration: 300000,
    strTrackThumb: "",
    intTotalPlays: 1000,
    intTotalListeners: 500,
  },
];

describe("AlbumsTop with tracks (album view)", () => {
  test("renders album name when tracks are provided", () => {
    render(
      <AlbumsTop tracks={mockTracks} album={mockAlbum} artist={mockArtist} />
    );
    expect(screen.getByText("Nevermind")).toBeInTheDocument();
  });

  test("renders album type label", () => {
    render(
      <AlbumsTop tracks={mockTracks} album={mockAlbum} artist={mockArtist} />
    );
    expect(screen.getByText("Album")).toBeInTheDocument();
  });

  test("renders track count", () => {
    render(
      <AlbumsTop tracks={mockTracks} album={mockAlbum} artist={mockArtist} />
    );
    expect(screen.getByText(/1 songs/)).toBeInTheDocument();
  });

  test("renders year", () => {
    render(
      <AlbumsTop tracks={mockTracks} album={mockAlbum} artist={mockArtist} />
    );
    expect(screen.getByText(/1991/)).toBeInTheDocument();
  });

  test("renders artist link when artist is provided", () => {
    render(
      <AlbumsTop tracks={mockTracks} album={mockAlbum} artist={mockArtist} />
    );
    const artistLink = screen.getByRole("link", { name: /Nirvana/ });
    expect(artistLink?.getAttribute("href")).toBe("/artist/100");
  });

  test("renders AlbumsButtons", () => {
    render(
      <AlbumsTop tracks={mockTracks} album={mockAlbum} artist={mockArtist} />
    );
    expect(screen.getByTestId("IconPlayerPlayFilled")).toBeInTheDocument();
  });
});

describe("AlbumsTop without tracks (artist view)", () => {
  test("renders artist name when no tracks", () => {
    render(
      <AlbumsTop tracks={[]} album={mockAlbum} artist={mockArtist} />
    );
    expect(screen.getByText("Nirvana")).toBeInTheDocument();
  });

  test("renders artist style info", () => {
    render(
      <AlbumsTop tracks={[]} album={mockAlbum} artist={mockArtist} />
    );
    expect(screen.getByText(/Grunge/)).toBeInTheDocument();
    expect(screen.getByText(/Rock/)).toBeInTheDocument();
  });

  test("renders Follow button when hasTracks is false", () => {
    render(
      <AlbumsTop tracks={[]} album={mockAlbum} artist={mockArtist} />
    );
    expect(screen.getByText("Follow")).toBeInTheDocument();
  });

  test("renders null artist gracefully", () => {
    render(<AlbumsTop tracks={[]} album={mockAlbum} artist={null} />);
    expect(screen.queryByText("Nirvana")).not.toBeInTheDocument();
  });

  test("renders with undefined tracks (no tracks prop)", () => {
    render(<AlbumsTop album={mockAlbum} artist={mockArtist} />);
    expect(screen.getByText("Nirvana")).toBeInTheDocument();
  });
});

describe("AlbumsTop with tracks but no artist", () => {
  test("renders album name but no artist link when artist is null", () => {
    render(
      <AlbumsTop tracks={mockTracks} album={mockAlbum} artist={null} />
    );
    expect(screen.getByText("Nevermind")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Nirvana/ })).not.toBeInTheDocument();
  });
});
