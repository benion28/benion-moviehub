import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { posterUrl } from "@/api/axios";
import type { Movie } from "@/types/movie.types";
import { cn } from "@/lib/utils";

interface Props {
  movie: Pick<Movie, "id" | "title" | "poster_path" | "vote_average" | "release_date">;
  className?: string;
  overlayTitle?: boolean;
}

export function MovieCard({ movie, className, overlayTitle }: Props) {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const img = posterUrl(movie.poster_path);
  return (
    <Link
      to="/movie/$id"
      params={{ id: String(movie.id) }}
      className={cn("group flex flex-col gap-2", className)}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
        {img ? (
          <img
            src={img}
            alt={movie.title}
            loading="lazy"
            className="size-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="size-full flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
            {movie.title}
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded-md">
          <Star className="size-3 fill-rating text-rating" />
          {rating}
        </div>
        {overlayTitle && (
          <div className="absolute inset-x-0 bottom-0 p-2 text-white text-xs font-semibold bg-gradient-to-t from-black/80 to-transparent">
            {movie.title}
          </div>
        )}
      </div>
      {!overlayTitle && (
        <div>
          <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary">
            {movie.title}
          </h3>
          {year && <p className="text-xs text-muted-foreground mt-0.5">{year}</p>}
        </div>
      )}
    </Link>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-[2/3] rounded-xl bg-muted animate-pulse" />
      <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
      <div className="h-3 w-1/3 bg-muted rounded animate-pulse" />
    </div>
  );
}
