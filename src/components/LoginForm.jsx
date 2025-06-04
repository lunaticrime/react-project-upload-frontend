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
    setIsLoading(true);

    try {
      const response = await apiClient.post("/login", {
        email: loginData.email,
        password: loginData.password,
      });

      if (response.data && response.data.token && response.data.user) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Navigate based on user role
        const userRole = response.data.user.role;
        switch (userRole) {
          case "admin":
            navigate("/admin");
            break;
          case "prof":
            navigate("/profile");
            break;
          case "etudiant":
            navigate("/profile"); // Assuming students go to their profile page
            break;
          default:
            navigate("/"); // Default fallback
        }
      } else {
        setError("Invalid response from server: Missing token or user data.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
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
            <div className="text-red-500 text-xs">
              {validationErrors.email[0]}
            </div>
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
            <div className="text-red-500 text-xs">
              {validationErrors.password[0]}
            </div>
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
          src={isDarkMode ? lightLogo : darkLogo}
          alt="ENSAK"
          className="mb-8 self-center w-1/2 h-auto hidden lg:block"
        />
      </form>
    </div>
  );
};

export default LoginForm;
