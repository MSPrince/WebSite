import axios from "axios";

const BASE_URL = "https://doctors-diary-backend.onrender.com/api/v1";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
