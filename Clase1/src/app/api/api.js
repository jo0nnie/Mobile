import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default api;
