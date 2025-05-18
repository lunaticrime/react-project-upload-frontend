import React from "react";
import Navbar from "../components/Accueil/navbar";
import AccueilContent from "../components/Accueil/accueil";
import Apropos from "../components/Accueil/apropos";
import Fonctionnalites from "../components/Accueil/fonctionnalites";
import User from "../components/Accueil/utilisateurs";
import Ready from "../components/Accueil/ready";
import Footer from "../components/Accueil/footer";

// Page d'accueil publique
// Pour le backend Laravel :
// - Les données statiques (features, utilisateurs) peuvent être récupérées via une API si besoin
// - Les liens de navigation peuvent être adaptés pour router vers des pages Laravel si SSR

function Accueil() {
  return (
    <>
      <Navbar />
      <div id="accueil">
        <AccueilContent />
      </div>
      <div id="apropos">
        <Apropos />
      </div>
      <div id="fonctionnalites">
        <Fonctionnalites />
      </div>
      <div id="utilisateurs">
        <User />
      </div>
      <div id="ready">
        <Ready />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </>
  );
}

export default Accueil;