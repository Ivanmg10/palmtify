import {
  getArtist,
  getArtistById,
  getAlbumsByArtist,
  getAlbumsByArtistId,
  getAlbumsById,
  getAlbumsByArtistAndAlbum,
  getTracksByAlbum,
} from "./apliClient";
import { clearDeezerCache } from "./deezer";

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

function mockOk(payload: unknown) {
  return {
    ok: true,
    json: jest.fn().mockResolvedValue(payload),
  };
}

function mockDeezer(payload: unknown) {
  global.fetch = jest.fn().mockResolvedValue(mockOk(payload));
}

beforeEach(() => {
  jest.clearAllMocks();
  clearDeezerCache();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("getArtist", () => {
  test("returns mapped artist on success", async () => {
    mockDeezer({ data: [dzArtist] });

    const result = await getArtist("Nirvana");
    expect(result?.idArtist).toBe("415");
    expect(result?.strArtist).toBe("Nirvana");
  });

  test("returns null when no artists found", async () => {
    mockDeezer({ data: [] });

    const result = await getArtist("Unknown");
    expect(result).toBeNull();
  });

  test("returns null when data is missing", async () => {
    mockDeezer({});

    const result = await getArtist("Unknown");
    expect(result).toBeNull();
  });

  test("returns null on non-ok response", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 });

    const result = await getArtist("Unknown");
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });

  test("returns null on fetch error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const result = await getArtist("Unknown");
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });
});

describe("getArtistById", () => {
  test("returns mapped artist on success", async () => {
    mockDeezer(dzArtist);

    const result = await getArtistById("415");
    expect(result?.idArtist).toBe("415");
  });

  test("returns null when artist is missing", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 });

    const result = await getArtistById("999");
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });

  test("returns null on fetch error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValue(new Error("fail"));

    const result = await getArtistById("999");
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });
});

describe("getAlbumsByArtist", () => {
  test("returns albums of the first matching artist", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(mockOk({ data: [dzArtist] }))
      .mockResolvedValueOnce(mockOk(dzArtist))
      .mockResolvedValueOnce(mockOk({ data: [dzAlbum] }));

    const result = await getAlbumsByArtist("Nirvana");
    expect(result).toHaveLength(1);
    expect(result[0].idAlbum).toBe("270615252");
    expect(result[0].strArtist).toBe("Nirvana");
  });

  test("returns empty array when artist not found", async () => {
    mockDeezer({ data: [] });

    const result = await getAlbumsByArtist("Unknown");
    expect(result).toEqual([]);
  });

  test("returns empty array on fetch error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValue(new Error("fail"));

    const result = await getAlbumsByArtist("Unknown");
    expect(result).toEqual([]);
    consoleSpy.mockRestore();
  });
});

describe("getAlbumsByArtistId", () => {
  test("returns albums on success", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(dzArtist),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: [dzAlbum] }),
      });

    const result = await getAlbumsByArtistId("415");
    expect(result).toHaveLength(1);
    expect(result[0].strAlbum).toBe("Nevermind (Remastered)");
  });

  test("returns empty array when albums response is missing", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(dzArtist),
      })
      .mockResolvedValueOnce({ ok: false, status: 503 });

    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const result = await getAlbumsByArtistId("999");
    expect(result).toEqual([]);
    consoleSpy.mockRestore();
  });

  test("returns empty array when album list is empty", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(dzArtist),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: [] }),
      });

    const result = await getAlbumsByArtistId("415");
    expect(result).toEqual([]);
  });
});

describe("getAlbumsById", () => {
  test("returns the album wrapped in an array", async () => {
    mockDeezer({ ...dzAlbum, artist: dzArtist });

    const result = await getAlbumsById("270615252");
    expect(result).toHaveLength(1);
    expect(result[0].idArtist).toBe("415");
  });

  test("returns empty array on error payload", async () => {
    mockDeezer({ error: { type: "DataException", message: "not found" } });

    const result = await getAlbumsById("999");
    expect(result).toEqual([]);
  });

  test("returns empty array when response is null", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValue(new Error("fail"));

    const result = await getAlbumsById("999");
    expect(result).toEqual([]);
    consoleSpy.mockRestore();
  });
});

describe("getAlbumsByArtistAndAlbum", () => {
  function mockSearchAndAlbums(albumsPayload: unknown) {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: [dzArtist] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(albumsPayload),
      });
  }

  test("returns exact title match", async () => {
    mockSearchAndAlbums({ data: [dzAlbum] });

    const result = await getAlbumsByArtistAndAlbum("Nirvana", "Nevermind (Remastered)");
    expect(result).toHaveLength(1);
    expect(result[0].strAlbum).toBe("Nevermind (Remastered)");
  });

  test("returns partial match when exact title is not present", async () => {
    mockSearchAndAlbums({ data: [dzAlbum] });

    const result = await getAlbumsByArtistAndAlbum("Nirvana", "Nevermind");
    expect(result).toHaveLength(1);
  });

  test("normalizes accents and punctuation", async () => {
    mockSearchAndAlbums({
      data: [{ id: 1, title: "…And Justice for All", release_date: "1988-08-25" }],
    });

    const result = await getAlbumsByArtistAndAlbum("Metallica", "And Justice for All");
    expect(result).toHaveLength(1);
  });

  test("returns empty array when artist not found", async () => {
    mockDeezer({ data: [] });

    const result = await getAlbumsByArtistAndAlbum("Unknown", "X");
    expect(result).toEqual([]);
  });

  test("returns empty array when albums response is missing", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: [dzArtist] }),
      })
      .mockResolvedValueOnce({ ok: false, status: 503 });

    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const result = await getAlbumsByArtistAndAlbum("Nirvana", "X");
    expect(result).toEqual([]);
    consoleSpy.mockRestore();
  });

  test("falls back to free album search when not in the artist list", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(mockOk({ data: [dzArtist] }))
      .mockResolvedValueOnce(mockOk({ data: [dzAlbum] }))
      .mockResolvedValueOnce(
        mockOk({ data: [{ id: 382588897, title: "Operation: Doomsday (Complete)" }] })
      );

    const result = await getAlbumsByArtistAndAlbum("MF DOOM", "Operation: Doomsday");
    expect(result).toHaveLength(1);
    expect(result[0].idAlbum).toBe("382588897");
    expect(result[0].strArtist).toBe("Nirvana");
  });

  test("returns empty array when fallback search finds nothing", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(mockOk({ data: [dzArtist] }))
      .mockResolvedValueOnce(mockOk({ data: [dzAlbum] }))
      .mockResolvedValueOnce(mockOk({ data: [] }));

    const result = await getAlbumsByArtistAndAlbum("Nirvana", "In Utero");
    expect(result).toEqual([]);
  });
});

describe("getTracksByAlbum", () => {
  test("returns mapped tracks on success", async () => {
    mockDeezer({ ...dzAlbum, tracks: { data: [dzTrack] } });

    const result = await getTracksByAlbum("270615252");
    expect(result).toHaveLength(1);
    expect(result[0].strTrack).toBe("Smells Like Teen Spirit");
    expect(result[0].intDuration).toBe(301000);
  });

  test("falls back to cover_big and cover for track thumbs", async () => {
    mockDeezer({
      ...dzAlbum,
      cover_xl: undefined,
      cover_big: "big.jpg",
      tracks: { data: [{ id: 1, title: "X", duration: 60 }] },
    });

    const result = await getTracksByAlbum("270615252");
    expect(result[0].strTrackThumb).toBe("big.jpg");
  });

  test("falls back to cover when cover_xl and cover_big are missing", async () => {
    mockDeezer({
      ...dzAlbum,
      cover_xl: undefined,
      cover_big: undefined,
      cover: "small.jpg",
      tracks: { data: [{ id: 1, title: "X", duration: 60 }] },
    });

    const result = await getTracksByAlbum("270615252");
    expect(result[0].strTrackThumb).toBe("small.jpg");
  });

  test("returns empty array on error payload", async () => {
    mockDeezer({ error: { type: "DataException", message: "not found" } });

    const result = await getTracksByAlbum("999");
    expect(result).toEqual([]);
  });

  test("returns empty array on fetch error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValue(new Error("fail"));

    const result = await getTracksByAlbum("999");
    expect(result).toEqual([]);
    consoleSpy.mockRestore();
  });
});
