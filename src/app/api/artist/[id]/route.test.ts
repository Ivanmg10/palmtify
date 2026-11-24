import { GET } from "./route";
import { NextRequest } from "next/server";

const makeRequest = (url: string) => new NextRequest(url) as any;

const dzArtist = {
  id: 415,
  name: "Nirvana",
  picture_xl: "https://cdn-images.dzcdn.net/images/artist/xl.jpg",
};

describe("GET /api/artist/[id]", () => {
  afterEach(() => jest.restoreAllMocks());

  test("returns 400 when name param is missing", async () => {
    const req = makeRequest("http://localhost/api/artist/");
    const res = await GET(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Falta el nombre del artista");
  });

  test("returns artist data on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ data: [dzArtist] }),
    });

    const req = makeRequest("http://localhost/api/artist/Nirvana?name=Nirvana");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.idArtist).toBe("415");
    expect(data.strArtist).toBe("Nirvana");
  });

  test("returns 404 when no artists found", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ data: [] }),
    });

    const req = makeRequest("http://localhost/api/artist/Unknown?name=Unknown");
    const res = await GET(req);
    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.error).toBe("Artista no encontrado");
  });

  test("uses pathname when name searchParam is missing", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ data: [dzArtist] }),
    });

    const req = makeRequest("http://localhost/api/artist/Nirvana");
    const res = await GET(req);
    expect(res.status).toBe(200);
  });
});
