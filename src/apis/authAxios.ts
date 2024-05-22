import axios from "axios";

const token = localStorage.getItem("accessToken");

const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json;charset=UTF-8",
  },
});
export default authAxios;
