// import Feed from "../components/Feed";
import TestNavbar from "../components/test-navbar";
import Footer from "../components/footer";
import AccueilContent from "../components/Accueil/accueil";
import Apropos from "../components/Accueil/apropos";
import Fonctionnalites from "../components/Accueil/fonctionnalites";
import User from "../components/Accueil/utilisateurs";
import Ready from "../components/Accueil/ready";
import BackToTop from "../components/utils/BackToTop"; // Import BackToTop component

const Home = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <main
      className={` bg-blue-50 dark:bg-blue-2-dark ${isDarkMode ? "dark" : ""}`}
    >
      <TestNavbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="home-container">
        <div id="top"></div> {/* Anchor for "Acceuil" */}
        <AccueilContent isDarkMode={isDarkMode} />
        <div id="apropos"></div> {/* Anchor for "À propos" */}
        <Apropos isDarkMode={isDarkMode} />
        <div id="fonctionnalites"></div> {/* Anchor for "Fonctionnalités" */}
        <Fonctionnalites isDarkMode={isDarkMode} />
        <User isDarkMode={isDarkMode} />
        <Ready isDarkMode={isDarkMode} />
        <div id="contact"></div> {/* Anchor for "Contact" */}
      </div>
      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <BackToTop /> {/* Add BackToTop component */}
    </main>
  );
};

export default Home;
