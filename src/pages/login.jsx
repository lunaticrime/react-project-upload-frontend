import TestNavbar from "../components/test-navbar";
import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <main className="flex justify-center items-center flex-col h-screen bg-linear-to-tr from-blue-100 to-blue-200 backdrop-blur-3xl dark:from-slate-800 dark:to-slate-950">
      <div
        className={`wrapper text-white ${isActive ? "active" : ""} shadow-2xl`}
      >
        <div className="form-container sign-in dark:bg-blue-1-dark dark:text-blue-50">
          <form action="" className="form">
            <div className="flex flex-col flex-grow justify-center items-center mt-10 w-full">
              <h1 className="text-4xl font-bold">Sign in</h1>
              <div className="social-icons">
                <a href="#" className="icon">
                  <FaGoogle />
                </a>
                <a href="#" className="icon">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="icon">
                  <FaGithub />
                </a>
                <a href="#" className="icon">
                  <FaFacebookF />
                </a>
              </div>
              <span>or</span>
              <input type="email" placeholder="Email" className="inpt"></input>
              <input
                type="password"
                placeholder="Password"
                className="inpt"
              ></input>
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
                  ? "https://ensa.uit.ac.ma/wp-content/uploads/2025/03/LOGO-ENSA.png"
                  : "https://ensa.uit.ac.ma/wp-content/uploads/2024/12/cropped-logobleuhori-600x145.png"
              }
              alt="ENSAK"
              className="mb-8 self-center w-1/2 h-auto hidden lg:block"
            />
          </form>
        </div>

        <div className="form-container sign-up dark:bg-blue-1-dark dark:text-blue-50 ">
          <form action="" className="form">
            <div className="flex flex-col flex-grow justify-center items-center w-full">
              <h1 className="text-4xl font-bold">Create Account</h1>
              <div className="social-icons">
                <a href="#" className="icon">
                  <FaGoogle />
                </a>
                <a href="#" className="icon">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="icon">
                  <FaGithub />
                </a>
                <a href="#" className="icon">
                  <FaFacebookF />
                </a>
              </div>
              <span>or</span>
              <input type="text" placeholder="Name" className="inpt"></input>
              <input type="email" placeholder="Email" className="inpt"></input>
              <input
                type="password"
                placeholder="Password"
                className="inpt"
              ></input>
              <a href="#">Forgotten password?</a>
              <button
                type="submit"
                className="text-blue-1 font-semiblond rounded-md mt-4 px-8 py-2 duration-200 lg:flex gap-2 border-2 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark"
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

        <div className="toggle-container ">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <img src="/src/assets/login_registration.svg" alt="" />
              <h1></h1>
              <p></p>
              <div className="btn-container">
                <span>already have an account?</span>
                <button
                  className="buttonCnt"
                  onClick={() => {
                    setIsActive(!isActive);
                    console.log(isActive);
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className="toggle-panel toggle-right">
              <img src="/src/assets/login_registration.svg" alt="" />
              <h1></h1>
              <p></p>
              <div className="btn-container">
                <span>don't have an account?</span>
                <button
                  className=" buttonCnt"
                  onClick={() => {
                    setIsActive(!isActive);
                    console.log(isActive);
                  }}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
