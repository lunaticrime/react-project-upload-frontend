import SocialIcons from "./SocialIcons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import lightLogo from "../assets/lightLogo.png";
import darkLogo from "../assets/darkLogo.png";
import apiClient from "../services/apiClient";

const LoginForm = ({ isDarkMode }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});
    setIsLoading(true);

    try {
      const response = await apiClient.post("/login", loginData); // ✅ Utilisation de apiClient
      const data = response.data; // Avec Axios, les données sont dans response.data

      localStorage.setItem("token", data.token); // ✅ Stocke sous la clé "token"
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirection après un court délai pour que l'utilisateur voie le message/état
      // Ou vous pouvez avoir un état global qui déclenche la redirection
      // et met à jour l'état de l'utilisateur authentifié.
      switch (data.user.role) { //
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
          navigate("/profile");
      }
    } catch (errorCaught) {
      console.error("Login failed:", errorCaught);
      let errorMessage = "Login failed. Please check your credentials.";
      if (errorCaught.response) { //
        const apiData = errorCaught.response.data;
        if (errorCaught.response.status === 422) { //
          if (apiData.errors) {
            setValidationErrors(apiData.errors);
            const firstErrorField = Object.keys(apiData.errors)[0];
            if (firstErrorField && apiData.errors[firstErrorField]) {
              errorMessage = apiData.errors[firstErrorField][0];
            } else {
              errorMessage = apiData.message || errorMessage;
            }
          } else if (apiData.message) {
            errorMessage = apiData.message;
          } else if (apiData.email && Array.isArray(apiData.email)) { // Spécifique à votre AuthController
            errorMessage = apiData.email[0];
            setValidationErrors({ email: apiData.email });
          }
        } else if (apiData && apiData.message) { // Gérer d'autres erreurs API
          errorMessage = apiData.message;
        }
      } else {
        errorMessage = errorCaught.message || "An unexpected network error occurred.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
          {error && !validationErrors.email && !validationErrors.password && (
            <div className="text-red-500 mt-2 text-sm">{error}</div>
          )}

          <input
            type="email"
            placeholder="Email"
            className="inpt"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          {validationErrors.email && (
            <div className="text-red-500 text-xs">{validationErrors.email[0]}</div>
          )}
          <input
            type="password"
            placeholder="Password"
            className="inpt"
            value={loginData.password}
            required
            disabled={isLoading}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          {validationErrors.password && (
            <div className="text-red-500 text-xs">{validationErrors.password[0]}</div>
          )}

          <a href="#">Forgotten password?</a>
          <button
            type="submit"
            disabled={isLoading}
            className="text-blue-1 font-semiblond rounded-md mt-4 px-8 py-2 duration-200 lg:flex gap-2 border-2 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
        <img
          src={
            isDarkMode
              ? lightLogo
              : darkLogo
          }
          alt="ENSAK"
          className="mb-8 self-center w-1/2 h-auto hidden lg:block"
        />
      </form>
    </div>
  );
};

export default LoginForm;
