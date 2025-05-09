import SocialIcons from "./SocialIcons";
import { useState } from "react";

const SignupForm = ({ isDarkMode }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", //par default , walakin khas nbdelha jps
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://your-api-url.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      console.log("Registered:", data);
      // Save token or redirect as needed
    } catch (error) {
      console.error("Registration failed:", error);
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
          <input
            type="text"
            placeholder="Name"
            className="inpt"
            value={registerData.name}
            onChange={(e) =>
              setRegisterData({ ...registerData, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="inpt"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="inpt"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="text-blue-1 font-semibold rounded-md mt-4 px-8 py-2 duration-200 lg:flex gap-2 border-2 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark"
          >
            Sign up
          </button>
        </div>
        <img
          src={
            isDarkMode
              ? "https://ensa.uit.ac.ma/wp-content/uploads/2025/03/LOGO-ENSA.png"
              : "https://ensa.uit.ac.ma/wp-content/uploads/2024/12/cropped-logobleuhori-600x145.png"
          }
          alt="ENSAK"
          className="mb-8 self-center w-1/2 h-aut hidden lg:block"
        />
      </form>
    </div>
  );
};

export default SignupForm;
