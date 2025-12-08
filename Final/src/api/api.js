import axios from "axios";

const PELICULAS_URL = "https://api.tvmaze.com/";

export const api = axios.create({
  baseURL: PELICULAS_URL,
  timeout: 5000,
});