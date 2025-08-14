import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useForcastQuery, useReversedGeocodeQuery, useWeatherQuery} from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"

export const WeatherDashboard = () => {
  const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);

  const forecastQuery = useForcastQuery(coordinates);
  const locationQuery = useReversedGeocodeQuery(coordinates);

  console.log(locationQuery);
  // console.log(weatherQuery)
  // console.log(forecastQuery)

  const handleResfresh = () => {
    getLocation();
    if (coordinates) {
      // Reload the weather data 


    }
  }


  if (locationLoading) {
    return <WeatherSkeleton />
  }

  if (locationError) {
    return (
      <Alert variant={"destructive"}>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button
            onClick={getLocation} variant={"outline"}
            className="w-fit"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location

          </Button>

        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant={"destructive"}>
        <AlertTitle className="flex items-center gap-4">Location Required</AlertTitle>
        <p>
          Please enable location access to see your local weather.
        </p>
        <Button
          onClick={getLocation}
          variant={"outline"}
          className="w-fit"
        >
          <MapPin className="mr-2 h-4 w-4">Enable Location</MapPin>
        </Button>
      </Alert>
    );
  }


  return (
    <div className="space-y-4 ">
      {/* Favourite cities */}
      <div className="flex items-center justify-between ">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          onClick={handleResfresh}
          size={"icon"}
        >

          <RefreshCw className="h-4 w-4" />
        </Button>

        {/* {Current and hourly forcast} */}


      </div>
    </div>
  )
}
