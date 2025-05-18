// import Feed from "../components/Feed";
import TestNavbar from "../components/test-navbar";
import Footer from "../components/footer";
import AccueilContent from "../components/Accueil/accueil";
import Apropos from "../components/Accueil/apropos";
import Fonctionnalites from "../components/Accueil/fonctionnalites";
import User from "../components/Accueil/utilisateurs";
import Ready from "../components/Accueil/ready";

const Home = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <main
      className={` bg-blue-50 dark:bg-blue-2-dark ${isDarkMode ? "dark" : ""}`}
    >
      <TestNavbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="home-container">
        {/* <Feed /> */}
        <AccueilContent isDarkMode={isDarkMode} />
        <Apropos isDarkMode={isDarkMode} />
        <Fonctionnalites isDarkMode={isDarkMode} />
        <User isDarkMode={isDarkMode} />
        <Ready isDarkMode={isDarkMode} />
      </div>
      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </main>
  );
};

export default Home;
