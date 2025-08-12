import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { RefreshCw } from "lucide-react"

export const WeatherDashboard = () => {
  const { coordinates, error: locationError, getLocation, isLoading: locationLoading} = useGeolocation();

  const handleResfresh = () => {
    getLocation();
    if(coordinates){
      // Reload the weather data 
      

    }
  }

  console.log( coordinates);
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

          <RefreshCw className="h-4 w-4"/>
        </Button>

        {/* {Current and hourly forcast} */}


      </div>
    </div>
  )
}
