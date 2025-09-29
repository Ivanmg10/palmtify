import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import PalmtifyLateralLibrary from "./components/palmtify-lateral-library/LateralLibrary";
import { getAlbumsByArtistAndAlbum } from "./utils/apliClient";
import { recentlyPlayed } from "./constants/albums";
import MainBottomReproducer from "./components/palmtify-bottom-reproducer/MainBottomReproducer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Palmtify",
  description: "A Spotify clone built with Next.js and Tailwind CSS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased flex flex-col h-screen`}
      >
        <main className="flex-1 p-4 pb-0 grid grid-cols-[auto_1fr] gap-2 bg-black h-screen overflow-auto">
          <PalmtifyLateralLibrary recentlyPlayedArray={recentlyPlayedArray} />

          {children}
        </main>

        <footer className="sticky bottom-0 w-full bg-black text-white">
          <MainBottomReproducer />
        </footer>
      </body>
    </html>
  );
}
