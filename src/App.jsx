import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Accueil/navbar";
import Accueil from "./components/Accueil/accueil";
import Apropos from "./components/Accueil/apropos";
import Fonctionnalites from "./components/Accueil/fonctionnalites";
import User from "./components/Accueil/utilisateurs";
import Ready from "./components/Accueil/ready";
import Footer from "./components/Accueil/footer";

function App() {
  const [theme, setTheme] = React.useState("light");

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = prefersDark ? "dark" : "light";
    root.setAttribute("data-theme", currentTheme);
    setTheme(currentTheme);

    const handleChange = (e) => {
      const newTheme = e.matches ? "dark" : "light";
      root.setAttribute("data-theme", newTheme);
      setTheme(newTheme);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <Navbar theme={theme} />
      <Accueil />
      <Apropos />
      <Fonctionnalites />
      <User />
      <Ready />
      <Footer />
    </>
  );
}

export default App;
