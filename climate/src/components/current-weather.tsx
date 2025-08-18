
import type { GeocodingResponse, WeatherData } from "@/api/types"
import { Card, CardContent } from "./ui/card";

interface CurrentWeatherProps {
    data: WeatherData;
    locationName?: GeocodingResponse;
}
export const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {

    // const {
    //     weather: [currentWeather],
    //     // main: { temp, feels_like, humidity, temp_min, temp_max },
    //     wind: { speed },
    // } = data;

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <h2 className="text-2xl font-bold tracking-tight">
                                    {locationName?.name}
                                </h2>
                                {
                                    locationName?.state && (
                                        <span className="text-muted-foreground">
                                            {locationName.state}
                                        </span>
                                    )
                                }
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {
                                    locationName?.country
                                }
                            </p>
                        </div>
                    </div>


                </div>
            </CardContent>

        </Card>
    )
}
