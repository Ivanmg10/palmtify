import {
  getArtist,
  getArtistById,
  getAlbumsByArtist,
  getAlbumsByArtistId,
  getAlbumsById,
  getAlbumsByArtistAndAlbum,
  getTracksByAlbum,
} from "./apliClient";

const mockArtist = { idArtist: "1", strArtist: "Nirvana" };
const mockAlbum = { idAlbum: "2", strAlbum: "Nevermind" };
const mockTrack = { idTrack: "3", strTrack: "Smells Like Teen Spirit" };

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("getArtist", () => {
  test("returns first artist on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ artists: [mockArtist] }),
    });

    const result = await getArtist("Nirvana");
    expect(result).toEqual(mockArtist);
  });

  test("returns null when artists array is missing", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

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
  test("returns first artist on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ artists: [mockArtist] }),
    });
    const result = await getArtistById("1");
    expect(result).toEqual(mockArtist);
  });

  test("returns null when no artists", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ artists: null }),
    });
    const result = await getArtistById("999");
    expect(result).toBeNull();
  });

  test("returns null on non-ok response", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });
    const result = await getArtistById("1");
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });
});

describe("getAlbumsByArtist", () => {
  test("returns albums array on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ album: [mockAlbum] }),
    });
    const result = await getAlbumsByArtist("Nirvana");
    expect(result).toEqual([mockAlbum]);
  });

  test("returns empty array when no album key", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });
    const result = await getAlbumsByArtist("Unknown");
    expect(result).toEqual([]);
  });

  test("returns empty array when album is not array", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ album: null }),
    });
    const result = await getAlbumsByArtist("Unknown");
    expect(result).toEqual([]);
  });

  test("returns empty array on error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValue(new Error("fail"));
    const result = await getAlbumsByArtist("Unknown");
    expect(result).toEqual([]);
    consoleSpy.mockRestore();
  });
});

describe("getAlbumsByArtistId", () => {
  test("returns albums on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ album: [mockAlbum] }),
    });
    const result = await getAlbumsByArtistId("1");
    expect(result).toEqual([mockAlbum]);
  });

  test("returns empty array on non-ok response", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 });
    const result = await getAlbumsByArtistId("999");
    expect(result).toEqual([]);
    consoleSpy.mockRestore();
  });
});

describe("getAlbumsById", () => {
  test("returns albums on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ album: [mockAlbum] }),
    });
    const result = await getAlbumsById("2");
    expect(result).toEqual([mockAlbum]);
  });

  test("returns empty array when null response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(null),
    });
    const result = await getAlbumsById("2");
    expect(result).toEqual([]);
  });
});

describe("getAlbumsByArtistAndAlbum", () => {
  test("returns albums on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ album: [mockAlbum] }),
    });
    const result = await getAlbumsByArtistAndAlbum("Nirvana", "Nevermind");
    expect(result).toEqual([mockAlbum]);
  });

  test("returns empty array on error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValue(new Error("fail"));
    const result = await getAlbumsByArtistAndAlbum("Nirvana", "Nevermind");
    expect(result).toEqual([]);
    consoleSpy.mockRestore();
  });
});

describe("getTracksByAlbum", () => {
  test("returns tracks on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ track: [mockTrack] }),
    });
    const result = await getTracksByAlbum("2");
    expect(result).toEqual([mockTrack]);
  });

  test("returns empty array when no track key", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });
    const result = await getTracksByAlbum("2");
    expect(result).toEqual([]);
  });

  test("returns empty array on error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValue(new Error("fail"));
    const result = await getTracksByAlbum("2");
    expect(result).toEqual([]);
    consoleSpy.mockRestore();
  });
});
