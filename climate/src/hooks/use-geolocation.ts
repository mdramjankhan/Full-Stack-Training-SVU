import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationState {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;


}


export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true
    });

    const getLocation = () => {
    }

    useEffect(() => {
        getLocation();
    }, []);

    return {
        ...locationData,
        getLocation,
    };
}