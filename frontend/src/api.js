import axios from "axios";

const API = axios.create({
  baseURL: "https://cardioai-backend-xbv1.onrender.com"
});

export default API;