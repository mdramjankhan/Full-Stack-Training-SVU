import { useFavorite } from "@/hooks/use-favorite";
import { useWeatherQuery } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Loader, Loader2, X } from "lucide-react";


interface FavoriteCityTabletProps {
    id: string;
    lat: number;
    lon: number;
    name: string;
    onRemove:()=> void;

}

function FavoriteCityTablet({
    id,
    lat,
    lon,
    name,
    onRemove,
}: FavoriteCityTabletProps) {
    const navigate = useNavigate();
    const {data: weather, isLoading} = useWeatherQuery({lat, lon});

    const handleClick = () => {
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };
    return (
        <div className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        >
            <Button
                variant={"ghost"}
                size={"icon"}
                className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"

                onClick={(e)=>{
                    e.stopPropagation();
                    onRemove();
                    toast.error(`${name} removed from favorites`);
                }}
            >
                <X className="h-4 w-4"/>
                {
                    isLoading? (
                        
                        <div className="flex h-8 items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin"/>
                        </div>
                    ) : weather? (
                        <>
                        <div className="flex h-8 items-center justify-center">
                            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                                alt={weather.weather[0].description}
                                className="h-8 w-8"
                            />
                            <div>
                                <p className="font-medium">{name}</p>
                                <p className="text-xs text-muted-foreground">{weather.sys.country}</p>
                            </div>


                            

                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-xs capitalize text-muted-foreground">
                                {weather.weather[0].description}
                            </p>
                        </div>
                        </>
                        
                    ): null
                }
            </Button>

        </div>
    )
}

export default function FavoriteCities() {
    const {favorites} = useFavorite();
    if(!favorites.length){
        return null;
    }
  return (
    <div>FavoriteCities</div>
  )
}
