import { render, screen, fireEvent } from "@testing-library/react";
import { PlayerProvider, usePlayer } from "./PlayerContext";

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
    strAlbumThumb: "https://example.com/album.jpg",
    intYearReleased: "1991",
    strYear: "1991",
    strReleaseFormat: "Album",
  },
];

function TestConsumer() {
  const { currentTrack, currentAlbum, setCurrentTrack } = usePlayer();
  return (
    <div>
      <p data-testid="track">{currentTrack?.strTrack ?? "none"}</p>
      <p data-testid="album">{currentAlbum?.[0]?.strAlbum ?? "none"}</p>
      <button onClick={() => setCurrentTrack(mockTrack, mockAlbum)}>
        Set Track
      </button>
    </div>
  );
}

describe("PlayerProvider", () => {
  test("provides null currentTrack initially", () => {
    render(
      <PlayerProvider>
        <TestConsumer />
      </PlayerProvider>
    );
    expect(screen.getByTestId("track").textContent).toBe("none");
  });

  test("updates currentTrack when setCurrentTrack is called", () => {
    render(
      <PlayerProvider>
        <TestConsumer />
      </PlayerProvider>
    );
    fireEvent.click(screen.getByText("Set Track"));
    expect(screen.getByTestId("track").textContent).toBe(
      "Smells Like Teen Spirit"
    );
    expect(screen.getByTestId("album").textContent).toBe("Nevermind");
  });
});

describe("usePlayer", () => {
  test("throws error when used outside PlayerProvider", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    function BadConsumer() {
      usePlayer();
      return null;
    }

    expect(() => render(<BadConsumer />)).toThrow(
      "usePlayer debe usarse dentro de un PlayerProvider"
    );

    consoleSpy.mockRestore();
  });
});
