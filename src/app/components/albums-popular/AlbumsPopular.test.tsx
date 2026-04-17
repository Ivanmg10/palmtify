import { render, screen } from "@testing-library/react";
import AlbumsPopular from "./AlbumsPopular";

const mockTracks = [
  {
    id: "1",
    artist: "Nirvana",
    name: "Smells Like Teen Spirit",
    album: "Nevermind",
    albumCover: "https://example.com/cover.jpg",
    duration: 301000,
    plays: 1500000,
  },
  {
    id: "2",
    artist: "Nirvana",
    name: "Come as You Are",
    album: "Nevermind",
    albumCover: "https://example.com/cover.jpg",
    duration: 219000,
    plays: 1200000,
  },
];

describe("AlbumsPopular", () => {
  test("renders Popular songs heading", () => {
    render(<AlbumsPopular topTracks={mockTracks} />);
    expect(screen.getByText("Popular songs")).toBeInTheDocument();
  });

  test("renders track names", () => {
    render(<AlbumsPopular topTracks={mockTracks} />);
    expect(screen.getByText("Smells Like Teen Spirit")).toBeInTheDocument();
    expect(screen.getByText("Come as You Are")).toBeInTheDocument();
  });

  test("renders track numbers", () => {
    render(<AlbumsPopular topTracks={mockTracks} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("renders formatted play counts", () => {
    render(<AlbumsPopular topTracks={mockTracks} />);
    expect(screen.getByText("1.500.000")).toBeInTheDocument();
  });

  test("renders formatted durations", () => {
    render(<AlbumsPopular topTracks={mockTracks} />);
    expect(screen.getByText("5:01")).toBeInTheDocument();
  });
});
