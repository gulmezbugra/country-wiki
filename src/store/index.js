import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const useCountriesStore = create((set, get) => ({
  countries: [],
  loading: false,
  error: null,
  fetched: false,

  setCountries: (countries) => set({ countries, fetched: true }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));


export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [], 

      toggleFavorite: (cca3) => {
        const { favorites } = get();
        const isFav = favorites.includes(cca3);
        set({
          favorites: isFav
            ? favorites.filter((c) => c !== cca3)
            : [...favorites, cca3],
        });
      },

      isFavorite: (cca3) => get().favorites.includes(cca3),
    }),
    {
      name: 'country-wiki-favorites',
    }
  )
);
