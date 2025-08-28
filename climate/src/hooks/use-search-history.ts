import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "./use-local-storage";


// Define what a sigle history item looks like
interface SearchHistoryItem{
  id:string; // unique identifier
  query:string; // the search string typed by the user
  name:string; // name of the city
  lat:number; // lon of the city
  lon:number; // lat of the city
  country:string; // country of the city
  state?:string; // state  of the city it's optional
  searchedAt:number; // timestamp when the search happened

}

export default function useSearchHistory() {
  // Keep history in localstorage so it persists across sessions
  const [history,setHistory] = useLocalStorage<SearchHistoryItem[]>(
    "search-history",
    []
  );

  const queryClient = useQueryClient();

  const historyQuery = useQuery({
    queryKey: ["search-history"],
    queryFn: () => history,
    initialData: history,
  });

  const addToHistory = useMutation({
    mutationFn: async(
      searh: Omit<SearchHistoryItem, "id" | "searchedAt">
    )=> {
      const newSearch: SearchHistoryItem = {
        ...searh,
        id:`${searh.lat}-${searh.lon}-${Date.now()}`,
        searchedAt: Date.now(),
      
      };

      const filterHistory = history.filter(
        (item) => !(item.lat === newSearch.lat && item.lon === newSearch.lon)
      )
      const newHistory = [newSearch, ...filterHistory].slice(0, 10);

      setHistory(newHistory);
      return newHistory;
    },
    onSuccess: (newHistory) => {
      queryClient.setQueryData(["search-history"], newHistory);
    },
  });

  const clearHistory = useMutation({
    mutationFn:async ()=> {
      setHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.setQueryData(["search-history"], []);
    },
  });

  return {
    history: historyQuery.data?? [],
    addToHistory,
    clearHistory,
  };
}
