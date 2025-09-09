import { CurrentWeather } from "@/components/current-weather";
import FavoriteButton from "@/components/favorite-button";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import WeatherDetails from "@/components/weather-details";
import { WeatherForcast } from "@/components/weather-forcast";
import { useForcastQuery, useReversedGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom"

export const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForcastQuery(coordinates);
  // const locationQuery = useReversedGeocodeQuery(coordinates);
  if(weatherQuery.error || forecastQuery.error) {
    return(
      <Alert variant={"destructive"}>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          </AlertDescription>

      </Alert>
    );
  }

  if(!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{params.cityName}, {weatherQuery.data.sys.country}</h1>
        {/* {Favourite button} */}
        <div  className="flex gap-2">
          <FavoriteButton data={{...weatherQuery.data, name: params.cityName}}/>
        </div>
      </div>

      <div className="grid gap-6">
        <CurrentWeather data={weatherQuery.data}/>
        <HourlyTemperature data={forecastQuery.data}/>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data}/>
          <WeatherForcast data={forecastQuery.data}/>
        </div>
      </div>
    </div>
  );
}
