jest.mock("./utils/apliClient", () => ({
  getAlbumsByArtistAndAlbum: jest.fn(),
}));

jest.mock("./components/palmtify-lateral-library/LateralLibrary", () => ({
  __esModule: true,
  default: () => <div data-testid="lateral-library">LateralLibrary</div>,
}));

jest.mock("./components/palmtify-bottom-reproducer/MainBottomReproducer", () => ({
  __esModule: true,
  default: () => <div data-testid="bottom-reproducer">BottomReproducer</div>,
}));

jest.mock("./context/PlayerContext", () => ({
  PlayerProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "./layout";
import { getAlbumsByArtistAndAlbum } from "./utils/apliClient";

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

beforeEach(() => {
  (getAlbumsByArtistAndAlbum as jest.Mock).mockResolvedValue(mockAlbum);
});

describe("RootLayout", () => {
  test("renders children", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const element = await RootLayout({
      children: <div data-testid="child">Child</div>,
    });
    render(element);
    expect(screen.getByTestId("child")).toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  test("renders lateral library", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const element = await RootLayout({
      children: <div>Child</div>,
    });
    render(element);
    expect(screen.getByTestId("lateral-library")).toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  test("renders bottom reproducer", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const element = await RootLayout({
      children: <div>Child</div>,
    });
    render(element);
    expect(screen.getByTestId("bottom-reproducer")).toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});

describe("metadata", () => {
  test("has correct title", () => {
    expect(metadata).toHaveProperty("title", "Palmtify");
  });

  test("has correct description", () => {
    expect(metadata).toHaveProperty(
      "description",
      "A Spotify clone built with Next.js and Tailwind CSS"
    );
  });
});
