import {
  fetchDeezer,
  mapDeezerAlbum,
  mapDeezerArtist,
  mapDeezerTrack,
} from "./deezer";

const dzArtist = {
  id: 415,
  name: "Nirvana",
  picture_xl: "https://cdn-images.dzcdn.net/images/artist/xl.jpg",
};

const dzAlbum = {
  id: 270615252,
  title: "Nevermind (Remastered)",
  cover_xl: "https://cdn-images.dzcdn.net/images/cover/xl.jpg",
  release_date: "2021-11-12",
  record_type: "album",
};

const dzTrack = {
  id: 1543592112,
  title: "Smells Like Teen Spirit",
  duration: 301,
  rank: 352445,
  artist: dzArtist,
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe("fetchDeezer", () => {
  test("returns parsed json on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ data: [dzArtist] }),
    });

    const result = await fetchDeezer("/search/artist?q=nirvana");
    expect(result).toEqual({ data: [dzArtist] });
  });

  test("returns null on non-ok response", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 503 });

    const result = await fetchDeezer("/artist/415");
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });

  test("retries once on 429 and succeeds", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 429 })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: [dzArtist] }),
      });

    const result = await fetchDeezer("/search/artist?q=nirvana");
    expect(result).toEqual({ data: [dzArtist] });
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test("retries twice on repeated 429 and succeeds", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 429 })
      .mockResolvedValueOnce({ ok: false, status: 429 })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: [dzArtist] }),
      });

    const result = await fetchDeezer("/search/artist?q=nirvana");
    expect(result).toEqual({ data: [dzArtist] });
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  test("returns null when all attempts are 429", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 429 });

    const result = await fetchDeezer("/artist/415");
    expect(result).toBeNull();
    expect(global.fetch).toHaveBeenCalledTimes(3);
    consoleSpy.mockRestore();
  });

  test("returns null on fetch error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const result = await fetchDeezer("/artist/415");
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });
});

describe("mapDeezerArtist", () => {
  test("maps all fields with picture_xl", () => {
    expect(mapDeezerArtist(dzArtist)).toEqual({
      idArtist: "415",
      idArtis: "415",
      strArtist: "Nirvana",
      strArtistThumb: "https://cdn-images.dzcdn.net/images/artist/xl.jpg",
      intBornYear: "",
      strStyle: "",
      strGenre: "",
      strBiographyEN: "",
    });
  });

  test("falls back to picture_big then picture", () => {
    const withBig = mapDeezerArtist({
      id: 1,
      name: "A",
      picture_big: "big.jpg",
      picture: "small.jpg",
    });
    expect(withBig.strArtistThumb).toBe("big.jpg");

    const withPicture = mapDeezerArtist({ id: 1, name: "A", picture: "small.jpg" });
    expect(withPicture.strArtistThumb).toBe("small.jpg");

    const withoutImages = mapDeezerArtist({ id: 1, name: "A" });
    expect(withoutImages.strArtistThumb).toBe("");
  });
});

describe("mapDeezerAlbum", () => {
  test("maps fields using the artist param", () => {
    expect(mapDeezerAlbum(dzAlbum, dzArtist)).toEqual({
      idAlbum: "270615252",
      idArtist: "415",
      strArtist: "Nirvana",
      strAlbum: "Nevermind (Remastered)",
      strAlbumThumb: "https://cdn-images.dzcdn.net/images/cover/xl.jpg",
      intYearReleased: "2021",
      strYear: "2021",
      strReleaseFormat: "Album",
    });
  });

  test("falls back to the embedded artist", () => {
    const album = mapDeezerAlbum({ ...dzAlbum, artist: dzArtist });
    expect(album.idArtist).toBe("415");
    expect(album.strArtist).toBe("Nirvana");
  });

  test("handles missing artist, year and record_type", () => {
    const album = mapDeezerAlbum({ id: 1, title: "X" });
    expect(album.idArtist).toBe("");
    expect(album.strArtist).toBe("");
    expect(album.intYearReleased).toBeNull();
    expect(album.strYear).toBe("");
    expect(album.strReleaseFormat).toBe("Album");
  });

  test("falls back to cover_big then cover", () => {
    const withBig = mapDeezerAlbum({
      id: 1,
      title: "X",
      cover_big: "big.jpg",
      cover: "small.jpg",
    });
    expect(withBig.strAlbumThumb).toBe("big.jpg");

    const withCover = mapDeezerAlbum({ id: 1, title: "X", cover: "small.jpg" });
    expect(withCover.strAlbumThumb).toBe("small.jpg");
  });
});

describe("mapDeezerTrack", () => {
  test("maps fields and converts duration to milliseconds", () => {
    expect(
      mapDeezerTrack(dzTrack, {
        id: 270615252,
        title: "Nevermind (Remastered)",
        cover: "cover.jpg",
      })
    ).toEqual({
      idTrack: "1543592112",
      strTrack: "Smells Like Teen Spirit",
      idArtist: "415",
      strArtist: "Nirvana",
      idAlbum: "270615252",
      strAlbum: "Nevermind (Remastered)",
      intDuration: 301000,
      strTrackThumb: "cover.jpg",
      intTotalPlays: 352445,
      intTotalListeners: 0,
    });
  });

  test("handles missing artist, rank and cover", () => {
    const track = mapDeezerTrack(
      { id: 1, title: "X", duration: 60 },
      { id: 2, title: "Y" }
    );
    expect(track.idArtist).toBe("");
    expect(track.strArtist).toBe("");
    expect(track.intTotalPlays).toBe(0);
    expect(track.strTrackThumb).toBe("");
  });
});
