import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import CommandMenu from "./components/commandMenu";
import { CommandMenuProvider } from "./components/CommandMenuContext";

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
        <CommandMenu /*{isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}}*/
        />
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
              <Profile isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            }
          />
        </Routes>
      </CommandMenuProvider>
    </BrowserRouter>
  );
}

export default App;
