import Feed from "../components/Feed.jsx";
import Navbar from "../components/test-navbar.jsx";
import Footer from "../components/footer.jsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/profile-sidebar";

const FeedPage = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div
      className={`bg-blue-50 dark:bg-blue-2-dark ${isDarkMode ? "dark" : ""}`}
    >
      {/* <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} /> */}
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Feed isDarkMode={isDarkMode} />
          <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default FeedPage;
