import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import "./App.css";
// import Home from "./pages/home";
// import Login from "./pages/login";
// import Profile from "./pages/profile";
// import CommandMenu from "./components/commandMenu";
import { CommandMenuProvider } from "./components/CommandMenuContext";
import { lazyLoad } from "./lazyLoad";

const CommandMenu = lazyLoad("./components/commandMenu");
const Home = lazyLoad("./pages/home");
const Login = lazyLoad("./pages/login");
const Profile = lazyLoad("./pages/profile");

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("isDarkMode");
    if (saved !== null) return saved === "true";

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark;
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <CommandMenuProvider>
        <Suspense fallback={<div className="h-screen text-9xl flex justify-center items-center">Loading...</div>}>
          <CommandMenu />
          <Routes>
            <Route
              path="/"
              element={
                <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              }
            />
            <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
            <Route
              path="/profile"
              element={
                <Profile
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                />
              }
            />
          </Routes>
        </Suspense>
      </CommandMenuProvider>
    </BrowserRouter>
  );
}

export default App;
