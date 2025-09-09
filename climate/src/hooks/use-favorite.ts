import { use } from "react";
import useLocalStorage from "./use-local-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface FavoriteCity {
    id: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    addedAt: number;
}

export function useFavorite() {
    const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
        "favorites",
        []
    );
    const queryClient = useQueryClient();
    const favoritesQuery = useQuery({
        queryKey: ["favorites"],
        queryFn: () => favorites,
        initialData: favorites,
        staleTime: Infinity,
    });

    const addToFavorites = useMutation({
        mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
            const newFavorite: FavoriteCity = {
                ...city,
                id: `${city.lat}-${city.lon}-${Date.now()}`,
                addedAt: Date.now(),
            };
            const exists = favorites.some(
                (fav) => fav.id === newFavorite.id);
            if (exists) {
                return newFavorite;
            }
            const newFavorites = [...favorites, newFavorite];
            setFavorites(newFavorites);
            return newFavorites;

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            });
        },
    });

    const removeFavorite = useMutation({
        mutationFn: async(cityId: string)=> {
            const newFavorites = favorites.filter((fav) => fav.id !== cityId);
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: ()=> {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            });
        },
    });

    return {
        favorites: favoritesQuery.data ?? [],
        addToFavorites,
        removeFavorite,
        isFavorite: (lat: number, lon: number) =>
            favorites.some((city) => city.lat === lat && city.lon === lon)
    };


}