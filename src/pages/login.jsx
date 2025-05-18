import { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import TogglePanel from "../components/TogglePanel";
// const LoginForm = lazyLoad("../components/LoginForm");
// const SignupForm = lazyLoad("../components/SignupForm");
// const TogglePanel = lazyLoad("../components/TogglePanel");

const Login = ({ isDarkMode }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <main
      className={`flex justify-center items-center flex-col h-screen bg-linear-to-tr from-blue-100 to-blue-200 backdrop-blur-3xl dark:from-slate-800 dark:to-slate-950 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div
        className={`wrapper text-white ${isActive ? "active" : ""} shadow-2xl`}
      >
        <LoginForm isDarkMode={isDarkMode} />
        <SignupForm isDarkMode={isDarkMode} />
        <TogglePanel
          isActive={isActive}
          setIsActive={setIsActive}
          isDarkMode={isDarkMode}
        />
      </div>
    </main>
  );
};

export default Login;
