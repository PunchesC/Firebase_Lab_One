import axios from 'axios';
import ShoutOuts from "../model/shoutOuts"

const baseUrl = process.env.REACT_APP_API_URL || "";
if (!baseUrl) {
  console.error("REACT_APP_API_URL environment variable not set.");
}

export function readAllShoutOuts():Promise<ShoutOuts[]> {
  return axios.get(baseUrl).then(res => res.data);
}



export function createShoutOut(shoutout: ShoutOuts):Promise<ShoutOuts>{
  return axios.post(baseUrl, shoutout).then(res => res.data)
}

export function deleteShoutOut(shoutOutId: string):Promise<void> {
  return axios.delete(`${baseUrl}/${encodeURIComponent(shoutOutId)}`);
}

export function readShoutOutsForTo(to: string):Promise<ShoutOuts[]> {
  return axios.get(baseUrl, {
    params: { to : to } 
  }).then(res => res.data);
}

export function readShoutOutsForToAndFrom(name: string):Promise<ShoutOuts[]>{
  return axios.get(baseUrl, {
    params: { name : name } 
  }).then(res => res.data);
}
