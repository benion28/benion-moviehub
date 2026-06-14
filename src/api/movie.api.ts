import { tmdb } from "./axios";
import type {
  Genre,
  Movie,
  MovieDetails,
  PaginatedResponse,
  SearchFilters,
} from "@/types/movie.types";

export const movieApi = {
  nowPlaying: () => tmdb.get<PaginatedResponse<Movie>>("/movie/now_playing").then((r) => r.data),
  popular: () => tmdb.get<PaginatedResponse<Movie>>("/movie/popular").then((r) => r.data),
  topRated: () => tmdb.get<PaginatedResponse<Movie>>("/movie/top_rated").then((r) => r.data),
  upcoming: () => tmdb.get<PaginatedResponse<Movie>>("/movie/upcoming").then((r) => r.data),
  details: (id: number | string) =>
    tmdb
      .get<MovieDetails>(`/movie/${id}`, { params: { append_to_response: "credits" } })
      .then((r) => r.data),
  recommendations: (id: number | string) =>
    tmdb.get<PaginatedResponse<Movie>>(`/movie/${id}/recommendations`).then((r) => r.data),
  genres: () => tmdb.get<{ genres: Genre[] }>("/genre/movie/list").then((r) => r.data),
  search: (filters: SearchFilters, page = 1) => {
    const sortMap: Record<string, string> = {
      popularity: "popularity.desc",
      rating: "vote_average.desc",
      release_date: "primary_release_date.desc",
      title: "original_title.asc",
    };
    if (filters.query) {
      return tmdb
        .get<PaginatedResponse<Movie>>("/search/movie", {
          params: { query: filters.query, page, year: filters.year || undefined },
        })
        .then((r) => {
          let results = r.data.results;
          if (filters.genre)
            results = results.filter((m) => m.genre_ids?.includes(Number(filters.genre)));
          if (filters.rating)
            results = results.filter((m) => m.vote_average >= Number(filters.rating));
          return { ...r.data, results };
        });
    }
    return tmdb
      .get<PaginatedResponse<Movie>>("/discover/movie", {
        params: {
          page,
          with_genres: filters.genre || undefined,
          primary_release_year: filters.year || undefined,
          "vote_average.gte": filters.rating || undefined,
          sort_by: sortMap[filters.sort || "popularity"] || "popularity.desc",
        },
      })
      .then((r) => r.data);
  },
};
