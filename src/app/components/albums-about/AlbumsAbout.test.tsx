import { render, screen } from "@testing-library/react";
import AlbumsAbout from "./AlbumsAbout";

const mockArtist = {
  idArtist: "1",
  idArtis: "1",
  strArtist: "Nirvana",
  strArtistThumb: "https://example.com/nirvana.jpg",
  intBornYear: "1987",
  strStyle: "Grunge",
  strGenre: "Rock",
  strBiographyEN: "American rock band from Aberdeen, Washington.",
};

describe("AlbumsAbout", () => {
  test("renders artist name", () => {
    render(<AlbumsAbout artist={mockArtist} />);
    expect(screen.getAllByText("Nirvana").length).toBeGreaterThan(0);
  });

  test("renders biography", () => {
    render(<AlbumsAbout artist={mockArtist} />);
    expect(
      screen.getByText("American rock band from Aberdeen, Washington.")
    ).toBeInTheDocument();
  });

  test("renders with null artist", () => {
    const { container } = render(<AlbumsAbout artist={null} />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "/placeholder.png"
    );
  });

  test("renders About heading", () => {
    render(<AlbumsAbout artist={mockArtist} />);
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
