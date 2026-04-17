import { render, screen, fireEvent } from "@testing-library/react";
import AlbumTrackRow from "./AlbumTrackRow";
import { PlayerProvider } from "../../context/PlayerContext";

const mockTrack = {
  idTrack: "1",
  strTrack: "Smells Like Teen Spirit",
  idArtist: "100",
  strArtist: "Nirvana",
  idAlbum: "200",
  strAlbum: "Nevermind",
  intDuration: 301000,
  strTrackThumb: "https://example.com/thumb.jpg",
  intTotalPlays: 1000000,
  intTotalListeners: 500000,
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

const anotherTrack = {
  ...mockTrack,
  idTrack: "99",
  strTrack: "Come as You Are",
};

function renderWithProvider(component: React.ReactNode) {
  return render(<PlayerProvider>{component}</PlayerProvider>);
}

describe("AlbumTrackRow", () => {
  test("renders track name", () => {
    renderWithProvider(
      <table><tbody>
        <AlbumTrackRow track={mockTrack} album={mockAlbum} index={0} />
      </tbody></table>
    );
    expect(screen.getByText("Smells Like Teen Spirit")).toBeInTheDocument();
  });

  test("renders track number", () => {
    renderWithProvider(
      <table><tbody>
        <AlbumTrackRow track={mockTrack} album={mockAlbum} index={0} />
      </tbody></table>
    );
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("renders formatted duration", () => {
    renderWithProvider(
      <table><tbody>
        <AlbumTrackRow track={mockTrack} album={mockAlbum} index={0} />
      </tbody></table>
    );
    expect(screen.getByText("5:01")).toBeInTheDocument();
  });

  test("renders artist name", () => {
    renderWithProvider(
      <table><tbody>
        <AlbumTrackRow track={mockTrack} album={mockAlbum} index={0} />
      </tbody></table>
    );
    expect(screen.getByText("Nirvana")).toBeInTheDocument();
  });

  test("calls setCurrentTrack when row is clicked", () => {
    renderWithProvider(
      <table><tbody>
        <AlbumTrackRow track={mockTrack} album={mockAlbum} index={0} />
      </tbody></table>
    );
    fireEvent.click(screen.getByText("Smells Like Teen Spirit").closest("tr")!);
    expect(screen.getByText("Smells Like Teen Spirit")).toBeInTheDocument();
  });

  test("shows pause icon when track is currently playing", () => {
    const { rerender } = renderWithProvider(
      <table><tbody>
        <AlbumTrackRow track={mockTrack} album={mockAlbum} index={0} />
      </tbody></table>
    );
    fireEvent.click(screen.getByText("Smells Like Teen Spirit").closest("tr")!);
    rerender(
      <PlayerProvider>
        <table><tbody>
          <AlbumTrackRow track={mockTrack} album={mockAlbum} index={0} />
        </tbody></table>
      </PlayerProvider>
    );
    expect(screen.getByTestId("IconPlayerPauseFilled")).toBeInTheDocument();
  });

  test("shows play icon when track is not playing", () => {
    renderWithProvider(
      <table><tbody>
        <AlbumTrackRow track={anotherTrack} album={mockAlbum} index={1} />
      </tbody></table>
    );
    expect(screen.getByTestId("IconPlayerPlayFilled")).toBeInTheDocument();
  });
});
