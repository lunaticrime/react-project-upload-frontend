import SocialIcons from "./SocialIcons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import lightLogo from "../assets/lightLogo.png";
import darkLogo from "../assets/darkLogo.png";

const LoginForm = ({ isDarkMode }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://your-api-url.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      //
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/profile");
      // Save token or redirect as needed
    } catch (error) {
      console.error("Login failed:", error);
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
          <input
            type="email"
            placeholder="Email"
            className="inpt"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="inpt"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <a href="#">Forgotten password?</a>
          <button
            type="submit"
            className="text-blue-1 font-semiblond rounded-md mt-4 px-8 py-2 duration-200 lg:flex gap-2 border-2 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark"
          >
            Sign in
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
