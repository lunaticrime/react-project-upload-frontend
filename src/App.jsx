import React from "react";
import "./App.css";
import Navbar from "./components/Accueil/navbar";
import Accueil from "./components/Accueil/accueil";
import Apropos from "./components/Accueil/Apropos";
import Fonctionnalites from "./components/Accueil/fonctionnalites";
import User from "./components/Accueil/utilisateurs";
import Ready from "./components/Accueil/ready";
import Footer from "./components/Accueil/footer";

function App() {
  return (
    <>
      <Navbar />
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
