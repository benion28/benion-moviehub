import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { MovieCard, MovieCardSkeleton } from "@/components/movie/MovieCard";
import { useGenres, useMovieSearch } from "@/hooks/queries/useMovies";
import { useFiltersStore } from "@/store/filters.store";

const searchSchema = z.object({ q: z.string().optional().default("") });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  component: SearchPage,
});

const years = Array.from({ length: new Date().getFullYear() - 1979 }, (_, i) =>
  String(new Date().getFullYear() - i),
);

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const filters = useFiltersStore();
  const genres = useGenres();
  const [input, setInput] = useState(q);

  // sync URL -> store with debounce
  useEffect(() => {
    setInput(q);
    filters.setQuery(q); /* eslint-disable-next-line */
  }, [q]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (input !== q) navigate({ search: { q: input } });
    }, 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const { data, isLoading, error, refetch } = useMovieSearch({
    query: filters.query,
    genre: filters.genre,
    year: filters.year,
    rating: filters.rating,
    sort: filters.sort,
  });

  const results = data?.results || [];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search movies..."
            aria-label="Search"
            className="w-full h-12 pl-11 pr-10 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {input && (
            <button
              onClick={() => setInput("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <Button size="lg" className="h-12 px-5 rounded-xl">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </div>

      <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-bold">
            {filters.query ? `Search Results for "${filters.query}"` : "Browse Movies"}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">{results.length} results found</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
        <FilterSelect
          label="Genre"
          value={filters.genre || ""}
          onChange={(v) => filters.setGenre(v || null)}
          options={[
            { value: "", label: "All Genres" },
            ...(genres.data?.genres.map((g) => ({ value: String(g.id), label: g.name })) || []),
          ]}
        />
        <FilterSelect
          label="Year"
          value={filters.year || ""}
          onChange={(v) => filters.setYear(v || null)}
          options={[
            { value: "", label: "All Years" },
            ...years.map((y) => ({ value: y, label: y })),
          ]}
        />
        <FilterSelect
          label="Rating"
          value={filters.rating || ""}
          onChange={(v) => filters.setRating(v || null)}
          options={[
            { value: "", label: "All Ratings" },
            { value: "7", label: "7+" },
            { value: "8", label: "8+" },
            { value: "9", label: "9+" },
          ]}
        />
        <FilterSelect
          label="Sort By"
          value={filters.sort || "popularity"}
          onChange={(v) => filters.setSort(v)}
          options={[
            { value: "popularity", label: "Popularity" },
            { value: "rating", label: "Rating" },
            { value: "release_date", label: "Release Date" },
            { value: "title", label: "Title" },
          ]}
        />
        <button
          onClick={() => {
            filters.clearFilters();
            setInput("");
            navigate({ search: { q: "" } });
          }}
          className="text-sm font-medium text-primary hover:underline self-end pb-2.5"
        >
          Clear Filters
        </button>
      </div>

      {error ? (
        <div className="p-10 text-center">
          <p className="text-sm text-muted-foreground mb-3">Failed to load results.</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : !results.length ? (
        <div className="p-10 text-center text-sm text-muted-foreground">
          No movies match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 px-3 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
