import { render, screen, fireEvent } from "@testing-library/react";
import MainBottomReproducer from "./MainBottomReproducer";
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

function TrackSetter() {
  const { setCurrentTrack } = require("../../context/PlayerContext").usePlayer();
  return (
    <button onClick={() => setCurrentTrack(mockTrack, mockAlbum)}>
      Play
    </button>
  );
}

describe("MainBottomReproducer", () => {
  test("renders nothing when no track is playing", () => {
    render(
      <PlayerProvider>
        <MainBottomReproducer />
      </PlayerProvider>
    );
    expect(screen.queryByText("Smells Like Teen Spirit")).not.toBeInTheDocument();
  });

  test("renders track info when a track is set", () => {
    const SetAndRender = () => {
      const { setCurrentTrack } = require("../../context/PlayerContext").usePlayer();
      return (
        <>
          <button onClick={() => setCurrentTrack(mockTrack, mockAlbum)}>
            Play
          </button>
          <MainBottomReproducer />
        </>
      );
    };

    render(
      <PlayerProvider>
        <SetAndRender />
      </PlayerProvider>
    );

    fireEvent.click(screen.getByText("Play"));
    expect(screen.getByText("Smells Like Teen Spirit")).toBeInTheDocument();
    expect(screen.getByText("Nirvana")).toBeInTheDocument();
  });
});
