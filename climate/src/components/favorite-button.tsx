import type { WeatherData } from "@/api/types";
import { Button } from "./ui/button";
import { useFavorite } from "@/hooks/use-favorite";
import { toast } from "sonner";
import { Star } from "lucide-react";

interface FavoriteButtonProps {
  data: WeatherData;
}


export default function FavoriteButton({data}:FavoriteButtonProps) {
    const {addToFavorites, isFavorite, removeFavorite} = useFavorite();
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    const handleToggleFavorite = () => {
        if(isCurrentlyFavorite){
            removeFavorite.mutateAsync(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`${data.name} removed from favorites`)
        
        } else {
            addToFavorites.mutateAsync({
                lat: data.coord.lat,
                lon: data.coord.lon,
                name: data.name,
                country: data.sys.country,
            });
            toast.success(`${data.name} added to favorites`)
        }
    }
  return (
    <Button 
    variant={ isCurrentlyFavorite? "default":"outline"}
    onClick={handleToggleFavorite}
    size={"icon"}
    className={isCurrentlyFavorite? "bg-yellow-500 hover:bg-yellow-500":""}
    
    >
        <Star
        className={`h-5 w-5 ${isCurrentlyFavorite? "fill-current":""}}`}></Star>
    </Button>
  )
}
