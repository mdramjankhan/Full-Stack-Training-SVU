import type { ForecastData } from "@/api/types"
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowDownWideNarrow, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
    data: ForecastData;
}

interface DailyForcast {
    date: number,
    temp_min: number,
    temp_max: number,
    humidity: number,
    wind: number,
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    };
}


export const WeatherForcast = ({ data }: WeatherForecastProps) => {

    const DailyForcasts = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

        if (!acc[date]) {
            acc[date] = {
                date: forecast.dt,
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
    // get next five days weather forcast
    const nextFiveDays = Object.values(DailyForcasts).slice(1, 6);
    // format temperature
    const formatTemperature = (temp: number) => `${Math.round(temp)}°C`;
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    5-Day Forcast
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {
                        nextFiveDays.map((day) => (
                            <div className="grid grid-cols-3 items-center rounded-lg border p-4" key={day.date}>
                                <div>
                                    <p className="font-medium">
                                        {format(new Date(day.date * 1000), "EEEE, MMM d")}
                                    </p>
                                    <p className="text-sm text-muted-foreground capitalize">
                                        {day.weather.description}
                                    </p>
                                    <div className="flex justify-center gap-4">

                                        <span className="flex items-center text-blue-500">
                                            <ArrowDown className="mr-1 h-4 w-4" />
                                            {formatTemperature(day.temp_min)}
                                        </span>
                                        <span className="flex items-center text-red-500">
                                            <ArrowDown className="mr-1 h-4 w-4" />
                                            {formatTemperature(day.temp_max)}
                                        </span>
                                        {/*  */}
                                        <span className="flex items-center gap-1">
                                            <Droplets className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm">{day.humidity}%</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Wind className="h-4 w-4 text-blue-500" />
                                            <span className="">{day.wind}</span>
                                        </span>
                                    </div>
                                    {/* <div className="flex justify-end gap-4">
                                        <span className="flex items-center gap-1">
                                            <Droplets className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm">{day.humidity}%</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Wind className="h-4 w-4 text-blue-500" />
                                            <span className="">{day.wind}</span>
                                        </span>
                                    </div> */}
                                </div>
                            </div>

                        ))
                    }
                </div>
            </CardContent>
        </Card>
    )
}
