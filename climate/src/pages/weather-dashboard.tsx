import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export const WeatherDashboard = () => {
  return (
    <div className="space-y-4 ">
      {/* Favourite cities */}
      <div className="flex items-center justify-between ">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          // onClick={handleResfresh}
          size={"icon"}
        >

          <RefreshCw className="h-4 w-4"/>
        </Button>

        {/* {Current and hourly forcast} */}


      </div>
    </div>
  )
}
