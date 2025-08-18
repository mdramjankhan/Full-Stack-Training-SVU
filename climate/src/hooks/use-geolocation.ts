import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

// Step 1: define the shape of the location data area
interface GeolocationState {
    // will store {lat, lon} if location is found
    coordinates: Coordinates | null;
    // will store error message if location is not found
    error: string | null;
    // loading state while fetching the location
    isLoading: boolean;


}


// Step 2: Define the custom hook
export function useGeolocation() {
    // step 3: Initialize the state with defaullt values
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true
    });

    // step 4: Function to get the user's location
    const getLocation = () => {
        // reset error and loading state before fetching
        setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

        // step 5: Check if the browser supports geolocation
        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: "Geolocation is not supported by this browser.",
                isLoading: false
            });
            return;
        }

        //step 6: request the user's location from the browser
        navigator.geolocation.getCurrentPosition(
            // Success callback
            (position) => {
                setLocationData({
                    coordinates: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    },
                    isLoading: false,
                    error: null,
                });
            },
            // error callback
            (error) => {
                let errorMessage: string;
                // Map browser error codes to readable messages
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location permission is denied. Please enable the location service.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "The location request timed out.";
                        break;
                    default:
                        errorMessage = "An unknown error occurred.";
                    // break;

                }

                // step 7: Options fro geolocation request
                setLocationData({
                    isLoading: false,
                    error: errorMessage,
                    coordinates: null,
                });

            },

            {
                enableHighAccuracy: true, // try to get the most accuarate positoin
                timeout: 5000, // wait at most 5 seconds
                maximumAge: 0, // Don't use cached location
            }
        );
    };

    // step 8: automatically fetch the location on first render              
    useEffect(() => {
        getLocation();
    }, []);

    // step 9: return the state + method for manual refresh
    return {
        ...locationData, // Coordinates, errors, isLoading
        getLocation, // Allows re-fecthing location on demand
    };
}