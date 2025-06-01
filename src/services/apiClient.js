// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Votre URL API Laravel
  headers: {
    'Accept': 'application/json',
  },
});

// Intercepteur pour ajouter le token Bearer à chaque requête protégée
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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

// Optionnel : Intercepteur pour gérer les erreurs 401 globalement
// (À activer si le serveur renvoie correctement des 401)
// apiClient.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       console.error("API Call Unauthorized (401):", error.config.url, error.response.data);
//       // Gérer la déconnexion : supprimer les infos utilisateur et rediriger vers login
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       // Assurez-vous que '/auth' est votre route React pour la page de connexion/inscription
//       if (window.location.pathname !== '/auth' && !window.location.pathname.startsWith('/login-page-route')) { 
//         // window.location.href = '/auth'; // Ou le chemin de votre page de connexion
//         console.warn("Redirection suggérée vers la page de connexion due à une erreur 401.");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;