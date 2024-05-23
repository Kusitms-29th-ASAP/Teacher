import axios from "axios";

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
export default authAxios;
