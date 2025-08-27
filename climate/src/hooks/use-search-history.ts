
interface SearchHistoryItem{
  id:string;
  query:string;
  name:string;
  lat:number;
  lon:number;
  country:string;
  state?:string;
  searchedAt:number;

}

export default function useSearchHistory() {
 
}
