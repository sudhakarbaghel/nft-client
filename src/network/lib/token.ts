import axios from "axios";
import { BASE_URL } from "../apiClient";

export function getAllTokens(userAddress: string, contract: string) {
  let url = `${BASE_URL}/tokens`;

  if (userAddress) {
    url += `?user=${userAddress}`;
  }

  if (contract) {
    url += `${userAddress ? "&" : "?"}contract=${contract}`;
  }

  return axios.get(url);
}
export function getToken(tokenId: string) {
  return axios.get(`${BASE_URL}/tokens/${tokenId}/info`);
}
export function updateToken(tokenInfo: any) {
  return axios.post(`${BASE_URL}/tokens/update`, { ...tokenInfo });
}

export function addToken(tokenInfo: any) {
  console.log(tokenInfo);
  return axios.post(`${BASE_URL}/tokens/create`, { ...tokenInfo });
}
