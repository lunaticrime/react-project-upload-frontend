import SocialIcons from "./SocialIcons";
import { useState } from "react";
import lightLogo from "../assets/lightLogo.png";
import darkLogo from "../assets/darkLogo.png";
import apiClient from "../services/apiClient"; // ✅ Importé

const SignupForm = ({ isDarkMode }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    // role: "student", //par default , walakin khas nbdelha jps
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    setIsLoading(true);

    // Validation côté client pour la confirmation du mot de passe
    if (registerData.password !== registerData.password_confirmation) {
      setErrors({ password_confirmation: ["Password confirmation does not match."] });
      setIsLoading(false);
      return;
    }

    try {
      // Envoyer seulement les champs nécessaires au backend pour l'inscription
      const payload = {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        password_confirmation: registerData.password_confirmation,
      };
      const response = await apiClient.post("/register", payload); // ✅ Utilisation de apiClient
      const data = response.data;

      console.log("Registered:", data);
      setSuccessMessage(data.message || "Registration successful! Please log in.");
      setRegisterData({ name: "", email: "", password: "", password_confirmation: "" }); // Réinitialiser

    } catch (errorCaught) {
      console.error("Registration failed:", errorCaught);
      if (errorCaught.response && errorCaught.response.status === 422 && errorCaught.response.data.errors) {
        setErrors(errorCaught.response.data.errors);
      } else if (errorCaught.response && errorCaught.response.data.message) {
        setErrors({ general: errorCaught.response.data.message });
      } else {
        setErrors({ general: errorCaught.message || "An unexpected error occurred." });
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div
      className={`form-container sign-up dark:bg-blue-1-dark dark:text-blue-50 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <form action="" className="form" onSubmit={handleRegister}>
        <div className="flex flex-col flex-grow justify-center items-center w-full">
          <h1 className="text-4xl font-bold">Create Account</h1>
          <SocialIcons />
          <span>or</span>
          {errors.general && (
            <div className="text-red-500 mt-2 text-sm">{errors.general}</div>
          )}
          {successMessage && (
            <div className="text-green-500 mt-2 text-sm">{successMessage}</div>
          )}


          <input
            type="text"
            placeholder="Name"
            className="inpt"
            value={registerData.name}
            onChange={(e) =>
              setRegisterData({ ...registerData, name: e.target.value })
            }
            required
            disabled={isLoading}
          />
          {errors.name && (
            <div className="text-red-500 text-xs">{errors.name[0]}</div>
          )}


          <input
            type="email"
            placeholder="Email"
            className="inpt"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
            required
            disabled={isLoading}
          />
          {errors.email && (
            <div className="text-red-500 text-xs">{errors.email[0]}</div>
          )}


          <input
            type="password"
            placeholder="Password (min. 6 characters)"
            className="inpt"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
            required
            minLength="6"
            disabled={isLoading}
          />
          {errors.password && (
            <div className="text-red-500 text-xs">{errors.password[0]}</div>
          )}

<input
            type="password"
            placeholder="Confirm Password"
            className="inpt"
            value={registerData.password_confirmation}
            onChange={(e) =>
              setRegisterData({ ...registerData, password_confirmation: e.target.value })
            }
            required
            minLength="6"
            disabled={isLoading}
          />
          {errors.password_confirmation && (
            <div className="text-red-500 text-xs">{errors.password_confirmation[0]}</div>
          )}


          <button
            type="submit"
            disabled={isLoading}
            className="text-blue-1 font-semibold rounded-md mt-4 px-8 py-2 duration-200 lg:flex gap-2 border-2 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </div>
        <img
          src={
            isDarkMode
              ? lightLogo
              : darkLogo
          }
          alt="ENSAK"
          className="mb-8 self-center w-1/2 h-aut hidden lg:block"
        />
      </form>
    </div>
  );
};

export default SignupForm;
