import { useState } from "react";
import Feed from "../components/Feed";
import TestNavbar from "../components/test-navbar";
import Footer from "../components/footer";

const Home = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <main
      className={` bg-blue-50 dark:bg-blue-2-dark ${isDarkMode ? "dark" : ""}`}
    >
      <TestNavbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="home-container">
        <Feed />
      </div>
      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </main>
  );
};

export default Home;
