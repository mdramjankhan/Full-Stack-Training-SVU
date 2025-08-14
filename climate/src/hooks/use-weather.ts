import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

// Define query Key generator functtios for different weather related
//request,these functions create unique keys for react queries catching
// Passing coordinattes ensures that data is caches separately for each location
export const WEATHER_KEYS = {
    // current weather key
    weather: (coords: Coordinates) => ["weather", coords] as const,
    // forecast key
    forecast: (coords: Coordinates) => ["forecast", coords] as const,
    // Reverse geocode key
    location: (coords: Coordinates) => ["location", coords] as const,
};


// Hook to fetch the current weather data based on given coordinates 
export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
        // Generate a unique key for catching, if no "coordinates" use dummy {lat:0, lon:0}, Just to maintain type consistency
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
        // fetch functions: calls whather api only of valid exists eslse return null
        queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        // Enabled ensures that the query is only executed if coordinates are valid
        enabled: !!coordinates,
    });

}

// Hook to fetch the forecast data based on given coordiantes
export function useForcastQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates,
    });
}

// Hook to perform reverse geocoding (convert lat/ lon)
export function useReversedGeocodeQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
        enabled: !!coordinates,
    });
}