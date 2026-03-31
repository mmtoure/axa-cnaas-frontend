import axios from "axios";
//export const BASE_URL = "http://localhost:8080";
export const BASE_URL = "http://172.20.90.39:8082";


export const API_BASE = `${BASE_URL}/api/v1.0`;
export const FILE_BASE = `${BASE_URL}/api/files`;

const api= axios.create({
    baseURL: API_BASE,
})
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Ajouter le JWT si présent
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("Token expiré → déconnexion");

      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);


export default api;