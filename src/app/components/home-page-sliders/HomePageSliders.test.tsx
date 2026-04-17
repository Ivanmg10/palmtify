jest.mock("@/app/utils/apliClient", () => ({
  getAlbumsByArtistAndAlbum: jest.fn(),
  getTracksByAlbum: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import HomePageSliders from "./HomePageSliders";
import { getAlbumsByArtistAndAlbum } from "@/app/utils/apliClient";

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

const mockBandsData = [
  {
    band: "Nirvana",
    artist: {
      idArtist: "100",
      idArtis: "100",
      strArtist: "Nirvana",
      strArtistThumb: "https://example.com/nirvana.jpg",
      intBornYear: "1987",
      strStyle: "Grunge",
      strGenre: "Rock",
      strBiographyEN: "American rock band.",
    },
  },
];

const mockAlbums = [{ id: 1, artist: "Nirvana", album: "Nevermind" }];

beforeEach(() => {
  (getAlbumsByArtistAndAlbum as jest.Mock).mockResolvedValue(mockAlbum);
});

describe("HomePageSliders - album slider", () => {
  test("renders title and subtitle", async () => {
    const element = await HomePageSliders({
      title: "Made for You",
      subtitle: "Made for",
      albums: mockAlbums,
    });
    render(element);
    expect(screen.getByText("Made for You")).toBeInTheDocument();
    expect(screen.getByText("Made for")).toBeInTheDocument();
  });

  test("renders album when albums provided", async () => {
    const element = await HomePageSliders({
      title: "Made for You",
      subtitle: "",
      albums: mockAlbums,
    });
    render(element);
    expect(screen.getByText("Nevermind")).toBeInTheDocument();
  });

  test("uses placeholder when album has no strAlbumThumb", async () => {
    (getAlbumsByArtistAndAlbum as jest.Mock).mockResolvedValue([
      { ...mockAlbum[0], strAlbumThumb: null },
    ]);
    const element = await HomePageSliders({
      title: "Made for You",
      subtitle: "",
      albums: mockAlbums,
    });
    render(element);
    const img = screen.getByAltText("?");
    expect(img.getAttribute("src")).toBe("/placeholder.png");
  });

  test("renders without albums", async () => {
    const element = await HomePageSliders({
      title: "Empty",
      subtitle: "",
    });
    render(element);
    expect(screen.getByText("Empty")).toBeInTheDocument();
  });
});

describe("HomePageSliders - artist slider", () => {
  test("renders artist data when title is 'Your favorite artist'", async () => {
    const element = await HomePageSliders({
      title: "Your favorite artist",
      subtitle: "",
      albums: mockAlbums,
      bandsData: mockBandsData,
    });
    render(element);
    expect(screen.getByText("Nirvana")).toBeInTheDocument();
    expect(screen.getByText("Artist")).toBeInTheDocument();
  });

  test("renders with null artist in bandsData", async () => {
    const element = await HomePageSliders({
      title: "Your favorite artist",
      subtitle: "",
      albums: mockAlbums,
      bandsData: [{ band: "Unknown", artist: null }],
    });
    render(element);
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  test("renders with empty bandsData", async () => {
    const element = await HomePageSliders({
      title: "Your favorite artist",
      subtitle: "",
      albums: mockAlbums,
      bandsData: [],
    });
    render(element);
    expect(screen.getByText("Your favorite artist")).toBeInTheDocument();
  });

  test("renders nothing when bandsData is null", async () => {
    const element = await HomePageSliders({
      title: "Your favorite artist",
      subtitle: "",
      albums: mockAlbums,
      bandsData: null as any,
    });
    render(element);
    expect(screen.getByText("Your favorite artist")).toBeInTheDocument();
    expect(screen.queryByText("Artist")).not.toBeInTheDocument();
  });
});
