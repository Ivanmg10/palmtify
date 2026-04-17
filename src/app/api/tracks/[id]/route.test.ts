import { GET } from "./route";
import { NextRequest } from "next/server";

const makeRequest = (url: string) => new NextRequest(url) as any;

describe("GET /api/tracks/[id]", () => {
  afterEach(() => jest.restoreAllMocks());

  test("returns 400 when id param is missing and pathname ends with empty", async () => {
    const req = makeRequest("http://localhost/api/tracks/");
    const res = await GET(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Falta el ID del álbum");
  });

  test("returns tracks on success", async () => {
    const mockTrack = [{ idTrack: "1", strTrack: "Song" }];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ track: mockTrack }),
    });
    const req = makeRequest("http://localhost/api/tracks/123?id=123");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual(mockTrack);
  });

  test("returns 404 when no tracks found", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ track: null }),
    });
    const req = makeRequest("http://localhost/api/tracks/999?id=999");
    const res = await GET(req);
    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.error).toBe("No hay canciones en este álbum");
  });

  test("returns error status when external fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 503,
      text: jest.fn().mockResolvedValue("Service Unavailable"),
    });
    const req = makeRequest("http://localhost/api/tracks/123?id=123");
    const res = await GET(req);
    expect(res.status).toBe(503);
  });

  test("returns 500 on fetch exception", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("fail"));
    const req = makeRequest("http://localhost/api/tracks/123?id=123");
    const res = await GET(req);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("Error llamando a TheAudioDB");
  });

  test("uses pathname when id searchParam is missing", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ track: [{ idTrack: "1" }] }),
    });
    const req = makeRequest("http://localhost/api/tracks/123");
    const res = await GET(req);
    expect(res.status).toBe(200);
  });
});
