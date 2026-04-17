import { GET } from "./route";
import { NextRequest } from "next/server";

const makeRequest = (url: string) => new NextRequest(url) as any;

describe("GET /api/artist/[id]", () => {
  afterEach(() => jest.restoreAllMocks());

  test("returns 400 when name param is missing and pathname ends with empty", async () => {
    const req = makeRequest("http://localhost/api/artist/");
    const res = await GET(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Falta el nombre del artista");
  });

  test("returns artist data on success", async () => {
    const mockArtist = { idArtist: "1", strArtist: "Nirvana" };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ artists: [mockArtist] }),
    });
    const req = makeRequest("http://localhost/api/artist/Nirvana?name=Nirvana");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual(mockArtist);
  });

  test("returns 404 when no artists found", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ artists: null }),
    });
    const req = makeRequest("http://localhost/api/artist/Unknown?name=Unknown");
    const res = await GET(req);
    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.error).toBe("Artista no encontrado");
  });

  test("returns error status when external fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 503,
      text: jest.fn().mockResolvedValue("Service Unavailable"),
    });
    const req = makeRequest("http://localhost/api/artist/Test?name=Test");
    const res = await GET(req);
    expect(res.status).toBe(503);
  });

  test("returns 500 on fetch exception", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network failure"));
    const req = makeRequest("http://localhost/api/artist/Test?name=Test");
    const res = await GET(req);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("Error llamando a TheAudioDB");
  });

  test("uses pathname when name searchParam is missing", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ artists: [{ idArtist: "1" }] }),
    });
    const req = makeRequest("http://localhost/api/artist/Nirvana");
    const res = await GET(req);
    expect(res.status).toBe(200);
  });
});
