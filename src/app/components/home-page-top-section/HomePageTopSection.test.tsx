jest.mock("@/app/utils/apliClient", () => ({
  getAlbumsByArtistAndAlbum: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import HomePageTopSection from "./HomePageTopSection";
import { getAlbumsByArtistAndAlbum } from "@/app/utils/apliClient";

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

const mockAlbums = [
  { id: 1, artist: "Nirvana", album: "Nevermind" },
  { id: 2, artist: "Metallica", album: "Master of Puppets" },
  { id: 3, artist: "Pink Floyd", album: "The Wall" },
  { id: 4, artist: "The Beatles", album: "Abbey Road" },
  { id: 5, artist: "Led Zeppelin", album: "Led Zeppelin IV" },
  { id: 6, artist: "Queen", album: "A Night at the Opera" },
  { id: 7, artist: "AC/DC", album: "Back in Black" },
  { id: 8, artist: "Black Sabbath", album: "Paranoid" },
  { id: 9, artist: "Iron Maiden", album: "Powerslave" },
  { id: 10, artist: "Megadeth", album: "Rust in Peace" },
];

beforeEach(() => {
  (getAlbumsByArtistAndAlbum as jest.Mock).mockResolvedValue([mockAlbum]);
});

describe("HomePageTopSection", () => {
  test("renders All, Albums, Artist buttons", async () => {
    const element = await HomePageTopSection({ albums: mockAlbums });
    render(element);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Albums")).toBeInTheDocument();
    expect(screen.getByText("Artist")).toBeInTheDocument();
  });

  test("renders album cards", async () => {
    const element = await HomePageTopSection({ albums: mockAlbums });
    render(element);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });

  test("renders without albums prop", async () => {
    const element = await HomePageTopSection({});
    const { container } = render(element);
    expect(container.querySelector(".w-full")).toBeInTheDocument();
  });

  test("renders album name in card", async () => {
    const element = await HomePageTopSection({ albums: mockAlbums });
    render(element);
    expect(screen.getAllByText("Nevermind").length).toBeGreaterThan(0);
  });

  test("album with no strAlbumThumb uses placeholder", async () => {
    (getAlbumsByArtistAndAlbum as jest.Mock).mockResolvedValue([
      { ...mockAlbum, strAlbumThumb: null },
    ]);
    const element = await HomePageTopSection({ albums: [mockAlbums[0]] });
    render(element);
    const img = screen.getByAltText("?");
    expect(img.getAttribute("src")).toBe("/placeholder.png");
  });
});
