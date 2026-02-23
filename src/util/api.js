import axios from "axios";
//export const API_BASE = "http://localhost:8080/api/v1.0";
//export const API_BASE = "http://172.20.90.39:8082/api/v1.0";
export const API_BASE = "http://localhost:8082/api/v1.0";

export const FILE_BASE = `${API_BASE}/api/files`;
const api= axios.create({
    baseURL: API_BASE,
})
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // 🔐 Ajouter le JWT si présent
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
    if (error.response?.status === 401) {
      console.warn("Token expiré → déconnexion");

      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);


export default api;