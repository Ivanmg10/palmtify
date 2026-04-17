import {
  someBands,
  madeForYou,
  jumpBackIn,
  recentlyPlayed,
  hipHop90s,
  megaAlbums,
  safeAlbumsAndArtists,
} from "./albums";

describe("albums constants", () => {
  test("someBands is a non-empty array of strings", () => {
    expect(Array.isArray(someBands)).toBe(true);
    expect(someBands.length).toBeGreaterThan(0);
    someBands.forEach((band) => expect(typeof band).toBe("string"));
  });

  test("madeForYou has id, artist, and album fields", () => {
    expect(Array.isArray(madeForYou)).toBe(true);
    madeForYou.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("artist");
      expect(item).toHaveProperty("album");
    });
  });

  test("jumpBackIn has id, artist, and album fields", () => {
    expect(Array.isArray(jumpBackIn)).toBe(true);
    jumpBackIn.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("artist");
      expect(item).toHaveProperty("album");
    });
  });

  test("recentlyPlayed has id, artist, and album fields", () => {
    expect(Array.isArray(recentlyPlayed)).toBe(true);
    recentlyPlayed.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("artist");
    });
  });

  test("hipHop90s is a non-empty array", () => {
    expect(Array.isArray(hipHop90s)).toBe(true);
    expect(hipHop90s.length).toBeGreaterThan(0);
  });

  test("megaAlbums is a non-empty array", () => {
    expect(Array.isArray(megaAlbums)).toBe(true);
    expect(megaAlbums.length).toBeGreaterThan(0);
  });

  test("safeAlbumsAndArtists contains entries with isArtist flag", () => {
    expect(Array.isArray(safeAlbumsAndArtists)).toBe(true);
    const artistEntries = safeAlbumsAndArtists.filter((e) => e.isArtist);
    expect(artistEntries.length).toBeGreaterThan(0);
  });
});
