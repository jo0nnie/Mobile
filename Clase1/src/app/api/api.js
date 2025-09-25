import axios from "axios";

const POKE_URL = "https://pokeapi.co/api/v2";
const BASE_URL = "https://template-express-api.onrender.com";

export const pokeApi = axios.create({
  baseURL: POKE_URL,
  timeout: 5000,
});

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});