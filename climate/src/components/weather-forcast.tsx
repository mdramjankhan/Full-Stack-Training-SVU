import type { ForecastData } from "@/api/types"
import { format } from "date-fns";

interface WeatherForecastProps {
    data: ForecastData;
}

interface DailyForcast {
    date:number,
    temp_min:number,
    temp_max:number,
    humidity:number,
    wind:number,
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    };
}


export const WeatherForcast = ({data}: WeatherForecastProps) => {

    const DailyForcasts = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

        if(!acc[date]) {
            acc[date] = {
                date:forecast.dt,
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
            };
        } else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);

        }
        return acc;
    }, {} as Record<string, DailyForcast>);
  return (
    <div>weather-forcast</div>
  )
}
