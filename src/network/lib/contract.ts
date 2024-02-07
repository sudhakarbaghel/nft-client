
import axios from "axios"
import {BASE_URL} from "../apiClient"

export function getContractByUser(userAddress:string){
    return axios.get(`${BASE_URL}/contracts/${userAddress}`);
  }
  export function getAllContracts(){
    return axios.get(`${BASE_URL}/contracts`);
  }
  
  export function addContract(contractInfo:any) {
    return axios.post(`${BASE_URL}/contracts/create`, {...contractInfo});
  }
  
  export function getContractByAddress(contractAddress:string){
    return  axios.get(`${BASE_URL}/contracts/${contractAddress}/info`);
  }
