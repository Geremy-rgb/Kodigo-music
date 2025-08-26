import { useState } from "react";
import type { ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";
import type {Song } from "./types";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Song[]>([]);

  const toggleFavorite = (song: Song) => {
    setFavorites(prev => 
      prev.find(f => f.id === song.id) 
        ? prev.filter(f => f.id !== song.id) 
        : [...prev, song]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};