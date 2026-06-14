export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  genre_ids?: number[];
  popularity?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  original_language: string;
  status: string;
  budget: number;
  revenue: number;
  tagline: string;
  production_companies: { id: number; name: string }[];
  credits?: {
    crew: { job: string; name: string }[];
    cast: { name: string }[];
  };
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface FavoriteMovie {
  id: number;
  title: string;
  posterPath: string | null;
  rating: number;
}

export interface SearchFilters {
  query: string;
  genre: string | null;
  year: string | null;
  rating: string | null;
  sort: string | null;
}
