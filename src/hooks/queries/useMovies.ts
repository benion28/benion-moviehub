import { useQuery } from "@tanstack/react-query";
import { movieApi } from "@/api/movie.api";
import type { SearchFilters } from "@/types/movie.types";

export const useNowPlayingMovies = () =>
  useQuery({ queryKey: ["movies", "now_playing"], queryFn: movieApi.nowPlaying });

export const usePopularMovies = () =>
  useQuery({ queryKey: ["movies", "popular"], queryFn: movieApi.popular });

export const useTopRatedMovies = () =>
  useQuery({ queryKey: ["movies", "top_rated"], queryFn: movieApi.topRated });

export const useUpcomingMovies = () =>
  useQuery({ queryKey: ["movies", "upcoming"], queryFn: movieApi.upcoming });

export const useMovieDetails = (id: string | number) =>
  useQuery({
    queryKey: ["movie", String(id)],
    queryFn: () => movieApi.details(id),
    enabled: !!id,
  });

export const useMovieRecommendations = (id: string | number) =>
  useQuery({
    queryKey: ["movie", String(id), "recommendations"],
    queryFn: () => movieApi.recommendations(id),
    enabled: !!id,
  });

export const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: movieApi.genres,
    staleTime: 1000 * 60 * 60,
  });

export const useMovieSearch = (filters: SearchFilters) =>
  useQuery({
    queryKey: ["search", filters],
    queryFn: () => movieApi.search(filters),
  });
