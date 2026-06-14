import { createFileRoute } from "@tanstack/react-router";
import { MovieCard, MovieCardSkeleton } from "@/components/movie/MovieCard";
import { useUpcomingMovies } from "@/hooks/queries/useMovies";

export const Route = createFileRoute("/upcoming")({ component: UpcomingPage });

function UpcomingPage() {
  const { data, isLoading } = useUpcomingMovies();
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => <MovieCardSkeleton key={i} />)
          : data?.results.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}
