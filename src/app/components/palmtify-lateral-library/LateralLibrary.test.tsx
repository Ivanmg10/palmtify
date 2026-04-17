import { render, screen } from "@testing-library/react";
import PalmtifyLateralLibrary from "./LateralLibrary";

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

describe("PalmtifyLateralLibrary", () => {
  test("renders the lateral library container", () => {
    const { container } = render(
      <PalmtifyLateralLibrary recentlyPlayedArray={mockRecentlyPlayedArray} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  test("renders Home link from LateralComponentTop", () => {
    render(
      <PalmtifyLateralLibrary recentlyPlayedArray={mockRecentlyPlayedArray} />
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("renders album from recently played array", () => {
    render(
      <PalmtifyLateralLibrary recentlyPlayedArray={mockRecentlyPlayedArray} />
    );
    expect(screen.getByText("Nevermind")).toBeInTheDocument();
  });
});
