"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Track } from "../utils/apliClient";
import { Album } from "@/types";

interface PlayerContextType {
  currentTrack: Track | null;
  currentAlbum: Album[] | null;
  setCurrentTrack: (track: Track, album: Album[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setTrack] = useState<Track | null>(null);
  const [currentAlbum, setAlbum] = useState<Album[]>([]);

  const setCurrentTrack = (track: Track, album: Album[]) => {
    setTrack(track);
    setAlbum(album);
  };

  return (
    <PlayerContext.Provider
      value={{ currentTrack, currentAlbum, setCurrentTrack }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer debe usarse dentro de un PlayerProvider");
  }
  return context;
}
