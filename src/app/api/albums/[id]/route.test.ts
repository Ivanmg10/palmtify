import { GET } from "./route";
import { NextRequest } from "next/server";

const makeRequest = (url: string) => new NextRequest(url) as any;

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

function mockOk(payload: unknown) {
  return {
    ok: true,
    json: jest.fn().mockResolvedValue(payload),
  };
}

describe("GET /api/albums/[id]", () => {
  afterEach(() => jest.restoreAllMocks());

  test("returns 400 when id param is missing", async () => {
    const req = makeRequest("http://localhost/api/albums/");
    const res = await GET(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Falta el ID del artista");
  });

  test("returns albums on success", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(mockOk(dzArtist))
      .mockResolvedValueOnce(mockOk({ data: [dzAlbum] }));

    const req = makeRequest("http://localhost/api/albums/415?id=415");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].idAlbum).toBe("270615252");
  });

  test("returns 404 when no albums found", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(mockOk(dzArtist))
      .mockResolvedValueOnce(mockOk({ data: [] }));

    const req = makeRequest("http://localhost/api/albums/999?id=999");
    const res = await GET(req);
    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.error).toBe("No hay álbumes para este artista");
  });

  test("uses pathname when id searchParam is missing", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(mockOk(dzArtist))
      .mockResolvedValueOnce(mockOk({ data: [dzAlbum] }));

    const req = makeRequest("http://localhost/api/albums/415");
    const res = await GET(req);
    expect(res.status).toBe(200);
  });
});
