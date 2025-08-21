import { CurrentWeather } from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import WeatherDetails from "@/components/weather-details";
import { useGeolocation } from "@/hooks/use-geolocation"
import { useForcastQuery, useReversedGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"

export const WeatherDashboard = () => {
  const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForcastQuery(coordinates);
  const locationQuery = useReversedGeocodeQuery(coordinates);

  // console.log(locationQuery);
  // console.log(weatherQuery)
  // console.log(forecastQuery)

  const handleResfresh = () => {
    getLocation();
    if (coordinates) {
      // Reload the weather data 
      weatherQuery.refetch();
        forecastQuery.refetch();
        locationQuery.refetch();
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

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant={"destructive"}>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          <Button
            onClick={handleResfresh}
            variant={"outline"}
            className="w-fit"
          >

            <RefreshCw className={` h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""} `} />
            Retry

          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if(!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />
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
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >

          <RefreshCw className={` h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""} `} />
        </Button>
      </div>

      {/* {Current and hourly forcast} */}
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* {Current Weather} */}
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName} />
          {/* {Hourly Temparature} */}
          <HourlyTemperature data={forecastQuery.data} />
        </div>
      </div>


      <div>
        <div>
          {/* {Details } */}
          <WeatherDetails data={weatherQuery.data} />
          {/* {Forcast} */}
        </div>
      </div>
    </div>
  )
}
