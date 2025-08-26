import { Loader2, Search } from "lucide-react"
import { Button } from "./ui/button"
import { Command, CommandDialog, CommandInput, CommandItem } from "./ui/command"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CommandEmpty, CommandGroup, CommandList, CommandSeparator } from "cmdk"
import { useLocationSearch } from "@/hooks/use-weather"
export const CitySearch = () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    // const navigate = useNavigate();
    const {data:locations, isLoading} = useLocationSearch(query);


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
                        {
                            query.length>2 && !isLoading && (
                                <CommandEmpty>No City Found.</CommandEmpty>
                            )
                        }
                        {/* {Search Results} */}
                        <CommandSeparator>
                            {
                                locations && locations.length > 2 && (
                                    <CommandGroup heading="Suggestions">
                                        {
                                            isLoading && (
                                                <div className="flex flex-center justify-center">
                                                    <Loader2 className="h-4 w-4 animate-spin "/>
                                                </div>
                                            )
                                        }
                                        {
                                            locations.map((location)=> (
                                                <CommandItem
                                                    key={`${location.lat}-${location.lon}`}
                                                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                                    onClick={() => {
                                                        setOpen(false);
                                                        // navigate(`/city/${location.lat}|${location.lon}|${location.name}|${location.country}`)
                                                    }}
                                                >
                                                    <Search className="mr-2 h-4"/>
                                                    <span>
                                                        {location.name}
                                                    </span>
                                                    {
                                                        location.state && (
                                                            <span className="text-sm text-muted">
                                                                ,{location.state}
                                                            </span>
                                                        )
                                                    }
                                                    <span className="text-sm text-muted-foreground">
                                                        ,{location.country}
                                                    </span>
                                                </CommandItem>
                                            ))
                                        }
                                    </CommandGroup>
                                )
                            }
                        </CommandSeparator>
                    </CommandList>
                </Command>
            </CommandDialog>

        </>
    )
}
