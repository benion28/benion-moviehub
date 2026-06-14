import axios from "axios";

export const TMDB_IMAGE_URL =
  import.meta.env.VITE_TMDB_IMAGE_URL || "https://image.tmdb.org/t/p/w500";

export const tmdb = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const posterUrl = (path: string | null, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
