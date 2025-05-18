import Feed from "../components/Feed.jsx";
import Navbar from "../components/test-navbar.jsx";
import Footer from "../components/footer.jsx";

const FeedPage = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div
      className={`bg-blue-50 dark:bg-blue-2-dark ${isDarkMode ? "dark" : ""}`}
    >
      {/* <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} /> */}
      <Feed isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
};

export default FeedPage;
