import React from "react";
import Navbar from "../components/Accueil/navbar";
import AccueilContent from "../components/Accueil/accueil";
import Apropos from "../components/Accueil/apropos";
import Fonctionnalites from "../components/Accueil/fonctionnalites";
import User from "../components/Accueil/utilisateurs";
import Ready from "../components/Accueil/ready";
import Footer from "../components/Accueil/footer";

function Accueil() {
  return (
    <>
      <Navbar />
      <AccueilContent />
      <Apropos />
      <Fonctionnalites />
      <User />
      <Ready />
      <Footer />
    </>
  );
}

export default Accueil;
