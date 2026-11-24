## Problem

TheAudioDB's free public test key (`123`) now returns **only 1 result** per listing endpoint (`album.php`, `track.php`, `discography.php`). They moved to a paid-key model, so album and artist pages went from full tracklists/discographies to a single item.

## Solution

Migrate all data fetching to the **Deezer open API** (`api.deezer.com`) — free, no API key, no signup — while keeping the exact same TheAudioDB-shaped contract (`Artist`/`Album`/`Track`), so **no presentation component had to change**.

### Changes

- **`src/app/utils/deezer.ts`** (new): raw Deezer types, `fetchDeezer` helper (retry on 429, in-memory cache, in-band error detection) and pure mappers to the app's existing shapes.
- **`src/app/utils/apliClient.tsx`**: rewritten on top of Deezer with the same function signatures (`getArtist`, `getArtistById`, `getAlbumsByArtist(Id)`, `getAlbumsById`, `getAlbumsByArtistAndAlbum`, `getTracksByAlbum`). `Track` type moved to `types.ts` (re-exported for compatibility).
- **API routes** (`/api/artist`, `/api/albums`, `/api/tracks`): now delegate to `apliClient` instead of calling TheAudioDB directly. Same status codes (400/404/200).
- **Resilience**: `layout.tsx`, `HomePageTopSection.tsx` and `HomePageSliders.tsx` now filter out albums that fail to load instead of crashing with `album[0].idAlbum` on an empty array (this broke `next build` prerendering and rendered dead cards linking to `/albums/undefined`).
- **Album page**: calls `notFound()` when the album doesn't exist instead of crashing.
- **Image fallbacks**: all `<Image>` components now use descriptive `alt` text and fall back to a real `/placeholder.png` (added) — no more broken-image `alt="?"` glyphs.
- **`next.config.ts`**: allow `cdn-images.dzcdn.net` for `next/image`.

### Field mappings

| App field | Source (Deezer) | Note |
|---|---|---|
| `intDuration` | `duration * 1000` | Deezer is seconds, app expects ms |
| `intTotalPlays` | `rank` | popularity 0–1M, powers "Popular songs" sorting |
| `strAlbumThumb` | `cover_xl` (falls back `cover_big`/`cover`) | 1000×1000 |
| `strReleaseFormat` | `record_type` | capitalized ("Album"/"Single"/"EP") |
| `intYearReleased` | `release_date` first 4 chars | |
| bio/genre/style | — | Deezer open API has no bios; rendered empty |

`getAlbumsByArtistAndAlbum` matches by normalized title (case/punctuation/accents-insensitive, with partial-match fallback) — verified against all 19 `recentlyPlayed` entries.

## Verification

- `npm test`: **196 passing**, 100% coverage threshold kept.
- `npm run build`: ✅ (prerender fixed).
- Smoke test: `/api/tracks/270615252` → 25 tracks; `/api/albums/415` → 25 Nirvana albums; `/albums/270615252`, `/artist/415` and `/` render with real Deezer data; `/albums/undefined` renders the 404 page; home page contains 0 links to `/albums/undefined`.

## Notes / follow-ups

- Deezer's open API has no artist bios, so the About section shows only the name/photo. Could enrich later via Wikipedia/MusicBrainz.
- Unauthenticated rate limit (~50 req / 5 s / IP): the home page fires ~200 requests on a cold render, so `fetchDeezer` retries up to 3 attempts with backoff on HTTP 429 (no-store on retries) and successful responses are cached for 1 h (Next Data Cache + in-memory Map). First cold load after deploy may still be slow; warm loads are instant.
- Deezer reports some failures (unknown id, quota exceeded) with HTTP 200 and an in-band `{"error": ...}` body — `fetchDeezer` treats those as failures so pages render their empty/404 states instead of garbage.
- `getAlbumsByArtistAndAlbum` falls back to free album search when an album isn't in the artist's own list (e.g. MF DOOM — *Operation: Doomsday* only exists as *Operation: Doomsday (Complete)*). All 62 unique albums in `constants/albums.ts` were audited against Deezer: every entry exists.
- Deezer track objects include a 30s `preview` URL — a future real audio player could use it.
