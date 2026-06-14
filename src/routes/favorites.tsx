import { createFileRoute } from "@tanstack/react-router";
import { MovieCard } from "@/components/movie/MovieCard";
import { useFavoritesStore } from "@/store/favorites.store";

export const Route = createFileRoute("/favorites")({ component: FavoritesPage });

function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
      {!favorites.length ? (
        <p className="text-sm text-muted-foreground">
          No favorites yet. Add some from any movie page!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((f) => (
            <MovieCard
              key={f.id}
              movie={{
                id: f.id,
                title: f.title,
                poster_path: f.posterPath,
                vote_average: f.rating,
                release_date: "",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
