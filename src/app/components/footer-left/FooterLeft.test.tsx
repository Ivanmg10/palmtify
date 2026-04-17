import { render, screen } from "@testing-library/react";
import FooterLeft from "./FooterLeft";

const props = {
  track: "Smells Like Teen Spirit",
  artist: "Nirvana",
  albumCover: "https://example.com/cover.jpg",
  albumLink: "200",
  artistLink: "100",
};

describe("FooterLeft", () => {
  test("renders track name as link", () => {
    render(<FooterLeft {...props} />);
    expect(screen.getByText("Smells Like Teen Spirit")).toBeInTheDocument();
  });

  test("renders artist name as link", () => {
    render(<FooterLeft {...props} />);
    expect(screen.getByText("Nirvana")).toBeInTheDocument();
  });

  test("track link points to correct album path", () => {
    render(<FooterLeft {...props} />);
    const trackLink = screen.getByText("Smells Like Teen Spirit").closest("a");
    expect(trackLink?.getAttribute("href")).toBe("/albums/200");
  });

  test("artist link points to correct artist path", () => {
    render(<FooterLeft {...props} />);
    const artistLink = screen.getByText("Nirvana").closest("a");
    expect(artistLink?.getAttribute("href")).toBe("/artist/100");
  });

  test("renders album cover image", () => {
    render(<FooterLeft {...props} />);
    const img = screen.getByAltText("spotify");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toBe("https://example.com/cover.jpg");
  });
});
