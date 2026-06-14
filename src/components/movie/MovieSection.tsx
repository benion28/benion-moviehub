import { Link } from "@tanstack/react-router";
import { MovieCard, MovieCardSkeleton } from "./MovieCard";
import type { Movie } from "@/types/movie.types";

interface Props {
  title: string;
  movies?: Movie[];
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  viewAllTo?: string;
}

export function MovieSection({ title, movies, isLoading, error, onRetry, viewAllTo }: Props) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {viewAllTo && (
          <Link
            to={viewAllTo as "/search"}
            search={{ q: "" }}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        )}
      </div>
      {error ? (
        <div className="p-6 rounded-xl border border-border bg-card text-center">
          <p className="text-sm text-muted-foreground mb-3">Failed to load movies.</p>
          {onRetry && (
            <button onClick={onRetry} className="text-sm font-medium text-primary hover:underline">
              Retry
            </button>
          )}
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : !movies?.length ? (
        <p className="text-sm text-muted-foreground">No movies found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.slice(0, 6).map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </section>
  );
}
