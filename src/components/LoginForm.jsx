import SocialIcons from "./SocialIcons";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importez useLocation
import lightLogo from "../assets/lightLogo.png";
import darkLogo from "../assets/darkLogo.png";
import apiClient from "../services/apiClient";

const LoginForm = ({ isDarkMode }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  // validationErrors n'est pas utilisé dans la logique de capture d'erreur,
  // mais est présent pour afficher les erreurs de validation spécifiques aux champs si votre API les renvoie de cette manière.
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Utilisé pour la redirection après connexion

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({}); // Réinitialiser les erreurs de validation à chaque tentative
    setIsLoading(true);

    try {
      const response = await apiClient.post("/login", {
        email: loginData.email,
        password: loginData.password,
      });

      if (response.data && response.data.token && response.data.user) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Tenter de rediriger vers la page précédente si l'état 'from' est disponible
        const from = location.state?.from?.pathname;
        if (from) {
          navigate(from, { replace: true });
        } else {
          // Logique de redirection par défaut basée sur le rôle de l'utilisateur
          const userRole = response.data.user.role;
          switch (userRole) {
            case "admin":
              navigate("/admin");
              break;
            case "prof":
              navigate("/prof");
              break;
            case "etudiant":
              navigate("/profile");
              break;
            default:
              navigate("/");
          }
        }
      } else {
        // Ce cas est moins probable si l'API renvoie toujours une structure d'erreur standardisée
        setError("Invalid response from server: Missing token or user data.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          // Gérer les erreurs de validation spécifiques de Laravel (ou format similaire)
          setValidationErrors(err.response.data.errors);
          setError("Please check the form for errors."); // Message d'erreur général
        } else {
          setError(
            err.response.data.message ||
              "An error occurred during login. Please try again."
          );
        }
      } else {
        setError("An error occurred during login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <div
      className={`form-container sign-in dark:bg-blue-1-dark dark:text-blue-50 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <form action="" className="form" onSubmit={handleLogin}>
        <div className="flex flex-col flex-grow justify-center items-center mt-10 w-full">
          <h1 className="text-4xl font-bold">Sign in</h1>
          <SocialIcons />
          <span>or</span>
          {/* Afficher l'erreur générale si elle existe ET qu'il n'y a pas d'erreurs de validation spécifiques OU que ce ne sont pas des erreurs de champs */}
          {error && Object.keys(validationErrors).length === 0 && (
            <div className="text-red-500 mt-2 text-sm">{error}</div>
          )}
          {error && Object.keys(validationErrors).length > 0 && error !== "Please check the form for errors." && (
             <div className="text-red-500 mt-2 text-sm">{error}</div>
          )}


          <input
            type="email"
            name="email" // Ajout de l'attribut name pour handleInputChange
            placeholder="Email"
            className="inpt"
            value={loginData.email}
            onChange={handleInputChange} // Utiliser une fonction de handler générique
            disabled={isLoading}
          />
          {validationErrors.email && (
            <div className="text-red-500 text-xs mt-1">
              {validationErrors.email[0]}
            </div>
          )}

          <input
            type="password"
            name="password" // Ajout de l'attribut name pour handleInputChange
            placeholder="Password"
            className="inpt"
            value={loginData.password}
            required
            disabled={isLoading}
            onChange={handleInputChange} // Utiliser une fonction de handler générique
          />
          {validationErrors.password && (
            <div className="text-red-500 text-xs mt-1">
              {validationErrors.password[0]}
            </div>
          )}

          <a href="#" className="text-sm my-2 hover:underline">Forgotten password?</a>
          <button
            type="submit"
            disabled={isLoading}
            className="text-blue-1 font-semiblond rounded-md mt-4 px-8 py-2 duration-200 lg:flex gap-2 border-2 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
        <img
          src={isDarkMode ? lightLogo : darkLogo}
          alt="ENSAK"
          className="mb-8 self-center w-1/2 h-auto hidden lg:block"
        />
      </form>
    </div>
  );
};

export default LoginForm;