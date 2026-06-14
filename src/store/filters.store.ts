import { create } from "zustand";
import type { SearchFilters } from "@/types/movie.types";

interface FiltersState extends SearchFilters {
  setQuery: (q: string) => void;
  setGenre: (g: string | null) => void;
  setYear: (y: string | null) => void;
  setRating: (r: string | null) => void;
  setSort: (s: string | null) => void;
  clearFilters: () => void;
}

const initial: SearchFilters = {
  query: "",
  genre: null,
  year: null,
  rating: null,
  sort: "popularity",
};

export const useFiltersStore = create<FiltersState>((set) => ({
  ...initial,
  setQuery: (query) => set({ query }),
  setGenre: (genre) => set({ genre }),
  setYear: (year) => set({ year }),
  setRating: (rating) => set({ rating }),
  setSort: (sort) => set({ sort }),
  clearFilters: () => set({ ...initial }),
}));
