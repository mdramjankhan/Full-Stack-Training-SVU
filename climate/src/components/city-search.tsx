import { Clock, Loader2, Search, Star, XCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Command, CommandDialog, CommandInput, CommandItem } from "./ui/command"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CommandEmpty, CommandGroup, CommandList, CommandSeparator } from "cmdk"
import { useLocationSearch } from "@/hooks/use-weather"
import { format } from "date-fns"
import useSearchHistory from "@/hooks/use-search-history"
import { useFavorite } from "@/hooks/use-favorite"
export const CitySearch = () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const navigate = useNavigate();
    const { data: locations, isLoading } = useLocationSearch(query);
    const { history, clearHistory, addToHistory } = useSearchHistory();
    const {favorites} = useFavorite();


    const handleSelect = (cityData: string) => {
        const [lat, lon, name, country] = cityData.split("|");
        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country,
        });

        setOpen(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    }

    console.log(locations);



    return (
        <>
            <Button
                variant={"outline"} className="relative w-full justify-start text-sm"
                onClick={() => setOpen(true)}
            >
                <Search className="mr-2 h-4 w-4" />
                Search Cities...
            </Button>
            <CommandDialog open={open} onOpenChange={() => setOpen(false)}>
                <Command>
                    <CommandInput placeholder="Search cities..."
                        value={query}
                        onValueChange={setQuery}
                    />
                    <CommandList>
                        {query.length > 2 && !isLoading && <CommandEmpty>No City Found.</CommandEmpty>}
                        {
                            favorites.length > 0 && (
                                <CommandGroup heading="Favorites">
                                    {favorites.map((city)=>(
                                        <CommandItem key={city.id}
                                            value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                                            onSelect={handleSelect}
                                        >                                
                                            <Star className="mr-2 h-4 w-4 text-yellow-500"/>
                                            <span className="">{city.name}</span>
                                            {city.state &&(
                                                <span className="text-sm text-muted-foreground">
                                                    ,{city.state}
                                                </span>
                                            )}
                                            <span className="text-sm text-muted-foreground">
                                                ,{city.country}
                                            </span>
                                            
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )
                        }

                        {/* {history.length > 0 && <CommandGroup heading="History"> */}
                        {
                            history.length > 0 && (
                                <>
                                    <CommandSeparator/>
                                        <CommandGroup>
                                            <div className="flex items-center justify-between px-2 my-2">
                                                <p className="text-sm text-muted-foreground">
                                                    <Button variant={"ghost"}
                                                        size={"sm"}
                                                        onClick={() => clearHistory.mutate()}
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                        Clear
                                                    </Button>
                                                </p>
                                            </div>
                                            {
                                                history.map((item)=>(
                                                    <CommandItem key={item.id}
                                                        value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                                                        onSelect={handleSelect}
                                                    >
                                                        <Clock className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                        <span className="">{item.name}</span>
                                                        {item.state &&(
                                                            <span className="text-sm text-muted-foreground">,{item.state}</span>
                                                        )}
                                                        <span className="text-sm text-muted-foreground">,{item.country}</span>
                                                        <span className="text-sm text-muted-foreground">,{format(new Date(item.searchedAt), "MMM d, h:mm a")}</span>

                                                    </CommandItem>
                                                ))
                                            }
                                        </CommandGroup>
                                </>
                            )
                        }

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex flex-center justify-center">
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                        )}

                        {/* City suggestions */}
                        {locations && locations.length > 0 && (
                            <CommandGroup heading="Suggestions">
                                {locations.map((location) => (
                                    <CommandItem
                                        key={`${location.lat}-${location.lon}`}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                        onSelect={handleSelect}
                                    >
                                        <Search className="mr-2 h-4" />
                                        <span>{location.name}</span>
                                        {location.state && (
                                            <span className="text-sm text-muted">,{location.state}</span>
                                        )}
                                        <span className="text-sm text-muted-foreground">,{location.country}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </CommandDialog>

        </>
    )
}
