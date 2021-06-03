import axios from 'axios';
import shoutOuts from "../model/shoutOuts"

const baseUrl = process.env.REACT_APP_API_URL || "";
if (!baseUrl) {
  console.error("REACT_APP_API_URL environment variable not set.");
}

export function readAllShoutOuts():Promise<shoutOuts[]> {
  return axios.get(baseUrl).then(res => res.data);
}