import Card from "../components/Card";
import { useFavorites } from "../context/useFavorites";

export default function Library() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">Your Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-400">No has agregado favoritos</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map(song => (
            <Card key={song.id} {...song} isFavorite={true} onFavorite={() => toggleFavorite(song)} />
          ))}
        </div>
      )}
    </div>
  );
}