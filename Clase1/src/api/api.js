import axios from "axios";

//const POKE_URL = "https://pokeapi.co/api/v2";
//const BASE_URL = "https://template-express-api.onrender.com";
const PELI_URL = "https://api.tvmaze.com/";

export const peliApi = axios.create({
  baseURL: PELI_URL,
  timeout: 5000,
});

export const api = axios.create({
  baseURL: PELI_URL,
  timeout: 5000,
});