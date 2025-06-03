// src/services/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for handling cookies
});

// Intercepteur pour ajouter le token Bearer à chaque requête protégée
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Pas besoin de logique complexe ici pour les routes publiques si
      // les routes publiques n'utilisent pas apiClient ou si le serveur les ignore.
      // Le token sera envoyé, mais les routes publiques ne devraient pas en avoir besoin/le valider.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs 401 globalement
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Rediriger vers la page de connexion si l'utilisateur n'est pas déjà sur cette page
        if (
          window.location.pathname !== "/auth" &&
          !window.location.pathname.startsWith("/login")
        ) {
          window.location.href = "/auth";
        }
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({ message: "No response from server" });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({ message: error.message });
    }
  }
);

export default apiClient;
