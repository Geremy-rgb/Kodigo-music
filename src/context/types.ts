export type Song = { id: number; title: string; artist: string; image: string };

export type FavoritesContextType = {
  favorites: Song[];
  toggleFavorite: (song: Song) => void;
};