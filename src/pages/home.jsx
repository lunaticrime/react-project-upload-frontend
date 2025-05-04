import TestNavbar from "../components/test-navbar";
// import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Home = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <main
      className={`bg-blue-50 dark:bg-blue-2-dark ${isDarkMode ? "dark" : ""}`}
    >
      {/* <Navbar /> */}
      <TestNavbar isDarkMode={isDarkMode} />
      <div className="h-screen"></div>
      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </main>
  );
};
export default Home;
