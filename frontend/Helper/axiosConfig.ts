import axios from "axios";

const accessToken = "asdasdsadasdsadsa";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
