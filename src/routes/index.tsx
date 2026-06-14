import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { MovieSection } from "@/components/movie/MovieSection";
import { useNowPlayingMovies, usePopularMovies } from "@/hooks/queries/useMovies";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const nowPlaying = useNowPlayingMovies();
  const popular = usePopularMovies();
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <Header />
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Discover Movies</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Find and explore your next favorite movie.
        </p>
      </div>
      <MovieSection
        title="Now Playing"
        movies={nowPlaying.data?.results}
        isLoading={nowPlaying.isLoading}
        error={nowPlaying.error}
        onRetry={() => nowPlaying.refetch()}
        viewAllTo="/search"
      />
      <MovieSection
        title="Popular Movies"
        movies={popular.data?.results}
        isLoading={popular.isLoading}
        error={popular.error}
        onRetry={() => popular.refetch()}
        viewAllTo="/search"
      />
    </div>
  );
}
