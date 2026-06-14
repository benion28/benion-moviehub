import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Heart, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MovieCard } from "@/components/movie/MovieCard";
import { useMovieDetails, useMovieRecommendations } from "@/hooks/queries/useMovies";
import { useFavoritesStore } from "@/store/favorites.store";
import { posterUrl } from "@/api/axios";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/movie/$id")({
  component: MovieDetailsPage,
});

function MovieDetailsPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const { data: movie, isLoading, error } = useMovieDetails(id);
  const { data: recs } = useMovieRecommendations(id);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const fav = movie ? isFavorite(movie.id) : false;

  const toggleFav = () => {
    if (!movie) return;
    if (fav) {
      removeFavorite(movie.id);
      toast.success("Removed from Favorites");
    } else {
      addFavorite({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        rating: movie.vote_average,
      });
      toast.success("Added to Favorites");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="animate-pulse grid md:grid-cols-[300px_1fr] gap-8">
          <div className="aspect-[2/3] bg-muted rounded-xl" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-24 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="bg-card border border-border rounded-2xl p-10 text-center">
        <p className="text-muted-foreground mb-4">Failed to load movie.</p>
        <Button onClick={() => router.history.back()}>Go back</Button>
      </div>
    );
  }

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "";
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "";
  const director = movie.credits?.crew.find((c) => c.job === "Director")?.name;
  const cast = movie.credits?.cast
    .slice(0, 3)
    .map((c) => c.name)
    .join(", ");
  const poster = posterUrl(movie.poster_path, "w780");

  const fmt = (n: number) => (n ? `$${n.toLocaleString()}` : "—");

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <button
          onClick={() => router.history.back()}
          className="flex items-center gap-2 text-sm font-medium mb-6 hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Back
        </button>

        <div className="grid md:grid-cols-[minmax(0,360px)_1fr] gap-6 md:gap-8">
          <div className="aspect-[2/3] w-full max-w-[280px] mx-auto md:max-w-none md:mx-0 rounded-xl overflow-hidden bg-muted">
            {poster && <img src={poster} alt={movie.title} className="size-full object-cover" />}
          </div>

          <div className="min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              {year && <span>{year}</span>}
              {runtime && (
                <>
                  <span>•</span>
                  <span>{runtime}</span>
                </>
              )}
              {movie.status && (
                <>
                  <span>•</span>
                  <span>{movie.status}</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border">
                <Star className="size-4 fill-rating text-rating" />
                <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({movie.vote_count.toLocaleString()} votes)
              </span>
              <Button onClick={toggleFav} size="lg" className="w-full sm:w-auto sm:ml-auto">
                <Heart className={cn("size-4", fav && "fill-current")} />
                {fav ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </div>

            <section className="mt-6">
              <h2 className="font-bold mb-2">Overview</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {movie.overview || "No overview available."}
              </p>
            </section>

            <section className="mt-6">
              <h2 className="font-bold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <Badge key={g.id} variant="secondary" className="rounded-full px-3 py-1">
                    {g.name}
                  </Badge>
                ))}
              </div>
            </section>

            <dl className="mt-6 grid grid-cols-[110px_minmax(0,1fr)] sm:grid-cols-[140px_1fr] gap-y-3 text-sm break-words">
              <dt className="text-muted-foreground">Release Date</dt>
              <dd>{movie.release_date || "—"}</dd>
              {director && (
                <>
                  <dt className="text-muted-foreground">Director</dt>
                  <dd>{director}</dd>
                </>
              )}
              {cast && (
                <>
                  <dt className="text-muted-foreground">Cast</dt>
                  <dd>{cast}</dd>
                </>
              )}
              <dt className="text-muted-foreground">Language</dt>
              <dd className="uppercase">{movie.original_language}</dd>
              <dt className="text-muted-foreground">Budget</dt>
              <dd>{fmt(movie.budget)}</dd>
              <dt className="text-muted-foreground">Revenue</dt>
              <dd>{fmt(movie.revenue)}</dd>
              {movie.popularity != null && (
                <>
                  <dt className="text-muted-foreground">Popularity</dt>
                  <dd>{movie.popularity.toFixed(0)}</dd>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>

      {!!recs?.results.length && (
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold mb-4">Similar Movies</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
            {recs.results.slice(0, 12).map((m) => (
              <div key={m.id} className="shrink-0 w-40">
                <MovieCard movie={m} overlayTitle />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <Link to="/" className="text-sm text-primary hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
