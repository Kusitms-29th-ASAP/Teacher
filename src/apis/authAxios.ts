import axios, { InternalAxiosRequestConfig } from "axios";

const getToken = () => {
  if (typeof window !== "undefined") {
    console.log("token", localStorage.getItem("accessToken"))
    return localStorage.getItem("accessToken");
  }
  return null;
};

const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json;charset=UTF-8",
  },
});

authAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default authAxios;
