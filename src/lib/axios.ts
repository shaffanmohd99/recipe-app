import axios, { AxiosInstance } from "axios";

const VITE_BASE_URL_FE: string = import.meta.env.VITE_BASE_URL_FE;
const VITE_API_KEY: string = import.meta.env.VITE_API_KEY;

const request: AxiosInstance = axios.create({
  baseURL: VITE_BASE_URL_FE,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": VITE_API_KEY,

  },
});
export default request;
