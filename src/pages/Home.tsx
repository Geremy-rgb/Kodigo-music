import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useFavorites } from "../context/useFavorites";
import type { Song } from "../context/types";

type iTunesResult = {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
};

// Función para mezclar un array al azar

function randomArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Home() {

  const [songs, setSongs] = useState<Song[]>([]);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {

    const artists = ["post+malone", "khalid"];

    Promise.all(
      artists.map((artist) =>
        fetch(
          `https://itunes.apple.com/search?term=${artist}&entity=song&limit=15`
        )
          .then((res) => res.json())
          .then((data) =>
            data.results.map((item: iTunesResult) => ({
              id: item.trackId,
              title: item.trackName,
              artist: item.artistName,
              image: item.artworkUrl100.replace(
                "100x100bb.jpg",
                "200x200bb.jpg"
              ),
            }))
          )
      )
    )
      .then((results) => {
        const combined = results.flat();
        setSongs(randomArray(combined)); // mezclamos y guardamos
      })
      .catch((err) => console.error(err));
  }, []);

  // Creamos copias mezcladas para cada sección
  const recommendedSongs = randomArray(songs);
  const topWeekSongs = randomArray(songs);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Canciones recomendadas</h3>

      {/* card de las recomendadas */}

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {recommendedSongs.map((song) => (
          <Card
            key={song.id}
            {...song}
            isFavorite={favorites.some((f) => f.id === song.id)}
            onFavorite={() => toggleFavorite(song)}
            className="flex-shrink-0 w-48 aspect-square snap-start"
          />
        ))}
      </div>

      {/* Card de los artistas*/}

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 mt-4">Top Artists</h3>
        <div className="flex overflow-x-auto gap-4 pb-2">
          {Array.from(new Map(songs.map((s) => [s.artist, s])).values()).map(
            (artistSong) => (
              <div
                key={artistSong.artist}
                className="min-w-[200px] flex flex-col items-center gap-2"
              >
                <img
                  src={artistSong.image}
                  alt={artistSong.artist}
                  className="w-32 h-32 rounded-full object-cover "
                />
                <p className="font-medium">{artistSong.artist}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* card de lo mejor de la semana */}

      <h3 className="text-2xl font-semibold mb-4">Lo mejor de la semana</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {topWeekSongs.map((song) => (
          <Card
            key={song.id}
            {...song}
            isFavorite={favorites.some((f) => f.id === song.id)}
            onFavorite={() => toggleFavorite(song)}
            className="flex-shrink-0 w-48 aspect-square snap-start "
          />
        ))}
      </div>
    </div>
  );
}
