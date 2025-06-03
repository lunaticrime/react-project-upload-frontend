// src/components/PrivateRoute.jsx (ou un emplacement similaire)
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Vérifie si le token existe
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirige vers la page de connexion, en conservant l'emplacement actuel
    // pour une redirection après connexion réussie.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Si authentifié, rend le composant enfant (la page protégée)
};

export default PrivateRoute;