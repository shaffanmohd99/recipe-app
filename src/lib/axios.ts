import axios, { AxiosInstance } from "axios";

const VITE_BASE_URL_FE: string = import.meta.env.VITE_BASE_URL_FE;

const request: AxiosInstance = axios.create({
  baseURL: VITE_BASE_URL_FE,
  headers: {
    "Content-Type": "application/json",
  },
});
export default request;
