import { render, screen } from "@testing-library/react";
import AlbumsDisco from "./AlbumsDisco";

const mockAlbums = [
  {
    idAlbum: "1",
    idArtist: "100",
    strArtist: "Nirvana",
    strAlbum: "Nevermind",
    strAlbumThumb: "https://example.com/nevermind.jpg",
    intYearReleased: "1991",
    strYear: "1991",
    strReleaseFormat: "Album",
  },
  {
    idAlbum: "2",
    idArtist: "100",
    strArtist: "Nirvana",
    strAlbum: "In Utero",
    strAlbumThumb: "https://example.com/inutero.jpg",
    intYearReleased: "1993",
    strYear: "1993",
    strReleaseFormat: "Album",
  },
];

describe("AlbumsDisco", () => {
  test("renders Discography heading", () => {
    render(<AlbumsDisco albums={mockAlbums} />);
    expect(screen.getByText("Discography")).toBeInTheDocument();
  });

  test("renders album names", () => {
    render(<AlbumsDisco albums={mockAlbums} />);
    expect(screen.getByText("Nevermind")).toBeInTheDocument();
    expect(screen.getByText("In Utero")).toBeInTheDocument();
  });

  test("renders year and format for each album", () => {
    render(<AlbumsDisco albums={mockAlbums} />);
    const years = screen.getAllByText(/1991/);
    expect(years.length).toBeGreaterThan(0);
  });

  test("album links point to correct path", () => {
    render(<AlbumsDisco albums={mockAlbums} />);
    const links = screen.getAllByRole("link");
    expect(links[0].getAttribute("href")).toBe("/albums/1");
  });
});
