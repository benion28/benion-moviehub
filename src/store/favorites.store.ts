import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FavoriteMovie } from "@/types/movie.types";

interface FavoritesState {
  favorites: FavoriteMovie[];
  addFavorite: (m: FavoriteMovie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (m) =>
        set((s) =>
          s.favorites.some((f) => f.id === m.id) ? s : { favorites: [...s.favorites, m] },
        ),
      removeFavorite: (id) => set((s) => ({ favorites: s.favorites.filter((f) => f.id !== id) })),
      isFavorite: (id) => get().favorites.some((f) => f.id === id),
    }),
    { name: "moviehub-favorites" },
  ),
);
