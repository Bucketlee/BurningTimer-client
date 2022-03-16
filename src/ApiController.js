import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 5000,
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("token");
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] = accessToken ? `bearer ${accessToken}` : "";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
