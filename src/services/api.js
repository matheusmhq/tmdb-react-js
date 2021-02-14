import axios from "axios";
import { RemoveAspas } from "../functions/utils";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: "pt",
    include_adult: false,
  },
});

export default api;
