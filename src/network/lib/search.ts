import axios from "axios";
import { BASE_URL } from "../apiClient";



export function fetchSearchResults(searchText: string) {
  const apiUrl = `${BASE_URL}/search?search=${searchText}`;
  return axios.get(apiUrl);
}
