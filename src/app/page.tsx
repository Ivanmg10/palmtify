import PalmtifyHeader from "./components/palmtify-header/MainHeader";
import HomePage from "./components/palmtify-home-page/HomePage";
import PalmtifyLateralLibrary from "./components/palmtify-lateral-library/LateralLibrary";
import { recentlyPlayed } from "./constants/albums";
import { getAlbumsByArtistAndAlbum } from "./utils/apliClient";

export default async function Home() {
  const recentlyPlayedArray = recentlyPlayed
    ? await Promise.all(
        recentlyPlayed.map(async (band) => {
          const album = await getAlbumsByArtistAndAlbum(
            band.artist,
            band.album
          );
          return {
            id: band.id,
            artist: band.artist,
            albumName: band.album,
            album,
          };
        })
      )
    : [];

  return (
    <div className="min-h-screen">
      <PalmtifyHeader />

      <main className="p-4 grid grid-cols-[400px_1fr] gap-4">
        <PalmtifyLateralLibrary recentlyPlayedArray={recentlyPlayedArray} />

        <HomePage />
      </main>
    </div>
  );
}
