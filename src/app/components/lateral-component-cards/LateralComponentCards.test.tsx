import { render, screen } from "@testing-library/react";
import LateralComponentCards from "./LateralComponentCards";

const mockRecentlyPlayedArray = [
  {
    id: 1,
    artist: "Nirvana",
    albumName: "Nevermind",
    album: [
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
    ],
  },
];

describe("LateralComponentCards", () => {
  test("renders Your library heading", () => {
    render(<LateralComponentCards recentlyPlayedArray={mockRecentlyPlayedArray} />);
    expect(screen.getByText("Your library")).toBeInTheDocument();
  });

  test("renders album name from recently played", () => {
    render(<LateralComponentCards recentlyPlayedArray={mockRecentlyPlayedArray} />);
    expect(screen.getByText("Nevermind")).toBeInTheDocument();
  });

  test("renders artist name", () => {
    render(<LateralComponentCards recentlyPlayedArray={mockRecentlyPlayedArray} />);
    expect(screen.getByText(/Nirvana/)).toBeInTheDocument();
  });

  test("album link points to correct path", () => {
    render(<LateralComponentCards recentlyPlayedArray={mockRecentlyPlayedArray} />);
    const albumLink = screen.getByRole("link");
    expect(albumLink.getAttribute("href")).toBe("/albums/200");
  });

  test("renders with empty array", () => {
    render(<LateralComponentCards recentlyPlayedArray={[]} />);
    expect(screen.getByText("Your library")).toBeInTheDocument();
  });
});
