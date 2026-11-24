import { GET } from "./route";
import { NextRequest } from "next/server";

const makeRequest = (url: string) => new NextRequest(url);

const dzTrack = {
  id: 1543592112,
  title: "Smells Like Teen Spirit",
  duration: 301,
  rank: 352445,
  artist: { id: 415, name: "Nirvana" },
};

const dzAlbumDetail = {
  id: 270615252,
  title: "Nevermind (Remastered)",
  cover_xl: "https://cdn-images.dzcdn.net/images/cover/xl.jpg",
  tracks: { data: [dzTrack] },
};

describe("GET /api/tracks/[id]", () => {
  afterEach(() => jest.restoreAllMocks());

  test("returns 400 when id param is missing", async () => {
    const req = makeRequest("http://localhost/api/tracks/");
    const res = await GET(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Falta el ID del álbum");
  });

  test("returns tracks on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(dzAlbumDetail),
    });

    const req = makeRequest("http://localhost/api/tracks/270615252?id=270615252");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].strTrack).toBe("Smells Like Teen Spirit");
    expect(data[0].intDuration).toBe(301000);
  });

  test("returns 404 when no tracks found", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValue({ error: { type: "DataException", message: "not found" } }),
    });

    const req = makeRequest("http://localhost/api/tracks/999?id=999");
    const res = await GET(req);
    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.error).toBe("No hay canciones en este álbum");
  });

  test("uses pathname when id searchParam is missing", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(dzAlbumDetail),
    });

    const req = makeRequest("http://localhost/api/tracks/270615252");
    const res = await GET(req);
    expect(res.status).toBe(200);
  });
});
